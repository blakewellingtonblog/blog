from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from uuid import uuid4
from supabase_client import supabase
from auth import get_current_user

router = APIRouter()

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/quicktime", "video/webm"}
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB
MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100MB


@router.post("/blog-image")
async def upload_blog_image(
    file: UploadFile = File(...),
    folder: str = "covers",
    user=Depends(get_current_user),
):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await file.read()
    if len(content) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="Image too large (max 5MB)")

    ext = file.filename.split(".")[-1] if file.filename else "jpg"
    filename = f"{folder}/{uuid4()}.{ext}"

    supabase.storage.from_("blog-images").upload(
        filename, content, {"content-type": file.content_type}
    )

    public_url = supabase.storage.from_("blog-images").get_public_url(filename)
    return {"url": public_url, "path": filename}


@router.post("/portfolio-media")
async def upload_portfolio_media(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    all_allowed = ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES
    if file.content_type not in all_allowed:
        raise HTTPException(status_code=400, detail="Invalid file type")

    content = await file.read()

    is_video = file.content_type in ALLOWED_VIDEO_TYPES
    max_size = MAX_VIDEO_SIZE if is_video else MAX_IMAGE_SIZE
    if len(content) > max_size:
        limit = "100MB" if is_video else "5MB"
        raise HTTPException(status_code=400, detail=f"File too large (max {limit})")

    ext = file.filename.split(".")[-1] if file.filename else ("mp4" if is_video else "jpg")
    subfolder = "videos" if is_video else "photos"
    filename = f"{subfolder}/{uuid4()}.{ext}"

    supabase.storage.from_("portfolio-media").upload(
        filename, content, {"content-type": file.content_type}
    )

    public_url = supabase.storage.from_("portfolio-media").get_public_url(filename)
    return {"url": public_url, "path": filename, "media_type": "video" if is_video else "photo"}


@router.post("/work-image")
async def upload_work_image(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await file.read()
    if len(content) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="Image too large (max 5MB)")

    ext = file.filename.split(".")[-1] if file.filename else "jpg"
    filename = f"work/{uuid4()}.{ext}"

    supabase.storage.from_("blog-images").upload(
        filename, content, {"content-type": file.content_type}
    )

    public_url = supabase.storage.from_("blog-images").get_public_url(filename)
    return {"url": public_url, "path": filename}


@router.delete("/file")
async def delete_file(
    bucket: str,
    path: str,
    user=Depends(get_current_user),
):
    allowed_buckets = {"blog-images", "portfolio-media"}
    if bucket not in allowed_buckets:
        raise HTTPException(status_code=400, detail="Invalid bucket")

    supabase.storage.from_(bucket).remove([path])
    return {"message": "File deleted"}
