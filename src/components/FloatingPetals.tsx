import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swayOffset: number;
  color: string;
}

export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle pastel palette colors for petals
    const petalColors = [
      'rgba(245, 225, 220, 0.45)', // blush cream
      'rgba(232, 180, 184, 0.38)', // soft rose blush
      'rgba(248, 237, 235, 0.50)', // cream petal
      'rgba(180, 196, 177, 0.30)', // subtle sage tint
      'rgba(254, 246, 240, 0.40)', // ivory
    ];

    // Restrained count: 28-34 petals for subtle, peaceful floating
    const petalCount = Math.min(32, Math.max(18, Math.floor(width / 45)));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.5 + 0.35,
        speedX: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.35 + 0.25,
        swayAmplitude: Math.random() * 1.4 + 0.6,
        swayOffset: Math.random() * Math.PI * 2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.y += p.speedY;
        p.x += Math.sin(time + p.swayOffset) * p.swayAmplitude + p.speedX;
        p.angle += p.angularSpeed;

        // Wrap around gracefully
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        // Draw organic petal shape (curved bezier petal)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.6, p.size * 1.2, -p.size * 0.2, p.size, p.size * 0.5);
        ctx.bezierCurveTo(p.size * 0.8, p.size * 1.1, 0, p.size * 0.8, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};
