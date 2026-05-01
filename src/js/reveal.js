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
