# ⚡ Getting Started With Git: Interactive Peer-to-Peer Workshop

[![Web Presentation Slides](https://img.shields.io/badge/Slides-Live%20Projector-4f46e5?style=for-the-badge&logo=google-slides)](slides.html)
[![Wall of Fame](https://img.shields.io/badge/App-Wall%20of%20Fame-059669?style=for-the-badge&logo=github)](index.html)

**Getting Started With Git** is an open-source, hands-on workshop repository and web application designed for peer-to-peer tutoring sessions. It empowers students to learn essential Git commands (`clone`, `checkout -b`, `add`, `commit`, `push`, `pull`, and `pull request`) by actively contributing their own student card to a live collaborative web app!

---

## 🌟 What's Included

1. **`slides.html` (Web-Based Presentation Deck)**:
   - Minimalist, light-theme single-page scrollable slides.
   - Floating bottom navigation bar with live slide counter (`01 / 18`) and section jump selector.
   - Copyable code blocks for students following along live.
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
   - Open `slides.html` on your projector and project it on screen.
   - Share live links with students so they can open `slides.html` on their phones/laptops!

---

## ⏱️ Recommended Workshop Agenda (60-75 Mins)

| Time | Activity | Facilitator Script / Slide Focus |
| --- | --- | --- |
| **00-10m** | **Icebreaker & Why Git?** | Slides 1-3. Explain `.zip` file chaos vs Git version control. |
| **10-20m** | **Setup & Clone** | Slides 4-6. Guide students through `git config` and `git clone <url>`. |
| **20-35m** | **Branching & Student Card** | Slides 7-8. Students run `git checkout -b student/name` and create `data/students/name.json`. |
| **35-45m** | **Stage, Commit & Push** | Slides 9-11. Students run `git add`, `git commit -m "..."`, and `git push`. |
| **45-55m** | **Live PR Merge Party!** | Slides 12-13. Project your screen, review Pull Requests, and merge them live on GitHub! |
| **55-65m** | **Sync & Wall Reveal** | Slide 14. Students run `git pull origin main` and refresh `index.html` to see everyone's card! |
| **65-75m** | **Merge Conflicts & Wrap Up** | Slides 15-18. Quick demo resolving `<<<<<<< HEAD` markers & Q&A. |

---

Have fun teaching **Getting Started With Git**! 🚀
