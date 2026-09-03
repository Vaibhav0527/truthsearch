import os, requests
from dotenv import load_dotenv

load_dotenv()
headers={'Authorization': 'Bearer ' + os.getenv('GROQ_API_KEY')}
r = requests.get('https://api.groq.com/openai/v1/models', headers=headers)
models = r.json().get('data', [])
for m in models:
    print(m['id'])
