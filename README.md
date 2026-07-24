# ⚡ GitReady: Interactive Peer-to-Peer Git & GitHub Workshop

[![Web Presentation Slides](https://img.shields.io/badge/Slides-Live%20Projector-6366f1?style=for-the-badge&logo=google-slides)](slides.html)
[![Wall of Fame](https://img.shields.io/badge/App-Wall%20of%20Fame-ec4899?style=for-the-badge&logo=github)](index.html)

**GitReady** is an open-source, hands-on workshop repository and web application designed for peer-to-peer tutoring sessions. It empowers students to learn essential Git commands (`clone`, `checkout -b`, `add`, `commit`, `push`, `pull`, and `pull request`) by actively contributing their own student card to a live collaborative web app!

---

## 🌟 What's Included

1. **`slides.html` (Web-Based Presentation Deck)**:
   - Fullscreen projector mode for the facilitator (`F` key).
   - Live URL for students to follow along on mobile/laptop without downloading files.
   - Interactive code copy buttons and slide thumbnail overview (`M` key).
2. **`index.html` (Interactive Student Wall of Fame)**:
   - Modern Glassmorphism dashboard rendering student JSON cards.
   - Live tech stack filtering, search, and participant stats counter.
   - Built-in Git cheatsheet modal.
3. **`instructions/STUDENT_GUIDE.md`**:
   - Copy-paste terminal guide for students during the hands-on session.

---

## 📋 Facilitator Checklist (Before Workshop)

1. **Fork or Push to GitHub**:
   - Push this repository to your GitHub account:
     ```bash
     git remote add origin https://github.com/your-username/git-ready.git
     git branch -M main
     git push -u origin main
     ```
2. **Enable GitHub Pages**:
   - Go to **Repository Settings** ➔ **Pages**.
   - Under **Source**, select `Deploy from a branch` ➔ Branch: `main` ➔ Folder: `/ (root)`.
   - Save! GitHub Pages will provide a live URL (e.g. `https://your-username.github.io/git-ready/slides.html`).
3. **Share the Links**:
   - Projector: Open `slides.html` and hit `F` for fullscreen.
   - Share live links with students so they can open `slides.html` on their phones/laptops!

---

## ⏱️ Recommended Workshop Agenda (60-75 Mins)

| Time | Activity | Facilitator Script / Slide Focus |
| --- | --- | --- |
| **00-10m** | **Icebreaker & Why Git?** | Present Slides 1-3. Explain `.zip` file chaos vs Git version control. |
| **10-20m** | **Setup & Clone** | Present Slides 4-6. Guide students through `git config` and `git clone <url>`. |
| **20-35m** | **Branching & Student Card** | Present Slides 7-8. Students run `git checkout -b student/name` and create `data/students/name.json`. |
| **35-45m** | **Stage, Commit & Push** | Present Slides 9-11. Students run `git add`, `git commit -m "..."`, and `git push`. |
| **45-55m** | **Live PR Merge Party!** | Present Slides 12-13. Project your screen, review Pull Requests, and merge them live on GitHub! |
| **55-65m** | **Sync & Wall Reveal** | Present Slide 14. Students run `git pull origin main` and refresh `index.html` to see everyone's card! |
| **65-75m** | **Merge Conflicts & Wrap Up** | Present Slides 15-18. Quick demo resolving `<<<<<<< HEAD` markers & Q&A. |

---

## 📂 Repository Layout

```
git-ready/
├── index.html              # Main Student Showcase Wall of Fame & Live Dashboard
├── slides.html             # Web-Based Projector Presentation Slide Engine
├── css/
│   ├── styles.css          # Core design system, Glassmorphism, animations, cards
│   └── slides.css          # Projector slide layout, typography, controls & progress bar
├── js/
│   ├── app.js              # Wall of Fame dynamic profile loader & filtering
│   ├── slides.js           # Slide deck engine (arrows, touch swipe, fullscreen, overview grid)
│   └── git-cheat-sheet.js  # Interactive Git command modal controller
├── data/
│   ├── students/           # Folder for student JSON profile contributions
│   │   ├── _template.json  # Template file for students
│   │   └── host-profile.json # Facilitator profile card
│   └── class-stats.json   # Workshop metadata
├── instructions/
│   └── STUDENT_GUIDE.md   # Student reference guide
└── README.md               # Workshop guide and facilitator instructions
```

---

## 💡 Pro Tips for Facilitators

- **Encourage Good Commit Messages**: Remind students to use clear, descriptive titles like `feat: add Alex profile card`.
- **Merge Conflicts as Learning**: If two students edit the same file, use it as a teaching moment to explain `git status` and how to resolve `<<<<<<< HEAD` markers!
- **Keep `index.html` Open**: Keep the Wall of Fame open on a second monitor or tab to show real-time progress.

Have fun teaching! 🚀
