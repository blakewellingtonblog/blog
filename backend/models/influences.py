from pydantic import BaseModel
from typing import Optional


class InfluenceCreate(BaseModel):
    title: str
    category: str
    author: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    sort_order: Optional[int] = 0
    is_active: Optional[bool] = True


class InfluenceUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None
