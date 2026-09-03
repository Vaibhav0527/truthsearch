import os, requests
from dotenv import load_dotenv

load_dotenv()
headers={'Authorization': 'Bearer ' + os.getenv('OPENAI_API_KEY')}
r = requests.get('https://models.inference.ai.azure.com/info/models', headers=headers)
print(r.status_code)
try:
    print(r.json())
except:
    print(r.text[:500])
