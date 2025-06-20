import openai
import os
import json
from typing import List, Dict, Any
from dotenv import load_dotenv
load_dotenv()  # Add this line after the imports
# Configure the API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("Warning: OPENAI_API_KEY environment variable not found.")
    api_key = "YOUR_API_KEY"  # Replace with your actual API key

openai.api_key = api_key

def generate_quiz_questions(
    skill: str,
    skill_level: str,
    industry: str,
    role: str,
    cluster: str,
    num_questions: int
) -> List[Dict[str, Any]]:
    """
    Generate quiz questions using OpenAI's ChatGPT API.
    
    Args:
        skill: The specific skill to test (e.g., "Python")
        skill_level: The difficulty level (e.g., "bronze", "silver", "gold")
        industry: The industry context (e.g., "Technology")
        role: The professional role (e.g., "Software Engineer")
        cluster: The knowledge cluster (e.g., "Programming")
        num_questions: Number of questions to generate
        
    Returns:
        List of question dictionaries with format:
        {
            "question": str,
            "options": Dict[str, str],
            "correct_answer": str,
            "explanation": str,
            "difficulty_level": str,
            "skill": str,
            "industry": str,
            "role": str,
            "cluster": str,
            "bloom_taxonomy": str,
            "estimated_time": str
        }
    """
    try:
        # Create the prompt for question generation
        prompt = f"""
        Generate {num_questions} multiple-choice questions about {skill} for a {skill_level} level {role} in the {industry} industry.
        Focus on the {cluster} knowledge cluster.
        
        Each question should have:
        1. A clear question text
        2. Four options (A, B, C, D)
        3. One correct answer
        4. A brief explanation
        5. Appropriate difficulty level
        6. Bloom's taxonomy level
        7. Estimated time to answer (in seconds)
        
        Format the response as a JSON array of question objects with the following structure:
        [
            {{
                "question": "question text",
                "options": {{
                    "A": "option A",
                    "B": "option B",
                    "C": "option C",
                    "D": "option D"
                }},
                "correct_answer": "A/B/C/D",
                "explanation": "explanation text",
                "difficulty_level": "{skill_level}",
                "skill": "{skill}",
                "industry": "{industry}",
                "role": "{role}",
                "cluster": "{cluster}",
                "bloom_taxonomy": "Knowledge/Comprehension/Application/Analysis/Synthesis/Evaluation",
                "estimated_time": "time in seconds"
            }}
        ]
        
        Ensure the response is valid JSON and contains exactly {num_questions} questions.
        """
        
        # Generate the questions using ChatGPT
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert quiz question generator. Generate high-quality, educational multiple-choice questions."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        # Extract the response text
        response_text = response.choices[0].message.content
        
        # Parse the response and format it
        questions = []
        try:
            # Try to parse the response as JSON
            questions = json.loads(response_text)
        except json.JSONDecodeError:
            # If JSON parsing fails, try to extract questions from text
            questions = extract_questions_from_text(response_text)
        
        # Ensure we have the correct number of questions
        if len(questions) > num_questions:
            questions = questions[:num_questions]
        elif len(questions) < num_questions:
            # If we don't have enough questions, generate more
            additional_questions = generate_quiz_questions(
                skill, skill_level, industry, role, cluster,
                num_questions - len(questions)
            )
            questions.extend(additional_questions)
        
        return questions
        
    except Exception as e:
        print(f"Error generating questions: {str(e)}")
        # Return some default questions in case of error
        return get_default_questions(skill, num_questions)

def extract_questions_from_text(text: str) -> List[Dict[str, Any]]:
    """
    Extract questions from text format when JSON parsing fails.
    This is a fallback mechanism.
    """
    try:
        # Try to find JSON-like structure in the text
        start_idx = text.find('[')
        end_idx = text.rfind(']') + 1
        if start_idx != -1 and end_idx != -1:
            json_str = text[start_idx:end_idx]
            return json.loads(json_str)
    except:
        pass
    return []

def get_default_questions(skill: str, num_questions: int) -> List[Dict[str, Any]]:
    """
    Return default questions when API call fails.
    """
    default_questions = [
        {
            "question": f"What is the main purpose of {skill}?",
            "options": {
                "A": "To make coffee",
                "B": "To write code",
                "C": "To play games",
                "D": "To browse the internet"
            },
            "correct_answer": "B",
            "explanation": f"{skill} is primarily used for writing code and developing software.",
            "difficulty_level": "beginner",
            "skill": skill,
            "industry": "Technology",
            "role": "Developer",
            "cluster": "Programming",
            "bloom_taxonomy": "Knowledge",
            "estimated_time": "10"
        }
    ]
    
    # Repeat the default question if needed
    return default_questions * num_questions

if __name__ == "__main__":
    # Test the question generator
    questions = generate_quiz_questions(
        skill="Python",
        skill_level="bronze",
        industry="Technology",
        role="Software Engineer",
        cluster="Programming",
        num_questions=2
    )
    print(json.dumps(questions, indent=2)) 