// we use the IntersectionObserver, so when we scroll a bit from the start of the page, we change the background of navbar

const header = document.querySelector("header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
header.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  header.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

//intersection observer la bu hakkımızda ana sayfa altındaki çizgileri falan da değiştirebiliriz.

// mobile menu

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navUl = document.querySelector("nav ul");
const socials = document.querySelector(".socials");

hamburgerMenu.addEventListener("click", () => {
  navUl.classList.toggle("show");
  socials.classList.toggle("show");
  hamburgerMenu.classList.toggle("rotate");
});

// we do this to prevent navbar background cover content

const navbarHeight = document.querySelector("header nav").offsetHeight;

console.log(navbarHeight);

document.documentElement.style.setProperty(
  "--scroll-padding",
  navbarHeight + "px"
);

// checking is phone input valid

const phoneInput = document.querySelector(".phone-number input");

phoneInput.addEventListener("keypress", (e) => {
  if (isNaN(e.key)) {
    e.preventDefault();
    phoneInput.classList.toggle("wrong-text");
  } else {
    phoneInput.classList.remove("wrong-text");
  }
});
