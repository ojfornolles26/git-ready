document.addEventListener('DOMContentLoaded', () => {
  const cardsGrid = document.getElementById('cards-grid');
  const searchInput = document.getElementById('search-input');
  const filterChipsContainer = document.getElementById('filter-chips');
  const participantCountEl = document.getElementById('participant-count');
  const techCountEl = document.getElementById('tech-count');

  let allStudents = [];
  let selectedFilter = 'All';

  // Sample seed profiles to render gracefully even in offline/file:// mode
  const seedProfiles = [
    {
      id: "host-profile",
      name: "Workshop Lead",
      role: "Peer Tutor & Facilitator 🚀",
      bio: "Welcome to GitReady! Clone this repository, create your feature branch, add your JSON profile under data/students/, and submit a Pull Request!",
      techStack: ["Git", "GitHub", "JavaScript", "HTML/CSS", "Open Source"],
      github: "octocat",
      cardColor: "#6366f1",
      emoji: "🎓",
      quote: "git commit -m 'Building future software together!'"
    },
    {
      id: "sample-student-1",
      name: "Jordan Lee",
      role: "Computer Science Sophomore",
      bio: "First time collaborating on GitHub! Passionate about web design and machine learning.",
      techStack: ["Python", "JavaScript", "React", "Git"],
      github: "jordanlee-dev",
      cardColor: "#ec4899",
      emoji: "💻",
      quote: "git push origin main and watch it glow!"
    },
    {
      id: "sample-student-2",
      name: "Sam Rivera",
      role: "Frontend Enthusiast",
      bio: "Building UI components and learning how Git branch merges work in team projects.",
      techStack: ["HTML/CSS", "JavaScript", "Vue", "Tailwind"],
      github: "samrivera-code",
      cardColor: "#10b981",
      emoji: "⚡",
      quote: "Branch twice, merge once!"
    }
  ];

  // Fetch profiles from data/students/
  async function loadStudentProfiles() {
    try {
      // List of candidate JSON filenames to attempt fetching
      const profileFiles = [
        'host-profile.json',
        '_template.json'
      ];

      const loadedProfiles = [];

      for (const file of profileFiles) {
        try {
          const response = await fetch(`./data/students/${file}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.name && !data.id.includes('template')) {
              loadedProfiles.push(data);
            }
          }
        } catch (e) {
          // Ignore individual fetch errors (e.g. CORS on file://)
        }
      }

      // Combine seed profiles with loaded ones, avoiding duplicates by id
      const profileMap = new Map();
      [...seedProfiles, ...loadedProfiles].forEach(p => profileMap.set(p.id, p));
      allStudents = Array.from(profileMap.values());

    } catch (err) {
      console.warn("Using default seed profiles for preview:", err);
      allStudents = seedProfiles;
    }

    renderStats();
    buildFilterChips();
    renderCards(allStudents);
  }

  // Calculate and render statistics
  function renderStats() {
    if (participantCountEl) participantCountEl.textContent = allStudents.length;

    const uniqueTech = new Set();
    allStudents.forEach(s => {
      if (Array.isArray(s.techStack)) {
        s.techStack.forEach(t => uniqueTech.add(t));
      }
    });

    if (techCountEl) techCountEl.textContent = uniqueTech.size;
  }

  // Build filter chips based on tech stacks present
  function buildFilterChips() {
    if (!filterChipsContainer) return;

    const techCounts = {};
    allStudents.forEach(s => {
      if (Array.isArray(s.techStack)) {
        s.techStack.forEach(t => {
          techCounts[t] = (techCounts[t] || 0) + 1;
        });
      }
    });

    const topTechs = Object.keys(techCounts)
      .sort((a, b) => techCounts[b] - techCounts[a])
      .slice(0, 6);

    const categories = ['All', ...topTechs];

    filterChipsContainer.innerHTML = categories.map(cat => `
      <button class="chip ${cat === selectedFilter ? 'active' : ''}" data-tech="${cat}">
        ${cat}
      </button>
    `).join('');

    filterChipsContainer.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedFilter = e.target.getAttribute('data-tech');
        filterChipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        filterAndRender();
      });
    });
  }

  // Filter cards by search query & filter chip
  function filterAndRender() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    const filtered = allStudents.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(query) ||
        student.role.toLowerCase().includes(query) ||
        student.bio.toLowerCase().includes(query) ||
        (student.techStack && student.techStack.some(t => t.toLowerCase().includes(query)));

      const matchesFilter = 
        selectedFilter === 'All' || 
        (student.techStack && student.techStack.includes(selectedFilter));

      return matchesSearch && matchesFilter;
    });

    renderCards(filtered);
  }

  // Render cards grid HTML
  function renderCards(students) {
    if (!cardsGrid) return;

    if (students.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No student cards found matching your search!</p>
          <p style="font-size: 0.9rem;">Be the first to push a PR and add your profile!</p>
        </div>
      `;
      return;
    }

    cardsGrid.innerHTML = students.map(student => {
      const color = student.cardColor || '#6366f1';
      const emoji = student.emoji || '🚀';
      const tags = (student.techStack || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');

      return `
        <div class="student-card animate-fade-in" style="--card-accent-color: ${color}">
          <div class="card-header">
            <div class="avatar-circle" style="border-color: ${color}">
              ${emoji}
            </div>
            <div class="student-meta">
              <h3>${escapeHtml(student.name)}</h3>
              <span class="student-role">${escapeHtml(student.role)}</span>
            </div>
          </div>

          <p class="student-bio">${escapeHtml(student.bio)}</p>

          <div class="tech-tags">
            ${tags}
          </div>

          <div class="card-footer">
            <span class="quote">"${escapeHtml(student.quote || 'Ready to code!')}"</span>
            <a href="https://github.com/${escapeHtml(student.github)}" target="_blank" class="github-link">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              @${escapeHtml(student.github)}
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Utility to prevent XSS
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', filterAndRender);
  }

  // Initialize
  loadStudentProfiles();
});
