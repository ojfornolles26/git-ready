document.addEventListener('DOMContentLoaded', () => {
  const tocSelect = document.getElementById('toc-select');
  const slideCards = Array.from(document.querySelectorAll('.slide-card'));
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');

  let currentIdx = 0;

  // Jump to slide by index
  function jumpToSlide(idx) {
    if (idx < 0) idx = 0;
    if (idx >= slideCards.length) idx = slideCards.length - 1;
    currentIdx = idx;

    const targetEl = slideCards[currentIdx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Setup TOC Selector Jump
  if (tocSelect) {
    tocSelect.addEventListener('change', (e) => {
      const targetId = e.target.value;
      const idx = slideCards.findIndex(c => c.id === targetId);
      if (idx !== -1) jumpToSlide(idx);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => jumpToSlide(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => jumpToSlide(currentIdx + 1));

  // IntersectionObserver to auto-update TOC select option and currentIdx as student scrolls down
  if (slideCards.length > 0 && tocSelect) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocSelect.value = id;
          const idx = slideCards.findIndex(c => c.id === id);
          if (idx !== -1) currentIdx = idx;
        }
      });
    }, observerOptions);

    slideCards.forEach(card => observer.observe(card));
  }

  // Code Copy Buttons
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.parentElement.querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = '#10b981';
          btn.style.color = '#ffffff';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 1800);
        });
      }
    });
  });
});
