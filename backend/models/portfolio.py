from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID


class PortfolioItemCreate(BaseModel):
    title: str
    description: Optional[str] = None
    media_type: str  # 'photo' or 'video'
    media_url: str
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    sort_order: int = 0
    width: Optional[int] = None
    height: Optional[int] = None
    is_featured: bool = False


class PortfolioItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    media_type: Optional[str] = None
    media_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    sort_order: Optional[int] = None
    width: Optional[int] = None
    height: Optional[int] = None
    is_featured: Optional[bool] = None


class PortfolioItemResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    media_type: str
    media_url: str
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    sort_order: int
    width: Optional[int] = None
    height: Optional[int] = None
    is_featured: bool
    created_at: datetime
    updated_at: datetime


class ReorderRequest(BaseModel):
    sort_order: int
