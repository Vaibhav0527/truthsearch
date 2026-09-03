import os, requests

key = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"

r = requests.get(url)
print(r.status_code)
try:
    models = r.json()
    print([m['name'] for m in models.get('models', [])[:5]])
except Exception as e:
    print(r.text[:500])
