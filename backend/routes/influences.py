from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from typing import Optional
from supabase_client import supabase
from auth import get_current_user
from models.influences import InfluenceCreate, InfluenceUpdate

router = APIRouter()


# --- Public endpoints ---


@router.get("/")
async def list_influences(category: Optional[str] = Query(None)):
    query = (
        supabase.table("influences")
        .select("*")
        .eq("is_active", True)
        .order("category")
        .order("sort_order")
    )
    if category:
        query = query.eq("category", category)
    result = query.execute()
    return result.data


# --- Admin endpoints ---


@router.get("/admin/influences")
async def admin_list_influences(user=Depends(get_current_user)):
    result = (
        supabase.table("influences")
        .select("*")
        .order("category")
        .order("sort_order")
        .execute()
    )
    return result.data


@router.post("/admin/influences")
async def create_influence(
    body: InfluenceCreate, user=Depends(get_current_user)
):
    result = (
        supabase.table("influences").insert(body.model_dump()).execute()
    )
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create influence")
    return result.data[0]


@router.put("/admin/influences/{influence_id}")
async def update_influence(
    influence_id: UUID, body: InfluenceUpdate, user=Depends(get_current_user)
):
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        supabase.table("influences")
        .update(update_data)
        .eq("id", str(influence_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Influence not found")
    return result.data[0]


@router.delete("/admin/influences/{influence_id}")
async def delete_influence(
    influence_id: UUID, user=Depends(get_current_user)
):
    result = (
        supabase.table("influences")
        .delete()
        .eq("id", str(influence_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Influence not found")
    return {"message": "Influence deleted"}
