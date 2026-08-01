@echo off
cd backend\fake_python
echo Starting Python FastAPI Server...
.venv\Scripts\python -m uvicorn api:app --port 8000 --reload
pause
