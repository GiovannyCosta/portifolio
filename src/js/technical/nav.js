/* ── nav.js (lang toggle — ciclo único) ───────────────────── */
function nextLang() {
  const idx = LANGS.indexOf(lang);
  return LANGS[(idx + 1) % LANGS.length];
}

document.querySelectorAll(".lang-toggle").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(nextLang()));
});
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
