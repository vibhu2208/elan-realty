// Paradise Page JavaScript - Highlights Carousel

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('highlightsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.highlight-card');
    
    if (!carousel || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    let autoPlayInterval;
    let isTransitioning = false;
    
    // Get number of cards to show based on screen size
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1200) return 2;
        return 3;
    }
    
    // Update carousel position
    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(currentIndex * (cardWidth + gap));
        
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update navigation button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Move to next slide
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    }
    
    // Move to previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
    }
    
    // Start auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Handle window resize
    function handleResize() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            maxIndex = Math.max(0, cards.length - cardsPerView);
            
            // Adjust current index if needed
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            updateCarousel();
        }
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    }
    
    function handleTouchMove(e) {
        endX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoPlay();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Initialize
    updateCarousel();
    startAutoPlay();
    
    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all highlight cards
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Lightbox Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-hero-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(nextBtn) nextBtn.addEventListener('click', showNextImage);
    if(prevBtn) prevBtn.addEventListener('click', showPrevImage);

    // Close lightbox by clicking on the background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});
