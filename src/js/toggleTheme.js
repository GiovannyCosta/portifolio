const toggle = document.getElementById("toggle-theme");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("white-mode");
    localStorage.setItem("theme", "white");
  } else {
    document.body.classList.remove("white-mode");
    localStorage.setItem("theme", "dark");
  }
});

// Aplica o tema salvo ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  // Se o tema salvo for "white", marca o toggle e adiciona a classe
  if (savedTheme === "white") {
    toggle.checked = true;
    document.body.classList.add("white-mode");
  } else {
    toggle.checked = false;
    document.body.classList.remove("white-mode");
  }
});
