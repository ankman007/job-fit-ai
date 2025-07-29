import traceback
from loguru import logger 
from celery.result import AsyncResult
from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile

from app.celery_worker import celery_app
from app.routes.auth import get_current_user
from app.service.input_validator import validate_inputs
from app.service.extract_pdf import extract_text_from_pdf
from app.tasks.cheatsheet_tasks import generate_cheatsheet_task

router = APIRouter()


@router.post('/generate')
async def generate_cheatsheet(
    resume_pdf: UploadFile = File(...),
    job_description: str = Form(...),
    cheatsheet_type: str = Form("interviewer"),
    current_user = Depends(get_current_user),
):
    try: 
        resume_text = extract_text_from_pdf(resume_pdf)
        pdf_filename = resume_pdf.filename

        job_desc_word_count = len(job_description.split())
        resume_word_count = len(resume_text.split())
        validate_inputs(resume_word_count, job_desc_word_count)
        
        task = generate_cheatsheet_task.delay(
            resume_text,
            job_description,
            cheatsheet_type,
            pdf_filename,
            current_user.id
        )

        return {
            "status": "accepted",
            "message": "Cheatsheet generation has been scheduled.",
            "task_id": task.id
        }

    except HTTPException as http_err:
        raise http_err
    
    except Exception as error:
        logger.error(f"Cheatsheet generation failed: {error}")
        logger.debug("Stack trace:\n" + traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal Server Error: Could not generate cheatsheet.")
    

@router.get("/task-status/{task_id}")
async def get_task_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)
    return {
        "task_id": task_id,
        "status": result.status,
        "result": result.result if result.ready() else None
    }