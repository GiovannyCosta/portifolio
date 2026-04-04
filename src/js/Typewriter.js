const textElement = document.querySelector(".typewriter-text");
const cursorElement = document.querySelector(".cursor");

const words = ["DESENVOLVEDOR", "BACKEND"]; // palavras
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 150; // Velocidade de escrever (ms)
const deleteSpeed = 100; // Velocidade de apagar (ms)
const pauseTime = 2000; // Tempo de espera antes de apagar (2 segundos)

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // Apagando letras
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    // Lógica para parar de apagar
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Passa para a próxima palavra
      setTimeout(typeEffect, 500); // Pausa curtinha antes de começar a escrever a próxima
    } else {
      setTimeout(typeEffect, deleteSpeed);
    }
  } else {
    // Escrevendo letras
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    // Lógica para parar de escrever e esperar
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime); // Espera 2s com a palavra completa
    } else {
      setTimeout(typeEffect, typeSpeed);
    }
  }
}

// Inicia o efeito
document.addEventListener("DOMContentLoaded", typeEffect);
