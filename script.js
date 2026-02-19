/* ===========================
   わさびのへや ポータル
   Solo version
   =========================== */

(function () {
  'use strict';

  // ===========================
  // Config
  // ===========================
  const CONFIG = {
    particles: {
      count: 30,
      colors: ['#0EA5A0', '#6366F1', '#F59E0B', '#38BDF8', '#5EEAD4'],
      minSize: 3,
      maxSize: 7,
      speed: 0.25,
    },
  };

  // ===========================
  // Navigation
  // ===========================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ===========================
  // Scroll Reveal
  // ===========================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ===========================
  // Parallax
  // ===========================
  const parallaxImages = document.querySelectorAll('.parallax-img');
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxImages.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const speed = parseFloat(img.dataset.speed) || 0.05;
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      img.style.transform = `translateY(${offset}px)`;
    });

    parallaxBgs.forEach((bg) => {
      const speed = parseFloat(bg.dataset.speed) || 0.2;
      const offset = scrollY * speed;
      bg.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  // ===========================
  // Gallery: ホイール横スクロール + ドラッグ
  // ===========================
  const galleryStrip = document.querySelector('.gallery-strip');
  if (galleryStrip) {
    galleryStrip.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        galleryStrip.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    let isDragging = false;
    let startX, scrollStart;
    galleryStrip.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = galleryStrip.scrollLeft;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      galleryStrip.scrollLeft = scrollStart - (e.pageX - startX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
  }

  // ===========================
  // Particles
  // ===========================
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = CONFIG.particles.minSize + Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize);
      this.speedX = (Math.random() - 0.5) * CONFIG.particles.speed;
      this.speedY = (Math.random() - 0.5) * CONFIG.particles.speed;
      this.color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)];
      this.opacity = 0.12 + Math.random() * 0.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.01 + Math.random() * 0.02;
      this.shape = Math.random() < 0.5 ? 'circle' : Math.random() < 0.5 ? 'leaf' : 'diamond';
    }
    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.3;
      this.y += this.speedY + Math.cos(this.wobble) * 0.2;
      if (this.x < -20 || this.x > canvas.width + 20 || this.y < -20 || this.y > canvas.height + 20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 'leaf') {
        this.drawLeaf(this.size);
      } else {
        this.drawDiamond(this.size);
      }
      ctx.restore();
    }
    drawLeaf(size) {
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size, -size * 0.5, size, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size, size * 0.5, -size, -size * 0.5, 0, -size);
      ctx.fill();
    }
    drawDiamond(size) {
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.7, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.7, 0);
      ctx.closePath();
      ctx.fill();
    }
  }

  particles = Array.from({ length: CONFIG.particles.count }, () => new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===========================
  // Smooth scroll
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // Easter egg: わさびクリック
  // ===========================
  const wasabiSpeeches = ['よろしくね', '僕が記事書いてます', 'Claude最高', 'ちゃんと読んでね', 'いそがしいんだけど', 'はやさが大事', '英語の情報もチェック'];
  const wasabiEl = document.querySelector('.hero-char-wasabi');
  if (wasabiEl) {
    wasabiEl.addEventListener('click', () => {
      const speech = wasabiEl.querySelector('.char-speech');
      speech.textContent = wasabiSpeeches[Math.floor(Math.random() * wasabiSpeeches.length)];
      speech.style.animation = 'none';
      speech.offsetHeight;
      speech.style.animation = 'speech-bounce 0.4s ease';
    });
  }
})();
