"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Check, Lock, UserCircle,
    Cloud, Fingerprint, Database, Loader2, ArrowRight
} from 'lucide-react';
import { ServiceLayout } from '@/components/layouts/ServiceLayout';
import { TrustPanel } from '@/components/ui/TrustPanel';
import '@/styles/dating-search.css';

// Logo URL
const LOGO_URL = 'https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/LOGO%20PROFILEFINDER%20HD%20REALIST.svg';

export default function FaceTrace() {
    const router = useRouter();

    // Image uploaded from Hero
    const [uploadedImage, setUploadedImage] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80");

    // Steps: 1 = Loading, 2 = Gate
    const [currentStep, setCurrentStep] = useState(1);

    // Loading state
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [activeLogs, setActiveLogs] = useState<number[]>([1]);

    // Email gate
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('pf_facetrace_image');
            if (stored) {
                setUploadedImage(stored);
            }
        }
        startLoading();
    }, []);

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
            router.push('/payment/facetrace');
        }, 1000);
    };

    return (
        <ServiceLayout variant="faceTrace">
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
                                {currentStep === 1 ? 'Processing..' : 'Complete'}
                            </span>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={uploadedImage}
                                    alt="Target"
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #06b6d4', padding: '2px', objectFit: 'cover' }}
                                />
                                {currentStep === 2 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        backgroundColor: '#06b6d4',
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
                        
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', border: '4px solid #f3f4f6' }}>
                                <img src={uploadedImage} alt="Scanning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.4))',
                                    animation: 'scanPulse 2s infinite alternate'
                                }} />
                            </div>
                        </div>

                        <div className="analysis-pulse-card analysis-pulse-face">
                            <div className="analysis-radar-dot" />
                            <div>
                                <div className="analysis-pulse-title">Face lookup scan</div>
                                <div className="analysis-pulse-copy">Comparing facial markers with public profile traces.</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#06b6d4' }}>Scanning face matches...</h2>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{loadingPercent}%</span>
                        </div>

                        <div style={{ height: '16px', width: '100%', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden', marginBottom: '32px' }}>
                            <div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                                    transition: 'width 0.3s ease-out',
                                    width: `${loadingPercent}%`
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className={`dating-log-item ${!activeLogs.includes(1) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(1) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(1) ? <Check size={16} /> : <Fingerprint size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Mapping face landmarks from the image...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(2) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(2) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(2) ? <Check size={16} /> : <Database size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Comparing similar faces across public profiles...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(3) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(3) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(3) ? <Check size={16} /> : <Cloud size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Sorting matches by confidence and recency...</span>
                            </div>
                        </div>
                    </div>

                    {/* ==================== STEP 2: RESULT GATE ==================== */}
                    <div className={`dating-step ${currentStep === 2 ? 'active' : ''}`} style={{ textAlign: 'center', alignItems: 'center' }}>

                        <div className="dating-check-circle" style={{ marginBottom: '16px', backgroundColor: '#cffafe' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#06b6d4',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)'
                            }}>
                                <Check size={24} style={{ color: 'white' }} />
                            </div>
                        </div>

                        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>Result Ready!</h2>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px', maxWidth: '280px', lineHeight: 1.6 }}>
                            Analysis complete. We found <span style={{ backgroundColor: '#cffafe', color: '#0891b2', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>14 digital footprints</span> linked to this face.
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
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span>Unlock Report</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Lock size={14} style={{ color: '#06b6d4' }} /> Secure Data
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <UserCircle size={14} style={{ color: '#6b7280' }} /> 100% Anonymous
                            </span>
                        </div>
                    </div>

                    <TrustPanel service="facetrace" />
                </div>
            </div>

            <style>{`
                @keyframes scanPulse {
                    0% { transform: translateY(-10px); opacity: 0.5; }
                    100% { transform: translateY(120px); opacity: 1; }
                }
            `}</style>
        </ServiceLayout>
    );
}
