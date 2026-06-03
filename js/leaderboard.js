// Leaderboard Page Interactivity

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        console.log('Leaderboard filtered by:', this.textContent);
    });
});

// Pagination
document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.textContent === '→') {
            console.log('Go to next page');
            return;
        }
        document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        console.log('Showing page:', this.textContent);
    });
});

// Set first pagination button as active
document.querySelector('.pagination-btn').classList.add('active');

// Leaderboard row hover effect
document.querySelectorAll('.rank-row').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
    });
    row.addEventListener('mouseleave', function() {
        if (this.classList.contains('top-3')) {
            this.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
        } else {
            this.style.backgroundColor = 'transparent';
        }
    });
});

console.log('Leaderboard page loaded');
