document.addEventListener('DOMContentLoaded', () => {
  const cardsGrid = document.getElementById('cards-grid');
  const participantCountEl = document.getElementById('participant-count');

  let allStudents = [];

  // Seed list of 30 realistic participant profiles to simulate a full workshop room of 30 students
  const seedProfiles = [
    {
      id: "host-profile",
      name: "Workshop Lead",
      role: "Peer Tutor & Facilitator",
      bio: "Welcome to GitReady! Clone this repository, create your feature branch, add your JSON profile under data/students/, and submit a Pull Request!",
      techStack: ["Git", "GitHub", "JavaScript", "HTML/CSS", "Open Source"],
      github: "octocat",
      quote: "git commit -m 'Building future software together!'"
    },
    {
      id: "student-01",
      name: "Jordan Lee",
      role: "Computer Science Major",
      bio: "First time collaborating on GitHub! Excited to build open source projects and learn team workflows.",
      techStack: ["Python", "JavaScript", "React", "Git"],
      github: "jordanlee-dev",
      quote: "git push origin main and make it happen!"
    },
    {
      id: "student-02",
      name: "Sam Rivera",
      role: "Frontend Enthusiast",
      bio: "Building responsive web apps and mastering Git branch management for hackathons.",
      techStack: ["HTML/CSS", "JavaScript", "Vue", "Tailwind"],
      github: "samrivera-code",
      quote: "Branch twice, merge once!"
    },
    {
      id: "student-03",
      name: "Alex Chen",
      role: "Software Engineering Student",
      bio: "Passionate about full-stack web development, REST APIs, and automated testing.",
      techStack: ["TypeScript", "Node.js", "Express", "PostgreSQL"],
      github: "alexchen-dev",
      quote: "Code clean, commit early!"
    },
    {
      id: "student-04",
      name: "Maya Patel",
      role: "AI & Data Science Student",
      bio: "Exploring machine learning models, Python data pipelines, and collaborative data science.",
      techStack: ["Python", "Pandas", "PyTorch", "Git"],
      github: "mayapatel-ai",
      quote: "Data-driven development all the way!"
    },
    {
      id: "student-05",
      name: "David Kim",
      role: "Cybersecurity Major",
      bio: "Focusing on secure coding practices, ethical hacking, and open source security tools.",
      techStack: ["C++", "Python", "Linux", "Bash"],
      github: "davidkim-sec",
      quote: "Keep commits atomic and code secure!"
    },
    {
      id: "student-06",
      name: "Elena Rostova",
      role: "UI/UX & Web Developer",
      bio: "Creating intuitive user interfaces and bringing designs to life with CSS and JavaScript.",
      techStack: ["HTML/CSS", "Figma", "JavaScript", "React"],
      github: "elena-ui",
      quote: "Design with purpose, code with passion."
    },
    {
      id: "student-07",
      name: "Marcus Vance",
      role: "Backend & Systems Dev",
      bio: "Building scalable backend services, microservices, and mastering Docker containers.",
      techStack: ["Go", "Docker", "Node.js", "MongoDB"],
      github: "marcusvance",
      quote: "Small commits make big systems reliable."
    },
    {
      id: "student-08",
      name: "Sophia Martinez",
      role: "Mobile App Developer",
      bio: "Developing cross-platform mobile apps with Flutter and learning version control best practices.",
      techStack: ["Dart", "Flutter", "Firebase", "Git"],
      github: "sophiam-dev",
      quote: "Building seamless mobile experiences!"
    },
    {
      id: "student-09",
      name: "Lucas Wright",
      role: "Game Development Major",
      bio: "Crafting 2D/3D games in Unity and C#, collaborating on game jams using Git version control.",
      techStack: ["C#", "Unity", "C++", "Git LFS"],
      github: "lucaswright-games",
      quote: "Game loops, shaders, and clean commits."
    },
    {
      id: "student-10",
      name: "Chloe Bennett",
      role: "Information Technology Student",
      bio: "Interested in cloud computing, DevOps pipelines, and continuous integration workflows.",
      techStack: ["AWS", "Linux", "Python", "GitHub Actions"],
      github: "chloeb-cloud",
      quote: "Automate everything, document well!"
    },
    {
      id: "student-11",
      name: "Ethan Taylor",
      role: "Computer Science Sophomore",
      bio: "Learning data structures, algorithms, and collaborating on class projects with GitHub.",
      techStack: ["Java", "C++", "Git", "HTML/CSS"],
      github: "ethantaylor-cs",
      quote: "Practice makes persistent progress."
    },
    {
      id: "student-12",
      name: "Zoe Dupont",
      role: "Full-Stack Trainee",
      bio: "Building web applications with React and Node.js while practicing Git conflict resolution.",
      techStack: ["JavaScript", "React", "Node.js", "Git"],
      github: "zoedupont",
      quote: "Merge conflicts are just opportunities to learn!"
    },
    {
      id: "student-13",
      name: "Liam O'Connor",
      role: "DevOps & Cloud Student",
      bio: "Learning Docker containers, CI/CD GitHub workflows, and infrastructure management.",
      techStack: ["Linux", "Docker", "Bash", "Git"],
      github: "liamoconnor-ops",
      quote: "Continuous integration, continuous learning."
    },
    {
      id: "student-14",
      name: "Ava Ramos",
      role: "Frontend Developer",
      bio: "Passionate about web accessibility, clean CSS layouts, and modern JavaScript frameworks.",
      techStack: ["HTML/CSS", "JavaScript", "Next.js", "Tailwind"],
      github: "avaramos-web",
      quote: "Accessibility first, beauty always."
    },
    {
      id: "student-15",
      name: "Noah Takahashi",
      role: "Embedded Systems Student",
      bio: "Programming microcontrollers in C/C++, building IoT hardware prototypes, and using Git.",
      techStack: ["C", "C++", "Arduino", "Python"],
      github: "noaht-embedded",
      quote: "Hardware meets clean software."
    },
    {
      id: "student-16",
      name: "Isabella Silva",
      role: "Data Analyst & Python Developer",
      bio: "Analyzing datasets, creating data visualizations, and managing code versioning with GitHub.",
      techStack: ["Python", "SQL", "Tableau", "Git"],
      github: "isabellasilva-data",
      quote: "Let the data tell the story."
    },
    {
      id: "student-17",
      name: "James Wilson",
      role: "Software Engineering Junior",
      bio: "Working on object-oriented programming, unit testing, and agile team workflows.",
      techStack: ["Java", "Spring Boot", "Git", "JUnit"],
      github: "jwilson-eng",
      quote: "Test well, refactor with confidence."
    },
    {
      id: "student-18",
      name: "Emily Zhang",
      role: "Web & Graphics Designer",
      bio: "Combining visual art with frontend web development to create memorable online experiences.",
      techStack: ["HTML/CSS", "JavaScript", "SVG", "Figma"],
      github: "emilyzhang-design",
      quote: "Pixels with purpose."
    },
    {
      id: "student-19",
      name: "Benjamin Foster",
      role: "Cybersecurity Analyst",
      bio: "Studying network security protocols, vulnerability scanning, and secure code audits.",
      techStack: ["Python", "Linux", "Wireshark", "Git"],
      github: "benfoster-sec",
      quote: "Security by design."
    },
    {
      id: "student-20",
      name: "Mia Kowalski",
      role: "AI Research Apprentice",
      bio: "Investigating neural networks, natural language processing, and open-source AI frameworks.",
      techStack: ["Python", "TensorFlow", "PyTorch", "Git"],
      github: "miak-ai",
      quote: "Training models, expanding minds."
    },
    {
      id: "student-21",
      name: "Oliver Hansen",
      role: "Backend Web Developer",
      bio: "Developing RESTful APIs, database schemas, and learning Git rebase & merge strategies.",
      techStack: ["Python", "Django", "PostgreSQL", "Git"],
      github: "oliverhansen-dev",
      quote: "Clean endpoints, robust databases."
    },
    {
      id: "student-22",
      name: "Charlotte Dubois",
      role: "Computer Science Freshman",
      bio: "Super excited for my first live Git workshop! Learning command line basics and GitHub PRs.",
      techStack: ["Python", "HTML/CSS", "Git"],
      github: "charlotted-cs",
      quote: "Hello World and beyond!"
    },
    {
      id: "student-23",
      name: "Gabriel Santos",
      role: "Cloud Architecture Student",
      bio: "Exploring serverless architectures, cloud deployments, and version control for cloud code.",
      techStack: ["AWS", "TypeScript", "Node.js", "Git"],
      github: "gabrielsantos-cloud",
      quote: "Scale up, branch out!"
    },
    {
      id: "student-24",
      name: "Amelia Reddy",
      role: "Mobile App Enthusiast",
      bio: "Creating iOS & Android apps, exploring UI state management, and managing Git repos.",
      techStack: ["Swift", "Kotlin", "Flutter", "Git"],
      github: "ameliareddy-mobile",
      quote: "Code mobile, think global."
    },
    {
      id: "student-25",
      name: "Henry Brooks",
      role: "Systems Programmer",
      bio: "Exploring low-level memory management, Rust programming, and open-source contributions.",
      techStack: ["Rust", "C++", "Linux", "Git"],
      github: "henrybrooks-rust",
      quote: "Memory safe, lightning fast."
    },
    {
      id: "student-26",
      name: "Lily Tanaka",
      role: "Frontend Specialist",
      bio: "Building ultra-fast modern web interfaces with React, SASS, and component libraries.",
      techStack: ["JavaScript", "React", "CSS3", "Git"],
      github: "lilytanaka-frontend",
      quote: "Smooth transitions, clean UI."
    },
    {
      id: "student-27",
      name: "Jackson Miller",
      role: "Database Administrator Student",
      bio: "Optimizing SQL queries, designing relational schemas, and managing code migrations with Git.",
      techStack: ["SQL", "PostgreSQL", "MySQL", "Git"],
      github: "jacksonm-db",
      quote: "Normalized data, reliable queries."
    },
    {
      id: "student-28",
      name: "Grace Hopper",
      role: "Software Engineering Student",
      bio: "Learning compiler theory, algorithm optimization, and collaborative open source workflows.",
      techStack: ["Java", "Python", "Git", "Linux"],
      github: "gracehopper-student",
      quote: "It's easier to ask forgiveness than permission!"
    },
    {
      id: "student-29",
      name: "Daniel Alvarez",
      role: "Network & Systems Apprentice",
      bio: "Managing server infrastructure, automation scripts, and Git repositories for IT ops.",
      techStack: ["Bash", "Python", "Linux", "Git"],
      github: "danielalvarez-sys",
      quote: "Automation is the key to efficiency."
    }
  ];

  // Fetch profiles from data/students/
  async function loadStudentProfiles() {
    try {
      // Probing candidates list to dynamically discover PR submissions
      const profileFiles = ['host-profile.json', '_template.json'];
      for (let i = 1; i <= 60; i++) {
        profileFiles.push(`student-${i < 10 ? '0' + i : i}.json`);
        profileFiles.push(`student-${i}.json`);
      }

      const loadedProfiles = [];

      for (const file of profileFiles) {
        try {
          const response = await fetch(`./data/students/${file}?t=${Date.now()}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.name && !data.id.includes('template')) {
              // Ensure timestamp exists; if missing, use high fallback priority for PRs
              if (!data.updatedAt && !data.timestamp) {
                data.updatedAt = Date.now();
              }
              loadedProfiles.push(data);
            }
          }
        } catch (e) {
          // Ignore 404s for files that haven't been pushed yet
        }
      }

      // Reverse loaded PR profiles so newly pulled student files appear FIRST
      loadedProfiles.reverse();

      // Combine loaded student PR profiles (newest first) followed by seed profiles
      const profileMap = new Map();
      
      // 1. Put newly pulled student PR profiles at the top
      loadedProfiles.forEach(p => profileMap.set(p.id, p));
      
      // 2. Add remaining seed profiles
      seedProfiles.forEach(p => {
        if (!profileMap.has(p.id)) {
          profileMap.set(p.id, p);
        }
      });

      allStudents = Array.from(profileMap.values());

      // 3. Sort all profiles by updatedAt / timestamp descending (newest on top)
      allStudents.sort((a, b) => {
        const timeA = typeof a.updatedAt === 'number' ? a.updatedAt : (new Date(a.updatedAt || 0).getTime() || 0);
        const timeB = typeof b.updatedAt === 'number' ? b.updatedAt : (new Date(b.updatedAt || 0).getTime() || 0);
        if (timeA && timeB && timeA !== timeB) {
          return timeB - timeA;
        }
        return 0;
      });

    } catch (err) {
      console.warn("Using seed profiles for preview:", err);
      allStudents = seedProfiles;
    }

    renderStats();
    renderCards(allStudents);
  }

  // Calculate and render statistics
  function renderStats() {
    if (participantCountEl) participantCountEl.textContent = allStudents.length;
  }

  // Render cards grid HTML
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
        <div class="student-card">
          <div class="card-header">
            <div class="avatar-circle">
              <svg width="20" height="20" fill="none" stroke="#787774" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
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
            <a href="https://github.com/${handle}" target="_blank" class="github-link">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              @${handle}
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

  // Initialize
  loadStudentProfiles();
});
