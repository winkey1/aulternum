'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound } from '@/components/ui/SoundManager';
import Image from 'next/image';

const teamMembers = [
    {
        name: "RESTU ROBBANI",
        role: "FOUNDER & CEO",
        image: "/team/restu.jpg",
        skills: ["STRATEGIC LEADERSHIP", "FULLSTACK DEV", "SYSTEM ARCHITECT"],
        color: "electric-blue"
    },
    {
        name: "RIZA MAHYUDA",
        role: "CO-FOUNDER & COO",
        image: "/team/riza.jpg",
        skills: ["OPERATIONS", "PROJECT MANAGEMENT", "AGILE"],
        color: "purple-500"
    },
    {
        name: "FATMAWATI DWI PUTRI",
        role: "SOCIAL MEDIA MANAGER",
        image: "/team/fatmawati.jpg",
        skills: ["CONTENT STRATEGY", "BRANDING", "DIGITAL MARKETING"],
        color: "pink-500"
    },
    {
        name: "WANDA SYAHRANI",
        role: "FINANCE MANAGER",
        image: "/team/wanda.jpg",
        skills: ["FINANCIAL PLANNING", "ACCOUNTING", "BUDGETING"],
        color: "green-500"
    }
];

export default function TeamSection() {
    const { playSound } = useAppSound();

    return (
        <section id="team" className="relative w-full py-24 bg-transparent flex flex-col items-center overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl text-white font-bold tracking-widest"
                    >
                        ELITE TEAM
                    </motion.h2>
                    <div className="h-1 w-24 bg-electric-blue mx-auto mt-4 rounded-full shadow-[0_0_10px_#00d4ff]" />
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
                        Unit komando elit di balik teknologi Aulternum.
                    </p>
                </div>

                {/* Content */}
                <div className="flex justify-center w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group perspective-1000"
                                onMouseEnter={() => playSound('hover')}
                            >
                                {/* Card Container */}
                                <div className="relative bg-black/80 backdrop-blur border border-gray-800 p-1 overflow-hidden transition-all duration-300 group-hover:border-electric-blue/50 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]">

                                    {/* Image Area */}
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-900 border-b border-gray-800">
                                        {/* Placeholder Avatar Gradient if no image */}
                                        <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center`}>
                                            <span className="font-display text-6xl text-gray-700 opacity-20 select-none">
                                                {member.name.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Glitch Overlay Effect */}
                                        <div className="absolute inset-0 bg-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay pointer-events-none" />
                                        <div className="absolute top-0 left-0 w-full h-1 bg-electric-blue/50 opacity-0 group-hover:opacity-50 animate-scan-vertical pointer-events-none" />
                                    </div>

                                    {/* Info Area */}
                                    <div className="p-6 relative">
                                        <h3 className="font-display text-2xl text-white mb-1 group-hover:text-electric-blue transition-colors">
                                            {member.name}
                                        </h3>
                                        <div className="text-xs font-mono text-electric-blue mb-4 tracking-widest">
                                            [{member.role}]
                                        </div>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {member.skills.map((skill, i) => (
                                                <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400 font-mono">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
