
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Open YouTube player in modal (embed) with file:// fallback to new tab
  function openVideo(videoId) {
    try {
      // If page is loaded from file protocol, opening an embedded player may fail.
      if (location.protocol === 'file:') {
        window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
        return;
      }

      // Create modal container
      const modal = document.createElement('div');
      modal.className = 'video-modal';

      const wrap = document.createElement('div');
      wrap.className = 'video-iframe-wrap';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-video';
      closeBtn.innerText = 'Close';
      closeBtn.onclick = () => { document.body.removeChild(modal); };

      const iframe = document.createElement('iframe');
      // Use embed URL (no cookie) and autoplay; origin is provided by browser automatically over http(s)
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.allowFullscreen = true;

      wrap.appendChild(iframe);
      wrap.appendChild(closeBtn);
      modal.appendChild(wrap);
      document.body.appendChild(modal);
    } catch (err) {
      // On unexpected errors, fallback to opening YouTube page
      window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
    }
  }
