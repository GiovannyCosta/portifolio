/* ── scroll.js ────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      scrollTo({ top: target.offsetTop - hdr.offsetHeight, behavior: "smooth" });
    }
  });
});
const secs = document.querySelectorAll("section[id]");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    secs.forEach((s) => {
      if (scrollY >= s.offsetTop - 130) cur = s.id;
    });
    document
      .querySelectorAll(".nav-links a")
      .forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  },
  { passive: true },
);
