import ast
from dotenv import load_dotenv
import google.generativeai as genai
from loguru import logger
from os import getenv
import json

from app.response_format import candidate_schema, interviewer_schema
from app.prompts import PromptBuilder

def get_interview_cheatsheet(resume_text, job_description, type="candidate"):
    
    load_dotenv()
    try:
        GEMINI_API_KEY = getenv('GEMINI_API_KEY')
        client = genai.Client(api_key=GEMINI_API_KEY)
        
        schema = interviewer_schema if type == "interviewer" else candidate_schema

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=PromptBuilder.interview_cheetsheet_prompt(resume_text, job_description),
            config={
                'max_output_tokens': 5000,
                'temperature' : 0.1,
                'response_mime_type': 'application/json',
                'response_schema': schema,
            },
        )
        message = response.text 
        try:
            parsed_content = json.loads(message)  
        except json.JSONDecodeError:
            raise ValueError("LLM response is not valid JSON")
        return parsed_content
    
    except Exception as error:
        logger.error(f"Encountered error during interview cheatsheet generation: {error}")