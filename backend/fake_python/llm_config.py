from dotenv import load_dotenv
import os
from pathlib import Path
from langchain_groq import ChatGroq
from config import MODEL_NAME, TEMPERATURE

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env", override=True)

def get_llm():
    return ChatGroq(
        model_name=MODEL_NAME,
        api_key=os.getenv("GROQ_API_KEY"),
        max_tokens=900,
        temperature=TEMPERATURE,
    )