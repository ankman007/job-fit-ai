## Project Description

Job Fit AI is an AI-powered web platform that streamlines interview preparation for both job seekers and interviewers using LLMs.
* For candidates, it generates a personalized, AI-curated cheatsheet to guide preparation.
* For interviewers, it offers a comprehensive candidate analysis and job compatibility insights.

🔗 [Live Demo](https://job-fit-ai.vercel.app/)

---

## Tech Stack & Deployement

This project is built using modern web technologies and deployed entirely on free-tier services:
* Frontend: Next.js (hosted on Vercel)
* Backend: FastAPI (hosted on Render)
* Database: PostgreSQL (managed via Neon)
* Other Tools: Docker, Redux, Shadcn UI, Google Gemini API

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
- ALGORITHM: Use HS256, common  algorithm for JWT auth in FastAPI

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
