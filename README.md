# Getting Started With Git

A repository for learning Git and GitHub by adding your profile card to the Student Attendance Gallery.

## Quick Start Guide

### 1. Fork, Clone, and Create Branch

1. Open `https://github.com/ojfornolles26/git-ready` on GitHub and click **Fork** on the top right.
2. Clone **your fork** to your laptop and switch to a feature branch:

```bash
git clone https://github.com/your-github-username/git-ready.git
cd git-ready
git checkout -b student/your-github-username
```

### 2. Add Profile Card to gallery/index.html

Open `gallery/index.html` and paste the following snippet inside `<div class="cards-grid">`:

```html
<div class="student-card" data-id="student-yourusername">
  <div class="card-header">
    <div class="avatar-circle">
      <!-- OPTIONAL: To use custom photo, uncomment below and replace with your image URL or file path: -->
      <img src="https://github.com/rjlim0619-dev.png" alt="Profile Photo" class="avatar-img">
      <svg width="20" height="20" fill="none" stroke="#787774" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
    <div class="student-meta" style="flex-grow: 1;">
      <h3>Your Full Name</h3>
      <span class="student-role">BSIT1-C2</span>
    </div>
  </div>

  <p class="student-bio">Write a short 1-2 sentence bio about yourself or your favorite tech stack!</p>

  <div class="tech-tags">
    <span class="tag">Git</span>
    <span class="tag">GitHub</span>
    <span class="tag">HTML/CSS</span>
    <span class="tag">JavaScript</span>
  </div>

  <div class="card-footer">
    <span class="quote">"git push origin main and make it happen!"</span>
    <a href="https://github.com/your-github-username" target="_blank" class="github-link">
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      @your-github-username
    </a>
  </div>
</div>
```

Replace `Your Full Name`, `BSIT1-C2`, Bio, Tech Tags, Quote, and `your-github-username` with your own details.

### 3. Commit, Push, and Create Pull Request

```bash
git add gallery/index.html
git commit -m "feat: add profile card for your-github-username"
git push origin student/your-github-username
```

Open GitHub and click **Compare & pull request**.
