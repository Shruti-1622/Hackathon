// Gallery Page Interactivity

// Gallery image click handler
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        const desc = this.querySelector('p').textContent;
        console.log(`Clicked: ${title} - ${desc}`);
        // Modal or lightbox could be opened here
    });
});

// Smooth animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.6s ease';
    observer.observe(item);
});

// Submit photos button
document.querySelector('.primary-btn')?.addEventListener('click', function() {
    alert('Photo submission form coming soon!');
});

console.log('Gallery page loaded');
