from fastapi import APIRouter
from fastapi import status
from fastapi import HTTPException

from models.email import Email
from utils.nlp_processor import preprocess_text
from services.ai_service import analyze_with_ai

router = APIRouter()

@router.post("/")
async def post_email(email: Email):
    try:
        processed_text = preprocess_text(email.content)

        analyze = analyze_with_ai(processed_text)

        return {
            "status": "success",
            "category": analyze["category"],
            "suggestion_response": analyze["suggestion_response"]
        }

    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro interno ao processar o texto. {err}"
        )
