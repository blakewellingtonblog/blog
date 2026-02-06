#!/bin/bash

# Activate the virtual environment
source venv/bin/activate

# Run FastAPI
uvicorn main:app --reload --host 0.0.0.0 --port 8000