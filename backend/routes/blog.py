from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from uuid import UUID
from datetime import datetime, timezone
from supabase_client import supabase
from auth import get_current_user
from models.blog import (
    BlogPostCreate,
    BlogPostUpdate,
    BlogPostResponse,
    TagCreate,
    TagResponse,
)

router = APIRouter()


def _get_post_tags(post_id: str) -> list[dict]:
    """Fetch tags for a given post."""
    result = (
        supabase.table("blog_post_tags")
        .select("tag_id, blog_tags(id, name, slug)")
        .eq("post_id", post_id)
        .execute()
    )
    return [row["blog_tags"] for row in result.data if row.get("blog_tags")]


def _sync_post_tags(post_id: str, tag_ids: list[UUID]):
    """Replace all tags for a post."""
    supabase.table("blog_post_tags").delete().eq("post_id", post_id).execute()
    if tag_ids:
        rows = [{"post_id": post_id, "tag_id": str(tid)} for tid in tag_ids]
        supabase.table("blog_post_tags").insert(rows).execute()


def _enrich_post(post: dict) -> dict:
    """Add tags to a post dict."""
    post["tags"] = _get_post_tags(post["id"])
    return post


# --- Public endpoints ---


@router.get("/posts")
async def list_published_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    tag: Optional[str] = None,
):
    offset = (page - 1) * per_page

    if tag:
        # Filter by tag slug
        tag_result = supabase.table("blog_tags").select("id").eq("slug", tag).execute()
        if not tag_result.data:
            return {"posts": [], "total": 0, "page": page, "per_page": per_page}

        tag_id = tag_result.data[0]["id"]
        post_ids_result = (
            supabase.table("blog_post_tags")
            .select("post_id")
            .eq("tag_id", tag_id)
            .execute()
        )
        post_ids = [row["post_id"] for row in post_ids_result.data]

        if not post_ids:
            return {"posts": [], "total": 0, "page": page, "per_page": per_page}

        result = (
            supabase.table("blog_posts")
            .select("*", count="exact")
            .eq("status", "published")
            .in_("id", post_ids)
            .order("published_at", desc=True)
            .range(offset, offset + per_page - 1)
            .execute()
        )
    else:
        result = (
            supabase.table("blog_posts")
            .select("*", count="exact")
            .eq("status", "published")
            .order("published_at", desc=True)
            .range(offset, offset + per_page - 1)
            .execute()
        )

    posts = [_enrich_post(p) for p in result.data]
    # Remove raw content from list view for performance
    for p in posts:
        p.pop("content", None)

    return {
        "posts": posts,
        "total": result.count or 0,
        "page": page,
        "per_page": per_page,
    }


@router.get("/posts/{slug}")
async def get_published_post(slug: str):
    result = (
        supabase.table("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return _enrich_post(result.data[0])


@router.get("/tags")
async def list_tags():
    result = supabase.table("blog_tags").select("*").order("name").execute()
    return result.data


# --- Admin endpoints ---


@router.get("/admin/posts")
async def admin_list_posts(user=Depends(get_current_user)):
    result = (
        supabase.table("blog_posts")
        .select("*")
        .order("updated_at", desc=True)
        .execute()
    )
    return [_enrich_post(p) for p in result.data]


@router.get("/admin/posts/{post_id}")
async def admin_get_post(post_id: UUID, user=Depends(get_current_user)):
    result = (
        supabase.table("blog_posts").select("*").eq("id", str(post_id)).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return _enrich_post(result.data[0])


@router.post("/admin/posts")
async def create_post(body: BlogPostCreate, user=Depends(get_current_user)):
    post_data = body.model_dump(exclude={"tag_ids"})
    post_data["author_id"] = user.get("sub")
    if post_data["status"] == "published":
        post_data["published_at"] = datetime.now(timezone.utc).isoformat()

    result = supabase.table("blog_posts").insert(post_data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create post")

    post = result.data[0]
    if body.tag_ids:
        _sync_post_tags(post["id"], body.tag_ids)

    return _enrich_post(post)


@router.put("/admin/posts/{post_id}")
async def update_post(
    post_id: UUID, body: BlogPostUpdate, user=Depends(get_current_user)
):
    update_data = body.model_dump(exclude_none=True, exclude={"tag_ids"})
    if not update_data and body.tag_ids is None:
        raise HTTPException(status_code=400, detail="No fields to update")

    if update_data:
        result = (
            supabase.table("blog_posts")
            .update(update_data)
            .eq("id", str(post_id))
            .execute()
        )
        if not result.data:
            raise HTTPException(status_code=404, detail="Post not found")

    if body.tag_ids is not None:
        _sync_post_tags(str(post_id), body.tag_ids)

    # Return updated post
    result = (
        supabase.table("blog_posts").select("*").eq("id", str(post_id)).execute()
    )
    return _enrich_post(result.data[0])


@router.delete("/admin/posts/{post_id}")
async def delete_post(post_id: UUID, user=Depends(get_current_user)):
    supabase.table("blog_post_tags").delete().eq("post_id", str(post_id)).execute()
    result = (
        supabase.table("blog_posts").delete().eq("id", str(post_id)).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted"}


@router.patch("/admin/posts/{post_id}/publish")
async def publish_post(post_id: UUID, user=Depends(get_current_user)):
    result = (
        supabase.table("blog_posts")
        .update(
            {
                "status": "published",
                "published_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        .eq("id", str(post_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return _enrich_post(result.data[0])


@router.patch("/admin/posts/{post_id}/unpublish")
async def unpublish_post(post_id: UUID, user=Depends(get_current_user)):
    result = (
        supabase.table("blog_posts")
        .update({"status": "draft", "published_at": None})
        .eq("id", str(post_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return _enrich_post(result.data[0])


@router.post("/admin/tags")
async def create_tag(body: TagCreate, user=Depends(get_current_user)):
    result = (
        supabase.table("blog_tags")
        .insert({"name": body.name, "slug": body.slug})
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create tag")
    return result.data[0]


@router.delete("/admin/tags/{tag_id}")
async def delete_tag(tag_id: UUID, user=Depends(get_current_user)):
    supabase.table("blog_post_tags").delete().eq("tag_id", str(tag_id)).execute()
    result = (
        supabase.table("blog_tags").delete().eq("id", str(tag_id)).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"message": "Tag deleted"}
