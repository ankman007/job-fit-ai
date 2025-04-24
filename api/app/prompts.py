def interview_cheetsheet_prompt(resume_text, job_description):
    return (
        f"Create a cheatsheet for my interview. Here is the resume: {resume_text}\n\n Here is the job description {job_description}. Do not include any formatting. Do not use quotes"
    )