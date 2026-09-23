document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Drawer Toggle & Accessibility
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];
  const sections = [...document.querySelectorAll("main section[id]")];

  if (toggle && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      toggle.textContent = isOpen ? "✕" : "☰";
    };

    toggle.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenuState(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)) {
        setMenuState(false);
      }
    });
  }

  // Hero Terminal Interactive Tab Switcher
  const tabBtns = document.querySelectorAll(".terminal-tabs .tab-btn");
  const tabPanels = document.querySelectorAll(".hero-terminal .tab-panel");

  // Typewriter effect function (supports HTML tags)
  const typeWriterHTML = (element, speed = 15) => {
    const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
    if (!element.getAttribute('data-original-html')) {
      element.setAttribute('data-original-html', originalHTML);
    }

    element.innerHTML = '';
    let i = 0;
    let isTag = false;
    let text = '';

    if (element.typewriterInterval) clearInterval(element.typewriterInterval);

    element.style.opacity = '1';

    element.typewriterInterval = setInterval(() => {
      if (i >= originalHTML.length) {
        clearInterval(element.typewriterInterval);
        return;
      }

      const char = originalHTML.charAt(i);
      text += char;

      if (char === '<') isTag = true;
      if (char === '>') isTag = false;

      if (isTag) {
        while (i < originalHTML.length - 1 && isTag) {
          i++;
          const nextChar = originalHTML.charAt(i);
          text += nextChar;
          if (nextChar === '>') {
            isTag = false;
          }
        }
      }

      element.innerHTML = text;
      i++;
    }, speed);
  };

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Clear all active typewriter timeouts and intervals globally across all panels
        tabPanels.forEach((p) => {
          p.classList.remove("active");
          const allElements = p.querySelectorAll("p:not(:empty), pre");
          allElements.forEach((el) => {
            if (el.typewriterTimeout) clearTimeout(el.typewriterTimeout);
            if (el.typewriterInterval) clearInterval(el.typewriterInterval);
            if (el.getAttribute('data-original-html')) {
              el.innerHTML = el.getAttribute('data-original-html');
            }
          });
        });

        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        
        const activePanel = document.getElementById(`tab-${targetTab}`);
        if (activePanel) {
          activePanel.classList.add("active");

          if (targetTab === 'systemctl' || targetTab === 'stack') {
            const textElements = activePanel.querySelectorAll("p:not(:empty), pre");
            // Stagger the typewriter effect for each paragraph/block
            textElements.forEach((el, index) => {
              el.style.opacity = '0';
              el.typewriterTimeout = setTimeout(() => {
                typeWriterHTML(el, 10);
              }, index * 150); // 150ms delay between each line starting
            });
          } else {
            const textElements = activePanel.querySelectorAll("p:not(:empty), pre");
            textElements.forEach((el) => {
              el.style.opacity = '1';
            });
          }
        }
      });
    });
  }

  // Typewriter Hero Title on load
  const heroTitle = document.querySelector('[data-scramble]');
  if (heroTitle) {
    setTimeout(() => typeWriterHTML(heroTitle, 40), 300);
  }

  // Interactive Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project");

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // Footer Year Auto-Update
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // GSAP Scroll Reveal and Active Section Highlight
  gsap.registerPlugin(ScrollTrigger);

  // Reveal sections smoothly
  const sectionsEl = document.querySelectorAll("section");
  sectionsEl.forEach((sec) => {
    gsap.fromTo(sec,
      { opacity: 0, y: 30, visibility: "hidden" },
      {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%", // Trigger when top of section hits 85% of viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Stagger project cards
  const projectCardsArray = document.querySelectorAll(".project");
  if (projectCardsArray.length) {
    gsap.fromTo(projectCardsArray,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".projects",
          start: "top 85%"
        }
      }
    );
  }

  // Active Section Navigation Highlight Spy with ScrollTrigger
  if (sections.length && navLinks.length) {
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            navLinks.forEach((link) => {
              const isCurrent = link.getAttribute("href") === `#${section.id}`;
              link.toggleAttribute("aria-current", isCurrent);
            });
          }
        }
      });
    });
  }

  // Node Network Canvas Animation
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 80;

    // Mouse tracking
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interact
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();
  }

  // Contact Form AJAX Submission (Formspree)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  let lastSubmitTime = 0; // Frontend rate limiting state

  // Basic frontend sanitization (Note: True SQLi protection is handled by Formspree's backend)
  const sanitizeInput = (str) => {
    return str.replace(/[;'"\\]/g, '').trim(); 
  };

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const now = Date.now();
      const rateLimitMs = 60000; // 60 seconds
      
      // Reset status
      formStatus.classList.remove("success");
      formStatus.style.display = "none";
      
      // 1. Rate Limiter Check
      if (now - lastSubmitTime < rateLimitMs) {
          const remainingSeconds = Math.ceil((rateLimitMs - (now - lastSubmitTime)) / 1000);
          formStatus.textContent = `> [RATE_LIMIT] Connection throttled. Please wait ${remainingSeconds}s before re-transmitting.`;
          formStatus.classList.add("success");
          formStatus.style.color = "var(--amber)";
          formStatus.style.borderColor = "var(--amber)";
          formStatus.style.background = "rgba(251, 191, 36, 0.1)";
          formStatus.style.display = "block";
          return;
      }

      const actionURL = contactForm.getAttribute("action");

      // Basic validation to prevent submission without Form ID
      if (actionURL.includes("YOUR_FORM_ID_HERE")) {
          formStatus.textContent = "> [ERROR] Transmission failed. Replace YOUR_FORM_ID_HERE in index.html with a valid Formspree ID.";
          formStatus.classList.add("success");
          formStatus.style.color = "var(--amber)";
          formStatus.style.borderColor = "var(--amber)";
          formStatus.style.background = "rgba(251, 191, 36, 0.1)";
          formStatus.style.display = "block";
          return;
      }
      
      // 2. Input Sanitization (stripping dangerous SQL/Script chars)
      const formData = new FormData(contactForm);
      formData.set("name", sanitizeInput(formData.get("name")));
      formData.set("message", sanitizeInput(formData.get("message")));

      lastSubmitTime = now; // Update rate limit timer

      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.textContent : "Transmit Payload";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Transmitting...";
      }

      try {
        const response = await fetch(actionURL, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (submitBtn) {
            submitBtn.textContent = "Message Sent!";
            submitBtn.classList.add("btn-success");
          }
          contactForm.reset();
          // Reset button after 4 seconds
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.textContent = originalBtnText;
              submitBtn.classList.remove("btn-success");
              submitBtn.disabled = false;
            }
          }, 4000);
        } else {
          formStatus.style.display = "block";
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        }
      } catch (error) {
        formStatus.textContent = "> [ERROR] Network failure. Connection refused.";
        formStatus.style.color = "var(--red)";
        formStatus.style.borderColor = "var(--red)";
        formStatus.style.background = "rgba(248, 113, 113, 0.1)";
        formStatus.classList.add("success");
        formStatus.style.display = "block";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
});
