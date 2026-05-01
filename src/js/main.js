/* ── main.js ──────────────────────────────────────────────── */
const LANGS = ["pt", "en", "es"];
const LANG_LABELS = { pt: "PT", en: "EN", es: "ES" };
const LANG_HTML = { pt: "pt-BR", en: "en", es: "es" };
const TITLES = { pt: "Portfólio Dev", en: "Dev Portfolio", es: "Portafolio Dev" };
let lang = "pt";

function applyLang(l) {
  lang = l;
  // Verifica se a variável T (do translation.js) já foi carregada
  const t = typeof T !== "undefined" ? T[l] : {};

  document.documentElement.lang = LANG_HTML[l];
  document.title = TITLES[l];

  const loaderText = document.getElementById("loader-text");
  if (loaderText && t.loading) loaderText.textContent = t.loading;

  document.querySelectorAll("[data-key]").forEach((el) => {
    const v = t[el.dataset.key];
    if (v !== undefined) el.innerHTML = v;
  });

  document.querySelectorAll("[data-ph]").forEach((el) => {
    const v = t[el.dataset.ph];
    if (v !== undefined) el.placeholder = v;
  });

  const label = LANG_LABELS[l];
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.textContent = label;
  });
}

// Carrega os módulos
const modulesToLoad = [
  "translation.js", // Translation.js precisa ser carregado primeiro
  "header.js",
  "nav.js",
  "scroll.js",
  "reveal.js",
  "skills.js",
  "stats.js",
  "form.js",
  "copyText.js",
];

async function loadAllModules() {
  // Pega a versão definida no loader.js para forçar a atualização (Cache Busting)
  const version = localStorage.getItem("portfolio_version") || "v1.0";

  for (const moduleName of modulesToLoad) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `./src/js/${moduleName}?v=${version}`;

        script.onload = () => {
          console.log(`✅ [Módulo] ${moduleName} carregado.`);
          resolve();
        };

        script.onerror = () => {
          reject(new Error(`Não foi possível encontrar: ${moduleName}`));
        };

        // Injeta o script dinamicamente no final do body
        document.body.appendChild(script);
      });
    } catch (erro) {
      console.error(`❌ Erro: ${erro.message}`);
    }
  }
  initializeApp();
}

function initializeApp() {
  // Aplica o idioma inicial
  applyLang("pt");

  // Remove o loader com uma transição suave
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("out");
    }, 700);
  }
}
// Inicia o carregamento dos módulos
loadAllModules();
