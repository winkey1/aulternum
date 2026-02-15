'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
    twinkleSpeed: number;
    twinklePhase: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;

        const stars: Star[] = [];
        const starCount = 300;
        const connectionDistance = 100;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random(),
                    size: Math.random() * 2.5 + 0.5,
                    color: pickColor(),
                    twinkleSpeed: 0.3 + Math.random() * 2,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        function pickColor(): string {
            const r = Math.random();
            if (r < 0.45) return '#ffffff';        // White stars (most)
            if (r < 0.7) return '#00d4ff';         // Cyan
            if (r < 0.85) return '#a855f7';        // Purple
            if (r < 0.93) return '#4ade80';        // Green
            return '#f97316';                       // Orange (rare)
        }

        const drawNebulae = () => {
            if (!ctx) return;

            // Large soft nebula blobs
            const nebulae = [
                { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 350, color: '0, 212, 255', opacity: 0.04 },
                { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 300, color: '168, 85, 247', opacity: 0.035 },
                { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 400, color: '0, 212, 255', opacity: 0.025 },
                { x: canvas.width * 0.7, y: canvas.height * 0.15, r: 250, color: '74, 222, 128', opacity: 0.02 },
            ];

            nebulae.forEach(n => {
                const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
                gradient.addColorStop(0, `rgba(${n.color}, ${n.opacity})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
            });
        };

        const drawGrid = (time: number) => {
            if (!ctx) return;
            const spacing = 60;
            const baseOpacity = 0.035;

            ctx.strokeStyle = `rgba(0, 212, 255, ${baseOpacity})`;
            ctx.lineWidth = 0.5;

            // Horizontal
            for (let y = 0; y < canvas.height; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Vertical
            for (let x = 0; x < canvas.width; x += spacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Animated scan line
            const scanY = (time * 0.03) % (canvas.height + 200) - 100;
            const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
            scanGrad.addColorStop(0, 'rgba(0, 212, 255, 0)');
            scanGrad.addColorStop(0.5, 'rgba(0, 212, 255, 0.07)');
            scanGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 80, canvas.width, 160);
        };

        const drawStars = (time: number) => {
            if (!ctx) return;

            const parallaxX = (mouseX - canvas.width / 2) * 0.015;
            const parallaxY = (mouseY - canvas.height / 2) * 0.015;

            stars.forEach(star => {
                const depthFactor = 0.3 + star.z * 0.7;
                const sx = star.x + parallaxX * depthFactor;
                const sy = star.y + parallaxY * depthFactor;

                // Twinkle
                const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase));
                const size = star.size * depthFactor;

                ctx.save();
                ctx.globalAlpha = twinkle;
                ctx.fillStyle = star.color;

                // Draw star
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();

                // Glow halo for bright/near stars
                if (star.size > 1.5 && star.z > 0.5) {
                    ctx.globalAlpha = twinkle * 0.2;
                    ctx.beginPath();
                    ctx.arc(sx, sy, size * 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            });
        };

        const drawConnections = () => {
            if (!ctx) return;
            const nearStars = stars.filter(s => s.z > 0.6);

            for (let i = 0; i < nearStars.length; i++) {
                for (let j = i + 1; j < nearStars.length; j++) {
                    const a = nearStars[i];
                    const b = nearStars[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = (time: number) => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid(time);
            drawNebulae();
            drawStars(time);
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleResize = () => {
            resizeCanvas();
            initStars();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        initStars();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
