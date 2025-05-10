from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from loguru import logger 
from sqlalchemy.orm import Session
import traceback
import json

from app.service.llm_service import get_interview_cheatsheet
from app.service.extract_pdf import extract_text_from_pdf
from app.database.model import InterviewCheatSheetModel
from app import get_db
from app.routes.auth import get_current_user

router = APIRouter()

@router.post('/generate')
async def generate_cheatsheet(
    resume_pdf: UploadFile = File(...),
    job_description: str = Form(...),
    cheatsheet_type: str = Form("interviewer"),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),

):
    try: 
        resume_text = extract_text_from_pdf(resume_pdf)
        res = get_interview_cheatsheet(resume_text, job_description, cheatsheet_type)
        
        if res is None:
            logger.warning("Cheatsheet generation returned no result.")
            raise HTTPException(status_code=204, detail="No content: Cheatsheet generation returned no data.")
                
        cheatsheet_record = InterviewCheatSheetModel(
            resume_text=resume_text,
            job_description=job_description,
            content=res,
            user_id=current_user.id,
            cheatsheet_type=cheatsheet_type
        )
        
        logger.info(f"res type{type(res)}")
        
        db.add(cheatsheet_record)
        db.commit()
        db.refresh(cheatsheet_record)
        
        return {
            "status": "success",
            "message": "Cheatsheet generated and stored successfully.",
            "data": {
                "cheatsheet_id": cheatsheet_record.id,
                "cheatsheet_type": cheatsheet_type,
                "cheatsheet": res
            }
        }

    except Exception as error:
        logger.error(f"Cheatsheet generation failed: {error}")
        logger.debug("Stack trace:\n" + traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal Server Error: Could not generate cheatsheet.")