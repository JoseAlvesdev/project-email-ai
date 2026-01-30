from google import genai
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')

client = genai.Client(api_key=api_key)


def analyze_with_ai(text: str):
    prompt = f"""
    [ROLE] Aja como um assistente de triagem de emails de alta precisão.
    [CONTEXT] Setor financeiro com alto volume de mensagens. 
    Classifique entre:
    - PRODUTIVO: Demandas reais, pedidos de status, envio de comprovantes/documentos, dúvidas técnicas.
    - IMPRODUTIVO: Mensagens sociais, agradecimentos, saudações sazonais, spam interno.
    
    [CONSTRAINTS]
    - Responda EXCLUSIVAMENTE com um objeto JSON válido.
    - Não inclua explicações, introduções ou conclusões.
    - A chave "category" deve ser obrigatoriamente "produtivo" ou "improdutivo".
    - A "suggestion_response" deve ser profissional, cordial e em português.
    
    [INPUT]
    Email para análise:
    ###
    {text}
    ###
    
    [OUTPUT FORMAT]
    {{"category": "", "suggestion_response": ""}}
    """

    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        raw_text = response.text.strip()
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)

        if not match:
            raise ValueError("Resposta não contém JSON válido")

        return json.loads(match.group())

    except Exception as err:
        print(f"Erro ao conectar com o Gemini: {err}")
        return None

