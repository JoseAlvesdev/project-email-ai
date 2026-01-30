from fastapi import APIRouter
from api.v1.endpoints import email

api_router =APIRouter()
api_router.include_router(email.router, prefix='/email', tags=['email'])

if __name__ == '__main__':
    pass