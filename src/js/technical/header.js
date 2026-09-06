/* ── header.js ────────────────────────────────────────────── */
const hdr = document.getElementById("header");
window.addEventListener("scroll", () => hdr.classList.toggle("scrolled", scrollY > 20), { passive: true });
