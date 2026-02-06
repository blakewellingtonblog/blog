from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID


class TagBase(BaseModel):
    name: str
    slug: str


class TagCreate(BaseModel):
    name: str
    slug: str


class TagResponse(TagBase):
    id: UUID


class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: dict  # TipTap JSON document
    content_html: Optional[str] = None
    cover_image_url: Optional[str] = None
    status: str = "draft"
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    tag_ids: list[UUID] = []


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[dict] = None
    content_html: Optional[str] = None
    cover_image_url: Optional[str] = None
    status: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    tag_ids: Optional[list[UUID]] = None


class BlogPostResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: Optional[dict] = None
    content_html: Optional[str] = None
    cover_image_url: Optional[str] = None
    status: str
    author_id: Optional[UUID] = None
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    tags: list[TagResponse] = []
