/* ── projectBanners.js ───────────────────────────────────── */
const projectBanners = [
  {
    image: "./src/img/itens-banner/banner-1.png",
    alt: "Banner 1",
    link: "",
  },
  {
    image: "./src/img/itens-banner/banner-2.png",
    alt: "Banner 2",
    link: "https://github.com/GiovannyCosta?tab=overview&from=2026-06-01&to=2026-06-30",
  },
  {
    image: "./src/img/itens-banner/banner-3.png",
    alt: "Banner 3",
    link: "https://github.com/stars/GiovannyCosta/lists/game-list",
  },
  {
    image: "./src/img/itens-banner/banner-4.png",
    alt: "Banner 4",
    link: "",
  },
];

function createProjectBanner(item) {
  const element = document.createElement(item.link ? "a" : "div");
  element.className = "project-banner";

  if (item.link) {
    element.href = item.link;
    element.target = "_blank";
    element.rel = "noopener";
  }

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.alt;
  image.loading = "lazy";
  element.appendChild(image);

  return element;
}

function loadProjectBanners() {
  const carousel = document.querySelector(".project-carousel");
  const track = document.getElementById("projectCarouselTrack");
  const previousButton = carousel?.querySelector(".project-carousel-arrow--previous");
  const nextButton = carousel?.querySelector(".project-carousel-arrow--next");
  if (!carousel || !track || projectBanners.length === 0) return;

  let activeIndex = 0;
  let autoplayId = null;
  let pointerStartX = 0;
  let pointerDeltaX = 0;
  let isPointerDown = false;
  let isHoveringActiveBanner = false;

  projectBanners.forEach((item, index) => {
    const banner = createProjectBanner(item);
    banner.dataset.index = index;
    banner.setAttribute("aria-label", `${item.alt} (${index + 1} de ${projectBanners.length})`);
    track.appendChild(banner);
  });

  const banners = [...track.querySelectorAll(".project-banner")];

  function getRelativePosition(index) {
    const total = banners.length;
    const previousIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    if (index === activeIndex) return "is-active";
    if (index === previousIndex) return "is-previous";
    if (index === nextIndex) return "is-next";
    return "is-hidden";
  }

  function updateCarousel() {
    banners.forEach((banner, index) => {
      const positionClass = getRelativePosition(index);

      banner.classList.remove("is-active", "is-previous", "is-next", "is-hidden");
      banner.classList.add(positionClass);
      banner.setAttribute("aria-hidden", positionClass === "is-hidden" ? "true" : "false");
      banner.tabIndex = positionClass === "is-active" && banner.matches("a") ? 0 : -1;
    });
  }

  function goToSlide(index) {
    activeIndex = (index + banners.length) % banners.length;
    updateCarousel();
  }

  function goToNextSlide() {
    goToSlide(activeIndex + 1);
  }

  function goToPreviousSlide() {
    goToSlide(activeIndex - 1);
  }

  function stopAutoplay() {
    if (!autoplayId) return;
    clearInterval(autoplayId);
    autoplayId = null;
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(goToNextSlide, 4200);
  }

  function resumeAutoplayWhenAllowed() {
    if (!isHoveringActiveBanner) startAutoplay();
  }

  function handleManualNavigation(callback) {
    callback();
    resumeAutoplayWhenAllowed();
  }

  previousButton?.addEventListener("click", () => {
    handleManualNavigation(goToPreviousSlide);
  });

  nextButton?.addEventListener("click", () => {
    handleManualNavigation(goToNextSlide);
  });

  carousel.addEventListener("pointerover", (event) => {
    if (!event.target.closest(".project-banner.is-active")) return;
    isHoveringActiveBanner = true;
    stopAutoplay();
  });

  carousel.addEventListener("pointerout", (event) => {
    const activeBanner = event.target.closest(".project-banner.is-active");
    if (!activeBanner || activeBanner.contains(event.relatedTarget)) return;
    isHoveringActiveBanner = false;
    startAutoplay();
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".project-carousel-arrow")) return;
    isPointerDown = true;
    pointerStartX = event.clientX;
    pointerDeltaX = 0;
    carousel.classList.add("is-dragging");
    stopAutoplay();
  });

  carousel.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    pointerDeltaX = event.clientX - pointerStartX;
  });

  carousel.addEventListener("pointerup", () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    carousel.classList.remove("is-dragging");

    if (Math.abs(pointerDeltaX) > 42) {
      if (pointerDeltaX < 0) goToNextSlide();
      else goToPreviousSlide();
    }

    resumeAutoplayWhenAllowed();
  });

  carousel.addEventListener("pointercancel", () => {
    isPointerDown = false;
    carousel.classList.remove("is-dragging");
    resumeAutoplayWhenAllowed();
  });

  carousel.addEventListener("click", (event) => {
    const clickedBanner = event.target.closest(".project-banner");
    if (!clickedBanner || clickedBanner.classList.contains("is-active")) return;

    event.preventDefault();
    goToSlide(Number(clickedBanner.dataset.index));
    resumeAutoplayWhenAllowed();
  });

  updateCarousel();
  startAutoplay();
}

loadProjectBanners();
