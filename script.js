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
});