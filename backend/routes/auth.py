from fastapi import APIRouter, HTTPException
import httpx
from config import settings
from models.auth import LoginRequest, TokenResponse, RefreshRequest

router = APIRouter()

AUTH_URL = f"{settings.supabase_url}/auth/v1"
AUTH_HEADERS = {
    "apikey": settings.supabase_service_role_key,
    "Content-Type": "application/json",
}


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{AUTH_URL}/token?grant_type=password",
            json={"email": body.email, "password": body.password},
            headers=AUTH_HEADERS,
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    data = resp.json()
    return TokenResponse(
        access_token=data["access_token"],
        refresh_token=data["refresh_token"],
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(body: RefreshRequest):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{AUTH_URL}/token?grant_type=refresh_token",
            json={"refresh_token": body.refresh_token},
            headers=AUTH_HEADERS,
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    data = resp.json()
    return TokenResponse(
        access_token=data["access_token"],
        refresh_token=data["refresh_token"],
    )


@router.get("/me")
async def get_me(authorization: str = None):
    from auth import get_current_user
    from fastapi import Header

    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        from jose import jwt
        from config import settings

        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return {"user": payload}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
