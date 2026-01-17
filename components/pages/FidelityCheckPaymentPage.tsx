"use client";

import { useState, useEffect, useRef } from 'react';
import { FidelityCheckResultsPreview, FidelityCheckLoadingScreen } from '@/components/ui/FidelityCheckResultsPreview';

// Theme colors - Red/Orange for Fidelity Check
const colors = {
    primary: '#dc2626',
    secondary: '#f97316',
    primaryLight: '#fef2f2',
    primaryDark: '#b91c1c',
    accentOrange: '#ea580c',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    green500: '#22c55e',
    green600: '#16a34a',
    white: '#ffffff',
};

// Icons
const IconLock = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);
const IconClock = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
        <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);
const IconEye = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
    </svg>
);
const IconArrowRight = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);
const IconHeart = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);
const IconMapPin = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
    </svg>
);
const IconRadar = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"></path><path d="M4 6h.01"></path><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"></path><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"></path><path d="M12 18h.01"></path><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"></path><circle cx="12" cy="12" r="2"></circle><path d="m13.41 10.59 5.66-5.66"></path>
    </svg>
);
const IconAlert = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);
const IconShieldCheck = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>
    </svg>
);
const IconShield = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

// WebGL Background
const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if ((window as any).THREE) { setLoaded(true); return; }
        const script = document.createElement('script');
        script.src = url; script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
    }, [url]);
    return loaded;
};

const WebGLBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const loaded = useThreeScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReducedMotion || !loaded || !mountRef.current) return;
        const THREE = (window as any).THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.5 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        const animate = () => { requestAnimationFrame(animate); particlesMesh.rotation.y += 0.001; particlesMesh.rotation.x += 0.0005; renderer.render(scene, camera); };
        animate();

        const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.innerHTML = ''; };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
};

const AnimationStyles = () => (
    <style>{`
        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes bounce { 0%, 100% { transform: translateY(-10%); } 50% { transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.05); }
    `}</style>
);

