'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppSound, SoundType } from '@/components/ui/SoundManager';

type ProjectCategory = 'all' | 'web' | 'mobile' | 'desktop';

interface Project {
    id: string;
    code: string;
    title: string;
    description: string;
    tech: string[];
    category: ProjectCategory;
    status: 'SELESAI' | 'BETA' | 'KLASIFIKASI' | 'COMING_SOON';
    price?: string;
    image?: string;
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };
    impact?: string;
    sound?: SoundType;
    soundFile?: string;
}

const projects: Project[] = [
    // --- COMPLETED WEB ---
    {
        id: '1',
        code: 'PRJ-ELIB',
        title: 'E-Library System',
        description: 'Sistem manajemen perpustakaan digital lengkap dengan peminjaman dan katalog online.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
        category: 'web',
        status: 'SELESAI',
        price: 'Rp 2.500.000',
        image: '/e-library.png',
        testimonial: {
            text: "Sistem ini sangat membantu operasional perpustakaan kami. Peminjaman jadi jauh lebih rapi.",
            author: "Budi Santoso",
            role: "Kepala Pustaka"
        },
        impact: "Efisiensi Peminjaman +400%",
        sound: 'page-flip'
    },
    {
        id: '2',
        code: 'PRJ-SHOW',
        title: 'Luxury Showroom',
        description: 'Website showcase interaktif untuk showroom mobil dengan galeri 3D dan form booking.',
        tech: ['Next.js', 'Framer Motion', 'Three.js'],
        category: 'web',
        status: 'SELESAI',
        price: 'Rp 50.000.000',
        image: '/luxury_car_showroom.png',
        testimonial: {
            text: "Absolutely stunning! Our car sales have skyrocketed since customers can now explore every detail in 3D before visiting the showroom.",
            author: "K.A.M.",
            role: "CEO, Luxury Motors — Dubai, UAE"
        },
        impact: "Penjualan Unit +150%",
        sound: 'car-rev',
        soundFile: '/sound/Car Revving 8 (mp3cut.net).mp3'
    },
    {
        id: '3',
        code: 'PRJ-MOTO',
        title: 'Motorcycle Marketplace',
        description: 'Platform jual beli motor dengan fitur katalog, booking/DP online, dan admin panel.',
        tech: ['React', 'Node.js', 'MongoDB'],
        category: 'web',
        status: 'SELESAI',
        price: 'Rp 5.000.000',
        image: '/motorcycle_marketplace.png',
        testimonial: {
            text: "Platformnya stabil dan fiturnya lengkap. Sangat memudahkan manajemen stok motor.",
            author: "H. Ridwan",
            role: "Dealer Owner"
        },
        impact: "Omset Mitra +300%",
        sound: 'car-rev',
        soundFile: '/sound/tanweraman-motorcycle-engine-rev-2-337870.mp3'
    },

    // --- COMPLETED DESKTOP ---
    {
        id: '4',
        code: 'PRJ-RENT',
        title: 'Car Rental Manager',
        description: 'Aplikasi desktop manajemen rental mobil: tracking armada, billing otomatis, dan laporan.',
        tech: ['Python', 'PyQt', 'SQLite'],
        category: 'desktop',
        status: 'SELESAI',
        price: 'Rp 4.000.000',
        image: '/car_rental_management.png',
        testimonial: {
            text: "Laporan otomatisnya sangat membantu closing bulanan. Tracking mobil juga jadi mudah.",
            author: "Siti Aminah",
            role: "Finance Admin"
        },
        impact: "Kebocoran Revenue -90%",
        sound: 'car-rev'
    },

    // --- COMPLETED MOBILE ---
    {
        id: '5',
        code: 'PRJ-WASH',
        title: 'Laundry Cashier App',
        description: 'Aplikasi kasir mobile untuk usaha laundry dengan cetak struk bluetooth dan laporan omset.',
        tech: ['Flutter', 'Firebase', 'Dart'],
        category: 'mobile',
        status: 'SELESAI',
        price: 'Rp 2.500.000',
        image: '/laundry_cashier_app.png',
        testimonial: {
            text: "Simpel tapi powerful. Struk bluetoothnya jalan lancar di semua HP karyawan.",
            author: "Rian J.",
            role: "Laundry Boss"
        },
        impact: "Keuntungan Bersih +40%",
        sound: 'clean-chime'
    },
    {
        id: '6',
        code: 'PRJ-JUIS',
        title: 'Juice Bar POS',
        description: 'Sistem Point of Sale mobile untuk outlet minuman dengan manajemen stok bahan baku.',
        tech: ['React Native', 'Supabase', 'Redux'],
        category: 'mobile',
        status: 'SELESAI',
        price: 'Rp 2.500.000',
        image: '/juice_bar_ POS.png',
        testimonial: {
            text: "Manajemen stoknya detail banget. Gak ada lagi selisih barang di akhir hari.",
            author: "Jessica L.",
            role: "Outlet Manager"
        },
        impact: "Profit Margin +25%",
        sound: 'cash-register'
    },

    // --- UPCOMING / CONCEPT (POS & SYSTEMS) ---
    {
        id: '7',
        code: 'PRJ-QRES',
        title: 'QR Menu & Table View',
        description: 'Sistem pemesanan restoran via QR dengan fitur live monitoring meja kosong untuk pengunjung.',
        tech: ['Next.js', 'WebSocket', 'Realtime DB'],
        category: 'web',
        status: 'COMING_SOON',
        price: 'Est. Rp 7.000.000',
        image: '/qr_menu&table_view.png',
        sound: 'notification'
    },
    {
        id: '8',
        code: 'PRJ-CAFE',
        title: 'Cafe Analytics Dashboard',
        description: 'Dashboard analitik mendalam untuk pemilik kafe: tren penjualan, jam sibuk, dan stok.',
        tech: ['Next.js', 'Recharts', 'Python AI'],
        category: 'web',
        status: 'COMING_SOON',
        price: 'Est. Rp 5.000.000',
        image: '/dashboard_analythic_cafe.png',
        sound: 'notification'
    },
    {
        id: '9',
        code: 'PRJ-SPAR',
        title: 'Sparepart Multi-Branch',
        description: 'Sistem e-commerce B2B/B2C untuk sparepart motor dengan manajemen inventaris multi-gudang.',
        tech: ['Next.js', 'Docker', 'Redis'],
        category: 'web',
        status: 'COMING_SOON',
        price: 'Est. Rp 5.000.000',
        image: '/sparepart_multibranch.png',
        sound: 'car-rev'
    },
    {
        id: '10',
        code: ' PRJ-SALO',
        title: 'Salon & Barber System',
        description: 'Platform booking, membership system, dan loyalty points khusus bisnis kecantikan.',
        tech: ['PWA', 'GraphQL', 'PostgreSQL'],
        category: 'web',
        status: 'COMING_SOON',
        price: 'Est. Rp 5.500.000',
        image: '/salon_and barber_system.png',
        sound: 'clean-chime'
    },
];

