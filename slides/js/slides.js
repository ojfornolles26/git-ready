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

  // Mouse wheel step navigation (debounced to prevent rapid skips)
  let wheelTimeout = false;
  document.addEventListener('wheel', (e) => {
    if (wheelTimeout) return;
    wheelTimeout = true;
    setTimeout(() => { wheelTimeout = false; }, 350);

    if (e.deltaY > 0) {
      nextSlide();
    } else if (e.deltaY < 0) {
      prevSlide();
    }
  }, { passive: true });

  // Touch Swipe navigation
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, false);

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 40) {
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

  // PREVENT COPY/PASTE TO ENFORCE HANDS-ON TYPING PRACTICE
  document.querySelectorAll('.code-wrapper, code').forEach(el => {
    el.addEventListener('copy', (e) => {
      e.preventDefault();
      return false;
    });
    el.addEventListener('cut', (e) => {
      e.preventDefault();
      return false;
    });
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  });

  // Show initial slide
  showSlide(0);
});
