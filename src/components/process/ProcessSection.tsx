'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

const processSteps = [
    {
        id: "01",
        title: "DISCOVERY",
        desc: "Kami menyelami bisnis Anda. Memahami masalah, target pasar, dan tujuan strategis sebelum menulis satu baris kode pun.",
        icon: "🔍"
    },
    {
        id: "02",
        title: "DESIGN & ARCHITECTURE",
        desc: "Merancang UI/UX yang memukau dan arsitektur sistem yang scalable. Blueprint masa depan digital Anda.",
        icon: "✏️"
    },
    {
        id: "03",
        title: "AGILE DEVELOPMENT",
        desc: "Membangun produk dengan sprint cepat. Anda bisa melihat progress setiap minggu. Transparansi total.",
        icon: "⚙️"
    },
    {
        id: "04",
        title: "DEPLOYMENT & SCALE",
        desc: "Peluncuran ke production server. Optimasi performa, keamanan, dan siap menangani ribuan user.",
        icon: "🚀"
    }
];

export default function ProcessSection() {
    return (
        <section className="relative w-full py-24 bg-transparent overflow-hidden flex flex-col items-center">
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl md:text-5xl text-white font-bold tracking-widest"
                    >
                        THE PROCESS
                    </motion.h2>
                    <p className="mt-4 text-gray-400 font-sans">
                        Metodologi standar industri global. Terstruktur, transparan, dan berorientasi hasil.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-800 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                {/* Circle Number */}
                                <div className="w-24 h-24 rounded-full bg-black border-2 border-gray-700 flex items-center justify-center mb-6 group-hover:border-electric-blue group-hover:shadow-[0_0_20px_#00d4ff] transition-all duration-300 relative">
                                    <span className="font-display text-2xl text-gray-500 group-hover:text-electric-blue transition-colors">
                                        {step.id}
                                    </span>
                                    <div className="absolute -bottom-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="font-display text-lg text-white font-bold mb-3 group-hover:text-electric-blue transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
