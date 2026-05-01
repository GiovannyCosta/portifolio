//
//   js/
//     loader.js       → window load → #loader.out
//     header.js       → scroll → .scrolled
//     nav.js          → mobile menu toggle
//     scroll.js       → smooth scroll + active nav
//     reveal.js       → IntersectionObserver reveal
//     skills.js       → skill bar animation
//     stats.js        → countUp
//     form.js         → contactForm submit
//     main.js         → applyLang(), init

/* ── main.js (applyLang) ──────────────────────────────────── */
const LANGS = ["pt", "en", "es"];
const LANG_LABELS = { pt: "PT", en: "EN", es: "ES" };
const LANG_HTML = { pt: "pt-BR", en: "en", es: "es" };
const TITLES = { pt: "Portfólio Dev", en: "Dev Portfolio", es: "Portafolio Dev" };

let lang = "pt";

function applyLang(l) {
  lang = l;
  const t = T[l];
  document.documentElement.lang = LANG_HTML[l];
  document.title = TITLES[l];
  document.getElementById("loader-text").textContent = t.loading;

  document.querySelectorAll("[data-key]").forEach((el) => {
    const v = t[el.dataset.key];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-ph]").forEach((el) => {
    const v = t[el.dataset.ph];
    if (v !== undefined) el.placeholder = v;
  });

  // Atualiza os dois botões de idioma (desktop + mobile)
  const label = LANG_LABELS[l];
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.textContent = label;
  });
}

// Inicializa o idioma
/* ── nav.js (lang toggle — ciclo único) ───────────────────── */
function nextLang() {
  const idx = LANGS.indexOf(lang);
  return LANGS[(idx + 1) % LANGS.length];
}

document.querySelectorAll(".lang-toggle").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(nextLang()));
});

/* ── loader.js ────────────────────────────────────────────── */
window.addEventListener("load", () => setTimeout(() => document.getElementById("loader").classList.add("out"), 700));

/* ── header.js ────────────────────────────────────────────── */
const hdr = document.getElementById("header");
window.addEventListener("scroll", () => hdr.classList.toggle("scrolled", scrollY > 20), { passive: true });

/* ── nav.js (mobile menu) ─────────────────────────────────── */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobileNav.classList.toggle("open");
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mobileNav.classList.remove("open");
  }),
);



/* ── reveal.js ────────────────────────────────────────────── */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => ro.observe(el));

/* ── skills.js ────────────────────────────────────────────── */
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".skill-item").forEach((item, i) => {
        const p = parseInt(item.dataset.pct || 0);
        setTimeout(() => {
          item.querySelector(".skill-fill").style.width = p + "%";
          item.querySelector(".skill-pct").textContent = p + "%";
        }, i * 90);
      });
      so.unobserve(e.target);
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".skill-cat").forEach((el) => so.observe(el));

/* ── stats.js ─────────────────────────────────────────────── */
// https://github.com/inorganik/countUp.js
function countUp(el, target) {
  let start = null;
  const dur = 1600;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const sto = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countUp(e.target, parseInt(e.target.dataset.count || 0));
      sto.unobserve(e.target);
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".stat-num[data-count]").forEach((el) => sto.observe(el));

/* ── form.js ──────────────────────────────────────────────── */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector(".btn-send span");
  btn.textContent = T[lang].f_ok;
  const sendBtn = e.target.querySelector(".btn-send");
  sendBtn.style.background = "var(--secondary-green)";
  sendBtn.style.color = "#000";
  setTimeout(() => {
    btn.textContent = T[lang].f_send;
    sendBtn.style.background = "";
    sendBtn.style.color = "";
  }, 3000);
  e.target.reset();
});

/* ── init ─────────────────────────────────────────────────── */
applyLang("pt");
