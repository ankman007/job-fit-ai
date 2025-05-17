## Project Description

Job Fit AI is an AI-powered web platform designed to enhance the interview preparation process for both candidates and interviewers. It leverages advanced large language models (LLMs) to analyze resumes and job descriptions, providing tailored insights and materials.

**For Job Seekers:**

The platform generates a personalized AI-powered cheatsheet to aid in preparation, including:

* Resume SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)
* Identification of skill gaps based on the job description
* Suggestions for concept refresh or study areas
* Predicted interview questions relevant to the role and resume
* Insights about the target company

**For Interviewers:**

Job Fit AI offers a comprehensive evaluation toolkit to streamline the assessment process, featuring:

* A concise candidate overview
* Analysis of the candidate's experience and education history
* A compatibility score indicating the fit between the candidate and the job
* An assessment of the candidate's skills
* Identified skill gaps and potential concerns
* Recommended screening questions tailored to the candidate and role
* Suggestions for interview strategy

By providing these detailed analyses and preparation tools, Job Fit AI helps both parties prepare more efficiently and make more informed decisions during the hiring process.

**[Project Link](https://job-fit-ai.vercel.app/)**

---

## Technology Stack

* FastAPI 
* Next.js 
* PostgreSQL
* Docker 
* Google Cloud AI API
* Redux 
* Shadcn UI

---

## Project Setup Guide

### 1. Clone the Repository and Navigate to Backend

First, clone the project from the repository and change directory into the `backend` folder:
```
git clone https://github.com/ankman007/job-fit-ai.git
cd job-fit-ai/backend
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory based on the provided `.env.example`
Open the newly created .env file and replace the placeholder values with your own credentials:
- SECRET_KEY: Provide a unique secret key for your application.
- GEMINI_API_KEY: Obtain your API key from [Google AI Studio](https://aistudio.google.com/) and insert it here.
- DATABASE_URL: Specify the connection URL for your PostgreSQL database instance.

### 3. Build and Run the Backend Docker Image

Build the Docker image for the FastAPI application and then run it in detached mode, mapping port 8000 on your host to port 8000 in the container:

```
docker build -t fastapi-app .
docker run -d -p 8000:8000 fastapi-app
```
The FastAPI backend should now be running and accessible on `http://localhost:8000`

### 4. Setup and Run the Frontend
Once the backend is up and running, navigate to the frontend directory, install the dependencies, and start the development server:
```
cd ../frontend
npm install
npm run dev
```
The frontend application should now be running and accessible on `http://localhost:3000`

---

## Support the Project

If you find this project helpful and would like to support its development, you can buy me a coffee! Your contribution is greatly appreciated and helps me dedicate more time and resources to improving Job Fit AI.

☕ [Buy Me a Coffee](https://buymeacoffee.com/ankitpoudel)

Thank you for your support!