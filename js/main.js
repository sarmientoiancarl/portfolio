document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Works modal */
  const overlay = document.getElementById('modal-overlay');
  if(overlay){
    const modalTitle = overlay.querySelector('[data-modal-title]');
    const modalTag = overlay.querySelector('[data-modal-tag]');
    const modalDesc = overlay.querySelector('[data-modal-desc]');
    const modalChips = overlay.querySelector('[data-modal-chips]');
    const closeBtn = overlay.querySelector('.modal-close');

    const openModal = (card) => {
      modalTag.textContent = card.dataset.tag || 'Sample Work';
      modalTitle.textContent = card.dataset.title || '';
      modalDesc.textContent = card.dataset.full || '';
      modalChips.innerHTML = '';
      (card.dataset.tools || '').split(',').filter(Boolean).forEach(tool => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = tool.trim();
        modalChips.appendChild(chip);
      });
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          openModal(card);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeModal();
    });
  }

});
