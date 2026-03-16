/* ─── SCRIPT.JS ─── */

// ── Nav: scroll state + mobile toggle ──
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Smooth scrolling for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll animations ──
const animatedEls = document.querySelectorAll('.fade-in, .fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // small stagger for sibling groups
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach((el, i) => {
  // auto-stagger siblings inside same parent
  const siblings = el.parentElement.querySelectorAll('.fade-up');
  siblings.forEach((sib, j) => { sib.dataset.delay = j * 70; });
  observer.observe(el);
});

// Trigger hero animations immediately
document.querySelectorAll('.hero .fade-in, .hero .fade-up').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 100 + i * 100);
});

// ── Form validation ──
const form         = document.getElementById('contactForm');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');
const emailError   = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

function showError(input, errorEl, msg) {
  input.classList.add('error');
  errorEl.textContent = msg;
}
function clearError(input, errorEl) {
  input.classList.remove('error');
  errorEl.textContent = '';
}

emailInput.addEventListener('input', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
  } else {
    clearError(emailInput, emailError);
  }
});

messageInput.addEventListener('input', () => {
  if (messageInput.value.length > 0) clearError(messageInput, messageError);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'A valid email is required.');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (!valid) return;

  // Simulate send
  const btn     = form.querySelector('.btn--primary');
  const label   = btn.querySelector('.btn__label');
  const sent    = btn.querySelector('.btn__sent');

  btn.disabled = true;
  label.hidden = true;
  sent.hidden  = false;
  btn.style.background = 'rgba(57,211,83,0.2)';
  btn.style.color      = 'var(--accent)';
  btn.style.border     = '1px solid var(--accent)';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    label.hidden = false;
    sent.hidden  = true;
    btn.style.cssText = '';
  }, 3000);
});

// ── Footer year ──
document.getElementById('footerYear').textContent = new Date().getFullYear();
