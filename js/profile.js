/* =============================================
   PROFILE PAGE — js/profile.js
   Reads real data from:
     hk_tm_v2       → applied teams state (set by teamfinder.js)
     hk_user_teams  → user-created teams (set by create-team-modal.js)
     hk_profile     → user profile info (saved here)
     hk_approvals   → approve/reject decisions (saved here)
   ============================================= */

(function () {

  /* ────────────────────────────────────────────
     TEAM DATA (same as teamfinder.js TEAMS array)
     We embed the base data here so profile.js
     can resolve team names from applied IDs.
     Only ids + names + hackathon are needed.
  ──────────────────────────────────────────── */
  const BASE_TEAMS = [
    { id: 1, team: 'Alpha Builders', name: 'HackIndia 2026',     theme: 'AI for Healthcare',      deadline: '2026-08-15', description: 'Building an AI-powered diagnostic tool for rural healthcare.', techStack: ['Python','TensorFlow','React','FastAPI'], experienceLevel: 'Intermediate' },
    { id: 2, team: 'FinForce',       name: 'BharatHacks 2026',   theme: 'FinTech Innovation',      deadline: '2026-09-01', description: 'Reimagining financial inclusion for Bharat. Micro-lending platform.', techStack: ['Node.js','PostgreSQL','React Native','Stripe'], experienceLevel: 'All Levels' },
    { id: 3, team: 'GreenStack',     name: 'GreenCode Jam',      theme: 'Climate Tech',            deadline: '2026-07-30', description: 'Real-time carbon footprint tracker for Indian cities.', techStack: ['Arduino','Python','MongoDB','Next.js'], experienceLevel: 'Beginner Friendly' },
    { id: 4, team: 'Web3 Wolves',    name: 'ETHIndia 2026',      theme: 'DeFi & DAOs',             deadline: '2026-10-12', description: 'Decentralized autonomous organization toolkit for Indian startups.', techStack: ['Solidity','Hardhat','ethers.js','Next.js'], experienceLevel: 'Advanced' },
    { id: 5, team: 'Cloud9 Crew',    name: 'AWS Build-On India', theme: 'Cloud Infrastructure',   deadline: '2026-08-20', description: 'Automating DevOps pipelines for startups using serverless AWS.', techStack: ['AWS Lambda','Terraform','Docker','Go'], experienceLevel: 'Intermediate' },
    { id: 6, team: 'MindBridge',     name: 'GenAI Hackathon',    theme: 'Mental Health Tech',      deadline: '2026-09-15', description: 'LLM-powered mental wellness companion for college students.', techStack: ['OpenAI API','LangChain','Flutter','Supabase'], experienceLevel: 'All Levels' },
  ];

  /* Dummy applicants shown per created team */
  const DUMMY_APPLICANTS = [
    { init: 'AK', name: 'Arjun Kumar',  role: 'Frontend Dev'    },
    { init: 'PS', name: 'Priya Singh',  role: 'UI Designer'     },
    { init: 'MR', name: 'Meera Rao',    role: 'Full Stack Dev'  },
    { init: 'VK', name: 'Vikram Khanna',role: 'Backend Dev'     },
    { init: 'SR', name: 'Sneha Reddy',  role: 'ML Engineer'     },
    { init: 'RG', name: 'Rahul Gupta',  role: 'DevOps Engineer' },
    { init: 'AT', name: 'Aman Tiwari',  role: 'Android Dev'     },
    { init: 'NK', name: 'Nisha Kulkarni',role: 'UX Researcher'  },
    { init: 'DS', name: 'Dev Shah',     role: 'Blockchain Dev'  },
  ];

  /* ────────────────────────────────────────────
     STATE
  ──────────────────────────────────────────── */
  let profile = {
    name:     'Harish Ramachandran',
    role:     'UI/UX Designer',
    bio:      'Passionate about crafting intuitive design experiences.',
    city:     'Hyderabad',
    phone:    '+91 76661875209',
    linkedin: '',
    github:   '',
    skills:   ['Figma', 'UI/UX', 'Prototyping'],
  };

  let editSkills   = [];
  let approvals    = {};  // { [teamId_appIndex]: 'approve' | 'reject' }
  let activeAppliedId  = null;
  let activeCreatedId  = null;

  /* ────────────────────────────────────────────
     LOCALSTORAGE HELPERS
  ──────────────────────────────────────────── */
  function lsGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  }

  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  /* ── Applied teams from teamfinder.js ──
     hk_tm_v2 stores: [{ id, applied }]
     We cross-reference with BASE_TEAMS + hk_user_teams.
  */
  function getAppliedTeams() {
    const state    = lsGet('hk_tm_v2', []);
    const userTeams = lsGet('hk_user_teams', []);
    const allTeams  = [...BASE_TEAMS, ...userTeams];

    return state
      .filter(s => s.applied)
      .map(s => {
        const t = allTeams.find(x => String(x.id) === String(s.id));
        return t ? { ...t, applied: true } : null;
      })
      .filter(Boolean);
  }

  /* ── Created teams from create-team-modal.js ──
     hk_user_teams stores the full team objects.
  */
  function getCreatedTeams() {
    return lsGet('hk_user_teams', []);
  }

  /* ────────────────────────────────────────────
     PROFILE LOAD / SAVE
  ──────────────────────────────────────────── */
  function loadProfile() {
    const saved = lsGet('hk_profile', null);
    if (saved) profile = { ...profile, ...saved };
  }

  function saveProfile() {
    lsSet('hk_profile', profile);
  }

  /* ────────────────────────────────────────────
     RENDER PROFILE CARD
  ──────────────────────────────────────────── */
  function renderProfile() {
    const initials = (profile.name || 'U')
      .split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2);

    document.getElementById('pfAvatar').textContent = initials;
    document.getElementById('pfName').textContent   = profile.name   || '';
    document.getElementById('pfRole').textContent   = profile.role   || '';
    document.getElementById('pfBio').textContent    = profile.bio    || '';
    document.getElementById('pfCity').textContent   = profile.city   || '';
    document.getElementById('pfPhone').textContent  = profile.phone  || '';

    const liLink = document.getElementById('pfLinkedinLink');
    const liText = document.getElementById('pfLinkedinText');
    if (profile.linkedin) {
      liLink.href = profile.linkedin;
      liText.textContent = 'LinkedIn';
      liLink.style.display = 'flex';
    } else {
      liLink.style.display = 'none';
    }

    const ghLink = document.getElementById('pfGithubLink');
    const ghText = document.getElementById('pfGithubText');
    if (profile.github) {
      ghLink.href = profile.github;
      ghText.textContent = 'GitHub';
      ghLink.style.display = 'flex';
    } else {
      ghLink.style.display = 'none';
    }

    const skillsEl = document.getElementById('pfSkillsDisplay');
    skillsEl.innerHTML = (profile.skills || [])
      .map(s => `<span class="pf-skill-chip">${esc(s)}</span>`)
      .join('');
  }

  /* ────────────────────────────────────────────
     STATS
  ──────────────────────────────────────────── */
  function renderStats() {
    const applied  = getAppliedTeams();
    const created  = getCreatedTeams();
    /* For accepted/pending, we'd need real status data from teamfinder.
       teamfinder.js only tracks applied=true/false (no status).
       So: applied count = total applied; we keep accepted/pending as 0
       until real status tracking is added. */
    document.getElementById('statApplied').textContent  = applied.length;
    document.getElementById('statCreated').textContent  = created.length;
    document.getElementById('statAccepted').textContent = 0;
    document.getElementById('statPending').textContent  = applied.length;
  }

  /* ────────────────────────────────────────────
     APPLIED TEAMS LIST
  ──────────────────────────────────────────── */
  function renderApplied() {
    const list  = document.getElementById('appliedTeamsList');
    const teams = getAppliedTeams();

    if (!teams.length) {
      list.innerHTML = `
        <div class="pf-empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          No applications yet.<br>Find teams on the <a href="teamfinder.html" style="color:#c9a227;">Team Finder</a> page.
        </div>`;
      return;
    }

    list.innerHTML = '';
    teams.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'pf-team-btn';
      btn.dataset.id = t.id;
      btn.innerHTML = `
        <div style="min-width:0;flex:1">
          <div class="pf-t-name">${esc(t.team)}</div>
          <div class="pf-t-sub">${esc(t.name)} · ${esc(t.theme || '')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span class="pf-badge pf-b-pending">Applied</span>
          <span class="pf-chevron">▼</span>
        </div>`;
      btn.addEventListener('click', () => toggleAppliedDetail(t, btn));
      list.appendChild(btn);
    });
  }

  function toggleAppliedDetail(t, btn) {
    const panel   = document.getElementById('appliedDetailPanel');
    const content = document.getElementById('appliedDetailContent');

    if (activeAppliedId === t.id && panel.style.display !== 'none') {
      panel.style.display = 'none';
      activeAppliedId = null;
      document.querySelectorAll('#appliedTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
      return;
    }

    activeAppliedId = t.id;
    document.querySelectorAll('#appliedTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const stack = (t.techStack || []).map(s => `<span class="pf-tech-chip">${esc(s)}</span>`).join('');

    content.innerHTML = `
      <div class="pf-detail-name">${esc(t.team)}</div>
      <div class="pf-detail-hackathon">${esc(t.name)}</div>
      <div class="pf-detail-grid">
        <div class="pf-detail-item">
          <div class="pf-detail-key">Theme</div>
          <div class="pf-detail-val">${esc(t.theme || '—')}</div>
        </div>
        <div class="pf-detail-item">
          <div class="pf-detail-key">Deadline</div>
          <div class="pf-detail-val">${formatDate(t.deadline)}</div>
        </div>
        <div class="pf-detail-item">
          <div class="pf-detail-key">Status</div>
          <div class="pf-detail-val"><span class="pf-badge pf-b-pending">Applied</span></div>
        </div>
      </div>
      <div class="pf-detail-label">About</div>
      <div class="pf-detail-desc">${esc(t.description || '—')}</div>
      ${stack ? `<div class="pf-detail-label">Tech Stack</div><div class="pf-tech-chips">${stack}</div>` : ''}`;

    panel.style.display = 'block';
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }

  /* ────────────────────────────────────────────
     CREATED TEAMS LIST
  ──────────────────────────────────────────── */
  function renderCreated() {
    const list  = document.getElementById('createdTeamsList');
    const teams = getCreatedTeams();

    if (!teams.length) {
      list.innerHTML = `
        <div class="pf-empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          No teams created yet.<br>Go to <a href="teamfinder.html" style="color:#c9a227;">Team Finder</a> to create one.
        </div>`;
      return;
    }

    list.innerHTML = '';
    teams.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'pf-team-btn';
      btn.dataset.id = t.id;
      const filled = (t.members || []).length;
      const total  = t.totalSpots || '?';
      btn.innerHTML = `
        <div style="min-width:0;flex:1">
          <div class="pf-t-name">${esc(t.team || t.name || 'Team')}</div>
          <div class="pf-t-sub">${esc(t.name || '')} · ${filled}/${total} members</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span class="pf-badge pf-b-open">Open</span>
          <span class="pf-chevron">▼</span>
        </div>`;
      btn.addEventListener('click', () => toggleCreatedDetail(t, btn));
      list.appendChild(btn);
    });
  }

  function toggleCreatedDetail(t, btn) {
    const panel   = document.getElementById('createdDetailPanel');
    const content = document.getElementById('createdDetailContent');

    if (activeCreatedId === t.id && panel.style.display !== 'none') {
      panel.style.display = 'none';
      activeCreatedId = null;
      document.querySelectorAll('#createdTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
      return;
    }

    activeCreatedId = t.id;
    document.querySelectorAll('#createdTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Pick 3 unique dummy applicants deterministically based on team id */
    const seed  = Math.abs(hashCode(String(t.id || t.team || '')));
    const apps  = [];
    for (let i = 0; i < 3; i++) {
      apps.push(DUMMY_APPLICANTS[(seed + i) % DUMMY_APPLICANTS.length]);
    }

    const appRows = apps.map((a, i) => {
      const key = `${t.id}_${i}`;
      const dec = approvals[key];
      const btns = dec
        ? `<span class="pf-decided" style="color:${dec === 'approve' ? '#3fc980' : '#e05050'}">${dec === 'approve' ? '✓ Approved' : '✕ Rejected'}</span>`
        : `<div class="pf-action-btns">
             <button class="pf-btn-approve" onclick="Profile.decide('${t.id}',${i})">Approve</button>
             <button class="pf-btn-reject"  onclick="Profile.reject('${t.id}',${i})">Reject</button>
           </div>`;
      return `
        <div class="pf-applicant-row">
          <div class="pf-app-info">
            <div class="pf-app-av">${esc(a.init)}</div>
            <div>
              <div class="pf-app-name">${esc(a.name)}</div>
              <div class="pf-app-role">${esc(a.role)}</div>
            </div>
          </div>
          ${btns}
        </div>`;
    }).join('');

    const stack = (t.techStack || []).map(s => `<span class="pf-tech-chip">${esc(s)}</span>`).join('');

    content.innerHTML = `
      <div class="pf-detail-name">${esc(t.team || t.name || 'Team')}</div>
      <div class="pf-detail-hackathon">${esc(t.name || '')} · ${esc(t.theme || '')}</div>
      <div class="pf-detail-grid">
        <div class="pf-detail-item">
          <div class="pf-detail-key">Max Size</div>
          <div class="pf-detail-val">${t.totalSpots || '?'}</div>
        </div>
        <div class="pf-detail-item">
          <div class="pf-detail-key">Level</div>
          <div class="pf-detail-val">${esc(t.experienceLevel || 'Any')}</div>
        </div>
        <div class="pf-detail-item">
          <div class="pf-detail-key">Deadline</div>
          <div class="pf-detail-val">${formatDate(t.deadline)}</div>
        </div>
      </div>
      ${t.description ? `<div class="pf-detail-label">About</div><div class="pf-detail-desc">${esc(t.description)}</div>` : ''}
      ${stack ? `<div class="pf-detail-label">Tech Stack</div><div class="pf-tech-chips" style="margin-bottom:16px">${stack}</div>` : ''}
      <div class="pf-detail-label">Applicants (demo)</div>
      <div id="appRows_${t.id}">${appRows}</div>`;

    panel.style.display = 'block';
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }

  /* ────────────────────────────────────────────
     APPROVE / REJECT
  ──────────────────────────────────────────── */
  function decide(teamId, appIdx) {
    const key = `${teamId}_${appIdx}`;
    approvals[key] = 'approve';
    lsSet('hk_approvals', approvals);
    refreshApplicantRow(teamId, appIdx, 'approve');
  }

  function reject(teamId, appIdx) {
    const key = `${teamId}_${appIdx}`;
    approvals[key] = 'reject';
    lsSet('hk_approvals', approvals);
    refreshApplicantRow(teamId, appIdx, 'reject');
  }

  function refreshApplicantRow(teamId, appIdx, dec) {
    const container = document.getElementById(`appRows_${teamId}`);
    if (!container) return;
    const rows = container.querySelectorAll('.pf-applicant-row');
    const row  = rows[appIdx];
    if (!row) return;
    const btnsWrap = row.querySelector('.pf-action-btns');
    if (btnsWrap) {
      btnsWrap.outerHTML = `<span class="pf-decided" style="color:${dec === 'approve' ? '#3fc980' : '#e05050'}">${dec === 'approve' ? '✓ Approved' : '✕ Rejected'}</span>`;
    }
  }

  /* ────────────────────────────────────────────
     EDIT PROFILE MODAL
  ──────────────────────────────────────────── */
  function openEditModal() {
    document.getElementById('inpName').value     = profile.name     || '';
    document.getElementById('inpRole').value     = profile.role     || '';
    document.getElementById('inpBio').value      = profile.bio      || '';
    document.getElementById('inpCity').value     = profile.city     || '';
    document.getElementById('inpPhone').value    = profile.phone    || '';
    document.getElementById('inpLinkedin').value = profile.linkedin || '';
    document.getElementById('inpGithub').value   = profile.github   || '';
    editSkills = [...(profile.skills || [])];
    renderEditSkills();
    document.getElementById('pfEditModal').classList.add('open');
    document.getElementById('pfEditModal').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closeEditModal() {
    document.getElementById('pfEditModal').classList.remove('open');
  }

  function saveProfileFromModal() {
    profile.name     = document.getElementById('inpName').value.trim()     || profile.name;
    profile.role     = document.getElementById('inpRole').value.trim()     || profile.role;
    profile.bio      = document.getElementById('inpBio').value.trim();
    profile.city     = document.getElementById('inpCity').value.trim()     || profile.city;
    profile.phone    = document.getElementById('inpPhone').value.trim()    || profile.phone;
    profile.linkedin = document.getElementById('inpLinkedin').value.trim();
    profile.github   = document.getElementById('inpGithub').value.trim();
    profile.skills   = [...editSkills];
    saveProfile();
    renderProfile();
    closeEditModal();
  }

  function renderEditSkills() {
    const el = document.getElementById('editSkillsList');
    if (!el) return;
    el.innerHTML = editSkills.map((s, i) => `
      <span class="pf-edit-skill-tag">
        ${esc(s)}
        <button type="button" aria-label="Remove ${esc(s)}" onclick="Profile._removeSkill(${i})">×</button>
      </span>`).join('');
  }

  function addSkill() {
    const inp = document.getElementById('inpSkill');
    const val = (inp.value || '').trim();
    if (val && !editSkills.includes(val)) {
      editSkills.push(val);
      renderEditSkills();
    }
    inp.value = '';
    inp.focus();
  }

  function removeSkill(i) {
    editSkills.splice(i, 1);
    renderEditSkills();
  }

  /* ────────────────────────────────────────────
     UTILS
  ──────────────────────────────────────────── */
  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatDate(iso) {
    if (!iso) return 'TBD';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  /* ────────────────────────────────────────────
     BIND DOM EVENTS
  ──────────────────────────────────────────── */
  function bindEvents() {
    document.getElementById('pfEditBtn')
      .addEventListener('click', openEditModal);

    document.getElementById('pfCancelBtn')
      .addEventListener('click', closeEditModal);

    document.getElementById('pfSaveBtn')
      .addEventListener('click', saveProfileFromModal);

    document.getElementById('pfAddSkillBtn')
      .addEventListener('click', addSkill);

    document.getElementById('inpSkill')
      .addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } });

    document.getElementById('appliedDetailBack')
      .addEventListener('click', () => {
        document.getElementById('appliedDetailPanel').style.display = 'none';
        activeAppliedId = null;
        document.querySelectorAll('#appliedTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
      });

    document.getElementById('createdDetailBack')
      .addEventListener('click', () => {
        document.getElementById('createdDetailPanel').style.display = 'none';
        activeCreatedId = null;
        document.querySelectorAll('#createdTeamsList .pf-team-btn').forEach(b => b.classList.remove('active'));
      });
  }

  /* ────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────── */
  function init() {
    approvals = lsGet('hk_approvals', {});
    loadProfile();
    renderProfile();
    renderStats();
    renderApplied();
    renderCreated();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── PUBLIC API (called from inline onclick) ── */
  window.Profile = {
    decide,
    reject,
    _removeSkill: removeSkill,
  };

})();