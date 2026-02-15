'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

const navItems = [
    { name: 'ARSENAL', href: '#services' },
    { name: 'LAB', href: '#portfolio' },
    { name: 'TRANSMISI', href: '#contact' },
];

export default function HudNavigation() {
    const { isMuted, toggleMute, playSound } = useAppSound();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            // Show navbar ONLY if we are in the Hero Section (first screen)
            if (currentScrollY < heroHeight - 80) { // 80px buffer for smooth transition
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        playSound('click');
        setIsOpen(!isOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-8 md:py-6 pointer-events-none transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

                {/* Logo / Brand */}
                <Link
                    href="/"
                    className="relative group flex items-center"
                    onMouseEnter={() => playSound('hover')}
                >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 mr-4">
                        <Image
                            src="/aulternum.png"
                            alt="Aulternum Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="font-display font-bold text-3xl md:text-4xl tracking-wider text-white">
                        AULTERNUM
                    </div>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_#00d4ff]" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative px-2 py-1 font-sans text-sm tracking-widest text-gray-400 hover:text-white transition-colors duration-200 group"
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => playSound('click')}
                        >
                            <span className="relative z-10">{item.name}</span>
                            <motion.span
                                className="absolute inset-0 border border-electric-blue/30 rounded-sm opacity-0 group-hover:opacity-100"
                                layoutId="nav-glow"
                                transition={{ duration: 0.2 }}
                            />
                            {/* Corner Accents */}
                            <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </Link>
                    ))}

                    {/* Sound Toggle */}
                    <button
                        onClick={toggleMute}
                        className="ml-4 p-2 text-electric-blue hover:text-white transition-colors border border-electric-blue/20 hover:border-electric-blue/50 rounded-full"
                        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={toggleMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center pointer-events-auto md:hidden"
                    >
                        <button
                            className="absolute top-6 right-8 text-white"
                            onClick={toggleMenu}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <nav className="flex flex-col space-y-8 text-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="font-display text-2xl tracking-widest text-white hover:text-electric-blue transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorator Lines */}
            <div className="fixed top-0 left-8 h-24 w-px bg-gradient-to-b from-electric-blue/50 to-transparent pointer-events-none hidden md:block" />
            <div className="fixed top-0 right-8 h-24 w-px bg-gradient-to-b from-electric-blue/50 to-transparent pointer-events-none hidden md:block" />
        </header>
    );
}
