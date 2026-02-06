from pydantic import BaseModel
from typing import Optional


class ExperienceCreate(BaseModel):
    title: str
    slug: str
    subtitle: Optional[str] = None
    description: Optional[dict] = None
    description_html: Optional[str] = None
    header_image_url: Optional[str] = None
    sort_order: Optional[int] = 0
    is_active: Optional[bool] = True


class ExperienceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[dict] = None
    description_html: Optional[str] = None
    header_image_url: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None


class TimelineEventCreate(BaseModel):
    event_date: str  # DATE format string
    title: str
    subtitle: Optional[str] = None
    photo_url: Optional[str] = None
    sort_order: Optional[int] = 0


class TimelineEventUpdate(BaseModel):
    event_date: Optional[str] = None
    title: Optional[str] = None
    subtitle: Optional[str] = None
    photo_url: Optional[str] = None
    sort_order: Optional[int] = None


class FeaturedPostItem(BaseModel):
    post_id: str
    sort_order: int = 0


class FeaturedPostsUpdate(BaseModel):
    posts: list[FeaturedPostItem]
