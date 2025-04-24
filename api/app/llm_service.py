from dotenv import load_dotenv
import google.generativeai as genai
from loguru import logger
from os import getenv
import json
import traceback

from app.response_format import candidate_schema, interviewer_schema
from app.prompts import interview_cheetsheet_prompt
        
        
def get_interview_cheatsheet(resume_text, job_description, type="candidate"):
    load_dotenv()

    try:
        GEMINI_API_KEY = getenv('GEMINI_API_KEY') 
        if not GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY not found in environment variables.")
            return None

        genai.configure(api_key=GEMINI_API_KEY)

        schema = interviewer_schema if type == "interviewer" else candidate_schema

        try:
            prompt = interview_cheetsheet_prompt(resume_text, job_description)
        except AttributeError:
            logger.exception("PromptBuilder method might be misspelled or missing.")
            return None

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
        logger.debug(f"Raw LLM response: {message}")

        try:
            parsed_content = json.loads(message)
        except json.JSONDecodeError:
            logger.error("LLM response is not valid JSON.")
            logger.debug(f"Raw text that failed to parse: {message}")
            return None

        return parsed_content

    except Exception as error:
        logger.error(f"Encountered error during interview cheatsheet generation: {error}")
        logger.error(traceback.format_exc())
        return None
