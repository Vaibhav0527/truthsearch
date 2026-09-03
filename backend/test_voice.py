import requests, json

url = "http://localhost:8000/voice-check"

# Create dummy audio
dummy_audio = b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00D\xac\x00\x00\x88X\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00'

files = {'file': ('test.wav', dummy_audio, 'audio/wav')}
data = {'language': 'auto'}

r = requests.post(url, files=files, data=data)
print(r.status_code)
try:
    print(r.json())
except:
    print(r.text)
