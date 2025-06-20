from app import QuestionGenerator, SkillLevel
import json
import os
from typing import List, Dict
import random
from dotenv import load_dotenv

class Quiz:
    def __init__(self):
        """Initialize the quiz system."""
        self.questions = []
        self.current_score = 0
        self.total_questions = 0
        self.answers = []

    def load_questions_from_file(self, filename: str) -> bool:
        """Load questions from a JSON file."""
        try:
            with open(filename, 'r') as f:
                self.questions = json.load(f)
                self.total_questions = len(self.questions)
                return True
        except Exception as e:
            print(f"Error loading questions: {e}")
            return False

    def generate_new_questions(self, skill: str, industry: str, role: str, 
                             cluster: str, skill_level: SkillLevel, num_questions: int) -> bool:
        """Generate new questions using the AI."""
        try:
            # Load API key from environment
            load_dotenv()
            api_key = os.getenv('sk-proj-I3odDtOa6ZlYKy8K9ll6T3BlbkFJqzdKB099Vqj2gjy5krP6')
            
            if not api_key:
                print("No API key found. Please set GOOGLE_API_KEY in your .env file")
                return False

            # Initialize question generator
            generator = QuestionGenerator(api_key)
            # Generate questions
            self.questions = generator.generate_questions(
                skill=skill,
                skill_level=skill_level,
                industry=industry,
                role=role,
                cluster=cluster,
                num_questions=num_questions
            )
            
            self.total_questions = len(self.questions)
            return True
        except Exception as e:
            print(f"Error generating questions: {e}")
            return False

    def start_quiz(self):
        """Start the quiz and handle user interaction."""
        if not self.questions:
            print("No questions loaded! Please generate or load questions first.")
            return

        self.current_score = 0
        self.answers = []
        
        print("\n=== Quiz Started ===")
        print(f"Total questions: {self.total_questions}")
        print("Answer each question by entering A, B, C, or D")
        print("Enter 'quit' to end the quiz early\n")

        for i, question in enumerate(self.questions, 1):
            print(f"\nQuestion {i}/{self.total_questions}:")
            print(question['question'])
            print("\nOptions:")
            for option, text in question['options'].items():
                print(f"{option}. {text}")

            while True:
                answer = input("\nYour answer (A/B/C/D): ").strip().upper()
                if answer == 'QUIT':
                    print("\nQuiz ended early.")
                    self._show_results()
                    return
                if answer in ['A', 'B', 'C', 'D']:
                    break
                print("Invalid input! Please enter A, B, C, or D")

            is_correct = answer == question['correct_answer']
            self.answers.append({
                'question_num': i,
                'user_answer': answer,
                'correct_answer': question['correct_answer'],
                'is_correct': is_correct,
                'explanation': question['explanation']
            })

            if is_correct:
                self.current_score += 1
                print("\n✅ Correct!")
            else:
                print("\n❌ Incorrect!")
            
            print(f"Explanation: {question['explanation']}")

        self._show_results()

    def _show_results(self):
        """Display quiz results."""
        if not self.answers:
            return

        print("\n=== Quiz Results ===")
        print(f"Score: {self.current_score}/{self.total_questions}")
        percentage = (self.current_score / self.total_questions) * 100
        print(f"Percentage: {percentage:.1f}%")

        print("\nQuestion Summary:")
        for answer in self.answers:
            status = "✅" if answer['is_correct'] else "❌"
            print(f"\nQ{answer['question_num']}: {status}")
            if not answer['is_correct']:
                print(f"Your answer: {answer['user_answer']}")
                print(f"Correct answer: {answer['correct_answer']}")
                print(f"Explanation: {answer['explanation']}")

def main():
    """Main function to run the quiz system."""
    quiz = Quiz()

    while True:
        print("\n=== Work Wars Quiz System ===")
        print("1. Generate new questions")
        print("2. Load questions from file")
        print("3. Start quiz")
        print("4. Exit")

        choice = input("\nEnter your choice (1-4): ").strip()

        if choice == '1':
            # Get question parameters
            skill = input("\nEnter the skill (e.g., Python, JavaScript): ").strip()
            industry = input("Enter the industry (e.g., Technology, Healthcare): ").strip()
            role = input("Enter the role (e.g., Software Engineer): ").strip()
            cluster = input("Enter the cluster (e.g., Programming): ").strip()
            
            print("\nSkill Levels:")
            print("1. Unranked (0-29 XP)")
            print("2. Bronze (30-59 XP)")
            print("3. Silver (60-90 XP)")
            print("4. Gold (90+ XP)")
            
            level_choice = input("\nChoose skill level (1-4): ").strip()
            skill_level = {
                '1': SkillLevel.UNRANKED,
                '2': SkillLevel.BRONZE,
                '3': SkillLevel.SILVER,
                '4': SkillLevel.GOLD
            }.get(level_choice, SkillLevel.UNRANKED)

            num_questions = int(input("\nHow many questions (1-10)? ").strip())
            num_questions = max(1, min(10, num_questions))

            print("\nGenerating questions...")
            if quiz.generate_new_questions(skill, industry, role, cluster, skill_level, num_questions):
                print("Questions generated successfully!")
            else:
                print("Failed to generate questions. Please try again.")

        elif choice == '2':
            filename = input("\nEnter the question file name: ").strip()
            if quiz.load_questions_from_file(filename):
                print("Questions loaded successfully!")
            else:
                print("Failed to load questions. Please check the file name and try again.")

        elif choice == '3':
            quiz.start_quiz()

        elif choice == '4':
            print("\nThank you for using Work Wars Quiz System!")
            break

        else:
            print("\nInvalid choice! Please enter 1-4.")

if __name__ == "__main__":
    main() 