from fastapi import APIRouter
from app.llm_service import get_interview_cheatsheet
from loguru import logger 
from app.utils import extract_text_from_pdf

router = APIRouter()

@router.get('/llm-analysis')
async def llm_analysis(resume_pdf, job_description: str):
    try: 
        resume_text = extract_text_from_pdf(resume_pdf)
        res = get_interview_cheatsheet(resume_text, job_description)
        return res 
    except Exception as error:
        logger.error(f"Cheetsheet generation failed: {error}")
        

