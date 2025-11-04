# Luxe Glow Website

A multi-page marketing and commerce-ready experience for Luxe Glow, a professional skincare brand. The site is built with semantic HTML, modern CSS and vanilla JavaScript to deliver a performant, scalable and easily maintainable codebase.

## ✨ Highlights

- Responsive design optimized for desktop and mobile.
- Reusable global navigation, footer and typography system.
- Dynamic product rendering powered by a single JavaScript catalog.
- LocalStorage-backed cart with quantity management and order summary.
- Accessible accordions, keyboard-friendly navigation toggle and semantic markup.
- Comprehensive content strategy including About, Journal, Consultations, FAQ, Policies and Cart pages.

## 📁 Project structure

```
├── assets/
│   ├── css/
│   │   └── style.css           # Global styles and layout system
│   └── js/
│       └── app.js              # Product catalog, cart logic, UI interactions
├── index.html                  # Homepage
├── about.html                  # Founder story & values
├── products.html               # Shop with add-to-cart buttons
├── journal.html                # Education-focused articles
├── consultations.html          # Services and booking information
├── contact.html                # Contact details and inquiry form
├── cart.html                   # Cart review and order summary
├── faq.html                    # Frequently asked questions
├── shipping-returns.html       # Logistics policy
├── privacy-policy.html         # Data privacy statement
├── terms-of-service.html       # Terms and conditions
├── 404.html                    # Custom error page
├── robots.txt                  # Crawl directives
├── sitemap.xml                 # Search engine sitemap
└── README.md                   # Project overview
```

## 🚀 Getting started

1. Clone or download the repository.
2. Open `index.html` in your preferred browser, or serve the project locally with any static file server.
3. Customize product data inside `assets/js/app.js` to match your catalog (update names, pricing, images and tags).
4. Replace stock imagery URLs with brand photography where needed.
5. Update business contact information and email addresses across the content pages.

## 🛒 Cart behaviour

- Products are defined once in `productCatalog` inside `app.js` and rendered automatically on the home and shop pages.
- Cart contents persist in `localStorage` under the `luxeglow_cart` key.
- The cart badge updates globally; removing items or adjusting quantities recalculates totals instantly.

## 🌐 Deployment checklist

- Upload all files to your static hosting provider (Netlify, Vercel, GitHub Pages, etc.).
- Ensure `robots.txt` and `sitemap.xml` are available at the root of your domain.
- Configure a form handling service (Formspree, Netlify Forms, etc.) if you need live form submissions.
- Replace placeholder social proof and statistics with real metrics prior to launch.

## 🛡️ Accessibility & SEO

- Skip-link-ready structure with descriptive headings and accessible navigation controls.
- Buttons and interactive elements expose `aria` attributes where appropriate.
- Meta descriptions, canonical tags and Open Graph data are defined for primary pages.

## 📄 Licensing

All code in this repository is provided as a starting point for the Luxe Glow skincare brand and can be customized for commercial use. Replace third-party images with assets that you have rights to use before going live.