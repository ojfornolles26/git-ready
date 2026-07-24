// Global helper for HTML escaping
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global Bottom Sheet Modal trigger
window.openBottomSheetModal = function(element, event) {
  if (event) {
    if (event.target && event.target.closest('.github-link')) return;
    event.stopPropagation();
  }

  const overlay = document.getElementById('bottom-sheet-overlay');
  const content = document.getElementById('sheet-content');
  const container = document.getElementById('bottom-sheet');

  if (!overlay || !content) {
    console.warn("Bottom sheet modal elements missing");
    return;
  }

  const cardEl = element ? element.closest('.student-card') : null;
  if (!cardEl) return;

  const studentId = cardEl.getAttribute('data-id');
  const allStudents = window._allStudentProfiles || [];
  const data = allStudents.find(s => s && s.id === studentId) || null;

  let name = '', role = '', bio = '', tags = '', quote = '', github = '';

  if (data && typeof data === 'object') {
    name = data.name || '';
    role = data.role || '';
    bio = data.bio || '';
    tags = (data.techStack || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    quote = data.quote || '';
    github = (data.github || '').trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').replace(/^@/, '');
  }

  // Fallback to DOM extraction if data object is missing or incomplete
  if (!name && cardEl) {
    name = cardEl.querySelector('.student-meta h3')?.textContent?.trim() || 'Student Profile';
    role = cardEl.querySelector('.student-role')?.textContent?.trim() || '';
    bio = cardEl.querySelector('.student-bio')?.textContent?.trim() || '';
    tags = cardEl.querySelector('.tech-tags')?.innerHTML || '';
    quote = cardEl.querySelector('.quote')?.textContent?.replace(/^"|"$/g, '')?.trim() || '';
    const githubAnchor = cardEl.querySelector('.github-link');
    github = githubAnchor ? (githubAnchor.getAttribute('href') || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').replace(/^@/, '') : '';
  }

  content.innerHTML = `
    <div class="sheet-full-card">
      <div class="sheet-full-header">
        <div class="sheet-avatar">
          <svg width="28" height="28" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="sheet-title-meta">
          <h2>${escapeHtml(name)}</h2>
          <span class="sheet-role">${escapeHtml(role)}</span>
        </div>
      </div>

      <div class="sheet-section">
        <div class="sheet-section-title">About / Bio</div>
        <p class="sheet-bio-text">${escapeHtml(bio)}</p>
      </div>

      ${tags ? `
      <div class="sheet-section">
        <div class="sheet-section-title">Tech Stack & Tools</div>
        <div class="tech-tags">${tags}</div>
      </div>` : ''}

      ${quote ? `
      <div class="sheet-section">
        <div class="sheet-section-title">Favorite Quote / Tagline</div>
        <div class="sheet-quote-box">"${escapeHtml(quote)}"</div>
      </div>` : ''}

      ${github ? `
      <div class="sheet-section">
        <a href="https://github.com/${escapeHtml(github)}" target="_blank" class="sheet-github-button" onclick="event.stopPropagation()">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          View GitHub Profile (@${escapeHtml(github)})
        </a>
      </div>` : ''}
    </div>
  `;

  overlay.classList.add('active');
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  overlay.style.pointerEvents = 'auto';

  if (container) {
    container.style.transform = 'translateY(0)';
  }

  document.body.classList.add('sheet-open');
  document.body.style.overflow = 'hidden';
};

window.closeBottomSheetModal = function() {
  const overlay = document.getElementById('bottom-sheet-overlay');
  const container = document.getElementById('bottom-sheet');

  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        overlay.style.display = 'none';
      }
    }, 300);
  }

  if (container) {
    container.style.transform = 'translateY(100%)';
  }

  document.body.classList.remove('sheet-open');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  const cardsGrid = document.getElementById('cards-grid');
  const searchInput = document.getElementById('search-input');
  const participantCountEl = document.getElementById('participant-count');
  const sheetCloseBtn = document.getElementById('sheet-close-btn');
  const sheetOverlay = document.getElementById('bottom-sheet-overlay');

  let allStudents = [];

  // Initial seed profile - Only 1 card (Workshop Lead) displayed initially
  const seedProfiles = [
    {
      id: "host-profile",
      name: "Workshop Lead",
      role: "Peer Tutor & Facilitator",
      bio: "Welcome to GitReady! Copy the HTML card snippet from README.md, paste it into index.html, replace the placeholders with your info, and submit a Pull Request!",
      techStack: ["Git", "GitHub", "JavaScript", "HTML/CSS", "Open Source"],
      github: "octocat",
      quote: "git commit -m 'Building future software together!'"
    }
  ];

  // Parse statically authored HTML cards directly from index.html (supports student HTML copy-paste workflow)
  function parseDOMCards() {
    if (!cardsGrid) return [];
    const domCards = Array.from(cardsGrid.querySelectorAll('.student-card'));
    const parsed = [];

    domCards.forEach(cardEl => {
      const id = cardEl.getAttribute('data-id') || `html-${Math.random().toString(36).substr(2, 8)}`;
      const name = cardEl.querySelector('.student-meta h3')?.textContent?.trim() || '';
      const role = cardEl.querySelector('.student-role')?.textContent?.trim() || '';
      const bio = cardEl.querySelector('.student-bio')?.textContent?.trim() || '';
      const tagEls = Array.from(cardEl.querySelectorAll('.tech-tags .tag'));
      const techStack = tagEls.map(t => t.textContent.trim()).filter(Boolean);
      const rawQuote = cardEl.querySelector('.quote')?.textContent?.replace(/^"|"$/g, '')?.trim() || '';
      const githubAnchor = cardEl.querySelector('.github-link');
      const rawGithub = githubAnchor ? (githubAnchor.getAttribute('href') || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').replace(/^@/, '') : '';

      if (name) {
        parsed.push({
          id,
          name,
          role,
          bio,
          techStack: techStack.length > 0 ? techStack : ["Git", "GitHub"],
          quote: rawQuote,
          github: rawGithub,
          updatedAt: Date.now()
        });
      }
    });

    return parsed;
  }

  // Fetch profiles dynamically from data/students/
  async function loadStudentProfiles() {
    const domParsedCards = parseDOMCards();

    // Set initial window profile store and stats without waiting for fetches
    const initialMap = new Map();
    seedProfiles.forEach(p => initialMap.set(p.id, p));
    domParsedCards.forEach(p => initialMap.set(p.id, p));
    allStudents = Array.from(initialMap.values());
    window._allStudentProfiles = allStudents;
    renderStats();

    try {
      const profileFiles = ['host-profile.json'];
      
      for (let i = 1; i <= 30; i++) {
        profileFiles.push(`student-${i < 10 ? '0' + i : i}.json`);
        profileFiles.push(`student-${i}.json`);
      }

      const loadedProfiles = [];

      for (const file of profileFiles) {
        try {
          const response = await fetch(`./data/students/${file}?t=${Date.now()}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.name && !data.id.includes('template') && data.id !== 'host-profile') {
              if (!data.updatedAt && !data.timestamp) {
                data.updatedAt = Date.now();
              }
              loadedProfiles.push(data);
            }
          }
        } catch (e) {
          // Ignore missing files
        }
      }

      if (loadedProfiles.length > 0) {
        loadedProfiles.reverse();

        const profileMap = new Map();
        seedProfiles.forEach(p => profileMap.set(p.id, p));
        domParsedCards.forEach(p => profileMap.set(p.id, p));
        loadedProfiles.forEach(p => profileMap.set(p.id, p));

        allStudents = Array.from(profileMap.values());

        allStudents.sort((a, b) => {
          if (a.id === 'host-profile') return -1; // Host card stays first
          if (b.id === 'host-profile') return 1;
          const timeA = typeof a.updatedAt === 'number' ? a.updatedAt : (new Date(a.updatedAt || 0).getTime() || 0);
          const timeB = typeof b.updatedAt === 'number' ? b.updatedAt : (new Date(b.updatedAt || 0).getTime() || 0);
          return timeB - timeA;
        });

        window._allStudentProfiles = allStudents;
        renderStats();
        renderCards(allStudents);
      }

    } catch (err) {
      console.warn("Using DOM parsed and seed profiles:", err);
    }
  }

  function renderStats() {
    const totalCards = cardsGrid ? cardsGrid.querySelectorAll('.student-card').length : 0;
    if (participantCountEl) participantCountEl.textContent = totalCards;
  }

  function renderCards(students) {
    if (!cardsGrid) return;

    if (students.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No student cards found!</p>
          <p style="font-size: 0.9rem;">Be the first to push a PR and add your profile!</p>
        </div>
      `;
      return;
    }

    cardsGrid.innerHTML = students.map(student => {
      const tags = (student.techStack || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const rawHandle = (student.github || '').trim().replace(/^@/, '');
      const handle = escapeHtml(rawHandle || 'anonymous');

      return `
        <div class="student-card" data-id="${escapeHtml(student.id)}" onclick="window.openBottomSheetModal(this, event)">
          <div class="card-header">
            <div class="avatar-circle">
              <svg width="20" height="20" fill="none" stroke="#787774" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="student-meta" style="flex-grow: 1;">
              <h3>${escapeHtml(student.name)}</h3>
              <span class="student-role">${escapeHtml(student.role)}</span>
            </div>
            <span class="card-expand-hint" title="Click to view full card details">Expand ↗</span>
          </div>

          <p class="student-bio">${escapeHtml(student.bio)}</p>

          <div class="tech-tags">
            ${tags}
          </div>

          <div class="card-footer">
            <span class="quote">"${escapeHtml(student.quote || 'Ready to code!')}"</span>
            <a href="https://github.com/${handle}" target="_blank" class="github-link" onclick="event.stopPropagation()">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              @${handle}
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterAndRender() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    if (!query) {
      renderCards(allStudents);
      return;
    }

    const filtered = allStudents.filter(student => {
      const name = (student.name || '').toLowerCase();
      const role = (student.role || '').toLowerCase();
      const bio = (student.bio || '').toLowerCase();
      const handle = (student.github || '').toLowerCase();
      const tech = Array.isArray(student.techStack) ? student.techStack.join(' ').toLowerCase() : '';

      return name.includes(query) || role.includes(query) || bio.includes(query) || handle.includes(query) || tech.includes(query);
    });

    renderCards(filtered);
  }

  if (sheetCloseBtn) {
    sheetCloseBtn.addEventListener('click', window.closeBottomSheetModal);
  }

  if (sheetOverlay) {
    sheetOverlay.addEventListener('click', (e) => {
      if (e.target === sheetOverlay) window.closeBottomSheetModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeBottomSheetModal();
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterAndRender);
  }

  if (cardsGrid) {
    cardsGrid.addEventListener('click', (e) => {
      if (e.target.closest('.github-link')) return;
      const card = e.target.closest('.student-card');
      if (card) {
        window.openBottomSheetModal(card, e);
      }
    });
  }

  loadStudentProfiles();
});
