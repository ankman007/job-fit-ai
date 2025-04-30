from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from sqlalchemy.orm import Session

from app.database.model import InterviewCheatSheetModel
from app import get_db
from app.routes.auth import get_current_user

router = APIRouter()

@router.get('/{user_id}')
async def get_user_details(
    user_id: int,
    current_user=Depends(get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this resource."
        )

    try:
        return {
            "status": "success",
            "message": "User details fetched successfully.",
            "user_details": {
                "username": current_user.name,
                "email": current_user.email,
                "location": current_user.location,
                "id": current_user.id,
                "bio": current_user.bio,
                "job_title": current_user.job_title  
            }
        }
    except Exception as e:
        logger.exception(f"Error fetching user details: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user details."
        )


@router.get('/{user_id}/cheatsheets', response_model=dict, status_code=status.HTTP_200_OK)
async def get_user_cheatsheets(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this resource."
        )

    try:
        user_cheatsheets = db.query(InterviewCheatSheetModel).filter_by(user_id=user_id).all()

        if not user_cheatsheets:
            return {
                "status": "success",
                "message": "No cheatsheets found for the user.",
                "cheatsheets": []
            }

        formatted_cheatsheets = []
        for sheet in user_cheatsheets:
            try:
                formatted_cheatsheets.append({
                    "id": sheet.id,
                    "user_id": sheet.user_id,
                    "resume_text": sheet.resume_text,
                    "job_description": sheet.job_description,
                    "cheatsheet_type": sheet.cheatsheet_type,
                    "content": sheet.content
                })
            except Exception as e:
                logger.exception(f"Error parsing content for sheet id {sheet.id}: {e}")
                continue  
        return {
            "status": "success",
            "message": "Fetched user cheatsheets successfully.",
            "cheatsheets": formatted_cheatsheets
        }

    except Exception as e:
        logger.exception(f"Error fetching cheatsheets: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user cheatsheets."
        )
