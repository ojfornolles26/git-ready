# Getting Started With Git — Workshop Facilitator Guide

Welcome! This guide outlines the exact step-by-step workflow and schedule for hosting your **10:00 AM – 12:30 PM (2.5 Hours)** live collaborative workshop.

---

## Official Workshop Schedule (10:00 AM – 12:30 PM)

| Time Slot | Phase | Focus / Activity |
| :--- | :--- | :--- |
| **10:00 AM – 10:15 AM** (15 mins) | **Welcome & Setup** | Participant check-in, wifi setup, opening remarks. |
| **10:15 AM – 10:55 AM** (40 mins) | **Interactive Slides** | Present `slides/index.html` covering Git & GitHub concepts. |
| **10:55 AM – 11:15 AM** (20 mins) | **Live Facilitator Demo** | Live demonstration of cloning, editing `gallery/index.html`, & PRs. |
| **11:15 AM – 12:00 PM** (45 mins) | **Student Hands-On** | Students work on laptops, add HTML card, push branch & PR. |
| **12:00 PM – 12:20 PM** (20 mins) | **Live PR Merge Showcase** | Facilitator merges PRs on projector & pulls live updates. |
| **12:20 PM – 12:30 PM** (10 mins) | **Q&A & Group Photo** | Key takeaways, resources for further learning, and wrap-up. |

---

## Step-by-Step Workshop Flow

### Step 1: Present the Slides (`slides/index.html`) — 40 Mins
1. Open `slides/index.html` in your web browser and press `F` for Fullscreen projector view.
2. Walk students through the 28 slides organized into clear phases:

   * **PART 1: Conceptual Foundations (Slides 1–8)** — *Lecture / Discussion Mode (No Terminal Typing)*
     - **Slide 1–3**: Introduction to Git (Local Engine) and GitHub (Cloud Platform).
     - **Slide 4**: **Git vs. GitHub Comparison Matrix** (Explaining Local vs Cloud, Offline vs Online, Terminal vs Web UI).
     - **Slide 5–7**: Why Version Control matters, the 3 Local Git Areas (table breakdown), and `git init` vs `git clone`.
     - **Slide 8**: Complete Collaboration Workflow Overview (Fork -> Clone -> Branch -> Edit -> Commit -> Push -> PR -> Pull).

   * **TRANSITION CUE (Slide 9)** — *Live Hands-On Activity Starts Now!*
     - Tell the room: *"Theory is done! Open your Terminal / Command Prompt and VS Code."*

   * **PART 2: Live Hands-On Activity (Slides 10–23)** — *Interactive Step-by-Step Typing*
     - **Slide 10–14**: Environment setup (`git --version`), Fork & Clone (`git clone`), `git status`, `git diff` / `git log`, and feature branching (`git switch -c`).
     - **Slide 15–18**: Editing `gallery/index.html`, staging (`git add`), committing (`git commit`), and safety net (`git restore`).
     - **Slide 19–23**: Pushing (`git push`), opening Pull Requests, live review showcase, and syncing classmate profile cards (`git pull`).

   * **PART 3: Wrap-Up & Conclusion (Slides 24–28)**
     - **Slide 24–27**: Merge conflicts, core best practices, Q&A, and summary.
     - **Slide 28**: **Standalone Celebration Slide** — *"You're Officially Git Ready!"* with a direct CTA button to open the live **Student Attendance Gallery** on the projector screen!

> [!TIP]
> Emphasize to students that typing terminal commands manually builds muscle memory. The slides intentionally block clipboard copying for code snippets to enforce hands-on practice!

---

### Step 2: Live Facilitator Demonstration — 20 Mins
Before letting students type on their own, share your projector screen and demonstrate the exact sequence live:

1. **Show the Wall**: Open `gallery/index.html` on your screen — point out that there is currently **1 card** (yours as the Workshop Lead).
2. **Demonstrate Repository Setup & Terminal Commands**:
   - Open repository on GitHub and click **Fork** (top right).
   ```bash
   # 1. Clone YOUR fork
   git clone https://github.com/your-username/git-ready.git
   cd git-ready

   # 2. Create a feature branch using modern git switch (or git checkout -b)
   git switch -c student/your-name
   ```
3. **Show File Editing & Inspection**:
   - Open `gallery/index.html` in VS Code, paste HTML snippet inside `<div class="cards-grid">`, change values, and save.
   - Run `git status` and `git diff` to show live line changes on the projector screen!
4. **Stage, Commit, & Safety Net (`git restore`)**:
   - Show how `git restore` can undo a typo, then stage and commit:
   ```bash
   git add gallery/index.html
   git commit -m "feat: add my profile card"
   git log --oneline
   git push origin student/your-name
   ```
5. **Open Pull Request**: Navigate to your fork on GitHub and click **"Compare & pull request"** back to the main repository.

---

### Step 3: Student Hands-On Activity — 30 Mins
1. Share the GitHub repository URL on the screen or in class chat.
2. Remind students to click **Fork** first before copying the clone URL from their own fork profile page.
3. Circulate around the room with co-facilitators/tutors to help students with:
   - Git CLI installation or terminal navigation issues.
   - Ensuring they are editing `gallery/index.html` or creating profile card HTML.
   - Resolving typos in Git commands.

---

### Step 4: Live PR Merging & Celebration — 10 Mins
1. Keep the **Student Attendance Gallery** (`gallery/index.html`) displayed on the main projector screen.
2. As students submit Pull Requests from their forks:
   - Click **"Merge Pull Request"** on GitHub.
   - Run `git pull origin main` on your facilitator laptop.
   - **Refresh `gallery/index.html` on the projector screen!**
3. Watch the room light up as each student's card instantly pops up **at the top of the gallery grid** in real-time, incrementing the live participant counter!

---

## Quick Facilitator Cheat Sheet

| Situation | Solution |
| :--- | :--- |
| **Student gets `403 Permission Denied` on push** | Check if they cloned the instructor repo directly instead of cloning their own fork! Have them update remote URL: `git remote set-url origin https://github.com/<their-username>/git-ready.git`. |
| **Student has merge conflicts** | Guide them to run `git pull origin main` on their branch, resolve conflicts, commit, and push. |
| **Card not showing after pull** | Check if HTML snippet was pasted inside `<div class="cards-grid" id="cards-grid">` in `gallery/index.html`. |
