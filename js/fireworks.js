/**
 * fireworks.js — Motor de fuegos artificiales con canvas
 * Formas: círculo, corazón, estrella, explosión
 */

const Fireworks = (() => {
  const canvas  = document.getElementById('fireworks-canvas');
  const ctx     = canvas.getContext('2d');
  let   animId  = null;
  let   rockets = [];
  let   active  = false;

  /* Paleta de colores armónica */
  const PALETTE = [
    '#f4a7c0', '#e87da8', '#c96f8a',   // rosas
    '#d4c5e2', '#b09cc9',               // lavandas
    '#f7d4a0', '#e8b86e',               // dorados
    '#f4e0e8', '#ffd6e8',               // blancos rosados
    '#a8d8ea', '#c9e8f4',               // celestes suaves
    '#f9c5d1', '#e8a0b4'                // blushes
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* ── Partícula individual ── */
  class Particle {
    constructor(x, y, color, shape) {
      this.x      = x;
      this.y      = y;
      this.color  = color;
      this.shape  = shape || 'circle';
      this.alpha  = 1;
      this.size   = Math.random() * 3 + 1.5;
      this.life   = 1;
      this.decay  = Math.random() * 0.015 + 0.008;
      this.gravity = 0.06;

      // Velocidad según forma
      const angle = Math.random() * Math.PI * 2;
      const speed = shape === 'heart'  ? Math.random() * 4 + 2 :
                    shape === 'star'   ? Math.random() * 5 + 3 :
                    shape === 'burst'  ? Math.random() * 6 + 4 :
                                        Math.random() * 4 + 2;

      this.vx  = Math.cos(angle) * speed;
      this.vy  = Math.sin(angle) * speed;
      this.trail = [];
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 5) this.trail.shift();

      this.x    += this.vx;
      this.y    += this.vy;
      this.vy   += this.gravity;
      this.vx   *= 0.97;
      this.life -= this.decay;
      this.alpha = Math.max(0, this.life);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;

      // Estela tenue
      if (this.trail.length > 1) {
        ctx.globalAlpha = this.alpha * 0.2;
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        this.trail.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = this.color;
        ctx.lineWidth   = this.size * 0.4;
        ctx.stroke();
        ctx.globalAlpha = this.alpha;
      }

      ctx.beginPath();
      switch (this.shape) {
        case 'heart':  drawHeart(ctx, this.x, this.y, this.size); break;
        case 'star':   drawStar(ctx, this.x, this.y, this.size);  break;
        default:
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  function drawHeart(ctx, x, y, r) {
    const s = r * 0.8;
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s, y, x - s, y - s * 0.5);
    ctx.bezierCurveTo(x - s, y - s * 1.2, x, y - s * 1.1, x, y - s * 0.4);
    ctx.bezierCurveTo(x, y - s * 1.1, x + s, y - s * 1.2, x + s, y - s * 0.5);
    ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3);
  }

  function drawStar(ctx, x, y, r) {
    const spikes = 5;
    const inner  = r * 0.4;
    let   angle  = -Math.PI / 2;
    ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    for (let i = 0; i < spikes; i++) {
      angle += Math.PI / spikes;
      ctx.lineTo(x + inner * Math.cos(angle), y + inner * Math.sin(angle));
      angle += Math.PI / spikes;
      ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    }
    ctx.closePath();
  }

  /* ── Cohete / explosión ── */
  class Rocket {
    constructor() {
      this.reset();
    }

    reset() {
      this.x         = Math.random() * canvas.width;
      this.y         = canvas.height + 20;
      this.targetY   = Math.random() * canvas.height * 0.5 + canvas.height * 0.05;
      this.speed     = Math.random() * 6 + 8;
      this.color     = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      this.shape     = CONFIG.fireworks.shapes[
                         Math.floor(Math.random() * CONFIG.fireworks.shapes.length)
                       ];
      this.exploded  = false;
      this.particles = [];
      this.delay     = Math.random() * 1200; // ms de espera inicial
      this.launched  = false;
      this.launchTime = performance.now() + this.delay;
    }

    launch() {
      if (performance.now() < this.launchTime) return;
      this.launched = true;
    }

    update() {
      if (!this.launched) { this.launch(); return; }
      if (!this.exploded) {
        this.y -= this.speed;
        if (this.y <= this.targetY) this.explode();
      } else {
        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => p.life > 0);
      }
    }

    explode() {
      this.exploded = true;
      const count   = this.shape === 'burst' ? 140 :
                      this.shape === 'star'  ? 100 :
                      this.shape === 'heart' ? 80  : 90;

      const colors = [this.color];
      // Añade 1-2 colores complementarios
      for (let i = 0; i < 2; i++) {
        colors.push(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      }

      for (let i = 0; i < count; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        this.particles.push(new Particle(this.x, this.y, c, this.shape));
      }

      // Destellos blancos centrales
      for (let i = 0; i < 18; i++) {
        const p      = new Particle(this.x, this.y, '#fff', 'circle');
        p.size      *= 0.6;
        p.vx        *= 0.4;
        p.vy        *= 0.4;
        p.decay     *= 2;
        this.particles.push(p);
      }
    }

    draw() {
      if (!this.launched) return;
      if (!this.exploded) {
        // Dibuja el cohete
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle   = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        // Estela del cohete
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + 30);
        grad.addColorStop(0, this.color + 'cc');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 30);
        ctx.stroke();
        ctx.restore();
      } else {
        this.particles.forEach(p => p.draw());
      }

      // Reiniciar cuando termina
      if (this.exploded && this.particles.length === 0) {
        this.reset();
      }
    }
  }

  /* ── Loop de animación ── */
  function loop() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // limpia sin pintar negro

    rockets.forEach(r => { r.update(); r.draw(); });
    animId = requestAnimationFrame(loop);
  }

  /* ── API pública ── */
  function start() {
    if (active) return;
    active = true;
    resize();
    canvas.classList.add('active');

    const count = CONFIG.fireworks.count;
    rockets = Array.from({ length: count }, () => new Rocket());

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loop();

    const dur = CONFIG.fireworks.duration;
    if (dur > 0) {
      setTimeout(stop, dur);
    }
  }

  function stop() {
    active = false;
    canvas.classList.remove('active');
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rockets = [];
  }

  window.addEventListener('resize', resize);
  resize();

  return { start, stop };
})();
