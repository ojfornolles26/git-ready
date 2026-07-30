import React, { useState, useEffect, useRef } from 'react';
import slides from './slides_components';

// Detect mobile/tablet devices — allow #remote hash through on phone
function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || '';
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua)
    || (navigator.maxTouchPoints > 1 && window.screen.width < 1024);
}

const tocOptions = [
  { value: "slide-1", label: "1. Welcome & Introduction" },
  { value: "slide-2", label: "2. Concept: What is Git?" },
  { value: "slide-3", label: "3. Concept: What is GitHub?" },
  { value: "slide-4", label: "4. Concept: Git vs GitHub Differences" },
  { value: "slide-5", label: "5. Concept: Why Version Control?" },
  { value: "slide-6", label: "6. Concept: The 3 Local Git Areas" },
  { value: "slide-7", label: "7. Concept: Starting a Project (git init vs clone)" },
  { value: "slide-8", label: "8. Concept: Complete Workflow Overview" },
  { value: "slide-9", label: "9. TRANSITION: Live Hands-On Starts Now!" },
  { value: "slide-10", label: "10. Hands-On Step 1: Environment Setup" },
  { value: "slide-11", label: "11. Hands-On Step 2: Fork & Clone Repository" },
  { value: "slide-12", label: "12. Hands-On Step 3: Git Status" },
  { value: "slide-13", label: "13. Hands-On Step 4: Inspecting Changes (git diff & log)" },
  { value: "slide-14", label: "14. Hands-On Step 5: Feature Branch (git switch / checkout)" },
  { value: "slide-15", label: "15. Hands-On Step 6 (Part 1): Add Card Header & Name" },
  { value: "slide-16", label: "16. Hands-On Step 6 (Part 2): Bio, Tags & Links" },
  { value: "slide-17", label: "17. Hands-On Step 7: Stage Changes (git add)" },
  { value: "slide-18", label: "18. Hands-On Step 8: Commit Snapshot (git commit)" },
  { value: "slide-19", label: "19. Hands-On Pro Tip: Safety Net (git restore & reset)" },
  { value: "slide-20", label: "20. Hands-On Step 9: Push Branch to GitHub" },
  { value: "slide-21", label: "21. Hands-On Step 10: Create Pull Request" },
  { value: "slide-22", label: "22. Hands-On Step 11: Live PR Review & Merge" },
  { value: "slide-23", label: "23. Hands-On Step 12: Sync Cards (git pull)" },
  { value: "slide-24", label: "24. Handling Merge Conflicts" },
  { value: "slide-25", label: "25. Core Git Best Practices" },
  { value: "slide-26", label: "26. Any Questions? (Q&A)" },
  { value: "slide-27", label: "27. Workshop Summary" },
  { value: "slide-28", label: "28. Congratulations" }
];

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);

  const [isRemoteView] = useState(window.location.hash.startsWith('#remote'));
  const [isMobile] = useState(isMobileDevice());

  const [peerId, setPeerId] = useState(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [showRemoteModal, setShowRemoteModal] = useState(false);
  // PIN state: presenterPin is set by the presenter; pinInput is the live field value
  const [presenterPin, setPresenterPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [pinConfirmed, setPinConfirmed] = useState(false);
  const peerRef = useRef(null);
  const connRef = useRef(null);

  // Block mobile on non-remote slides view
  // (isRemoteView and isMobile handled in render gate below)

  // Initialize PeerJS on Laptop Presentation screen
  useEffect(() => {
    if (isRemoteView) return;

    let peer;
    try {
      peer = new window.Peer();
      peerRef.current = peer;

      peer.on('open', (id) => {
        setPeerId(id);
      });

      peer.on('connection', (conn) => {
        if (connRef.current) {
          connRef.current.close();
        }
        connRef.current = conn;
        let authed = false;

        conn.on('open', () => {
          // Do NOT mark connected yet — wait for AUTH message with PIN
        });

        conn.on('data', (data) => {
          // First message must be AUTH with matching PIN
          if (!authed) {
            if (data && data.type === 'AUTH') {
              // Read the CURRENT presenterPin via ref so the effect closure sees it
              const currentPin = presenterPinRef.current;
              if (currentPin && data.pin === currentPin) {
                authed = true;
                setPeerConnected(true);
                conn.send({ type: 'AUTH_OK' });
                conn.send({
                  type: 'SYNC',
                  index: currentSlideIndex,
                  title: tocOptions[currentSlideIndex].label
                });
              } else {
                conn.send({ type: 'AUTH_FAIL' });
                conn.close();
              }
            }
            return;
          }

          if (data === 'NEXT') {
            nextSlide();
          } else if (data === 'PREV') {
            prevSlide();
          } else if (typeof data === 'string' && data.startsWith('JUMP:')) {
            const idx = parseInt(data.split(':')[1], 10);
            if (!isNaN(idx) && idx >= 0 && idx < slides.length) {
              setCurrentSlideIndex(idx);
            }
          }
        });

        conn.on('close', () => {
          setPeerConnected(false);
        });

        conn.on('error', () => {
          setPeerConnected(false);
        });
      });
    } catch (err) {
      console.warn("PeerJS initialization failed:", err);
    }

    return () => {
      if (peer) peer.destroy();
    };
  }, [isRemoteView]);

  // Keep a ref of presenterPin so the peer connection handler always sees current value
  const presenterPinRef = useRef('');
  useEffect(() => { presenterPinRef.current = presenterPin; }, [presenterPin]);

  // Sync active slide index back to the connected Phone
  useEffect(() => {
    if (connRef.current && peerConnected && !isRemoteView) {
      try {
        connRef.current.send({
          type: 'SYNC',
          index: currentSlideIndex,
          title: tocOptions[currentSlideIndex].label
        });
      } catch (err) {
        console.warn("Failed to send slide sync update:", err);
      }
    }
  }, [currentSlideIndex, peerConnected, isRemoteView]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchScrollContainer = useRef(null);

  // Stepping slides helper
  const stepSlide = (direction) => {
    setCurrentSlideIndex((prev) => {
      let nextIdx = prev + direction;
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= slides.length) nextIdx = slides.length - 1;
      return nextIdx;
    });
  };

  const nextSlide = () => stepSlide(1);
  const prevSlide = () => stepSlide(-1);

  // Toggle Fullscreen Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Fullscreen state syncing
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Trackpad & Mouse Wheel Navigation
  useEffect(() => {
    let lastWheelTime = 0;
    const WHEEL_DEBOUNCE_MS = 650;
    const WHEEL_DELTA_THRESHOLD = 30;

    const handleWheel = (e) => {
      const activeCard = document.querySelector('.slide-card.active');
      if (activeCard) {
        let targetEl = e.target;
        if (targetEl && targetEl.closest('.code-wrapper')) {
          return; // Allow internal scroll of code blocks
        }
        while (targetEl && targetEl !== activeCard && targetEl !== document.body) {
          const overflowY = window.getComputedStyle(targetEl).overflowY;
          if ((overflowY === 'auto' || overflowY === 'scroll') && targetEl.scrollHeight > targetEl.clientHeight) {
            const isAtTop = targetEl.scrollTop === 0 && e.deltaY < 0;
            const isAtBottom = Math.abs(targetEl.scrollHeight - targetEl.clientHeight - targetEl.scrollTop) < 3 && e.deltaY > 0;
            if (!isAtTop && !isAtBottom) {
              return;
            }
          }
          targetEl = targetEl.parentElement;
        }

        if (activeCard.scrollHeight > activeCard.clientHeight) {
          const isAtTop = activeCard.scrollTop === 0 && e.deltaY < 0;
          const isAtBottom = Math.abs(activeCard.scrollHeight - activeCard.clientHeight - activeCard.scrollTop) < 3 && e.deltaY > 0;
          if (!isAtTop && !isAtBottom) {
            return;
          }
        }
      }

      if (Math.abs(e.deltaY) < WHEEL_DELTA_THRESHOLD) return;

      const now = Date.now();
      if (now - lastWheelTime < WHEEL_DEBOUNCE_MS) return;
      lastWheelTime = now;

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Copy protection & typing practice enforcement
  useEffect(() => {
    const handleCopyCutContext = (e) => {
      if (e.target && e.target.closest('.copyable-link, .btn-copy-url')) {
        return;
      }
      e.preventDefault();
    };

    const codeWrappers = document.querySelectorAll('.code-wrapper, code');
    codeWrappers.forEach(el => {
      el.addEventListener('copy', handleCopyCutContext);
      el.addEventListener('cut', handleCopyCutContext);
      el.addEventListener('contextmenu', handleCopyCutContext);
    });

    return () => {
      codeWrappers.forEach(el => {
        el.removeEventListener('copy', handleCopyCutContext);
        el.removeEventListener('cut', handleCopyCutContext);
        el.removeEventListener('contextmenu', handleCopyCutContext);
      });
    };
  }, [currentSlideIndex]);

  // Touch handlers for mobile swipe guestures
  const handleTouchStart = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;

    let targetEl = e.target;
    touchScrollContainer.current = null;
    const activeCard = document.querySelector('.slide-card.active');

    while (targetEl && targetEl !== document.body) {
      const style = window.getComputedStyle(targetEl);
      const overflowY = style.overflowY;
      const isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || targetEl.classList.contains('code-wrapper'));
      if (isScrollable && targetEl.scrollHeight > targetEl.clientHeight + 2) {
        touchScrollContainer.current = targetEl;
        break;
      }
      if (targetEl === activeCard) break;
      targetEl = targetEl.parentElement;
    }

    if (!touchScrollContainer.current && activeCard && activeCard.scrollHeight > activeCard.clientHeight + 2) {
      touchScrollContainer.current = activeCard;
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
      if (touchScrollContainer.current) {
        if (touchScrollContainer.current.classList.contains('code-wrapper')) {
          return; // Prevent slide change inside code scrolling
        }
        const isSwipingUp = diffY < 0;
        const isSwipingDown = diffY > 0;
        const currentScrollTop = touchScrollContainer.current.scrollTop;
        const maxScroll = touchScrollContainer.current.scrollHeight - touchScrollContainer.current.clientHeight;

        if (isSwipingUp && currentScrollTop < maxScroll - 5) return;
        if (isSwipingDown && currentScrollTop > 5) return;
      }

      if (diffY < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleDropdownChange = (e) => {
    const val = e.target.value;
    const num = parseInt(val.replace('slide-', ''), 10);
    if (!isNaN(num)) {
      setCurrentSlideIndex(num - 1);
    }
  };

  // Render SVG icons for bottom bar dynamically to keep markup clean
  const renderPrevIcon = () => "▲";
  const renderNextIcon = () => "▼";
  const renderFullscreenIcon = () => {
    if (isFullscreen) {
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 14h6v6m10-10h-6V4m0 16v-6h6M10 4v6H4"/>
        </svg>
      );
    }
    return (
      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
      </svg>
    );
  };

  const formattedCounter = () => {
    const num = String(currentSlideIndex + 1).padStart(2, '0');
    const total = String(slides.length).padStart(2, '0');
    return `${num} / ${total}`;
  };

  // Mobile gate: block phones from the slide deck (but NOT the #remote view)
  if (isMobile && !isRemoteView) {
    return <MobileBlockGate />;
  }

  if (isRemoteView) {
    return <PhoneRemoteView />;
  }

  return (
    <>
      <main 
        className="slides-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((SlideComponent, idx) => {
          const element = SlideComponent();
          const existingClassName = element.props.className || '';
          const newClassName = `${existingClassName} ${idx === currentSlideIndex ? 'active' : ''}`.trim();
          return React.cloneElement(element, {
            key: `slide-${idx + 1}`,
            className: newClassName
          });
        })}
      </main>

      {/* Floating Bottom-Left Organization Logo FAB */}
      <div className="floating-logo-fab">
        <img src="images/SwuDevs%20Logo%20Variations%201.png" alt="SwuDevs Logo" className="floating-logo-img" />
      </div>

      {/* Floating Bottom-Right Official Git & GitHub Logos */}
      <div className="floating-tech-logos">
        <svg className="floating-tech-icon" width="48" height="48" viewBox="0 0 128 128" fill="none" title="Git Version Control">
          <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/>
        </svg>
        <svg className="floating-tech-icon" width="48" height="48" viewBox="0 0 24 24" fill="#0f172a" title="GitHub Collaboration Platform">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </div>

      {/* Floating Sticky Bottom Navigation Bar */}
      <nav className={`bottom-nav ${isNavHidden ? 'nav-hidden' : ''}`}>
        <a href="../gallery/index.html" className="nav-brand" title="Getting Started With Git">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Getting Started With Git</span>
        </a>

        <span className="nav-counter">{formattedCounter()}</span>

        <div className="nav-divider"></div>

        <div className="nav-controls">
          <button className="btn-nav-step" title="Previous Slide Section" onClick={prevSlide}>
            {renderPrevIcon()}
          </button>
          
          <select 
            className="toc-select" 
            aria-label="Jump to Slide Section"
            value={`slide-${currentSlideIndex + 1}`}
            onChange={handleDropdownChange}
          >
            {tocOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button className="btn-nav-step" title="Next Slide Section" onClick={nextSlide}>
            {renderNextIcon()}
          </button>
          
          <button 
            className="btn-nav-step" 
            title="Presentation Mobile Remote Control"
            onClick={() => setShowRemoteModal(true)}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </button>

          <button 
            className="btn-nav-step" 
            title={isFullscreen ? "Exit Fullscreen (F)" : "Toggle Fullscreen Presentation Mode (F)"}
            onClick={toggleFullscreen}
          >
            {renderFullscreenIcon()}
          </button>

          <button 
            className="btn-nav-step" 
            title="Minimize/Hide Navigation Bar"
            onClick={() => setIsNavHidden(true)}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Floating Restore Navigation Button */}
      {isNavHidden && (
        <button 
          className="btn-restore-nav" 
          title="Show Navigation Bar" 
          onClick={() => setIsNavHidden(false)}
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-floating)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'background 0.2s ease'
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}

      {showRemoteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '24px', padding: '2.5rem',
            maxWidth: '440px', width: '90%', textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)', position: 'relative'
          }}>
            <button onClick={() => { setShowRemoteModal(false); setPinConfirmed(false); setPinInput(''); }}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', fontSize: '1.75rem', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}>
              &times;
            </button>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Presenter Mobile Remote
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {pinConfirmed ? 'Scan QR code to connect mobile remote.' : 'Set a PIN to secure your remote session.'}
            </p>

            {/* Step 1: PIN Setup */}
            {!pinConfirmed ? (
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 4–6 digit PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={(e) => { if (e.key === 'Enter' && pinInput.length >= 4) { setPresenterPin(pinInput); setPinConfirmed(true); } }}
                  style={{
                    width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                    border: '2px solid var(--border-color)', fontSize: '1.5rem',
                    fontWeight: 800, textAlign: 'center', letterSpacing: '0.5rem',
                    color: 'var(--text-primary)', outline: 'none', marginBottom: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  disabled={pinInput.length < 4}
                  onClick={() => { setPresenterPin(pinInput); setPinConfirmed(true); }}
                  style={{
                    width: '100%', padding: '0.9rem', borderRadius: '12px',
                    background: pinInput.length >= 4 ? 'var(--primary)' : '#e2e8f0',
                    color: pinInput.length >= 4 ? '#fff' : '#94a3b8',
                    border: 'none', fontWeight: 700, fontSize: '1rem', cursor: pinInput.length >= 4 ? 'pointer' : 'not-allowed'
                  }}
                >
                  Generate Remote QR
                </button>
              </div>
            ) : (
              <div>
                {/* QR Code */}
                <div style={{
                  background: '#f8fafc', border: '1px solid var(--border-color)',
                  padding: '1.25rem', borderRadius: '16px', display: 'inline-block', marginBottom: '1.25rem'
                }}>
                  {peerId ? (
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(
                        window.location.origin + window.location.pathname + '#remote?peer=' + peerId + '&pin=' + presenterPin
                      )}`}
                      alt="Remote QR Code"
                      style={{ display: 'block', width: '190px', height: '190px' }}
                    />
                  ) : (
                    <div style={{ width: '190px', height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Generating...
                    </div>
                  )}
                </div>
                {/* PIN reminder */}
                <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Session PIN: <strong style={{ letterSpacing: '0.2rem', color: 'var(--text-primary)' }}>{presenterPin.split('').map(() => '•').join('')}</strong>
                </div>
                {/* Status badge */}
                <div style={{
                  padding: '0.45rem 1.1rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 700, display: 'inline-block',
                  background: peerConnected ? 'rgba(16,185,129,0.12)' : '#f1f5f9',
                  color: peerConnected ? 'var(--success)' : '#475569',
                  border: `1px solid ${peerConnected ? 'var(--success)' : '#cbd5e1'}`
                }}>
                  {peerConnected ? 'Connected' : 'Waiting for phone...'}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => { setPinConfirmed(false); setPinInput(''); setPresenterPin(''); setPeerConnected(false); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}>
                    Change PIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PhoneRemoteView() {
  const [peerConnected, setPeerConnected] = useState(false);
  const [authState, setAuthState] = useState('connecting'); // 'connecting' | 'ok' | 'fail'
  const [statusMsg, setStatusMsg] = useState('Connecting...');
  const [currentSlideInfo, setCurrentSlideInfo] = useState({ index: 0, title: '...' });
  const [pressing, setPressing] = useState(null); // 'next' | 'prev'
  const connRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    const peerMatch = hash.match(/peer=([^&?#]+)/);
    const pinMatch = hash.match(/pin=([^&?#]+)/);
    const peerIdFromUrl = peerMatch ? peerMatch[1] : null;
    const pinFromUrl = pinMatch ? pinMatch[1] : null;

    if (!peerIdFromUrl || !pinFromUrl) {
      setAuthState('fail');
      setStatusMsg('Invalid remote link. Please scan the QR code again.');
      return;
    }

    setStatusMsg('Connecting to presentation...');
    const peer = new window.Peer();
    peerRef.current = peer;

    peer.on('open', () => {
      const conn = peer.connect(peerIdFromUrl);
      connRef.current = conn;

      conn.on('open', () => {
        // Send PIN auth handshake
        conn.send({ type: 'AUTH', pin: pinFromUrl });
        setStatusMsg('Verifying PIN...');
      });

      conn.on('data', (data) => {
        if (data && data.type === 'AUTH_OK') {
          setPeerConnected(true);
          setAuthState('ok');
          setStatusMsg('Connected');
        } else if (data && data.type === 'AUTH_FAIL') {
          setAuthState('fail');
          setStatusMsg('Incorrect PIN. Access denied.');
          conn.close();
        } else if (data && data.type === 'SYNC') {
          setCurrentSlideInfo({ index: data.index, title: data.title });
        }
      });

      conn.on('close', () => {
        setPeerConnected(false);
        if (authState === 'ok') setStatusMsg('Disconnected.');
      });

      conn.on('error', () => {
        setPeerConnected(false);
        setStatusMsg('Connection error.');
      });
    });

    peer.on('error', () => {
      setAuthState('fail');
      setStatusMsg('Unable to reach the network.');
    });

    return () => { if (peer) peer.destroy(); };
  }, []);

  const sendCommand = (cmd) => {
    if (connRef.current && peerConnected) connRef.current.send(cmd);
  };

  const handleSelectJump = (e) => {
    const idx = parseInt(e.target.value, 10);
    if (!isNaN(idx)) sendCommand(`JUMP:${idx}`);
  };

  const totalSlides = tocOptions.length;
  const progress = totalSlides > 0 ? ((currentSlideInfo.index + 1) / totalSlides) * 100 : 0;

  // ── Auth fail screen ──────────────────────────────────────────────
  if (authState === 'fail') {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔒</div>
        <div style={{ color: '#f87171', fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Access Denied</div>
        <div style={{ color: '#94a3b8', fontSize: '0.95rem', textAlign: 'center' }}>{statusMsg}</div>
      </div>
    );
  }

  // ── Connecting screen ─────────────────────────────────────────────
  if (!peerConnected) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #334155', borderTopColor: '#F05032', borderRadius: '50%', animation: 'spin 0.9s linear infinite', marginBottom: '1.5rem' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1rem' }}>{statusMsg}</div>
      </div>
    );
  }

  // ── Physical Remote UI ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Remote Body */}
      <div style={{
        width: '100%',
        maxWidth: '320px',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '48px',
        padding: '2rem 1.75rem 2.5rem',
        boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>

        {/* ── Top notch area ── */}
        <div style={{ width: '50px', height: '5px', background: '#334155', borderRadius: '99px', marginBottom: '0.25rem' }} />

        {/* ── Display Screen ── */}
        <div style={{
          width: '100%',
          background: '#0a0f1e',
          border: '2px solid #1e293b',
          borderRadius: '20px',
          padding: '1rem 1.25rem',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
        }}>
          {/* Screen glow header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#F05032', textTransform: 'uppercase', letterSpacing: '0.08em' }}>GIT REMOTE</span>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          </div>
          {/* Slide counter */}
          <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
            SLIDE {currentSlideInfo.index + 1} / {totalSlides}
          </div>
          {/* Slide title */}
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.4, minHeight: '2.5em' }}>
            {currentSlideInfo.title}
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: '0.75rem', height: '3px', background: '#1e293b', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #F05032, #ff8c6b)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* ── Slide Picker ── */}
        <select
          onChange={handleSelectJump}
          value={currentSlideInfo.index}
          style={{
            width: '100%', padding: '0.65rem 1rem', borderRadius: '12px',
            border: '1px solid #334155', background: '#1e293b', color: '#94a3b8',
            fontSize: '0.82rem', fontWeight: 600, outline: 'none', cursor: 'pointer'
          }}
        >
          {tocOptions.map((opt, idx) => (
            <option key={opt.value} value={idx}>{opt.label}</option>
          ))}
        </select>

        {/* ── D-Pad Navigation Area ── */}
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          {/* D-pad center circle */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '60px', height: '60px', borderRadius: '50%',
            background: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2
          }}>
            <svg width="20" height="20" viewBox="0 0 128 128" fill="#F05032">
              <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z"/>
            </svg>
          </div>

          {/* UP / PREV */}
          <button
            onPointerDown={() => setPressing('prev')}
            onPointerUp={() => setPressing(null)}
            onPointerLeave={() => setPressing(null)}
            onClick={() => sendCommand('PREV')}
            style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60px', height: '68px', borderRadius: '16px 16px 4px 4px',
              background: pressing === 'prev' ? '#F05032' : 'linear-gradient(180deg, #293548 0%, #1e293b 100%)',
              border: 'none',
              boxShadow: pressing === 'prev' ? 'inset 0 3px 6px rgba(0,0,0,0.4)' : '0 4px 0 #0d1526, inset 0 1px 0 rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
              cursor: 'pointer', transition: 'all 0.1s ease', transform: `translateX(-50%) translateY(${pressing === 'prev' ? '4px' : '0px'})`,
              color: pressing === 'prev' ? '#fff' : '#94a3b8'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>PREV</span>
          </button>

          {/* DOWN / NEXT */}
          <button
            onPointerDown={() => setPressing('next')}
            onPointerUp={() => setPressing(null)}
            onPointerLeave={() => setPressing(null)}
            onClick={() => sendCommand('NEXT')}
            style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '60px', height: '68px', borderRadius: '4px 4px 16px 16px',
              background: pressing === 'next' ? '#F05032' : 'linear-gradient(180deg, #293548 0%, #1e293b 100%)',
              border: 'none',
              boxShadow: pressing === 'next' ? 'inset 0 3px 6px rgba(0,0,0,0.4)' : '0 4px 0 #0d1526, inset 0 1px 0 rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
              cursor: 'pointer', transition: 'all 0.1s ease', transform: `translateX(-50%) translateY(${pressing === 'next' ? '4px' : '0px'})`,
              color: pressing === 'next' ? '#fff' : '#94a3b8'
            }}
          >
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>NEXT</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {/* LEFT arm spacer */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
            width: '60px', height: '52px', borderRadius: '16px 4px 4px 16px',
            background: 'linear-gradient(90deg, #1a2235 0%, #1e293b 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 0 #0d1526'
          }} />
          {/* RIGHT arm spacer */}
          <div style={{
            position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',
            width: '60px', height: '52px', borderRadius: '4px 16px 16px 4px',
            background: 'linear-gradient(90deg, #1e293b 0%, #1a2235 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 0 #0d1526'
          }} />
        </div>

        {/* ── Bottom indicator strip ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Live Session</span>
        </div>

        {/* ── Bottom notch ── */}
        <div style={{ width: '50px', height: '5px', background: '#334155', borderRadius: '99px', marginTop: '0.25rem' }} />
      </div>
    </div>
  );
}

// ── Desktop-Only Gate shown to phone/tablet users ─────────────────────────
function MobileBlockGate() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 2rem',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      {/* Git logo */}
      <svg width="64" height="64" viewBox="0 0 128 128" fill="none" style={{ marginBottom: '1.5rem' }}>
        <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/>
      </svg>
      {/* Monitor icon */}
      <div style={{ marginBottom: '1.5rem' }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      </div>
      <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
        Desktop Only
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px' }}>
        This presentation is designed to be viewed on a laptop or desktop computer. Please open it on a bigger screen.
      </p>
      <div style={{ marginTop: '2rem', padding: '0.5rem 1.25rem', borderRadius: '99px', background: 'rgba(240,80,50,0.12)', border: '1px solid rgba(240,80,50,0.25)', color: '#F05032', fontSize: '0.82rem', fontWeight: 700 }}>
        Getting Started With Git — Workshop Slides
      </div>
    </div>
  );
}

export default App;
