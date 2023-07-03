const header = document.querySelector("header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
header.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  header.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

//intersection observer la bu hakkımızda ana sayfa altındaki çizgileri falan da değiştirebiliriz.

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navUl = document.querySelector("nav ul");
const socials = document.querySelector(".socials");

hamburgerMenu.addEventListener("click", () => {
  navUl.classList.toggle("show");
  socials.classList.toggle("show");
  hamburgerMenu.classList.toggle("rotate");
});
