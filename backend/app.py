from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your React app URL in production, e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API Key
genai.configure(api_key="AIzaSyD5gyJqBDDe3lVFxRkhxhDw1BwkXiUm4aI")

# MongoDB Configuration
MONGO_URI = "mongodb+srv://aditya:aditya123@story.g4feo.mongodb.net/"
DATABASE_NAME = "storyDB"
COLLECTION_NAME = "stories"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
stories_collection = db[COLLECTION_NAME]

# Request models
class NewStoryRequest(BaseModel):
    genre: str
    style: str
    word_count: int
    story_progress_length: int
    story_start: str

class StoryRequest(BaseModel):
    story_id: str
    choice: str

# Helper function to calculate max tokens
def calculate_max_tokens(word_count: int) -> int:
    return int(word_count * 1.3)

# Helper function to extract story and choices
def extract_story_and_choices(response_text: str, target_length: int, include_choices: bool):
    words = response_text.split()
    if len(words) > target_length:
        words = words[:target_length]

    story_text = []
    choices = []
    capturing_choices = False

    lines = " ".join(words).split("\n")
    for line in lines:
        if line.strip().startswith(("A)", "B)", "C)", "D)")):
            capturing_choices = True
            choices.append(line.strip())
        elif capturing_choices and line.strip():
            choices.append(line.strip())
        else:
            story_text.append(line.strip())

    if not include_choices:
        return " ".join(story_text), []

    # Ensure exactly four choices
    if len(choices) != 4:
        choices = [
            "A) Investigate the unknown.",
            "B) Retreat cautiously.",
            "C) Try to communicate.",
            "D) Escape before it's too late."
        ]

    return " ".join(story_text), choices

@app.post("/start_story/")
async def start_story(request: NewStoryRequest):
    """Start a new interactive story and store in MongoDB."""
    story_id = str(uuid.uuid4())

    prompt = (
        f"You are writing an exciting {request.genre} story in {request.style} style. "
        f"Start the story with: \"{request.story_start}\" "
        f"Make it suspenseful, engaging, and intriguing. "
        f"Develop exactly {request.story_progress_length} words before presenting four distinct choices."
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=calculate_max_tokens(request.story_progress_length),
                temperature=0.7
            )
        )

        if not response or not hasattr(response, 'text') or not response.text:
            raise HTTPException(status_code=500, detail="Empty response from Gemini API.")

        story_text, choices = extract_story_and_choices(response.text, request.story_progress_length, include_choices=True)

        # Store in MongoDB
        story_data = {
            "_id": story_id,
            "genre": request.genre,
            "style": request.style,
            "text": story_text,
            "choices": choices,
            "history": [],  # No history yet
            "total_word_limit": request.word_count,
            "current_word_count": request.story_progress_length,
            "story_progress_length": request.story_progress_length,
            "status": "ongoing",
            "created_at": datetime.utcnow()
        }
        await stories_collection.insert_one(story_data)

        return {"story_id": story_id, "story_text": story_text, "choices": choices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")

@app.post("/continue_story/")
async def continue_story(request: StoryRequest):
    """Continue the story based on user choice and store progress with unique choices at each step."""
    story_data = await stories_collection.find_one({"_id": request.story_id})

    if not story_data:
        raise HTTPException(status_code=404, detail="Story not found")

    total_word_limit = story_data["total_word_limit"]
    current_word_count = story_data["current_word_count"]
    story_progress_length = story_data.get("story_progress_length", 200)

    # Stop generating if total word limit is reached
    if current_word_count >= total_word_limit:
        return {"message": "Total story length reached. The story is complete."}

    remaining_words = total_word_limit - current_word_count
    next_step_words = min(story_progress_length, remaining_words)

    prompt = (
        f"Continue this {story_data['genre']} story in {story_data['style']} style.\n\n"
        f"The protagonist just made a crucial choice: {request.choice}\n"
        f"Now, generate an engaging story segment that is exactly {next_step_words} words long.\n"
        f"Do not include choices in the story text if the word limit has already been reached.\n"
        f"Then, provide exactly four new choices, ensuring each choice leads to a unique outcome.\n"
        f"Format the response as:\n"
        f"Story:\n[Generated Story Here]\n"
        f"Choices:\nA) [Choice 1]\nB) [Choice 2]\nC) [Choice 3]\nD) [Choice 4]"
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=calculate_max_tokens(next_step_words),
                temperature=0.7
            )
        )

        if not response or not hasattr(response, 'text') or not response.text:
            raise HTTPException(status_code=500, detail="Empty response from Gemini API.")

        # ✅ Extract story and choices correctly
        include_choices = current_word_count + next_step_words < total_word_limit
        story_text, choices = extract_story_and_choices(response.text, next_step_words, include_choices)

        # ✅ Store only the new progression with the selected choice
        await stories_collection.update_one(
            {"_id": request.story_id},
            {
                "$push": {
                    "history": {
                        "choice": request.choice,
                        "text": story_text,
                        "timestamp": datetime.utcnow()
                    }
                },
                "$set": {
                    "choices": choices if include_choices else [],  # ✅ No choices if word count exceeded
                    "current_word_count": current_word_count + next_step_words
                }
            }
        )

        return {"story_text": story_text, "choices": choices if include_choices else []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")

# Run Server (if running manually)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)