import openai
from openai import OpenAI
import os
from dotenv import load_dotenv
import pathlib

# Get the current directory
current_dir = pathlib.Path(__file__).parent.parent.absolute()

# Load environment variables from api.env file
load_dotenv(os.path.join(current_dir, 'api.env'))

# Get API key
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please check your api.env file.")

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Hello, are you working?"}
        ]
    )
    print("✅ API is working!")
    print("Response:", response.choices[0].message.content)

except openai.AuthenticationError:
    print("❌ Invalid API key or authentication error.")
except Exception as e:
    print("❌ Error:", str(e))
