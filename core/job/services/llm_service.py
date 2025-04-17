import ast
from dotenv import load_dotenv
from google import genai
from job.services.prompts import PromptBuilder
# from data import resume_text, job_description
from os import getenv

load_dotenv()
GEMINI_API_KEY = getenv('GEMINI_API_KEY')
# GEMINI_API_KEY= "AIzaSyBWgjvNN31OblYxhv_L8IxSBeoLXQ8xFvs"

client = genai.Client(api_key=GEMINI_API_KEY)

def clean_llm_text(text):
    if text.startswith("```python"):
        text = text[len("```python"):].strip()
    if text.endswith("```"):
        text = text[: -len("```")].strip()
    return ast.literal_eval(text)


def generate_response(prompt):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return clean_llm_text(response.text)


def get_interview_cheatsheet(resume, job_description):
    return {
        "interview_questions": generate_response(PromptBuilder.interview_questions_prompt(resume, job_description)),
        "skill_assessment": generate_response(PromptBuilder.skill_assessment_prompt(resume, job_description)),
        "concept_refresh": generate_response(PromptBuilder.concept_refresh_prompt(resume, job_description)),
        "company_insights": generate_response(PromptBuilder.company_insights_prompt(job_description)),
        "resume_swot_analysis": generate_response(PromptBuilder.swot_analysis_prompt(resume))
    }
    