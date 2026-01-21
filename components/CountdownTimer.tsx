"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Initialize timer from localStorage or set new expiry
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('promoExpiry');
            const now = Date.now();

            if (stored) {
                const expiry = parseInt(stored);
                const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
                setTimeLeft(remaining);
            } else {
                const expiry = now + (10 * 60 * 1000);
                localStorage.setItem('promoExpiry', expiry.toString());
            }

            const interval = setInterval(() => {
                const storedExpiry = localStorage.getItem('promoExpiry');
                if (storedExpiry) {
                    const remaining = Math.max(0, Math.floor((parseInt(storedExpiry) - Date.now()) / 1000));
                    setTimeLeft(remaining);

                    if (remaining === 0) {
                        localStorage.removeItem('promoExpiry');
                    }
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, []);

    if (!mounted) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(to right, #f97316, #ef4444)',
            color: 'white',
            padding: '0.375rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 700,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}>
            <Clock style={{ width: '1rem', height: '1rem' }} />
            <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
