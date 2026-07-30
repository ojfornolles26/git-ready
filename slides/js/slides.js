// Global Copy Repository URL helper
window.copyRepoUrl = function(btn) {
  const url = "https://github.com/ojfornolles26/git-ready.git";
  
  function showSuccess() {
    if (!btn) return;
    const label = btn.querySelector('span');
    const originalText = label ? label.textContent : 'Copy';
    if (label) label.textContent = 'Copied! ✓';
    btn.classList.add('copied');
    setTimeout(() => {
      if (label) label.textContent = originalText;
      btn.classList.remove('copied');
    }, 1600);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(showSuccess).catch(() => {
      fallbackCopy();
    });
  } else {
    fallbackCopy();
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showSuccess();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const tocSelect = document.getElementById('toc-select');
  const slideCards = Array.from(document.querySelectorAll('.slide-card'));
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');
  const slideCounter = document.getElementById('slide-counter');

  let currentIdx = 0;

  function updateCounter(idx) {
    if (!slideCounter) return;
    const num = String(idx + 1).padStart(2, '0');
    const total = String(slideCards.length).padStart(2, '0');
    slideCounter.textContent = `${num} / ${total}`;
  }

  // Display single active slide
  function showSlide(idx) {
    if (idx < 0) idx = 0;
    if (idx >= slideCards.length) idx = slideCards.length - 1;
    currentIdx = idx;

    slideCards.forEach((card, i) => {
      if (i === currentIdx) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (tocSelect) {
      tocSelect.value = slideCards[currentIdx].id;
    }

    updateCounter(currentIdx);
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
  }

  // Toggle Fullscreen Mode
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Keyboard navigation shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore keybindings if focus is inside an input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

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
  });

  // Smart Trackpad & Mouse Wheel Navigation with Inertia Lock & Internal Content Protection
  let lastWheelTime = 0;
  const WHEEL_DEBOUNCE_MS = 650; // Completely blocks trackpad momentum velocity events
  const WHEEL_DELTA_THRESHOLD = 30; // Minimum scroll delta required to trigger intentional slide step

  document.addEventListener('wheel', (e) => {
    // 1. Check if user is scrolling inside an active card or scrollable element
    const activeCard = slideCards[currentIdx];
    if (activeCard) {
      let targetEl = e.target;
      if (targetEl && targetEl.closest('.code-wrapper')) {
        return; // Always prevent slide changes when scrolling inside code blocks!
      }
      while (targetEl && targetEl !== activeCard && targetEl !== document.body) {
        const overflowY = window.getComputedStyle(targetEl).overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && targetEl.scrollHeight > targetEl.clientHeight) {
          const isAtTop = targetEl.scrollTop === 0 && e.deltaY < 0;
          const isAtBottom = Math.abs(targetEl.scrollHeight - targetEl.clientHeight - targetEl.scrollTop) < 3 && e.deltaY > 0;
          if (!isAtTop && !isAtBottom) {
            return; // Allow internal element scrolling without stepping slides!
          }
        }
        targetEl = targetEl.parentElement;
      }
      
      // Also check activeCard itself if it has overflow scrollable content
      if (activeCard.scrollHeight > activeCard.clientHeight) {
        const isAtTop = activeCard.scrollTop === 0 && e.deltaY < 0;
        const isAtBottom = Math.abs(activeCard.scrollHeight - activeCard.clientHeight - activeCard.scrollTop) < 3 && e.deltaY > 0;
        if (!isAtTop && !isAtBottom) {
          return;
        }
      }
    }

    // 2. Filter out tiny drift deltas
    if (Math.abs(e.deltaY) < WHEEL_DELTA_THRESHOLD) return;

    // 3. Enforce strict timing debounce lock against trackpad inertia momentum
    const now = Date.now();
    if (now - lastWheelTime < WHEEL_DEBOUNCE_MS) return;

    lastWheelTime = now;

    if (e.deltaY > 0) {
      nextSlide();
    } else if (e.deltaY < 0) {
      prevSlide();
    }
  }, { passive: true });

  // Touch Swipe navigation with internal scroll container protection
  let touchStartX = 0;
  let touchStartY = 0;
  let touchScrollContainer = null;

  document.addEventListener('touchstart', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;

    let targetEl = e.target;
    const activeCard = slideCards[currentIdx];
    touchScrollContainer = null;

    while (targetEl && targetEl !== document.body) {
      const style = window.getComputedStyle(targetEl);
      const overflowY = style.overflowY;
      const isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || targetEl.classList.contains('code-wrapper'));
      if (isScrollable && targetEl.scrollHeight > targetEl.clientHeight + 2) {
        touchScrollContainer = targetEl;
        break;
      }
      if (targetEl === activeCard) break;
      targetEl = targetEl.parentElement;
    }

    if (!touchScrollContainer && activeCard && activeCard.scrollHeight > activeCard.clientHeight + 2) {
      touchScrollContainer = activeCard;
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
      // If swipe started inside a scrollable container (e.g. .code-wrapper or scrollable card)
      if (touchScrollContainer) {
        if (touchScrollContainer.classList.contains('code-wrapper')) {
          return; // Always prevent slide changes when swiping inside code blocks!
        }
        const isSwipingUp = diffY < 0;    // User wants to scroll down into the code box
        const isSwipingDown = diffY > 0;  // User wants to scroll up into the code box

        const currentScrollTop = touchScrollContainer.scrollTop;
        const maxScroll = touchScrollContainer.scrollHeight - touchScrollContainer.clientHeight;

        // If swiping up to view lower code content, but container is not yet at the absolute bottom
        if (isSwipingUp && currentScrollTop < maxScroll - 5) {
          return; // Allow internal code box / card to scroll! Do NOT step slides.
        }

        // If swiping down to view higher code content, but container is not yet at the absolute top
        if (isSwipingDown && currentScrollTop > 5) {
          return; // Allow internal code box / card to scroll! Do NOT step slides.
        }
      }

      if (diffY < 0) nextSlide();
      else prevSlide();
    }
  }, false);

  // Setup TOC Selector Jump
  if (tocSelect) {
    tocSelect.addEventListener('change', (e) => {
      const targetId = e.target.value;
      const idx = slideCards.findIndex(c => c.id === targetId);
      if (idx !== -1) showSlide(idx);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  const fullscreenBtn = document.getElementById('btn-fullscreen');
  function updateFullscreenIcon() {
    if (!fullscreenBtn) return;
    if (document.fullscreenElement) {
      fullscreenBtn.title = "Exit Fullscreen (F)";
      fullscreenBtn.innerHTML = `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 14h6v6m10-10h-6V4m0 16v-6h6M10 4v6H4"/></svg>`;
    } else {
      fullscreenBtn.title = "Toggle Fullscreen Presentation Mode (F)";
      fullscreenBtn.innerHTML = `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`;
    }
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
  }

  // PREVENT COPY/PASTE ON COMMANDS TO ENFORCE HANDS-ON TYPING PRACTICE, BUT ALLOW COPYING REPO URL
  document.querySelectorAll('.code-wrapper, code').forEach(el => {
    el.addEventListener('copy', (e) => {
      if (e.target && e.target.closest('.copyable-link, .btn-copy-url')) {
        return true; // Allow copying repository URL!
      }
      e.preventDefault();
      return false;
    });
    el.addEventListener('cut', (e) => {
      if (e.target && e.target.closest('.copyable-link, .btn-copy-url')) {
        return true;
      }
      e.preventDefault();
      return false;
    });
    el.addEventListener('contextmenu', (e) => {
      if (e.target && e.target.closest('.copyable-link, .btn-copy-url')) {
        return true;
      }
      e.preventDefault();
      return false;
    });
  });

  // Show initial slide
  showSlide(0);
});
