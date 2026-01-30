from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
from typing import List

class ChatRequest(BaseModel):
    query: str

class Citation(BaseModel):
    doc_id: str
    title: str
    snippet: str
    score: float

class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation]
    latency_ms: float

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"]
)

DOCUMENTS = [
    {
        "doc_id": "handbook",
        "title": "Engineering Handbook",
        "text": "Our engineering handbook covers coding standards, code review rules, and incident response." ,
    },
    {
        "doc_id": "onboarding",
        "title": "Onboarding Guide",
        "text": "New joiners should set up access, read the architecture overview, and deploy to staging before shipping code.",
    },
    {
        "doc_id": "rag-notes",
        "title": "RAG Design Notes",
        "text": "Retrieval augmented generation improves factuality by grounding answers in retrieved documents using embeddings and rerankers.",
    },
]

def score_document(query: str, text: str) -> float:
    q_terms = set(query.lower().split())
    tokens = text.lower().split()
    if not q_terms:
        return 0
    overlap = sum(1 for t in tokens if t in q_terms)
    return overlap / len(tokens)

def build_snippet(text: str, max_len: int = 160) -> str:
    return text[:max_len] + ("..." if len(text) > max_len else "")

@app.post("/rag/query", response_model=ChatResponse)
async def rag_query(payload: ChatRequest):
    start = time.time()
    scores = []
    for doc in DOCUMENTS:
        score = score_document(payload.query, doc["text"])
        scores.append({"doc": doc, "score": score})

    top = sorted(scores, key=lambda x: x["score"], reverse=True)[:3]
    citations = [
        Citation(
            doc_id=item["doc"]["doc_id"],
            title=item["doc"]["title"],
            snippet=build_snippet(item["doc"]["text"]),
            score=float(item["score"]),
        )
        for item in top
    ]

    answer = "This is a stubbed RAG answer. Matching documents were consulted to craft the response."
    latency_ms = (time.time() - start) * 1000
    return ChatResponse(answer=answer, citations=citations, latency_ms=latency_ms)
