from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from loguru import logger 
from sqlalchemy.orm import Session

from app.llm_service import get_interview_cheatsheet
from app.utils import extract_text_from_pdf
from app.database.model import InterviewCheatSheetModel
from app import get_db
from app.views.auth import get_current_user

router = APIRouter()

@router.post('/generate-cheatsheet')
async def llm_analysis(
    resume_pdf: UploadFile = File(...),
    job_description: str = Form(...),
    current_user=Depends(get_current_user)
):
    try: 
        resume_text = extract_text_from_pdf(resume_pdf)
        res = get_interview_cheatsheet(resume_text, job_description)
        # logger.info(f"res: {res}\n resume_text: {resume_text}\n")
        logger.info(f"res: {res}\n")
        return res 
    except Exception as error:
        logger.error(f"Cheetsheet generation failed: {error}")


@router.get('/user/{user_id}/cheatsheets')
async def get_all_cheatsheets_by_user_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.id != int(user_id):
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")

    try:
        cheatsheets = db.query(InterviewCheatSheetModel).filter(
            InterviewCheatSheetModel.user_id == user_id
        ).all()
        if not cheatsheets:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User does not have any prior generated cheatsheets."
            )
        return cheatsheets
    except Exception as e:
        logger.error(f"Error fetching cheatsheets: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error while fetching user's cheatsheets."
        )