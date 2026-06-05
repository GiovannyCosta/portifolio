/* ── skills.js ────────────────────────────────────────────── */
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in-view");
      so.unobserve(e.target);
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".skill-cat").forEach((el) => so.observe(el));

const confettiSymbols = ["✦", "✧", "✶", "✷", "◆"];

function launchSkillBadges(item) {
  const badges = (item.dataset.badges || "")
    .split(",")
    .map((badge) => badge.trim())
    .filter(Boolean);

  if (!badges.length) return;

  const rect = item.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const accent =
    getComputedStyle(item.closest(".skill-cat")).getPropertyValue("--skill-accent").trim() ||
    "#fc6471";

  item.classList.remove("skill-pop");
  void item.offsetWidth;
  item.classList.add("skill-pop");

  badges.forEach((badge, index) => {
    const chip = document.createElement("span");
    const angle = -135 + index * (270 / Math.max(badges.length - 1, 1));
    const distance = 76 + (index % 2) * 18;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance - 22;

    chip.className = "skill-burst-badge";
    chip.textContent = badge;
    chip.style.left = `${startX}px`;
    chip.style.top = `${startY}px`;
    chip.style.setProperty("--burst-x", `${x}px`);
    chip.style.setProperty("--burst-y", `${y}px`);
    chip.style.setProperty("--burst-accent", accent);
    chip.style.animationDelay = `${index * 35}ms`;
    document.body.appendChild(chip);
    chip.addEventListener("animationend", () => chip.remove(), { once: true });
  });

  for (let i = 0; i < 14; i += 1) {
    const sparkle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 36 + Math.random() * 92;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    sparkle.className = "skill-burst-spark";
    sparkle.textContent = confettiSymbols[i % confettiSymbols.length];
    sparkle.style.left = `${startX}px`;
    sparkle.style.top = `${startY}px`;
    sparkle.style.setProperty("--burst-x", `${x}px`);
    sparkle.style.setProperty("--burst-y", `${y}px`);
    sparkle.style.setProperty("--burst-rotate", `${Math.random() * 240 - 120}deg`);
    sparkle.style.setProperty("--burst-accent", accent);
    sparkle.style.animationDelay = `${Math.random() * 90}ms`;
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
  }
}

document.querySelectorAll(".skill-item[data-badges]").forEach((item) => {
  item.addEventListener("click", () => launchSkillBadges(item));
  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    launchSkillBadges(item);
  });
});
