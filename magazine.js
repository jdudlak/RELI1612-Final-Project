// ── CUSTOM CURSOR ──────────────────────────────────────────
const cur     = document.getElementById('cur');
const curRing = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function ringLoop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curRing.style.left = rx + 'px';
  curRing.style.top  = ry + 'px';
  requestAnimationFrame(ringLoop);
})();

document.querySelectorAll('a, button, .contents-item, .panel, .cover-right, .nav-tab').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '16px';
    cur.style.height = '16px';
    curRing.style.width  = '48px';
    curRing.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '8px';
    cur.style.height = '8px';
    curRing.style.width  = '32px';
    curRing.style.height = '32px';
  });
});

// ── NAVBAR ACTIVE TAB ──────────────────────────────────────
const tabs = document.querySelectorAll('.nav-tab');

// Smooth scroll on tab click
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(tab.getAttribute('href'));
    if (target) {
      const navH = document.getElementById('main-nav').offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Update active tab on scroll based on section visibility
const sections = [
  { id: 'section-commercialization', tab: 'commercialization' },
  { id: 'section-ritual',            tab: 'ritual' },
  { id: 'section-authority',         tab: 'authority' },
];

const navH = document.getElementById('main-nav').offsetHeight;

window.addEventListener('scroll', () => {
  let current = 'commercialization';
  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top <= navH + 80) {
      current = s.tab;
    }
  });
  tabs.forEach(t => {
    t.classList.toggle('active', t.dataset.section === current);
  });
}, { passive: true });

// ── SCROLL REVEAL ──────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('up');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  obs.observe(el);
});

// ── MASTHEAD SCROLL ─────────────────────────────────────────
const masthead = document.querySelector('.masthead');
window.addEventListener('scroll', () => {
  masthead.style.borderBottomColor = window.scrollY > 80 ? '#ddd8d0' : 'var(--ink)';
}, { passive: true });

// ── COVER CROSS PARALLAX ────────────────────────────────────
const coverGlyph = document.querySelector('.cover-right-glyph');
if (coverGlyph) {
  window.addEventListener('scroll', () => {
    coverGlyph.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
}

// ── PANEL SUBTLE TILT ───────────────────────────────────────
document.querySelectorAll('.panel').forEach(panel => {
  panel.addEventListener('mousemove', e => {
    const r = panel.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    panel.style.transform = `perspective(1200px) rotateX(${-y * 1.5}deg) rotateY(${x * 1.5}deg)`;
    panel.style.transition = 'transform 0.08s ease';
  });
  panel.addEventListener('mouseleave', () => {
    panel.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
    panel.style.transition = 'transform 0.6s ease';
  });
});