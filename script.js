// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add reveal class to cards and sections
document.querySelectorAll('.service-card, .step-card, .testimonial-card, .feature-item, .contact-detail').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== URL PARAM: Pre-fill tracking number =====
const urlParams = new URLSearchParams(window.location.search);
const awbParam = urlParams.get('awb');
if (awbParam) {
  const trackInput = document.getElementById('trackInput');
  if (trackInput) {
    trackInput.value = awbParam;
  }
}

// ===== HAMBURGER ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  /* Stagger animation for grid children */
  .services-grid .service-card:nth-child(2) { transition-delay: 0.05s; }
  .services-grid .service-card:nth-child(3) { transition-delay: 0.10s; }
  .services-grid .service-card:nth-child(4) { transition-delay: 0.15s; }
  .services-grid .service-card:nth-child(5) { transition-delay: 0.20s; }
  .services-grid .service-card:nth-child(6) { transition-delay: 0.25s; }
  .testimonials-grid .testimonial-card:nth-child(2) { transition-delay: 0.1s; }
  .testimonials-grid .testimonial-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);
