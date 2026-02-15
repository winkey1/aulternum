'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';
import servicesData from '@/data/services.json';
import Link from 'next/link';

type ServiceCategory = 'web' | 'mobile' | 'desktop' | 'bundling' | 'addon';

export default function ServiceCatalog() {
    const { playSound } = useAppSound();
    const [activeTab, setActiveTab] = useState<ServiceCategory>('web');

    const filteredServices = servicesData.filter(service => service.category === activeTab);

    return (
        <section id="services" className="relative w-full min-h-screen py-24 bg-transparent flex flex-col items-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                {/* Header */}
                <div className="text-center mb-16">
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
                        Solusi end-to-end dengan transparansi harga dan kualitas tanpa kompromi.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 gap-4 flex-wrap">
                    {(['web', 'mobile', 'desktop', 'bundling', 'addon'] as ServiceCategory[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                playSound('click');
                            }}
                            className={`px-6 py-2 rounded-full font-mono text-sm tracking-wider border transition-all duration-300 relative overflow-hidden group uppercase ${activeTab === tab
                                ? 'border-electric-blue text-black bg-electric-blue'
                                : 'border-gray-700 text-gray-400 hover:border-electric-blue hover:text-white'
                                }`}
                            onMouseEnter={() => playSound('hover')}
                        >
                            <span className="relative z-10">{tab} {tab === 'bundling' || tab === 'addon' ? '' : 'APPS'}</span>
                            {activeTab !== tab && (
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-900/40 backdrop-blur border border-gray-800 p-8 hover:border-electric-blue/50 transition-colors group flex flex-col rounded-lg relative overflow-hidden"
                            onMouseEnter={() => playSound('hover')}
                        >
                            {/* Best For Badge */}
                            {service.bestFor && (
                                <div className="absolute top-0 right-0 bg-electric-blue/10 text-electric-blue text-[10px] font-mono px-3 py-1 rounded-bl-lg border-b border-l border-electric-blue/20">
                                    ⭐ {service.bestFor}
                                </div>
                            )}

                            {/* Tech Specs Badges */}
                            <div className="flex flex-wrap gap-2 mb-4 mt-4">
                                {service.techSpecs.map((tech, i) => (
                                    <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-electric-blue transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {service.description}
                            </p>

                            {/* Features List */}
                            {service.features && service.features.length > 0 && (
                                <ul className="mb-6 space-y-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-xs text-gray-400">
                                            <span className="text-electric-blue mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}


                            <div className="mt-auto pt-4 border-t border-gray-800">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="text-electric-blue font-display font-bold text-lg">
                                        {service.price}
                                    </div>
                                    {service.deliveryTime && (
                                        <div className="text-xs text-gray-500 font-mono">
                                            🕒 {service.deliveryTime}
                                        </div>
                                    )}
                                </div>

                                <Link href="https://wa.me/6281234567890" target="_blank">
                                    <button
                                        className="w-full py-3 border border-gray-700 text-gray-300 font-display text-sm tracking-widest hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all duration-300 rounded"
                                        onClick={() => playSound('click')}
                                    >
                                        ORDER NOW
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
