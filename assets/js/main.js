document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const overlay = document.createElement("div");
  overlay.setAttribute("data-nav-overlay", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.35)";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.transition = "opacity 0.3s ease";
  overlay.style.zIndex = "900";

  const updateOverlayState = () => {
    const isOpen = nav?.dataset.open === "true";
    overlay.style.opacity = isOpen ? "1" : "0";
    overlay.style.pointerEvents = isOpen ? "auto" : "none";
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  if (nav && toggle) {
    document.body.appendChild(overlay);
    toggle.addEventListener("click", () => {
      nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
      toggle.setAttribute("aria-expanded", nav.dataset.open === "true");
      updateOverlayState();
    });

    overlay.addEventListener("click", () => {
      nav.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      updateOverlayState();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 960) {
          nav.dataset.open = "false";
          toggle.setAttribute("aria-expanded", "false");
          updateOverlayState();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        nav.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
        updateOverlayState();
      }
    });
  }

  const cartCountTargets = document.querySelectorAll("[data-cart-count]");
  const renderCartCount = () => {
    if (!window.LuxgloCart) return;
    const count = window.LuxgloCart.getItemCount();
    cartCountTargets.forEach((target) => {
      target.textContent = count;
      target.hidden = count === 0;
    });
  };

  renderCartCount();
  document.addEventListener("cart:updated", renderCartCount);

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const consultForm = document.querySelector("[data-consultation-form]");
  if (consultForm) {
    consultForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(consultForm);
      const name = formData.get("name")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const concern = formData.get("concern")?.toString().trim();
      const message = formData.get("message")?.toString().trim();

      if (!name || !email || !concern) {
        alert("Please complete the required fields before submitting.");
        return;
      }

      const summary = `Thank you ${name}! Our concierge team will contact you at ${email} within 24 hours to plan a routine for ${concern}.`;
      consultForm.reset();
      alert(summary + (message ? `\n\nPersonal note recorded: ${message}` : ""));
    });
  }
});