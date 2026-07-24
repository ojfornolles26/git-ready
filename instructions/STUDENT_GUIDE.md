# 🎓 GitReady Student Hands-On Guide

Welcome to the **Git & GitHub Peer-to-Peer Workshop**! Follow this step-by-step guide during our hands-on live session.

---

## 🚀 Quick Step-by-Step Cheatsheet

### Step 1: Check Git Installation & Setup Identity
Open your **Terminal** (Mac/Linux) or **Git Bash** (Windows) and type:

```bash
# Check if Git is installed
git --version

# Set your name and email (used for your commit signature)
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

---

### Step 2: Clone the Workshop Repository
Get a local copy of the project on your computer:

```bash
# Clone the repository
git clone https://github.com/your-username/git-ready.git

# Enter the project folder
cd git-ready
```

> 💡 **Tip**: Open the `index.html` file in your browser to view the Wall of Fame!

---

### Step 3: Create Your Personal Feature Branch
Never code directly on the `main` branch. Create your own isolated branch:

```bash
git checkout -b student/your-github-username
```

To double check which branch you are on:
```bash
git branch
```

---

### Step 4: Add Your Student Profile Card
1. Open the project folder in **VS Code** (or your favorite text editor).
2. Look inside the `data/students/` directory.
3. Create a new file named: `data/students/your-github-username.json`.
4. Copy and fill in the following template:

```json
{
  "id": "your-github-username",
  "name": "Alex Rivera",
  "role": "CS Student / Developer Learner",
  "bio": "Excited to learn Git and collaborate on web projects!",
  "techStack": ["JavaScript", "HTML", "CSS", "Python"],
  "github": "your-github-username",
  "cardColor": "#6366f1",
  "emoji": "🚀",
  "quote": "git push origin main and watch it glow!"
}
```

---

### Step 5: Check Status, Stage, and Commit

```bash
# Check modified files (your file will show in red as untracked)
git status

# Stage your new profile JSON file
git add data/students/your-github-username.json

# Check status again (your file should now be green!)
git status

# Save your snapshot with a commit message
git commit -m "feat: add student profile for [Your Name]"
```

---

### Step 6: Push to GitHub & Open a Pull Request (PR)

```bash
# Push your feature branch up to GitHub
git push origin student/your-github-username
```

1. Open the repository page on **GitHub** in your web browser.
2. Click the green **"Compare & pull request"** button.
3. Add a clear title: `feat: add student profile for [Your Name]`.
4. Click **Create pull request**!

---

### Step 7: Live Merge & Sync (`git pull`)
Once the workshop lead reviews and merges your Pull Request live on screen:

```bash
# Switch back to the main branch
git checkout main

# Fetch and merge all your classmates' cards onto your computer!
git pull origin main
```

Refresh `index.html` in your browser to see all your classmates' cards render live! 🎉

---

## 🛠️ Common Troubleshooting

### 1. "Permission Denied (publickey)" or Password Prompt
If GitHub asks for credentials, ensure you use a **Personal Access Token (PAT)** or HTTPS URL:
```bash
git remote set-url origin https://github.com/your-username/git-ready.git
```

### 2. Made a Typo in Your Last Commit Message?
```bash
git commit --amend -m "feat: correct commit message"
```

### 3. Stuck in Vim / Editor?
If your terminal opens a full-screen text editor, type `:wq` and press `Enter` to save and exit.
