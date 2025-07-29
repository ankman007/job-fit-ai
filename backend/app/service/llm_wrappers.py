from langchain.llms.base import LLM
import google.generativeai as genai

class GeminiLLM(LLM):
    def _call(self, prompt, stop=None):
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text

    @property
    def _llm_type(self):
        return "custom-gemini"
