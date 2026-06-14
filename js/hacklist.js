/* ============================================================
   HACKLIST.JS
   Dynamic list rendering, unliking, and detail modal logic
   ============================================================ */

(function () {
  const HACKATHONS = window.HACKATHONS || [];
  const grid = document.getElementById('hacklistGrid');

  /* ── LIKED EVENTS HELPERS ── */
  function getLikedEvents() {
    try {
      return JSON.parse(localStorage.getItem('hk_liked_events') || '[]');
    } catch (e) {
      return [];
    }
  }

  function unlikeEvent(id) {
    try {
      let liked = getLikedEvents();
      liked = liked.filter(x => x !== id);
      localStorage.setItem('hk_liked_events', JSON.stringify(liked));
    } catch (e) {}
  }

  /* ── RENDER EMPTY STATE ── */
  function renderEmptyState() {
    grid.innerHTML = `
      <div class="hacklist-empty">
        <div class="hacklist-empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h3>No saved hackathons yet</h3>
        <p>Explore the list of upcoming hackathons and click the heart icon to save them here for quick access.</p>
        <a href="hackathon.html" class="browse-btn">Explore Hackathons →</a>
      </div>
    `;
  }

  /* ── BUILD CARD FOR GRID ── */
  function buildCard(h) {
    const card = document.createElement('div');
    card.className = 'hs-card';
    card.dataset.id = h.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${h.title} — click for details`);

    card.innerHTML = `
      <img class="hs-card-img" src="${h.image}" alt="${h.title}" loading="lazy" />
      <div class="hs-card-scrim"></div>
      <button class="hs-like-btn liked" data-stop aria-label="Unlike this hackathon">
        <svg class="hs-like-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <span class="hs-card-cat">${h.category}</span>
      <div class="hs-card-body">
        <span class="hs-card-organizer">${h.organizer}</span>
        <h3 class="hs-card-name">${h.title}</h3>
        <div class="hs-card-meta">
          <span>📅 ${h.month} ${h.day}</span>
          <span>📍 ${h.location}</span>
        </div>
        <a class="hs-card-btn" href="${h.link}" target="_blank" rel="noopener"
           data-stop data-register-link>Register</a>
      </div>
    `;

    /* Register button — require login before navigating */
    const registerBtn = card.querySelector('[data-register-link]');
    registerBtn.addEventListener('click', function (e) {
      if (window.Auth && !window.Auth.isLoggedIn()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.Auth.showLoginRequired();
      }
    }, true);

    /* Click heart icon: remove from liked, animate fade, and remove element */
    const likeBtn = card.querySelector('.hs-like-btn');
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unlikeEvent(h.id);
      
      // Animate card removal
      card.classList.add('fade-out');
      card.addEventListener('animationend', () => {
        card.remove();
        // Check if list is empty
        const likedIDs = getLikedEvents();
        if (likedIDs.length === 0) {
          renderEmptyState();
        }
      });
    });

    /* Click card: open modal */
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-stop]')) return;
      openModal(h);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('[data-stop]')) return;
        openModal(h);
      }
    });

    return card;
  }

  /* ── INITIAL RENDER ── */
  function renderList() {
    if (!grid) return;
    grid.innerHTML = '';
    
    const likedIDs = getLikedEvents();
    const likedEvents = HACKATHONS.filter(h => likedIDs.includes(h.id));

    if (likedEvents.length === 0) {
      renderEmptyState();
    } else {
      likedEvents.forEach(h => {
        grid.appendChild(buildCard(h));
      });
    }
  }

  /* ── MODAL LOGIC ── */
  const overlay    = document.getElementById('hmOverlay');
  const closeBtn   = document.getElementById('hmClose');
  const hmImg      = document.getElementById('hmImg');
  const hmCategory = document.getElementById('hmCategory');
  const hmOrg      = document.getElementById('hmOrganizer');
  const hmTitle    = document.getElementById('hmTitle');
  const hmStats    = document.getElementById('hmStats');
  const hmReg      = document.getElementById('hmRegister');

  function openModal(h) {
    if (!overlay) return;
    hmImg.src        = h.image;
    hmImg.alt        = h.title;
    hmCategory.textContent = h.category;
    hmOrg.textContent      = h.organizer;
    hmTitle.textContent    = h.title;
    hmReg.href = h.link;

    /* Gate: intercept Register Now click if not logged in */
    hmReg.onclick = function (e) {
      if (window.Auth && !window.Auth.isLoggedIn()) {
        e.preventDefault();
        window.Auth.showLoginRequired();
      }
    };

    hmStats.innerHTML = `
      <div class="hm-stat">
        <span class="hm-stat-icon">🏆</span>
        <span class="hm-stat-val">${h.prize}</span>
        <span class="hm-stat-lbl">Prize Pool</span>
      </div>
      <div class="hm-stat">
        <span class="hm-stat-icon">⏱</span>
        <span class="hm-stat-val">${h.duration}</span>
        <span class="hm-stat-lbl">Duration</span>
      </div>
      <div class="hm-stat">
        <span class="hm-stat-icon">📅</span>
        <span class="hm-stat-val">${h.month} ${h.day}</span>
        <span class="hm-stat-lbl">Date</span>
      </div>
      <div class="hm-stat">
        <span class="hm-stat-icon">📍</span>
        <span class="hm-stat-val">${h.location}</span>
        <span class="hm-stat-lbl">Location</span>
      </div>
      <div class="hm-stat">
        <span class="hm-stat-icon">🏷</span>
        <span class="hm-stat-val">${h.category}</span>
        <span class="hm-stat-lbl">Category</span>
      </div>
      <div class="hm-stat">
        <span class="hm-stat-icon">🏢</span>
        <span class="hm-stat-val">${h.organizer}</span>
        <span class="hm-stat-lbl">Organiser</span>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Init page
  document.addEventListener('DOMContentLoaded', renderList);

})();
