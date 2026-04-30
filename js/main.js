/* ============================================================
   STOFFA s.r.o. — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. Scroll Progress Bar
     ============================================================ */
  const progressBar = document.getElementById('progress-bar');

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ============================================================
     2. Header — transparent → white on scroll
     ============================================================ */
  const header = document.getElementById('header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* ============================================================
     3. Scroll Reveal via IntersectionObserver
     ============================================================ */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      // If already in viewport on load, show immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }

  /* ============================================================
     4. Animated Stat Counters
     ============================================================ */
  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutQuad(progress) * target);
      el.textContent = value + (el.dataset.suffix || '');
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            if (!isNaN(target)) {
              animateCounter(el, target, 1500);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     5. Hero Subtext Cycling
     ============================================================ */
  function initHeroCycle() {
    const phrases = document.querySelectorAll('.hero-subtext');
    if (phrases.length < 2) return;

    let current = 0;
    phrases[0].classList.add('active');

    setInterval(function () {
      phrases[current].classList.remove('active');
      current = (current + 1) % phrases.length;
      phrases[current].classList.add('active');
    }, 3500);
  }

  /* ============================================================
     6. Mobile Hamburger Menu
     ============================================================ */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================================
     7. Contact Form — Validation + Success State
     ============================================================ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const successEl = document.getElementById('form-success');
    const resetBtn = document.getElementById('form-reset');

    function setError(group, msg) {
      group.classList.add('error');
      const errEl = group.querySelector('.form-error-msg');
      if (errEl) errEl.textContent = msg;
    }

    function clearError(group) {
      group.classList.remove('error');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Live clear on input
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        clearError(el.closest('.form-group'));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameGroup = form.querySelector('[data-field="name"]');
      const companyGroup = form.querySelector('[data-field="company"]');
      const emailGroup = form.querySelector('[data-field="email"]');
      const messageGroup = form.querySelector('[data-field="message"]');

      const nameEl = nameGroup.querySelector('input');
      const companyEl = companyGroup.querySelector('input');
      const emailEl = emailGroup.querySelector('input');
      const messageEl = messageGroup.querySelector('textarea');

      let valid = true;

      const isCs = document.documentElement.lang === 'cs';

      if (!nameEl.value.trim()) {
        setError(nameGroup, isCs ? 'Toto pole je povinné.' : 'This field is required.');
        valid = false;
      } else {
        clearError(nameGroup);
      }

      if (!companyEl.value.trim()) {
        setError(companyGroup, isCs ? 'Toto pole je povinné.' : 'This field is required.');
        valid = false;
      } else {
        clearError(companyGroup);
      }

      if (!emailEl.value.trim()) {
        setError(emailGroup, isCs ? 'Toto pole je povinné.' : 'This field is required.');
        valid = false;
      } else if (!validateEmail(emailEl.value.trim())) {
        setError(emailGroup, isCs ? 'Zadejte platnou e-mailovou adresu.' : 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(emailGroup);
      }

      if (!messageEl.value.trim()) {
        setError(messageGroup, isCs ? 'Toto pole je povinné.' : 'This field is required.');
        valid = false;
      } else {
        clearError(messageGroup);
      }

      if (valid) {
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('show');
        }
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        form.style.display = 'block';
        if (successEl) successEl.classList.remove('show');
        form.querySelectorAll('.form-group').forEach(function (g) {
          clearError(g);
        });
      });
    }
  }

  /* ============================================================
     8. Mobile Bottom CTA — show after hero, hide near contact
     ============================================================ */
  function initMobileCTA() {
    const cta = document.getElementById('mobile-cta');
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');

    if (!cta || !hero) return;

    function updateCTA() {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const contactVisible = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.5
        : false;

      if (heroBottom < 0 && !contactVisible) {
        cta.classList.add('visible');
      } else {
        cta.classList.remove('visible');
      }
    }

    cta.addEventListener('click', function () {
      if (contact) {
        const top = contact.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });

    window.addEventListener('scroll', updateCTA, { passive: true });
    updateCTA();
  }

  /* ============================================================
     9. Unified scroll handler
     ============================================================ */
  function onScroll() {
    updateProgress();
    updateHeader();
  }

  /* ============================================================
     Init
     ============================================================ */
  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    initReveal();
    // Safety fallback: ensure nothing stays hidden
    setTimeout(function () {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 1200);
    initCounters();
    initHeroCycle();
    initMobileMenu();
    initContactForm();
    initMobileCTA();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
