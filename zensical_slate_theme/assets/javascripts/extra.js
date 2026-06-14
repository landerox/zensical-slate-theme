/**
 * Custom JavaScript for Zensical Theme Slate (EN)
 * Implements View Transitions API for theme switches and other client-side interactions.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Circular Transition using View Transitions API
  document.addEventListener("click", (e) => {
    // Find if the clicked element or its parent is a palette toggle label
    const label = e.target.closest('label[for^="__palette_"]');
    if (!label) return;

    // Check if the browser supports the View Transitions API
    if (!document.startViewTransition) return;

    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Prevent default click behavior so we can animate it manually
    e.preventDefault();

    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // Set custom properties on the root element
    document.documentElement.style.setProperty("--click-x", `${x}px`);
    document.documentElement.style.setProperty("--click-y", `${y}px`);

    // Calculate the maximum radius to cover the entire viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    document.documentElement.style.setProperty("--clip-radius", `${maxRadius}px`);

    // Get the radio input associated with the label
    const targetInputId = label.getAttribute("for");
    const targetInput = document.getElementById(targetInputId);

    if (targetInput) {
      // Start the view transition and click the input inside it
      document.startViewTransition(() => {
        targetInput.click();
      });
    }
  });
});

/* ---------------------------------------------------------- */
/* Interactive Neural Network Background Code                */
/* ---------------------------------------------------------- */
(() => {
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animationFrameId = null;
  const mouse = { x: null, y: null, radius: 200 };
  let width = 0;
  let height = 0;
  let isInitialized = false;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 3.0 + 2.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Robust boundary collisions using absolute direction forces
      if (this.x < 0) {
        this.x = 0;
        this.vx = Math.abs(this.vx);
      } else if (this.x > width) {
        this.x = width;
        this.vx = -Math.abs(this.vx);
      }

      if (this.y < 0) {
        this.y = 0;
        this.vy = Math.abs(this.vy);
      } else if (this.y > height) {
        this.y = height;
        this.vy = -Math.abs(this.vy);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(115, Math.floor((width * height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    // Setting canvas width/height resets the 2D context drawing state.
    // Assign immediately before scale() to prevent transform compounding.
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function setupNeuralBackground() {
    // Disable entirely if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    canvas = document.getElementById("neural-background");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "neural-background";
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext("2d");

    resizeCanvas();

    if (!isInitialized) {
      isInitialized = true;

      window.addEventListener("resize", resizeCanvas);

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
      });

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          if (!animationFrameId) {
            animate();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });

      animate();
    }
  }

  function animate() {
    if (document.visibilityState === "hidden") {
      animationFrameId = null;
      return;
    }

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const isDarkMode = document.documentElement.getAttribute("data-md-color-scheme") === "slate";

    // Section-aware color: vary accent by current page path
    const path = window.location.pathname;
    let particleHue = isDarkMode ? "130, 176, 255" : "79, 70, 229";
    if (path.includes("/radar/ai") || path.includes("/services/production-ai")) {
      particleHue = isDarkMode ? "168, 130, 255" : "124, 58, 237";
    } else if (path.includes("/radar/data") || path.includes("/services/data")) {
      particleHue = isDarkMode ? "130, 220, 180" : "16, 130, 90";
    } else if (path.includes("/radar/devops") || path.includes("/services/cloud")) {
      particleHue = isDarkMode ? "130, 200, 255" : "37, 99, 235";
    }

    const particleColor = `rgba(${particleHue}, ${isDarkMode ? "0.45" : "0.35"})`;
    const connectionDist = 220;

    ctx.fillStyle = particleColor;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    ctx.lineWidth = 0.9;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.55;
          ctx.strokeStyle = `rgba(${particleHue}, ${(alpha * (isDarkMode ? 0.75 : 0.85)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.strokeStyle = `rgba(${particleHue}, ${(alpha * (isDarkMode ? 0.7 : 0.9)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * 3D interactive card effect with cursor-tracking glare highlight
   */
  function setupCard3DEffect() {
    const cards = document.querySelectorAll(".grid.cards > ul > li, .grid > .card");
    if (cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    cards.forEach((card) => {
      // Avoid double listener attachments on instant navigation
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = "true";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = (x / rect.width) - 0.5;
        const py = (y / rect.height) - 0.5;

        const maxRotation = 3;
        const rx = -py * maxRotation;
        const ry = px * maxRotation;

        card.style.setProperty("--rx", `${rx}deg`);
        card.style.setProperty("--ry", `${ry}deg`);
        card.style.setProperty("--ty", `-3px`);
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--ty", "0px");
        card.style.setProperty("--mouse-x", "-999px");
        card.style.setProperty("--mouse-y", "-999px");
      });
    });
  }

  /**
   * Force repository links in header to open in a new tab
   */
  function setupRepoLinkTarget() {
    const repoLinks = document.querySelectorAll(".md-header__source, .md-source");
    repoLinks.forEach((link) => {
      if (link.tagName === "A") {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      } else {
        const anchors = link.querySelectorAll("a");
        anchors.forEach((a) => {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        });
      }
    });
  }

  /**
   * Append theme and template details to the generator notice in the footer
   */
  function setupFooterAttribution() {
    const copyright = document.querySelector(".md-copyright");
    if (!copyright) return;

    // Avoid duplicate appends on instant navigation reload
    if (copyright.dataset.themeLinkAdded) return;
    copyright.dataset.themeLinkAdded = "true";

    const isEs = document.documentElement.lang === "es";
    const zensicalLink = copyright.querySelector("a[href*='zensical.org']");
    if (zensicalLink) {
      const span = document.createElement("span");
      if (isEs) {
        span.innerHTML = ' usando <a href="https://github.com/landerox/zensical-slate-theme" target="_blank" rel="noopener">Slate Theme</a>';
      } else {
        span.innerHTML = ' using <a href="https://github.com/landerox/zensical-slate-theme" target="_blank" rel="noopener">Slate Theme</a>';
      }
      zensicalLink.after(span);
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      setupNeuralBackground();
      setupCard3DEffect();
      setupRepoLinkTarget();
      setupFooterAttribution();
    });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      setupNeuralBackground();
      setupCard3DEffect();
      setupRepoLinkTarget();
      setupFooterAttribution();
    });
  }
})();

