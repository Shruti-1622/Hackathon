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
      <!-- SIGN UP MODAL -->
      <div id="auth-modal-overlay" style="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);align-items:center;justify-content:center;">
        <div style="background:#0f0f1a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:2rem;width:min(420px,90vw);position:relative;box-shadow:0 0 40px rgba(0,200,255,0.08);">
          <button id="auth-modal-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#aaa;font-size:1.2rem;cursor:pointer;line-height:1;">✕</button>
          <div style="font-family:'Orbitron',sans-serif;font-size:.7rem;letter-spacing:.1em;color:#00c8ff;margin-bottom:.4rem;">NEW ACCOUNT</div>
          <div style="font-family:'Orbitron',sans-serif;font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:1.5rem;">Create Your Squad</div>
          <form id="auth-signup-form" autocomplete="off">
            <div style="margin-bottom:1rem;">
              <label style="display:block;font-size:.75rem;color:#aaa;margin-bottom:.4rem;font-family:'JetBrains Mono',monospace;">Name</label>
              <input id="auth-name" type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:.7rem 1rem;color:#fff;font-size:.9rem;outline:none;">
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block;font-size:.75rem;color:#aaa;margin-bottom:.4rem;font-family:'JetBrains Mono',monospace;">Email</label>
              <input id="auth-email" type="email" placeholder="you@example.com" style="width:100%;box-sizing:border-box;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:.7rem 1rem;color:#fff;font-size:.9rem;outline:none;">
            </div>
            <div style="margin-bottom:1.5rem;">
              <label style="display:block;font-size:.75rem;color:#aaa;margin-bottom:.4rem;font-family:'JetBrains Mono',monospace;">Password</label>
              <input id="auth-password" type="password" placeholder="••••••••" style="width:100%;box-sizing:border-box;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:.7rem 1rem;color:#fff;font-size:.9rem;outline:none;">
            </div>
            <button type="submit" style="width:100%;padding:.8rem;background:linear-gradient(135deg,#00c8ff,#0077ff);border:none;border-radius:8px;color:#000;font-family:'Orbitron',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.06em;cursor:pointer;">CREATE ACCOUNT →</button>
          </form>
        </div>
      </div>

      <!-- LOGIN REQUIRED MODAL -->
      <div id="auth-gate-overlay" style="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);align-items:center;justify-content:center;">
        <div style="background:#0f0f1a;border:1px solid rgba(255,100,100,0.2);border-radius:16px;padding:2rem;width:min(380px,90vw);position:relative;box-shadow:0 0 40px rgba(255,100,100,0.06);text-align:center;">
          <button id="auth-gate-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#aaa;font-size:1.2rem;cursor:pointer;line-height:1;">✕</button>
          <div style="font-size:2rem;margin-bottom:.8rem;">🔒</div>
          <div style="font-family:'Orbitron',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.5rem;">Login Required</div>
          <p style="color:#aaa;font-size:.85rem;line-height:1.6;margin-bottom:1.5rem;">Please sign in to continue.<br>You need an account to perform this action.</p>
          <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
            <button id="auth-gate-login" style="padding:.65rem 1.4rem;background:linear-gradient(135deg,#00c8ff,#0077ff);border:none;border-radius:8px;color:#000;font-family:'Orbitron',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.06em;cursor:pointer;">Login</button>
            <button id="auth-gate-signup" style="padding:.65rem 1.4rem;background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.06em;cursor:pointer;">Sign Up</button>
            <button id="auth-gate-cancel" style="padding:.65rem 1.4rem;background:transparent;border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#777;font-family:'Orbitron',sans-serif;font-size:.7rem;cursor:pointer;">Cancel</button>
          </div>
        </div>
      </div>

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
          <a href="#" id="auth-dd-profile">
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
    const wrap      = document.getElementById('auth-profile-wrap');
    if (signupBtn && wrap) {
      signupBtn.parentNode.insertBefore(wrap, signupBtn.nextSibling);
    }
  }

  /* ── SHOW / HIDE MODALS ── */
  function showSignUp() {
    document.getElementById('auth-modal-overlay').style.display = 'flex';
  }

  function hideSignUp() {
    document.getElementById('auth-modal-overlay').style.display = 'none';
  }

  function showLoginRequired() {
    document.getElementById('auth-gate-overlay').style.display = 'flex';
  }

  function hideLoginRequired() {
    document.getElementById('auth-gate-overlay').style.display = 'none';
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
    var signupBtn  = document.getElementById('auth-signup-btn');
    var profileWrap = document.getElementById('auth-profile-wrap');

    // Always keep the old extra buttons hidden (they live in HTML but are not used)
    ['auth-dashboard-btn','auth-profile-btn','auth-logout-btn'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    if (!signupBtn) return;

    if (isLoggedIn()) {
      signupBtn.style.display = 'none';
      if (profileWrap) profileWrap.style.display = 'flex';
    } else {
      signupBtn.style.display = '';
      if (profileWrap) profileWrap.style.display = 'none';
      closeDrop();
    }
  }

  /* ── LOGOUT ── */
  function logout() {
    localStorage.removeItem('isLoggedIn');
    closeDrop();
    updateNav();
  }

  /* ── BIND EVENTS ── */
  function bindEvents() {
    // Sign Up modal — close
    document.getElementById('auth-modal-close')
      ?.addEventListener('click', hideSignUp);
    document.getElementById('auth-modal-overlay')
      ?.addEventListener('click', function (e) {
        if (e.target === this) hideSignUp();
      });

    // Sign Up form — submit
    document.getElementById('auth-signup-form')
      ?.addEventListener('submit', function (e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        hideSignUp();
        updateNav();
      });

    // Login Required modal — buttons
    document.getElementById('auth-gate-close')
      ?.addEventListener('click', hideLoginRequired);
    document.getElementById('auth-gate-cancel')
      ?.addEventListener('click', hideLoginRequired);
    document.getElementById('auth-gate-overlay')
      ?.addEventListener('click', function (e) {
        if (e.target === this) hideLoginRequired();
      });
    document.getElementById('auth-gate-login')
      ?.addEventListener('click', function () {
        hideLoginRequired();
        showSignUp();
      });
    document.getElementById('auth-gate-signup')
      ?.addEventListener('click', function () {
        hideLoginRequired();
        showSignUp();
      });

    // Escape closes everything
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        hideSignUp();
        hideLoginRequired();
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

    // Dropdown — Profile link (no-op for now, just closes)
    document.getElementById('auth-dd-profile')
      ?.addEventListener('click', function (e) {
        e.preventDefault();
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
  window.Auth = { requireLogin, showSignUp, showLoginRequired, isLoggedIn };

})();
