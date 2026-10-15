/* ============================================================
   TYPEWRITER
   ============================================================ */
function initTypewriter() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const roles = [
    'Staff Product Designer',
    'UX Design Strategist',
    'Design Leader & Mentor',
    'Human-Centered Innovator',
  ];
  let rIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const current = roles[rIdx];
    el.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, cIdx++);
    if (!deleting && cIdx > current.length) {
      deleting = true; setTimeout(tick, 1600); return;
    }
    if (deleting && cIdx < 0) {
      deleting = false; cIdx = 0; rIdx = (rIdx + 1) % roles.length;
    }
    setTimeout(tick, deleting ? 45 : 90);
  }
  tick();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================
   ACTIVE NAV
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a');
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => obs.observe(s));
}

/* ============================================================
   HAMBURGER
   ============================================================ */
function initHamburger() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

/* ============================================================
   STAGGER CHILDREN
   ============================================================ */
function initStagger() {
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
      child.classList.add('reveal');
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initStagger();
  initReveal();
  initActiveNav();
  initHamburger();
});
