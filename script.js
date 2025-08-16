// Basic JavaScript to handle mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('active');
    });
  }

  // Highlight the current page in the navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(function (link) {
    const linkTarget = link.getAttribute('href').split('/').pop();
    if (linkTarget === currentPath) {
      link.classList.add('active');
      // Mark the current page for accessibility
      link.setAttribute('aria-current', 'page');
    }
    // Close the mobile nav when a link is clicked
    link.addEventListener('click', function () {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
