import os
import json
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance

# ==== USER INPUT ====
GEMINI_API_KEY = input("Enter your Gemini API Key: ").strip()
QDRANT_URL = input("Enter Qdrant Cloud URL (e.g. https://abcde.us-east-1-0.aws.cloud.qdrant.io): ").strip()
QDRANT_API_KEY = input("Enter Qdrant API Key: ").strip()

genai.configure(api_key=GEMINI_API_KEY)

# ==== Connect Qdrant ====
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

collection_name = "physical_ai_book"

# Create collection if not exists
if not qdrant.has_collection(collection_name):
    qdrant.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE),
    )

# ==== Read book ====
with open("../book.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Simple split by chapter/section
sections = [s.strip() for s in text.split("=======") if s.strip()]

chunks = []
chunk_id = 1

for section in sections:
    lines = [line.strip() for line in section.split("\n") if line.strip()]
    content = " ".join(lines)
    
    if len(content) > 100:  # ignore empty
        # Generate embedding
        result = genai.embed_content(
            model="models/embedding-001",
            content=content,
            task_type="retrieval_document"
        )
        embedding = result['embedding']
        
        chunks.append({
            "chunk_id": chunk_id,
            "text": content,
            "source": lines[0] if lines else "Unknown"
        })
        
        # Upload to Qdrant
        qdrant.upsert(
            collection_name=collection_name,
            points=[
                PointStruct(
                    id=chunk_id,
                    vector=embedding,
                    payload={"text": content, "source": lines[0]}
                )
            ]
        )
        print(f"Uploaded chunk {chunk_id}")
        chunk_id += 1

# Save locally
with open("../chunks.json", "w", encoding="utf-8") as f:
    json.dump(chunks, f, indent=2, ensure_ascii=False)

print("ALL CHUNKS UPLOADED SUCCESSFULLY! 🎉")
print(f"Total chunks: {len(chunks)}")