from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
try:
    client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    print(client.chat.completions.create(model='llama-3.2-11b-vision-preview', messages=[{'role': 'user', 'content': 'hello'}]))
except Exception as e:
    print("Error:", e)
