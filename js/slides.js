document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const currentIndicator = document.getElementById('current-slide-num');
  const totalIndicator = document.getElementById('total-slides-num');
  const progressBar = document.getElementById('progress-bar-fill');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const overviewBtn = document.getElementById('overview-btn');
  const overviewModal = document.getElementById('overview-modal');
  const overviewGrid = document.getElementById('overview-grid');

  let currentIndex = 0;

  if (slides.length === 0) return;

  // Initialize slides
  function initSlides() {
    if (totalIndicator) totalIndicator.textContent = slides.length;
    buildOverviewGrid();
    showSlide(0);
  }

  // Display specific slide
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    currentIndex = index;

    // Update UI elements
    if (currentIndicator) currentIndicator.textContent = currentIndex + 1;

    const progressPct = ((currentIndex + 1) / slides.length) * 100;
    if (progressBar) progressBar.style.width = `${progressPct}%`;

    // Highlight active thumbnail in overview grid
    if (overviewGrid) {
      const thumbs = overviewGrid.querySelectorAll('.thumb-card');
      thumbs.forEach((t, i) => {
        if (i === currentIndex) t.classList.add('active');
        else t.classList.remove('active');
      });
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Fullscreen Mode Toggle
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

  // Build Thumbnail Overview Grid
  function buildOverviewGrid() {
    if (!overviewGrid) return;

    overviewGrid.innerHTML = slides.map((slide, i) => {
      const title = slide.querySelector('.slide-title')?.textContent || `Slide ${i + 1}`;
      const tag = slide.querySelector('.slide-tag')?.textContent || 'SECTION';

      return `
        <div class="thumb-card ${i === 0 ? 'active' : ''}" data-index="${i}">
          <span class="thumb-num">${tag} • #${i + 1}</span>
          <div class="thumb-title">${escapeHtml(title)}</div>
        </div>
      `;
    }).join('');

    overviewGrid.querySelectorAll('.thumb-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        showSlide(idx);
        closeOverviewModal();
      });
    });
  }

  function toggleOverviewModal() {
    if (!overviewModal) return;
    overviewModal.classList.toggle('active');
  }

  function closeOverviewModal() {
    if (!overviewModal) return;
    overviewModal.classList.remove('active');
  }

  // Setup Code Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.parentElement.querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = 'var(--slide-emerald)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 1800);
        });
      }
    });
  });

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Keyboard Navigation Handlers
  document.addEventListener('keydown', (e) => {
    // Ignore keybindings if inside an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
      case 'l':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'h':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'm':
      case 'M':
      case 'o':
      case 'O':
        e.preventDefault();
        toggleOverviewModal();
        break;
      case 'Escape':
        closeOverviewModal();
        break;
    }
  });

  // Touch Swipe for Mobile Navigation
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Event Listeners for UI buttons
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (overviewBtn) overviewBtn.addEventListener('click', toggleOverviewModal);

  // Initialize Engine
  initSlides();
});
