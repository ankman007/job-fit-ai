import json
from os import getenv
from loguru import logger
import google.generativeai as genai

from app.service.llm.base import BaseLLM


class GeminiLLM(BaseLLM):
    def __init__(self):
        GEMINI_API_KEY = getenv('GEMINI_API_KEY') 
        if not GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY not found in environment variables.")
            raise ValueError("GEMINI_API_KEY not found")

        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        
    def generate(self, prompt: str, schema: dict) -> dict:
        response = self.model.generate_content(
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
        return json.loads(response.text)