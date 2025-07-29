from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from loguru import logger

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

        if I is None or len(I) == 0 or len(I[0]) == 0:
            logger.warning("No similar documents found for the given query.")
            return []

        valid_indices = [i for i in I[0] if 0 <= i < len(self.docs)]
        return [self.docs[i] for i in valid_indices]