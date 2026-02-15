'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';
import Link from 'next/link';

interface PricingTier {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlight: boolean;
    color: string;
}

const tiers: PricingTier[] = [
    {
        id: 'starter',
        name: 'STARTER',
        price: 'Mulai dari IDR 3 Juta',
        description: 'Kehadiran web esensial untuk UMKM.',
        features: [
            'Landing Page Responsif',
            'Optimasi SEO Dasar',
            'Integrasi Formulir Kontak',
            '3 Bulan Support',
            'Desain Mobile Native'
        ],
        highlight: false,
        color: 'border-white/20 hover:border-white',
    },
    {
        id: 'business',
        name: 'BUSINESS',
        price: 'Mulai dari IDR 7 Juta',
        description: 'Solusi pertumbuhan untuk perusahaan berkembang.',
        features: [
            'Website Perusahaan Multi-halaman',
            'Integrasi CMS (Kelola Konten Sendiri)',
            'SEO & Analitik Lanjutan',
            'Integrasi Media Sosial',
            '6 Bulan Priority Support',
            'Optimasi Performa'
        ],
        highlight: true,
        color: 'border-electric-blue/50 hover:border-electric-blue shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
    },
    {
        id: 'enterprise',
        name: 'ENTERPRISE',
        price: 'Harga Khusus',
        description: 'Ekosistem digital skala tinggi.',
        features: [
            'Aplikasi Web Kustom',
            'Fungsi E-commerce',
            'Pengembangan Database & API',
            'Integrasi Pihak Ketiga',
            '12 Bulan Dedicated Support',
            'Arsitektur Keamanan Tinggi'
        ],
        highlight: false,
        color: 'border-white/20 hover:border-purple-400',
    },
];

export default function ServicesSection() {
    const { playSound } = useAppSound();

    return (
        <section id="services" className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden bg-black/95">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0f_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Section Header */}
            <div className="relative z-10 text-center mb-16 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-5xl text-white font-bold tracking-widest"
                >
                    KATALOG LAYANAN
                </motion.h2>
                <div className="h-1 w-24 bg-electric-blue mx-auto mt-4 rounded-full shadow-[0_0_10px_#00d4ff]" />
                <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
                    Pilih level daya yang sesuai dengan misi Anda. Harga transparan, tanpa protokol tersembunyi.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {tiers.map((tier, index) => (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative group flex flex-col`}
                        onMouseEnter={() => playSound('hover')}
                    >
                        {/* Card Container */}
                        <div className={`
                            h-full flex flex-col bg-black/80 backdrop-blur-md border p-8 transition-all duration-300 relative overflow-hidden
                            ${tier.color}
                            ${tier.highlight ? 'scale-105 z-10 bg-gray-900/50' : 'bg-gray-900/20'}
                        `}>
                            {/* Highlight Badge */}
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-electric-blue text-black text-xs font-bold px-3 py-1 font-mono tracking-widest">
                                    DIREKOMENDASIKAN
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-6">
                                <h3 className={`font-display text-xl font-bold mb-2 ${tier.highlight ? 'text-electric-blue' : 'text-white'}`}>
                                    {tier.name}
                                </h3>
                                <div className="font-mono text-2xl md:text-3xl text-white mb-2">
                                    {tier.price}
                                </div>
                                <p className="text-sm text-gray-400 font-sans">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Divider line */}
                            <div className={`w-full h-px mb-6 ${tier.highlight ? 'bg-electric-blue/30' : 'bg-gray-700'}`} />

                            {/* Features List */}
                            <ul className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm text-gray-300 font-mono">
                                        <svg className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-electric-blue' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link href="#contact" className="mt-auto">
                                <button
                                    className={`w-full py-3 px-6 font-display tracking-widest text-sm transition-all duration-300 relative overflow-hidden group/btn
                                        ${tier.highlight
                                            ? 'bg-electric-blue text-black hover:bg-white'
                                            : 'bg-transparent border border-white/20 text-white hover:border-white'
                                        }`}
                                    onClick={() => playSound('click')}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        MULAI SEKARANG
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </button>
                            </Link>

                            {/* Corner Accents */}
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-50 transition-opacity ${tier.highlight ? 'border-electric-blue' : 'border-gray-500'} group-hover:opacity-100`} />
                            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-50 transition-opacity ${tier.highlight ? 'border-electric-blue' : 'border-gray-500'} group-hover:opacity-100`} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
