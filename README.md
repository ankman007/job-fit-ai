# Job Interview Preparation Assistant

## Problem Statement  
In today's competitive job market, securing a job is increasingly challenging. Candidates often need to apply to hundreds of job postings just to land a handful of interviews. Even after securing an interview, proper preparation is crucial—each job description comes with its own nuances, requiring a tailored approach to stand out. However, manually analyzing job descriptions, identifying skill gaps, and preparing for potential interview questions can be time-consuming and overwhelming.

## Solution  
To address this challenge, I have built a Django-based web platform that helps job seekers streamline their interview preparation by generating a personalized cheatsheet for each job application.

## How It Works  
1. **Upload Resume & Job Description** – Users can upload their resume and input the job description of the role they are applying for.  
2. **LLM-Powered Analysis** – The system analyzes both documents using an AI engine to generate key insights, including:  
   - **SWOT Analysis of the Resume** – Identifying strengths, weaknesses, opportunities, and threats.  
   - **Skill Assessment** – Highlighting gaps between the resume and the job description.  
   - **Concept Refresh** – Recommending topics based on past projects and job requirements.  
   - **Interview Questions** – Predicting questions related to personal projects, professional experience, and key job requirements.  
   - **Company Insights** – Providing relevant information about the company, culture, and expectations.  

This AI-driven interview assistant ensures that candidates walk into interviews fully prepared, improving their chances of success while saving hours of manual preparation.

## To set up this project 
- Clone this repository and cd onto the project
- Create a new file called .env in base directory of the project and copy contents from .env.example onto that file. Replace DJANGO_SECRET_KEY in env file with your own 
- From base directory run `docker-compose up --build` to build and run the containers. You need to install Docker desktop in your system for this step.
- After the containers and up and running; apply the migrations to setup database schema with `docker-compose exec web python manage.py migrate` 
- Next, collect static files required by Django for serving assets with `docker-compose exec web python manage.py collectstatic --noinput` 
- Now, the application should be running on port 8000
- To stop the application and the containers, run `docker-compose down`