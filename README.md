# Top Tier Electrical Website

This is a static website for **Top Tier Electrical**, a fictional electrician service in West Michigan.  The site is built using plain HTML, CSS and JavaScript—there are no build tools or dependencies required.

All pages include SEO‑friendly meta tags, Open Graph data and structured data for a local business.  Canonical URLs are set to `https://www.toptier-electrical.com/…` as a placeholder—update these values to match your final domain before deploying.

## Structure

The site is organised into a number of pages to cover all aspects of the business:

- **`index.html`** – Home page featuring a hero section, value propositions and a brief service overview with a free estimate callout.
- **`about.html`** – Shares the company’s story, mission and a list of certifications and awards.
- **`services.html`** – Detailed descriptions of our service offerings, including panel upgrades, EV charger installation and lighting solutions.
- **`testimonials.html`** – Real customer testimonials and reviews to build trust.
- **`financing.html`** – Explains the flexible financing options available for larger projects.
- **`emergency.html`** – Defines what constitutes an electrical emergency and provides a 24/7 hotline.
- **`gallery.html`** – Project gallery referencing images stored in your repository (update the paths as needed to match your repo).
- **`faq.html`** – Frequently asked questions covering common electrical topics and our service policies.
- **`contact.html`** – Contact page with phone, email and a Netlify‑ready contact form.
- **`404.html`** – Custom 404 page to guide visitors back to the main site when a page is not found.
- **`styles.css`** – Global styles and layout definitions (now includes styles for about, testimonials, info sections and FAQs).
- **`script.js`** – JavaScript for the mobile navigation toggle and automatically highlighting the current page via `aria-current` attributes.
- **`assets/images/hero.jpg`** – Background image used for the hero sections.

## Viewing Locally

To view the site locally, simply open `index.html` in your web browser.  All navigation links will work automatically as long as the files remain in the same directory structure.

## Deployment

This site is ready to be deployed to any static hosting platform (e.g. Netlify or GitHub Pages).  If using Netlify, ensure your contact form is enabled by leaving the `data-netlify="true"` attribute intact on the form element.

## Repository Setup

When creating a new GitHub repository, extract this ZIP and commit all files.  The gallery page references image files that are **not** included in this package (they should already exist in your repository).  Make sure your repository contains the images referenced in `gallery.html` (for example, at `/images/gallery/3-phase-service.jpg`, `/images/gallery/conduit-piping.jpg`, etc.).

## Analytics & Security

The HTML pages include a commented‑out Google Analytics snippet near the bottom. To enable tracking, replace `G-XXXXXXXXXX` with your actual GA ID and uncomment the code.  All pages use relative links and include canonical URLs; be sure to update these URLs to match your production domain.  Hosting on a platform with HTTPS enabled (e.g. Netlify, GitHub Pages) is strongly recommended to ensure visitor security and trust.