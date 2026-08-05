
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

function initMobileNav() {
  const navToggles = Array.from(document.querySelectorAll('.mobile-toggle, .nav-toggle'));
  const navLinks = document.querySelector('nav.links, .nav-links');

  if (!navToggles.length || !navLinks) return;

  navToggles.forEach(navToggle => {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggles.forEach(toggle => toggle.setAttribute('aria-expanded', String(isOpen)));
    });
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove('is-open');
      navToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    }
  });
}

function initApp() {
  window.__scriptJsLoaded = true;
  window.__scriptJsTimestamp = Date.now();
  initScrollReveal();
  initMobileNav();

  window.openVideo = function openVideo(videoId) {
    try {
      if (location.protocol === 'file:') {
        window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'video-modal';

      const wrap = document.createElement('div');
      wrap.className = 'video-iframe-wrap';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-video';
      closeBtn.innerText = 'Close';
      closeBtn.onclick = () => { document.body.removeChild(modal); };

      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.allowFullscreen = true;

      wrap.appendChild(iframe);
      wrap.appendChild(closeBtn);
      modal.appendChild(wrap);
      document.body.appendChild(modal);
    } catch (err) {
      window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
    }
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
