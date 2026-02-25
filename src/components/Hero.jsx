import { useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

/* ── Neural‑mesh canvas animation ── */
function useNeuralCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initParticles() {
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    const handleResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
}

/* ── Component ── */
export default function Hero() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  useNeuralCanvas(canvasRef);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-content container hero-animate">
        <h1 className="hero-title">
          {t('hero.title').split(' ').map((word, i, arr) => {
            // Last 3 words get the gradient treatment
            if (i >= arr.length - 3) {
              return <span key={i} className="hero-title-gradient">{word}{i < arr.length - 1 ? ' ' : ''}</span>;
            }
            return <span key={i}>{word} </span>;
          })}
        </h1>

        <p className="hero-subtitle hero-animate-delay-1">
          {t('hero.subtitle')}
        </p>

        <div className="hero-ctas hero-animate-delay-2">
          <a href="#ecosystem" className="btn btn-primary">{t('hero.cta_primary')}</a>
          <a href="#contact" className="btn btn-secondary">{t('hero.cta_secondary')}</a>
        </div>
      </div>
    </section>
  );
}
