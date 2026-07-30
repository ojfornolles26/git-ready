import React from 'react';

function Slide1() {
  return (
    <section className="slide-card" id="slide-1">
      <div className="scattered-bg-container" aria-hidden="true">
        <span className="scatter-logo logo-1"></span>
        <span className="scatter-logo logo-2"></span>
        <span className="scatter-logo logo-3"></span>
      </div>
      <div className="slide-1-content">
        <h1 className="slide-heading title-3d" style={{"display": "flex", "alignItems": "center", "gap": "0.9rem"}}>
          <svg className="slide-1-git-logo" width="52" height="52" viewBox="0 0 128 128" fill="none" style={{"flexShrink": "0"}}><path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/></svg>
          <span>Getting Started With Git</span>
        </h1>
        <p className="slide-lead">Learn Git & GitHub by doing! Together, we'll collaborate live and see everyone's contributions come to life on a shared website.</p>
      </div>
    </section>
  );
}

function Slide2() {
  return (
    <section className="slide-card" id="slide-2">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Local Engine</span>
      </div>
      <h2 className="slide-heading" style={{"display": "flex", "alignItems": "center", "gap": "0.75rem"}}>
        <svg width="38" height="38" viewBox="0 0 128 128" fill="none"><path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/></svg>
        <span>What is Git?</span>
      </h2>
      <p className="slide-lead">The free &amp; open-source version control engine running locally on your computer terminal.</p>

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Local Software:</strong> Installed directly on your laptop (runs 100% offline).</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Time Machine History:</strong> Saves immutable code snapshots (commits) over time.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Branching Engine:</strong> Create separate work branches safely without risking working code.</span>
        </li>
      </ul>
    </section>
  );
}

