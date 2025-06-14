from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from quiz_generator import generate_quiz_questions

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizRequest(BaseModel):
    skill: str
    skill_level: str
    industry: str
    role: str
    cluster: str
    num_questions: int

@app.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest) -> List[Dict[str, Any]]:
    try:
        questions = generate_quiz_questions(
            skill=request.skill,
            skill_level=request.skill_level,
            industry=request.industry,
            role=request.role,
            cluster=request.cluster,
            num_questions=request.num_questions
        )
        return questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)