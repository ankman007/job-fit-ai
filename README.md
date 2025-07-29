## Project Description

Job Prep AI is an AI-powered interview preparation platform that leverages cutting-edge Retrieval-Augmented Generation (RAG) and LLMs to streamline the hiring process for both candidates and interviewers.
* For candidates, it generates a personalized, AI-curated cheatsheet to guide preparation.
* For interviewers, it offers a comprehensive candidate analysis and job compatibility insights.

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | **Next.js**, **Shadcn UI**, **Redux** |
| Backend    | **FastAPI**, **LangChain**, **FAISS**, **sentence-transformers** |
| LLM        | **Google Gemini Flash 2.0 API** |
| DB         | **PostgreSQL** via **Neon** |
| Embeddings | **all-MiniLM-L6-v2** from `sentence-transformers` |
| Deployment | **Docker**, **Vercel**, **Render** |

---

## Architecture

- Retrieval-Augmented Generation (RAG) pipeline using FAISS + sentence-transformers
- LangChain for orchestration
- Custom context injection using resume + job description
- JSON-structured LLM responses 
- Modular FastAPI services
- Schema-based response validation

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

## Support the Project

If you find this project helpful and would like to support its development, you can buy me a coffee! Your contribution is greatly appreciated and helps me dedicate more time and resources to improving Job Fit AI.

☕ [Buy Me a Coffee](https://buymeacoffee.com/ankitpoudel)

Thank you for your support!
