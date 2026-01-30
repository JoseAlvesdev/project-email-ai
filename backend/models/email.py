from pydantic import BaseModel
from pydantic import field_validator


class Email(BaseModel):
    content: str

    @field_validator('content')
    @classmethod
    def validate_content(cls, value: str):
        if not value.strip():
            raise ValueError('Conteúdo do e-mail não pode estar vazio')
        if len(value) > 50000:
            raise ValueError('Conteúdo do e-mail não pode ter mais que 50.000 caracteres')
        return value