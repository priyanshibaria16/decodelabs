/**
 * TechNova AI - Core JavaScript Functionality
 * Author: TechNova AI
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dark/Light Theme Toggle
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  
  // Retrieve saved preference or check system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set default theme (Default to dark if no setting or system prefers dark)
  if (savedTheme === 'light') {
    enableLightTheme();
  } else if (savedTheme === 'dark') {
    enableDarkTheme();
  } else {
    // System preference fallback
    if (!prefersDark) {
      enableLightTheme();
    } else {
      enableDarkTheme();
    }
  }

  // Click event listener
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  });

  function enableLightTheme() {
    document.body.classList.add('light-theme');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'light');
  }

  function enableDarkTheme() {
    document.body.classList.remove('light-theme');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'dark');
  }


  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  // Accessibility: Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });


  // ==========================================
  // 3. Header Scrolled Styling
  // ==========================================
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 4. Smooth Scrolling & Active Link Observer
  // ==========================================
  // Standard anchor clicks are handled by CSS scroll-behavior: smooth.
  // This observer updates active navbar styles as you scroll through sections.
  const sections = document.querySelectorAll('section[id]');
  
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the focus area
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  function updateActiveLink(activeId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      }
    });
  }


  // ==========================================
  // 5. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Reveal slightly before entering view fully
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger animation once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });


  // ==========================================
  // 6. Animated Statistics Counter
  // ==========================================
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let counterStarted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      statNumbers.forEach(num => animateCounter(num));
      statsObserver.unobserve(statsSection);
    }
  }, {
    root: null,
    threshold: 0.3
  });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // Counter length in ms
    const stepTime = 25; // Interval duration in ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    // Check if target requires decimal formatting
    const hasDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        element.textContent = hasDecimal ? target.toFixed(1) + suffix : Math.round(target) + suffix;
      } else {
        element.textContent = hasDecimal ? current.toFixed(1) + suffix : Math.round(current) + suffix;
      }
    }, stepTime);
  }


  // ==========================================
  // 7. FAQ Accordion Logic
  // ==========================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const panel = parent.querySelector('.faq-panel');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels
      faqTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanel = otherTrigger.parentElement.querySelector('.faq-panel');
          otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current panel
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      }
    });
  });


  // ==========================================
  // 8. Contact Form Validation & Submission
  // ==========================================
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const companyInput = document.getElementById('contact-company');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('form-submit-btn');
  const toastSuccess = document.getElementById('toast-success');

  const inputs = [nameInput, emailInput, companyInput, messageInput];

  // Inline Validation Helpers
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function checkField(input) {
    let isValid = true;

    if (input.value.trim() === '') {
      isValid = false;
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      isValid = false;
    }

    if (isValid) {
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
    }

    return isValid;
  }

  // Clear errors when typing
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        checkField(input);
      }
    });
  });

  // Handle submit action
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check all fields
    let formIsValid = true;
    inputs.forEach(input => {
      const isFieldValid = checkField(input);
      if (!isFieldValid) {
        formIsValid = false;
      }
    });

    if (formIsValid) {
      // Simulate Form Sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      setTimeout(() => {
        // Reset Form elements
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Show success toast overlay
        toastSuccess.classList.remove('hidden');
        
        // Hide success toast after 4 seconds
        setTimeout(() => {
          toastSuccess.classList.add('hidden');
        }, 4000);

      }, 1500);
    }
  });

});
