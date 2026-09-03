# TruthSearch (Nighthawks)

TruthSearch is a full-stack, AI-powered application designed to verify facts, analyze images, transcribe and fact-check audio, and detect AI-generated media. The project combines a modern React frontend with a dual-backend architecture (Node.js for user management and a Python FastAPI backend for heavy AI workloads).

## 🌍 Live Demo
- **Frontend (Vercel)**: [https://frontend-hazel-three-30.vercel.app](https://frontend-hazel-three-30.vercel.app)
- **Backend API (Render)**: [https://truthsearch-4.onrender.com](https://truthsearch-4.onrender.com)
## 🚀 Features

- **Fact-Checking Engine**: Submit claims and get evidence-backed verdicts powered by advanced LLMs (Groq, OpenRouter, Gemini).
- **OCR Fact-Checking**: Upload images containing text (e.g., screenshots, documents). The app extracts text using OpenRouter Vision and verifies the claims automatically.
- **Voice Check & TTS**: Upload audio files or record voice snippets. The app transcribes speech using Whisper, fact-checks the transcription, and responds via Text-to-Speech (TTS) in multiple languages.
- **AI Image Detection**: Upload an image to receive a detailed digital forensics analysis indicating if the image was AI-generated, including a confidence score and visual inconsistencies.
- **User Authentication**: Secure JWT-based authentication and user profiles powered by Node.js and MongoDB.

## 🛠 Tech Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS & Framer Motion** (Styling and Animations)
- **Redux Toolkit** (State Management)
- **Firebase** (Additional integrations)

### Backend (Node.js)
- **Express.js**
- **MongoDB & Mongoose** (Database)
- **Cloudinary** (Media storage)
- **JSON Web Tokens (JWT)** (Authentication)

### AI Microservice (Python FastAPI)
- **FastAPI**
- **Groq & OpenAI/OpenRouter APIs** (LLM & Whisper integrations)
- **Google Gemini API**
- **gTTS** (Google Text-to-Speech)
- **Tesseract OCR**

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Vaibhav0527/truthsearch.git
cd truthsearch
```

### 2. Node.js Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
```
Run the Node.js backend:
```bash
npm run dev
```

### 3. Python AI Backend Setup
In a new terminal window, navigate to the `backend/fake_python/` directory (or use the provided batch script).
```bash
cd backend/fake_python
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```
Update your `backend/.env` file to include your AI API keys:
```env
GROQ_API_KEY=your_groq_key
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key
TESSERACT_PATH="C:\Program Files\Tesseract-OCR\tesseract.exe" # Adjust for your OS
```
Run the Python FastAPI server:
```bash
# Or simply run the root `start_python_backend.bat` script on Windows
uvicorn api:app --port 8000 --reload
```

### 4. Frontend Setup
In a new terminal window, navigate to the `frontend/` directory.
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend/` directory to point to your local backend servers:
```env
VITE_SERVER_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:4000
```
Run the Vite development server:
```bash
npm run dev
```

## 🌐 Endpoints Overview

- **Node API (`:4000`)**: Handles `/api/auth`, `/api/user`, `/api/history`, and media uploads `/api/u`.
- **Python API (`:8000`)**: 
  - `POST /fact-check` - Verify a text claim.
  - `POST /ocr` - Extract text from an image and fact-check it.
  - `POST /voice-check` - Transcribe audio, fact-check, and return a TTS MP3.
  - `POST /detect-ai-image` - Analyze an image for AI-generation artifacts.

## 📜 License
ISC License
