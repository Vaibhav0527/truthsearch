import os, requests

key = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"

payload = {
  "contents": [{
    "parts":[{"text": "Hello"}]
    }]
}

r = requests.post(url, json=payload)
print(r.status_code)
print(r.text[:500])
