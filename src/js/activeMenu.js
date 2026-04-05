const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarMenu = document.getElementById("navbar-menu");
const hamburgerIcon = hamburgerBtn.querySelector("i");

hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("active"); // Abre/Fecha o menu

  // Troca o ícone de Barras para X
  if (navbarMenu.classList.contains("active")) {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-xmark");
  } else {
    hamburgerIcon.classList.remove("fa-xmark");
    hamburgerIcon.classList.add("fa-bars");
  }
});
