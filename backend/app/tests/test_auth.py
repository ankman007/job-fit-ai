from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app 
from app.models import Base
from app import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_signup_success():
    response = client.post("auth/sign-up", json={
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "testpassword123",
        "bio": "Test bio",
        "location": "Testville",
        "job_title": "Tester"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["user_details"]["email"] == "testuser@example.com"


def test_signup_duplicate_email():
    # First request (should succeed)
    client.post("/auth/sign-up", json={
        "name": "Test User",
        "email": "duplicate@example.com",
        "password": "test123",
        "bio": "bio",
        "location": "city",
        "job_title": "job"
    })

    # Second request (should fail)
    response = client.post("/auth/sign-up", json={
        "name": "Test User",
        "email": "duplicate@example.com",
        "password": "test123",
        "bio": "bio",
        "location": "city",
        "job_title": "job"
    })

    assert response.status_code == 400
    assert response.json()["detail"] == "User with this email already registered."


def test_login_success():
    # First, register a new user
    email = "loginuser@example.com"
    password = "loginpass123"
    client.post("/auth/sign-up", json={
        "name": "Login User",
        "email": email,
        "password": password,
        "bio": "bio",
        "location": "location",
        "job_title": "job"
    })

    # Then try logging in
    response = client.post("/auth/login", json={
        "email": email,
        "password": password
    })

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user_details"]["email"] == email


def test_login_wrong_password():
    response = client.post("/auth/login", json={
        "email": "loginuser@example.com",
        "password": "wrongpass"
    })
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect password"


def test_login_nonexistent_user():
    response = client.post("/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "any"
    })
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"


