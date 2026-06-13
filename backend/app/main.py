from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.ai import router as ai_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.incidents import router as incidents_router
from app.api.v1.health import router as health_router
from app.api.v1.severity import router as severity_router

from app.middleware.logging import LoggingMiddleware
from app.middleware.timing import TimingMiddleware

from app.core.exceptions import global_exception_handler
from app.api.v1.analytics import (
    router as analytics_router
)
#from app.api.v1.summarizer import (
 #   router as summarizer_router
##)


app = FastAPI(
    title="AegisAI",
    version="1.0.0",
    description="""
    Autonomous Enterprise Incident
    Intelligence Platform
    """,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Custom Middleware
app.add_middleware(LoggingMiddleware)
app.add_middleware(TimingMiddleware)

# Global Exception Handler
app.add_exception_handler(
    Exception,
    global_exception_handler
)

#app.include_router(
 #   summarizer_router,
 #   prefix="/api/v1/summarizer",
 #   tags=["AI Summarizer"]
#)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)

# User Routes
app.include_router(
    users_router,
    prefix="/api/v1/users",
    tags=["Users"]
)

# Incident Routes
app.include_router(
    incidents_router,
    prefix="/api/v1/incidents",
    tags=["Incidents"]
)

# Health Routes
app.include_router(
    health_router,
    prefix="/api/v1/health",
    tags=["Health"]
)

# AI Classification Routes
app.include_router(
    ai_router,
    prefix="/api/v1/ai",
    tags=["AI"]
)

# AI Severity Prediction Routes
app.include_router(
    severity_router,
    prefix="/api/v1/severity",
    tags=["AI Severity"]
)

app.include_router(
    analytics_router,
    prefix="/api/v1/analytics",
    tags=["Analytics"]
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


@app.get("/error")
async def test_error():
    raise Exception("Test Exception")