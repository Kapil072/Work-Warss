import google.generativeai as genai
import json
import random
from typing import Dict, List, Optional
from enum import Enum

class SkillLevel(Enum):
    UNRANKED = "unranked"
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"

    @staticmethod
    def from_xp(xp: int) -> 'SkillLevel':
        """Determine skill level based on XP points."""
        if xp < 30:
            return SkillLevel.UNRANKED
        elif xp < 60:
            return SkillLevel.BRONZE
        elif xp <= 90:
            return SkillLevel.SILVER
        else:
            return SkillLevel.GOLD

class QuestionGenerator:
    def __init__(self, api_key: str):
        """Initialize the question generator with Gemini API key."""
        genai.configure(api_key=api_key)
        # Try different model names that are currently available
        try:
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        except:
            try:
                self.model = genai.GenerativeModel('gemini-1.5-pro')
            except:
                try:
                    self.model = genai.GenerativeModel('gemini-pro')
                except:
                    # List available models to help debug
                    print("Available models:")
                    for model in genai.list_models():
                        if 'generateContent' in model.supported_generation_methods:
                            print(f"- {model.name}")
                    raise Exception("No compatible model found")
        
        # Difficulty mapping based on skill levels (aligned with certification system)
        self.difficulty_mapping = {
            SkillLevel.UNRANKED: {
                "name": "Easy",
                "description": "Basic concepts and fundamental knowledge",
                "pass_rate": "70%",
                "max_wrong": 3,
                "xp_range": "0-29 XP"
            },
            SkillLevel.BRONZE: {
                "name": "Medium", 
                "description": "Intermediate concepts requiring practical understanding",
                "pass_rate": "80%",
                "max_wrong": 2,
                "xp_range": "30-59 XP"
            },
            SkillLevel.SILVER: {
                "name": "Hard",
                "description": "Advanced concepts requiring deep knowledge and analysis",
                "pass_rate": "90%",
                "max_wrong": 1,
                "xp_range": "60-90 XP"
            },
            SkillLevel.GOLD: {
                "name": "Very Hard",
                "description": "Expert-level concepts requiring mastery and complex reasoning",
                "pass_rate": "Perfect score expected",
                "max_wrong": 0,
                "xp_range": "90+ XP"
            }
        }

    def create_question_prompt(self, skill: str, skill_level: SkillLevel, industry: str, 
                             role: str, cluster: str, num_questions: int = 1) -> str:
        """Create a detailed prompt for generating questions based on all parameters."""
        
        difficulty_info = self.difficulty_mapping[skill_level]
        
        prompt = f"""
You are an expert educational content creator specializing in technical skills assessment for the Work Wars platform. Generate {num_questions} multiple-choice question(s) for the following specifications:

**ASSESSMENT CONTEXT:**
- **SKILL:** {skill}
- **INDUSTRY:** {industry}
- **ROLE:** {role}
- **CLUSTER:** {cluster}
- **SKILL LEVEL:** {skill_level.value.upper()} ({difficulty_info['name']})

**DIFFICULTY DESCRIPTION:** {difficulty_info['description']}
**ASSESSMENT REQUIREMENTS:** 
- Pass rate needed: {difficulty_info['pass_rate']}
- Maximum wrong answers allowed: {difficulty_info['max_wrong']}

**CONTEXT-AWARE REQUIREMENTS:**
- Tailor questions to be relevant for {role} professionals in {industry}
- Consider industry-specific scenarios and terminology when appropriate
- Ensure questions align with the role's typical responsibilities and knowledge areas
- Questions should be relevant to the {cluster} cluster skill assessment

**QUESTION REQUIREMENTS:**

For {skill_level.value.upper()} level ({difficulty_info['name']}):
"""

        # Add specific requirements based on skill level
        if skill_level == SkillLevel.UNRANKED:
            prompt += """
- Focus on basic definitions, terminology, and fundamental concepts
- Questions should test recall and basic understanding relevant to the role/industry
- Use direct, simple questions (e.g., "What is X?", "Which of the following...?")
- Use straightforward language and clear options
- Include questions about basic principles and introductory topics
- Keep questions under 15 words
"""
        elif skill_level == SkillLevel.BRONZE:
            prompt += """
- Focus on practical application of concepts in the given industry/role context
- Include brief scenario-based questions with moderate complexity
- Test understanding of relationships between concepts
- Require some analysis but not deep technical expertise
- Include questions about best practices and common use cases for the role
- Keep questions under 20 words, scenarios under 25 words
"""
        elif skill_level == SkillLevel.SILVER:
            prompt += """
- Focus on advanced concepts and problem-solving relevant to senior professionals
- Include concise technical scenarios requiring analysis in industry context
- Test ability to compare, contrast, and evaluate approaches
- Require strong technical knowledge and reasoning skills for the role
- Include questions about optimization, troubleshooting, and advanced techniques
- Keep questions direct and technical, under 25 words
"""
        else:  # GOLD
            prompt += """
- Focus on expert-level mastery and cutting-edge concepts for industry leaders
- Include brief but sophisticated scenarios requiring expert reasoning
- Test ability to synthesize knowledge across multiple domains
- Require mastery-level understanding and quick problem-solving
- Include questions about architecture, design patterns, and expert optimizations
- Challenge experts with precise, concise questions under 30 words
"""

        prompt += f"""
**TIMING CONSTRAINT:**
- Each question must be answerable within 10 seconds
- Keep questions concise and direct
- Avoid lengthy scenarios or complex multi-part questions
- Focus on quick recall, recognition, or simple application

**ANSWER PLACEMENT REQUIREMENT:**
- CRITICAL: Randomize the position of the correct answer
- The correct answer should NOT always be option A
- Distribute correct answers randomly among options A, B, C, and D
- Ensure each question has the correct answer in a different position when generating multiple questions
- Make all incorrect options (distractors) plausible but clearly wrong

**OUTPUT FORMAT:**
Provide your response as a valid JSON array containing {num_questions} question object(s). Each question object must have this exact structure:

{{
    "question": "Short, direct question text (max 20 words)",
    "options": {{
        "A": "Brief option (max 8 words)",
        "B": "Brief option (max 8 words)", 
        "C": "Brief option (max 8 words)",
        "D": "Brief option (max 8 words)"
    }},
    "correct_answer": "A|B|C|D (randomized - NOT always A)",
    "explanation": "Concise explanation (max 50 words)",
    "difficulty_level": "{skill_level.value}",
    "skill": "{skill}",
    "industry": "{industry}",
    "role": "{role}",
    "cluster": "{cluster}",
    "bloom_taxonomy": "Knowledge/Comprehension/Application/Analysis/Synthesis/Evaluation",
    "estimated_time": "10"
}}

**QUALITY STANDARDS:**
1. Questions must be short and quick to read (10 seconds max)
2. All options must be brief and plausible
3. Only ONE option should be clearly correct
4. Distractors should be reasonable but definitively wrong
5. Question should be clear, unambiguous, and grammatically correct
6. Explanation should be concise but educational (max 50 words)
7. Difficulty should match the specified skill level exactly
8. Content should be current and relevant to modern practices in the specified industry/role
9. Prioritize direct, factual questions over lengthy scenarios
10. **RANDOMIZE correct answer positions - do NOT default to option A**

**IMPORTANT:** 
- Return ONLY the JSON array, no additional text or formatting
- Ensure JSON is valid and properly formatted
- Make sure the difficulty truly matches the {difficulty_info['name']} level
- Each question should require knowledge appropriate for someone with {skill_level.value} level expertise in {role} role within {industry} industry
- **VARY the correct_answer field across questions - use A, B, C, and D randomly**

Generate the questions now:"""

        return prompt

    def post_process_questions(self, questions: List[Dict]) -> List[Dict]:
        """Post-process questions to ensure answer randomization if not already done."""
        processed_questions = []
        
        for question in questions:
            # Check if all questions have 'A' as correct answer (indicating non-randomized)
            if question.get('correct_answer') == 'A':
                # Randomize the correct answer position
                new_correct = random.choice(['A', 'B', 'C', 'D'])
                
                if new_correct != 'A':
                    options = question['options'].copy()
                    # Swap the correct answer with the new position
                    correct_content = options['A']
                    options['A'] = options[new_correct]
                    options[new_correct] = correct_content
                    
                    question['options'] = options
                    question['correct_answer'] = new_correct
            
            processed_questions.append(question)
        
        return processed_questions

    def generate_questions(self, skill: str, skill_level: SkillLevel, industry: str, 
                         role: str, cluster: str, num_questions: int = 1) -> List[Dict]:
        """Generate questions using the Gemini API with all context parameters."""
        try:
            prompt = self.create_question_prompt(skill, skill_level, industry, role, cluster, num_questions)
            
            response = self.model.generate_content(prompt)
            
            # Clean and parse the response
            response_text = response.text.strip()
            
            # Remove any markdown formatting if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # Parse JSON
            questions = json.loads(response_text)
            
            # Validate the structure
            validated_questions = []
            for q in questions:
                if self._validate_question_structure(q):
                    validated_questions.append(q)
                else:
                    print(f"Warning: Skipping invalid question structure: {q}")
            
            # Post-process to ensure answer randomization
            processed_questions = self.post_process_questions(validated_questions)
            
            return processed_questions
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response text: {response_text}")
            return []
        except Exception as e:
            print(f"Error generating questions: {e}")
            return []

    def _validate_question_structure(self, question: Dict) -> bool:
        """Validate that a question has the required structure."""
        required_fields = [
            'question', 'options', 'correct_answer', 'explanation', 
            'difficulty_level', 'skill', 'industry', 'role', 'cluster',
            'bloom_taxonomy', 'estimated_time'
        ]
        
        # Check all required fields exist
        for field in required_fields:
            if field not in question:
                return False
        
        # Check options structure
        options = question.get('options', {})
        if not isinstance(options, dict) or len(options) != 4:
            return False
        
        required_options = ['A', 'B', 'C', 'D']
        for opt in required_options:
            if opt not in options:
                return False
        
        # Check correct_answer is valid
        if question.get('correct_answer') not in required_options:
            return False
        
        return True

    def display_questions_json(self, questions: List[Dict], skill: str, skill_level: SkillLevel, 
                             industry: str, role: str, cluster: str):
        """Display questions in JSON format with all metadata."""
        difficulty_info = self.difficulty_mapping[skill_level]
        
        output = {
            "quiz_metadata": {
                "skill": skill,
                "skill_level": skill_level.value,
                "difficulty": difficulty_info["name"],
                "industry": industry,
                "role": role,
                "cluster": cluster,
                "total_questions": len(questions),
                "pass_requirements": {
                    "pass_rate": difficulty_info["pass_rate"],
                    "max_wrong_answers": difficulty_info["max_wrong"],
                },
                "estimated_time_minutes": sum(int(q.get('estimated_time', 10)) for q in questions) // 60
            },
            "questions": questions
        }
        
        print(json.dumps(output, indent=2, ensure_ascii=False))

    def get_cluster_info(self):
        """Display message about cluster input."""
        print("\n=== CLUSTER INPUT ===")
        print("You will be asked to enter the cluster name as input.")

