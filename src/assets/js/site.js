(function () {
  "use strict";

  const EVENTS = Object.freeze({
    LEAD_CALL: "generate_lead_call",
    LEAD_BOOKING_SUBMIT: "generate_lead_booking_submit",
    LEAD_CONTACT_SUBMIT: "generate_lead_contact_submit",
    CTA_BOOKING_CLICK: "booking_cta_click",
    CTA_SERVICE_CLICK: "service_cta_click",
    CTA_EMERGENCY_CALL_CLICK: "emergency_call_click",
    SCROLL_50: "scroll_50",
    SCROLL_75: "scroll_75",
    SCROLL_90: "scroll_90",
    FAQ_TOGGLE: "faq_toggle",
    FORM_START: "form_start",
    FORM_ERROR: "form_error"
  });

  function getContext() {
    const b = document.body;
    return {
      page_type: b.getAttribute("data-page-type") || "page",
      service: b.getAttribute("data-service") || "none",
      city: b.getAttribute("data-city") || "none"
    };
  }

  function track(eventName, params) {
    if (typeof window.gtag !== "function") return;
    const ctx = getContext();
    window.gtag("event", eventName, Object.assign({ transport_type: "beacon" }, ctx, params || {}));
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const cta = a.dataset.cta;
    if (!cta) return;

    const href = (a.getAttribute("href") || "").trim();
    const method = href.startsWith("tel:") ? "tel" : href.startsWith("sms:") ? "sms" : "link";
    const cta_location = a.dataset.ctaLocation || "unknown";

    if (cta === "call") track(EVENTS.LEAD_CALL, { method, cta_location });
    if (cta === "booking") track(EVENTS.CTA_BOOKING_CLICK, { method, cta_location });
    if (cta === "service") track(EVENTS.CTA_SERVICE_CLICK, { method, cta_location });
    if (cta === "emergency-call") track(EVENTS.CTA_EMERGENCY_CALL_CLICK, { method, cta_location });
  });

  let fired50 = false, fired75 = false, fired90 = false;
  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
    const height = doc.scrollHeight - doc.clientHeight;
    if (height <= 0) return;
    const pct = (scrollTop / height) * 100;

    if (!fired50 && pct >= 50) { fired50 = true; track(EVENTS.SCROLL_50); }
    if (!fired75 && pct >= 75) { fired75 = true; track(EVENTS.SCROLL_75); }
    if (!fired90 && pct >= 90) { fired90 = true; track(EVENTS.SCROLL_90); }
  }, { passive: true });

  document.addEventListener("toggle", (e) => {
    const el = e.target;
    if (el && el.tagName === "DETAILS") {
      const summary = el.querySelector("summary");
      const label = summary ? summary.textContent.trim().slice(0, 120) : "faq";
      track(EVENTS.FAQ_TOGGLE, { label });
    }
  }, true);

  function wireForm(form) {
    let started = false;
    form.addEventListener("input", () => {
      if (started) return;
      started = true;
      track(EVENTS.FORM_START, { method: "form" });
    }, { passive: true });

    form.addEventListener("submit", (e) => {
      const formType = (form.getAttribute("data-form") || "").trim();
      const conversionEvent = formType === "booking" ? EVENTS.LEAD_BOOKING_SUBMIT : formType === "contact" ? EVENTS.LEAD_CONTACT_SUBMIT : null;
      if (!conversionEvent || typeof window.gtag !== "function") return;
      e.preventDefault();
      let submitted = false;
      const submitNow = () => {
        if (submitted) return;
        submitted = true;
        form.submit();
      };
      window.gtag("event", conversionEvent, Object.assign(getContext(), {
        method: "form",
        event_callback: submitNow,
        event_timeout: 1200,
        transport_type: "beacon"
      }));
      setTimeout(submitNow, 1300);
    });
  }

  document.querySelectorAll("form[data-form]").forEach(wireForm);
})();
