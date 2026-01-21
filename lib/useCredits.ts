"use client";

import { useState, useEffect } from 'react';

export interface ServiceCredits {
    dating: number;
    faceTrace: number;
    following: number;
    fidelity: number;
    chatAnalysis: number;
}

const DEFAULT_CREDITS = 5;
const CREDITS_KEY = 'profilefinder_credits';

export function useCredits() {
    const [credits, setCredits] = useState<ServiceCredits>({
        dating: DEFAULT_CREDITS,
        faceTrace: DEFAULT_CREDITS,
        following: DEFAULT_CREDITS,
        fidelity: DEFAULT_CREDITS,
        chatAnalysis: DEFAULT_CREDITS,
    });

    // Load credits from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(CREDITS_KEY);
            if (stored) {
                try {
                    setCredits(JSON.parse(stored));
                } catch (error) {
                    console.error('Failed to parse credits:', error);
                }
            }
        }
    }, []);

    // Save credits to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CREDITS_KEY, JSON.stringify(credits));
        }
    }, [credits]);

    const getCredits = (service: keyof ServiceCredits): number => {
        return credits[service] || 0;
    };

    const decreaseCredits = (service: keyof ServiceCredits): boolean => {
        if (credits[service] > 0) {
            setCredits(prev => ({
                ...prev,
                [service]: prev[service] - 1,
            }));
            return true;
        }
        return false;
    };

    const initializeCredits = () => {
        setCredits({
            dating: DEFAULT_CREDITS,
            faceTrace: DEFAULT_CREDITS,
            following: DEFAULT_CREDITS,
            fidelity: DEFAULT_CREDITS,
            chatAnalysis: DEFAULT_CREDITS,
        });
    };

    const resetCredits = () => {
        setCredits({
            dating: 0,
            faceTrace: 0,
            following: 0,
            fidelity: 0,
            chatAnalysis: 0,
        });
    };

    const getTotalCredits = (): number => {
        return Object.values(credits).reduce((sum, credit) => sum + credit, 0);
    };

    return {
        credits,
        getCredits,
        decreaseCredits,
        initializeCredits,
        resetCredits,
        getTotalCredits,
    };
}
