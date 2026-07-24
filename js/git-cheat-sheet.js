document.addEventListener('DOMContentLoaded', () => {
  const cheatsheetBtn = document.getElementById('open-cheatsheet-hero') || document.getElementById('open-cheatsheet');
  const modalOverlay = document.getElementById('cheatsheet-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!cheatsheetBtn || !modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cheatsheetBtn.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
