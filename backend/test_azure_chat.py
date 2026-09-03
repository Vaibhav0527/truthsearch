import os, requests
from dotenv import load_dotenv

load_dotenv()
headers={'Authorization': 'Bearer ' + os.getenv('OPENAI_API_KEY'), 'Content-Type': 'application/json'}
payload = {
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "hi"}],
    "max_tokens": 10
}
r = requests.post('https://models.inference.ai.azure.com/chat/completions', headers=headers, json=payload)
print(r.status_code)
try:
    print(r.json())
except:
    print(r.text[:500])
