/* ==============================================
   AUTH.JS — Simple localStorage auth system
   Drop this <script> on every page (before </body>)
   ============================================== */

(function () {

  /* ── HELPERS ── */
  function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  /* ── INJECT MODALS + PROFILE AVATAR ── */
  function injectUI() {
    const html = `
      <!-- PROFILE AVATAR + DROPDOWN (injected next to sign-up btn) -->
      <div id="auth-profile-wrap" style="display:none;position:relative;">

        <!-- Circular avatar button -->
        <button id="auth-avatar-btn" aria-label="Profile menu" style="
          width:38px; height:38px;
          border-radius:50%;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
          border: 1.5px solid #c9a84c;
          box-shadow: 0 0 10px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.08);
          cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition: box-shadow 0.2s, border-color 0.2s;
          flex-shrink:0;
          padding:0;
          outline:none;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </button>

        <!-- Dropdown -->
        <div id="auth-dropdown" style="
          display:none;
          position:absolute;
          top:calc(100% + 12px);
          right:0;
          min-width:180px;
          background: linear-gradient(135deg, rgba(217,164,65,0.13) 0%, rgba(217,164,65,0.06) 100%);
          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(217,164,65,0.3);
          border-radius:16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(217,164,65,0.08), inset 0 1px 0 rgba(217,164,65,0.15);
          overflow:hidden;
          z-index:8999;
          animation: auth-drop-in 0.18s cubic-bezier(0.22,1,0.36,1);
        ">
          <style>
            @keyframes auth-drop-in {
              from { opacity:0; transform:translateY(-8px) scale(0.97); }
              to   { opacity:1; transform:translateY(0) scale(1); }
            }
            #auth-avatar-btn:hover {
              box-shadow: 0 0 18px rgba(217,164,65,0.45), 0 0 0 1px rgba(217,164,65,0.2) !important;
              border-color: #e8b84b !important;
            }
            #auth-dropdown a,
            #auth-dropdown button {
              display:flex !important;
              align-items:center !important;
              gap:.7rem !important;
              width:100% !important;
              padding:.8rem 1.2rem !important;
              background:none !important;
              border:none !important;
              border-radius:0 !important;
              color:rgba(217,164,65,0.9) !important;
              font-family:'Syne', sans-serif !important;
              font-size:.83rem !important;
              font-weight:600 !important;
              letter-spacing:.02em !important;
              text-decoration:none !important;
              cursor:pointer !important;
              transition: background 0.15s, color 0.15s, padding-left 0.15s !important;
              text-align:left !important;
              box-sizing:border-box !important;
            }
            #auth-dropdown a:hover,
            #auth-dropdown button:hover {
              background: rgba(217,164,65,0.12) !important;
              color:#fff !important;
              padding-left:1.5rem !important;
            }
            #auth-dropdown .auth-dd-divider {
              height:1px;
              background: linear-gradient(90deg, transparent, rgba(217,164,65,0.25), transparent);
              margin:0 !important;
            }
            #auth-dropdown .auth-dd-logout {
              color:rgba(248,113,113,0.85) !important;
            }
            #auth-dropdown .auth-dd-logout:hover {
              background:rgba(248,113,113,0.1) !important;
              color:#fca5a5 !important;
            }
          </style>
          <a href="profile.html" id="auth-dd-profile">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            Profile
          </a>
          <div class="auth-dd-divider"></div>
          <button id="auth-dd-logout" class="auth-dd-logout">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ── MOVE PROFILE WRAP INTO NAV (next to sign-up btn) ── */
  function mountProfileInNav() {
    const signupBtn = document.getElementById('auth-signup-btn');
    const wrap = document.getElementById('auth-profile-wrap');
    if (signupBtn && wrap) {
      signupBtn.parentNode.insertBefore(wrap, signupBtn.nextSibling);
    }
  }

  /* ── SHOW / HIDE MODALS ── */
  function showSignUp() {
    window.location.href = 'signup.html?mode=signup&redirect=' + encodeURIComponent(window.location.href);
  }

  function hideSignUp() {
    // modal overlay is deprecated, redirect handles it
  }

  function showLoginRequired() {
    window.location.href = 'signup.html?mode=login&redirect=' + encodeURIComponent(window.location.href);
  }

  function hideLoginRequired() {
    // modal overlay is deprecated, redirect handles it
  }

  /* ── DROPDOWN TOGGLE ── */
  var _dropOpen = false;

  function openDrop() {
    document.getElementById('auth-dropdown').style.display = 'block';
    _dropOpen = true;
  }

  function closeDrop() {
    document.getElementById('auth-dropdown').style.display = 'none';
    _dropOpen = false;
  }

  /* ── UPDATE NAV ── */
  function updateNav() {
    var signupBtn = document.getElementById('auth-signup-btn');
    var profileWrap = document.getElementById('auth-profile-wrap');

    // Always keep the old extra buttons hidden (they live in HTML but are not used)
    ['auth-dashboard-btn', 'auth-profile-btn', 'auth-logout-btn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    if (!signupBtn) return;

    if (isLoggedIn()) {
      signupBtn.style.display = 'none';
      if (profileWrap) profileWrap.style.display = 'flex';

      // Load profile info and set avatar button image/initials
      var avatarBtn = document.getElementById('auth-avatar-btn');
      if (avatarBtn) {
        var savedProfile = null;
        try {
          var saved = localStorage.getItem('hk_profile');
          if (saved) savedProfile = JSON.parse(saved);
        } catch (e) {}

        var avatarUrl = '';
        var initials = '';
        if (savedProfile) {
          if (savedProfile.avatar) avatarUrl = savedProfile.avatar;
          if (savedProfile.name) {
            initials = savedProfile.name.split(' ').map(function(w) { return w[0] || ''; }).join('').toUpperCase().slice(0, 2);
          }
        }

        if (avatarUrl) {
          avatarBtn.innerHTML = '<img src="' + avatarUrl + '" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;">';
        } else if (initials) {
          avatarBtn.innerHTML = '<span style="color:#c9a84c;font-family:\'Syne\',sans-serif;font-size:0.85rem;font-weight:700;">' + initials + '</span>';
        } else {
          avatarBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
        }
      }
    } else {
      signupBtn.style.display = 'inline-flex';
      if (profileWrap) profileWrap.style.display = 'none';
      closeDrop();
    }
    document.body.classList.add('auth-ready');
  }
  document.body.style.visibility = 'visible';

  /* ── LOGOUT ── */
  function logout() {
    localStorage.removeItem('isLoggedIn');
    closeDrop();
    updateNav();
  }

  /* ── BIND EVENTS ── */
  function bindEvents() {
    // Global click interceptor for registration gating
    document.addEventListener('click', function (e) {
      var target = e.target.closest('.event-card, .feat-register-btn, .event-register-btn, .register-btn, .hm-register');
      if (target) {
        if (!isLoggedIn()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showLoginRequired();
        }
      }
    }, true);

    // Escape closes dropdown
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrop();
      }
    });

    // Sign Up nav button
    document.getElementById('auth-signup-btn')
      ?.addEventListener('click', function (e) {
        e.preventDefault();
        showSignUp();
      });

    // Avatar button — toggle dropdown
    document.getElementById('auth-avatar-btn')
      ?.addEventListener('click', function (e) {
        e.stopPropagation();
        _dropOpen ? closeDrop() : openDrop();
      });

    // Dropdown — Profile link
    document.getElementById('auth-dd-profile')
      ?.addEventListener('click', function (e) {
        closeDrop();
      });

    // Dropdown — Logout
    document.getElementById('auth-dd-logout')
      ?.addEventListener('click', function () {
        logout();
      });

    // Click outside closes dropdown
    document.addEventListener('click', function (e) {
      var wrap = document.getElementById('auth-profile-wrap');
      if (wrap && !wrap.contains(e.target)) {
        closeDrop();
      }
    });
  }

  /* ── PUBLIC GATE FUNCTION ── */
  function requireLogin() {
    if (isLoggedIn()) return true;
    showLoginRequired();
    return false;
  }

  /* ── INIT ── */
  function init() {
    injectUI();
    mountProfileInNav();
    bindEvents();
    updateNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── PUBLIC API ── */
  window.Auth = { requireLogin, showSignUp, showLoginRequired, isLoggedIn, updateNav };

})();