def display_question_formatted(question: Dict, question_number: int):
    """Display a single question in formatted view."""
    print(f"\n--- Question {question_number} ---")
    print(f"Skill: {question.get('skill', 'N/A')}")
    print(f"Industry: {question.get('industry', 'N/A')}")
    print(f"Role: {question.get('role', 'N/A')}")
    print(f"Cluster: {question.get('cluster', 'N/A')}")
    print(f"Difficulty: {question.get('difficulty_level', 'N/A').upper()}")
    print(f"\nQ: {question.get('question', 'N/A')}")
    
    options = question.get('options', {})
    for key in ['A', 'B', 'C', 'D']:
        if key in options:
            print(f"   {key}. {options[key]}")
    
    print(f"\nCorrect Answer: {question.get('correct_answer', 'N/A')}")
    print(f"Explanation: {question.get('explanation', 'N/A')}")
    print(f"Estimated Time: {question.get('estimated_time', 'N/A')} seconds")

def get_user_input():
    """Get all required inputs from user."""
    print("=== WORK WARS QUESTION GENERATOR ===")
    
    # Get industry
    industry = input("\nEnter industry: ").strip()
    if not industry:
        print("Industry cannot be empty!")
        return None, None, None, None, None
    
    # Get role
    role = input("Enter role: ").strip()
    if not role:
        print("Role cannot be empty!")
        return None, None, None, None, None
    
    # Get cluster
    cluster = input("Enter cluster: ").strip()
    if not cluster:
        print("Cluster cannot be empty!")
        return None, None, None, None, None
    
    # Get skill
    skill = input("Enter skill: ").strip()
    if not skill:
        print("Skill cannot be empty!")
        return None, None, None, None, None
    
    # Get XP and determine skill level
    print("\nXP ranges:")
    print("- Unranked: 0-29 XP")
    print("- Bronze: 30-59 XP") 
    print("- Silver: 60-90 XP")
    print("- Gold: 91+ XP")
    
    try:
        xp = int(input("Enter your current XP: "))
        if xp < 0:
            print("XP cannot be negative!")
            return None, None, None, None, None
        selected_level = SkillLevel.from_xp(xp)
        print(f"Skill level determined: {selected_level.value.upper()} ({xp} XP)")
    except ValueError:
        print("Invalid XP input!")
        return None, None, None, None, None
    
    return industry, role, cluster, skill, selected_level

