"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------
   Mobile navigation
--------------------------------------------------- */
(function mobileNav() {
    const toggle = document.querySelector("#mobile-menu");
    const menu = document.querySelector(".navbar__menu");
    if (!toggle || !menu) return;

    const icon = toggle.querySelector("i");

    const setOpen = (open) => {
        menu.classList.toggle("is-active", open);
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }
    };

    toggle.addEventListener("click", () => {
        setOpen(!menu.classList.contains("is-active"));
    });

    menu.addEventListener("click", (e) => {
        if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) setOpen(false);
    });
})();

/* -------------------------------------------------
   Navbar shadow on scroll
--------------------------------------------------- */
(function navScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
})();

/* -------------------------------------------------
   Highlight the active nav link
--------------------------------------------------- */
(function activeNav() {
    const here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar__links").forEach((link) => {
        const target = link.getAttribute("href").split("/").pop();
        const match =
            target === here ||
            (here === "index.html" && (target === "" || target === "/"));
        if (match) link.setAttribute("aria-current", "page");
    });
})();

/* -------------------------------------------------
   Rotating logo marquee (duplicate track for seamless loop)
--------------------------------------------------- */
(function marquee() {
    const viewport = document.querySelector(".rotating-logos__viewport");
    const track = document.querySelector(".rotating-logos__track");
    if (!viewport || !track) return;

    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    viewport.appendChild(clone);

    if (prefersReducedMotion) {
        viewport.style.animation = "none";
    }
})();

/* -------------------------------------------------
   Pricing monthly / yearly toggle
--------------------------------------------------- */
(function pricingToggle() {
    const checkbox = document.getElementById("pricing-toggle-checkbox");
    if (!checkbox) return;

    const monthlyLabel = document.querySelector('[data-billing="monthly"]');
    const yearlyLabel = document.querySelector('[data-billing="yearly"]');
    const saveBadge = document.querySelector(".save-percentage-container");

    const apply = () => {
        const yearly = checkbox.checked;
        document.querySelectorAll(".monthly-price").forEach((el) => el.classList.toggle("hidden", yearly));
        document.querySelectorAll(".yearly-price").forEach((el) => el.classList.toggle("hidden", !yearly));
        document.querySelectorAll(".plan-billing").forEach((el) => {
            el.textContent = yearly ? "billed annually" : "billed monthly";
        });
        if (monthlyLabel) monthlyLabel.classList.toggle("is-active", !yearly);
        if (yearlyLabel) yearlyLabel.classList.toggle("is-active", yearly);
        if (saveBadge) saveBadge.style.visibility = yearly ? "visible" : "hidden";
    };

    checkbox.addEventListener("change", apply);
    monthlyLabel?.addEventListener("click", () => { checkbox.checked = false; apply(); });
    yearlyLabel?.addEventListener("click", () => { checkbox.checked = true; apply(); });
    apply();
})();

/* -------------------------------------------------
   Scroll reveal
--------------------------------------------------- */
(function scrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
})();

/* -------------------------------------------------
   Footer year
--------------------------------------------------- */
(function footerYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
})();

/* -------------------------------------------------
   Disclaimer modal — shown on every load of the home page
--------------------------------------------------- */
(function disclaimerModal() {
    const modal = document.getElementById("disclaimer-modal");
    if (!modal) return;

    const dialog = modal.querySelector(".modal__dialog");
    const closers = modal.querySelectorAll("[data-modal-close]");
    let lastFocused = null;

    const open = () => {
        lastFocused = document.activeElement;
        modal.classList.add("is-open");
        document.body.classList.add("modal-open");
        modal.removeAttribute("hidden");
        const btn = modal.querySelector("button");
        if (btn) btn.focus();
    };

    const close = () => {
        modal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    closers.forEach((el) => el.addEventListener("click", close));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });

    // Keep focus inside the dialog while open
    modal.addEventListener("keydown", (e) => {
        if (e.key !== "Tab" || !modal.classList.contains("is-open")) return;
        const focusables = dialog.querySelectorAll("button, a[href]");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    open();
})();

/* -------------------------------------------------
   Sign-up form (client-side demo only)
--------------------------------------------------- */
(function signupForm() {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = document.getElementById("form-status");
        if (status) {
            status.textContent = "Thanks! Check your inbox to confirm your email and finish setup.";
            status.hidden = false;
        }
        form.reset();
    });
})();
