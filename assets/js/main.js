gsap.from(".navbar", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
  delay: 0.5,
});

// navbar js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});

function copyEmail(element) {
  const email = element.getAttribute("data-email");
  const tooltip = element.querySelector(".tooltip");

  navigator.clipboard.writeText(email).then(() => {
    tooltip.innerHTML = "Copied!";
    tooltip.style.color = "#00ff00";

    setTimeout(() => {
      tooltip.innerHTML = "Copy Email";
      tooltip.style.color = "white";
    }, 1500);
  });

  gsap.to(element, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
}
