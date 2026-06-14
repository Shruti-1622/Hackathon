/* ============================================================
   hackathon-scroll.js
   Infinite-scroll hackathon cards — pause on hover, modal on click
   ============================================================ */

const HACKATHONS = window.HACKATHONS || [];

/* ── LIKED EVENTS HELPERS ── */
function getLikedEvents() {
  try {
    return JSON.parse(localStorage.getItem('hk_liked_events') || '[]');
  } catch (e) {
    return [];
  }
}

function toggleLikeEvent(id) {
  try {
    let liked = getLikedEvents();
    if (liked.includes(id)) {
      liked = liked.filter(x => x !== id);
    } else {
      liked.push(id);
    }
    localStorage.setItem('hk_liked_events', JSON.stringify(liked));
    return liked.includes(id);
  } catch (e) {
    return false;
  }
}

/* ── BUILD CARDS ── */
function buildCard(h) {
  const card = document.createElement('div');
  card.className = 'hs-card';
  card.dataset.id = h.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${h.title} — click for details`);

  const liked = getLikedEvents();
  const isLiked = liked.includes(h.id);

  card.innerHTML = `
    <img class="hs-card-img" src="${h.image}" alt="${h.title}" loading="lazy" />
    <div class="hs-card-scrim"></div>
    <button class="hs-like-btn ${isLiked ? 'liked' : ''}" data-stop aria-label="Like this hackathon">
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

  /* Like button click handler */
  const likeBtn = card.querySelector('.hs-like-btn');
  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const active = toggleLikeEvent(h.id);
    // update all clones of this card in the track
    const allButtonsForId = document.querySelectorAll(`.hs-card[data-id="${h.id}"] .hs-like-btn`);
    allButtonsForId.forEach(btn => {
      if (active) {
        btn.classList.add('liked');
      } else {
        btn.classList.remove('liked');
      }
    });
  });

  /* open modal on card click (not the register btn or like btn) */
  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop]')) return; // let register / like btn handle navigation/clicks
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

/* ── POPULATE TRACK with 3× duplication for seamless loop ── */
const track = document.getElementById('hsTrack');
const wrap  = document.getElementById('hsTrackWrap');

// Three copies so the loop never shows a gap
[...HACKATHONS, ...HACKATHONS, ...HACKATHONS].forEach(h => {
  track.appendChild(buildCard(h));
});

/* After DOM paint, set the CSS custom property for scroll distance
   = width of ONE full set of cards (1/3 of total track width) */
requestAnimationFrame(() => {
  const setW = track.scrollWidth / 3;
  track.style.setProperty('--scroll-dist', `-${setW}px`);
});

/* ── PAUSE ON HOVER ── */
wrap.addEventListener('mouseenter', () => wrap.classList.add('hs-paused'));
wrap.addEventListener('mouseleave', () => wrap.classList.remove('hs-paused'));

/* ── PAUSE ON TOUCH / FOCUS INSIDE ── */
wrap.addEventListener('touchstart', () => wrap.classList.add('hs-paused'), { passive: true });
wrap.addEventListener('touchend',   () => setTimeout(() => wrap.classList.remove('hs-paused'), 1200));

/* ── MODAL ── */
const overlay    = document.getElementById('hmOverlay');
const modal      = document.getElementById('hmModal');
const closeBtn   = document.getElementById('hmClose');
const hmImg      = document.getElementById('hmImg');
const hmCategory = document.getElementById('hmCategory');
const hmOrg      = document.getElementById('hmOrganizer');
const hmTitle    = document.getElementById('hmTitle');
const hmStats    = document.getElementById('hmStats');
const hmReg      = document.getElementById('hmRegister');

function openModal(h) {
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
  wrap.classList.add('hs-paused');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  // resume scroll only if mouse not over track
  if (!wrap.matches(':hover')) wrap.classList.remove('hs-paused');
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });