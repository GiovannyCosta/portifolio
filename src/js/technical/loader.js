// src/js/technical/loader.js

// 🚀 CONTROLE DE CACHE: Altere este número sempre que fizer um novo deploy no Vercel!
const APP_VERSION = "v1.1";

// 1. Verificação de Cache do Navegador
const savedVersion = localStorage.getItem("portfolio_version");
if (savedVersion !== APP_VERSION) {
  console.log(`Nova versão (${APP_VERSION}) detectada! Limpando cache do navegador...`);
  localStorage.setItem("portfolio_version", APP_VERSION);
}

// 2. Injetar o HTML do Loader imediatamente
const loaderHTML = `
  <div id="loader">
    <div class="loader-inner">
      <div><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span></div>
      <p class="loader-label" id="loader-text">carregando portfólio</p>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("afterbegin", loaderHTML);
