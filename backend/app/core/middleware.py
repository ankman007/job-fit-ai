from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger
from datetime import datetime
import uuid

logger.add("api_logs.log", rotation="1 MB", retention="7 days", compression="zip")

class LoggingAndPerformanceMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = datetime.now()

        logger.info(f"Request: {request.method} {request.url}")

        response = await call_next(request)

        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()

        logger.info(f"Response status: {response.status_code}, Time taken: {duration:.4f} seconds")

        return response