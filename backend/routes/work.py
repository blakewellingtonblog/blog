from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from supabase_client import supabase
from auth import get_current_user
from models.work import (
    ExperienceCreate,
    ExperienceUpdate,
    TimelineEventCreate,
    TimelineEventUpdate,
    FeaturedPostsUpdate,
)

router = APIRouter()


# --- Public endpoints ---


@router.get("/experiences")
async def list_experiences():
    result = (
        supabase.table("work_experiences")
        .select("*")
        .eq("is_active", True)
        .order("sort_order")
        .execute()
    )
    return result.data


@router.get("/experiences/{slug}")
async def get_experience(slug: str):
    # Fetch the experience by slug
    result = (
        supabase.table("work_experiences")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", True)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Experience not found")

    experience = result.data[0]
    experience_id = experience["id"]

    # Fetch timeline events
    timeline_result = (
        supabase.table("work_timeline_events")
        .select("*")
        .eq("experience_id", experience_id)
        .order("event_date", desc=True)
        .execute()
    )
    experience["timeline"] = timeline_result.data

    # Fetch featured posts
    featured_result = (
        supabase.table("work_featured_posts")
        .select("*")
        .eq("experience_id", experience_id)
        .order("sort_order")
        .execute()
    )

    featured_posts = []
    if featured_result.data:
        post_ids = [fp["post_id"] for fp in featured_result.data]
        posts_result = (
            supabase.table("blog_posts")
            .select("*")
            .in_("id", post_ids)
            .eq("status", "published")
            .execute()
        )
        # Build a lookup by post id
        posts_by_id = {p["id"]: p for p in posts_result.data}

        # Merge in sort_order, preserving the featured_posts ordering
        for fp in featured_result.data:
            post = posts_by_id.get(fp["post_id"])
            if post:
                featured_posts.append({**post, "sort_order": fp["sort_order"]})

    experience["featured_posts"] = featured_posts
    return experience


# --- Admin endpoints ---


@router.get("/admin/experiences")
async def admin_list_experiences(user=Depends(get_current_user)):
    result = (
        supabase.table("work_experiences")
        .select("*")
        .order("sort_order")
        .execute()
    )
    return result.data


@router.post("/admin/experiences")
async def create_experience(
    body: ExperienceCreate, user=Depends(get_current_user)
):
    result = (
        supabase.table("work_experiences").insert(body.model_dump()).execute()
    )
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create experience")
    return result.data[0]


@router.put("/admin/experiences/{experience_id}")
async def update_experience(
    experience_id: UUID, body: ExperienceUpdate, user=Depends(get_current_user)
):
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        supabase.table("work_experiences")
        .update(update_data)
        .eq("id", str(experience_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Experience not found")
    return result.data[0]


@router.delete("/admin/experiences/{experience_id}")
async def delete_experience(
    experience_id: UUID, user=Depends(get_current_user)
):
    result = (
        supabase.table("work_experiences")
        .delete()
        .eq("id", str(experience_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Experience not found")
    return {"message": "Experience deleted"}


@router.get("/admin/experiences/{experience_id}/timeline")
async def admin_list_timeline_events(
    experience_id: UUID, user=Depends(get_current_user)
):
    result = (
        supabase.table("work_timeline_events")
        .select("*")
        .eq("experience_id", str(experience_id))
        .order("event_date", desc=True)
        .execute()
    )
    return result.data


@router.post("/admin/experiences/{experience_id}/timeline")
async def create_timeline_event(
    experience_id: UUID, body: TimelineEventCreate, user=Depends(get_current_user)
):
    event_data = body.model_dump()
    event_data["experience_id"] = str(experience_id)

    result = (
        supabase.table("work_timeline_events").insert(event_data).execute()
    )
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create timeline event")
    return result.data[0]


@router.put("/admin/timeline/{event_id}")
async def update_timeline_event(
    event_id: UUID, body: TimelineEventUpdate, user=Depends(get_current_user)
):
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        supabase.table("work_timeline_events")
        .update(update_data)
        .eq("id", str(event_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    return result.data[0]


@router.delete("/admin/timeline/{event_id}")
async def delete_timeline_event(
    event_id: UUID, user=Depends(get_current_user)
):
    result = (
        supabase.table("work_timeline_events")
        .delete()
        .eq("id", str(event_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    return {"message": "Timeline event deleted"}


@router.get("/admin/experiences/{experience_id}/featured-posts")
async def admin_list_featured_posts(
    experience_id: UUID, user=Depends(get_current_user)
):
    featured_result = (
        supabase.table("work_featured_posts")
        .select("*")
        .eq("experience_id", str(experience_id))
        .order("sort_order")
        .execute()
    )

    featured_posts = []
    if featured_result.data:
        post_ids = [fp["post_id"] for fp in featured_result.data]
        posts_result = (
            supabase.table("blog_posts")
            .select("*")
            .in_("id", post_ids)
            .execute()
        )
        posts_by_id = {p["id"]: p for p in posts_result.data}

        for fp in featured_result.data:
            post = posts_by_id.get(fp["post_id"])
            if post:
                featured_posts.append({**post, "sort_order": fp["sort_order"]})

    return featured_posts


@router.put("/admin/experiences/{experience_id}/featured-posts")
async def update_featured_posts(
    experience_id: UUID, body: FeaturedPostsUpdate, user=Depends(get_current_user)
):
    # Delete all existing featured posts for this experience
    supabase.table("work_featured_posts").delete().eq(
        "experience_id", str(experience_id)
    ).execute()

    # Insert new featured posts
    if body.posts:
        rows = [
            {
                "experience_id": str(experience_id),
                "post_id": item.post_id,
                "sort_order": item.sort_order,
            }
            for item in body.posts
        ]
        result = supabase.table("work_featured_posts").insert(rows).execute()
        if not result.data:
            raise HTTPException(
                status_code=500, detail="Failed to update featured posts"
            )
        return result.data

    return []
