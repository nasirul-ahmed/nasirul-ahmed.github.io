// ==== DOM Elements ====
const formElement = document.getElementById("contact-form-details");
const resumeElements = document.querySelectorAll("#resume-download");
const menuToggle = document.getElementById("menu-toggle");
const closeMenuBtn = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");

const handledLinks = new Set();
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
};

// ==== Smooth Scroll ====
function smoothScroll(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const offset = target.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Nav click handler
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (handledLinks.has(link)) return;
  handledLinks.add(link);

  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.className = "fas fa-bars";
    }

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Add active class to the section
    document.querySelectorAll("section").forEach((section) => {
      section.classList.remove("active");
    });
    targetElement.classList.add("active");
  });
});

// ==== Snackbar Notification ====
function showSnackbar(message, type) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = `show ${type}`;
  setTimeout(
    () => (snackbar.className = snackbar.className.replace("show", "").trim()),
    3000
  );
}

// ==== Floating Elements Animation ====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".floating-element").forEach((el) => {
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  document.getElementById("home").classList.add("active");

  // Social icons animation
  const socialIcons = document.querySelectorAll(".footer-socials a");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-8px) scale(1.1)";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "";
    });
  });
});

// ==== Form Submission ====
formElement?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  fetch("https://formsubmit.co/nasirulahmed44@gmail.com", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((res) =>
      res.ok
        ? showSnackbar("Details sent successfully!", "success") ||
          e.target.reset()
        : showSnackbar("Oops! Something went wrong.", "error")
    )
    .catch((err) => {
      console.error(err);
      showSnackbar("Network error. Please try again.", "error");
    });
});

// ==== Resume Download Handler ====
resumeElements.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const link = Object.assign(document.createElement("a"), {
      href: "assets/resume.pdf",
      download: "Nasirul_Ahmed_Resume.pdf",
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// ==== Mobile Menu Toggle ====
const addClickSplash = (el, event) => {
  const ripple = document.createElement("span");
  ripple.className = "click-splash";

  ripple.style.left = `${event.offsetX}px`;
  ripple.style.top = `${event.offsetY}px`;

  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
};

// ==== Toggle menu on smaller devices ====
menuToggle.addEventListener("click", (e) => {
  // addClickSplash(menuToggle, e);
  const isActive = mobileMenu.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  menuToggle.classList.add("switching");
  setTimeout(() => {
    icon.className = isActive ? "fas fa-times" : "fas fa-bars";
    menuToggle.classList.remove("switching");
  }, 150);
});

// ==== Observe the scroll event to so some fun stuffs ====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll("section").forEach((sec) => {
        sec.classList.remove("active");
      });

      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