function Slide3() {
  return (
    <section className="slide-card" id="slide-3">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Cloud Platform</span>
      </div>
      <h2 className="slide-heading" style={{"display": "flex", "alignItems": "center", "gap": "0.75rem"}}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="#0f172a"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        <span>What is GitHub?</span>
      </h2>
      <p className="slide-lead">The online cloud service for hosting Git repositories and collaborating with others.</p>

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Cloud Storage:</strong> Holds project code online so teams can share and backup repositories.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Pull Requests &amp; Review:</strong> Propose features, conduct peer code reviews, and merge contributions.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Developer Ecosystem:</strong> Connects developers, open-source projects, and industry tooling globally.</span>
        </li>
      </ul>
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

      <div className="content-grid" style={{"marginTop": "1rem"}}>
        <div style={{"background": "#fff5f2", "border": "1px solid #ffccbe", "borderRadius": "var(--radius-md)", "padding": "1.25rem"}}>
          <h3 style={{"color": "#c53030", "fontSize": "1.15rem", "fontWeight": "700", "marginBottom": "0.5rem", "display": "flex", "alignItems": "center", "gap": "0.5rem"}}>
            <svg width="22" height="22" viewBox="0 0 128 128" fill="none"><path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/></svg>
            Git (Command Line Tool)
          </h3>
          <ul className="bullet-list" style={{"margin": "0", "padding": "0"}}>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Where it lives:</strong> On your local computer</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Connection:</strong> Works 100% offline</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Primary Job:</strong> Tracks file changes &amp; commits</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Interface:</strong> Terminal / CLI commands</span>
            </li>
          </ul>
        </div>

        <div style={{"background": "#f8fafc", "border": "1px solid var(--border-color)", "borderRadius": "var(--radius-md)", "padding": "1.25rem"}}>
          <h3 style={{"color": "#0f172a", "fontSize": "1.15rem", "fontWeight": "700", "marginBottom": "0.5rem", "display": "flex", "alignItems": "center", "gap": "0.5rem"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0f172a"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub (Cloud Web Service)
          </h3>
          <ul className="bullet-list" style={{"margin": "0", "padding": "0"}}>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Where it lives:</strong> On cloud servers (GitHub.com)</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Connection:</strong> Requires internet connection</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Primary Job:</strong> Team collaboration &amp; pull requests</span>
            </li>
            <li className="bullet-item" style={{"fontSize": "0.88rem"}}>
              <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Interface:</strong> Web Browser UI</span>
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

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          <span>Manual ZIP file management leads to lost code and overwritten changes (e.g. <code>project_v2_final.zip</code>).</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          <span>Zero visibility into who made specific changes, why they were made, or when bugs were introduced.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Git Solution:</strong> Provides a complete time-machine history where every change is tracked and attributed.</span>
        </li>
      </ul>
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

      <div style={{"overflowX": "auto", "marginTop": "1.25rem"}}>
        <table style={{"width": "100%", "borderCollapse": "separate", "borderSpacing": "0", "border": "1px solid var(--border-color)", "borderRadius": "var(--radius-md)", "overflow": "hidden", "background": "#ffffff", "fontSize": "0.9rem"}}>
          <thead>
            <tr style={{"background": "#f8fafc", "borderBottom": "1px solid var(--border-color)", "textAlign": "left"}}>
              <th style={{"padding": "0.85rem 1.15rem", "color": "#0f172a", "fontWeight": "700", "borderBottom": "1px solid var(--border-color)", "width": "28%"}}>Local Git Area</th>
              <th style={{"padding": "0.85rem 1.15rem", "color": "#0f172a", "fontWeight": "700", "borderBottom": "1px solid var(--border-color)", "width": "44%"}}>Role &amp; Purpose</th>
              <th style={{"padding": "0.85rem 1.15rem", "color": "#0f172a", "fontWeight": "700", "borderBottom": "1px solid var(--border-color)", "width": "28%"}}>Associated Command</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{"borderBottom": "1px solid #f1f5f9"}}>
              <td style={{"padding": "0.85rem 1.15rem", "fontWeight": "600", "color": "#0f172a", "borderBottom": "1px solid #f1f5f9"}}>
                1. Working Directory
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)", "borderBottom": "1px solid #f1f5f9"}}>
                Your active workspace where you create, edit, or delete project files on disk.
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)", "borderBottom": "1px solid #f1f5f9"}}>
                <code style={{"background": "#f1f5f9", "padding": "0.2rem 0.5rem", "borderRadius": "4px", "color": "#475569", "fontSize": "0.85rem"}}>Unstaged Changes</code>
              </td>
            </tr>
            <tr style={{"background": "#fffcfb", "borderBottom": "1px solid #f1f5f9"}}>
              <td style={{"padding": "0.85rem 1.15rem", "fontWeight": "600", "color": "#f05032", "borderBottom": "1px solid #f1f5f9"}}>
                2. Staging Area (Index)
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)", "borderBottom": "1px solid #f1f5f9"}}>
                The preview line-up area where you organize specific file edits before recording them.
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)", "borderBottom": "1px solid #f1f5f9"}}>
                <code style={{"background": "#fff3f0", "border": "1px solid #ffdcd6", "padding": "0.2rem 0.5rem", "borderRadius": "4px", "color": "#f05032", "fontSize": "0.85rem", "fontWeight": "600"}}>git add &lt;file&gt;</code>
              </td>
            </tr>
            <tr>
              <td style={{"padding": "0.85rem 1.15rem", "fontWeight": "600", "color": "#0f172a"}}>
                3. Local Repository (.git)
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)"}}>
                The permanent database storing committed snapshots in your project history.
              </td>
              <td style={{"padding": "0.85rem 1.15rem", "color": "var(--text-secondary)"}}>
                <code style={{"background": "#f1f5f9", "padding": "0.2rem 0.5rem", "borderRadius": "4px", "color": "#0f172a", "fontSize": "0.85rem", "fontWeight": "600"}}>git commit -m "..."</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Slide7() {
  return (
    <section className="slide-card" id="slide-7">
      <div className="slide-meta">
        <span className="slide-step-badge">Concept • Starting a Project</span>
      </div>
      <h2 className="slide-heading">Starting a Project: git init vs git clone</h2>
      <p className="slide-lead">There are two ways to start working with a Git repository on your machine.</p>

      <div className="code-wrapper">
        <code><span className="cmd-cmt"># Option A: Initialize a brand new local repository from scratch</span><br />
<span className="cmd-kw">git</span> init<br /><br />
<span className="cmd-cmt"># Option B: Download an existing repository from GitHub to your laptop</span><br />
<span className="cmd-kw">git</span> clone <span className="copyable-link">https://github.com/username/repository.git</span></code>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>1. Fork &amp; Clone:</strong> Copy project to GitHub profile and download locally.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>2. Branch &amp; Edit:</strong> Create feature branch (`git switch -c`) and edit files.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>3. Stage &amp; Commit:</strong> Save local snapshots (`git add`, `git commit`).</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>4. Push &amp; Pull Request:</strong> Upload branch to GitHub (`git push`) and open PR.</span>
        </li>
      </ul>
    </section>
  );
}

