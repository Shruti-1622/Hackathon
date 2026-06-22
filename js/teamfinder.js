(function () {

  const AVATARS = [
    'assets/avatar/a1.webp',
    'assets/avatar/a2.webp',
    'assets/avatar/a3.webp',
    'assets/avatar/a4.webp',
    'assets/avatar/a5.webp',
    'assets/avatar/a6.webp',
    'assets/avatar/a7.webp',
    'assets/avatar/a8.webp',
    'assets/avatar/a9.webp',
    'assets/avatar/a10.webp',
    'assets/avatar/a11.webp'
  ];

  /* ── TEAM DATA ── */
  const TEAMS = [
    {
      id: 1,
      team: 'Alpha Builders',
      name: 'HackIndia 2026',
      avatar: AVATARS[0],
      theme: 'AI for Healthcare',
      description: 'Building an AI-powered diagnostic tool for rural healthcare. We need passionate builders who care about real-world impact.',
      deadline: '2026-08-15',
      creationDate: '2026-06-01',
      totalSpots: 5,
      experienceLevel: 'Intermediate',
      techStack: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      members: [
        { n: 'Aarav S', r: 'Team Lead' },
        { n: 'Priya K', r: 'ML Engineer' },
      ],
      roles: [
        { n: 'UX Designer', o: true },
        { n: 'Backend Dev', o: true },
        { n: 'Data Analyst', o: false },
      ],
      applied: false,
    },
    {
      id: 2,
      team: 'FinForce',
      name: 'BharatHacks 2026',
      avatar: AVATARS[1],
      theme: 'FinTech Innovation',
      description: "Reimagining financial inclusion for Bharat. We're building a micro-lending platform powered by alternative credit scoring.",
      deadline: '2026-09-01',
      creationDate: '2026-06-05',
      totalSpots: 4,
      experienceLevel: 'All Levels',
      techStack: ['Node.js', 'PostgreSQL', 'React Native', 'Stripe'],
      members: [
        { n: 'Rohit M', r: 'Frontend Dev' },
      ],
      roles: [
        { n: 'Product Manager', o: true },
        { n: 'UI Designer', o: true },
        { n: 'Backend Dev', o: true },
      ],
      applied: false,
    },
    {
      id: 3,
      team: 'GreenStack',
      name: 'GreenCode Jam',
      avatar: AVATARS[2],
      theme: 'Climate Tech',
      description: 'Using IoT and data science to build a real-time carbon footprint tracker for Indian cities. Join us to build something that matters.',
      deadline: '2026-07-30',
      creationDate: '2025-05-28',
      totalSpots: 6,
      experienceLevel: 'Beginner Friendly',
      techStack: ['Arduino', 'Python', 'MongoDB', 'Next.js'],
      members: [
        { n: 'Sneha R', r: 'Full Stack' },
        { n: 'Karan J', r: 'ML Engineer' },
        { n: 'Nisha P', r: 'Designer' },
      ],
      roles: [
        { n: 'IoT Engineer', o: true },
        { n: 'Data Scientist', o: true },
        { n: 'UX Researcher', o: false },
      ],
      applied: false,
    },
    {
      id: 4,
      team: 'Web3 Wolves',
      name: 'ETHIndia 2026',
      avatar: AVATARS[10],
      theme: 'DeFi & DAOs',
      description: 'Building a decentralized autonomous organization toolkit for Indian startups. Solidity wizards and frontend devs needed.',
      deadline: '2026-10-12',
      creationDate: '2026-06-07',
      totalSpots: 5,
      experienceLevel: 'Advanced',
      techStack: ['Solidity', 'Hardhat', 'ethers.js', 'Next.js'],
      members: [
        { n: 'Dev P', r: 'Smart Contracts' },
        { n: 'Arjun T', r: 'Blockchain Dev' },
      ],
      roles: [
        { n: 'Frontend Dev', o: true },
        { n: 'Security Auditor', o: true },
        { n: 'UI Designer', o: true },
      ],
      applied: false,
    },
    {
      id: 5,
      team: 'Cloud9 Crew',
      name: 'AWS Build-On India',
      avatar: AVATARS[4],
      theme: 'Cloud Infrastructure',
      description: 'Automating DevOps pipelines for startups using serverless AWS. Looking for someone who loves infra as much as we do.',
      deadline: '2026-08-20',
      creationDate: '2026-06-03',
      totalSpots: 4,
      experienceLevel: 'Intermediate',
      techStack: ['AWS Lambda', 'Terraform', 'Docker', 'Go'],
      members: [
        { n: 'Vikram S', r: 'DevOps Lead' },
        { n: 'Meera L', r: 'Backend Dev' },
        { n: 'Tarun B', r: 'Cloud Infra' },
      ],
      roles: [
        { n: 'Backend Dev', o: true },
        { n: 'SRE Engineer', o: false },
      ],
      applied: false,
    },
    {
      id: 6,
      team: 'MindBridge',
      name: 'GenAI Hackathon',
      avatar: AVATARS[7],
      theme: 'Mental Health Tech',
      description: 'Creating an LLM-powered mental wellness companion for college students. Empathy and engineering in equal measure.',
      deadline: '2026-09-15',
      creationDate: '2026-06-06',
      totalSpots: 5,
      experienceLevel: 'All Levels',
      techStack: ['OpenAI API', 'LangChain', 'Flutter', 'Supabase'],
      members: [
        { n: 'Ananya R', r: 'AI Engineer' },
      ],
      roles: [
        { n: 'Mobile Dev', o: true },
        { n: 'UI Designer', o: true },
        { n: 'ML Engineer', o: true },
      ],
      applied: false,
    },
  ];

  /* ── HELPERS ── */

  /** Format an ISO date string to a short human-readable label, e.g. "Aug 15, 2026" */
  function formatDate(iso) {
    if (!iso) return 'TBD';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* ── LOCALSTORAGE ── */
  function save() {
    try {
      const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
      if (!currentUserEmail) return;
      localStorage.setItem(
        'hk_tm_v2_' + currentUserEmail,
        JSON.stringify(TEAMS.filter(t => !t.userCreated).map(t => ({ id: t.id, applied: t.applied })))
      );
    } catch { }
  }

  function load() {
    try {
      const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
      
      const d = JSON.parse(localStorage.getItem('hk_tm_v2_' + currentUserEmail) || localStorage.getItem('hk_tm_v2'));
      if (Array.isArray(d)) {
        d.forEach(item => {
          const t = TEAMS.find(x => x.id === item.id);
          if (t && !t.userCreated) t.applied = item.applied;
        });
      }

      if (currentUserEmail) {
        const userTeams = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
        TEAMS.forEach(t => {
          if (t.userCreated) {
            const match = userTeams.find(ut => ut.id === t.id);
            if (match && match.applications) {
              const myApp = match.applications.find(a => (a.email || '').trim().toLowerCase() === currentUserEmail);
              if (myApp) t.applied = true;
            }
          }
        });
      }
    } catch { }
  }

  function processApply(t, applyMode) {
    const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
    if (!currentUserEmail) {
      alert("Please log in to apply.");
      return false;
    }
    if ((t.creatorEmail || '').trim().toLowerCase() === currentUserEmail) {
      alert("You cannot apply to a team you created.");
      return false;
    }

    t.applied = applyMode;

    // Clean up hk_applications if withdrawing
    if (!applyMode) {
      try {
        let allApps = JSON.parse(localStorage.getItem('hk_applications') || '[]');
        allApps = allApps.filter(a => !((a.applicantId || '').trim().toLowerCase() === currentUserEmail && String(a.teamId) === String(t.id)));
        localStorage.setItem('hk_applications', JSON.stringify(allApps));
      } catch (e) { console.error(e); }
    }
    
    if (t.userCreated) {
      try {
        const userTeams = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
        const ut = userTeams.find(x => x.id === t.id);
        if (ut) {
          if (!ut.applications) ut.applications = [];
          if (applyMode) {
            const profilesStr = localStorage.getItem('hk_profiles');
            const profiles = profilesStr ? JSON.parse(profilesStr) : {};
            const p = profiles[currentUserEmail] || { email: currentUserEmail, name: currentUserEmail };
            ut.applications.push({
              email: p.email,
              name: p.name,
              role: p.role || 'Member',
              avatar: p.avatar,
              status: 'pending',
              timestamp: new Date().toISOString()
            });
          } else {
            ut.applications = ut.applications.filter(a => (a.email || '').trim().toLowerCase() !== currentUserEmail);
          }
          localStorage.setItem('hk_user_teams', JSON.stringify(userTeams));
        }
      } catch (e) { console.error(e); }
    } else {
      save();
    }
    return true;
  }

  /* ── ROLE & TECH MATCH HELPER FUNCTIONS ── */
  function isRoleMatch(userRole, teamRoleName) {
    if (!userRole || !teamRoleName) return false;
    const u = userRole.toLowerCase().trim();
    const t = teamRoleName.toLowerCase().trim();

    if (u.includes('frontend') && t.includes('frontend')) return true;
    if (u.includes('backend') && t.includes('backend')) return true;
    if (u.includes('full stack') && (t.includes('full stack') || t.includes('fullstack'))) return true;
    if (u.includes('ui/ux') || u.includes('designer') || u.includes('design')) {
      if (t.includes('ui') || t.includes('ux') || t.includes('design') || t.includes('art') || t.includes('illustrator')) return true;
    }
    if (u.includes('ai/ml') || u.includes('ml/ai') || u.includes('machine learning') || u.includes('artificial') || u.includes('engineer')) {
      if (t.includes('ml') || t.includes('ai') || t.includes('nlp')) return true;
    }
    if (u.includes('data')) {
      if (t.includes('data') || t.includes('analyst') || t.includes('analytics') || t.includes('science') || t.includes('scientist')) return true;
    }
    if (u.includes('mobile') && t.includes('mobile')) return true;
    if (u.includes('product manager') && (t.includes('product') || t.includes('pm') || t.includes('manager'))) return true;
    if (u.includes('pitching') || u.includes('business') || u.includes('marketing')) {
      if (t.includes('pitch') || t.includes('business') || t.includes('biz') || t.includes('market') || t.includes('sale') || t.includes('pitching')) return true;
    }

    return u.includes(t) || t.includes(u);
  }

  function getCurrentUserProfile() {
    const email = localStorage.getItem('currentUserEmail');
    if (!email) return null;
    try {
      const profiles = JSON.parse(localStorage.getItem('hk_profiles') || '{}');
      return profiles[email] || null;
    } catch (e) {
      return null;
    }
  }

  function getMatchScore(team, userProfile) {
    if (!userProfile) return 0;
    const userRole = userProfile.role;
    const userSkills = userProfile.skills || [];

    // 1. Check vacant role match (score 2)
    if (team.roles && team.roles.some(r => r.o && isRoleMatch(userRole, r.n))) {
      return 2;
    }

    // 2. Check filled role match (score 1)
    const hasFilledRoleMatch = (team.roles && team.roles.some(r => !r.o && isRoleMatch(userRole, r.n))) ||
                               (team.members && team.members.some(m => isRoleMatch(userRole, m.r)));
    if (hasFilledRoleMatch) {
      return 1;
    }

    // 3. Check tech stack overlap with user skills (score 1)
    const hasTechOverlap = team.techStack && team.techStack.some(ts => 
      userSkills.some(us => us.toLowerCase().trim() === ts.toLowerCase().trim())
    );
    if (hasTechOverlap) {
      return 1;
    }

    return 0;
  }

  /* ── RENDER CARDS ── */
  function renderGrid(list) {
    const grid = document.getElementById('teams-grid');
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML = '<div class="tm-empty">No teams found. Try a different search.</div>';
      return;
    }

    const userProfile = getCurrentUserProfile();

    grid.innerHTML = list.map(t => {
      const openCount = t.roles.filter(r => r.o).length;
      const filled = t.members.length;
      const chips = t.roles.slice(0, 3)
        .map(r => `<span class="tm-chip">${r.n}</span>`)
        .join('');

      const score = getMatchScore(t, userProfile);
      let badgeHtml = '';
      if (score === 2) {
        badgeHtml = `<span class="tm-match-badge role-match" style="position: absolute; top: 12px; right: 12px; background: rgba(217, 164, 65, 0.2); border: 1px solid var(--gold, #c9a84c); color: var(--gold, #c9a84c); font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; z-index: 10; letter-spacing: 0.5px;">Role Match</span>`;
      } else if (score === 1) {
        badgeHtml = `<span class="tm-match-badge good-match" style="position: absolute; top: 12px; right: 12px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; z-index: 10; letter-spacing: 0.5px;">Good Match</span>`;
      }

      return `
        <div class="tm-card" style="position: relative;">
          ${badgeHtml}
          <!-- Floating Avatar -->
          <div class="tm-avatar-wrap">
            <div class="tm-avatar">
              <img src="${t.avatar}" alt="${t.team}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">
            </div>
          </div>

          <!-- Card Body -->
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
            <div class="tm-roles">${chips}</div>

            <div class="tm-footer">
              <button class="tm-view-btn"
                onclick="event.stopPropagation(); TMCards.openDrawer(${t.id})">
                View Details
              </button>
              <button
                class="tm-apply-btn ${t.applied ? 'applied' : ''}"
                onclick="event.stopPropagation(); TMCards.applyCard(${t.id}, this)">
                ${t.applied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  /* ── OPEN DRAWER ── */
  function openDrawer(id) {
    const t = TEAMS.find(x => x.id === id);
    if (!t) return;

    const filled = t.members.length;
    const needed = Math.max(0, t.totalSpots - filled);
    const lead = t.members[0] || null;

    /* Members HTML */
    const membersHTML = t.members.length
      ? t.members.map(m => `
          <div class="tm-d-member">
            <div>
              <div class="tm-d-m-name">${m.n}</div>
              <div class="tm-d-m-role">${m.r}</div>
            </div>
          </div>`).join('')
      : '<span style="font-size:.8rem; color:var(--fg-muted)">No members yet</span>';

    /* Roles HTML */
    const rolesHTML = t.roles.map(r => `
      <div class="tm-d-role">
        <div class="${r.o ? 'dot-o' : 'dot-f'}"></div>
        <span>${r.n}</span>
        <span class="tm-d-role-status">${r.o ? 'open' : 'filled'}</span>
      </div>`).join('');

    /* Tech stack HTML */
    const stackHTML = (t.techStack || [])
      .map(s => `<span class="tm-d-tag">${s}</span>`)
      .join('');

    /* Team lead HTML */
    const leadHTML = lead
      ? `<div class="tm-d-lead">
           <div class="tm-d-lead-av">
             <img src="${t.avatar}" alt="${lead.n}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
           </div>
           <div>
             <div class="tm-d-lead-name">${lead.n}</div>
             <div class="tm-d-lead-badge">Team Lead</div>
           </div>
         </div>`
      : '<span style="font-size:.8rem; color:var(--fg-muted)">TBD</span>';

    document.getElementById('tm-drawer-inner').innerHTML = `

      <!-- Header -->
      <div class="tm-d-header">
        <div class="tm-d-header-left">
          <div class="tm-d-avatar" style="overflow:hidden; border-radius:16px;">
            <img src="${t.avatar}" alt="${t.team}" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
          <div>
            <div class="tm-d-hackname">${t.name}</div>
            <div class="tm-d-teamname">${t.team}</div>
            <div class="tm-d-theme">${t.theme}</div>
          </div>
        </div>
        <button class="tm-d-close" onclick="TMCards.close()">✕</button>
      </div>

      <!-- Stats -->
      <div class="tm-d-stats">
        <div class="tm-d-stat">
          <div class="tm-d-stat-n">${t.totalSpots}</div>
          <div class="tm-d-stat-l">Max</div>
        </div>
        <div class="tm-d-stat">
          <div class="tm-d-stat-n">${filled}</div>
          <div class="tm-d-stat-l">Filled</div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="tm-d-info-grid">
        <div class="tm-d-info-item">
          <div class="tm-d-info-key">Experience</div>
          <div class="tm-d-info-val">${t.experienceLevel || 'Any'}</div>
        </div>
        <div class="tm-d-info-item">
          <div class="tm-d-info-key">Deadline</div>
          <div class="tm-d-info-val">${formatDate(t.deadline)}</div>
        </div>
        <div class="tm-d-info-item">
          <div class="tm-d-info-key">Created</div>
          <div class="tm-d-info-val">${formatDate(t.creationDate)}</div>
        </div>
        <div class="tm-d-info-item">
          <div class="tm-d-info-key">Status</div>
          <div class="tm-d-info-val" style="color:${needed > 0 ? '#10B981' : '#71717a'}">
            ${needed > 0 ? 'Recruiting' : 'Team Full'}
          </div>
        </div>
      </div>

      <div class="tm-d-divider"></div>

      <!-- Description -->
      <div class="tm-d-label">About</div>
      <div class="tm-d-desc">${t.description}</div>

      <div class="tm-d-divider"></div>

      <!-- Team Lead -->
      <div class="tm-d-label">Team Lead</div>
      ${leadHTML}

      <div class="tm-d-divider"></div>

      <!-- Members -->
      <div class="tm-d-label">Members</div>
      <div class="tm-d-members">${membersHTML}</div>

      <div class="tm-d-divider"></div>

      <!-- Roles -->
      <div class="tm-d-label">Roles Required</div>
      <div class="tm-d-roles">${rolesHTML}</div>

      <div class="tm-d-divider"></div>

      <!-- Tech Stack -->
      <div class="tm-d-label">Tech Stack</div>
      <div class="tm-d-stack">${stackHTML}</div>

      ${(() => {
        const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
        let isApproved = false;
        if (currentUserEmail) {
          if (t.userCreated) {
            if (t.applications) {
              const myApp = t.applications.find(a => (a.email || '').trim().toLowerCase() === currentUserEmail);
              if (myApp && myApp.status === 'approve') {
                isApproved = true;
              }
            }
          } else {
            try {
              const allApps = JSON.parse(localStorage.getItem('hk_applications') || '[]');
              const myApp = allApps.find(a => String(a.teamId) === String(t.id) && (a.applicantId || '').trim().toLowerCase() === currentUserEmail);
              if (myApp && myApp.status === 'approve') {
                isApproved = true;
              }
            } catch (_) {}
          }
        }

        if (isApproved) {
          const contactInfo = t.contact || {
            email: t.creatorEmail || `${t.team.toLowerCase().replace(/\s+/g, '')}-lead@hackverse.com`,
            linkedin: `https://linkedin.com/company/${t.team.toLowerCase().replace(/\s+/g, '')}`,
            discord: `${t.team.toLowerCase().replace(/\s+/g, '')}_lead`
          };

          const emailLink = contactInfo.email ? `<p style="margin: 6px 0; font-size: 0.88rem; color: #fff;"><strong>Email:</strong> <a href="mailto:${contactInfo.email}" style="color: var(--gold, #c9a84c); text-decoration: none;">${contactInfo.email}</a></p>` : '';
          const linkedinLink = contactInfo.linkedin ? `<p style="margin: 6px 0; font-size: 0.88rem; color: #fff;"><strong>LinkedIn:</strong> <a href="${contactInfo.linkedin}" target="_blank" style="color: var(--gold, #c9a84c); text-decoration: none;">${contactInfo.linkedin}</a></p>` : '';
          const discordLink = contactInfo.discord ? `<p style="margin: 6px 0; font-size: 0.88rem; color: #fff;"><strong>Discord:</strong> <span style="color: #fff;">${contactInfo.discord}</span></p>` : '';

          return `
            <div class="tm-d-divider"></div>
            <div class="tm-d-label" style="color: #10b981; font-weight: 700; display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Contact Details Unlocked
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 14px 18px; margin-top: 8px;">
              ${emailLink}
              ${linkedinLink}
              ${discordLink}
            </div>
          `;
        }
        return '';
      })()}

      <div class="tm-d-divider"></div>

      <!-- Apply -->
      <button
        class="tm-d-apply ${t.applied ? 'applied' : ''}"
        id="tm-d-apply-btn"
        onclick="TMCards.applyDrawer(${t.id})">
        ${t.applied ? '✓ Applied — All the best!' : 'Apply to Join'}
      </button>`;

    document.getElementById('tm-overlay').classList.add('open');
    document.getElementById('tm-drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── CLOSE DRAWER ── */
  function close() {
    document.getElementById('tm-overlay').classList.remove('open');
    document.getElementById('tm-drawer').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Close on Escape */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ── CUSTOM CONFIRM MODAL ── */
  function showConfirm() {
    return new Promise(function (resolve) {
      var overlay = document.getElementById('tm-confirm-overlay');
      var yesBtn  = document.getElementById('tm-confirm-yes');
      var noBtn   = document.getElementById('tm-confirm-cancel');
      overlay.classList.add('open');

      function cleanup(result) {
        overlay.classList.remove('open');
        yesBtn.removeEventListener('click', onYes);
        noBtn.removeEventListener('click', onNo);
        overlay.removeEventListener('click', onBg);
        resolve(result);
      }
      function onYes() { cleanup(true); }
      function onNo()  { cleanup(false); }
      function onBg(e) { if (e.target === overlay) cleanup(false); }

      yesBtn.addEventListener('click', onYes);
      noBtn.addEventListener('click', onNo);
      overlay.addEventListener('click', onBg);
    });
  }

  /* ── APPLY FROM CARD ── */
  function applyCard(id, btn) {
    const t = TEAMS.find(x => x.id === id);
    if (!t) return;

    if (t.applied) {
      showConfirm().then(function (yes) {
        if (!yes) return;
        if (processApply(t, false)) {
          btn.textContent = 'Apply';
          btn.classList.remove('applied');
        }
      });
    } else {
      ApplyModal.open(id, btn);
    }
  }

  /* ── APPLY FROM DRAWER ── */
  function applyDrawer(id) {
    const t = TEAMS.find(x => x.id === id);
    if (!t) return;

    if (t.applied) {
      showConfirm().then(function (yes) {
        if (!yes) return;
        if (processApply(t, false)) {
          const btn = document.getElementById('tm-d-apply-btn');
          if (btn) {
            btn.textContent = 'Apply to Join';
            btn.classList.remove('applied');
          }
          renderGrid(getCurrentList());
        }
      });
    } else {
      const btn = document.getElementById('tm-d-apply-btn');
      ApplyModal.open(id, btn);
    }
  }

  /* ── SEARCH + FILTER ── */
  let _query = '';
  let _filter = 'All Events';
  let _roleFilter = 'All Roles';

  const ROLE_ALIASES = {
    'backend': 'Backend',
    'backend dev': 'Backend',
    'backend developer': 'Backend',
    'backend engineer': 'Backend',
    'backend engineering': 'Backend',
    'backebd': 'Backend',
    'frontend': 'Frontend',
    'frontend dev': 'Frontend',
    'frontend developer': 'Frontend',
    'frontend engineer': 'Frontend',
    'ui designer': 'Design',
    'ux designer': 'Design',
    'ui/ux designer': 'Design',
    'design': 'Design',
    'designer': 'Design'
  };

  function getNormalizedRole(roleName) {
    const lower = roleName.trim().toLowerCase();
    if (ROLE_ALIASES[lower]) return ROLE_ALIASES[lower];
    return lower.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function getCurrentList() {
    const q = _query.toLowerCase().trim();
    const list = TEAMS.filter(t => {
      // Visibility rule: at least one required role must be vacant
      if (t.roles && t.roles.length > 0 && t.roles.every(r => !r.o)) {
        return false;
      }

      const matchQ = !q ||
        t.team.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.theme.toLowerCase().includes(q);
      const matchF = _filter === 'All Events' ||
        t.theme.toLowerCase().includes(_filter.toLowerCase().split(' ')[0].toLowerCase());
      const matchR = _roleFilter === 'All Roles' ||
        t.roles.some(r => r.o && getNormalizedRole(r.n) === _roleFilter);
      return matchQ && matchF && matchR;
    });

    const userProfile = getCurrentUserProfile();
    if (userProfile) {
      list.sort((a, b) => {
        const scoreA = getMatchScore(a, userProfile);
        const scoreB = getMatchScore(b, userProfile);
        return scoreB - scoreA;
      });
    }
    return list;
  }

  function setupSearch() {
    const input = document.querySelector('.search-input');
    const roleSelect = document.getElementById('role-filter');
    const pills = document.querySelectorAll('.filter-pill');

    if (input) {
      input.addEventListener('input', e => {
        _query = e.target.value;
        renderGrid(getCurrentList());
      });
    }

    if (roleSelect) {
      const uniqueRoles = new Set();
      TEAMS.forEach(t => {
        t.roles.filter(r => r.o).forEach(r => {
          uniqueRoles.add(getNormalizedRole(r.n));
        });
      });
      const sortedRoles = Array.from(uniqueRoles).sort();
      roleSelect.innerHTML = '<option value="All Roles">All Roles</option>' + 
        sortedRoles.map(r => `<option value="${r}">${r}</option>`).join('');

      roleSelect.addEventListener('change', e => {
        _roleFilter = e.target.value;
        renderGrid(getCurrentList());
      });
    }

    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        _filter = p.textContent.trim();
        renderGrid(getCurrentList());
      });
    });
  }

  function loadUserCreatedTeams() {
    try {
      const saved = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
      if (Array.isArray(saved)) {
        let needsSave = false;
        saved.forEach(t => {
          // If a team was saved without an avatar (old data), assign one now and persist it
          if (!t.avatar) {
            t.avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
            needsSave = true;
          }
          TEAMS.push(t);
        });
        // Persist avatar fix back to localStorage so avatar stays stable across refreshes
        if (needsSave) {
          localStorage.setItem('hk_user_teams', JSON.stringify(saved));
        }
      }
    } catch { }
  }

  function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)];
  }

  function addTeam(newTeam) {
    // Guarantee the team has an avatar before it touches the grid
    if (!newTeam.avatar) {
      newTeam.avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    }
    TEAMS.push(newTeam);
    renderGrid(getCurrentList());
  }

  /* ── APPLY MODAL ── */
  let currentApplyTeamId = null;
  let currentApplyBtn = null;

  function initApplyModal() {
    const html = `
      <div class="tm-apply-overlay" id="tm-apply-overlay">
        <div class="tm-apply-box">
          <button class="tm-apply-close" onclick="ApplyModal.close()">✕</button>
          <div class="tm-apply-header">
            <h2 id="tm-apply-title">Apply to Join</h2>
            <p id="tm-apply-sub">Complete your application</p>
          </div>
          <div class="tm-apply-body">
            <div class="tm-apply-field">
              <label class="tm-apply-label">Role Applying For *</label>
              <select class="tm-apply-input" id="tm-apply-role"></select>
            </div>
            <div class="tm-apply-field">
              <label class="tm-apply-label">Key Skills *</label>
              <input class="tm-apply-input" id="tm-apply-skills" type="text" placeholder="e.g. React, Node.js, Figma">
            </div>
            <div class="tm-apply-field">
              <label class="tm-apply-label">Portfolio / GitHub Link *</label>
              <input class="tm-apply-input" id="tm-apply-portfolio" type="text" placeholder="e.g. github.com/username">
              <div class="tm-apply-error" id="tm-apply-error-url" style="display:none; color:#ef4444; font-size:12px; margin-top:4px;">Please enter a valid URL</div>
            </div>
            <div class="tm-apply-field">
              <label class="tm-apply-label">Message (Optional)</label>
              <textarea class="tm-apply-textarea" id="tm-apply-msg" placeholder="Why are you a good fit for this team?"></textarea>
            </div>
          </div>
          <div class="tm-apply-footer">
            <button class="tm-apply-btn-cancel" onclick="ApplyModal.close()">Cancel</button>
            <button class="tm-apply-btn-submit" id="tm-apply-submit" onclick="ApplyModal.submit()">Submit Application</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function openApplyModal(teamId, btn) {
    const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
    if (!currentUserEmail) {
      alert("Please log in to apply.");
      return;
    }
    const t = TEAMS.find(x => x.id === teamId);
    if (!t) return;
    if ((t.creatorEmail || '').trim().toLowerCase() === currentUserEmail) {
      alert("You cannot apply to a team you created.");
      return;
    }
    
    // Check if free user has reached team application limit (max 3 active teams)
    const profiles = JSON.parse(localStorage.getItem('hk_profiles') || '{}');
    const userProfile = profiles[currentUserEmail] || {};
    const membership = userProfile.membership || 'free';
    
    if (membership === 'free') {
      const allApps = JSON.parse(localStorage.getItem('hk_applications') || '[]');
      const myActiveApps = allApps.filter(a => (a.applicantId || '').trim().toLowerCase() === currentUserEmail && a.status !== 'reject');
      
      if (myActiveApps.length >= 3) {
        const msg = "Free tier limit reached: You can apply to a maximum of 3 active teams. Redirecting to upgrade page...";
        if (window.HackToast && window.HackToast.show) {
          window.HackToast.show(msg, "error");
        } else {
          alert(msg);
        }
        setTimeout(() => {
          window.location.href = 'upgrade.html?reason=apply_limit&redirect=' + encodeURIComponent(window.location.href);
        }, 1200);
        return;
      }
    }
    
    currentApplyTeamId = teamId;
    currentApplyBtn = btn;
    
    document.getElementById('tm-apply-title').textContent = `Apply to ${t.team}`;
    
    const roleSelect = document.getElementById('tm-apply-role');
    roleSelect.innerHTML = t.roles.map(r => `<option value="${r.n}">${r.n}</option>`).join('');
    
    document.getElementById('tm-apply-skills').value = '';
    document.getElementById('tm-apply-portfolio').value = '';
    document.getElementById('tm-apply-msg').value = '';
    document.getElementById('tm-apply-error-url').style.display = 'none';
    
    document.getElementById('tm-apply-overlay').classList.add('open');
  }

  function closeApplyModal() {
    document.getElementById('tm-apply-overlay').classList.remove('open');
    currentApplyTeamId = null;
    currentApplyBtn = null;
  }

  function submitApplication() {
    const role = document.getElementById('tm-apply-role').value;
    const skills = document.getElementById('tm-apply-skills').value.trim();
    let portfolio = document.getElementById('tm-apply-portfolio').value.trim();
    const msg = document.getElementById('tm-apply-msg').value.trim();
    const errorUrl = document.getElementById('tm-apply-error-url');
    
    if (!skills || !portfolio) {
      alert("Please fill in the required fields: Skills and Portfolio.");
      return;
    }
    
    if (!/^https?:\/\//i.test(portfolio)) {
      portfolio = 'https://' + portfolio;
    }
    
    try {
      new URL(portfolio);
      errorUrl.style.display = 'none';
    } catch (_) {
      errorUrl.style.display = 'block';
      return;
    }
    
    const btnSubmit = document.getElementById('tm-apply-submit');
    btnSubmit.textContent = 'Submitting...';
    btnSubmit.disabled = true;
    
    setTimeout(() => {
      const t = TEAMS.find(x => x.id === currentApplyTeamId);
      if (t) {
        processApplyEnhanced(t, { role, skills, portfolio, msg });
        if (currentApplyBtn) {
          if (currentApplyBtn.id === 'tm-d-apply-btn') {
            currentApplyBtn.textContent = '✓ Applied — All the best!';
            currentApplyBtn.classList.add('applied');
          } else {
            currentApplyBtn.textContent = '✓ Applied';
            currentApplyBtn.classList.add('applied');
          }
        }
        renderGrid(getCurrentList());
      }
      btnSubmit.textContent = 'Submit Application';
      btnSubmit.disabled = false;
      closeApplyModal();
      
      if (window.HackToast) {
        window.HackToast.show('Application submitted successfully!', 'success');
      } else {
        alert('Application submitted successfully!');
      }
    }, 600);
  }

  function processApplyEnhanced(t, appData) {
    const currentUserEmail = (localStorage.getItem('currentUserEmail') || '').trim().toLowerCase();
    t.applied = true;
    
    let allApps = JSON.parse(localStorage.getItem('hk_applications') || '[]');
    // Prevent duplicate entries by removing old applications for this team
    allApps = allApps.filter(a => !((a.applicantId || '').trim().toLowerCase() === currentUserEmail && String(a.teamId) === String(t.id)));
    
    const newApp = {
      applicantId: currentUserEmail,
      teamId: t.id,
      role: appData.role,
      skills: appData.skills,
      portfolio: appData.portfolio,
      message: appData.msg,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    allApps.push(newApp);
    localStorage.setItem('hk_applications', JSON.stringify(allApps));

    if (t.userCreated) {
      try {
        const userTeams = JSON.parse(localStorage.getItem('hk_user_teams') || '[]');
        const ut = userTeams.find(x => x.id === t.id);
        if (ut) {
          if (!ut.applications) ut.applications = [];
          const profilesStr = localStorage.getItem('hk_profiles');
          const profiles = profilesStr ? JSON.parse(profilesStr) : {};
          const p = profiles[currentUserEmail] || { email: currentUserEmail, name: currentUserEmail };
          
          ut.applications.push({
            email: p.email,
            name: p.name,
            role: appData.role,
            skills: appData.skills,
            portfolio: appData.portfolio,
            msg: appData.msg,
            avatar: p.avatar,
            status: 'pending',
            timestamp: newApp.appliedAt
          });
          localStorage.setItem('hk_user_teams', JSON.stringify(userTeams));
        }
      } catch (e) { console.error(e); }
    } else {
      save();
    }

    if (window.Auth && window.Auth.notify && t.creatorEmail && (t.creatorEmail || '').trim().toLowerCase() !== currentUserEmail) {
      const applicantName = currentUserEmail ? currentUserEmail.split('@')[0] : 'Someone';
      window.Auth.notify(
        t.creatorEmail,
        'application_received',
        'New Application!',
        `${applicantName} applied for the ${appData.role} role in your team ${t.team}.`
      );
    }
  }

  window.ApplyModal = { open: openApplyModal, close: closeApplyModal, submit: submitApplication };

  /* ── INIT ── */
  initApplyModal();
  loadUserCreatedTeams();
  load();
  renderGrid(getCurrentList());
  setupSearch();

  window.TMCards = { openDrawer, close, applyCard, applyDrawer, getRandomAvatar, addTeam };

})();