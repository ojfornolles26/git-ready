import React from 'react';

function Slide1() {
  return (
    <section className="slide-card slide-card-cover" id="slide-1" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="slide-cover-header">
        <svg className="slide-cover-git-logo" viewBox="0 0 128 128" fill="none">
          <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/>
        </svg>
        <h1 className="slide-heading" style={{ margin: 0 }}>Getting Started With Git</h1>
      </div>
      <p className="slide-lead" style={{ margin: "0 auto 1.5rem auto", maxWidth: "600px" }}>
        Learn Git &amp; GitHub by doing! Together, we'll collaborate live and see everyone's contributions come to life on a shared website.
      </p>
      <span className="slide-step-badge">Interactive Workshop</span>
    </section>
  );
}

function Slide2() {
  return (
    <section className="slide-card" id="slide-2">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Local Engine</span>
      </div>
      <h2 className="slide-heading">What is Git?</h2>
      <p className="slide-lead">The free &amp; open-source version control engine running locally on your computer terminal.</p>
      
      <div className="feature-grid-3">
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-card-title">Local Software</h3>
          </div>
          <p className="feature-card-desc">Installed directly on your laptop. Runs 100% offline without needing internet access.</p>
        </div>
        
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-card-title">Time Machine History</h3>
          </div>
          <p className="feature-card-desc">Saves permanent, immutable snapshots (commits) so you can review or restore past file states.</p>
        </div>
        
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.75-2.985m-.938-3.197A5.971 5.971 0 0012 11.25c-1.39 0-2.657.471-3.668 1.258m-.94 3.197a6.062 6.062 0 00-.751 2.986m.938-3.197H12.75" />
              </svg>
            </div>
            <h3 className="feature-card-title">Branching Engine</h3>
          </div>
          <p className="feature-card-desc">Create separate feature branches safely to experiment without risking your working code.</p>
        </div>
      </div>
    </section>
  );
}

function Slide3() {
  return (
    <section className="slide-card" id="slide-3">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Cloud Platform</span>
      </div>
      <h2 className="slide-heading">What is GitHub?</h2>
      <p className="slide-lead">The online cloud service for hosting Git repositories and collaborating with others.</p>
      
      <div className="feature-grid-3">
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <h3 className="feature-card-title">Cloud Storage</h3>
          </div>
          <p className="feature-card-desc">Holds project code online so teams can share, backup, and access repositories from anywhere.</p>
        </div>
        
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h3 className="feature-card-title">Pull Requests &amp; Review</h3>
          </div>
          <p className="feature-card-desc">Propose features, conduct peer code reviews line-by-line, and safely merge contributions.</p>
        </div>
        
        <div className="feature-block-card">
          <div className="card-header-row">
            <div className="feature-card-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21" />
              </svg>
            </div>
            <h3 className="feature-card-title">Developer Ecosystem</h3>
          </div>
          <p className="feature-card-desc">Connects developers, hosts open-source projects, and integrates automation / CI-CD tooling.</p>
        </div>
      </div>
    </section>
  );
}

