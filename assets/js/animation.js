const particlesContainer = document.getElementById("particles-container");
const particleCount = 70;

if (particlesContainer) {
  for (let i = 0; i < particleCount; i++) {
    createBackgroundParticle();
  }
}

function createBackgroundParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  const size = Math.random() * 3 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;

  particlesContainer.appendChild(particle);
  animateParticle(particle);
}

function animateParticle(el) {
  gsap.to(el, {
    x: "random(-100, 100)",
    y: "random(-100, 100)",
    opacity: "random(0.1, 0.4)",
    duration: "random(10, 20)",
    ease: "none",
    onComplete: () => animateParticle(el),
    overwrite: "auto",
  });
}

window.addEventListener("load", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  const tl = gsap.timeline();

  tl.from(".main-title", {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })
    .from(
      ".subtitle-group p",
      {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      ".navbar li",
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      },
      "-=1",
    )
    .from(
      ".pink-line",
      {
        width: 0,
        duration: 1,
        ease: "expo.out",
      },
      "-=0.5",
    )
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
      {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      },
      "-=0.2",
    );
});

const codeSnippets = [
  "const dev = 'Dana Alania';",
  "function optimize() { }",
  "grid-template-columns: repeat(12, 1fr);",
  "git commit -m 'UI/UX update'",
  "npm install gsap",
  "while(coding) { snacks++; }",
  "mix-blend-mode: screen;",
  "System.out.println('so tired');",
];

function createCodeFloating() {
  const bg = document.getElementById("code-background");
  const rows = 5; // Divide screen into 5 rows
  const cols = 4; // Divide screen into 4 columns
  const totalSectors = rows * cols;

  for (let i = 0; i < totalSectors; i++) {
    const span = document.createElement("span");
    span.className = "code-snippet";
    span.innerText =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

    const row = Math.floor(i / cols);
    const col = i % cols;

    const xPos = col * (100 / cols) + Math.random() * 15;
    const yPos = row * (100 / rows) + Math.random() * 15;

    span.style.left = `${xPos}%`;
    span.style.top = `${yPos}%`;

    bg.appendChild(span);

    gsap.to(span, {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      rotation: "random(-10, 10)",
      duration: "random(15, 30)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}
window.addEventListener("load", createCodeFloating);
