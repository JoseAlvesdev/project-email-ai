from fastapi import FastAPI
from uvicorn import run
from fastapi.middleware.cors import CORSMiddleware

from api.v1.api import api_router

app = FastAPI()
app.include_router(api_router, prefix='/api/v1')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em desenvolvimento, o "*" libera todas as portas
    allow_credentials=True,
    allow_methods=["*"], # Libera POST, GET, etc.
    allow_headers=["*"], # Libera headers como Content-Type
)

if __name__ == '__main__':
    run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)