// Progressive enhancement: collapse navigation only when its content no longer fits.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const header = document.querySelector('.header-inner');
  const brand = header?.querySelector('.brand');
  if (!toggle || !nav || !header || !brand) return;
  document.documentElement.classList.add('js');
  function close(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }
  let previous;
  function sync() {
    header.classList.add('nav-measuring');
    const navWidth = nav.getBoundingClientRect().width;
    header.classList.remove('nav-measuring');
    const gap = parseFloat(getComputedStyle(header).columnGap) || 16;
    const collapse = brand.getBoundingClientRect().width + navWidth + gap > header.clientWidth;
    if (collapse !== previous) {
      const focusedInNav = nav.contains(document.activeElement);
      const focusedToggle = document.activeElement === toggle;
      header.classList.toggle('nav-collapsed', collapse);
      toggle.hidden = !collapse;
      close();
      if (collapse && focusedInNav) toggle.focus();
      if (!collapse && focusedToggle) nav.querySelector('a')?.focus();
      previous = collapse;
    }
  }
  sync();
  const observer = new ResizeObserver(sync);
  observer.observe(header);
  observer.observe(brand);
  document.fonts?.ready.then(sync);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) close();
  });
})();
