# Getting Started With Git 🚀

> Learn Git by doing! Together, we'll collaborate live and see everyone's contributions come to life on a shared web application.

Welcome to the **"Getting Started With Git"** live hands-on workshop repository!

---

## 🛠️ Workshop Quick Start Guide

### Step 1: Clone the Repository & Create Your Branch
Open your terminal (Terminal on Mac/Linux, Git Bash or Command Prompt on Windows) and run:

```bash
# 1. Clone this repository
git clone https://github.com/your-org/git-ready.git

# 2. Navigate into the repository directory
cd git-ready

# 3. Create your own feature branch
git checkout -b student/your-github-username
```

---

### Step 2: Add Your Profile Card to `index.html`

1. Open **`index.html`** in your code editor (e.g. VS Code, Sublime Text, or Notepad).
2. Find the `<div class="cards-grid" id="cards-grid">` section.
3. **Copy the HTML Card Code Snippet below** and paste it at the top of `<div class="cards-grid">`:

```html
<!-- ==================== STUDENT CARD SNIPPET ==================== -->
<div class="student-card">
  <div class="card-header">
    <div class="avatar-circle">
      <svg width="20" height="20" fill="none" stroke="#787774" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
    <div class="student-meta">
      <h3>Your Full Name</h3>
      <span class="student-role">Computer Science Student</span>
    </div>
  </div>

  <p class="student-bio">Write a short 1-2 sentence bio about yourself, your goals, or your favorite coding topic!</p>

  <div class="tech-tags">
    <span class="tag">Git</span>
    <span class="tag">GitHub</span>
    <span class="tag">HTML/CSS</span>
    <span class="tag">JavaScript</span>
  </div>

  <div class="card-footer">
    <span class="quote">"git push origin main and watch it glow!"</span>
    <a href="https://github.com/your-github-username" target="_blank" class="github-link">
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      @your-github-username
    </a>
  </div>
</div>
<!-- ============================================================== -->
```

4. Replace the placeholders with your own details:
   - **`Your Full Name`**: Replace with your real name.
   - **`Computer Science Student`**: Replace with your role, major, or title.
   - **Bio**: Write a 1-2 sentence introduction about yourself.
   - **Tech Tags**: Edit `<span class="tag">...</span>` with technologies you like or are learning.
   - **Quote**: Add your favorite developer quote or tagline.
   - **GitHub Handle**: Replace `your-github-username` in the `href` link and `@your-github-username` text.

---

### Step 3: Stage, Commit, and Push Your Branch

Return to your terminal and run:

```bash
# 1. Stage your changes
git add index.html

# 2. Commit your snapshot
git commit -m "feat: add profile card for your-github-username"

# 3. Push your branch to GitHub
git push origin student/your-github-username
```

---

### Step 4: Submit a Pull Request

1. Go to the repository on GitHub in your web browser.
2. Click **"Compare & pull request"**.
3. Title your PR: `feat: add profile card for [Your Name]`.
4. Click **"Create pull request"**!

Once the workshop facilitator merges your PR, refresh the **Student Attendance Gallery** webpage to see your profile card live at the top of the gallery! 🎉