function Slide9() {
  return (
    <section className="slide-card" id="slide-9">
      <div className="slide-meta">
        <span className="slide-step-badge">Phase 2 • Hands-On Activity</span>
      </div>
      <h2 className="slide-heading">Live Hands-On Activity Starts Now!</h2>
      <p className="slide-lead">We are transitioning from concepts to live coding. Please open your terminal and code editor.</p>

      <div className="callout callout-info" style={{"marginTop": "1.5rem"}}>
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span>Open your <strong>Terminal</strong> / <strong>Command Prompt</strong> and <strong>VS Code</strong> to follow along step-by-step.</span>
      </div>
    </section>
  );
}

function Slide10() {
  return (
    <section className="slide-card" id="slide-10">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 1</span>
      </div>
      <h2 className="slide-heading">Check Environment &amp; Version</h2>
      <p className="slide-lead">Verify Git is properly installed and accessible on your terminal command line.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> --version</code>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Expected Output: <code>git version 2.x.x</code>. If not found, download Git from <a href="https://git-scm.com" target="_blank" style={{"color": "inherit", "fontWeight": "600"}}>git-scm.com</a>.</span>
      </div>
    </section>
  );
}

function Slide11() {
  return (
    <section className="slide-card" id="slide-11">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 2</span>
      </div>
      <h2 className="slide-heading">Fork &amp; Clone Repository</h2>
      <p className="slide-lead">Fork the workshop repository on GitHub, then download your personal fork onto your laptop.</p>

      <div className="code-wrapper">
        <code><span className="cmd-cmt"># 1. Click "Fork" button at top-right of GitHub repo page</span><br />
<span className="cmd-cmt"># 2. Clone your personal fork to your laptop:</span><br />
<span className="cmd-kw">git</span> clone <span className="copyable-link">https://github.com/YOUR-GITHUB-USERNAME/git-ready.git</span><br />
<span className="cmd-kw">cd</span> git-ready</code>
        <button className="btn-copy-url" onClick={(e) => { navigator.clipboard.writeText('https://github.com/ojfornolles26/git-ready.git'); e.target.innerText='Copied!'; setTimeout(() => e.target.innerText='Copy URL', 2000); }}>Copy URL</button>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
      </div>
      <h2 className="slide-heading">Inspect Working Directory Status</h2>
      <p className="slide-lead">Check which files have been modified, untracked, or staged in your workspace.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> status</code>
      </div>

      <p style={{"fontSize": "0.9rem", "color": "var(--text-secondary)", "marginTop": "0.5rem"}}>
        <strong>Pro Tip:</strong> Run <code>git status</code> continuously after modifying files to see where your changes live!
      </p>
    </section>
  );
}

