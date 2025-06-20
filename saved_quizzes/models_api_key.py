from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from api.env file
load_dotenv('api.env')

# Initialize client with API key from environment variable
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

try:
    response = client.models.list()

    print("Models available with your API key:")
    for model in response.data:
        print("-", model.id)

except Exception as e:
    print("Error:", e)
