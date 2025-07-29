from celery import Celery

celery_app = Celery(
    "jobfit",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
)

celery_app.conf.update(task_track_started=True, result_expires=3600)