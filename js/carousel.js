/* ============================================================
   hackathon-scroll.js
   Infinite-scroll hackathon cards — pause on hover, modal on click
   ============================================================ */

const HACKATHONS = [
  {
    id: 1,
    title: "AI FOR IMPACT",
    organizer: "Google",
    category: "AI",
    location: "Bangalore",
    duration: "48 Hours",
    prize: "₹5,00,000",
    month: "July",
    day: "18",
    image: "assets/hackathon events/googleh.png",
    link: "https://devfolio.co"
  },
  {
    id: 2,
    title: "VIBEATHON",
    organizer: "ISRO",
    category: "Space",
    location: "Hyderabad",
    duration: "36 Hours",
    prize: "₹3,00,000",
    month: "July",
    day: "02",
    image: "assets/hackathon events/red.png",
    link: "https://unstop.com"
  },
  {
    id: 3,
    title: "DEVFUSION 2026",
    organizer: "Devfolio",
    category: "Web",
    location: "Mumbai",
    duration: "72 Hours",
    prize: "₹7,50,000",
    month: "Aug",
    day: "14",
    image: "assets/hackathon events/blue.jpg",
    link: "https://devpost.com"
  },
  {
    id: 4,
    title: "CLOUDFEST",
    organizer: "Microsoft",
    category: "Cloud",
    location: "Pune",
    duration: "24 Hours",
    prize: "₹2,00,000",
    month: "Sept",
    day: "05",
    image: "assets/hackathon events/cloudf.jpg",
    link: "https://unstop.com"
  },
  {
    id: 5,
    title: "WEB3 BUILDATHON",
    organizer: "Polygon",
    category: "Web3",
    location: "Delhi",
    duration: "72 Hours",
    prize: "₹10,00,000",
    month: "Oct",
    day: "02",
    image: "assets/hackathon events/ethokyo.png",
    link: "https://ethglobal.com"
  },
  {
    id: 6,
    title: "ENIGMA",
    organizer: "IIT (BHU)",
    category: "ML",
    location: "Delhi",
    duration: "60 Hours",
    prize: "₹50,000",
    month: "Oct",
    day: "02",
    image: "assets/hackathon events/en.jpeg",
    link: "https://ethglobal.com"
  },
  {
    id: 7,
    title: "MIDNIGHT CODEFEST",
    organizer: "GitHub",
    category: "Web",
    location: "Hyderabad",
    duration: "36 Hours",
    prize: "₹3,50,000",
    month: "Nov",
    day: "05",
    image: "assets/hackathon events/github.png",
    link: "https://github.com"
  },
  {
    id: 8,
    title: "CYBER NEXUS",
    organizer: "Cisco",
    category: "Cybersecurity",
    location: "Bangalore",
    duration: "48 Hours",
    prize: "₹6,00,000",
    month: "Nov",
    day: "09",
    image: "assets/hackathon events/cisco.jpeg",
    link: "https://www.cisco.com"
  },
  {
    id: 9,
    title: "NEURALVERSE AI",
    organizer: "NVIDIA",
    category: "AI",
    location: "Mumbai",
    duration: "72 Hours",
    prize: "₹8,00,000",
    month: "Dec",
    day: "30",
    image: "assets/hackathon events/nvidia.png",
    link: "https://www.nvidia.com"
  }
];

/* ── BUILD CARDS ── */
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
    <span class="hs-card-cat">${h.category}</span>
    <div class="hs-card-body">
      <span class="hs-card-organizer">${h.organizer}</span>
      <h3 class="hs-card-name">${h.title}</h3>
      <div class="hs-card-meta">
        <span>📅 ${h.month} ${h.day}</span>
        <span>📍 ${h.location}</span>
      </div>
      <a class="hs-card-btn" href="${h.link}" target="_blank" rel="noopener"
         data-stop>Register</a>
    </div>
  `;

  /* open modal on card click (not the register btn) */
  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop]')) return; // let register btn navigate
    openModal(h);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openModal(h);
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
  hmReg.href             = h.link;

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