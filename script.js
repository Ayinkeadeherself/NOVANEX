// Sample product data
const products = {
    latest: [
        {
            id: 1,
            name: "SonicPods Lite",
            price: 129,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&auto=format"
        },
        {
            id: 2,
            name: "NOVA Headphones X",
            price: 179,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format"
        },
        {
            id: 3,
            name: "Nova 7S+",
            price: 149,
            image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&auto=format"
        },
        {
            id: 4,
            name: "Nova E370",
            price: 199,
            image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=400&auto=format"
        },
        {
            id: 5,
            name: "Nova Headphone Lite",
            price: 89,
            image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format"
        },
        {
            id: 6,
            name: "Nova Bold 3",
            price: 29,
            image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format"
        }
    ],
    featured: [
        {
            id: 7,
            name: "SonicPods Pro",
            price: 199,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format"
        },
        {
            id: 8,
            name: "NOVA EliteBook Pro",
            price: 249,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format"
        },
        {
            id: 9,
            name: "Wireless Speaker Max",
            price: 199,
            image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&auto=format"
        },
        {
            id: 10,
            name: "Smart Watch Pro",
            price: 299,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format"
        },
        {
            id: 11,
            name: "Noise Cancelling Headphones",
            price: 179,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format"
        },
        {
            id: 12,
            name: "Nova Headphones Lite",
            price: 49,
            image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format"
        }
    ]
};

// Testimonials data
const testimonials = [
    {
        name: "Alex Johnson",
        text: "The best earbuds I've ever used! The noise cancellation is incredible.",
        rating: 5
    },
    {
        name: "Sarah Miller",
        text: "Amazing sound quality and the battery lasts forever. Worth every penny!",
        rating: 5
    },
    {
        name: "Michael Chen",
        text: "Comfortable fit even during long sessions. The perfect companion for my workouts.",
        rating: 4
    }
];

// Cart functionality
let cart = [];


// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.querySelector('.cart-count');
const latestProductsGrid = document.querySelector('#latest .products-grid');
const featuredProductsGrid = document.querySelector('#featured .products-grid');
const testimonialGrid = document.querySelector('.testimonial-grid');
const cartIcon = document.querySelector('.cart-icon');




// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderTestimonials();
    setupEventListeners();
    startCountdown();
});

// Render products
function renderProducts() {
    // Latest products
    products.latest.forEach(product => {
        latestProductsGrid.appendChild(createProductCard(product));
    });

    // Featured products
    products.featured.forEach(product => {
        featuredProductsGrid.appendChild(createProductCard(product));
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Render testimonials
function renderTestimonials() {
    testimonials.forEach(testimonial => {
        testimonialGrid.appendChild(createTestimonialCard(testimonial));
    });
}

// Create testimonial card HTML
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    let stars = '';
    for (let i = 0; i < testimonial.rating; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    card.innerHTML = `
        <div class="rating">
            ${stars}
        </div>
        <p>"${testimonial.text}"</p>
        <h4>- ${testimonial.name}</h4>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = [...products.latest, ...products.featured].find(p => p.id === productId);
            addToCart(product);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        // In a real implementation, this would open a cart modal/sidebar
        alert(`${cart.length} items in cart`);
    });
}

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCounter();
    showAddToCartFeedback();
}

// Update cart counter
function updateCartCounter() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show feedback when adding to cart
function showAddToCartFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = 'Added to cart!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// === COUNTDOWN TIMER ===
function updateCountdown() {
    const launchDate = new Date('2025-06-05').getTime();
    const now = new Date().getTime();
    const diff = launchDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 60000);

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// === INTERACTIVE ELEMENTS ===
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });