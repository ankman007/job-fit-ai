import os
import fitz 
from os import getenv
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY= getenv("GEMINI_API_KEY")

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    text = ""
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text()
    return text


def get_interview_cheat_sheet(resume_text, job_description):
    client = genai.Client(api_key=GEMINI_API_KEY)

    prompt = (
        "You're an expert interview coach. Given the candidate's resume and a specific job description, "
        "generate a helpful interview cheat sheet that includes:\n"
        "- Potential interview questions tailored to the job\n"
        "- Suggested answers based on the candidate's experience\n"
        "- Tips or notes to help the candidate respond better\n\n"
        "### Resume:\n"
        f"{resume_text}\n\n"
        "### Job Description:\n"
        f"{job_description}\n\n"
        "Format your response in a structured, easy-to-skim way."
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    return response.text

