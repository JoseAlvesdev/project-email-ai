const emailInput = document.getElementById("emailInput");
const charCounter = document.getElementById("charCounter");

// Contador de caracteres
emailInput.addEventListener("input", () => {
  const length = emailInput.value.length;
  charCounter.innerText = `${length.toLocaleString()} / 50.000 caracteres`;
});

async function ProcessEmail() {
  const text = emailInput.value.trim();
  if (!text) return alert("Por favor, insira o texto do email.");

  const analyzeBtn = document.getElementById("analyzeBtn");
  const loaderContainer = document.getElementById("loading");
  const loaderText = document.getElementById("loading-text");
  const resultArea = document.getElementById("resultArea");

  analyzeBtn.disabled = true;
  loaderContainer.style.display = "block";
  resultArea.style.display = "none";

  // Timer para despertar o servidor suspenso
  const servidorDormindoTimer = setTimeout(() => {
    loaderText.innerText = "O servidor está suspenso. "
      + "Despertando servidor para realizar solicitação...\n"
      + "Isso pode levar até 1 minuto.";
  }, 20000);

  try {
    const API_BASE_URL = "https://project-email-ai-backend.onrender.com";

    const response = await fetch(`${API_BASE_URL}/api/v1/email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text })
    });

    const data = await response.json();

    loaderContainer.style.display = "none";
    
    displayResult(
      data.category,
      data.category === 'produtivo'
        ? 'Este email requer ação direta e resposta profissional.' 
        : 'Este email é classificado como informativo ou irrelevante.',
      data.suggestion_response
    );

  } catch (error) {
    console.error(error);
    loaderContainer.style.display = "none";
    resultArea.style.display = "none";
    alert("Erro ao conectar com o servidor. Por favor, tente novamente.");
  } finally {
    clearTimeout(servidorDormindoTimer);
    analyzeBtn.disabled = false;
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