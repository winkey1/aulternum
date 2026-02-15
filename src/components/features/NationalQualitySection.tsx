'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

export default function NationalQualitySection() {
    const { playSound } = useAppSound();

    const features = [
        {
            title: "STANDAR JAKARTA",
            desc: "Kami menggunakan teknologi yang sama dengan unicorn Indonesia (GoTo, Traveloka) seperti Next.js & Flutter. Bukan template WordPress lambat.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            title: "AKSES LOKAL BINJAI",
            desc: "Bermarkas di Binjai. Anda bisa bertemu langsung, diskusi tatap muka, dan mendapatkan dukungan tanpa batas zona waktu.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: "FULL-STACK MASTERY",
            desc: "Satu-satunya di Binjai yang melayani pembuatan Aplikasi Desktop (Windows/Mac) dan Mobile Apps native complex.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative w-full py-24 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00d4ff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl md:text-5xl text-white font-bold tracking-wider mb-4"
                    >
                        KUALITAS NASIONAL, <span className="text-electric-blue">HATI LOKAL</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg">
                        Mengapa harus ke Jakarta jika Binjai memiliki agensi dengan standar yang sama?
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-black/50 border border-gray-800 p-8 rounded-lg hover:border-electric-blue/50 transition-colors group"
                            onMouseEnter={() => playSound('hover')}
                        >
                            <div className="mb-6 text-electric-blue group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-display text-xl text-white font-bold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
