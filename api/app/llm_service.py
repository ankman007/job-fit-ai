import google.generativeai as genai
from loguru import logger
from os import getenv
import json
import re
import traceback
import traceback

from app.response_format import candidate_schema, interviewer_schema
from app.prompts import get_prompt

       
def get_interview_cheatsheet(resume_text: str, job_description: str, cheatsheet_type: str = "interviewer") -> dict | None:
    try:
        GEMINI_API_KEY = getenv('GEMINI_API_KEY') 
        if not GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY not found in environment variables.")
            return None

        genai.configure(api_key=GEMINI_API_KEY)
        
        schema = interviewer_schema if cheatsheet_type == "interviewer" else candidate_schema
        prompt = get_prompt(resume_text, job_description, cheatsheet_type)
        
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")

        response = model.generate_content(
            prompt,
            generation_config={
                'max_output_tokens': 5000,
                'temperature': 0.1,
                'response_mime_type': 'application/json',
                'response_schema': schema,
            },
            safety_settings=[],
            tools=[],
        )

        message = response.text
        res = json.loads(message)
        return res

    except Exception as error:
        logger.error(f"Encountered error during interview cheatsheet generation: {error}")
        logger.error(traceback.format_exc())
        return None