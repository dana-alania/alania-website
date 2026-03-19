document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const particlesContainer = document.getElementById("particles-container");
  const codeBg = document.getElementById("code-background");

  let mm = gsap.matchMedia();

  mm.add("(max-width: 768px)", () => {
    gsap.set(navLinks, {
      xPercent: 100,
      visibility: "hidden",
      opacity: 1,
      width: "100vw",
    });
    gsap.set("#nav-links li", { clearProps: "all" });
  });

  mm.add("(min-width: 769px)", () => {
    gsap.set(navLinks, {
      xPercent: 0,
      visibility: "visible",
      opacity: 1,
      clearProps: "all",
    });
    gsap.set("#nav-links li", { clearProps: "all" });
  });

  const entranceTl = gsap.timeline();
  entranceTl
    .from(".main-title", {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
    .from(
      ".subtitle-group p",
      { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 },
      "-=0.5",
    );

  if (window.innerWidth > 768) {
    entranceTl.from(
      ".nav-links li",
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=1",
    );
  }

  entranceTl
    .from(".pink-line", { width: 0, duration: 1, ease: "expo.out" }, "-=0.5")
    .from(
      ".social-icons a, .copy-wrapper",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        clearProps: "all",
      },
      "-=0.5",
    )
    .from(
      ".btn-neon",
      { y: 20, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" },
      "-=0.2",
    )
    .from(
      ".bio-scroll-container",
      {
        x: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

  const menuTl = gsap.timeline({ paused: true });
  menuTl
    .to(navLinks, {
      xPercent: 0,
      visibility: "visible",
      duration: 0.5,
      ease: "power3.inOut",
    })
    .from(
      "#nav-links li",
      {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2",
    );

  // --- 5. EVENT LISTENERS ---

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    const isActive = hamburger.classList.contains("active");

    if (isActive) {
      menuTl.play();
    } else {
      menuTl.reverse();
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menuTl.reverse();
    });
  });

  if (particlesContainer) {
    for (let i = 0; i < 70; i++) {
      createParticle(particlesContainer);
    }
  }
  if (codeBg) createCodeFloating(codeBg);

  const toggles = document.querySelectorAll(".toggle-header");

  toggles.forEach((header) => {
    header.addEventListener("click", () => {
      const isNowActive = header.classList.toggle("active");

      toggleSiblings(header, isNowActive);
    });
  });

  function toggleSiblings(header, show) {
    let next = header.nextElementSibling;

    while (next && !next.classList.contains("toggle-header")) {
      if (next.classList.contains("bio-group")) {
        if (show) {
          next.classList.add("is-visible");
        } else {
          next.classList.remove("is-visible");
        }
      }
      next = next.nextElementSibling;
    }
  }
});

function createParticle(container) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 3 + 1;
  Object.assign(p.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  });
  container.appendChild(p);
  animateParticle(p);
}

function animateParticle(el) {
  gsap.to(el, {
    x: "random(-100, 100)",
    y: "random(-100, 100)",
    opacity: "random(0.1, 0.4)",
    duration: "random(10, 20)",
    ease: "none",
    onComplete: () => animateParticle(el),
  });
}

function createCodeFloating(bg) {
  const snippets = [
    "const dev = 'Dana Alania';",
    "npm install gsap",
    "git commit -m 'UI/UX update'",
  ];
  for (let i = 0; i < 20; i++) {
    const span = document.createElement("span");
    span.className = "code-snippet";
    span.innerText = snippets[Math.floor(Math.random() * snippets.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    bg.appendChild(span);
    gsap.to(span, {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      duration: "random(15, 30)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

function copyEmail(element) {
  const email = element.getAttribute("data-email");
  const tooltip = element.querySelector(".tooltip");
  navigator.clipboard.writeText(email).then(() => {
    tooltip.innerText = "Copied!";
    setTimeout(() => (tooltip.innerText = "Copy Email"), 1500);
  });
  gsap.to(element, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
}
