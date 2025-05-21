// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        discount: 15,
        image: "./images/carousel2.png",
        coverImage: "./images/carousel2.png",
        isNew: false,
        isSale: true
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        discount: 0,
        image: "./images/carousel1.png",
        coverImage: "./images/carousel1.png",
        isNew: true,
        isSale: false
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        discount: 10,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: false,
        isSale: true
    },
    {
        id: 4,
        name: "Fitness Tracker",
        price: 49.99,
        discount: 0,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: true,
        isSale: false
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        price: 89.99,
        discount: 20,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: false,
        isSale: true
    },
    {
        id: 6,
        name: "Smart Home Hub",
        price: 149.99,
        discount: 0,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: true,
        isSale: false
    },
    {
        id: 7,
        name: "Portable Charger",
        price: 39.99,
        discount: 5,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: false,
        isSale: true
    },
    {
        id: 8,
        name: "Wireless Mouse",
        price: 29.99,
        discount: 0,
        image: "https://via.placeholder.com/300",
        coverImage: "https://via.placeholder.com/400",
        isNew: true,
        isSale: false
    }
];

// Function to render product cards
function renderProducts(filter = 'all') {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    
    let filteredProducts = products;
    
    // Filter products based on selected filter
    if (filter !== 'all') {
        filteredProducts = products.filter(product => {
            if (filter === 'new') return product.isNew;
            if (filter === 'sale') return product.isSale;
            return true;
        });
    }
    
    filteredProducts.forEach((product, index) => {
        // Calculate discounted price if applicable
        const discountedPrice = product.discount > 0 
            ? product.price - (product.price * product.discount / 100) 
            : null;
        
        // Create product card HTML
        const productCard = document.createElement('div');
        productCard.className = 'col';
        productCard.setAttribute('data-aos', 'fade-up');
        productCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        productCard.innerHTML = `
            <div class="product-card">
                ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
                ${product.isNew ? `<div class="discount-badge" style="background-color: #3d85c6; left: 10px; right: auto;">NEW</div>` : ''}
                <div class="product-cover">
                    <img src="${product.coverImage}" alt="${product.name} cover">
                    <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                </div>
                
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        ${discountedPrice 
                            ? `$${discountedPrice.toFixed(2)} <span class="original-price">$${product.price.toFixed(2)}</span>` 
                            : `$${product.price.toFixed(2)}`
                        }
                    </div>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
    
    // Add event listeners for quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            openQuickView(productId);
        });
    });
}

// Function to open quick view modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Calculate discounted price if applicable
    const discountedPrice = product.discount > 0 
        ? product.price - (product.price * product.discount / 100) 
        : null;
    
    // Update modal content
    document.getElementById('quickViewTitle').textContent = product.name;
    document.getElementById('quickViewImage').src = product.coverImage;
    
    const priceElement = document.getElementById('quickViewPrice');
    priceElement.innerHTML = discountedPrice 
        ? `<span class="current-price">$${discountedPrice.toFixed(2)}</span> <span class="original-price">$${product.price.toFixed(2)}</span>` 
        : `<span class="current-price">$${product.price.toFixed(2)}</span>`;
    
    const badgeElement = document.getElementById('quickViewBadge');
    if (product.discount > 0) {
        badgeElement.textContent = `${product.discount}% OFF`;
        badgeElement.style.display = 'block';
    } else {
        badgeElement.style.display = 'none';
    }
    
    // Open modal
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    quickViewModal.show();
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
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function to handle product filters
function handleProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Render filtered products
            renderProducts(filter);
        });
    });
}

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

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Handle preloader
    handlePreloader();
    
    // Render products
    renderProducts();
    
    // Handle scroll animations
    handleScrollAnimations();
    
    // Handle back to top button
    handleBackToTop();
    
    // Handle product filters
    handleProductFilters();
    
    // Initialize Bootstrap carousel with auto-play
    const carousel = document.getElementById('mainCarousel');
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true
    });
    
    // Add event listeners for mobile search toggle
    const searchToggle = document.querySelector('[data-bs-target="#searchCollapse"]');
    const searchCollapse = document.getElementById('searchCollapse');
    
    if (searchToggle && searchCollapse) {
        searchToggle.addEventListener('click', function() {
            const bsCollapse = new bootstrap.Collapse(searchCollapse);
            bsCollapse.toggle();
        });
    }
    
    // Add hover animations for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
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