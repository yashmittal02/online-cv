function app() {
  return {
    dark: false,
    mm: false,
    sc: false,
    s: "hero",

    init() {
      // dark mode
      // Follow system theme automatically
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      this.dark = media.matches;

      media.addEventListener("change", (e) => {
        this.dark = e.matches;
      });

      // scroll
      window.addEventListener(
        "scroll",
        () => {
          this.sc = window.scrollY > 20;
          this.updateSection();
        },
        { passive: true },
      );

      // reveal
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

      // year
      const yr = document.getElementById("yr");
      if (yr) yr.textContent = new Date().getFullYear();
      this.updateSection();
    },

    updateSection() {
      const sections = document.querySelectorAll("section[id]");

      let currentSection = "hero";

      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      this.s = currentSection;
    },
  };
}

function openCertificate(image) {
  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");

  img.src = image;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  const modal = document.getElementById("certificateModal");

  modal.classList.add("hidden");
  modal.classList.remove("flex");

  document.body.style.overflow = "auto";
}

// Close on outside click
document
  .getElementById("certificateModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeCertificate();
    }
  });

// Close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCertificate();
  }
});

const words = [
  "Software Engineer",
  "Web Architect",
  "Full Stack Engineer",
  "React Specialist",
  "Java Enthusiast",
  "Tech Explorer",
];

const typing = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typing.textContent = currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;

      setTimeout(type, 1500);

      return;
    }
  } else {
    typing.textContent = currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;

      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 50 : 100);
}

type();

function openImage(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("imageModal").classList.remove("hidden");
  document.getElementById("imageModal").classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeImage() {
  document.getElementById("imageModal").classList.add("hidden");
  document.getElementById("imageModal").classList.remove("flex");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeImage();
});

document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) closeImage();
});
