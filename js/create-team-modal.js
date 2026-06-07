/* ==============================================
   CREATE TEAM MODAL — create-team-modal.js
   Drop this <script> AFTER teamfinder.js
   ============================================== */

(function () {

  /* ── HACKATHON OPTIONS (extend freely) ── */
  const HACKATHONS = [
    'HackIndia 2026',
    'BharatHacks 2026',
    'GreenCode Jam',
    'ETHIndia 2026',
    'AWS Build-On India',
    'GenAI Hackathon',
    'Smart India Hackathon',
    'MLH Global Hack Week',
    'DevFolio Hacks',
    'Other',
  ];

  const EXPERIENCE_LEVELS = [
    'Beginner Friendly',
    'All Levels',
    'Intermediate',
    'Advanced',
  ];

  /* ── STATE ── */
  let roles  = [];   // [{ n: string }]
  let stack  = [];   // [string]

  /* ── INJECT HTML ── */
  function injectModal() {
    const hackOptions = HACKATHONS
      .map(h => `<option value="${h}">${h}</option>`)
      .join('');

    const expOptions = EXPERIENCE_LEVELS
      .map(e => `<option value="${e}">${e}</option>`)
      .join('');

    const html = `
      <!-- CREATE TEAM OVERLAY -->
      <div class="ctm-overlay" id="ctm-overlay">
        <div class="ctm-modal" id="ctm-modal" role="dialog" aria-modal="true" aria-labelledby="ctm-title-el">

          <!-- Header -->
          <div class="ctm-header">
            <div class="ctm-header-left">
              <span class="ctm-eyebrow">New Team</span>
              <span class="ctm-title" id="ctm-title-el">Create Your Squad</span>
            </div>
            <button class="ctm-close" id="ctm-close-btn" aria-label="Close">✕</button>
          </div>

          <!-- Form body -->
          <div class="ctm-body" id="ctm-form-body">

            <!-- Team basics -->
            <div class="ctm-section-label">Team Info</div>

            <div class="ctm-row">
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-team-name">Team Name *</label>
                <input class="ctm-input" id="ctm-team-name" type="text" placeholder="e.g. Alpha Builders" maxlength="40" autocomplete="off">
              </div>
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-hackathon">Hackathon *</label>
                <select class="ctm-select" id="ctm-hackathon">
                  <option value="" disabled selected>Choose one</option>
                  ${hackOptions}
                </select>
              </div>
            </div>

            <div class="ctm-field full">
              <label class="ctm-label" for="ctm-theme">Theme / Focus Area *</label>
              <input class="ctm-input" id="ctm-theme" type="text" placeholder="e.g. AI for Healthcare" maxlength="60" autocomplete="off">
            </div>

            <div class="ctm-field full">
              <label class="ctm-label" for="ctm-desc">About the Team *</label>
              <textarea class="ctm-textarea" id="ctm-desc" placeholder="What are you building? What problem does it solve?" maxlength="280"></textarea>
            </div>

            <div class="ctm-section-divider"></div>

            <!-- Team size & level -->
            <div class="ctm-section-label">Capacity</div>

            <div class="ctm-row">
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-spots">Max Team Size *</label>
                <input class="ctm-input" id="ctm-spots" type="number" min="2" max="12" placeholder="e.g. 5">
              </div>
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-exp">Experience Level</label>
                <select class="ctm-select" id="ctm-exp">
                  <option value="" disabled selected>Choose</option>
                  ${expOptions}
                </select>
              </div>
            </div>

            <div class="ctm-row">
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-deadline">Application Deadline</label>
                <input class="ctm-input" id="ctm-deadline" type="date">
              </div>
              <div class="ctm-field">
                <label class="ctm-label" for="ctm-lead">Your Name *</label>
                <input class="ctm-input" id="ctm-lead" type="text" placeholder="Team lead name" maxlength="40" autocomplete="off">
              </div>
            </div>

            <div class="ctm-section-divider"></div>

            <!-- Roles needed -->
            <div class="ctm-section-label">Roles Needed</div>

            <div class="ctm-field full">
              <label class="ctm-label">Add roles you're looking for</label>
              <div class="ctm-roles-list" id="ctm-roles-list"></div>
              <div class="ctm-role-input-row">
                <input class="ctm-input" id="ctm-role-input" type="text" placeholder="e.g. UI Designer" maxlength="40" autocomplete="off">
                <button class="ctm-add-role-btn" id="ctm-add-role-btn" type="button">+ Add</button>
              </div>
            </div>

            <div class="ctm-section-divider"></div>

            <!-- Tech stack -->
            <div class="ctm-section-label">Tech Stack</div>

            <div class="ctm-field full">
              <label class="ctm-label">Add technologies</label>
              <div class="ctm-stack-list" id="ctm-stack-list"></div>
              <div class="ctm-role-input-row">
                <input class="ctm-input" id="ctm-stack-input" type="text" placeholder="e.g. React, Python..." maxlength="30" autocomplete="off">
                <button class="ctm-add-role-btn" id="ctm-add-stack-btn" type="button">+ Add</button>
              </div>
            </div>

          </div><!-- /ctm-form-body -->

          <!-- Success state (hidden) -->
          <div class="ctm-success" id="ctm-success">
            <div class="ctm-success-icon">✓</div>
            <div class="ctm-success-title">Team Created!</div>
            <div class="ctm-success-sub">Your team is now live. Scroll down to see it in the grid.</div>
          </div>

          <!-- Footer -->
          <div class="ctm-footer" id="ctm-footer">
            <span class="ctm-hint">* required fields</span>
            <button class="ctm-submit-btn" id="ctm-submit-btn" type="button">Launch Team →</button>
          </div>

        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ── RENDER ROLE TAGS ── */
  function renderRoles() {
    const list = document.getElementById('ctm-roles-list');
    if (!list) return;
    list.innerHTML = roles.map((r, i) => `
      <span class="ctm-role-tag">
        ${r.n}
        <button type="button" aria-label="Remove" onclick="CreateTeamModal._removeRole(${i})">✕</button>
      </span>`).join('');
  }

  /* ── RENDER STACK TAGS ── */
  function renderStack() {
    const list = document.getElementById('ctm-stack-list');
    if (!list) return;
    list.innerHTML = stack.map((s, i) => `
      <span class="ctm-stack-tag">
        ${s}
        <button type="button" aria-label="Remove" onclick="CreateTeamModal._removeStack(${i})">✕</button>
      </span>`).join('');
  }

  /* ── ADD / REMOVE ROLE ── */
  function addRole() {
    const input = document.getElementById('ctm-role-input');
    const val   = (input.value || '').trim();
    if (!val) return;
    roles.push({ n: val });
    input.value = '';
    input.focus();
    renderRoles();
  }

  function removeRole(i) {
    roles.splice(i, 1);
    renderRoles();
  }

  /* ── ADD / REMOVE STACK ── */
  function addStack() {
    const input = document.getElementById('ctm-stack-input');
    const val   = (input.value || '').trim();
    if (!val) return;
    stack.push(val);
    input.value = '';
    input.focus();
    renderStack();
  }

  function removeStack(i) {
    stack.splice(i, 1);
    renderStack();
  }

  /* ── OPEN / CLOSE ── */
  function open() {
    // Reset state
    roles = [];
    stack = [];
    renderRoles();
    renderStack();

    // Reset form fields
    ['ctm-team-name','ctm-theme','ctm-desc','ctm-lead',
     'ctm-role-input','ctm-stack-input','ctm-spots','ctm-deadline']
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    ['ctm-hackathon','ctm-exp'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.selectedIndex = 0;
    });

    // Hide success, show form
    const formBody = document.getElementById('ctm-form-body');
    const success  = document.getElementById('ctm-success');
    const footer   = document.getElementById('ctm-footer');
    if (formBody) formBody.style.display = '';
    if (success)  success.classList.remove('show');
    if (footer)   footer.style.display   = '';

    document.getElementById('ctm-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('ctm-team-name')?.focus(), 80);
  }

  function close() {
    document.getElementById('ctm-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── SUBMIT ── */
  function submit() {
    const teamName = (document.getElementById('ctm-team-name')?.value || '').trim();
    const hackathon= document.getElementById('ctm-hackathon')?.value || '';
    const theme    = (document.getElementById('ctm-theme')?.value    || '').trim();
    const desc     = (document.getElementById('ctm-desc')?.value     || '').trim();
    const lead     = (document.getElementById('ctm-lead')?.value     || '').trim();
    const spots    = parseInt(document.getElementById('ctm-spots')?.value) || 4;
    const exp      = document.getElementById('ctm-exp')?.value  || 'All Levels';
    const deadline = document.getElementById('ctm-deadline')?.value || '';

    // Basic validation
    if (!teamName || !hackathon || !theme || !desc || !lead) {
      // Shake the submit button
      const btn = document.getElementById('ctm-submit-btn');
      btn.style.transition = 'transform 0.08s';
      btn.style.transform  = 'translateX(-4px)';
      setTimeout(() => btn.style.transform = 'translateX(4px)',  80);
      setTimeout(() => btn.style.transform = 'translateX(-3px)', 160);
      setTimeout(() => btn.style.transform = 'translateX(0)',    240);
      return;
    }

    // Build new team object
    const randomAvatar = (window.TMCards && typeof window.TMCards.getRandomAvatar === 'function')
      ? window.TMCards.getRandomAvatar()
      : null;

    const newTeam = {
      id:              Date.now(),
      team:            teamName,
      name:            hackathon,
      avatar:          randomAvatar,
      avatarInitials:  teamName.slice(0, 2).toUpperCase(),
      theme,
      description:     desc,
      deadline:        deadline || null,
      creationDate:    new Date().toISOString().split('T')[0],
      totalSpots:      spots,
      experienceLevel: exp,
      techStack:       stack.slice(),
      members:         [{ n: lead, r: 'Team Lead' }],
      roles:           roles.map(r => ({ n: r.n, o: true })),
      applied:         false,
      userCreated:     true,
    };

    // Persist
    saveUserTeam(newTeam);

    // Inject into TMCards (if loaded)
    if (window.TMCards && typeof window.TMCards.addTeam === 'function') {
      window.TMCards.addTeam(newTeam);
    } else {
      // Fallback: reload-based append via localStorage only
      appendCardToGrid(newTeam);
    }

    // Show success state
    const formBody = document.getElementById('ctm-form-body');
    const success  = document.getElementById('ctm-success');
    const footer   = document.getElementById('ctm-footer');
    if (formBody) formBody.style.display = 'none';
    if (success)  success.classList.add('show');
    if (footer)   footer.style.display   = 'none';

    // Auto-close after 1.6s
    setTimeout(() => {
      close();
      // Scroll to teams grid
      const grid = document.getElementById('teams-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1600);
  }

  /* ── SAVE TO LOCALSTORAGE ── */
  function saveUserTeam(team) {
    try {
      const existing = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
      existing.push(team);
      localStorage.setItem('hk_user_teams', JSON.stringify(existing));
    } catch {}
  }

  /* ── FALLBACK: append card directly to grid DOM ── */
  function appendCardToGrid(t) {
    const grid = document.getElementById('teams-grid');
    if (!grid) return;

    // Remove empty state if present
    const empty = grid.querySelector('.tm-empty');
    if (empty) empty.remove();

    const openCount = t.roles.filter(r => r.o).length;
    const filled    = t.members.length;
    const chips     = t.roles.slice(0, 3)
      .map(r => `<span class="tm-chip">${r.n}</span>`)
      .join('');

    // Avatar: initials with gold bg since no image
    const avatarHTML = `
      <div style="
        width:100%; height:100%;
        background: linear-gradient(135deg, #d9a441 0%, #a8720e 100%);
        border-radius:14px;
        display:flex; align-items:center; justify-content:center;
        font-family:var(--font-mono); font-size:15px; font-weight:700;
        color:#000; letter-spacing:0.04em;">
        ${t.avatarInitials}
      </div>`;

    const card = document.createElement('div');
    card.className  = 'tm-card';
    card.dataset.id = t.id;
    card.style.animation = 'ctm-pop 0.35s cubic-bezier(0.22,1,0.36,1) both';
    card.innerHTML = `
      <div class="tm-avatar-wrap">
        <div class="tm-avatar">${avatarHTML}</div>
      </div>
      <div class="tm-card-body">
        <div class="tm-team">${t.team}</div>
        <div class="tm-hackname">${t.name}</div>
        <div class="tm-status-row">
          <span class="tm-size">${filled}/${t.totalSpots} Members</span>
          <div class="tm-dot-wrap">
            <div class="tm-dot ${openCount > 0 ? 'open' : 'full'}"></div>
            <span class="tm-dot-label">${openCount > 0 ? 'Open' : 'Full'}</span>
          </div>
        </div>
        <div class="tm-divider"></div>
        <div class="tm-roles-label">Roles needed</div>
        <div class="tm-roles">${chips || '<span class="tm-chip">TBD</span>'}</div>
        <div class="tm-footer">
          <button class="tm-view-btn"
            onclick="event.stopPropagation(); CreateTeamModal._openDrawerFallback(${t.id})">
            View Details
          </button>
          <button class="tm-apply-btn">Apply</button>
        </div>
      </div>`;

    grid.appendChild(card);
  }

  /* ── LOAD USER-CREATED TEAMS ON PAGE LOAD ── */
  function loadUserTeams() {
    if (window.TMCards) return;
    try {
      const saved = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
      saved.forEach(t => appendCardToGrid(t));
    } catch {}
  }

  /* ── FALLBACK DRAWER for user-created teams ── */
  function openDrawerFallback(id) {
    try {
      const saved = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
      const t = saved.find(x => x.id === id);
      if (!t || !window.TMCards) return;
      // Temporarily inject into TMCards' addTeam if available
      if (typeof window.TMCards.addTeam === 'function') {
        window.TMCards.openDrawer(id);
      }
    } catch {}
  }

  /* ── WIRE "Create a Team" BUTTON ── */
  function wireButtons() {
    // All buttons/links that should open the modal
    document.querySelectorAll('[data-open-create-team], .secondary-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        // Only intercept if this is the create team button
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('create') || btn.dataset.openCreateTeam !== undefined) {
          e.preventDefault();
          open();
        }
      });
    });
  }

  /* ── BIND EVENTS ── */
  function bindEvents() {
    // Close button
    document.getElementById('ctm-close-btn')
      ?.addEventListener('click', close);

    // Click outside modal
    document.getElementById('ctm-overlay')
      ?.addEventListener('click', e => {
        if (e.target.id === 'ctm-overlay') close();
      });

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.getElementById('ctm-overlay')?.classList.contains('open')) {
        close();
      }
    });

    // Add role on button click
    document.getElementById('ctm-add-role-btn')
      ?.addEventListener('click', addRole);

    // Add role on Enter key
    document.getElementById('ctm-role-input')
      ?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addRole(); } });

    // Add stack on button click
    document.getElementById('ctm-add-stack-btn')
      ?.addEventListener('click', addStack);

    // Add stack on Enter key
    document.getElementById('ctm-stack-input')
      ?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addStack(); } });

    // Submit
    document.getElementById('ctm-submit-btn')
      ?.addEventListener('click', submit);
  }

  /* ── INIT ── */
  function init() {
    injectModal();
    bindEvents();
    wireButtons();
    loadUserTeams();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── PUBLIC API ── */
  window.CreateTeamModal = {
    open,
    close,
    _removeRole:         removeRole,
    _removeStack:        removeStack,
    _openDrawerFallback: openDrawerFallback,
  };

})();