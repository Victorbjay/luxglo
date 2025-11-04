document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-product-list]");
  if (!list || !window.LuxgloProducts) return;

  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortSelect = document.querySelector("[data-sort]");
  const countTarget = document.querySelector("[data-product-count]");

  let activeFilter = "all";
  let activeSort = "featured";

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const renderProducts = () => {
    let products = [...window.LuxgloProducts];

    if (activeFilter !== "all") {
      products = products.filter((product) => product.category === activeFilter);
    }

    switch (activeSort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    list.innerHTML = products
      .map((product) => {
        return `
          <article class="product-card" data-product-id="${product.id}">
            <div class="product-card__image">
              <img src="${product.image}" alt="${product.name}" loading="lazy" />
            </div>
            <div class="product-card__body">
              <p class="product-card__meta">${product.category.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())} • ${product.size}</p>
              <h3 class="product-card__title">${product.name}</h3>
              <p class="text-muted">${product.description}</p>
              <div class="product-card__actions">
                <span class="product-card__price">${currencyFormatter.format(product.price)}</span>
                <div>
                  <a class="btn btn--ghost" href="product.html?id=${product.id}">Details</a>
                  <button class="btn btn--primary" type="button" data-add-to-cart data-product-id="${product.id}">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    if (countTarget) {
      countTarget.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
    }
  };

  renderProducts();

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.setAttribute("data-active", btn === button ? "true" : "false"));
      renderProducts();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      activeSort = event.target.value;
      renderProducts();
    });
  }
});