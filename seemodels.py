import google.generativeai as genai
import os

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    # IMPORTANT: Only for testing! Remove or secure this in production.
    print("Warning: GOOGLE_API_KEY environment variable not found. Hardcoding API key for demonstration.")
    api_key = "AIzaSyC3ESWZWC7RmCVzkMDVDG17AsZKYO0954U" # <<-- PUT YOUR ACTUAL API KEY HERE

if not api_key:
    print("Error: API key is not set. Please set GOOGLE_API_KEY environment variable or hardcode it.")
else:
    genai.configure(api_key=api_key)

    print("Fetching available models...")
    try:
        models_found = False
        for m in genai.list_models():
            models_found = True
            print(f"Name: {m.name}")
            print(f"  Display Name: {m.display_name}")
            print(f"  Description: {m.description}")
            if hasattr(m, "generation_config") and m.generation_config:
                print(f"  Generation Config:")
                print(f"    Temperature: {getattr(m.generation_config, 'temperature', 'N/A')}")
                print(f"    Top P: {getattr(m.generation_config, 'top_p', 'N/A')}")
                print(f"    Top K: {getattr(m.generation_config, 'top_k', 'N/A')}")
                print(f"    Max Output Tokens: {getattr(m.generation_config, 'max_output_tokens', 'N/A')}")
            else:
                print("  Generation Config: Not available for this model.")
            print("-" * 30)

        if not models_found:
            print("No models found.")
            print("This could mean your API key is invalid, lacks permissions, or no models are available.")

    except Exception as e:
        print(f"\nAn error occurred while listing models:")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {e}")
        print("\nCommon reasons for this error:")
        print("1. API key is incorrect or has insufficient permissions.")
        print("2. Billing is not enabled for your Google Cloud project (even for free tier limits).")
        print("3. Network issues (firewall, proxy, no internet).")
        print("4. Rate limits have been exceeded.")
        print("5. An outdated SDK version (try `pip install --upgrade google-generativeai`).")