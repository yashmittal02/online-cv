function app() {
  return {
    dark: false,
    mm: false,
    sc: false,
    s: "hero",

    init() {
      // dark mode
      this.dark =
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      this.$watch("dark", (v) =>
        localStorage.setItem("theme", v ? "dark" : "light"),
      );

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
  "Full Stack Developer",
  "Backend Engineer",
  "Frontend Engineer",
  "Data Analyst",
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

const skills = [
  {
    name: "MySQL",
    logo: "🐬",
    description:
      "A relational database management system used to store and manage structured data.",
    uses: [
      "Web Applications",
      "Data Storage",
      "Reporting Systems",
      "Business Software",
    ],
  },

  {
    name: "HTML & CSS",
    logo: "<<//>>",
    description: "Core technologies used to structure and style web pages.",
    uses: ["Websites", "Landing Pages", "Portfolios", "Responsive Interfaces"],
  },

  {
    name: "JavaScript",
    logo: "JS",
    description:
      "A programming language used to add interactivity and dynamic behaviour to websites.",
    uses: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Animations",
    ],
  },

  {
    name: "React.js",
    logo: "⚛",
    description:
      "A JavaScript library used for building interactive and component-based user interfaces.",
    uses: [
      "Single Page Applications",
      "Dashboards",
      "E-Commerce Websites",
      "Modern Web Applications",
    ],
  },

  {
    name: "Python",
    logo: "PY",
    description:
      "A versatile and beginner-friendly programming language known for readability and flexibility.",
    uses: ["Automation", "Data Analysis", "Machine Learning", "Scripting"],
  },

  {
    name: "Java",
    logo: "☕",
    description:
      "An object-oriented language designed for scalable and platform-independent applications.",
    uses: [
      "Enterprise Software",
      "Android Apps",
      "Backend Systems",
      "Banking Software",
    ],
  },
];

let current = 0;

let startX = 0;
let endX = 0;
const cards = document.querySelectorAll(".skill-card");

const container = document.querySelector(".card-container");
function createCard(skill) {
  return `
<div class="skill-logo">
    ${skill.logo}
</div>
<div class="skill-title">
    ${skill.name}
</div>

<div class="skill-description">
    <p>${skill.description}</p>
</div>

<div class="skill-tags">
    ${skill.uses.map((item) => `<span>${item}</span>`).join("")}
</div>
`;
}

function updateCards() {
  const prevIndex = (current - 1 + skills.length) % skills.length;

  const nextIndex = (current + 1) % skills.length;

  cards[0].innerHTML = createCard(skills[prevIndex]);

  cards[1].innerHTML = createCard(skills[current]);

  cards[2].innerHTML = createCard(skills[nextIndex]);

  cards[0].className = "skill-card prev";
  cards[1].className = "skill-card active";
  cards[2].className = "skill-card next";
}

function nextSkill() {
  current = (current + 1) % skills.length;

  updateCards();
}
function prevSkill() {
  current = (current - 1 + skills.length) % skills.length;

  updateCards();
}

document.getElementById("nextBtn").addEventListener("click", nextSkill);

document.getElementById("prevBtn").addEventListener("click", prevSkill);

container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;

  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSkill(); // Swipe Left
    } else {
      prevSkill(); // Swipe Right
    }
  }
});

updateCards();

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

      document
        .getElementById("imageModal")
        .addEventListener("click", function (e) {
          if (e.target === this) closeImage();
        });