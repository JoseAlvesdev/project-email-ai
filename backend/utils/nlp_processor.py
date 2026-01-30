import spacy

nlp = spacy.load("pt_core_news_sm")


def preprocess_text(text: str) -> str:
    """
    Helper para limpar texto: remove pontuação, stop words e aplica lemmatização.
    Args:
        text: Texto bruto
    Return:
        str: Texto processado
    """

    doc = nlp(text.lower())

    cleaned_tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop and
           not token.is_punct and
           not token.is_space and
           len(token.text) > 1
    ]

    return " ".join(cleaned_tokens)
