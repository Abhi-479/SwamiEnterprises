// Smooth scrolling and navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
      element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
      });
  }
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
      mobileMenu.classList.remove('active');
  }
  
  // Update active nav link
  updateActiveNavLink(sectionId);
}

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
      mobileMenu.classList.toggle('active');
  }
}

// Update active navigation link
function updateActiveNavLink(activeSection) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
          link.classList.add('active');
      }
  });
}

// Track active section on scroll
function trackActiveSection() {
  const sections = ['home', 'about', 'services', 'products', 'contact'];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              updateActiveNavLink(section);
              break;
          }
      }
  }
}

// Contact form handling
function handleContactForm() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('form-success');
  
  if (form) {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(form);
          const data = Object.fromEntries(formData);
          
          // Validate required fields
          if (!data.name || !data.phone || !data.service || !data.message) {
              alert('Please fill in all required fields.');
              return;
          }
          
          // Simulate form submission
          console.log('Form submitted:', data);
          
          // Show success message
          form.style.display = 'none';
          formSuccess.style.display = 'block';
          
          // Reset form after 3 seconds
          setTimeout(() => {
              form.style.display = 'block';
              formSuccess.style.display = 'none';
              form.reset();
          }, 3000);
      });
  }
}

// Initialize animations on scroll
function initScrollAnimations() {
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.card, .service-card, .product-card, .testimonial-card');
  animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
  });
}

// Phone number click handler
function initPhoneHandlers() {
  const phoneNumbers = document.querySelectorAll('[href^="tel:"], .phone-number');
  phoneNumbers.forEach(phone => {
      phone.addEventListener('click', function() {
          // Track phone click for analytics
          console.log('Phone number clicked:', this.textContent);
      });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up scroll tracking
  window.addEventListener('scroll', trackActiveSection);
  
  // Initialize contact form
  handleContactForm();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize phone handlers
  initPhoneHandlers();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      
      if (mobileMenu && mobileMenuBtn && 
          !mobileMenu.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.remove('active');
      }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
      const mobileMenu = document.getElementById('mobileMenu');
      if (window.innerWidth > 768 && mobileMenu) {
          mobileMenu.classList.remove('active');
      }
  });
  
  // Initial active section update
  trackActiveSection();
});

// Utility functions
function formatPhoneNumber(phone) {
  // Format phone number for display
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Add smooth hover effects
function addHoverEffects() {
  const cards = document.querySelectorAll('.card, .service-card, .product-card');
  
  cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });
}

// Initialize hover effects after DOM load
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const url = `https://wa.me/919657344130?text=Hi, I'm ${name}. I need help with: ${service}. ${message}`;
  window.open(url, '_blank');
});
