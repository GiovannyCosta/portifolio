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
