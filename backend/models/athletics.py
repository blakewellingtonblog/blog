from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID


class AthleticsServiceCreate(BaseModel):
    title: str
    description: str
    icon_name: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True
    price_info: Optional[str] = None


class AthleticsServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon_name: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None
    price_info: Optional[str] = None


class AthleticsServiceResponse(BaseModel):
    id: UUID
    title: str
    description: str
    icon_name: Optional[str] = None
    sort_order: int
    is_active: bool
    price_info: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class ContactFormRequest(BaseModel):
    name: str
    email: str
    message: str
