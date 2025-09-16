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
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
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

    // Video Modal Functionality
    const openVideoButton = document.getElementById('open-video');
    const closeVideoButton = document.getElementById('close-video');
    const videoModal = document.getElementById('video-modal');
    const youtubeVideo = document.getElementById('youtube-video');
    const videoSrc = 'https://www.youtube.com/embed/umgQvzdaDcM?si=-JMWSyOyEp5mMFrQ&autoplay=1&mute=1';

    openVideoButton.addEventListener('click', () => {
        videoModal.classList.add('show');
        youtubeVideo.src = videoSrc;
    });

    const closeModal = () => {
        videoModal.classList.remove('show');
        youtubeVideo.src = ''; // Stop the video
    };

    closeVideoButton.addEventListener('click', closeModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });
});