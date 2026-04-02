
// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Navbar style
  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  // Active nav link
  updateActiveNav();
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateActiveNav() {
  const sections = ['home', 'about', 'projects', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100) current = id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) link.classList.add('active');
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('mobile-open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('mobile-open');
  });
});

// ===== TYPING EFFECT =====
const typedText = document.getElementById('typed-text');
const phrases = [
  'Web Developer',
  'B.Tech CSE Student',
  'Frontend Enthusiast',
  'Problem Solver'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 120;

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    typingSpeed = 60;
  } else {
    typedText.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    typingSpeed = 120;
  }
  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    typingSpeed = 1800;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typingSpeed = 400;
  }
  setTimeout(type, typingSpeed);
}
setTimeout(type, 600);

// Particles removed for simplicity

// ===== SCROLL REVEAL =====
function addRevealClasses() {
  const aboutCards = document.querySelectorAll('.about-card');
  aboutCards.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${i * 0.1}s`; });

  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${i * 0.1}s`; });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${i * 0.12}s`; });

  const contactCards = document.querySelectorAll('.contact-card, .contact-socials');
  contactCards.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${i * 0.1}s`; });

  document.querySelector('.contact-form-wrapper')?.classList.add('reveal');
  document.querySelector('.section-header')?.classList.add('reveal');

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const increment = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + '+';
  }, 50);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== HIRE ME BUTTON RIPPLE =====
function addRipple(e) {
  const btn = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px; height: ${size}px;
    top: ${e.clientY - rect.top - size / 2}px;
    left: ${e.clientX - rect.left - size / 2}px;
    background: rgba(255,255,255,0.25);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-anim 0.5s ease-out forwards;
    pointer-events: none;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);

document.querySelectorAll('.btn-primary, .hire-btn').forEach(btn => btn.addEventListener('click', addRipple));

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function validateField(id, errorId, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!field.value.trim()) {
    field.classList.add('error');
    error.textContent = message;
    return false;
  }
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
    field.classList.add('error');
    error.textContent = 'Please enter a valid email address.';
    return false;
  }
  field.classList.remove('error');
  error.textContent = '';
  return true;
}

['name', 'email', 'subject', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const err = document.getElementById(id + '-error');
      if (err) err.textContent = '';
    });
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = validateField('name', 'name-error', 'Please enter your name.');
  const v2 = validateField('email', 'email-error', 'Please enter your email.');
  const v3 = validateField('subject', 'subject-error', 'Please enter a subject.');
  const v4 = validateField('message', 'message-error', 'Please write a message.');

  if (v1 && v2 && v3 && v4) {
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    btn.disabled = true;
    btnText.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      formSuccess.style.display = 'flex';
      form.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1500);
  }
});

// ===== SMOOTH NAV CLICK =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
