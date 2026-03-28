import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'pop' | 'sent' | 'recv' | 'toggle' | 'hover';

export const useSoundEffects = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    const playSound = useCallback((type: SoundType) => {
        // Check if muted in localStorage (simple global mute)
        if (localStorage.getItem('portfolio_muted') === 'true') return;

        initAudioContext();
        const ctx = audioContextRef.current!;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, now);
                gainNode.gain.setValueAtTime(0.04, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
                oscillator.start(now);
                oscillator.stop(now + 0.08);
                break;
            case 'hover':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(1000, now);
                gainNode.gain.setValueAtTime(0.015, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
                oscillator.start(now);
                oscillator.stop(now + 0.04);
                break;
            case 'pop':
                oscillator.type = 'sine';
                oscillator.frequency.setTargetAtTime(300, now, 0.01);
                oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.15);
                gainNode.gain.setValueAtTime(0.08, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
                oscillator.start(now);
                oscillator.stop(now + 0.2);
                break;
            case 'sent':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(350, now);
                oscillator.frequency.exponentialRampToValueAtTime(700, now + 0.12);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
                oscillator.start(now);
                oscillator.stop(now + 0.12);
                break;
            case 'recv':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(500, now);
                oscillator.frequency.exponentialRampToValueAtTime(250, now + 0.18);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
                oscillator.start(now);
                oscillator.stop(now + 0.18);
                break;
            case 'toggle':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(120, now);
                oscillator.frequency.linearRampToValueAtTime(240, now + 0.1);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
                oscillator.start(now);
                oscillator.stop(now + 0.12);
                break;
        }
    }, [initAudioContext]);

    return { playSound };
};
