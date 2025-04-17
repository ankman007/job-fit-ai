from django.shortcuts import render
from job.services.llm_service import get_interview_cheatsheet
from job.services.pdf_utils import extract_text_from_pdf
from django.http import HttpResponse

def upload(request):
    return render(request, 'upload.html')

def result(request):
    if request.method == 'POST' and request.FILES['resume'] and 'job_description' in request.POST:
        resume = request.FILES['resume']
        job_description = request.POST['job_description']
        
        resume_text = extract_text_from_pdf(resume)
        cheatsheet = get_interview_cheatsheet(resume_text, job_description)
        
        interview_questions = cheatsheet["interview_questions"]
        skill_assessment = cheatsheet["skill_assessment"]
        concept_refresh = cheatsheet["concept_refresh"]
        company_insights = cheatsheet["company_insights"]
        resume_swot_analysis = cheatsheet["resume_swot_analysis"]
        
        print(type(skill_assessment))
        print(type(concept_refresh))
        print(type(company_insights))
        
        return render(request, 'result.html', {
            'interview_questions': interview_questions,
            'skill_assessment': skill_assessment,
            'concept_refresh': concept_refresh,
            'company_insights': company_insights,
            'resume_swot_analysis': resume_swot_analysis
        })
    else:
        return HttpResponse("Invalid request. Please upload a resume and provide a job description.", status=400)