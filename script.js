// Basic JavaScript to handle mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  function setMobileNavOpen(open) {
    if (!menuToggle || !nav) {
      return;
    }
    nav.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      setMobileNavOpen(!isExpanded);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("active")) {
        setMobileNavOpen(false);
      }
    });
  }

  // Highlight the current page in the navigation
  let currentPath = window.location.pathname.split("/").pop() || "index.html";
  // Map blog articles and service detail pages to their parent nav items
  if (currentPath.startsWith("blog-")) {
    currentPath = "blog.html";
  }
  if (
    [
      "panel-upgrades.html",
      "ev-chargers.html",
      "lighting.html",
      "electrical-repairs.html",
      "generators.html",
      "energy-solutions.html",
      "energy-consulting.html",
    ].includes(currentPath)
  ) {
    currentPath = "services.html";
  }
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(function (link) {
    const linkTarget = link.getAttribute("href").split("/").pop();
    if (linkTarget === currentPath) {
      link.classList.add("active");
      // Mark the current page for accessibility
      link.setAttribute("aria-current", "page");
    }
    // Close the mobile nav when a link is clicked
    link.addEventListener("click", function () {
      if (nav.classList.contains("active")) {
        setMobileNavOpen(false);
      }
    });
  });

  function tteTrack(eventName, meta) {
    window.dispatchEvent(
      new CustomEvent("tte:track", { detail: { eventName, meta } }),
    );
  }

  function trackCta(target) {
    if (!target) {
      return;
    }
    const ctaLabel = target.getAttribute("data-cta");
    if (ctaLabel) {
      tteTrack("cta_click", { ctaLabel });
    }
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");
    const button = event.target.closest("button[data-cta]");
    trackCta(button || link);
    if (!link) {
      return;
    }
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      tteTrack("call_click", { href });
    }
    if (href.startsWith("sms:")) {
      tteTrack("text_click", { href });
    }
    if (href.startsWith("mailto:")) {
      tteTrack("email_click", { href });
    }
  });

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function () {
      tteTrack("form_submit", {
        formName: form.getAttribute("name") || "unnamed",
      });
    });
  });
});
