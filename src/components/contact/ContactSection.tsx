'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';

export default function ContactSection() {
    const { playSound } = useAppSound();

    return (
        <section id="contact" className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-4 overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="font-display text-4xl md:text-6xl text-white font-bold tracking-widest mb-6">
                        TRANSMISI DATA
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg">
                        Siap memulai proyek? Hubungi markas komando kami langsung melalui saluran aman.
                    </p>
                </motion.div>

                {/* Main Action Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group w-full max-w-lg"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-electric-blue to-green-500 rounded-2xl opacity-50 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

                    <a
                        href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20bekerja%20sama%20dengan%20Aulternum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block bg-black border border-gray-800 rounded-2xl p-8 md:p-12 hover:border-green-500/50 transition-all duration-300 transform group-hover:-translate-y-1"
                        onMouseEnter={() => playSound('hover')}
                        onClick={() => playSound('click')}
                    >
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <svg className="w-12 h-12 text-green-500 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-wide group-hover:text-green-400 transition-colors">
                                    WHATSAPP SECURE UPLINK
                                </h3>
                                <p className="text-gray-400 font-mono text-sm max-w-sm mx-auto group-hover:text-gray-300 transition-colors">
                                    Respon rata-rata: {`< 5 Menit`}
                                </p>
                            </div>

                            <div className="flex items-center space-x-2 text-green-500 font-bold tracking-widest border border-green-500/30 px-6 py-3 rounded-full bg-green-500/5 group-hover:bg-green-500/20 transition-colors">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span>ONLINE // SIAP MENERIMA PESAN</span>
                            </div>
                        </div>
                    </a>
                </motion.div>

                {/* Location Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 border-t border-gray-800 pt-8 w-full max-w-2xl text-center"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-gray-500 font-mono">
                        <div className="flex items-center hover:text-electric-blue transition-colors">
                            <span className="text-electric-blue mr-2">📍</span>
                            BINJAI, SUMATERA UTARA
                        </div>
                        <div className="hidden md:block w-1.5 h-1.5 bg-gray-700 rounded-full" />
                        <div className="flex items-center hover:text-electric-blue transition-colors">
                            <span className="text-electric-blue mr-2">📧</span>
                            contact@aulternum.com
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Decorative Footer embedded in section */}
            <div className="absolute bottom-4 left-0 text-center w-full z-10 pointer-events-none">
                <p className="font-mono text-[10px] text-gray-800">
                    AULTERNUM SYSTEMS © 2026 // END OF LINE
                </p>
            </div>

        </section>
    );
}
