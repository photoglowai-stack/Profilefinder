"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    durationMinutes?: number;
    storageKey?: string;
}

export function CountdownTimer({ durationMinutes = 10, storageKey = 'payment-timer-end' }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<number>(durationMinutes * 60);
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        // Get or create end time
        let endTime = localStorage.getItem(storageKey);

        if (!endTime) {
            const now = Date.now();
            const end = now + (durationMinutes * 60 * 1000);
            localStorage.setItem(storageKey, end.toString());
            endTime = end.toString();
        }

        // Calculate initial time left
        const calculateTimeLeft = () => {
            const now = Date.now();
            const end = parseInt(endTime!);
            const remaining = Math.max(0, Math.floor((end - now) / 1000));
            return remaining;
        };

        setTimeLeft(calculateTimeLeft());

        // Update every second
        const interval = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);
            setIsUrgent(remaining <= 120); // Urgent when under 2 minutes

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [durationMinutes, storageKey]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                backgroundColor: isUrgent ? '#fef2f2' : '#fff7ed',
                borderRadius: '0.875rem',
                border: `2px solid ${isUrgent ? '#fca5a5' : '#fed7aa'}`,
                marginBottom: '1rem',
                fontFamily: 'var(--font-display), ui-sans-serif, system-ui, sans-serif',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: isUrgent ? '#dc2626' : '#f97316',
                    borderRadius: '50%',
                    animation: isUrgent ? 'pulse 1.5s infinite' : 'none',
                }}
            >
                <Clock size={20} style={{ color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: isUrgent ? '#991b1b' : '#9a3412',
                        marginBottom: '0.125rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}
                >
                    {isUrgent ? '⚡ Offer expires soon!' : '⏱️ Limited offer'}
                </div>
                <div
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: isUrgent ? '#dc2626' : '#ea580c',
                        letterSpacing: '-0.02em',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
