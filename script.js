document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Function to close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    
    // Function to open mobile menu
    function openMobileMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
    }
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        if (hamburger.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside the mobile menu and hamburger
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Prevent menu from closing when clicking inside the menu
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on navigation links (except contact buttons)
    const navSectionLinks = document.querySelectorAll('.nav-section-links a');
    navSectionLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Smooth scroll for anchor links (ignore bare '#')
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // If href is just '#' or empty, do nothing here and let other handlers run
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll animations (about section)
    const animatedElements = document.querySelectorAll('.about-image img, .about-content .subtitle, .about-content .title, .about-content p, .services');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The animations are set to run once the element is visible
                // The CSS handles the animation state, no need to add a class
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Intersection Observer for Segments cards reveal
    const segmentCards = document.querySelectorAll('.segment-card');
    const segmentsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                segmentsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    segmentCards.forEach(card => segmentsObserver.observe(card));

    // Video Modal Functionality
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const closeVideoButton = document.getElementById('close-video');
    const videoModal = document.getElementById('video-modal');
    const youtubeVideo = document.getElementById('youtube-video');

    // Handle the original video triggers if they exist
    if (videoTriggers.length > 0 && closeVideoButton && videoModal && youtubeVideo) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const videoSrc = trigger.getAttribute('data-video-src');
                if (videoSrc) {
                    youtubeVideo.src = videoSrc;
                    videoModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            videoModal.classList.remove('show');
            youtubeVideo.src = ''; // Stop the video by clearing the src
            document.body.style.overflow = '';
        };

        closeVideoButton.addEventListener('click', closeModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }

    // Handle the new video modal for project walkthrough
    const projectVideoModal = document.getElementById('videoModal');
    const projectCloseButton = document.getElementById('closeModal');
    const projectYoutubeVideo = document.getElementById('youtubeVideo');
    const playButton = document.getElementById('playVideo');
    
    if (projectVideoModal && projectCloseButton && projectYoutubeVideo && playButton) {
        const closeProjectModal = () => {
            projectVideoModal.style.display = 'none';
            projectYoutubeVideo.src = '';
            document.body.style.overflow = '';
        };

        playButton.addEventListener('click', () => {
            projectVideoModal.style.display = 'flex';
            projectYoutubeVideo.src = 'https://www.youtube.com/embed/dcdHuWN21QE?autoplay=1';
            document.body.style.overflow = 'hidden';
        });

        projectCloseButton.addEventListener('click', closeProjectModal);
        projectVideoModal.addEventListener('click', (e) => {
            if (e.target === projectVideoModal) {
                closeProjectModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectVideoModal.style.display === 'flex') {
                closeProjectModal();
            }
        });
    }

    // Project Locations Interactivity
    const projectListItems = document.querySelectorAll('.pl-list li');
    const projectCards = document.querySelectorAll('.pl-card');

    projectListItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items and cards
            projectListItems.forEach(i => i.classList.remove('active'));
            projectCards.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked item
            item.classList.add('active');

            // Get the target project and activate the corresponding card
            const targetProject = item.getAttribute('data-target');
            const targetCard = document.querySelector(`.pl-card[data-project="${targetProject}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
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
            
            // Submit to form.php
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('mobile', phone);
            formData.append('project', 'Elan Realty');
            
            // Send AJAX request
            fetch('./form.php', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            })
            .then(resp => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.text();
            })
            .then(txt => {
                const isSuccess = /^\s*Thank You/i.test(txt);
                if (isSuccess) {
                    showNotification(txt, 'success');
                    contactForm.reset();
                } else {
                    showNotification(txt || 'Submission failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('An error occurred. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
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

    // Contact Popup Functions
    window.openContactPopup = function() {
        const overlay = document.getElementById('contactPopupOverlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeContactPopup = function() {
        const overlay = document.getElementById('contactPopupOverlay');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('popupContactForm');
        if (form) {
            form.reset();
        }
        
        // Hide notification
        const notification = document.getElementById('popupNotification');
        if (notification) {
            notification.style.display = 'none';
        }
    };

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const overlay = document.getElementById('contactPopupOverlay');
        if (e.target === overlay) {
            closeContactPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactPopup();
        }
    });

    // Popup Contact Form Handling
    const popupContactForm = document.getElementById('popupContactForm');
    if (popupContactForm) {
        popupContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('popupName').value.trim();
            const phone = document.getElementById('popupPhone').value.trim();
            
            // Basic validation
            if (!name || !phone) {
                showPopupNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Phone number validation (basic)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
                showPopupNotification('Please enter a valid 10-digit phone number.', 'error');
                return;
            }
            
            // Submit to form.php
            const submitBtn = document.querySelector('.popup-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('mobile', phone);
            formData.append('project', 'Elan Realty');
            
            // Send AJAX request
            fetch('./form.php', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            })
            .then(resp => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.text();
            })
            .then(txt => {
                const isSuccess = /^\s*Thank You/i.test(txt);
                if (isSuccess) {
                    showPopupNotification(txt, 'success');
                    // Close popup after success
                    setTimeout(() => {
                        closeContactPopup();
                    }, 2000);
                } else {
                    showPopupNotification(txt || 'Submission failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showPopupNotification('An error occurred. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    function showPopupNotification(message, type) {
        const notification = document.getElementById('popupNotification');
        if (notification) {
            notification.textContent = message;
            notification.className = `popup-notification ${type}`;
            notification.style.display = 'block';
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }

    // Smooth Scroll to Segments Section
    window.scrollToSegments = function() {
        const segmentsSection = document.getElementById('segments-section');
        if (segmentsSection) {
            segmentsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Footer form on project pages (e.g., elan-emperor/emperor.html) -> submit to form.php
    function getProjectNameFromPath() {
        const p = (location.pathname || '').toLowerCase();
        if (p.includes('elan-emperor') || p.includes('emperor')) return 'Elan Emperor';
        if (p.includes('elan-presidential') || p.includes('presidential')) return 'Elan The Presidential';
        if (p.includes('paradise')) return 'Elan Paradise';
        if (p.includes('elan-imperial') || p.includes('imperial')) return 'Elan Imperial';
        if (p.includes('elan-shona-road') || p.includes('shona')) return 'Elan Shona Road';
        return 'Elan Realty';
    }

    const footerContactForm = document.getElementById('footerContactForm');
    if (footerContactForm) {
        footerContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameEl = document.getElementById('footerName');
            const phoneEl = document.getElementById('footerPhone');
            const name = nameEl ? nameEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';

            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            const submitBtn = footerContactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('mobile', phone);
            formData.append('project', getProjectNameFromPath());

            fetch('../form.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(resp => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.text();
            })
            .then(txt => {
                const isSuccess = /^\s*Thank You/i.test(txt);
                if (isSuccess) {
                    alert('Thank you! We will contact you shortly.');
                    footerContactForm.reset();
                } else {
                    alert(txt || 'Submission failed. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        });
    }
});