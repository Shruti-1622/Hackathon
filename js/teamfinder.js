// Team Finder & Creation Interactivity (localStorage based)

// Default seed data for active hackathon teams
const defaultTeams = [
    {
        id: "team-1",
        name: "AI Innovators",
        leader: "Sarah Chen",
        hackathon: "AI for Social Good",
        totalParticipants: 4,
        joinedCount: 2,
        roles: ["ML Engineer", "Frontend"],
        description: "Building a localized AI companion assistant to help senior citizens track prescriptions and connect with care supervisors."
    },
    {
        id: "team-2",
        name: "Web3 Wizards",
        leader: "Alex Johnson",
        hackathon: "BlockchainBuild",
        totalParticipants: 3,
        joinedCount: 1,
        roles: ["Web3 Developer", "UI/UX"],
        description: "Creating a secure decentralized micro-lending protocol on Layer-2 with group guarantees and low interest rates."
    },
    {
        id: "team-3",
        name: "Cloud Sentinels",
        leader: "Raj Patel",
        hackathon: "DevHack Summit",
        totalParticipants: 5,
        joinedCount: 3,
        roles: ["Backend", "DevOps"],
        description: "Developing a containerized resource monitoring mesh that optimizes cluster load metrics on a per-second schedule."
    },
    {
        id: "team-4",
        name: "Nexus Mobile",
        leader: "Emma Wilson",
        hackathon: "InnovateMobile",
        totalParticipants: 4,
        joinedCount: 2,
        roles: ["Frontend", "UI/UX"],
        description: "Creating a cross-platform localized mobile marketplace app for peer-to-peer textbook and tool rentals."
    }
];

// Helper functions for LocalStorage management
function getTeams() {
    const saved = localStorage.getItem("hackhub_teams");
    if (!saved) {
        localStorage.setItem("hackhub_teams", JSON.stringify(defaultTeams));
        return defaultTeams;
    }
    return JSON.parse(saved);
}

function saveTeams(teams) {
    localStorage.setItem("hackhub_teams", JSON.stringify(teams));
}

function getAppliedTeams() {
    const saved = localStorage.getItem("applied_teams");
    return saved ? JSON.parse(saved) : [];
}

function saveAppliedTeams(applied) {
    localStorage.setItem("applied_teams", JSON.stringify(applied));
}

