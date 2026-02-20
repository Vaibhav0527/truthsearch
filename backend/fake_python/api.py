from fastapi import FastAPI
from pydantic import BaseModel
import os
import pytesseract
import cv2
import numpy as np
from fastapi import UploadFile, HTTPException
from dotenv import load_dotenv
from search_client import get_evidence
from verifier_chain import build_verifier_chain
from fastapi.middleware.cors import CORSMiddleware

# Python handles the backslashes automatically when reading from the environment
tesseract_path = os.getenv("TESSERACT_PATH")

if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClaimRequest(BaseModel):
    claim: str

chain = build_verifier_chain()

@app.post("/fact-check")
def fact_check(request: ClaimRequest):
    evidence = get_evidence(request.claim)

    result = chain.invoke({
        "claim": request.claim,
        "evidence": evidence
    })

    return result.model_dump()
    

@app.post("/ocr")
async def extract_text(file: UploadFile):
    # Check if the file is actually an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        image_bytes = await file.read()
        np_img = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if img is None:
            raise ValueError("Failed to decode image")

        # Your preprocessing
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Tip: Use Otsu's thresholding for better results with varied lighting
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # OCR
        text = pytesseract.image_to_string(thresh)

        evidence = get_evidence(text)
        result = chain.invoke({
            "claim": text,
            "evidence": evidence
        })
        
        return {"extracted_text": text.strip(), "result": result.model_dump()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    
    