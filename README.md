# 🧠 EmailSmart AI - Triage & Analyze

EmailSmart AI é uma aplicação inteligente para classificação de e-mails e geração de respostas automáticas utilizando a IA do Gemini. [cite_start]O sistema analisa o conteúdo para determinar se um e-mail é **Produtivo** ou **Improdutivo** e sugere uma resposta estruturada em tópicos. [cite: 3, 53, 57, 58]

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
* **Python 3.12.3**
* **Navegador Web** (Chrome, Firefox, Edge, etc.)
* Uma chave de API do **Google AI Studio** (Gemini)

### 2. Configuração do Backend
1. Navegue até a pasta do backend:
    ```bash
    cd backend
    ```

2. Crie um ambiente virtual:
    ```bash
    python -m venv .venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate     # Windows

    ```


3. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```


4. Configure suas variáveis de ambiente:
* Crie um arquivo `.env` na raiz da pasta `backend/`.
* Adicione sua chave: `GEMINI_API_KEY=sua_chave_aqui`.


5. Inicie o servidor:
    ```bash
    python main.py

    ```


*O servidor estará disponível em `http://127.0.0.1:8000`.*

### 3. Configuração do Frontend

1. Abra a pasta `frontend/` no seu editor.
2. Certifique-se de que a constante de URL no seu `index.js` está apontando para `http://127.0.0.1:8000/api/v1/email/`.
3. Abra o arquivo `index.html` diretamente no navegador ou utilizando a extensão **Live Server**.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** FastAPI (Python), Pydantic, Google Generative AI.
* **Frontend:** Bulma CSS, JavaScript Puro (Vanilla JS), Font Awesome. 


* **IA:** Google Gemini 1.5 Flash.

## 🎨 Funcionalidades de UX

O projeto foi desenvolvido seguindo princípios de design moderno e funcional: 

* **Feedback Visual:** Botões com estado `loading` e indicadores de processamento ("Analisando conteúdo..."). 


* **Hierarquia Clara:** Separação visual entre entrada de dados, resultado da classificação e sugestão de resposta. 


* **Classificação por Cores:** Verde para e-mails produtivos e Vermelho/Cinza para improdutivos. 


* **Ações Rápidas:** Botões para copiar a resposta gerada pela IA. 



---

## 📂 Estrutura do Projeto

```text
.
├── backend/
│   ├── .venv/               # Ambiente virtual
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   └── email.py # Lógica das rotas de email
│   │       └── api.py       # Agregador de rotas
│   ├── models/
│   │   └── email.py         # Schemas do Pydantic
│   ├── services/
│   │   └── ai_service.py    # Integração Gemini API
│   ├── utils/
│   │   └── nlp_processor.py # Processamento de texto
│   ├── .env                 # Variáveis de ambiente
│   ├── main.py              # Inicialização do Uvicorn e FastAPI
│   └── requirements.txt     # Dependências do projeto
│
└── frontend/
    |   src/                 # Código-fonte do Frontend
    |   ├── js/
    |   │   └── main.js      # Lógica de consumo da API e manipulação do DOM
    |   └── css/
    |       └── main.css     # Estilização personalizada (Baseada em Bulma)
    └── index.html           # Interface Principal

```

---

### 💡 Dicas Úteis

* **CORS:** Certifique-se de que o backend permite requisições da porta onde o frontend está rodando.
* **Deploy:** Ao realizar o deploy, lembre-se de atualizar a URL da API no frontend e configurar a `GEMINI_API_KEY` nas variáveis de ambiente da plataforma de hospedagem.