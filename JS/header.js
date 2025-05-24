// Function to handle preloader
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}


// Function to handle back to top button
function handleBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Handle preloader
    handlePreloader();

    // Handle scroll animations
    handleScrollAnimations();
    
    // Handle back to top button
    handleBackToTop();

    // Add event listeners for mobile search toggle
    const searchToggle = document.querySelector('[data-bs-target="#searchCollapse"]');
    const searchCollapse = document.getElementById('searchCollapse');
    
    if (searchToggle && searchCollapse) {
        searchToggle.addEventListener('click', function() {
            const bsCollapse = new bootstrap.Collapse(searchCollapse);
            bsCollapse.toggle();
        });
    }

    // Add quantity button functionality in cart
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input') || this.parentElement.querySelector('span');
            let value = parseInt(input.textContent || input.value) || 1;
            
            if (this.textContent === '+') {
                value++;
            } else if (this.textContent === '-' && value > 1) {
                value--;
            }
            
            if (input.tagName === 'INPUT') {
                input.value = value;
            } else {
                input.textContent = value;
            }
        });
    });
});