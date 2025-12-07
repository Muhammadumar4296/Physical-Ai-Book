from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY", "your-key-here"))

qdrant = QdrantClient(url="YOUR_QDRANT_URL", api_key="YOUR_QDRANT_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    selected_chunk_ids: list[int] = []

@app.post("/ask")
async def ask(query: Query):
    if not query.selected_chunk_ids:
        return {"response": "Please highlight some text first!"}
    
    # Filtered search
    hits = qdrant.search(
        collection_name="physical_ai_book",
        query_filter=Filter(
            must=[FieldCondition(key="chunk_id", match=MatchValue(value=query.selected_chunk_ids[0]))]
            + [FieldCondition(key="chunk_id", match=MatchValue(value=i)) for i in query.selected_chunk_ids[1:]]
        ),
        limit=10
    )
    
    context = "\n\n".join([hit.payload["text"] for hit in hits])
    
    prompt = f"""You are an expert in Physical AI and Humanoid Robotics.
Answer only from this context:

{context}

Question: {query.question}
Answer:"""

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt, stream=True)
    
    async def stream():
        for chunk in response:
            yield chunk.text
    
    return StreamingResponse(stream(), media_type="text/plain")