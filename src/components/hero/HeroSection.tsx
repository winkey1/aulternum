'use client';

import React from 'react';
import { motion } from 'framer-motion';
export default function HeroSection() {
    return (
        <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">            {/* Content Container */}
            <div className="z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Overhead Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 inline-block"
                >
                    <span className="py-2 px-6 border border-electric-blue rounded-full text-electric-blue text-sm md:text-base font-bold tracking-[0.15em] bg-electric-blue/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,123,255,0.3)]">
                        AGEN TEKNOLOGI BERSTANDAR GLOBAL PERTAMA DI BINJAI
                    </span>
                </motion.div>                {/* Main Title */}
                <motion.h1
                    className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="relative z-10 text-glow">AULTERNUM</span>
                    <span className="hidden md:block absolute -top-1 left-1 w-full h-full text-electric-blue/20 blur-sm z-0 select-none pointer-events-none animate-pulse-slow">
                        AULTERNUM
                    </span>
                </motion.h1>

                {/* Subheadline / Mission Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mb-12"
                >
                    <p className="font-sans text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Membawa kualitas teknologi Jakarta ke jantung Binjai.
                        <br className="hidden md:block" />
                        Layanan lengkap <span className="text-electric-blue">Web, Mobile, dan Desktop Software</span>.
                    </p>
                </motion.div>
            </div>

            {/* Decorative HUD Elements */}
            <div className="absolute bottom-10 left-10 md:left-20 hidden md:block opacity-50">
                <div className="flex flex-col space-y-2 font-mono text-xs text-electric-blue/70">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></span>
                        <span>STATUS: OPERASIONAL</span>
                    </div>
                    <div className="pl-4 border-l border-electric-blue/30">
                        <div>LOC: 3.6015° N, 98.4851° E</div>
                        <div>NET: SECURE</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 md:right-20 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-electric-blue/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* Vignette Overlay - softened to let starfield show */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0"></div>
        </section>
    );
}
