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
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (active) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
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
      <div className={`floating-logo-fab ${isFullscreen ? 'fullscreen-watermark' : ''}`}>
        <img src="images/SwuDevs%20Logo%20Variations%201.png" alt="SwuDevs Logo" className="floating-logo-img" />
      </div>

      {/* Floating Bottom-Right Official Git & GitHub Logos */}
      <div className={`floating-tech-logos ${isFullscreen ? 'fullscreen-watermark' : ''}`}>
        <svg className="floating-tech-icon" width="48" height="48" viewBox="0 0 128 128" fill="none" title="Git Version Control">
          <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/>
        </svg>
        <svg className="floating-tech-icon" width="48" height="48" viewBox="0 0 24 24" fill="#0f172a" title="GitHub Collaboration Platform">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </div>

      {/* Floating Sticky Bottom Navigation Bar */}
      <nav className={`bottom-nav ${isNavHidden ? 'nav-hidden' : ''}`}>
        <a href="../../gallery/index.html" className="nav-brand" title="Getting Started With Git">
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
      <div style={{
        minHeight: '100svh',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🔒</div>
        <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Access Denied</div>
        <div style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>{statusMsg}</div>
      </div>
    );
  }

  // ── Connecting screen ─────────────────────────────────────────────
  if (!peerConnected) {
    return (
      <div style={{
        minHeight: '100svh',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#F05032',
          boxShadow: '0 0 16px rgba(240, 80, 50, 0.3)',
          animation: 'pulse 1.5s ease-in-out infinite',
          marginBottom: '1.5rem'
        }} />
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(0.8); opacity: 0.4; }
            50% { transform: scale(1.3); opacity: 1; }
          }
        `}</style>
        <div style={{
          color: '#64748b',
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>{statusMsg}</div>
      </div>
    );
  }

  // ── Physical Remote UI ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100svh',
      background: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Remote Container - Minimalist Light Capsule Remote */}
      <div style={{
        width: '100%',
        maxWidth: '300px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '36px',
        padding: '1.5rem 1.25rem 2rem',
        boxShadow: '0 15px 35px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.1rem',
        boxSizing: 'border-box'
      }}>

        {/* ── Top notch blaster area ── */}
        <div style={{ width: '40px', height: '4px', background: '#cbd5e1', borderRadius: '99px', marginBottom: '0.25rem' }} />

        {/* ── Display Screen ── */}
        <div style={{
          width: '100%',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem 1.15rem',
          boxSizing: 'border-box'
        }}>
          {/* Screen Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#F05032', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-display)' }}>GIT REMOTE</span>
            <span style={{ fontSize: '0.625rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              SLIDE {currentSlideInfo.index + 1} / {totalSlides}
            </span>
          </div>
          {/* Slide title */}
          <div style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.4,
            height: '2.8em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-word',
            fontFamily: 'var(--font-display)'
          }}>
            {currentSlideInfo.title}
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: '0.85rem', height: '3px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #F05032, #ff8c6b)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* ── Screen Mode Controls (Fullscreen & Minimize) ── */}
        <div style={{ display: 'flex', gap: '0.6rem', width: '100%' }}>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              }
            }}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            Fullscreen
          </button>

          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
            }}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/>
            </svg>
            Minimize
          </button>
        </div>

        {/* ── Slide Picker ── */}
        <select
          onChange={handleSelectJump}
          value={currentSlideInfo.index}
          style={{
            width: '100%',
            padding: '0.55rem 0.85rem',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '0.78rem',
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23475569' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'></path></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.85rem center',
            backgroundSize: '11px'
          }}
        >
          {tocOptions.map((opt, idx) => (
            <option key={opt.value} value={idx}>{opt.label}</option>
          ))}
        </select>

        {/* ── Physical Remote Vertically Stacked Keys ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginTop: '0.15rem' }}>
          
          {/* PREVIOUS BUTTON (Top Key) */}
          <button
            onPointerDown={() => setPressing('prev')}
            onPointerUp={() => setPressing(null)}
            onPointerLeave={() => setPressing(null)}
            onClick={() => sendCommand('PREV')}
            style={{
              width: '100%',
              height: '56px',
              borderRadius: '14px',
              border: '1px solid #cbd5e1',
              background: pressing === 'prev' ? '#e2e8f0' : '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: pressing === 'prev' ? 'scale(0.96)' : 'scale(1)',
              boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>PREVIOUS</span>
          </button>

          {/* NEXT BUTTON (Dominant Bottom Key - Git Orange) */}
          <button
            onPointerDown={() => setPressing('next')}
            onPointerUp={() => setPressing(null)}
            onPointerLeave={() => setPressing(null)}
            onClick={() => sendCommand('NEXT')}
            style={{
              width: '100%',
              height: '72px',
              borderRadius: '14px',
              border: 'none',
              background: pressing === 'next' ? '#d93c1e' : '#F05032',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 12px rgba(240, 80, 50, 0.2)',
              transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: pressing === 'next' ? 'scale(0.96)' : 'scale(1)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>NEXT SLIDE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}

// ── Desktop-Only Gate shown to phone/tablet users ─────────────────────────
function MobileBlockGate() {
  return (
    <div style={{
      minHeight: '100svh',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      fontFamily: 'var(--font-sans)',
      textAlign: 'center',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Git logo */}
      <svg width="48" height="48" viewBox="0 0 128 128" fill="none" style={{ marginBottom: '1.75rem', flexShrink: 0 }}>
        <path d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.8 17.7l20.6 20.6c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l19.8 19.8c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.3-6.4-2.2-9.6L67.6 56.6v23.2c.8.4 1.6 1 2.3 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .7-.7 1.3-1.3 2.1-1.7V55.6c-.8-.4-1.4-1-2.1-1.7-2.6-2.6-3.3-6.4-2.2-9.6L34.1 23.5 3.4 54.2c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.4z" fill="#F05032"/>
      </svg>

      <h1 style={{
        color: '#0f172a',
        fontWeight: 800,
        fontSize: 'clamp(1.4rem, 6vw, 1.75rem)',
        marginBottom: '0.75rem',
        lineHeight: 1.25,
        fontFamily: 'var(--font-display)'
      }}>
        Desktop Only
      </h1>

      <p style={{
        color: '#64748b',
        fontSize: 'clamp(0.9rem, 4vw, 1rem)',
        lineHeight: 1.65,
        maxWidth: '280px',
        margin: '0 auto'
      }}>
        Please open this on a laptop or desktop to view the presentation.
      </p>
    </div>
  );
}

export default App;
