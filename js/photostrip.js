/**
 * photostrip.js — Galería overlay de 31 fotos en 4 tiras
 * Abre como lightbox. Los fuegos se ven detrás del panel de fotos.
 */

const Photostrip = (() => {
  const overlay  = document.getElementById('photostrip');
  const panel    = overlay ? overlay.querySelector('.overlay-panel') : null;
  const closeBtn = document.getElementById('overlay-close');
  const strips   = document.querySelectorAll('.strip-wrap');
  const btnPrev  = document.getElementById('nav-prev');
  const btnNext  = document.getElementById('nav-next');
  const counter  = document.getElementById('strip-counter');
  const total    = strips.length;
  let   current  = 0;

  /* Navega a una tira */
  function goTo(index) {
    strips[current].classList.remove('active');
    current = Math.max(0, Math.min(index, total - 1));
    strips[current].classList.add('active');

    const items = strips[current].querySelectorAll('.photo-item');
    items.forEach(item => {
      item.style.animation = 'none';
      void item.offsetWidth;
      item.style.animation = '';
    });

    counter.textContent = `${current + 1} / ${total}`;
    btnPrev.disabled    = current === 0;
    btnNext.disabled    = current === total - 1;
  }

  btnPrev && btnPrev.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
  btnNext && btnNext.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
  closeBtn && closeBtn.addEventListener('click', e => { e.stopPropagation(); hide(); });

  /* Clic en el fondo oscuro (overlay) pero NO en el panel → cierra */
  overlay && overlay.addEventListener('click', e => {
    if (panel && !panel.contains(e.target)) hide();
  });

  /* ESC cierra */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) hide();
  });

  /* Swipe táctil */
  let touchStartX = 0;
  overlay && overlay.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay && overlay.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 55) dx < 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });

  function show() {
    if (!overlay) return;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    goTo(0);
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    strips.forEach(s => s.classList.remove('active'));
    current = 0;
  }

  return { show, hide };
})();
