const emailInput = document.getElementById("emailInput");
const charCounter = document.getElementById("charCounter");

// Contador de caracteres em tempo real
emailInput.addEventListener("input", () => {
  const length = emailInput.value.length;
  charCounter.innerText = `${length.toLocaleString()} / 50.000 caracteres`;
});

async function ProcessEmail() {
  const text = emailInput.value.trim();
  if (!text)
    return alert("Por favor, insira o texto do email.");

  // Feedback visual inicial
  document.getElementById("analyzeBtn").classList.add("is-loading");
  document.getElementById("loading").style.display = "block";
  document.getElementById("resultArea").style.display = "none";

  try {
    const API_BASE_URL = window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000" 
    : "https://seu-backend-no-render.com";

    const response = await fetch(`${API_BASE_URL}/api/v1/email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text })
    });

    const data = await response.json();

    displayResult(
      data.category,
      data.category === 'produtivo'
      ? 'Este email requer ação direta e resposta profissional.' 
      : 'Este email não requer ação direta ou resposta profissional.',
      data.suggestion_response
    );
  } catch (error) {
    alert("Erro ao conectar com a IA.");
    document.getElementById("analyzeBtn").classList.remove("is-loading");
    document.getElementById("loading").style.display = "none";
  }
}

function displayResult(cat, desc, resp) {
  document.getElementById("analyzeBtn").classList.remove("is-loading");
  document.getElementById("loading").style.display = "none";

  const area = document.getElementById("resultArea");
  const badge = document.getElementById("categoryBadge");
  const text = document.getElementById("categoryText");

  area.style.display = "block";
  text.innerText = cat.toUpperCase();
  document.getElementById("categoryDesc").innerText = desc;
  document.getElementById("aiResponse").innerText = resp;

  // Cores baseadas na classificação
  if (cat.toLowerCase() === "produtivo") {
    badge.className = "tag is-large is-rounded my-3 badge-produtivo";
  } else {
    badge.className = "tag is-large is-rounded my-3 badge-improdutivo";
  }
}

function copyText() {
  const text = document.getElementById("aiResponse").innerText;
  navigator.clipboard.writeText(text);
  alert("Resposta copiada!");
}

function toClean() {
  emailInput.value = "";
  document.getElementById("resultArea").style.display = "none";
  charCounter.innerText = "0 / 50.000 caracteres";
}