export default function PortfolioSection() {
    const { playSound, playFile } = useAppSound();
    const [filter, setFilter] = useState<ProjectCategory>('all');
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

    return (
        <section id="portfolio" className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-5xl text-white font-bold tracking-widest inline-flex items-center"
                >
                    <span className="text-electric-blue mr-4">&lt;</span>
                    KARYA KAMI
                    <span className="text-electric-blue ml-4">/&gt;</span>
                </motion.h2>
                <div className="text-electric-blue/50 font-mono text-xs tracking-[0.5em] mt-2">
                    PROYEK TERBARU
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-16 gap-4 flex-wrap px-4 relative z-10">
                {(['all', 'web', 'mobile', 'desktop'] as ProjectCategory[]).map((cat) => (
                    <motion.button
                        key={cat}
                        onClick={() => {
                            setFilter(cat);
                            playSound('click');
                        }}
                        className={`
                            relative px-6 py-3 rounded border font-mono text-sm tracking-widest transition-all duration-300
                            ${filter === cat
                                ? 'bg-electric-blue/10 border-electric-blue text-electric-blue shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                                : 'bg-black/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                            }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => playSound('hover')}
                    >
                        {cat === 'all' ? 'SEMUA' : cat}
                    </motion.button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full z-10"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative"
                            onMouseEnter={() => {
                                setActiveProject(project.id);
                                playSound('hover');
                            }}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            {/* Card Container */}
                            <div className="relative h-full bg-gray-900/40 backdrop-blur border border-gray-800 overflow-hidden hover:border-electric-blue/50 transition-colors duration-300">
                                {/* Glitch Overlay */}
                                <div className={`absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-100 mix-blend-overlay ${activeProject === project.id ? 'animate-pulse-fast' : ''}`} />

                                {/* Project Image */}
                                {project.image && (
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Category Badge */}
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-gray-800 text-[10px] font-mono text-gray-400 uppercase tracking-wider z-10">
                                        {project.category}
                                    </div>

                                    {/* Status & Code */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="font-mono text-xs text-electric-blue border border-electric-blue/30 px-2 py-1 bg-electric-blue/5 rounded">
                                            {project.code}
                                        </span>
                                        <span className={`font-mono text-xs px-2 py-1 rounded ${project.status === 'SELESAI' ? 'text-green-400 bg-green-400/10' :
                                            project.status === 'BETA' ? 'text-yellow-400 bg-yellow-400/10' :
                                                project.status === 'COMING_SOON' ? 'text-purple-400 bg-purple-400/10' :
                                                    'text-red-400 bg-red-400/10'
                                            }`}>
                                            {project.status === 'COMING_SOON' ? 'UPCOMING' : project.status}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="font-display text-2xl text-white mb-3 group-hover:text-electric-blue transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="font-sans text-gray-400 mb-6 group-hover:text-gray-200 transition-colors">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="font-mono text-xs text-gray-500 bg-gray-800/50 px-2 py-1 border border-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className="relative overflow-hidden group/btn px-6 py-2 bg-transparent text-white font-display text-sm tracking-wider border border-white/20 hover:border-electric-blue transition-colors w-full md:w-auto"
                                        onClick={() => {
                                            setSelectedProject(project);
                                            if (project.soundFile) {
                                                playFile(project.soundFile);
                                            } else {
                                                playSound(project.sound || 'car-rev');
                                            }
                                        }}
                                    >
                                        <span className="absolute inset-0 w-0 bg-electric-blue transition-all duration-[250ms] ease-out group-hover/btn:w-full opacity-10"></span>
                                        <span className="relative group-hover/btn:text-electric-blue transition-colors flex items-center justify-center gap-2">
                                            LIHAT DETIL <span className="text-xs">→</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-gray-900 border border-electric-blue/50 p-8 md:p-12 max-w-2xl w-full shadow-[0_0_50px_rgba(0,212,255,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-electric-blue" />
                            <div className="absolute top-4 right-4 text-gray-500 font-mono cursor-pointer hover:text-white z-20" onClick={() => setSelectedProject(null)}>[X] CLOSE</div>

                            {/* Project Image Preview */}
                            {selectedProject.image && (
                                <div className="relative w-full h-56 md:h-72 -mt-8 md:-mt-12 -mx-8 md:-mx-12 mb-8 overflow-hidden" style={{ width: 'calc(100% + 4rem)' }}>
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                                </div>
                            )}

                            <div className="font-mono text-electric-blue text-sm mb-2 opacity-70">
                                PROJECT_ID: {selectedProject.code}
                            </div>

                            <h3 className="font-display text-3xl md:text-4xl text-white mb-6">
                                {selectedProject.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className={`font-mono text-xs px-3 py-1 rounded ${selectedProject.status === 'SELESAI' ? 'text-green-400 bg-green-400/10' :
                                    selectedProject.status === 'BETA' ? 'text-yellow-400 bg-yellow-400/10' :
                                        selectedProject.status === 'COMING_SOON' ? 'text-purple-400 bg-purple-400/10' :
                                            'text-red-400 bg-red-400/10'
                                    }`}>
                                    STATUS: {selectedProject.status === 'COMING_SOON' ? 'UPCOMING' : selectedProject.status}
                                </span>
                                <span className="font-mono text-xs px-3 py-1 rounded text-blue-400 bg-blue-400/10 uppercase">
                                    TYPE: {selectedProject.category}
                                </span>
                            </div>

                            <p className="font-sans text-gray-300 leading-relaxed mb-8 text-lg">
                                {selectedProject.description}
                            </p>

                            {/* Impact / Profit Section */}
                            {selectedProject.impact && (
                                <div className="mb-6 p-4 bg-green-900/10 border border-green-500/30 rounded flex items-center gap-4">
                                    <div className="text-3xl">📈</div>
                                    <div>
                                        <div className="text-green-400 font-mono text-xs uppercase tracking-wider mb-1">CLIENT RESULT</div>
                                        <div className="text-xl font-bold text-white">{selectedProject.impact}</div>
                                    </div>
                                </div>
                            )}

                            {/* Testimonial Section */}
                            {selectedProject.testimonial && (
                                <div className="mb-8 p-6 bg-white/5 border-l-2 border-electric-blue rounded-r">
                                    <div className="text-electric-blue text-2xl font-serif mb-2">"</div>
                                    <p className="font-sans text-gray-300 italic mb-4">
                                        {selectedProject.testimonial.text}
                                    </p>
                                    <div>
                                        <div className="font-bold text-white text-sm">{selectedProject.testimonial.author}</div>
                                        <div className="text-xs text-gray-500 font-mono">{selectedProject.testimonial.role}</div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="font-mono text-sm text-gray-500 mb-3 uppercase tracking-wider">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map((tech) => (
                                        <span key={tech} className="font-mono text-xs text-white bg-gray-800 px-3 py-1 border border-gray-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="border-t border-gray-800 pt-8 mt-8 flex items-center justify-between group">
                                <div>
                                    <div className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-wider">
                                        {selectedProject.status === 'SELESAI' ? 'TOTAL INVESTMENT' : 'ESTIMATED INVESTMENT'}
                                    </div>
                                    <div className="font-display text-2xl md:text-3xl text-electric-blue group-hover:text-white transition-colors">
                                        {selectedProject.price || "Contact for Price"}
                                    </div>
                                </div>
                                <a
                                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(selectedProject.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-electric-blue text-black font-bold font-display hover:bg-white transition-colors"
                                    onClick={() => playSound('click')}
                                >
                                    ORDER SIMILAR
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
