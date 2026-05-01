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
