// Sohna Road Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close mobile menu on link click
    const navLinkItems = document.querySelectorAll('.nav-item a, .btn-phone, .btn-enquire');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const notification = document.getElementById('formNotification');
            
            // Basic validation
            if (!name || !phone) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Phone number validation (basic)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
                showNotification('Please enter a valid 10-digit phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-hero-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(img => img.src);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            lightboxImg.src = images[currentImageIndex];
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close lightbox when clicking outside
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentImageIndex];
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImg.src = images[currentImageIndex];
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                lightboxImg.src = images[currentImageIndex];
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.concept-building-image, .revolution-heading, .concept-description, .lifestyle-icon');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Notification function
function showNotification(message, type) {
    const notification = document.getElementById('formNotification');
    if (notification) {
        notification.textContent = message;
        notification.className = `form-notification ${type}`;
        notification.style.display = 'block';

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility function to close mobile menu
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Export functions for global access if needed
window.scrollToSection = scrollToSection;
window.closeMobileMenu = closeMobileMenu;
window.showNotification = showNotification;
