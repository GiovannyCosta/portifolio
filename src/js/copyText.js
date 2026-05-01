const btnEmail = document.getElementById("copyEmail");
let email = "gioreizom@gmail.com"; // Corrigi o .com se necessário

btnEmail.addEventListener("click", (e) => {
  e.preventDefault(); // Impede de abrir o mailto: instantaneamente

  navigator.clipboard.writeText(email).then(() => {
    btnEmail.classList.add("copied");

    // Remove o aviso após 3 segundos
    setTimeout(() => {
      btnEmail.classList.remove("copied");
    }, 2000);
  });
});
