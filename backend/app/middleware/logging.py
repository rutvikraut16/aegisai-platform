from starlette.middleware.base import BaseHTTPMiddleware

from fastapi import Request

import logging


logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request: Request,
        call_next
    ):

        logger.info(
            f"Incoming Request: "
            f"{request.method} {request.url}"
        )

        response = await call_next(request)

        logger.info(
            f"Response Status: "
            f"{response.status_code}"
        )

        return response