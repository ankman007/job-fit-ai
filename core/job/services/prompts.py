class PromptBuilder:
    @staticmethod
    def interview_questions_prompt(resume_text, job_description):
        return (
            "You are a top-tier technical interview coach.\n\n"
            "Using the candidate's resume and the provided job description, generate exactly 12 interview questions.\n"
            "Your output must be a valid Python list of dictionaries. Each dictionary should have exactly three keys:\n"
            "  - 'question': A highly relevant technical or behavioral interview question. Base these on the candidate’s experience, the job requirements, and technologies or skills listed in the resume.\n"
            "  - 'answer': A concise answer derived strictly from the resume. Ensure it aligns with the job description.\n"
            "  - 'tip': A short, actionable tip to help the candidate confidently respond to the question.\n\n"
            "Types of questions to include:\n"
            "- Questions directly reflecting the candidate’s past experiences and achievements (based on the resume).\n"
            "- Questions aligned with the requirements, tools, and technologies in the job description.\n"
            "- A few knowledge-based questions about core concepts or technologies mentioned in the resume (e.g., 'When is inferential statistics preferred over descriptive statistics?').\n"
            "- The answers should be detailed for each question.\n\n"
            "Output constraints:\n"
            "- Only return a Python list of dictionaries. No extra text, explanation, or formatting.\n"
            "- The output must be directly parsable using `ast.literal_eval()` or `json.loads()`.\n\n"
            "### Resume:\n"
            f"{resume_text}\n\n"
            "### Job Description:\n"
            f"{job_description}\n\n"
            "REMEMBER: Do not include any markdown formatting, code fences (e.g., ```python), or introductory text. Only output the pure Python list."
        )


    @staticmethod
    def swot_analysis_prompt(resume_text):
        return (
            "You are a career development assistant helping a candidate analyze their resume.\n\n"
            "Perform a SWOT analysis (Strengths, Weaknesses, Opportunities, and Threats) based on the resume provided.\n"
            "Return the output as a dictionary with exactly 4 keys: 'strengths', 'weaknesses', 'opportunities', 'threats'.\n"
            "Each value should be a list of short, relevant bullet points.\n\n"
            "### Resume:\n"
            f"{resume_text}\n\n"
            "IMPORTANT: Do not include any markdown, explanations, or additional text. Return only a valid Python dictionary."
        )


    @staticmethod
    def skill_assessment_prompt(resume_text, job_description):
        return (
            "You are a skill-gap analysis expert.\n\n"
            "Based on the resume and job description, identify the key skills required by the job that are missing or underrepresented in the resume.\n"
            "Return the response as a dictionary with two keys:\n"
            "  - 'missing_skills': A list of skills or tools required by the job that are not clearly present in the resume.\n"
            "  - 'recommendations': Suggestions for how the candidate could start learning or gaining experience in those areas.\n\n"
            "### Resume:\n"
            f"{resume_text}\n\n"
            "### Job Description:\n"
            f"{job_description}\n\n"
            "IMPORTANT: Only return a valid Python dictionary. No markdown, code blocks, or extra commentary."
        )


    @staticmethod
    def concept_refresh_prompt(resume_text, job_description):
        return (
            "You're an AI career tutor. Based on the candidate's resume and job description, recommend concepts or topics the candidate should review.\n"
            "This can include technical fundamentals, specific tools, libraries, or frameworks mentioned in either the resume or job description.\n"
            "Structure the output as a dictionary with two keys:\n"
            "  - 'recommended_topics': A list of specific concepts or tools to refresh.\n"
            "  - 'why_important': A sentence or two explaining why each topic is relevant.\n\n"
            "### Resume:\n"
            f"{resume_text}\n\n"
            "### Job Description:\n"
            f"{job_description}\n\n"
            "IMPORTANT: Output must be a valid Python dictionary without markdown or additional text."
        )


    @staticmethod
    def company_insights_prompt(job_description):
        return (
            "You are a job market analyst providing insights based on job descriptions.\n\n"
            "Based on the provided job description, extract key information about the company's values, work culture, and expectations.\n"
            "Summarize this as a dictionary with keys:\n"
            "  - 'culture': Insight into company work culture or team values.\n"
            "  - 'expectations': What seems to be expected from the ideal candidate.\n"
            "  - 'alignment_tips': Tips for how a candidate can demonstrate alignment with the company during the interview.\n\n"
            "### Job Description:\n"
            f"{job_description}\n\n"
            "IMPORTANT: Do not include explanations or extra text. Return only a valid Python dictionary."
        )
