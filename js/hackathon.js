// Hackathon Page Interactivity

let allHackathons = [];
let currentFilter = 'all';

// Category mapping for filter pills
const categoryMap = {
    'AI & ML': 'ai',
    'Web3': 'web3',
    'Mobile': 'web',
    'Cloud': 'cloud',
    'IoT': 'space',
    'All Events': 'all'
};

// Load and display hackathons from JSON
const eventList = document.querySelector('.event-list');

fetch('./data/hackathon.json')
    .then(response => response.json())
    .then(data => {
        allHackathons = data;
        
        data.forEach(hackathon => {
            eventList.innerHTML += `
            <article class="event-row" data-category="${hackathon.category}">
                <div class="event-content">
                    <span class="event-date">
                        ${hackathon.date}
                    </span>
                    <h3>
                        ${hackathon.title}
                    </h3>
                    <p>
                        ${hackathon.location} • ${hackathon.duration} • ${hackathon.prize}
                    </p>
                    <a href="${hackathon.link}" target="_blank">
                        Register →
                    </a>
                </div>
                <div class="event-image">
                    <img src="${hackathon.image}" alt="${hackathon.title}">
                </div>
            </article>
            `;
        });
        
        // Setup filter and search listeners after cards are loaded
        setupFiltersAndSearch();
    })
    .catch(error => {
        console.log(error);
    });

function setupFiltersAndSearch() {
    // Filter pills functionality
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            const pillText = this.textContent.trim();
            currentFilter = categoryMap[pillText] || 'all';
            
            // Apply filters and search together
            applyFiltersAndSearch();
        });
    });

    // Search functionality with visual feedback
    const searchInput = document.querySelector('.search-input');
    const featuredSection = document.querySelector('.featured-section');
    
    searchInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.2)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', function() {
        applyFiltersAndSearch();
    });

    // Register button interaction
    document.querySelectorAll('.register-btn, .register-btn-small').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Registration feature coming soon!');
        });
    });
}

function applyFiltersAndSearch() {
    const searchText = document.querySelector('.search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.event-row');
    const featuredSection = document.querySelector('.featured-section');
    let visibleCount = 0;
    
    // Hide featured section when user starts typing
    if (searchText) {
        featuredSection.style.display = 'none';
        featuredSection.style.opacity = '0';
    } else {
        featuredSection.style.display = 'block';
        featuredSection.style.opacity = '1';
    }
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const location = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        
        // Check if card matches search
        const matchesSearch = !searchText || title.includes(searchText) || location.includes(searchText);
        
        // Check if card matches filter
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // Visual feedback for search results
    const searchIcon = document.querySelector('.search-icon');
    if (visibleCount === 0 && searchText) {
        searchIcon.textContent = '✗';
        searchIcon.style.color = '#ef4444';
    } else if (searchText) {
        searchIcon.textContent = '✓';
        searchIcon.style.color = '#10b981';
        setTimeout(() => {
            if (document.querySelector('.search-input').value.toLowerCase() === searchText) {
                searchIcon.textContent = '🔍';
                searchIcon.style.color = 'inherit';
            }
        }, 1500);
    } else {
        searchIcon.textContent = '🔍';
        searchIcon.style.color = 'inherit';
    }
}




console.log('Hackathon page loaded');
