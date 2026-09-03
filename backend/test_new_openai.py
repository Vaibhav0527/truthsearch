import os, requests
key = os.environ.get("OPENAI_API_KEY", "YOUR_API_KEY")
headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'}
payload = {
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "hi"}],
    "max_tokens": 10
}
r = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
print(r.status_code)
print(r.text)
