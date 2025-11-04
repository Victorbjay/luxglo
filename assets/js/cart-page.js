document.addEventListener("DOMContentLoaded", () => {
  if (!window.LuxgloCart) return;

  const itemsContainer = document.querySelector("[data-cart-items]");
  const summarySubtotal = document.querySelector("[data-cart-subtotal]");
  const summaryTotal = document.querySelector("[data-cart-total]");
  const summaryCount = document.querySelector("[data-cart-count-summary]");
  const emptyState = document.querySelector("[data-cart-empty]");
  const checkoutButton = document.querySelector("[data-checkout]");

  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const renderCart = () => {
    const items = window.LuxgloCart.getDetailedItems();
    if (!itemsContainer) return;

    if (!items.length) {
      itemsContainer.innerHTML = "";
      if (emptyState) emptyState.hidden = false;
      if (summarySubtotal) summarySubtotal.textContent = currency.format(0);
      if (summaryTotal) summaryTotal.textContent = currency.format(0);
      if (summaryCount) summaryCount.textContent = "0 items";
      if (checkoutButton) checkoutButton.disabled = true;
      return;
    }

    const rows = items
      .map(
        (item) => `
          <tr data-item-id="${item.id}">
            <td>
              <div class="stack">
                <strong>${item.name}</strong>
                <span class="text-muted">${item.size} • ${item.category}</span>
              </div>
            </td>
            <td>${currency.format(item.price)}</td>
            <td>
              <div class="quantity-control">
                <button type="button" data-quantity-change="-1" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-quantity-change="1" aria-label="Increase quantity">+</button>
              </div>
            </td>
            <td>${currency.format(item.lineTotal)}</td>
            <td>
              <button type="button" class="btn btn--ghost" data-remove-item>Remove</button>
            </td>
          </tr>
        `
      )
      .join("");

    itemsContainer.innerHTML = rows;
    if (emptyState) emptyState.hidden = true;
    if (summarySubtotal) summarySubtotal.textContent = currency.format(window.LuxgloCart.getSubtotal());
    if (summaryTotal) summaryTotal.textContent = currency.format(window.LuxgloCart.getSubtotal());
    if (summaryCount) {
      const count = window.LuxgloCart.getItemCount();
      summaryCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
    }
    if (checkoutButton) checkoutButton.disabled = false;
  };

  renderCart();
  document.addEventListener("cart:updated", renderCart);

  document.addEventListener("click", (event) => {
    const itemRow = event.target.closest("tr[data-item-id]");
    if (!itemRow) return;
    const id = itemRow.dataset.itemId;

    if (event.target.matches("[data-remove-item]")) {
      window.LuxgloCart.removeItem(id);
      return;
    }

    if (event.target.matches("[data-quantity-change]")) {
      const delta = Number.parseInt(event.target.dataset.quantityChange, 10) || 0;
      const items = window.LuxgloCart.getItems();
      const current = items.find((item) => item.id === id);
      if (!current) return;
      const next = Math.max(1, Math.min(10, current.quantity + delta));
      window.LuxgloCart.updateItem(id, next);
    }
  });

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const subtotal = window.LuxgloCart.getSubtotal();
      alert(
        `Checkout is ready to integrate. Current subtotal: ${currency.format(
          subtotal
        )}. Connect your payment provider to process transactions.`
      );
    });
  }
});