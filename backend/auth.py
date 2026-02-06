from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError
from config import settings


async def get_current_user(authorization: str = Header(...)):
    """Verify Supabase JWT from Authorization: Bearer <token> header."""
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
