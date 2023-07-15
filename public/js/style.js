// we use the IntersectionObserver, so when we scroll a bit from the start of the page, we change the background of navbar

const header = document.querySelector("header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
header.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  header.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

if (window.location.pathname === "/") {
  // which section is in view

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav li a");

  // if section's 100% and 50px part is in view
  const options = {
    root: null,
    threshold: 1,
    rootMargin: "50px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // if is in view
      if (entry.isIntersecting === true) {
        navLinks.forEach((nav) => {
          // indicate specific section is in view by underlining the nav link
          // nav.hash -> #home, #about-us etc
          if (nav.hash === "#" + entry.target.id) {
            nav.classList.add("current-section");
          } else {
            nav.classList.remove("current-section");
          }
        });
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// mobile menu

const navLinks = document.querySelectorAll("nav li a");

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navUl = document.querySelector("nav ul");
const socials = document.querySelector(".socials");

hamburgerMenu.addEventListener("click", () => {
  navUl.classList.toggle("show");
  socials.classList.toggle("show");
  hamburgerMenu.classList.toggle("rotate");
});

navLinks.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    if (navUl.classList.contains("show")) {
      navUl.classList.toggle("show");
      socials.classList.toggle("show");
    }
  });
});

// we do this to prevent navbar background cover content

const navbarHeight = document.querySelector("header nav").offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navbarHeight + -100 + "px"
);

if (window.location.pathname === "/") {
  // input validation

  const phoneInput = document.querySelector(".phone-number input");
  const nameInput = document.querySelector(".your-name input");
  const needInput = document.querySelector(".your-need textarea");

  nameInput.addEventListener("keypress", (e) => {
    if (nameInput.value.length > 25) {
      e.preventDefault();
      nameInput.classList.toggle("wrong-text");
    }
  });

  needInput.addEventListener("keypress", (e) => {
    if (needInput.value.length > 700) {
      e.preventDefault();
      needInput.classList.toggle("wrong-text");
    }
  });

  phoneInput.addEventListener("keypress", (e) => {
    const inputValue = phoneInput.value;

    if (isNaN(e.key)) {
      e.preventDefault();
      phoneInput.classList.toggle("wrong-text");
    } else if (inputValue.length == 10) {
      e.preventDefault();
    } else {
      phoneInput.classList.remove("wrong-text");
    }
  });

  function validateInput() {
    if (
      needInput.value.length > 0 &&
      nameInput.value.length > 0 &&
      phoneInput.value.length > 0
    ) {
      alert(
        "İhtiyacınız başarılı bir şekilde gönderildi, en kısa zamanda dönüş yapacağız."
      );
    }
  }

  // show popup

  const popUpText = document.querySelector(".option-3 h4");
  const popUp = document.querySelector(".option-3-popup");

  popUpText.addEventListener("click", () => {
    popUp.classList.toggle("show-popup");
  });
}

//gallery

// we change where navlinks navigate in gallery page
// so if we decide to change site's route we need to change /gallery part too
// and if we decide to change navlink's name from "Galeri" to anything, we need to change that

if (window.location.pathname === "/gallery") {
  const navLinks = document.querySelectorAll("nav li a");
  navLinks.forEach((navItem) => {
    if (navItem.innerHTML != "Galeri") {
      navItem.href = navItem.href.replace("gallery", "");
    } else {
      navItem.classList.add("current-section");
    }
  });
}
