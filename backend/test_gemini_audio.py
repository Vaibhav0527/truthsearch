import os, requests, base64

gemini_key = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={gemini_key}"

# Create a dummy tiny mp3 or wav to test
dummy_audio = b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00D\xac\x00\x00\x88X\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00'

payload = {
    "contents": [{
        "parts": [
            {"text": "Transcribe this audio."},
            {
                "inlineData": {
                    "mimeType": "audio/wav",
                    "data": base64.b64encode(dummy_audio).decode("utf-8")
                }
            }
        ]
    }]
}

r = requests.post(url, json=payload)
print(r.status_code)
try:
    print(r.json())
except:
    pass
