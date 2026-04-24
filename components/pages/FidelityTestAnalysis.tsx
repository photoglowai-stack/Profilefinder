"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Check, Lock, UserCircle,
    Smartphone, Heart, Trash2, Moon, Loader2, ArrowRight
} from 'lucide-react';
import { ServiceLayout } from '@/components/layouts/ServiceLayout';
import '@/styles/dating-search.css';

// Logo URL
const LOGO_URL = 'https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/LOGO%20PROFILEFINDER%20HD%20REALIST.svg';

export default function FidelityTestAnalysis() {
    const router = useRouter();

    const [thumbnails, setThumbnails] = useState<string[]>([]);

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem('pf_fidelity_uploads');
            if (stored) {
                const urls = JSON.parse(stored);
                if (Array.isArray(urls) && urls.length > 0) {
                    setThumbnails(urls.slice(0, 3));
                }
            }
        } catch (e) {
            console.warn('Failed to load thumbnails');
        }
        startLoading();
    }, []);

    // Steps: 1 = Loading, 2 = Gate
    const [currentStep, setCurrentStep] = useState(1);

    // Loading state
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [activeLogs, setActiveLogs] = useState<number[]>([1]);

    // Email gate
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const startLoading = () => {
        setLoadingPercent(0);
        setActiveLogs([1]);

        setTimeout(() => setActiveLogs(prev => [...prev, 2]), 1200);
        setTimeout(() => setActiveLogs(prev => [...prev, 3]), 2500);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            setLoadingPercent(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => setCurrentStep(2), 600);
            }
        }, 35);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            router.push('/payment?service=fidelity');
        }, 1000);
    };

    return (
        <ServiceLayout variant="fidelity">
            <div className="dating-search-wrapper">
                <div className="dating-card">

                    {/* HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>ProfileFinder</h1>

                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '24px',
                            transform: 'translateX(-50%)',
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={LOGO_URL}
                                alt="ProfileFinder"
                                style={{ width: '40px', height: '40px' }}
                            />
                        </div>

                        {/* Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>
                                {currentStep === 1 ? 'Testing..' : 'Complete'}
                            </span>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={'https://ui-avatars.com/api/?name=Chat&background=ef4444&color=fff'}
                                    alt="Target"
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #ef4444', padding: '2px', objectFit: 'cover' }}
                                />
                                {currentStep === 2 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '14px',
                                        height: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '8px',
                                        border: '2px solid white'
                                    }}>✔</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar (2 segments) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '32px' }}>
                        {[1, 2].map((seg) => (
                            <div
                                key={seg}
                                className={`dating-progress-segment ${currentStep >= seg ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    {/* ==================== STEP 1: LOADING ==================== */}
                    <div className={`dating-step ${currentStep === 1 ? 'active' : ''}`}>
                        
                        {thumbnails.length > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                                {thumbnails.map((src, idx) => (
                                    <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #f3f4f6' }}>
                                        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(1px)' }} />
                                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(239, 68, 68, 0.2)' }} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>Testing Loyalty...</h2>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{loadingPercent}%</span>
                        </div>

                        <div style={{ height: '16px', width: '100%', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden', marginBottom: '32px' }}>
                            <div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(to right, #ea580c, #ef4444)',
                                    transition: 'width 0.3s ease-out',
                                    width: `${loadingPercent}%`
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className={`dating-log-item ${!activeLogs.includes(1) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(1) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(1) ? <Check size={16} /> : <Smartphone size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Reading chat patterns & timing...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(2) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(2) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(2) ? <Check size={16} /> : <Heart size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Looking for disguised flirting...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(3) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(3) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(3) ? <Check size={16} /> : <Moon size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Detecting late night activity...</span>
                            </div>
                        </div>
                    </div>

                    {/* ==================== STEP 2: RESULT GATE ==================== */}
                    <div className={`dating-step ${currentStep === 2 ? 'active' : ''}`} style={{ textAlign: 'center', alignItems: 'center' }}>

                        <div className="dating-check-circle" style={{ marginBottom: '16px', backgroundColor: '#fef2f2' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#ef4444',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                            }}>
                                <Check size={24} style={{ color: 'white' }} />
                            </div>
                        </div>

                        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>Test Complete</h2>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px', maxWidth: '280px', lineHeight: 1.6 }}>
                            Scan finished. We detected <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>3 Red Flags 🚩</span> in this conversation.
                        </p>

                        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="dating-email-input"
                            />

                            <button type="submit" disabled={isSubmitting} className="dating-btn-dark">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Generating report...
                                    </>
                                ) : (
                                    <>
                                        <span>Show the Truth</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Lock size={14} style={{ color: '#ef4444' }} /> Secure Scan
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <UserCircle size={14} style={{ color: '#6b7280' }} /> 100% Anonymous
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ServiceLayout>
    );
}
