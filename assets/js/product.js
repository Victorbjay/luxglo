document.addEventListener("DOMContentLoaded", () => {
  if (!window.LuxgloProducts) return;
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = window.LuxgloProductMap?.[productId];

  const page = document.querySelector("[data-product-page]");
  const relatedList = document.querySelector("[data-related-products]");

  if (!page || !product) {
    if (page) {
      page.innerHTML = `
        <div class="cart-empty">
          <h2>Product not found</h2>
          <p>We couldn't find the ritual you were looking for. Explore our collection to discover new favorites.</p>
          <a class="btn btn--primary" href="collections.html">Browse collection</a>
        </div>
      `;
    }
    return;
  }

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const mainImage = page.querySelector("[data-product-main-image]");
  const thumbContainer = page.querySelector("[data-product-thumbnails]");
  const title = page.querySelector("[data-product-title]");
  const description = page.querySelector("[data-product-description]");
  const price = page.querySelector("[data-product-price]");
  const size = page.querySelector("[data-product-size]");
  const usage = page.querySelector("[data-product-usage]");
  const highlightList = page.querySelector("[data-product-highlights]");
  const ingredientList = page.querySelector("[data-product-ingredients]");
  const addButton = page.querySelector("[data-add-to-cart]");

  if (mainImage) {
    mainImage.src = product.gallery[0];
    mainImage.alt = product.name;
  }

  if (thumbContainer) {
    thumbContainer.innerHTML = product.gallery
      .map((image, index) => `<img src="${image}" alt="${product.name} alternate view" data-index="${index}" ${
        index === 0 ? "data-active=\"true\"" : ""
      } />`)
      .join("");

    thumbContainer.addEventListener("click", (event) => {
      const target = event.target.closest("img[data-index]");
      if (!target || !mainImage) return;
      mainImage.src = target.src;
      thumbContainer.querySelectorAll("img").forEach((img) => img.removeAttribute("data-active"));
      target.setAttribute("data-active", "true");
    });
  }

  if (title) title.textContent = product.name;
  if (description) description.textContent = product.description;
  if (price) price.textContent = formatCurrency.format(product.price);
  if (size) size.textContent = product.size;
  if (usage) usage.textContent = product.usage;

  if (highlightList) {
    highlightList.innerHTML = product.highlights
      .map((item) => `<li><span aria-hidden="true">•</span><span>${item}</span></li>`)
      .join("");
  }

  if (ingredientList) {
    ingredientList.innerHTML = product.ingredients.map((item) => `<li>${item}</li>`).join("");
  }

  if (addButton) {
    addButton.dataset.productId = product.id;
  }

  if (relatedList) {
    const relatedProducts = window.LuxgloProducts.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, 3);

    relatedList.innerHTML = relatedProducts
      .map(
        (related) => `
          <article class="product-card">
            <div class="product-card__image">
              <img src="${related.image}" alt="${related.name}" loading="lazy" />
            </div>
            <div class="product-card__body">
              <p class="product-card__meta">${related.category.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())} • ${
          related.size
        }</p>
              <h3 class="product-card__title">${related.name}</h3>
              <p class="text-muted">${related.description}</p>
              <div class="product-card__actions">
                <span class="product-card__price">${formatCurrency.format(related.price)}</span>
                <div>
                  <a class="btn btn--ghost" href="product.html?id=${related.id}">View</a>
                  <button class="btn btn--primary" type="button" data-add-to-cart data-product-id="${related.id}">Add to cart</button>
                </div>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }
});