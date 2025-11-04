(function () {
  const STORAGE_KEY = "luxglo.cart.v1";

  const readCart = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && typeof item.id === "string" && Number.isFinite(Number(item.quantity)));
    } catch (error) {
      console.error("Unable to read cart", error);
      return [];
    }
  };

  const writeCart = (cart) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to persist cart", error);
    }
  };

  const getProduct = (productId) => {
    if (!window.LuxgloProductMap) return null;
    return window.LuxgloProductMap[productId] ?? null;
  };

  const normalizeQuantity = (quantity) => {
    const parsed = Number.parseInt(quantity, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) return 1;
    return Math.min(parsed, 10);
  };

  const dispatchUpdate = (detail = {}) => {
    document.dispatchEvent(new CustomEvent("cart:updated", { detail }));
  };

  const addItem = (productId, quantity = 1) => {
    const product = getProduct(productId);
    if (!product) return;

    const cart = readCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity = normalizeQuantity(existing.quantity + quantity);
    } else {
      cart.push({ id: productId, quantity: normalizeQuantity(quantity) });
    }
    writeCart(cart);
    dispatchUpdate({ productId, action: "add" });
  };

  const updateItem = (productId, quantity) => {
    const normalized = normalizeQuantity(quantity);
    const cart = readCart();
    const updated = cart.map((item) => (item.id === productId ? { ...item, quantity: normalized } : item));
    writeCart(updated);
    dispatchUpdate({ productId, action: "update" });
  };

  const removeItem = (productId) => {
    const cart = readCart().filter((item) => item.id !== productId);
    writeCart(cart);
    dispatchUpdate({ productId, action: "remove" });
  };

  const clear = () => {
    writeCart([]);
    dispatchUpdate({ action: "clear" });
  };

  const getItems = () => readCart();

  const getDetailedItems = () => {
    const cart = readCart();
    return cart
      .map((item) => {
        const product = getProduct(item.id);
        if (!product) return null;
        const lineTotal = product.price * item.quantity;
        return { ...product, quantity: item.quantity, lineTotal };
      })
      .filter(Boolean);
  };

  const getItemCount = () => {
    return readCart().reduce((total, item) => total + normalizeQuantity(item.quantity), 0);
  };

  const getSubtotal = () => {
    return getDetailedItems().reduce((total, item) => total + item.lineTotal, 0);
  };

  const showToast = (message) => {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.dataset.visible = "true";
    setTimeout(() => {
      toast.dataset.visible = "false";
    }, 2600);
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;
    const productId = button.dataset.productId;
    const quantity = normalizeQuantity(button.dataset.quantity ?? 1);
    const product = getProduct(productId);
    if (!product) return;
    addItem(productId, quantity);
    showToast(`${product.name} was added to your cart.`);
  });

  window.LuxgloCart = {
    addItem,
    updateItem,
    removeItem,
    clear,
    getItems,
    getDetailedItems,
    getItemCount,
    getSubtotal
  };
})();