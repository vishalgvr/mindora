import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export const AntigravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth lerping
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    // Color palette matching Antigravity: Electric Violet, Cyan, Starlight White
    const colors = [
      '#7533FB', // Electric Violet
      '#8537FC', // Bright Violet
      '#38BDF8', // Sky Cyan
      '#818CF8', // Indigo
      '#E0E7FF', // Pale Starlight
    ];

    // Determine particle count based on screen size (keeps high FPS)
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5, // Natural anti-gravity upward drift
        radius: 0.9 + Math.random() * 1.8,
        baseAlpha: 0.15 + Math.random() * 0.55,
        alpha: 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Window resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.01;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient mouse spotlight glow if active
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          380
        );
        mouseGlow.addColorStop(0, 'rgba(117, 51, 251, 0.09)');
        mouseGlow.addColorStop(0.4, 'rgba(56, 189, 248, 0.04)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw anti-gravity floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulsing opacity
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;
        p.alpha = Math.max(0.08, Math.min(p.alpha, 0.85));

        // Anti-gravity movement (upward float with slight sinusoidal wave)
        p.x += p.vx + Math.sin(time + i) * 0.15;
        p.y += p.vy;

        // Interactive mouse deflection: particles gently curve around the cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Boundary wrapping (when particle floats off top, re-enter bottom)
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with subtle glow aura
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.radius * 6;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 3. Draw delicate constellation connection lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxLineDist = 110;

          if (dist < maxLineDist) {
            const lineAlpha = (1 - dist / maxLineDist) * 0.12;
            ctx.save();
            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = '#818CF8';
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when tab is hidden to save power/GPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(117, 51, 251, 0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 60%, rgba(56, 189, 248, 0.09), transparent 60%), #030307',
      }}
      aria-hidden="true"
    >
      {/* Background Precision Grid (Antigravity Style) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 95%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Ethereal Aurora Light Orbs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '550px',
          height: '550px',
          top: '-150px',
          left: '25%',
          background: 'radial-gradient(circle, rgba(117, 51, 251, 0.22) 0%, rgba(133, 55, 252, 0.08) 45%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'float-slow 16s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        className="position-absolute rounded-circle"
        style={{
          width: '450px',
          height: '450px',
          bottom: '10%',
          right: '-80px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-reverse 20s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive Antigravity Canvas */}
      <canvas
        ref={canvasRef}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
