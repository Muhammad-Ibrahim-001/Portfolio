document.addEventListener("DOMContentLoaded", () => {
    // Local time updater
    const timeEl = document.getElementById('local-time');
    if (timeEl) {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-PK', {
                timeZone: 'Asia/Karachi',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeEl.textContent = timeString + ' PKT';
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Mobile Navigation Drawer
    const toggle = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".main-nav");
    const navLinks = nav ? [...nav.querySelectorAll("a")] : [];

    if (toggle && nav) {
        const setMenuState = (isOpen) => {
            nav.classList.toggle("is-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "Close" : "Menu";
        };

        toggle.addEventListener("click", () => {
            setMenuState(!nav.classList.contains("is-open"));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });
    }

    // Contact Form AJAX Submission (Formspree)
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            formStatus.className = "form-status";
            formStatus.style.display = "none";
            
            const actionURL = contactForm.getAttribute("action");
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
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
                    formStatus.textContent = "Message sent successfully.";
                    formStatus.classList.add("success");
                    formStatus.style.display = "block";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Error sending message. Please try again.";
                    formStatus.classList.add("error");
                    formStatus.style.display = "block";
                }
            } catch (error) {
                formStatus.textContent = "Network error. Please try again later.";
                formStatus.classList.add("error");
                formStatus.style.display = "block";
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Subtle fade in for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});
