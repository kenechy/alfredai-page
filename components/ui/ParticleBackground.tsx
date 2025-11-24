"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "circle" | "square" | "line";
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const prevWidth = canvas.width;
      const prevHeight = canvas.height;
      
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // If this is a resize (prev dimensions exist and are > 0), scale particle positions
      if (prevWidth > 0 && prevHeight > 0 && particlesRef.current.length > 0) {
        const scaleX = canvas.width / prevWidth;
        const scaleY = canvas.height / prevHeight;

        particlesRef.current.forEach((p) => {
          p.x *= scaleX;
          p.y *= scaleY;
        });
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles with responsive count
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 6 + 3,
      opacity: Math.random() * 0.5 + 0.3,
      type: ["circle", "square", "line"][Math.floor(Math.random() * 3)] as "circle" | "square" | "line",
    }));

    // Primary color (converted to RGB for easier manipulation)
    const primaryColor = { r: 214, g: 74, b: 111 }; // #D64A6F

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${particle.opacity})`;
        ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${particle.opacity})`;

        if (particle.type === "circle") {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "square") {
          ctx.fillRect(particle.x, particle.y, particle.size * 2, particle.size * 2);
        } else if (particle.type === "line") {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x + particle.size * 5, particle.y);
          ctx.stroke();
        }

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.35;
            ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "none", opacity: 1 }}
    />
  );
}
