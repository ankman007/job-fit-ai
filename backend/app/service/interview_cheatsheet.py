import traceback
from loguru import logger

from app.schemas.response import candidate_schema, interviewer_schema
from app.service.prompts import get_prompt
from app.service.rag_engine import RAGEngine
from app.service.llm.gemini import GeminiLLM

       
def get_interview_cheatsheet(resume_text: str, job_description: str, cheatsheet_type: str = "interviewer") -> dict | None:
    try:
        rag_engine = RAGEngine()
        extra_contexts = rag_engine.retrieve(job_description, top_k=3)
        extra_context = "\n\n".join(extra_contexts) if extra_contexts else ""
        
        schema = interviewer_schema if cheatsheet_type == "interviewer" else candidate_schema
        prompt = get_prompt(resume_text, job_description, cheatsheet_type, extra_context)
        
        llm = GeminiLLM()
        return llm.generate(prompt, schema)

    except Exception as error:
        logger.error(f"Encountered error during interview cheatsheet generation: {error}")
        logger.error(traceback.format_exc())
        return None