def get_number_of_questions():
    """Get the number of questions from user."""
    try:
        num_questions = int(input("How many questions do you want to generate? (1-10): "))
        if num_questions < 1 or num_questions > 10:
            print("Please enter a number between 1 and 10.")
            return 1
        return num_questions
    except ValueError:
        print("Invalid input! Using default of 1 question.")
        return 1

def get_output_format():
    """Get preferred output format from user."""
    print("\nOutput format options:")
    print("1. JSON format (structured data)")
    print("2. Formatted display (readable)")
    
    try:
        choice = int(input("Choose output format (1-2): "))
        return choice == 1  # True for JSON, False for formatted
    except ValueError:
        print("Invalid input! Using JSON format by default.")
        return True

def check_available_models(api_key: str):
    """Check and display available models."""
    genai.configure(api_key=api_key)
    print("Checking available models...")
    try:
        available_models = []
        for model in genai.list_models():
            if 'generateContent' in model.supported_generation_methods:
                available_models.append(model.name)
                print(f"✅ {model.name}")
        return available_models
    except Exception as e:
        print(f"Error checking models: {e}")
        return []

def main():
    # Initialize with your API key
    API_KEY = "AIzaSyC9Zjps4t8jY4c-yme9NsywlLHroIP9Ezg"  # Replace with your actual API key
    
    # Check available models first
    available_models = check_available_models(API_KEY)
    if not available_models:
        print("❌ No compatible models found. Please check your API key.")
        return
    
    try:
        generator = QuestionGenerator(API_KEY)
        print("✅ Question generator initialized successfully!")
        
        # Display available clusters
        generator.get_cluster_info()
        
    except Exception as e:
        print(f"❌ Failed to initialize generator: {e}")
        return
    
    while True:
        # Get user input
        industry, role, cluster, skill, skill_level = get_user_input()
        
        if None in [industry, role, cluster, skill, skill_level]:
            continue
        
        # Get number of questions
        num_questions = get_number_of_questions()
        
        # Get output format preference
        json_output = get_output_format()
        
        print(f"\nGenerating {num_questions} question(s) for:")
        print(f"  Industry: {industry}")
        print(f"  Role: {role}")
        print(f"  Cluster: {cluster}")
        print(f"  Skill: {skill}")
        print(f"  Level: {skill_level.value.upper()}")
        print("Please wait...")
        
        # Generate questions
        questions = generator.generate_questions(skill, skill_level, industry, role, cluster, num_questions)
        
        if questions:
            print(f"\n✅ Successfully generated {len(questions)} question(s)!")
            
            # Display questions based on chosen format
            if json_output:
                print("\n" + "="*60)
                print("JSON OUTPUT:")
                print("="*60)
                generator.display_questions_json(questions, skill, skill_level, industry, role, cluster)
            else:
                print("\n" + "="*60)
                print("FORMATTED OUTPUT:")
                print("="*60)
                for i, question in enumerate(questions, 1):
                    display_question_formatted(question, i)
            
            # Option to save to file
            save_choice = input(f"\nDo you want to save these questions to a file? (y/n): ").lower()
            if save_choice == 'y':
                filename = f"{skill.replace(' ', '_').lower()}_{industry}_{role}_{cluster}_{skill_level.value}_questions.json"
                try:
                    with open(filename, 'w', encoding='utf-8') as f:
                        json.dump(questions, f, indent=2, ensure_ascii=False)
                    print(f"Questions saved to {filename}")
                except Exception as e:
                    print(f"Error saving file: {e}")
        
        else:
            print("❌ Failed to generate questions. Please try again.")
        
        # Ask if user wants to continue
        continue_choice = input("\nDo you want to generate more questions? (y/n): ").lower()
        if continue_choice != 'y':
            print("Thank you for using the Work Wars Question Generator!")
            break

if __name__ == "__main__":
    main()