/* ── stats.js ─────────────────────────────────────────────── */
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
