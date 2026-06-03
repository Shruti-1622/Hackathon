// Store page functionality

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter products
        document.querySelectorAll('.product-card').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('.product-info h3').textContent;
        const price = this.closest('.product-card').querySelector('.price').textContent;
        
        // Show feedback
        const originalText = this.textContent;
        this.textContent = '✓ Added!';
        this.style.background = 'linear-gradient(90deg, #10b981, #14b8a6)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
        
        // Log for debugging (in a real app, this would send to cart backend)
        console.log(`Added to cart: ${productName} - ${price}`);
    });
});

// Smooth scroll for Shop Now button
document.querySelector('.store-hero-btn')?.addEventListener('click', function() {
    document.querySelector('.store-products').scrollIntoView({ behavior: 'smooth' });
});

// Smooth scroll for Explore Bundle button
document.querySelector('.secondary-btn')?.addEventListener('click', function() {
    const bundleCard = document.querySelector('[data-category="bundle"]');
    bundleCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('.newsletter-input');
        const btn = this.querySelector('.primary-btn');
        
        if (input.value) {
            const originalText = btn.textContent;
            btn.textContent = '✓ Subscribed!';
            input.value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    });
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe why cards
document.querySelectorAll('.why-card').forEach(card => {
    observer.observe(card);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
