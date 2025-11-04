# Luxe Glow – Professional Skincare Website

A fully responsive, multi-page marketing and commerce experience for the Luxe Glow skincare brand. The site showcases the
founder story, product catalog, consultation services, education hub, and cart-ready shopping flow built with vanilla
HTML, CSS, and JavaScript.

## ✨ Highlights

- **Scalable architecture** – modular CSS, reusable layout components, and centralized product data to simplify updates.
- **Commerce ready** – dynamic product listings, product detail pages, persistent cart powered by `localStorage`, and a
  checkout handoff placeholder ready for Stripe, Shopify, or similar payment providers.
- **Consultation funnel** – lead capture form with validation and customizable messaging for concierge services.
- **SEO optimized** – semantic markup, descriptive meta tags, sitemap, and structured navigation for discoverability.
- **Partner enablement** – dedicated wholesale, returns, terms, and privacy pages for a complete business presence.

## 🗂️ Project structure

```
assets/
  css/
    main.css           # Global design system, layout utilities, components
  js/
    cart.js            # Cart state management + toast notifications
    cart-page.js       # Cart page rendering and quantity controls
    main.js            # Navigation, cart badge sync, shared interactions
    product.js         # Product detail rendering and related items
    products.js        # Central product catalog data
    shop.js            # Collection filters and sorting
  img/                 # Placeholders for brand imagery if self-hosted
index.html             # Homepage
collections.html       # Shop / product listing
product.html           # Product detail template
cart.html              # Cart + order summary
consultation.html      # Virtual consultation funnel
about.html             # Founder story and values
contact.html           # Contact & partnerships hub
blog.html              # Glow Guide content hub
privacy-policy.html    # Privacy statement
terms.html             # Terms of service
returns.html           # Returns & exchanges policy
wholesale.html         # Wholesale partner portal
404.html               # Custom not-found page
robots.txt             # Search engine directives
sitemap.xml            # Crawlable map of site URLs
favicon.ico            # Brand icon (replace with final artwork)
```

## 🚀 Getting started

1. **Clone or download** this repository.
2. Open the project root in your preferred editor.
3. Launch a local web server (recommended for `fetch`/`localStorage` support):

   ```bash
   # Python 3
   python -m http.server 8000
   # or Node
   npx serve
   ```

4. Visit `http://localhost:8000` (or the provided URL) to explore the site.

> Tip: Because cart data is stored in `localStorage`, you can clear your browser storage to reset the cart between tests.

## 🛍️ Customizing products

- Update `assets/js/products.js` to edit product names, imagery, pricing, copy, or categories.
- Add additional products by appending to the `LuxgloProducts` array—listings, product detail pages, and the cart will
  reflect the new items automatically.
- Product images currently load from Unsplash. Replace the URLs with self-hosted assets in `assets/img/` for production
  deployments.

## 💳 Connecting a real checkout

The cart currently displays totals and provides a `data-checkout` button that triggers a placeholder alert. To integrate
payments:

1. Replace the alert handler in `assets/js/cart-page.js` with your provider’s SDK call (Stripe Checkout, Shopify Buy
   Button, LemonSqueezy, etc.).
2. Optionally sync `LuxgloCart.getDetailedItems()` with your backend to create orders or invoices before redirecting.
3. Ensure your provider returns to a success page (create `success.html`) and handles webhook fulfillment.

## 📣 Forms & lead capture

- The consultation form lives on `consultation.html` and is validated client-side in `assets/js/main.js`.
- Connect to services such as HubSpot, Mailchimp, Airtable, or Calendly by replacing the alert with an API call or embed
  script.
- Always secure forms with HTTPS and spam protection (reCAPTCHA, hCaptcha) before going live.

## 🌐 Deployment checklist

- Configure custom domain + HTTPS using Netlify, Vercel, Render, or static hosting of choice.
- Upload/update `favicon.ico` and any brand imagery.
- Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Connect analytics (e.g., Plausible, GA4) and marketing pixels as needed.
- Set up automated backups or leverage git-based deployments to maintain version history.

## 🛡️ Security & maintenance

- Keep dependencies minimal—this project uses no external build tooling, making security management straightforward.
- Review and rotate access credentials for any connected services (email, payment gateways, CRM).
- Schedule quarterly content audits to refresh testimonials, articles, and promotional copy.
- Monitor performance with tools like Lighthouse or WebPageTest and compress new images before publishing.

## 🤝 Support & contributions

Feel free to adapt this project for your own skincare or beauty brand. Contributions via pull requests are welcome—please
include clear descriptions and ensure HTML/CSS/JS follow the existing conventions.