function Slide13() {
  return (
    <section className="slide-card" id="slide-13">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 4</span>
      </div>
      <h2 className="slide-heading">Inspecting Changes &amp; Commit History</h2>
      <p className="slide-lead">Review line-by-line file differences before staging and view your project's commit timeline.</p>

      <div className="code-wrapper">
        <code><span className="cmd-cmt"># 1. View line-by-line unstaged modifications in your files</span><br />
<span className="cmd-kw">git</span> diff<br /><br />
<span className="cmd-cmt"># 2. View compact list of past commit snapshots</span><br />
<span className="cmd-kw">git</span> log --oneline</code>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
      </div>
      <h2 className="slide-heading">Create Your Feature Branch</h2>
      <p className="slide-lead">Create an isolated workspace branch so your profile card edits stay separated from main.</p>

      <div className="code-wrapper">
        <code><span className="cmd-cmt"># Recommended modern Git syntax:</span><br />
<span className="cmd-kw">git</span> switch -c student/your-github-username<br /><br />
<span className="cmd-cmt"># Traditional equivalent command:</span><br />
<span className="cmd-kw">git</span> checkout -b student/your-github-username</code>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
      </div>
      <h2 className="slide-heading">Add Your Card: Header &amp; Name</h2>
      <p className="slide-lead">Copy the HTML card snippet from <code>README.md</code> and paste it inside <code>&lt;div className="cards-grid"&gt;</code> in <code>gallery/index.html</code>.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="student-card"</span> <span className="cmd-str">data-id="student-yourusername"</span>&gt;<br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="card-header"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="avatar-circle"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-cmt">&lt;!-- &lt;img src="https://github.com/your-github-username.png" className="avatar-img"&gt; --&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="student-meta"</span> <span className="cmd-str">style="flex-grow: 1"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;h3&gt;</span>Your Full Name<span className="cmd-kw">&lt;/h3&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">className="student-role"</span>&gt;BSIT1-C2<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span></code>
      </div>
    </section>
  );
}

function Slide16() {
  return (
    <section className="slide-card" id="slide-16">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 6 (Part 2)</span>
      </div>
      <h2 className="slide-heading">Customize Bio, Tech Stack &amp; Links</h2>
      <p className="slide-lead">Add your bio, tech tags, personal quote, and GitHub profile handle inside your card.</p>

      <div className="code-wrapper">
        <code>&nbsp;&nbsp;<span className="cmd-kw">&lt;p</span> <span className="cmd-str">className="student-bio"</span>&gt;Write a short 1-2 sentence bio about yourself!<span className="cmd-kw">&lt;/p&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="tech-tags"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">className="tag"</span>&gt;Git<span className="cmd-kw">&lt;/span&gt;</span> <span className="cmd-kw">&lt;span</span> <span className="cmd-str">className="tag"</span>&gt;GitHub<span className="cmd-kw">&lt;/span&gt;</span> <span className="cmd-kw">&lt;span</span> <span className="cmd-str">className="tag"</span>&gt;HTML/CSS<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;div</span> <span className="cmd-str">className="card-footer"</span>&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;span</span> <span className="cmd-str">className="quote"</span>&gt;"git push origin main and make it happen!"<span className="cmd-kw">&lt;/span&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="cmd-kw">&lt;a</span> <span className="cmd-str">href="https://github.com/your-github-username"</span> <span className="cmd-str">className="github-link"</span>&gt;@your-github-username<span className="cmd-kw">&lt;/a&gt;</span><br />
&nbsp;&nbsp;<span className="cmd-kw">&lt;/div&gt;</span><br />
<span className="cmd-kw">&lt;/div&gt;</span></code>
      </div>
    </section>
  );
}

function Slide17() {
  return (
    <section className="slide-card" id="slide-17">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 7</span>
      </div>
      <h2 className="slide-heading">Stage Your Changes: git add</h2>
      <p className="slide-lead">Move your modified <code>gallery/index.html</code> file into the Staging Area.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> add gallery/index.html<br />
<span className="cmd-cmt"># Or stage all changed files:</span><br />
<span className="cmd-kw">git</span> add .</code>
      </div>

      <div className="callout callout-success">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
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
      </div>
      <h2 className="slide-heading">Create a Commit Snapshot</h2>
      <p className="slide-lead">Record your staged modifications permanently in your local Git repository.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> commit -m <span className="cmd-str">"feat: add profile card for [Your Name]"</span></code>
      </div>
    </section>
  );
}

function Slide19() {
  return (
    <section className="slide-card" id="slide-19">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Pro Tip</span>
      </div>
      <h2 className="slide-heading">Undoing Mistakes: git restore &amp; git reset</h2>
      <p className="slide-lead">Learn how to safely discard unwanted edits or unstage files without losing work.</p>

      <div className="code-wrapper">
        <code><span className="cmd-cmt"># 1. Discard uncommitted edits in a file (revert back to last commit)</span><br />
<span className="cmd-kw">git</span> restore gallery/index.html<br /><br />
<span className="cmd-cmt"># 2. Unstage a staged file (move it back to working directory)</span><br />
<span className="cmd-kw">git</span> restore --staged gallery/index.html</code>
      </div>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
      </div>
      <h2 className="slide-heading">Push Branch to Your Fork</h2>
      <p className="slide-lead">Upload your feature branch to your personal GitHub repository fork.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> push origin student/your-github-username</code>
      </div>
    </section>
  );
}

