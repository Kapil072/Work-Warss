from typing import Dict, Any
from ..base_plugin import BasePlugin
from openai import OpenAI
import os

class QuizGeneratorPlugin(BasePlugin):
    """Plugin for generating quizzes using AI"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self._name = "quiz_generator"
        self._version = "1.0.0"
        self._description = "Generates quizzes using AI"
    
    @property
    def name(self) -> str:
        return self._name
    
    @property
    def version(self) -> str:
        return self._version
    
    @property
    def description(self) -> str:
        return self._description
    
    def initialize(self) -> None:
        """Initialize the plugin"""
        # Add any initialization logic here
        pass
    
    def get_ui_components(self) -> Dict[str, Any]:
        """Return UI components for the plugin"""
        return {
            "QuizGenerator": {
                "component": "QuizGeneratorComponent",
                "props": {
                    "title": "AI Quiz Generator",
                    "description": "Generate quizzes using AI"
                }
            }
        }
    
    def get_ai_handlers(self) -> Dict[str, Any]:
        """Return AI handlers for the plugin"""
        return {
            "generate_quiz": self.generate_quiz,
            "validate_answer": self.validate_answer
        }
    
    def generate_quiz(self, topic: str, difficulty: str, num_questions: int) -> Dict[str, Any]:
        """Generate a quiz using AI"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": f"Generate a {difficulty} quiz about {topic} with {num_questions} questions."},
                    {"role": "user", "content": "Please format the response as JSON with questions, options, and correct answers."}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return {"error": str(e)}
    
    def validate_answer(self, question: str, answer: str) -> Dict[str, Any]:
        """Validate a quiz answer using AI"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Validate if the answer is correct for the given question."},
                    {"role": "user", "content": f"Question: {question}\nAnswer: {answer}"}
                ]
            )
            return {"is_correct": response.choices[0].message.content}
        except Exception as e:
            return {"error": str(e)}
    
    def cleanup(self) -> None:
        """Cleanup plugin resources"""
        # Add any cleanup logic here
        pass 