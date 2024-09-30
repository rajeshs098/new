document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Responsive behavior for window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (navLinks) navLinks.style.display = 'flex';
        } else {
            if (navLinks) navLinks.style.display = 'none';
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h3').textContent;
            alert(`Added ${productName} to cart!`);
        });
    });

    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.maxHeight;

            // Close all other open answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                }
            });

            // Toggle the clicked answer
            if (isOpen) {
                answer.style.maxHeight = null;
                question.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                question.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission for newsletter
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = subscribeForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}. You'll receive your 10% off coupon shortly!`);
            subscribeForm.reset();
        });
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }

    // Product filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const products = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            products.forEach(product => {
                if (filter === 'all' || product.classList.contains(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Free consultation modal
    const consultationButton = document.querySelector('.cta-button');
    const modal = document.querySelector('.consultation-modal');
    const closeModal = document.querySelector('.close-modal');

    if (consultationButton && modal && closeModal) {
        consultationButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Shipping calculator
    const calculateShipping = document.querySelector('#calculate-shipping');
    if (calculateShipping) {
        calculateShipping.addEventListener('submit', (e) => {
            e.preventDefault();
            const zipCode = document.querySelector('#zip-code').value;
            // This is a placeholder for actual shipping calculation logic
            alert(`Shipping cost to ${zipCode} is €5.00`);
        });
    }
});