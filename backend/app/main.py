from fastapi import FastAPI

from app.api.auth import router as auth_router


app = FastAPI(
    title="AegisAI",
    version="1.0.0"
)


app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)


@app.get("/")
async def root():
    return {
        "message": "AegisAI Backend Running Successfully"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }