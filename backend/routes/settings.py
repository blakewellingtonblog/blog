from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from supabase_client import supabase
from auth import get_current_user

router = APIRouter()


class SiteSettingsUpdate(BaseModel):
    hero_tagline: Optional[str] = None
    about_text: Optional[str] = None
    athletics_intro: Optional[str] = None
    athletics_philosophy: Optional[str] = None
    contact_email: Optional[str] = None
    social_instagram: Optional[str] = None
    social_linkedin: Optional[str] = None


@router.get("")
async def get_settings():
    result = supabase.table("site_settings").select("*").eq("id", 1).execute()
    if not result.data:
        return {}
    return result.data[0]


@router.put("/admin")
async def update_settings(body: SiteSettingsUpdate, user=Depends(get_current_user)):
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        supabase.table("site_settings")
        .update(update_data)
        .eq("id", 1)
        .execute()
    )
    if not result.data:
        # Insert if doesn't exist
        update_data["id"] = 1
        result = supabase.table("site_settings").insert(update_data).execute()

    return result.data[0] if result.data else update_data
