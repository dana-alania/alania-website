document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const particlesContainer = document.getElementById("particles-container");
  const codeBg = document.getElementById("code-background");

  let mm = gsap.matchMedia();
  let menuTl;

  mm.add(
    {
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)",
    },
    (context) => {
      let { isMobile } = context.conditions;

      gsap.set([navLinks, "#nav-links li"], { clearProps: "all" });
      hamburger.classList.remove("active");

      if (isMobile) {
        menuTl = gsap.timeline({ paused: true });
        menuTl
          .to(navLinks, {
            xPercent: 0,
            display: "flex",
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

        gsap.set(navLinks, { xPercent: 100, visibility: "hidden" });
      } else {
        gsap.set(navLinks, { xPercent: 0, visibility: "visible", opacity: 1 });
        if (menuTl) menuTl.kill();
        menuTl = null;
      }
    },
  );

  const entranceTl = gsap.timeline({
    defaults: { ease: "expo.out", duration: 1.2 },
  });

  entranceTl
    .from(".main-title", {
      x: -70,
      autoAlpha: 0,
      filter: "blur(10px)",
      duration: 1.5,
    })
    .from(".subtitle-group p", { y: 25, autoAlpha: 0, stagger: 0.2 }, "-=1");

  if (window.innerWidth > 768) {
    entranceTl.from(
      ".nav-links li",
      { y: -20, autoAlpha: 0, stagger: 0.1, ease: "power2.out" },
      "-=1.2",
    );
  }

  entranceTl
    .from(
      ".pink-line",
      { scaleX: 0, transformOrigin: "left center", duration: 1.5 },
      "-=1",
    )
    .add("socialBio", "-=1")
    .from(
      ".social-icons > a, .social-icons > .copy-wrapper",
      {
        scale: 0.8,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(1.7)",
        clearProps: "all",
      },
      "socialBio",
    );

  if (document.querySelector(".bio-scroll-container")) {
    entranceTl.from(
      ".bio-scroll-container",
      { x: 60, autoAlpha: 0, filter: "blur(5px)", stagger: 0.2 },
      "socialBio",
    );
  }

  if (document.querySelector(".work-card")) {
    entranceTl.from(
      ".work-card",
      { y: 60, autoAlpha: 0, stagger: 0.15, clearProps: "all" },
      "socialBio",
    );
  }

  entranceTl.from(
    ".btn-neon",
    { y: 30, autoAlpha: 0, clearProps: "all" },
    "socialBio+=0.3",
  );

  const scanLine = document.getElementById("scan-line");

  if (scanLine) {
    gsap.to(scanLine, {
      top: "100%",
      duration: 6,
      repeat: -1,
      repeatDelay: 4,
      ease: "none",
      force3D: true,
    });
  }

  hamburger.addEventListener("click", () => {
    if (!menuTl) return;
    hamburger.classList.toggle("active");
    hamburger.classList.contains("active") ? menuTl.play() : menuTl.reverse();
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!menuTl) return;
      hamburger.classList.remove("active");
      menuTl.reverse();
    });
  });

  if (particlesContainer) {
    for (let i = 0; i < 80; i++) {
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
        show
          ? next.classList.add("is-visible")
          : next.classList.remove("is-visible");
      }
      next = next.nextElementSibling;
    }
  }
});

function createParticle(container) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 2 + 1;
  Object.assign(p.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    willChange: "transform",
  });
  container.appendChild(p);
  animateParticle(p);
}

function animateParticle(el) {
  gsap.to(el, {
    x: "random(-60, 60)",
    y: "random(-60, 60)",
    opacity: "random(0.1, 0.3)",
    duration: "random(15, 25)",
    ease: "none",
    force3D: true, // Uses GPU
    onComplete: () => animateParticle(el),
  });
}

function createCodeFloating(bg) {
  const snippets = [
    "const dev = 'Dana Alania';",
    "npm install gsap",
    "git commit",
  ];

  for (let i = 0; i < 10; i++) {
    const span = document.createElement("span");
    span.className = "code-snippet";
    span.innerText = snippets[Math.floor(Math.random() * snippets.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    bg.appendChild(span);

    gsap.to(span, {
      y: "random(-15, 15)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
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
