from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from config import MODEL_NAME, TEMPERATURE

load_dotenv()

def get_llm():
    return ChatGroq(
        model_name=MODEL_NAME,
        api_key=os.getenv("GROQ_API_KEY"),
        max_tokens=900,
        temperature=TEMPERATURE,
    )
