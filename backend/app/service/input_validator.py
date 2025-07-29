from fastapi import HTTPException

MIN_JOB_DESC_WORDS = 120
MIN_RESUME_WORDS = 250

def validate_word_count(field_name: str, text: str, min_words: int):
    word_count = len(text.split())
    if word_count < min_words:
        raise HTTPException(
            status_code=400,
            detail=f"{field_name} is too short. Found {word_count} words, minimum {min_words} required."
        )

def validate_inputs(resume_text: str, job_description: str) -> None:
    validate_word_count("Job description", job_description, MIN_JOB_DESC_WORDS)
    validate_word_count("Resume content", resume_text, MIN_RESUME_WORDS)
