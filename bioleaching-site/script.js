/* ═══════════════════════════════════════════════════════════════
   R-N-A MINERALS RECOVERY LTD — script.js
   ═══════════════════════════════════════════════════════════════ */

// ─── STICKY HEADER ────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.background = 'rgba(10,22,40,0.98)';
    header.style.boxShadow  = '0 2px 24px rgba(0,0,0,0.4)';
  } else {
    header.style.background = 'rgba(10,22,40,0.92)';
    header.style.boxShadow  = 'none';
  }
});

// ─── MOBILE MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── ACTIVE NAV HIGHLIGHT ON SCROLL ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
const animateEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if the element contains cards
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

animateEls.forEach((el, i) => {
  el.dataset.delay = i * 80; // slight stagger per section
  observer.observe(el);
});

// ─── CONTACT FORM ────────────────────────────────────────────
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#e05050';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    // Show success (in production, replace with real form submission)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'block';
      submitBtn.style.display   = 'none';
      form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    }, 800);
  });
}

// ─── SMOOTH SCROLL OFFSET FOR FIXED HEADER ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ─── IMAGE FALLBACK (hide broken images, show placeholder) ───
document.querySelectorAll('img.img-cover').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});