export function FidelityCheckPaymentPage() {
    const [timeLeft, setTimeLeft] = useState(480);
    const [isHoveringMain, setIsHoveringMain] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const features = [
        { name: '💔 Dating App Detection', description: 'Scan Tinder, Bumble, Badoo & 20+ apps', Icon: IconHeart },
        { name: '📍 Location Tracking', description: 'Geolocation-based profile search', Icon: IconMapPin },
        { name: '🔔 Real-Time Alerts', description: 'Get notified when profile goes active', Icon: IconAlert },
        { name: '📊 Activity Reports', description: 'Full history of matches & interactions', Icon: IconRadar },
    ];

    return (
        <>
            <AnimationStyles />
            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: 'linear-gradient(to bottom right, #dc2626, #f97316, #fbbf24)',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <WebGLBackground />

                {/* NAV */}
                <nav className="animate-fade-in-down" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '16px 24px', maxWidth: '720px', margin: '0 auto', marginBottom: '1.5rem',
                    width: '100%', backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.05)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 0 16px 16px',
                    position: 'relative', zIndex: 30, color: 'white'
                }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" loading="lazy" style={{ height: '32px', width: 'auto' }} />
                        <span style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>ProfileFinder</span>
                    </a>
                </nav>

                {/* MAIN CARD */}
                <div className="animate-scale-in" style={{
                    backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
                    width: '100%', maxWidth: '28rem', borderRadius: '2.5rem',
                    boxShadow: '0 30px 60px -12px rgba(0,0,0,0.35)', overflow: 'hidden',
                    position: 'relative', zIndex: 20,
                }}>
                    {/* RESULTS SECTION */}
                    <div style={{ padding: '1.75rem', paddingBottom: '0.5rem', position: 'relative' }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'linear-gradient(to right, rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.03) 1px, transparent 1px)',
                            backgroundSize: '20px 20px', pointerEvents: 'none',
                        }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative' }}>
                            <div>
                                <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: colors.gray800, lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
                                    Fidelity Check <br />
                                    <span className="animate-gradient-xy" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(to right, #dc2626, #f97316)' }}>
                                        Results
                                    </span>
                                </h1>
                                <div className="animate-pulse-slow" style={{
                                    marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    backgroundColor: colors.primaryLight, color: colors.primaryDark, padding: '0.375rem 0.75rem',
                                    borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                                    border: `1px solid ${colors.primary}30`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ position: 'relative', display: 'flex', width: '0.5rem', height: '0.5rem' }}>
                                        <span className="animate-ping" style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '9999px', backgroundColor: colors.primary, opacity: 0.75 }}></span>
                                        <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', width: '0.5rem', height: '0.5rem', backgroundColor: colors.primary }}></span>
                                    </span>
                                    ⚠️ Suspicious Activity
                                </div>
                            </div>
                            <div className="hover-scale" style={{
                                background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`, color: colors.white,
                                padding: '0.75rem 1rem', borderRadius: '1rem', textAlign: 'center',
                                boxShadow: `0 10px 20px -5px ${colors.primary}60`, cursor: 'help',
                            }}>
                                <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', opacity: 0.9 }}>Risk</div>
                                <div style={{ fontWeight: 900, fontSize: '1.25rem', lineHeight: 1, letterSpacing: '-0.05em' }}>HIGH</div>
                            </div>
                        </div>

                        <FidelityCheckResultsPreview />

                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            fontSize: '0.75rem', fontWeight: 700, color: colors.gray500,
                            borderBottom: `1px solid ${colors.gray100}`, paddingBottom: '1.25rem',
                        }}>
                            <IconEye className="animate-bounce-slow" style={{ width: '1rem', height: '1rem', color: colors.primary }} />
                            <span style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: `linear-gradient(to right, ${colors.gray600}, ${colors.gray400})` }}>
                                Unlock full profile details & activity
                            </span>
                        </div>
                    </div>

                    {/* PRICING SECTION */}
                    <div style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
                        {/* SUBSCRIPTION CARD */}
                        <div style={{ position: 'relative', zIndex: 10, marginTop: '0.5rem', marginBottom: '1.25rem', transition: 'all 0.3s ease', transform: isHoveringMain ? 'translateY(-4px)' : 'translateY(0)' }}
                            onMouseEnter={() => setIsHoveringMain(true)} onMouseLeave={() => setIsHoveringMain(false)}>
                            <div className="animate-gradient-xy" style={{
                                position: 'absolute', inset: 0, background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
                                borderRadius: '1rem', opacity: isHoveringMain ? 1 : 0.75, filter: 'blur(1px)', padding: '2px',
                            }}></div>
                            <div style={{
                                position: 'relative', backgroundColor: colors.white, borderRadius: '0.9rem', padding: '1.25rem',
                                overflow: 'hidden', boxShadow: isHoveringMain ? `0 20px 40px -10px ${colors.primary}40` : 'none', transition: 'box-shadow 0.3s ease',
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <div style={{
                                        backgroundColor: colors.primaryDark, color: colors.white, fontSize: '10px', fontWeight: 700,
                                        padding: '0.375rem 0.75rem', borderBottomLeftRadius: '0.75rem', textTransform: 'uppercase',
                                        letterSpacing: '0.05em', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}>Most Popular</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.25rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: colors.gray900, lineHeight: 1.2, margin: 0 }}>Unlimited<br />Searches</h3>
                                        <p style={{ fontSize: '11px', color: colors.primaryDark, fontWeight: 700, backgroundColor: colors.primaryLight, display: 'inline-block', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', marginTop: '0.25rem', margin: 0 }}>
                                            Monitor all dating apps 24/7
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '1.875rem', fontWeight: 900, color: colors.primaryDark, letterSpacing: '-0.05em' }}>19.99€</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: colors.gray400, fontWeight: 600, textDecoration: 'line-through' }}>39.99€</span>
                                            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: colors.green600, backgroundColor: 'rgba(34,197,94,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>-50%</span>
                                        </div>
                                        <span style={{ fontSize: '10px', color: colors.gray400, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>/ month</span>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: `${colors.primaryLight}cc`, borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', border: `1px solid ${colors.primary}20` }}>
                                    {features.map((feat, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <feat.Icon style={{ width: '1.25rem', height: '1.25rem', color: colors.primary, flexShrink: 0, marginTop: '0.125rem' }} />
                                            <div>
                                                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: colors.gray900, lineHeight: 1.3 }}>{feat.name}</div>
                                                <div style={{ fontSize: '0.8125rem', color: colors.gray500, fontWeight: 400, marginTop: '0.125rem' }}>{feat.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '9999px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                    <IconShieldCheck style={{ width: '1rem', height: '1rem', color: colors.green500 }} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.green600 }}>🔒 100% Confidential & Anonymous</span>
                                </div>

                                <button style={{
                                    width: '100%', backgroundColor: colors.primaryDark, color: colors.white, fontWeight: 700,
                                    padding: '1rem', borderRadius: '0.75rem', fontSize: '1rem',
                                    boxShadow: isHoveringMain ? `0 15px 25px -5px ${colors.primary}70` : `0 10px 15px -3px ${colors.primary}50`,
                                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.accentOrange; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.primaryDark; }}>
                                    💔 Check Now
                                    <IconArrowRight style={{ width: '1rem', height: '1rem', transition: 'transform 0.3s ease', transform: isHoveringMain ? 'translateX(4px)' : 'translateX(0)' }} />
                                </button>
                                <p style={{ fontSize: '10px', textAlign: 'center', color: colors.gray400, marginTop: '0.625rem', marginBottom: 0, fontWeight: 500 }}>Discrete billing • No commitment</p>
                            </div>
                        </div>

                        {/* SINGLE REPORT */}
                        <div style={{
                            position: 'relative', border: `2px dashed ${colors.gray200}`, borderRadius: '1rem',
                            padding: '1rem', transition: 'all 0.3s ease', cursor: 'pointer', backgroundColor: colors.white,
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.gray50; e.currentTarget.style.borderColor = colors.gray400; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; e.currentTarget.style.borderColor = colors.gray200; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 700, color: colors.gray700, fontSize: '0.875rem' }}>💔 Single Person Check</span>
                                    <span style={{ fontSize: '10px', color: colors.gray400 }}>One-time payment</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontWeight: 700, color: colors.gray800, fontSize: '1.125rem' }}>14.99€</span>
                                    <span style={{ fontSize: '10px', color: colors.primary, textDecoration: 'line-through', fontWeight: 500, opacity: 0.6 }}>29.90€</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.375rem', backgroundColor: colors.primaryLight,
                                    padding: '0.375rem 0.625rem', borderRadius: '0.5rem', fontSize: '10px', fontWeight: 700,
                                    color: colors.primaryDark, border: `1px solid ${colors.primary}30`,
                                }}>
                                    <IconClock className="animate-pulse" style={{ width: '0.75rem', height: '0.75rem' }} />
                                    Ends in <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>{formatTime(timeLeft)}</span>
                                </div>
                                <button style={{
                                    backgroundColor: colors.white, border: `1px solid ${colors.gray200}`, color: colors.gray600,
                                    padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700,
                                    cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.gray100; e.currentTarget.style.color = colors.gray800; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; e.currentTarget.style.color = colors.gray600; }}>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div style={{
                        backgroundColor: 'rgba(249,250,251,0.8)', backdropFilter: 'blur(10px)', padding: '1rem', textAlign: 'center',
                        borderTop: `1px solid ${colors.gray100}`, fontSize: '10px', color: colors.gray400, fontWeight: 500,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginBottom: '0.375rem', color: 'rgba(22,163,74,0.8)' }}>
                            <IconShield style={{ width: '0.75rem', height: '0.75rem' }} /> 100% Discrete • No one will know
                        </div>
                        <p style={{ margin: 0 }}>Powered by <span style={{ fontWeight: 700, color: colors.gray600 }}>Stripe</span> • Secure SSL 256-bit</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FidelityCheckPaymentPage;