// Render dynamic team cards in the main section grid
function renderTeams() {
    const teamsGrid = document.getElementById("teams-grid");
    if (!teamsGrid) return;

    const teams = getTeams();
    const appliedTeams = getAppliedTeams();

    // Get current filter/search values
    const query = document.querySelector('.search-input')?.value.toLowerCase() || "";
    const selectedRole = document.getElementById("filter-role")?.value || "";
    const selectedHackathon = document.getElementById("filter-hackathon")?.value || "";
    const selectedSpots = document.getElementById("filter-spots")?.value || "";

    teamsGrid.innerHTML = "";

    const filteredTeams = teams.filter(team => {
        // Search query check
        const matchQuery = team.name.toLowerCase().includes(query) ||
            team.leader.toLowerCase().includes(query) ||
            team.hackathon.toLowerCase().includes(query) ||
            team.description.toLowerCase().includes(query) ||
            team.roles.some(r => r.toLowerCase().includes(query));

        // Role check
        const matchRole = !selectedRole || team.roles.includes(selectedRole);

        // Hackathon check
        const matchHackathon = !selectedHackathon || team.hackathon === selectedHackathon;

        // Spots check
        const slotsLeft = team.totalParticipants - team.joinedCount;
        let matchSpots = true;
        if (selectedSpots === "open") {
            matchSpots = slotsLeft > 0;
        } else if (selectedSpots === "full") {
            matchSpots = slotsLeft <= 0;
        }

        return matchQuery && matchRole && matchHackathon && matchSpots;
    });

    if (filteredTeams.length === 0) {
        teamsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 40px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; backdrop-filter: blur(10px);">
                <p style="color: #94A3B8; font-size: 1.1rem; margin-bottom: 0;">No active teams match your search filters.</p>
            </div>
        `;
        return;
    }

    filteredTeams.forEach(team => {
        const slotsLeft = team.totalParticipants - team.joinedCount;
        const hasApplied = appliedTeams.includes(team.id);
        const isFull = slotsLeft <= 0;

        const skillsMarkup = team.roles.map(r => `<span class="skill">${r}</span>`).join('');

        // Button state CSS & content styling
        let btnText = "Apply to Team";
        let btnStyle = "";
        let btnDisabled = "";

        if (hasApplied) {
            btnText = "✓ Applied";
            btnStyle = "background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10B981; box-shadow: 0 0 20px rgba(16, 185, 129, 0.15); pointer-events: none;";
            btnDisabled = "disabled";
        } else if (isFull) {
            btnText = "Team Full";
            btnStyle = "background: rgba(148, 163, 184, 0.06); border: 1px solid rgba(148, 163, 184, 0.15); color: #94A3B8; pointer-events: none;";
            btnDisabled = "disabled";
        }

        const card = document.createElement("div");
        card.className = "developer-card";
        card.style.minHeight = "360px";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.innerHTML = `
            <div class="dev-status ${isFull ? 'offline' : 'online'}"></div>
            <div class="dev-content" style="padding: 25px; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1; box-sizing: border-box;">
                <div>
                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.2px; color: #8B5CF6; font-weight: 800; display: block; margin-bottom: 8px;">
                        🏆 ${team.hackathon}
                    </span>
                    <h3 style="margin-bottom: 6px; font-size: 1.35rem; color: #F8FAFC;">${team.name}</h3>
                    <p class="dev-role" style="font-size: 0.88rem; margin-bottom: 12px; font-weight: 600; color: #94A3B8;">
                        Leader: <span style="color: #CBD5E1;">${team.leader}</span>
                    </p>
                    <p class="dev-bio" style="font-size: 0.9rem; line-height: 1.55; color: #CBD5E1; margin-bottom: 18px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 4.6em;">
                        ${team.description}
                    </p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 18px;">
                        <span style="font-size: 0.85rem; color: #94A3B8;">Slots Available:</span>
                        <span style="font-size: 0.88rem; font-weight: 700; color: ${isFull ? '#E11D48' : '#10B981'};">
                            👥 ${team.joinedCount} / ${team.totalParticipants} Joined (${isFull ? 'Full' : slotsLeft + ' left'})
                        </span>
                    </div>
                </div>
                
                <div>
                    <div class="dev-skills" style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;">
                        ${skillsMarkup}
                    </div>
                    <button class="connect-btn" ${btnDisabled} style="width: 100%; transition: all 0.3s; ${btnStyle}" onclick="applyTeam('${team.id}')">
                        ${btnText}
                    </button>
                </div>
            </div>
        `;
        teamsGrid.appendChild(card);
    });
}

// Click Apply handler
window.applyTeam = function (teamId) {
    const applied = getAppliedTeams();
    if (!applied.includes(teamId)) {
        applied.push(teamId);
        saveAppliedTeams(applied);
        renderTeams();

        // Show sleek modern notification
        const notice = document.createElement("div");
        notice.style.position = "fixed";
        notice.style.bottom = "24px";
        notice.style.right = "24px";
        notice.style.background = "rgba(16, 185, 129, 0.92)";
        notice.style.color = "white";
        notice.style.padding = "16px 24px";
        notice.style.borderRadius = "12px";
        notice.style.backdropFilter = "blur(12px)";
        notice.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.4)";
        notice.style.zIndex = "3000";
        notice.style.fontWeight = "600";
        notice.style.fontSize = "0.95rem";
        notice.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        notice.style.opacity = "0";
        notice.style.transform = "translateY(20px)";
        notice.innerText = "✓ Application successfully sent to the team leader!";

        document.body.appendChild(notice);
        setTimeout(() => {
            notice.style.opacity = "1";
            notice.style.transform = "translateY(0)";
        }, 50);

        setTimeout(() => {
            notice.style.opacity = "0";
            notice.style.transform = "translateY(20px)";
            setTimeout(() => {
                notice.remove();
            }, 500);
        }, 3000);
    }
};

// Modal trigger handling
const openModalBtn = document.getElementById("open-create-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modal = document.getElementById("create-team-modal");

if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // block background scroll
    });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    // Close on overlay backing click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });
}

// Form Submission handling
const createTeamForm = document.getElementById("create-team-form");
if (createTeamForm) {
    createTeamForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const teamName = document.getElementById("modal-team-name").value.trim();
        const leaderName = document.getElementById("modal-leader-name").value.trim();
        const hackathon = document.getElementById("modal-hackathon").value;
        const totalParticipants = parseInt(document.getElementById("modal-total-participants").value) || 4;
        const joinedCount = parseInt(document.getElementById("modal-joined-count").value) || 1;
        const description = document.getElementById("modal-description").value.trim() || "Building a high-impact solution and shooting for the top podium places!";

        // Fetch selected roles
        const checkedRoles = [];
        document.querySelectorAll(".role-checkbox:checked").forEach(checkbox => {
            checkedRoles.push(checkbox.value);
        });

        if (checkedRoles.length === 0) {
            checkedRoles.push("Developer"); // Default fallback
        }

        const newTeam = {
            id: "team-" + Date.now(),
            name: teamName,
            leader: leaderName,
            hackathon: hackathon,
            totalParticipants: totalParticipants,
            joinedCount: joinedCount,
            roles: checkedRoles,
            description: description
        };

        const teams = getTeams();
        teams.unshift(newTeam); // prepend newly created team
        saveTeams(teams);

        // Reset form inputs & close active overlay modal
        createTeamForm.reset();
        modal.style.display = "none";
        document.body.style.overflow = "";

        // Update teams list view instantly
        renderTeams();

        // Display sleek custom success toast banner
        const toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.bottom = "24px";
        toast.style.right = "24px";
        toast.style.background = "linear-gradient(90deg, #8B5CF6, #3B82F6)";
        toast.style.color = "white";
        toast.style.padding = "16px 24px";
        toast.style.borderRadius = "12px";
        toast.style.backdropFilter = "blur(12px)";
        toast.style.boxShadow = "0 10px 30px rgba(139, 92, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.4)";
        toast.style.zIndex = "3000";
        toast.style.fontWeight = "700";
        toast.style.fontSize = "0.95rem";
        toast.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.innerText = "🚀 Your team has been successfully launched and listed!";

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 50);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    });
}

// Live Search & Filter input triggers
document.querySelector('.search-input')?.addEventListener('input', renderTeams);
document.getElementById('filter-role')?.addEventListener('change', renderTeams);
document.getElementById('filter-hackathon')?.addEventListener('change', renderTeams);
document.getElementById('filter-spots')?.addEventListener('change', renderTeams);

// Run initial rendering pass when loaded
document.addEventListener("DOMContentLoaded", () => {
    renderTeams();
});

console.log("Interactive Teams Directory initialized successfully.");

