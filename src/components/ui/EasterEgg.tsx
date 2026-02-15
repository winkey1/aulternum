'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

export default function EasterEgg() {
    const [sequence, setSequence] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const { playSound } = useAppSound();

    // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence((prev) => {
                const newSequence = [...prev, e.key];
                // Keep only the last N keys where N is length of code
                if (newSequence.length > konamiCode.length) {
                    return newSequence.slice(newSequence.length - konamiCode.length);
                }
                return newSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (sequence.length === konamiCode.length && sequence.every((key, index) => key === konamiCode[index])) {
            triggerEasterEgg();
            setSequence([]); // Reset
        }
    }, [sequence]);

    const triggerEasterEgg = () => {
        playSound('hero-reveal'); // Reusing a sound for now
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
    };

    return (
        <AnimatePresence>
            {showNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
                >
                    <div className="bg-black/90 border border-electric-blue px-8 py-4 rounded-lg shadow-[0_0_30px_#00d4ff] flex flex-col items-center">
                        <h3 className="font-display text-2xl text-electric-blue mb-1">NAIK LEVEL!</h3>
                        <p className="font-sans text-gray-300">Akses Rahasia Diberikan</p>
                        <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-electric-blue to-cyber-purple"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
