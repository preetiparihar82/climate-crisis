document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Shadow Effect
    const navbar = document.getElementById('mainNavbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Simple Observer for bottom content
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tell the observer to watch for our new scroll-reveal items too
const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-reveal');
    animatedElements.forEach(el => observer.observe(el));

});

// --- Rotating Text Animation ---
    const dynamicText = document.getElementById('dynamic-text');
    
    if (dynamicText) {
        // Edit these phrases to whatever you want to display!
        const phrases = [
            "Your trusted partner",
            "Your reliable expert",
            "Your dedicated team",
            "Your premier choice"
        ];
        
        let currentPhraseIndex = 0;

        // Change the text every 3.5 seconds (3500 milliseconds)
        setInterval(() => {
            // 1. Fade the current text out
            dynamicText.classList.add('fade-out');

            // 2. Wait for the fade-out CSS transition to finish (500ms)
            setTimeout(() => {
                // Update the word index
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                
                // Change the actual text on the screen
                dynamicText.textContent = phrases[currentPhraseIndex];

                // Prepare for fade in by moving it to the starting position
                dynamicText.classList.remove('fade-out');
                dynamicText.classList.add('fade-in');

                // Force browser to register the new position before animating
                void dynamicText.offsetWidth;

                // 3. Fade the new text in
                dynamicText.classList.remove('fade-in');
            }, 500); // Matches the 0.5s in the CSS transition

        }, 3300); 
    }


    document.addEventListener("DOMContentLoaded", function() {
        // Watches the screen for your heading
        const waveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Triggers the wave when you scroll down to it
                    entry.target.classList.add('play-wave');
                } else {
                    // Resets the wave when you scroll away so it can play again!
                    entry.target.classList.remove('play-wave');
                }
            });
        }, { threshold: 0.1 }); // Triggers as soon as 10% of the heading is visible

        // Attach the watcher to the heading
        const heading = document.querySelector('.wave-container');
        if (heading) {
            waveObserver.observe(heading);
        }
    });


document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Header Scroll Animation
    const svcHeader = document.getElementById('svcHeader');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    if(svcHeader) headerObserver.observe(svcHeader);

    // 2. Fixed Carousel Logic
    const track = document.getElementById('servicesTrack');
    const dotsContainer = document.getElementById('serviceDots');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    let currentIndex = 0;
    let autoSlideInterval;
    let maxDots = 0;

    function getVisibleCards() {
        if (window.innerWidth >= 992) return 3; // Desktop
        if (window.innerWidth >= 768) return 2; // Tablet
        return 1; // Mobile
    }

    function generateDots() {
        dotsContainer.innerHTML = ''; // Clear old dots
        const visibleCards = getVisibleCards();
        maxDots = totalSlides - visibleCards + 1; // Calculate how many "stops" we have

        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            
            // Add click event to new dot
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        // Wrap around logic for auto-slider
        if (index >= maxDots) index = 0;
        if (index < 0) index = maxDots - 1;
        
        currentIndex = index;

        // Update Dots UI
        const allDots = document.querySelectorAll('#serviceDots .dot');
        allDots.forEach(d => d.classList.remove('active'));
        if(allDots[currentIndex]) allDots[currentIndex].classList.add('active');

        // Move Track
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Auto Sliding Setup
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialization
    generateDots();
    startAutoSlide();

    // Re-calculate math if user resizes the window
    window.addEventListener('resize', () => {
        // Temporarily reset to start to prevent glitching on resize
        currentIndex = 0; 
        generateDots();
        goToSlide(0);
    });
});

    document.addEventListener("DOMContentLoaded", function() {
        const waveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('play-wave');
                } else {
                    entry.target.classList.remove('play-wave');
                }
            });
        }, { threshold: 0.1 }); 

        // Attach observer to all wave containers on the page
        document.querySelectorAll('.wave-container').forEach(container => {
            waveObserver.observe(container);
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200; // Lower is faster

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));
                
                let current = 0;
                const increment = countTo / speed;

                const updateCount = () => {
                    current += increment;
                    if (current < countTo) {
                        target.innerText = Math.ceil(current) + "+";
                        setTimeout(updateCount, 1);
                    } else {
                        target.innerText = countTo + "+";
                    }
                };
                updateCount();
                observer.unobserve(target); // Only run once
            }
        });
    };

    const statsObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));
});


    document.addEventListener("DOMContentLoaded", function() {
        const slides = document.querySelectorAll('.testi-slide');
        const nextBtns = document.querySelectorAll('.next-btn');
        const prevBtns = document.querySelectorAll('.prev-btn');
        let currentSlide = 0;
        let slideTimer; // Variable to hold the automatic timer

        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        // Function to move to the next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Function to move to the previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Start the automatic slider (changes every 4000ms / 4 seconds)
        function startAutoSlider() {
            slideTimer = setInterval(nextSlide, 4000); 
        }

        // Reset the timer if the user clicks manually
        function resetAutoSlider() {
            clearInterval(slideTimer);
            startAutoSlider();
        }

        // Attach manual click events to all NEXT buttons
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlider(); // Restart timer on click
            });
        });

        // Attach manual click events to all PREV buttons
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlider(); // Restart timer on click
            });
        });

        // Start the automatic slider when the page loads
        startAutoSlider();
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Find all wave containers on the page
        const waveContainers = document.querySelectorAll('.wave-container');

        // Create the observer
        const waveObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the user scrolls down and sees the section...
                if (entry.isIntersecting) {
                    // Add the class that plays your CSS animation
                    entry.target.classList.add('play-wave');
                    
                    // Stop watching it so the animation only plays once per page load
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.2 // Triggers when 20% of the text is visible on screen
        });

        // Attach the observer to our container
        waveContainers.forEach(container => {
            waveObserver.observe(container);
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        
        // --- 1. Text Wave Observer ---
        const waveContainers = document.querySelectorAll('.wave-container');
        const waveObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('play-wave');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.2 });

        waveContainers.forEach(container => {
            waveObserver.observe(container);
        });

        // --- 2. NEW: Masonry Image Reveal Observer ---
        const masonryTrigger = document.getElementById('masonry-anim-trigger');
        if (masonryTrigger) {
            const masonryObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Adds the class to trigger the image animations
                        entry.target.classList.add('play-reveal');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 }); // Triggers when 20% of the images are visible

            masonryObserver.observe(masonryTrigger);
        }

        

    });
