'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define sound types for type safety
export type SoundType = 'hover' | 'click' | 'success' | 'error' | 'hero-reveal' | 'car-rev' | 'page-flip' | 'cash-register' | 'notification' | 'clean-chime' | 'interaction';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSound: (type: SoundType) => void;
    playFile: (src: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isMuted, setIsMuted] = useState(false); // Default to unmuted now that we have sounds
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    // Initialize AudioContext on first user interaction to bypass autoplay policy
    useEffect(() => {
        const initAudio = () => {
            if (!audioContext) {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                setAudioContext(ctx);
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, [audioContext]);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) => {
        if (!audioContext) return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + startTime);

        gain.gain.setValueAtTime(vol, audioContext.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(audioContext.currentTime + startTime);
        osc.stop(audioContext.currentTime + startTime + duration);
    };

    const playNoise = (duration: number, startTime: number = 0) => {
        if (!audioContext) return;
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.05, audioContext.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + startTime + duration);

        noise.connect(gain);
        gain.connect(audioContext.destination);
        noise.start(audioContext.currentTime + startTime);
    };

    const playSound = (type: SoundType) => {
        if (isMuted || !audioContext) return;

        // Resume context if suspended (browser policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        switch (type) {
            case 'hover':
                // High pitch short blip
                playTone(800, 'sine', 0.05, 0, 0.05);
                break;
            case 'click':
                // Sharp mechanical click
                playTone(1200, 'square', 0.05, 0, 0.05);
                playTone(600, 'sawtooth', 0.1, 0.02, 0.05);
                break;
            case 'success':
                // Ascending chime
                playTone(880, 'sine', 0.2, 0, 0.1); // A5
                playTone(1108, 'sine', 0.3, 0.1, 0.1); // C#6
                playTone(1318, 'sine', 0.4, 0.2, 0.1); // E6
                break;
            case 'error':
                // Low buzz
                playTone(150, 'sawtooth', 0.3, 0, 0.1);
                playTone(140, 'sawtooth', 0.3, 0.1, 0.1);
                break;
            case 'hero-reveal':
                // Sweep up
                playTone(200, 'sine', 1.5, 0, 0.1);
                // Note: Complex sweeps are harder with this simple helper, keeping it simple
                break;
            case 'car-rev':
                // Low rumble revving up
                playTone(80, 'sawtooth', 0.5, 0, 0.2);
                playTone(150, 'square', 0.4, 0.1, 0.15);
                break;
            case 'page-flip':
                // White noise burst
                playNoise(0.15, 0);
                break;
            case 'cash-register':
                // Cha-ching!
                playTone(1500, 'sine', 0.1, 0, 0.1);
                playTone(2000, 'square', 0.2, 0.05, 0.05);
                break;
            case 'notification':
                // Glassy ting
                playTone(1200, 'sine', 0.5, 0, 0.1);
                playTone(2400, 'sine', 0.5, 0, 0.05);
                break;
            case 'clean-chime':
                // Fresh sparkles
                playTone(1000, 'sine', 0.2, 0, 0.05);
                playTone(1500, 'triangle', 0.2, 0.05, 0.05);
                playTone(2000, 'sine', 0.3, 0.1, 0.05);
                break;
            case 'interaction':
                playTone(400, 'sine', 0.1, 0, 0.05);
                break;
        }
    };

    const playFile = (src: string) => {
        if (isMuted) return;
        const audio = new Audio(src);
        audio.volume = 0.4;
        audio.play().catch(() => { });
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound, playFile }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useAppSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useAppSound must be used within a SoundProvider');
    }
    return context;
}
