def get_prompt(resume_text, job_description, role, extra_context):
    if role == "candidate":
        instructions = """
        You are a professional candidate preparing for a job interview. Based on the resume and job description below, generate a cheatsheet in JSON format that STRICTLY adheres to the provided schema. This cheatsheet should highlight your key skills, experiences, and accomplishments that are most relevant to the job description. Focus on preparing concise talking points and examples.
        """
    elif role == "interviewer":
        instructions = """
        You are a professional interviewer assessing a candidate. Based on the candidate's resume and the job description below, generate a structured overview in JSON format that STRICTLY adheres to the provided schema. This overview should help you quickly assess the candidate's capabilities, identify key areas to probe further, and get a comprehensive understanding of their fit for the role. Provide with each field mentioned in the schema, do not stray away from it. 
        """
    else:
        raise ValueError(f"Invalid role: {role}. Must be 'candidate' or 'interviewer'.")

    return f"""
    {instructions}

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {job_description}
    
    ADDITIONAL CONTEXT:
    {extra_context}    
    """