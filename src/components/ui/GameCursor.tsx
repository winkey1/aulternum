'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

export default function GameCursor() {
    const { playSound } = useAppSound();
    const cursorRef = useRef<HTMLDivElement>(null);
    const lastAngleRef = useRef(0); // Persist last known rotation angle
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the spaceship (heavy gliding feel)
    const springX = useSpring(mouseX, { damping: 80, stiffness: 150, mass: 1.2, restDelta: 0.001, restSpeed: 0.001 });
    const springY = useSpring(mouseY, { damping: 80, stiffness: 150, mass: 1.2, restDelta: 0.001, restSpeed: 0.001 });

    const trailDistance = 60; // px gap between bullseye and spaceship

    // Stable Lock-On Rotation: Always point head toward bullseye, persist angle when stopped
    const rawRotate = useTransform([mouseX, mouseY, springX, springY], ([mx, my, sx, sy]: number[]) => {
        const dx = mx - sx;
        const dy = my - sy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // When too close, return the LAST known angle instead of resetting to 0
        if (distance < 2) {
            return lastAngleRef.current;
        }

        // Calculate angle pointing from spaceship to bullseye
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        lastAngleRef.current = angle; // Store for when spaceship catches up
        return angle;
    });

    // Rotation Smoothing: Apply very high damping for silky cinematic turns
    const rotate = useSpring(rawRotate, { damping: 80, stiffness: 120 });

    // Position the spaceship at a trailing distance behind the bullseye
    const rawVisualX = useTransform([mouseX, mouseY, springX, springY], ([mx, my, sx, sy]: number[]) => {
        const dx = mx - sx;
        const dy = my - sy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
            const angleRad = (lastAngleRef.current - 90) * (Math.PI / 180);
            return mx - Math.cos(angleRad) * trailDistance;
        }

        const angle = Math.atan2(dy, dx);
        return mx - Math.cos(angle) * trailDistance;
    });

    const rawVisualY = useTransform([mouseX, mouseY, springX, springY], ([mx, my, sx, sy]: number[]) => {
        const dx = mx - sx;
        const dy = my - sy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
            const angleRad = (lastAngleRef.current - 90) * (Math.PI / 180);
            return my - Math.sin(angleRad) * trailDistance;
        }

        const angle = Math.atan2(dy, dx);
        return my - Math.sin(angle) * trailDistance;
    });

    // Smooth the visual position to eliminate micro-jitter
    const visualX = useSpring(rawVisualX, { damping: 60, stiffness: 200 });
    const visualY = useSpring(rawVisualY, { damping: 60, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        // Add event listeners for hover state
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">

            {/* Bullseye (Target) - Raw Mouse Position */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="absolute"
                animate={{
                    scale: isHovering ? 1.2 : 1,
                    opacity: isClicked ? 0.8 : 1,
                }}
                transition={{
                    scale: { duration: 0.1 },
                    opacity: { duration: 0.1 },
                }}
            >
                {/* Outer Ring */}
                <div className={`w-6 h-6 border-2 rounded-full ${isHovering ? 'border-red-500' : 'border-electric-blue'} transition-colors duration-300`} />

                {/* Inner Dot */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${isHovering ? 'bg-red-500' : 'bg-electric-blue'} transition-colors duration-300`} />
            </motion.div>

            {/* Spaceship (Follower) - Smooth Spring Position */}
            <motion.div
                ref={cursorRef}
                style={{
                    x: visualX,
                    y: visualY,
                    rotate: rotate,
                    translateX: '-50%',
                    translateY: '-50%', // Removed hardcoded offset, let spring physics create natural chase distance
                }}
                className="absolute w-8 h-8 flex items-center justify-center"
                animate={{
                    scale: isClicked ? 0.9 : 1,
                }}
                transition={{
                    scale: { duration: 0.1 },
                }}
            >
                {/* SVG Spaceship */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-electric-blue drop-shadow-[0_0_5px_rgba(0,212,255,0.8)] transition-colors duration-300"
                >
                    <path d="M12 2L2 22L12 18L22 22L12 2Z" fill="#00d4ff" />
                </svg>

                {/* Engine Glow */}
                <motion.div
                    className="absolute bottom-0 w-2 h-4 bg-cyan-400 blur-sm rounded-full"
                    style={{ translateY: '60%' }}
                    animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
            </motion.div>

        </div>
    );
}

