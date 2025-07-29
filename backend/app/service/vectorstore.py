import faiss
import numpy as np

index = faiss.IndexFlatL2(384)

def add_embedding(embedding: list[float]):
    index.add(np.array([embedding]).astype('float32'))

def search_similar(query_embedding: list[float], k=5):
    distances, indices = index.search(np.array([query_embedding]), k)
    return indices[0]
