FROM python:3.10-slim

WORKDIR /core

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .
