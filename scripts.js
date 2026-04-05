/* ===================== THEME TOGGLE ===================== */
(function () {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (iconSun && iconMoon) {
      iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
      iconSun.style.display  = theme === 'dark' ? 'none'  : 'block';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
})();

/* ===================== FADE-UP ON SCROLL ===================== */
(function () {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

/* ===================== CAROUSEL (index.html) ===================== */
(function () {
  const carousel = document.getElementById('carousel');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  if (!carousel || !prevBtn || !nextBtn) return;

  const cardWidth = 300 + 20;
  nextBtn.addEventListener('click', () => carousel.scrollBy({ left:  cardWidth, behavior: 'smooth' }));
  prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' }));
})();

/* ===================== WORKS FILTER (works.html) ===================== */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.grid-card');
  const emptyState = document.getElementById('emptyState');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
/* ===================== MODAL (works.html) ===================== */
(function () {
  const openBtns = document.querySelectorAll('.open-modal');
  const overlays  = document.querySelectorAll('.modal-overlay');
  if (!openBtns.length) return;

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    overlays.forEach(o => o.classList.remove('active'));
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(btn.dataset.modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAll();
    });
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();

/* ===================== BURGER MENU ===================== */
(function () {
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  if (!burger || !mobileMenu) return;

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !burger.classList.contains('open');
    burger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleMenu());

  // Close when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMenu(false);
  });
})();
/* ===================== BACK TO TOP ===================== */
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
/* ===================== SMOOTH SCROLL (cross-page anchor) ===================== */
(function () {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    // Briefly push back to top, then scroll smoothly to target
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();