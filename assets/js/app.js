(function () {
  const CART_KEY = "luxeglow_cart";

  const productCatalog = [
    {
      id: "radiance-serum",
      name: "Radiance Renewal Serum",
      price: 68,
      size: "30ml",
      tags: ["Vitamin C", "Brightening"],
      description:
        "Clinically-proven vitamin C complex blended with niacinamide to deliver brighter, smoother skin in 7 days.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "peptide-cream",
      name: "Peptide Barrier Cream",
      price: 84,
      size: "50ml",
      tags: ["Barrier Repair", "Fragrance Free"],
      description:
        "A restorative peptide-rich moisturizer that strengthens skin barrier function and locks in hydration for 72 hours.",
      image:
        "https://images.unsplash.com/photo-1564053489984-317bbd824340?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "enzyme-cleanser",
      name: "Enzyme Cloud Cleanser",
      price: 38,
      size: "120ml",
      tags: ["pH Balanced", "Gentle"],
      description:
        "A luxurious cloud-foam cleanser powered by papaya enzymes to lift impurities without disrupting the moisture barrier.",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "spf-veil",
      name: "Silk Veil Mineral SPF 40",
      price: 54,
      size: "50ml",
      tags: ["Zinc Oxide", "Blue Light"],
      description:
        "Weightless mineral sunscreen with triple-defense shield against UVA/UVB, blue light and urban pollution.",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "overnight-mask",
      name: "Overnight Renewal Mask",
      price: 72,
      size: "60ml",
      tags: ["AHAs", "Resurfacing"],
      description:
        "A velvet night treatment that blends lactic acid with ceramides to refinish texture while maintaining comfort.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "eye-concentrate",
      name: "Illume Peptide Eye Concentrate",
      price: 62,
      size: "15ml",
      tags: ["Peptides", "Depuffing"],
      description:
        "Cooling metal applicator glides on a cocktail of peptides, caffeine and hyaluronic acid to brighten tired eyes.",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80",
    },
  ];

  function getCart() {
    try {
      const cart = JSON.parse(window.localStorage.getItem(CART_KEY));
      if (!Array.isArray(cart)) {
        return [];
      }
      return cart;
    } catch (error) {
      console.warn("Unable to read cart from storage", error);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn("Unable to save cart to storage", error);
    }
  }

  function findProduct(productId) {
    return productCatalog.find((product) => product.id === productId);
  }

  function updateCartCount() {
    const cartCountEl = document.querySelector("[data-cart-count]");
    if (!cartCountEl) return;

    const totalItems = getCart().reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartCountEl.toggleAttribute("hidden", totalItems === 0);
  }

  function addToCart(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
    showToast(`${product.name} added to cart`);
  }

  function removeFromCart(productId) {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    renderCart();
  }

  function updateQuantity(productId, direction) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === productId);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + direction);
    saveCart(cart);
    updateCartCount();
    renderCart();
  }

  function renderCart() {
    const cartContainer = document.querySelector("[data-cart-items]");
    const cartSummary = document.querySelector("[data-cart-summary]");
    if (!cartContainer || !cartSummary) return;

    const cart = getCart();

    if (!cart.length) {
      cartContainer.innerHTML = `<p>Your cart is empty. Discover our <a href="products.html">rituals</a> to begin your glow journey.</p>`;
      cartSummary.innerHTML = `
        <h2>Order Summary</h2>
        <p class="summary-row">No items in cart yet.</p>
        <a class="btn btn-primary" href="products.html">Shop products</a>
      `;
      return;
    }

    const cartItems = cart
      .map((item) => {
        const product = findProduct(item.id);
        if (!product) return "";
        const lineTotal = (product.price * item.quantity).toFixed(2);
        return `
          <div class="cart-item">
            <div>
              <h3>${product.name}</h3>
              <p class="meta">${product.size} • ${product.tags.join(" · ")}</p>
            </div>
            <div>$${product.price.toFixed(2)}</div>
            <div>
              <div class="quantity-controls" role="group" aria-label="Update quantity">
                <button type="button" data-quantity="decrease" data-product-id="${product.id}" aria-label="Decrease quantity">−</button>
                <span style="padding: 0 1rem; font-weight: 600;">${item.quantity}</span>
                <button type="button" data-quantity="increase" data-product-id="${product.id}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div>
              <strong>$${lineTotal}</strong>
              <div><button class="btn btn-secondary" type="button" data-remove-item="${product.id}">Remove</button></div>
            </div>
          </div>
        `;
      })
      .join("\n");

    cartContainer.innerHTML = cartItems;

    const subtotal = cart.reduce((acc, item) => {
      const product = findProduct(item.id);
      if (!product) return acc;
      return acc + product.price * item.quantity;
    }, 0);

    const shipping = subtotal > 150 ? 0 : 8.5;
    const total = subtotal + shipping;

    cartSummary.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span></div>
      <div class="summary-row summary-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      <p style="color: var(--color-muted);">Secure checkout is powered by encrypted payments and PCI-compliant gateways.</p>
      <button class="btn btn-primary" type="button">Proceed to Checkout</button>
    `;
  }

  function renderProductGrid() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;

    grid.innerHTML = productCatalog
      .map(
        (product) => `
          <article class="product-card">
            <span class="tag">${product.tags[0]}</span>
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <h3>${product.name}</h3>
            <p class="meta">${product.size} • ${product.tags.join(" · ")}</p>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to cart</button>
          </article>
        `
      )
      .join("\n");
  }

  function renderFeaturedProducts() {
    const featuredWrapper = document.querySelector("[data-featured-products]");
    if (!featuredWrapper) return;

    featuredWrapper.innerHTML = productCatalog
      .slice(0, 3)
      .map(
        (product) => `
          <article class="product-card">
            <h3>${product.name}</h3>
            <p class="meta">${product.size} • ${product.tags.join(" · ")}</p>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to cart</button>
          </article>
        `
      )
      .join("\n");
  }

  function bindCartActions() {
    document.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-add-to-cart]");
      if (addButton) {
        const { addToCart: productId } = addButton.dataset;
        addToCart(productId);
        return;
      }

      const removeButton = event.target.closest("[data-remove-item]");
      if (removeButton) {
        const productId = removeButton.dataset.removeItem;
        removeFromCart(productId);
        return;
      }

      const quantityButton = event.target.closest("[data-quantity]");
      if (quantityButton) {
        const { productId } = quantityButton.dataset;
        const direction = quantityButton.dataset.quantity === "increase" ? 1 : -1;
        updateQuantity(productId, direction);
        return;
      }

      const accordionTrigger = event.target.closest(".accordion-summary");
      if (accordionTrigger) {
        const accordionItem = accordionTrigger.closest(".accordion-item");
        if (!accordionItem) return;
        const isOpen = accordionItem.classList.toggle("is-open");
        accordionTrigger.setAttribute("aria-expanded", isOpen);
      }
    });
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.setAttribute("role", "status");
    toast.style.position = "fixed";
    toast.style.bottom = "1.5rem";
    toast.style.right = "1.5rem";
    toast.style.background = "#0f0f0f";
    toast.style.color = "#fff";
    toast.style.padding = "0.9rem 1.4rem";
    toast.style.borderRadius = "999px";
    toast.style.boxShadow = "0 12px 40px rgba(15, 15, 15, 0.25)";
    toast.style.zIndex = "1200";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("is-leaving");
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 280);
    }, 1800);
  }

  function enableMobileNav() {
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    if (!navLinks || !menuToggle) return;

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("is-open");
      const expanded = navLinks.classList.contains("is-open");
      menuToggle.setAttribute("aria-expanded", expanded);
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function observeHeader() {
    const header = document.querySelector("header");
    if (!header || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        });
      },
      { threshold: 1 }
    );

    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    header.before(sentinel);
    observer.observe(sentinel);
  }

  function init() {
    renderProductGrid();
    renderFeaturedProducts();
    renderCart();
    bindCartActions();
    enableMobileNav();
    observeHeader();
    updateCartCount();

    document.querySelectorAll(".accordion-summary").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", trigger.closest(".accordion-item")?.classList.contains("is-open") ? "true" : "false");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();