from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from uuid import UUID
from supabase_client import supabase
from auth import get_current_user
from models.portfolio import (
    PortfolioItemCreate,
    PortfolioItemUpdate,
    PortfolioItemResponse,
    ReorderRequest,
)

router = APIRouter()


# --- Public endpoints ---


@router.get("/items")
async def list_items(
    category: Optional[str] = None,
    media_type: Optional[str] = None,
    featured_only: bool = False,
):
    query = supabase.table("portfolio_items").select("*")

    if category:
        query = query.eq("category", category)
    if media_type:
        query = query.eq("media_type", media_type)
    if featured_only:
        query = query.eq("is_featured", True)

    result = query.order("sort_order").order("created_at", desc=True).execute()
    return result.data


@router.get("/items/{item_id}")
async def get_item(item_id: UUID):
    result = (
        supabase.table("portfolio_items").select("*").eq("id", str(item_id)).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return result.data[0]


@router.get("/categories")
async def list_categories():
    result = supabase.table("portfolio_items").select("category").execute()
    categories = list(set(row["category"] for row in result.data if row.get("category")))
    categories.sort()
    return categories


# --- Admin endpoints ---


@router.post("/admin/items")
async def create_item(body: PortfolioItemCreate, user=Depends(get_current_user)):
    result = (
        supabase.table("portfolio_items").insert(body.model_dump()).execute()
    )
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create portfolio item")
    return result.data[0]


@router.put("/admin/items/{item_id}")
async def update_item(
    item_id: UUID, body: PortfolioItemUpdate, user=Depends(get_current_user)
):
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        supabase.table("portfolio_items")
        .update(update_data)
        .eq("id", str(item_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return result.data[0]


@router.delete("/admin/items/{item_id}")
async def delete_item(item_id: UUID, user=Depends(get_current_user)):
    # Get item to find media URL for cleanup
    item_result = (
        supabase.table("portfolio_items").select("*").eq("id", str(item_id)).execute()
    )
    if not item_result.data:
        raise HTTPException(status_code=404, detail="Portfolio item not found")

    result = (
        supabase.table("portfolio_items").delete().eq("id", str(item_id)).execute()
    )
    return {"message": "Portfolio item deleted"}


@router.patch("/admin/items/{item_id}/reorder")
async def reorder_item(
    item_id: UUID, body: ReorderRequest, user=Depends(get_current_user)
):
    result = (
        supabase.table("portfolio_items")
        .update({"sort_order": body.sort_order})
        .eq("id", str(item_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return result.data[0]
