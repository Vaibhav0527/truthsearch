import os
import tempfile
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Create a tiny mp3 or wav to test
# Actually, I'll use a real audio file or something. Or just an empty one.
# Wait, let's just make the test script and see what happens with prompt vs no prompt.
dummy_audio = b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00D\xac\x00\x00\x88X\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00'

whisper_kwargs = {
    "model": "whisper-large-v3",
    "response_format": "verbose_json",
    "temperature": 0.0,
    "prompt": "TruthLens fact checking application. Accurate transcription of facts, claims, and debate statements. Context provided to avoid hallucinations.",
}

with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
    f.write(dummy_audio)
    f.seek(0)
    
    with open(f.name, "rb") as af:
        whisper_kwargs["file"] = ("test.wav", af)
        try:
            transcription = groq_client.audio.transcriptions.create(**whisper_kwargs)
            print(transcription)
        except Exception as e:
            print("Error:", e)

os.unlink(f.name)
