from dotenv import load_dotenv
import os
from pathlib import Path
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env", override=True)

def get_llm():
    openrouter_key = os.getenv("OPENROUTER_API_KEY")

    # Primary: OpenRouter model (e.g. gpt-4o-mini or a llama model)
    if openrouter_key:
        primary = ChatOpenAI(
            model_name="openai/gpt-4o-mini",
            api_key=openrouter_key,
            base_url="https://openrouter.ai/api/v1",
            max_tokens=900,
            temperature=0,
        )
    else:
        # Fallback to Groq if OpenRouter key is missing
        groq_key = os.getenv("GROQ_API_KEY")
        primary = ChatGroq(
            model_name="llama-3.1-8b-instant",
            api_key=groq_key,
            max_tokens=900,
            temperature=0,
        )

    return primary