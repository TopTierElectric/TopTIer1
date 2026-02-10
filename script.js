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

    document.addEventListener("click", function (event) {
      const clickedInsideNav = nav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);
      if (
        !clickedInsideNav &&
        !clickedToggle &&
        nav.classList.contains("active")
      ) {
        setMobileNavOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1200 && nav.classList.contains("active")) {
        setMobileNavOpen(false);
      }
    });
  }

  // Highlight the current page in the navigation
  let currentPath = window.location.pathname.split("/").pop() || "";
  if (!currentPath || currentPath === "index") {
    currentPath = "";
  }

  // Normalize legacy .html URLs to extensionless values.
  if (currentPath.endsWith(".html")) {
    currentPath = currentPath.slice(0, -5);
  }
  // Map blog articles and service detail pages to their parent nav items
  if (currentPath.startsWith("blog-")) {
    currentPath = "blog";
  }
  if (
    [
      "panel-upgrades",
      "ev-chargers",
      "lighting",
      "electrical-repairs",
      "generators",
      "energy-solutions",
      "energy-consulting",
    ].includes(currentPath)
  ) {
    currentPath = "services";
  }
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href") || "";
    let linkTarget = href.split("/").pop();
    if (linkTarget === "index") {
      linkTarget = "";
    }
    if (linkTarget.endsWith(".html")) {
      linkTarget = linkTarget.slice(0, -5);
    }
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
    const gaTarget = event.target.closest("[data-ga-event]");
    if (gaTarget && typeof gtag === "function") {
      gtag("event", gaTarget.dataset.gaEvent, {
        event_label: gaTarget.dataset.gaLabel || "",
        event_destination: gaTarget.dataset.gaDestination || "",
      });
    }

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

  // Keep pre-footer quick links consistent without hand-editing every page.
  const quickLinksSections = document.querySelectorAll(
    ".pre-footer .footer-col",
  );
  quickLinksSections.forEach(function (column) {
    const heading = column.querySelector("h4");
    const list = column.querySelector("ul");
    if (!heading || !list) {
      return;
    }
    if (heading.textContent.trim().toLowerCase() !== "quick links") {
      return;
    }
    const hasFinancingLink = Array.from(list.querySelectorAll("a")).some(
      function (link) {
        return (
          (link.getAttribute("href") || "").replace(".html", "") === "financing"
        );
      },
    );
    if (hasFinancingLink) {
      return;
    }
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = "financing";
    anchor.textContent = "Financing";
    item.appendChild(anchor);
    list.appendChild(item);
  });
});