function Slide21() {
  return (
    <section className="slide-card" id="slide-21">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 10</span>
      </div>
      <h2 className="slide-heading">Create a Pull Request (PR)</h2>
      <p className="slide-lead">Submit your branch from your fork to be merged into the main workshop repository.</p>

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Open your forked repository on GitHub in your web browser.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Click the <strong>"Compare &amp; pull request"</strong> button on your newly pushed branch.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Title your PR <code>feat: add profile card for [Name]</code> and click <strong>Create pull request</strong>.</span>
        </li>
      </ul>
    </section>
  );
}

function Slide22() {
  return (
    <section className="slide-card" id="slide-22">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 11</span>
      </div>
      <h2 className="slide-heading">Live PR Review &amp; Merge</h2>
      <p className="slide-lead">The workshop host will review all student Pull Requests on the projector screen and merge them into main.</p>

      <div className="callout callout-info">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Watch the screen as your Pull Request gets merged into the central repository!</span>
      </div>
    </section>
  );
}

function Slide23() {
  return (
    <section className="slide-card" id="slide-23">
      <div className="slide-meta">
        <span className="slide-step-badge">Hands-On Step 12</span>
      </div>
      <h2 className="slide-heading">Sync Everyone's Profile Cards: git pull</h2>
      <p className="slide-lead">Fetch all newly merged classmate profiles onto your computer.</p>

      <div className="code-wrapper">
        <code><span className="cmd-kw">git</span> checkout main<br />
<span className="cmd-kw">git</span> pull origin main</code>
      </div>

      <div className="callout callout-success">
        <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
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

      <div className="code-wrapper">
        <code><span className="cmd-cmt">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Your current branch)</span><br />
"role": "Frontend Learner"<br />
=======<br />
"role": "Fullstack Developer"<br />
<span className="cmd-cmt">&gt;&gt;&gt;&gt;&gt;&gt;&gt; main (Incoming branch)</span></code>
      </div>

      <p style={{"fontSize": "0.9rem", "color": "var(--text-secondary)", "marginTop": "0.5rem"}}>
        <strong>Resolution:</strong> Choose the desired content, delete the marker lines (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>), then stage and commit.
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

      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Commit Frequently:</strong> Make small, focused commits for single logical changes.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Use Feature Branches:</strong> Keep the primary <code>main</code> branch clean and stable.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Descriptive Commit Messages:</strong> Explain the purpose of changes clearly.</span>
        </li>
      </ul>
    </section>
  );
}

function Slide26() {
  return (
    <section className="slide-card" id="slide-26">
      <h1 className="slide-heading title-3d" style={{"fontSize": "3.5rem", "textAlign": "center", "marginTop": "1.5rem"}}>Any Questions?</h1>
      <p className="slide-lead" style={{"textAlign": "center", "marginTop": "1.5rem", "color": "var(--text-secondary)"}}>
        Open floor for questions, clarifications, or live command troubleshooting.
      </p>
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
      <p className="slide-lead">Key takeaways from today's session:</p>
      <ul className="bullet-list">
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Local Version Control:</strong> Use Git locally to track changes, create feature branches, and save commit snapshots.</span>
        </li>
        <li className="bullet-item">
          <svg className="icon-bullet" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Cloud Collaboration:</strong> Use GitHub to fork repositories, push feature branches, and submit Pull Requests.</span>
        </li>
      </ul>
    </section>
  );
}

function Slide28() {
  return (
    <section className="slide-card" id="slide-28" style={{"textAlign": "center", "justifyContent": "center"}}>
      <h1 className="slide-heading congrats-heading" style={{"marginBottom": "0.75rem", "textAlign": "center"}}>
        🎉 Congratulations!
      </h1>
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
