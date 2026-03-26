let isTyping = false;

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".icon");
  const win = document.getElementById("os-window");
  const winContent = document.getElementById("window-content");
  const winTitle = document.getElementById("window-title");

  const fileData = {
    frontend: "HTML5 / CSS3 / REACT / GSAP<br><br>JAVASCRIPT  / FIGMA / UI/UX",
    backend:
      "NODE.JS / EXPRESS.JS / LARAVEL / POSTMAN<br><br>FIREBASE / SUPABASE / JWT / SQL<br><br>MONGODB / NOSQL / POSTGRES",
    mobile: "FLUTTER / FLUTTERFLOW / REACT NATIVE",
    programming:
      "JAVA / C++ / C# / PYTHON / QT / CMAKE<br><br>GITHUB / NETBEANS",
    certifications:
      "CYBERSECURITY FUNDAMENTALS<br>ATTAINED MARCH, 2026<br>ISSUED BY IBMSKILLSBUILD<br><br>INTRODUCTION TO CYBERSECURITY<br>ATTAINED MARCH, 2026<br>ISSUED BY CISCO",
    achievements:
      "BEST USER EXPERIENCE<br>RECEIVED FEBRUARY, 2026<br>HACKATHON JAM 2026<br><br>SUBJECT PROFICIENCY IN INFORMATION MANAGEMENT<br>RECEIVED JUNE, 2023<br><br>SUBJECT PROFICIENCY IN SCRIPWRITING AND STORYBOARDING<br>RECEIVED JUNE, 2023<br><br>SUBJECT PROFICIENCY IN APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES<br>RECEIVED AUGUST, 2022",
    education:
      "CIIT COLLEGE OF INNOVATION AND INTEGRATED TECHNOLOGY<br>2023 - PRESENT<br>BACHELOR OF SCIENCE IN COMPUTER SCIENCE<br><br>CIIT SENIOR HIGH SCHOOL<br>2021- 2023<br>PROGRAMMING STRAND",
    misc: "GAME DESIGN AND DEVELOPMENT<br><br>UNITY<br>TWINE<br>STORYBOARDING<br>SCRIPTWRITING",
  };

  gsap.registerPlugin(Draggable);

  Draggable.create(win, {
    handle: ".window-header",
    bounds: "body",
    edgeResistance: 0.65,
    type: "x,y",
    onPress: function () {
      this.target.style.zIndex = 1000;
    },
  });

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      if (isTyping) return;

      const file = icon.getAttribute("data-file");
      const textToType = fileData[file];

      win.classList.remove("hidden");
      gsap.set(win, { scale: 0.8, autoAlpha: 0 });

      winTitle.innerText = `C:\\Users\\Dana\\${file}.sys`;

      gsap.to(win, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });

      typeWriter(winContent, textToType);

      if (typeof playHoverSound === "function") playHoverSound();
    });
  });

  function typeWriter(element, text) {
    isTyping = true;
    document.body.classList.add("is-processing");
    const barFill = document.getElementById("loading-bar-fill");
    const percentText = document.getElementById("loading-percent");

    barFill.style.width = "0%";
    percentText.innerText = "0%";

    element.innerHTML = "";
    let i = 0;

    const timer = setInterval(() => {
      if (i < text.length) {
        if (text.charAt(i) === "<") {
          const tagEnd = text.indexOf(">", i);
          element.innerHTML += text.substring(i, tagEnd + 1);
          i = tagEnd + 1;
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }

        const progress = Math.round((i / text.length) * 100);
        barFill.style.width = `${progress}%`;
        percentText.innerText = `${progress}%`;

        if (i % 3 === 0 && typeof playHoverSound === "function") {
          playHoverSound();
        }
      } else {
        clearInterval(timer);
        isTyping = false;
        document.body.classList.remove("is-processing");
        gsap.to(barFill, {
          opacity: 0.5,
          repeat: 3,
          yoyo: true,
          duration: 0.1,
        });
      }
    }, 15);
  }

  document.querySelector(".dot.red").addEventListener("click", () => {
    if (isTyping) return;

    gsap.to(win, {
      scale: 0.5,
      autoAlpha: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => {
        win.classList.add("hidden");
        winContent.innerHTML = "";
        barFill.style.width = "0%";
      },
    });
  });

  function updateSystemTray() {
    const cpuFill = document.getElementById("cpu-fill");
    const ramFill = document.getElementById("ram-fill");
    const clockEl = document.getElementById("os-clock");

    setInterval(() => {
      const now = new Date();
      clockEl.innerText = now.toLocaleTimeString([], { hour12: false });
    }, 1000);

    setInterval(() => {
      const cpuUsage = isTyping
        ? Math.random() * 30 + 40
        : Math.random() * 10 + 5;
      const ramUsage = 65 + Math.random() * 5;

      if (cpuFill) cpuFill.style.width = `${cpuUsage}%`;
      if (ramFill) ramFill.style.width = `${ramUsage}%`;
    }, 2000);
  }

  updateSystemTray();
});
