from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from . import utils

def upload(request):
    return render(request, 'upload.html')

def result(request):
    if request.method == 'POST' and request.FILES['resume'] and 'job_description' in request.POST:
        resume = request.FILES['resume']
        job_description = request.POST['job_description']
        
        resume_text = utils.extract_text_from_pdf(resume)
        interview_cheatsheet = utils.get_interview_cheat_sheet(resume_text, job_description)
        
        return render(request, 'result.html', {
            'interview_cheatsheet': interview_cheatsheet
        })