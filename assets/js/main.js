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

  if (document.querySelector(".main-title")) {
    entranceTl
      .from(".main-title", {
        x: -70,
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 1.5,
      })
      .from(".subtitle-group p", { y: 25, autoAlpha: 0, stagger: 0.2 }, "-=1");
  }

  if (window.innerWidth > 768 && document.querySelector(".nav-links li")) {
    entranceTl.from(
      ".nav-links li",
      { y: -20, autoAlpha: 0, stagger: 0.1, ease: "power2.out" },
      "-=1.2",
    );
  }

  if (document.querySelector(".pink-line")) {
    entranceTl.from(
      ".pink-line",
      { scaleX: 0, transformOrigin: "left center", duration: 1.5 },
      "-=1",
    );
  }

  entranceTl.add("socialBio", "-=1");

  if (document.querySelector(".social-icons a, .social-icons .copy-wrapper")) {
    entranceTl.from(
      ".social-icons a, .social-icons .copy-wrapper",
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
  }

  if (document.querySelector(".bio-scroll-container")) {
    entranceTl.from(
      ".bio-scroll-container",
      { x: 60, autoAlpha: 0, filter: "blur(5px)", stagger: 0.2 },
      "socialBio",
    );
    gsap.set(".bio-group", { display: "none", height: 0, opacity: 0 });
  }

  if (document.querySelector(".work-card")) {
    entranceTl.from(
      ".work-card",
      { y: 60, autoAlpha: 0, stagger: 0.15, clearProps: "all" },
      "socialBio",
    );
  }

  if (document.querySelector(".btn-neon")) {
    entranceTl.from(
      ".btn-neon",
      { y: 30, autoAlpha: 0, clearProps: "all" },
      "socialBio+=0.3",
    );
  }

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

  const title = document.querySelector(".main-title");
  if (title) {
    setTimeout(() => triggerGlitch(title), 5000);
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
    const nextElements = [];
    let next = header.nextElementSibling;

    while (next && !next.classList.contains("toggle-header")) {
      if (next.classList.contains("bio-group")) {
        nextElements.push(next);
      }
      next = next.nextElementSibling;
    }

    gsap.killTweensOf(nextElements);

    if (show) {
      if (typeof playHoverSound === "function") playHoverSound();

      gsap.set(nextElements, { display: "block" });

      gsap.fromTo(
        nextElements,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          marginBottom: "1.5rem",
          duration: 0.5,
          ease: "expo.out",
          stagger: 0.1,
          force3D: true,
        },
      );
    } else {
      gsap.to(nextElements, {
        height: 0,
        opacity: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(nextElements, { display: "none" }),
      });
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
    opacity: "random(0.3, 0.3)",
    duration: "random(15, 25)",
    ease: "none",
    force3D: true,
    onComplete: () => animateParticle(el),
  });
}

function createCodeFloating(bg) {
  const snippets = [
    "const dev = 'Dana Alania';",
    "npm install gsap",
    "git commit",
    "npm install food",
    "UI/UX Designer",
    "Software Developer",
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

const playHoverSound = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const bufferSize = audioCtx.sampleRate * 0.02; // 20ms of sound
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.02,
  );

  noise.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noise.start();
};

const interactiveElements = document.querySelectorAll(
  ".nav-links a, .work-card, .social-icons a, .btn-neon",
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (window.getComputedStyle(el).opacity > 0) {
      playHoverSound();
    }
  });
});

function triggerGlitch(element) {
  if (!element) return;

  const tl = gsap.timeline();

  tl.to(element, {
    duration: 0.1,
    skewX: "random(-20, 20)",
    x: "random(-10, 10)",
    scale: 1.05,
    color: "white",
    textShadow: "2px 0 var(--pink), -2px 0 cyan",
    ease: "power4.inOut",
  }).to(element, {
    duration: 0.1,
    skewX: 0,
    x: 0,
    scale: 1,
    color: "var(--pink)",
    textShadow: "none",
    ease: "power4.inOut",
  });

  setTimeout(() => triggerGlitch(element), gsap.utils.random(10000, 15000));
}
