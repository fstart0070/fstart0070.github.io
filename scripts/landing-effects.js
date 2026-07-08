const COLOR_PALETTE = [
  { r: 16, g: 185, b: 129 },   // accent / 翠绿 #10b981
  { r: 6, g: 182, b: 212 },    // secondary / 青色 #06b6d4
  { r: 52, g: 211, b: 153 },   // accent-soft / 嫩绿 #34d399
];

export class LandingParticles {
  constructor(canvas, { density = 0.00009, maxLink = 140 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.particles = [];
    this.density = density;
    this.maxLink = maxLink;
    this.mouse = { x: -1e6, y: -1e6, active: false };
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.running = false;
    this._raf = 0;
    this._onResize = () => this._resize();
    this._onPointer = (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    };
    this._onPointerLeave = () => {
      this.mouse.active = false;
    };
    this._onVisibility = () => {
      if (document.hidden) this.pause();
      else this.resume();
    };
  }

  static shouldEnable() {
    if (typeof window === "undefined") return false;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (matchMedia("(pointer: coarse)").matches && window.innerWidth < 768) return false;
    return true;
  }

  start() {
    this._resize();
    this._spawn();
    window.addEventListener("resize", this._onResize);
    window.addEventListener("pointermove", this._onPointer, { passive: true });
    window.addEventListener("pointerleave", this._onPointerLeave);
    document.addEventListener("visibilitychange", this._onVisibility);
    this.running = true;
    this._tick();
  }

  pause() {
    this.running = false;
    cancelAnimationFrame(this._raf);
  }

  resume() {
    if (!this.running) {
      this.running = true;
      this._tick();
    }
  }

  destroy() {
    this.pause();
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("pointermove", this._onPointer);
    window.removeEventListener("pointerleave", this._onPointerLeave);
    document.removeEventListener("visibilitychange", this._onVisibility);
  }

  // ---- private ----

  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this._spawn();
  }

  _spawn() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const target = Math.max(28, Math.min(120, Math.round(w * h * this.density)));
    if (this.particles.length === target) return;
    this.particles = [];
    for (let i = 0; i < target; i++) {
      this.particles.push(this._make(w, h));
    }
  }

  _make(w, h) {
    const c = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1 + Math.random() * 1.6,
      c,
      a: 0.3 + Math.random() * 0.45,
    };
  }

  _tick() {
    if (!this.running) return;
    const ctx = this.ctx;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ps = this.particles;
    const max = this.maxLink;

    ctx.clearRect(0, 0, w, h);

    for (const p of ps) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500) {
          const f = 0.0025;
          p.vx -= (dx / Math.sqrt(d2 + 0.001)) * -f;
          p.vy -= (dy / Math.sqrt(d2 + 0.001)) * -f;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${p.a * 0.85})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < ps.length; i++) {
      const a = ps[i];
      for (let j = i + 1; j < ps.length; j++) {
        const b = ps[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < max) {
          const opacity = (1 - dist / max) * 0.20;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${a.c.r},${a.c.g},${a.c.b},${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    this._raf = requestAnimationFrame(() => this._tick());
  }
}

/**
 * 终端打字机：把文本数组逐字写入容器。返回控制对象（cancel）。
 */
export function typeLines(container, lines, { stepMs = 24, lineGap = 360, onLine } = {}) {
  let cancelled = false;
  let lineIdx = 0;

  function nextLine() {
    if (cancelled) return;
    if (lineIdx >= lines.length) return;
    const lineEl = document.createElement("div");
    lineEl.className = "landing-terminal__line";
    container.appendChild(lineEl);
    if (onLine) onLine(lineIdx);
    typeChar(lineEl, lines[lineIdx], 0, () => {
      lineIdx++;
      setTimeout(nextLine, lineGap);
    });
  }

  function typeChar(el, html, idx, done) {
    if (cancelled) return;
    if (idx >= html.length) {
      done();
      return;
    }
    const ch = html.slice(idx, idx + 1);
    if (ch === "<") {
      const close = html.indexOf(">", idx);
      if (close > -1) {
        el.innerHTML += html.slice(idx, close + 1);
        typeChar(el, html, close + 1, done);
        return;
      }
    }
    el.innerHTML += ch;
    setTimeout(() => typeChar(el, html, idx + 1, done), stepMs);
  }

  nextLine();
  return {
    cancel() {
      cancelled = true;
    },
  };
}