function Slide4() {
  return (
    <section className="slide-card" id="slide-4">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Git vs GitHub</span>
      </div>
      <h2 className="slide-heading">Git vs. GitHub: Key Differences</h2>
      <p className="slide-lead">Understanding how the command-line engine and the cloud platform complement each other.</p>

      <div className="matrix-deck">
        <div className="matrix-card matrix-card-git">
          <div className="matrix-card-header">
            <svg width="28" height="28" viewBox="0 0 128 128" fill="none"><path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/></svg>
            <h3 className="matrix-card-title" style={{color: "var(--git-orange)"}}>Git (Local Tool)</h3>
          </div>
          <ul className="matrix-card-list">
            <li className="matrix-card-item">
              <span className="matrix-label">Where it lives</span>
              <span className="matrix-value">On your local computer disk</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Connection</span>
              <span className="matrix-value">Works 100% offline</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Primary Job</span>
              <span className="matrix-value">Tracks file changes &amp; saves commits</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Interface</span>
              <span className="matrix-value">Terminal / CLI commands</span>
            </li>
          </ul>
        </div>

        <div className="matrix-card matrix-card-github">
          <div className="matrix-card-header">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#0f172a"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <h3 className="matrix-card-title">GitHub (Cloud Web Service)</h3>
          </div>
          <ul className="matrix-card-list">
            <li className="matrix-card-item">
              <span className="matrix-label">Where it lives</span>
              <span className="matrix-value">On cloud servers (GitHub.com)</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Connection</span>
              <span className="matrix-value">Requires active internet connection</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Primary Job</span>
              <span className="matrix-value">Team collaboration &amp; pull requests</span>
            </li>
            <li className="matrix-card-item">
              <span className="matrix-label">Interface</span>
              <span className="matrix-value">Web Browser GUI / Dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Slide5() {
  return (
    <section className="slide-card" id="slide-5">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Core Problem</span>
      </div>
      <h2 className="slide-heading">Why We Need Version Control</h2>
      <p className="slide-lead">Without version control, team collaboration quickly turns into chaotic file duplication.</p>

      <div className="chaos-solution-deck">
        <div className="cs-card cs-card-chaos">
          <h3 className="cs-card-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>The Chaos (No Version Control)</span>
          </h3>
          <ul className="cs-list">
            <li className="cs-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>Manual ZIP files lead to lost code and overwritten changes (e.g. project_v2_final.zip).</span>
            </li>
            <li className="cs-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>Zero visibility into who made specific changes, why they did, or when bugs were introduced.</span>
            </li>
          </ul>
        </div>

        <div className="cs-card cs-card-solution">
          <h3 className="cs-card-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <span>The Git Solution</span>
          </h3>
          <ul className="cs-list">
            <li className="cs-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Saves focused snapshots (commits) detailing exact lines modified.</span>
            </li>
            <li className="cs-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Attributes every single edit to a specific author with timestamp.</span>
            </li>
            <li className="cs-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Enables simple rollbacks to any stable code checkpoint instantly.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Slide6() {
  return (
    <section className="slide-card" id="slide-6">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Architecture</span>
      </div>
      <h2 className="slide-heading">The 3 Local Git Areas</h2>
      <p className="slide-lead">Understand how files move through Git's internal architecture on your machine.</p>

      <div className="flow-container">
        <div className="flow-step-card">
          <div className="flow-step-header">
            <span className="flow-step-num">01</span>
            <span className="flow-step-badge">Working Dir</span>
          </div>
          <h3 className="flow-step-title">Workspace Files</h3>
          <p className="flow-step-desc">Your active project folder on disk where you write, edit, or delete files.</p>
        </div>

        <div className="flow-connector">
          <span className="flow-arrow-text">git add</span>
          <div className="flow-arrow-line"></div>
        </div>

        <div className="flow-step-card flow-step-card-active">
          <div className="flow-step-header">
            <span className="flow-step-num" style={{color: "var(--git-orange)"}}>02</span>
            <span className="flow-step-badge">Staging Area</span>
          </div>
          <h3 className="flow-step-title">Index / Stage</h3>
          <p className="flow-step-desc">The prep zone where you select specific file changes to bundle in your next snapshot.</p>
        </div>

        <div className="flow-connector">
          <span className="flow-arrow-text">git commit</span>
          <div className="flow-arrow-line"></div>
        </div>

        <div className="flow-step-card">
          <div className="flow-step-header">
            <span className="flow-step-num">03</span>
            <span className="flow-step-badge">Local Repo</span>
          </div>
          <h3 className="flow-step-title">.git Directory</h3>
          <p className="flow-step-desc">The database storing permanent, recorded commit snapshots on your machine.</p>
        </div>
      </div>

      <table className="compact-details-table">
        <thead>
          <tr>
            <th>Git Area</th>
            <th>Description</th>
            <th>File State / Key Command</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Working Directory</strong></td>
            <td>Your active code modifications</td>
            <td><code style={{background: "#e2e8f0", padding: "0.1rem 0.35rem", borderRadius: "4px", fontSize: "0.75rem"}}>Unstaged Changes</code></td>
          </tr>
          <tr>
            <td><strong>Staging Area</strong></td>
            <td>Preview line-up of selected edits</td>
            <td><code style={{background: "#fee2e2", color: "var(--git-orange)", padding: "0.1rem 0.35rem", borderRadius: "4px", fontSize: "0.75rem"}}>git add &lt;file&gt;</code></td>
          </tr>
          <tr>
            <td><strong>Local Repository</strong></td>
            <td>Permanent snapshot database</td>
            <td><code style={{background: "#e0e7ff", color: "var(--primary)", padding: "0.1rem 0.35rem", borderRadius: "4px", fontSize: "0.75rem"}}>git commit -m "message"</code></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

function Slide7() {
  return (
    <section className="slide-card" id="slide-7">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Starting a Project</span>
      </div>
      <h2 className="slide-heading">Starting a Project: git init vs. git clone</h2>
      <p className="slide-lead">There are two ways to start working with a Git repository on your machine.</p>

      <div className="dual-option-deck">
        <div className="option-card">
          <h3 className="option-card-title">Option A: Start from Scratch</h3>
          <p style={{fontSize: "0.85rem", color: "var(--text-secondary)"}}>Initialize a brand new local repository inside a clean, empty folder on your machine.</p>
          <div className="mac-window" style={{margin: "0.5rem 0 0 0"}}>
            <div className="mac-window-header">
              <div className="mac-dots">
                <span className="mac-dot mac-dot-close"></span>
                <span className="mac-dot mac-dot-min"></span>
                <span className="mac-dot mac-dot-zoom"></span>
              </div>
            </div>
            <div className="mac-window-content" style={{padding: "0.85rem"}}>
              <div className="code-wrapper" style={{fontSize: "0.85rem"}}>
                <code><span className="cmd-kw">git</span> init</code>
              </div>
            </div>
          </div>
        </div>

        <div className="option-card">
          <span className="option-badge-recommended">Recommended</span>
          <h3 className="option-card-title">Option B: Clone Existing</h3>
          <p style={{fontSize: "0.85rem", color: "var(--text-secondary)"}}>Download an existing cloud repository from GitHub onto your local laptop storage.</p>
          <div className="mac-window" style={{margin: "0.5rem 0 0 0"}}>
            <div className="mac-window-header">
              <div className="mac-dots">
                <span className="mac-dot mac-dot-close"></span>
                <span className="mac-dot mac-dot-min"></span>
                <span className="mac-dot mac-dot-zoom"></span>
              </div>
            </div>
            <div className="mac-window-content" style={{padding: "0.85rem"}}>
              <div className="code-wrapper" style={{fontSize: "0.85rem"}}>
                <code><span className="cmd-kw">git</span> clone <span className="cmd-str">https://...</span></code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-info" style={{marginTop: "1.25rem"}}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.086 1.086L12.5 13.5H12a.75.75 0 010-1.5h.25v-.75z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>For this workshop, we will use <strong>git clone</strong> to download our personal GitHub fork!</span>
      </div>
    </section>
  );
}

function Slide8() {
  return (
    <section className="slide-card" id="slide-8">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Complete Workflow</span>
      </div>
      <h2 className="slide-heading">The Full Git &amp; GitHub Workflow Overview</h2>
      <p className="slide-lead">The 6-step lifecycle of how developers collaborate on code using Git &amp; GitHub.</p>

      <div className="stepper-timeline">
        <div className="stepper-card">
          <div className="stepper-header">
            <span className="stepper-num">01</span>
          </div>
          <h3 className="stepper-title">Fork &amp; Clone</h3>
          <p className="stepper-desc">Copy project to your account and download locally.</p>
        </div>

        <div className="stepper-card">
          <div className="stepper-header">
            <span className="stepper-num">02</span>
          </div>
          <h3 className="stepper-title">Branch &amp; Edit</h3>
          <p className="stepper-desc">Create feature branch and write custom code edits.</p>
        </div>

        <div className="stepper-card">
          <div className="stepper-header">
            <span className="stepper-num">03</span>
          </div>
          <h3 className="stepper-title">Stage &amp; Commit</h3>
          <p className="stepper-desc">Select edits and record local checkpoints.</p>
        </div>

        <div className="stepper-card">
          <div className="stepper-header">
            <span className="stepper-num">04</span>
          </div>
          <h3 className="stepper-title">Push &amp; PR</h3>
          <p className="stepper-desc">Upload branch online and request code merge.</p>
        </div>
      </div>
    </section>
  );
}

function Slide9() {
  return (
    <section className="slide-card qa-card" id="slide-9">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </span>
        <h1 className="slide-heading" style={{ margin: 0, fontSize: "2.8rem" }}>
          Live Hands-On Activity Starts Now<span className="playful-jumping-glyph" style={{ color: "var(--git-orange)", marginLeft: "0.35rem", fontSize: "1.1em", transform: "translateY(0.04em)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>&lt;/&gt;</span>
        </h1>
      </div>
      <p className="slide-lead" style={{ margin: "0 auto", maxWidth: "600px", textAlign: "center" }}>
        Theory is completed. Open your terminal command line and code editor on your laptop.
      </p>
    </section>
  );
}

function Slide10() {
  return (
    <section className="slide-card" id="slide-10">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 1</span>
        <span className="slide-step-tracker">Step 1 of 12</span>
      </div>
      <h2 className="slide-heading">Check Environment &amp; Version</h2>
      <p className="slide-lead">Verify Git is properly installed and accessible on your terminal command line.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> --version</code>
            <div style={{ color: "#f8fafc", marginTop: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "1rem" }}>
              git version 2.x.x
            </div>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-info" style={{marginTop: "1rem"}}>
        <span>If command is not found, download and install Git from <a href="https://git-scm.com" target="_blank" rel="noreferrer" style={{color: "inherit", fontWeight: "700"}}>git-scm.com</a>.</span>
      </div>
    </section>
  );
}

function Slide11() {
  return (
    <section className="slide-card" id="slide-11">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 2</span>
        <span className="slide-step-tracker">Step 2 of 12</span>
      </div>
      <h2 className="slide-heading">Fork &amp; Clone Repository</h2>
      <p className="slide-lead">Fork the workshop repository on GitHub, then download your personal fork onto your laptop.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
          <button className="btn-copy-url" onClick={(e) => { navigator.clipboard.writeText('https://github.com/ojfornolles26/git-ready.git'); e.target.innerText='Copied!'; setTimeout(() => e.target.innerText='Copy URL', 2000); }}>Copy URL</button>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-cmt"># 1. Open browser to: https://github.com/ojfornolles26/git-ready</span><br />
<span className="cmd-cmt"># 2. Click "Fork" at the top-right to create your copy</span><br />
<span className="cmd-cmt"># 3. Clone your personal fork to your laptop:</span><br />
<span className="cmd-kw">git</span> clone <span className="copyable-link">https://github.com/YOUR-GITHUB-USERNAME/git-ready.git</span><br />
<span className="cmd-kw">cd</span> git-ready</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-warning">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span>Replace <code>YOUR-GITHUB-USERNAME</code> with your actual GitHub handle!</span>
      </div>
    </section>
  );
}

function Slide12() {
  return (
    <section className="slide-card" id="slide-12">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 3</span>
        <span className="slide-step-tracker">Step 3 of 12</span>
      </div>
      <h2 className="slide-heading">Inspect Working Directory Status</h2>
      <p className="slide-lead">Check which files have been modified, untracked, or staged in your workspace.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> status</code>
            <div style={{ color: "#f8fafc", marginTop: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "1rem", lineHeight: "1.6" }}>
              <div>On branch main</div>
              <div>Your branch is up to date with 'origin/main'.</div>
              <br />
              <div style={{ color: "#4ade80", fontWeight: "bold" }}>nothing to commit, working tree clean</div>
            </div>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-info" style={{marginTop: "1rem"}}>
        <span>Run <code>git status</code> continuously after modifying files to see where your changes live!</span>
      </div>
    </section>
  );
}

function Slide13() {
  return (
    <section className="slide-card" id="slide-13">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 4</span>
        <span className="slide-step-tracker">Step 4 of 12</span>
      </div>
      <h2 className="slide-heading">Inspecting Changes &amp; Commit History</h2>
      <p className="slide-lead">Review line-by-line file differences before staging and view your project's commit timeline.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-cmt"># 1. View line-by-line unstaged modifications in your files</span><br />
<span className="cmd-kw">git</span> diff<br /><br />
<span className="cmd-cmt"># 2. View compact list of past commit snapshots</span><br />
<span className="cmd-kw">git</span> log --oneline</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-info">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span>Press <code>q</code> on your keyboard to exit the <code>git log</code> or <code>git diff</code> terminal viewer.</span>
      </div>
    </section>
  );
}

function Slide14() {
  return (
    <section className="slide-card" id="slide-14">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 5</span>
        <span className="slide-step-tracker">Step 5 of 12</span>
      </div>
      <h2 className="slide-heading">Create Your Feature Branch</h2>
      <p className="slide-lead">Create an isolated workspace branch so your profile card edits stay separated from main.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-cmt"># Recommended modern Git syntax (creates &amp; switches):</span><br />
<span className="cmd-kw">git</span> switch -c student/your-github-username<br /><br />
<span className="cmd-cmt"># Traditional equivalent command:</span><br />
<span className="cmd-kw">git</span> checkout -b student/your-github-username</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-success">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Example: <code>git switch -c student/ojfornolles26</code></span>
      </div>
    </section>
  );
}

function Slide15() {
  return (
    <section className="slide-card" id="slide-15">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 6 (Part 1)</span>
        <span className="slide-step-tracker">Step 6 of 12</span>
      </div>
      <h2 className="slide-heading">Add Your Card: Header &amp; Name</h2>
      <p className="slide-lead">Copy the HTML card snippet from <code>README.md</code> and paste it inside <code>&lt;div class="cards-grid"&gt;</code> in <code>gallery/index.html</code>.</p>

      <div className="mac-window">
        <div className="vscode-header">
          <div className="vscode-tabs">
            <div className="vscode-tab vscode-tab-active">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
              <span>gallery/index.html</span>
            </div>
          </div>
          <span className="mac-window-title" style={{position: 'static', transform: 'none'}}>VS Code</span>
        </div>
        <div className="mac-window-content vscode-content">
          <div className="code-wrapper" style={{fontSize: "0.85rem"}}>
            <code><span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="student-card"</span> <span className="cmd-str">data-id="student-yourusername"</span>&gt;<br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="card-header"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="avatar-circle"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-cmt">&lt;!-- &lt;img src="https://github.com/your-github-username.png" class="avatar-img"&gt; --&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="student-meta"</span> <span className="cmd-str">style="flex-grow: 1"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;h3&gt;</span>Your Full Name<span className="cmd-kw">&lt;/h3&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">class="student-role"</span>&gt;BSIT1-C2<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span></code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide16() {
  return (
    <section className="slide-card" id="slide-16">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 6 (Part 2)</span>
        <span className="slide-step-tracker">Step 6 of 12</span>
      </div>
      <h2 className="slide-heading">Customize Bio, Tech Stack &amp; Links</h2>
      <p className="slide-lead">Add your bio, tech tags, personal quote, and GitHub profile handle inside your card.</p>

      <div className="mac-window">
        <div className="vscode-header">
          <div className="vscode-tabs">
            <div className="vscode-tab vscode-tab-active">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
              <span>gallery/index.html</span>
            </div>
          </div>
          <span className="mac-window-title" style={{position: 'static', transform: 'none'}}>VS Code</span>
        </div>
        <div className="mac-window-content vscode-content">
          <div className="code-wrapper" style={{fontSize: "0.85rem"}}>
            <code>&nbsp;&nbsp;<span className="cmd-kw">&lt;p</span> <span className="cmd-str">class="student-bio"</span>&gt;Write a short 1-2 sentence bio about yourself!<span className="cmd-kw">&lt;/p&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="tech-tags"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">class="tag"</span>&gt;Git<span className="cmd-kw">&lt;/span&gt;</span> <span className="cmd-kw">&lt;span</span> <span className="cmd-str">class="tag"</span>&gt;GitHub<span className="cmd-kw">&lt;/span&gt;</span> <span className="cmd-kw">&lt;span</span> <span className="cmd-str">class="tag"</span>&gt;HTML/CSS<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">class="card-footer"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">class="quote"</span>&gt;"git push origin main and make it happen!"<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;a</span> <span className="cmd-str">href="https://github.com/your-github-username"</span> <span className="cmd-str">class="github-link"</span>&gt;@your-github-username<span className="cmd-kw">&lt;/a&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
<span className="cmd-kw">&lt;/div&gt;</span></code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide17() {
  return (
    <section className="slide-card" id="slide-17">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 7</span>
        <span className="slide-step-tracker">Step 7 of 12</span>
      </div>
      <h2 className="slide-heading">Stage Your Changes: git add</h2>
      <p className="slide-lead">Move your modified <code>gallery/index.html</code> file into the Staging Area.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> add gallery/index.html<br />
<span className="cmd-cmt"># Or stage all changed files in workspace:</span><br />
<span className="cmd-kw">git</span> add .</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-success">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Running <code>git status</code> after staging will show <code>gallery/index.html</code> listed under <em>"Changes to be committed"</em> in green.</span>
      </div>
    </section>
  );
}

function Slide18() {
  return (
    <section className="slide-card" id="slide-18">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 8</span>
        <span className="slide-step-tracker">Step 8 of 12</span>
      </div>
      <h2 className="slide-heading">Create a Commit Snapshot</h2>
      <p className="slide-lead">Record your staged modifications permanently in your local Git repository.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> commit -m <span className="cmd-str">"feat: add profile card for [Your Name]"</span></code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide19() {
  return (
    <section className="slide-card" id="slide-19">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Pro Tip</span>
        <span className="slide-step-tracker">Safety Net</span>
      </div>
      <h2 className="slide-heading">Undoing Mistakes: git restore &amp; git reset</h2>
      <p className="slide-lead">Learn how to safely discard unwanted edits or unstage files without losing work.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-cmt"># 1. Discard uncommitted edits in a file (revert back to last commit)</span><br />
<span className="cmd-kw">git</span> restore gallery/index.html<br /><br />
<span className="cmd-cmt"># 2. Unstage a staged file (move it back to working directory)</span><br />
<span className="cmd-kw">git</span> restore --staged gallery/index.html</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-warning">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span>Made a typo or accidental file edit? <code>git restore</code> is your quick undo safety button!</span>
      </div>
    </section>
  );
}

function Slide20() {
  return (
    <section className="slide-card" id="slide-20">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 9</span>
        <span className="slide-step-tracker">Step 9 of 12</span>
      </div>
      <h2 className="slide-heading">Push Branch to Your Fork</h2>
      <p className="slide-lead">Upload your feature branch to your personal GitHub repository fork.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> push origin student/your-github-username</code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide21() {
  return (
    <section className="slide-card" id="slide-21">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 10</span>
        <span className="slide-step-tracker">Step 10 of 12</span>
      </div>
      <h2 className="slide-heading">Create a Pull Request (PR)</h2>
      <p className="slide-lead">Submit your branch from your fork to be merged into the main workshop repository.</p>

      <div className="stepper-timeline" style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
        <div className="stepper-card">
          <div className="stepper-header"><span className="stepper-num">1</span></div>
          <h3 className="stepper-title">Open GitHub Fork</h3>
          <p className="stepper-desc">Go to your profile page on GitHub.com and select the forked repository.</p>
        </div>

        <div className="stepper-card">
          <div className="stepper-header"><span className="stepper-num">2</span></div>
          <h3 className="stepper-title">Compare &amp; PR</h3>
          <p className="stepper-desc">Click the yellow pop-up banner that says "Compare &amp; pull request".</p>
        </div>

        <div className="stepper-card">
          <div className="stepper-header"><span className="stepper-num">3</span></div>
          <h3 className="stepper-title">Submit Details</h3>
          <p className="stepper-desc">Set title as <code>feat: add profile card for [Name]</code> and click "Create".</p>
        </div>
      </div>
    </section>
  );
}

function Slide22() {
  return (
    <section className="slide-card" id="slide-22">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 11</span>
        <span className="slide-step-tracker">Step 11 of 12</span>
      </div>
      <h2 className="slide-heading">Live PR Review &amp; Merge</h2>
      <p className="slide-lead">The workshop host will review all student Pull Requests on the projector screen and merge them into main.</p>

      <div className="callout-card callout-card-info">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 21c-1.95 0-3.77-.463-5.385-1.285m.002-.586l.006-.03a4.043 4.043 0 01-3.666-2.513c0-2.21 2.218-3.568 4.417-3.238.1.015.201.033.3.053m0 .227c-.015.147-.024.296-.024.447v.109a12.018 12.018 0 003 1.258m-.109-12.859A1.914 1.914 0 0012 3c-1.018 0-1.85.79-1.914 1.802m.006-.03A12.01 12.01 0 006 7.8c0 1.986.483 3.86 1.338 5.51m2.766-8.51c.064-.002.128-.003.193-.003H12a3.75 3.75 0 013.75 3.75v.525c0 .354.06.697.172 1.018" />
        </svg>
        <span>Watch the screen as your Pull Request gets merged into the central repository! Let's watch the attendance gallery grow.</span>
      </div>
    </section>
  );
}

function Slide23() {
  return (
    <section className="slide-card" id="slide-23">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 12</span>
        <span className="slide-step-tracker">Step 12 of 12</span>
      </div>
      <h2 className="slide-heading">Sync Everyone's Profile Cards: git pull</h2>
      <p className="slide-lead">Fetch all newly merged classmate profiles onto your computer.</p>

      <div className="mac-window">
        <div className="mac-window-header">
          <div className="mac-dots">
            <span className="mac-dot mac-dot-close"></span>
            <span className="mac-dot mac-dot-min"></span>
            <span className="mac-dot mac-dot-zoom"></span>
          </div>
          <span className="mac-window-title">Terminal</span>
        </div>
        <div className="mac-window-content">
          <div className="code-wrapper">
            <code><span className="cmd-kw">git</span> checkout main<br />
<span className="cmd-kw">git</span> pull origin main</code>
          </div>
        </div>
      </div>

      <div className="callout-card callout-card-success">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Refresh <code>gallery/index.html</code> in your browser to see all merged student cards render live!</span>
      </div>
    </section>
  );
}

function Slide24() {
  return (
    <section className="slide-card" id="slide-24">
      <div className="slide-meta">
        <span className="slide-step-badge">Pro Tip</span>
      </div>
      <h2 className="slide-heading">Handling Merge Conflicts</h2>
      <p className="slide-lead">Conflicts occur when concurrent edits modify the exact same lines in a file.</p>

      <div className="conflict-deck">
        <div className="conflict-section conflict-current">
          <code><span className="cmd-cmt">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Your current branch)</span><br />
"role": "Frontend Learner"</code>
        </div>
        <div className="conflict-divider">
          <span>=======</span>
        </div>
        <div className="conflict-incoming">
          <code style={{padding: '0.65rem 1rem', display: 'block'}}>"role": "Fullstack Developer"<br />
<span className="cmd-cmt">&gt;&gt;&gt;&gt;&gt;&gt;&gt; main (Incoming branch)</span></code>
        </div>
      </div>

      <p style={{fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem"}}>
        <strong>Resolution:</strong> Choose the desired content, delete the marker lines (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>), then stage and commit the file.
      </p>
    </section>
  );
}

function Slide25() {
  return (
    <section className="slide-card" id="slide-25">
      <div className="slide-meta">
        <span className="slide-step-badge">Best Practices</span>
      </div>
      <h2 className="slide-heading">Core Git Best Practices</h2>
      <p className="slide-lead">Develop clean workflow habits to prevent bugs and make team collaboration smooth.</p>

      <div className="practices-grid">
        <div className="practice-card">
          <div className="card-header-row">
            <div className="practice-icon">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="practice-card-title">Commit Frequently</h3>
          </div>
          <p className="practice-card-desc">Make small, focused commits for single logical changes so updates are easy to track.</p>
        </div>

        <div className="practice-card">
          <div className="card-header-row">
            <div className="practice-icon">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21" />
              </svg>
            </div>
            <h3 className="practice-card-title">Feature Branches</h3>
          </div>
          <p className="practice-card-desc">Keep the primary <code>main</code> branch clean. Code features and bug fixes on sandbox branches.</p>
        </div>

        <div className="practice-card">
          <div className="card-header-row">
            <div className="practice-icon">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 0 1.5 0 2.5 0h.01m13.73-.01c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3" />
              </svg>
            </div>
            <h3 className="practice-card-title">Clear Messages</h3>
          </div>
          <p className="practice-card-desc">Write descriptive commit messages explaining the "what" and "why" of the changes.</p>
        </div>
      </div>
    </section>
  );
}

function Slide26() {
  return (
    <section className="slide-card qa-card" id="slide-26">
      <h1 className="qa-title">
        Any Questions<span className="playful-sideways-glyph" style={{ color: "var(--git-orange)", marginLeft: "0.25rem", fontSize: "1.25em", transform: "translateY(0.04em)" }}>?</span>
      </h1>
      <p className="qa-subtitle">Open floor for questions, troubleshooting commands, or exploring concepts further.</p>
    </section>
  );
}

function Slide27() {
  return (
    <section className="slide-card" id="slide-27">
      <div className="slide-meta">
        <span className="slide-step-badge">Wrap Up</span>
      </div>
      <h2 className="slide-heading">Workshop Summary</h2>
      <p className="slide-lead">Key takeaways and accomplishments from today's hands-on session:</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
            <span>Local Mastery</span>
          </h3>
          <ul className="dashboard-list">
            <li className="dashboard-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Use Git locally to initialize, track, stage, and save code modifications.</span>
            </li>
            <li className="dashboard-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Switch sandbox branches freely and safety inspect status diffs.</span>
            </li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
            <span>Cloud Collaboration</span>
          </h3>
          <ul className="dashboard-list">
            <li className="dashboard-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Use GitHub to fork centralized repos and push feature branches.</span>
            </li>
            <li className="dashboard-item">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span>Propose code merges using Pull Requests and pull classmate cards.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Slide28() {
  return (
    <section className="slide-card congrats-card" id="slide-28">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>🎉</span>
        <h1 className="slide-heading" style={{ margin: 0 }}>
          Congratulations<span className="playful-jumping-glyph" style={{ color: "var(--git-orange)", marginLeft: "0.25rem", fontSize: "1.2em", transform: "translateY(0.04em)" }}>!</span>
        </h1>
      </div>
      <p className="slide-lead" style={{ margin: "0 auto", maxWidth: "500px" }}>
        You have successfully completed the workshop! You are officially Git Ready.
      </p>
      
      <a href="../gallery/index.html" className="btn-launch-gallery">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        <span>Open Student Attendance Gallery</span>
      </a>
    </section>
  );
}

export default [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
  Slide20,
  Slide21,
  Slide22,
  Slide23,
  Slide24,
  Slide25,
  Slide26,
  Slide27,
  Slide28
];
