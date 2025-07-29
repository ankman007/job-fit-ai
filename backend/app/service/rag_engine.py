from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

class RAGEngine:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = faiss.IndexFlatL2(384)
        self.docs = []

    def index_documents(self, documents: list[str]):
        embeddings = self.model.encode(documents)
        self.index.add(np.array(embeddings))
        self.docs.extend(documents)

    def retrieve(self, query: str, top_k: int = 3) -> list[str]:
        query_emb = self.model.encode([query])
        D, I = self.index.search(np.array(query_emb), top_k)
        return [self.docs[i] for i in I[0] if i < len(self.docs)]
