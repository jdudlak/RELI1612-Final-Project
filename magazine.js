// ── CUSTOM CURSOR ──────────────────────────────────────────
const cur     = document.getElementById('cur');
const curRing = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curRing.style.left = rx + 'px';
  curRing.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// Grow cursor on interactive elements
document.querySelectorAll('a, .nav-tab, .src-row, .contents-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '14px'; cur.style.height = '14px';
    curRing.style.width = '44px'; curRing.style.height = '44px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '8px'; cur.style.height = '8px';
    curRing.style.width = '32px'; curRing.style.height = '32px';
  });
});

// ── NAVBAR — ACTIVE TAB ─────────────────────────────────────
const tabs     = document.querySelectorAll('.nav-tab');
const nav      = document.getElementById('main-nav');
const sections = ['sec-ritual', 'sec-authority', 'sec-commercialization'];

// Click → smooth scroll + set active
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(tab.getAttribute('href'));
    if (!target) return;
    const offset = nav.offsetHeight + 1;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Scroll → update active tab
window.addEventListener('scroll', () => {
  const offset = nav.offsetHeight + 60;
  let active = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= offset) active = id;
  });
  const map = { 'sec-ritual':'ritual', 'sec-authority':'authority', 'sec-commercialization':'commercialization' };
  tabs.forEach(t => t.classList.toggle('active', t.dataset.section === map[active]));
}, { passive: true });

// ── SCROLL REVEAL ──────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('up'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  revealObs.observe(el);
});

// ── COVER PARALLAX ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.querySelectorAll('.sec-cover-glyph').forEach(g => {
    const rect = g.closest('.sec-cover').getBoundingClientRect();
    g.style.transform = `translateY(${-rect.top * 0.12}px)`;
  });
}, { passive: true });

// ── IMAGE HOVER SCALE (already CSS, JS adds class for fine control) ──
document.querySelectorAll('.src-row').forEach(row => {
  row.addEventListener('mouseenter', () => row.classList.add('hovered'));
  row.addEventListener('mouseleave', () => row.classList.remove('hovered'));
});