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
    link: "",
  },
  {
    image: "./src/img/itens-banner/banner-3.png",
    alt: "Banner 3",
    link: "",
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
  const track = document.getElementById("projectCarouselTrack");
  if (!track) return;

  const repeatedBanners = [...projectBanners, ...projectBanners];
  repeatedBanners.forEach((item) => {
    track.appendChild(createProjectBanner(item));
  });
}

loadProjectBanners();
