import React, { useState, useEffect, useRef } from 'react';
import slides from './slides_components';

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

  const [isRemoteView, setIsRemoteView] = useState(window.location.hash.startsWith('#remote'));
  const [peerId, setPeerId] = useState(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [showRemoteModal, setShowRemoteModal] = useState(false);
  const peerRef = useRef(null);
  const connRef = useRef(null);

  // Sync hash changes (for reload/navigate back and forth)
  useEffect(() => {
    const handleHashChange = () => {
      setIsRemoteView(window.location.hash.startsWith('#remote'));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

        conn.on('open', () => {
          setPeerConnected(true);
          conn.send({
            type: 'SYNC',
            index: currentSlideIndex,
            title: tocOptions[currentSlideIndex].label
          });
        });

        conn.on('data', (data) => {
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
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.5rem',
            maxWidth: '420px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-color)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowRemoteModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.75rem',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                lineHeight: 1
              }}
            >
              &times;
            </button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Presenter Mobile Remote
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Scan QR code to connect mobile remote.
            </p>

            {/* QR Code Container */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              borderRadius: '16px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              {peerId ? (
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    window.location.origin + window.location.pathname + '#remote?peer=' + peerId
                  )}`} 
                  alt="Remote QR Code" 
                  style={{ display: 'block', width: '200px', height: '200px' }}
                />
              ) : (
                <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Generating connection key...
                </div>
              )}
            </div>

            {/* Connection Status Badge */}
            <div>
              <div style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-block',
                background: peerConnected ? 'rgba(16, 185, 129, 0.12)' : '#f1f5f9',
                color: peerConnected ? 'var(--success)' : '#475569',
                border: `1px solid ${peerConnected ? 'var(--success)' : '#cbd5e1'}`
              }}>
                {peerConnected ? 'Connected' : 'Waiting for phone...'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PhoneRemoteView() {
  const [targetPeerId, setTargetPeerId] = useState(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [currentSlideInfo, setCurrentSlideInfo] = useState({ index: 0, title: 'Welcome & Introduction' });
  const connRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/peer=([^&?]+)/);
    const peerIdFromUrl = match ? match[1] : null;
    setTargetPeerId(peerIdFromUrl);

    if (!peerIdFromUrl) {
      setConnectionStatus('No laptop Peer ID found in URL. Please scan the QR code again.');
      return;
    }

    setConnectionStatus('Connecting to PeerJS Network...');
    const peer = new window.Peer();
    peerRef.current = peer;

    peer.on('open', () => {
      setConnectionStatus(`Connecting to laptop Presentation...`);
      const conn = peer.connect(peerIdFromUrl);
      connRef.current = conn;

      conn.on('open', () => {
        setPeerConnected(true);
        setConnectionStatus('Connected to Laptop!');
      });

      conn.on('data', (data) => {
        if (data && data.type === 'SYNC') {
          setCurrentSlideInfo({ index: data.index, title: data.title });
        }
      });

      conn.on('close', () => {
        setPeerConnected(false);
        setConnectionStatus('Connection lost. Reconnecting...');
      });

      conn.on('error', (err) => {
        console.error(err);
        setPeerConnected(false);
        setConnectionStatus('Connection error. Please try again.');
      });
    });

    peer.on('error', (err) => {
      console.error(err);
      setConnectionStatus('Failed to connect to signaling network.');
    });

    return () => {
      if (peer) peer.destroy();
    };
  }, []);

  const sendCommand = (cmd) => {
    if (connRef.current && peerConnected) {
      connRef.current.send(cmd);
    }
  };

  const handleSelectJump = (e) => {
    const val = e.target.value;
    const index = parseInt(val, 10);
    if (!isNaN(index)) {
      sendCommand(`JUMP:${index}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#0f172a',
      color: '#ffffff',
      padding: '2rem 1.5rem',
      fontFamily: 'var(--font-sans)',
      textAlign: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.25rem', color: '#ff6b4a' }}>
          Git Slides Remote
        </h2>
        <div style={{
          fontSize: '0.85rem',
          padding: '0.35rem 1rem',
          borderRadius: '99px',
          background: peerConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: peerConnected ? '#10b981' : '#f87171',
          display: 'inline-block',
          fontWeight: 600,
          border: `1px solid ${peerConnected ? '#10b981' : '#ef4444'}`,
          marginBottom: '1.5rem'
        }}>
          {connectionStatus}
        </div>
      </div>

      {/* Screen Status Info */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '1.5rem 1.25rem',
        margin: '1.5rem 0',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 700 }}>
          Current Slide ({currentSlideInfo.index + 1} of {tocOptions.length})
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: '1.4', color: '#ffffff' }}>
          {currentSlideInfo.title}
        </div>
        
        {/* Dropdown Jump list */}
        {peerConnected && (
          <select 
            onChange={handleSelectJump}
            value={currentSlideInfo.index}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: '#1e293b',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              width: '100%',
              outline: 'none'
            }}
          >
            {tocOptions.map((opt, idx) => (
              <option key={opt.value} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Big Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <button 
          onClick={() => sendCommand('NEXT')}
          disabled={!peerConnected}
          style={{
            padding: '1.5rem',
            borderRadius: '16px',
            background: peerConnected ? 'var(--primary)' : '#1e293b',
            color: '#ffffff',
            border: 'none',
            fontSize: '1.5rem',
            fontWeight: 800,
            cursor: 'pointer',
            opacity: peerConnected ? 1 : 0.5,
            boxShadow: peerConnected ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          Next Slide ➔
        </button>
        <button 
          onClick={() => sendCommand('PREV')}
          disabled={!peerConnected}
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: peerConnected ? 'rgba(255, 255, 255, 0.08)' : '#1e293b',
            color: peerConnected ? '#ffffff' : '#94a3b8',
            border: peerConnected ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
            fontSize: '1.15rem',
            fontWeight: 700,
            cursor: 'pointer',
            opacity: peerConnected ? 1 : 0.5,
            transition: 'all 0.15s ease'
          }}
        >
          Previous Slide
        </button>
      </div>
    </div>
  );
}

export default App;
