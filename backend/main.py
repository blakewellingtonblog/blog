from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes.auth import router as auth_router
from routes.blog import router as blog_router
from routes.portfolio import router as portfolio_router
from routes.work import router as work_router
from routes.upload import router as upload_router
from routes.settings import router as settings_router
from routes.influences import router as influences_router

app = FastAPI(title="Blake Wellington Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(blog_router, prefix="/api/blog", tags=["Blog"])
app.include_router(portfolio_router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(work_router, prefix="/api/work", tags=["Work"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])
app.include_router(settings_router, prefix="/api/settings", tags=["Settings"])
app.include_router(influences_router, prefix="/api/influences", tags=["Influences"])


@app.get("/")
def root():
    return {"message": "Backend is running"}
