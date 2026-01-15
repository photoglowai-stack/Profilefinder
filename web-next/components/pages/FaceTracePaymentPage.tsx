"use client";

import { useState, useEffect, useRef } from 'react';
import { FaceTraceResultsPreview } from '@/components/payment/FaceTraceResultsPreview';

// Couleurs du thème FaceTrace (bleu/cyan)
const colors = {
    cyan500: '#06b6d4',
    cyan600: '#0891b2',
    cyan50: '#ecfeff',
    cyan100: '#cffafe',
    cyan400: '#22d3ee',
    blue600: '#2563eb',
    blue700: '#1d4ed8',
    blue500: '#3b82f6',
    blue50: '#eff6ff',
    blue900: '#1e3a8a',
    blue100: '#dbeafe',
    purple500: '#a855f7',
    teal500: '#14b8a6',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
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
const IconCheck = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <polyline points="20 6 9 17 4 12"></polyline>
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
const IconZap = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);
const IconShieldCheck = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>
    </svg>
);
const IconStar = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);
const IconShield = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);
const IconScan = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if ((window as any).THREE) { setLoaded(true); return; }
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
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
        const material = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.6 });
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
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes bounce { 0%, 100% { transform: translateY(-10%); } 50% { transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.05); }
    `}</style>
);

export function FaceTracePaymentPage() {
    const [timeLeft, setTimeLeft] = useState(600);
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
        { name: '🔍 Multi-Platform Scan', description: 'Search across 12+ social networks instantly', Icon: IconScan },
        { name: '💕 Dating App Detection', description: 'Find hidden dating profiles by face', Icon: IconZap },
        { name: '🛡️ Identity Verification', description: 'Confirm who someone really is online', Icon: IconShieldCheck },
        { name: '🔔 New Profile Alerts', description: 'Get notified when new matches appear', Icon: IconStar },
    ];

    return (
        <>
            <AnimationStyles />
            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: 'linear-gradient(to bottom right, #0891b2, #6366f1)',
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
                            backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.04) 1px, transparent 1px)',
                            backgroundSize: '20px 20px', pointerEvents: 'none',
                        }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative' }}>
                            <div>
                                <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: colors.gray800, lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
                                    Face Trace <br />
                                    <span className="animate-gradient-x" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(to right, #06b6d4, #6366f1)' }}>
                                        Results
                                    </span>
                                </h1>
                                <div className="animate-pulse-slow" style={{
                                    marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    backgroundColor: colors.cyan50, color: colors.cyan600, padding: '0.375rem 0.75rem',
                                    borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                                    border: `1px solid ${colors.cyan100}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ position: 'relative', display: 'flex', width: '0.5rem', height: '0.5rem' }}>
                                        <span className="animate-ping" style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '9999px', backgroundColor: colors.cyan400, opacity: 0.75 }}></span>
                                        <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', width: '0.5rem', height: '0.5rem', backgroundColor: colors.cyan500 }}></span>
                                    </span>
                                    8+ Faces Detected
                                </div>
                            </div>
                            <div className="hover-scale" style={{
                                background: 'linear-gradient(to bottom right, #06b6d4, #6366f1)', color: colors.white,
                                padding: '0.75rem 1rem', borderRadius: '1rem', textAlign: 'center',
                                boxShadow: '0 10px 20px -5px rgba(6,182,212,0.4)', cursor: 'help',
                            }}>
                                <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', opacity: 0.9 }}>Match</div>
                                <div style={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1, letterSpacing: '-0.05em' }}>97%</div>
                            </div>
                        </div>

                        <FaceTraceResultsPreview />

                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            fontSize: '0.75rem', fontWeight: 700, color: colors.gray500,
                            borderBottom: `1px solid ${colors.gray100}`, paddingBottom: '1.25rem',
                        }}>
                            <IconEye className="animate-bounce-slow" style={{ width: '1rem', height: '1rem', color: colors.cyan500 }} />
                            <span style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: `linear-gradient(to right, ${colors.gray600}, ${colors.gray400})` }}>
                                Unlock to see photos and full report
                            </span>
                        </div>
                    </div>

                    {/* PRICING SECTION */}
                    <div style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
                        {/* SUBSCRIPTION CARD */}
                        <div style={{ position: 'relative', zIndex: 10, marginTop: '0.5rem', marginBottom: '1.25rem', transition: 'all 0.3s ease', transform: isHoveringMain ? 'translateY(-4px)' : 'translateY(0)' }}
                            onMouseEnter={() => setIsHoveringMain(true)} onMouseLeave={() => setIsHoveringMain(false)}>
                            <div className="animate-gradient-xy" style={{
                                position: 'absolute', inset: 0, background: 'linear-gradient(to right, #06b6d4, #a855f7, #06b6d4)',
                                borderRadius: '1rem', opacity: isHoveringMain ? 1 : 0.75, filter: 'blur(1px)', padding: '2px',
                            }}></div>
                            <div style={{
                                position: 'relative', backgroundColor: colors.white, borderRadius: '0.9rem', padding: '1.25rem',
                                overflow: 'hidden', boxShadow: isHoveringMain ? '0 20px 40px -10px rgba(6,182,212,0.3)' : 'none', transition: 'box-shadow 0.3s ease',
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <div style={{
                                        backgroundColor: colors.cyan600, color: colors.white, fontSize: '10px', fontWeight: 700,
                                        padding: '0.375rem 0.75rem', borderBottomLeftRadius: '0.75rem', textTransform: 'uppercase',
                                        letterSpacing: '0.05em', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}>Best Value</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.25rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: colors.gray900, lineHeight: 1.2, margin: 0 }}>Unlimited<br />Face Scans</h3>
                                        <p style={{ fontSize: '11px', color: colors.cyan600, fontWeight: 700, backgroundColor: colors.cyan50, display: 'inline-block', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', marginTop: '0.25rem', margin: 0 }}>
                                            Search all platforms forever
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '1.875rem', fontWeight: 900, color: colors.cyan600, letterSpacing: '-0.05em' }}>19.99€</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: colors.gray400, fontWeight: 600, textDecoration: 'line-through' }}>39.99€</span>
                                            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: colors.green600, backgroundColor: 'rgba(34,197,94,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>-50%</span>
                                        </div>
                                        <span style={{ fontSize: '10px', color: colors.gray400, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>/ month</span>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: 'rgba(236,254,255,0.8)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', border: '1px solid rgba(207,250,254,0.5)' }}>
                                    {features.map((feat, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <feat.Icon style={{ width: '1.25rem', height: '1.25rem', color: colors.cyan500, flexShrink: 0, marginTop: '0.125rem' }} />
                                            <div>
                                                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: colors.gray900, lineHeight: 1.3 }}>{feat.name}</div>
                                                <div style={{ fontSize: '0.8125rem', color: colors.gray500, fontWeight: 400, marginTop: '0.125rem' }}>{feat.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '9999px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                    <IconShieldCheck style={{ width: '1rem', height: '1rem', color: colors.green500 }} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.green600 }}>🔒 500k+ users trust ProfileFinder</span>
                                </div>

                                <button style={{
                                    width: '100%', backgroundColor: colors.cyan600, color: colors.white, fontWeight: 700,
                                    padding: '1rem', borderRadius: '0.75rem', fontSize: '1rem',
                                    boxShadow: isHoveringMain ? '0 15px 25px -5px rgba(6,182,212,0.5)' : '0 10px 15px -3px rgba(6,182,212,0.3)',
                                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.blue700; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.cyan600; }}>
                                    🔒 Activate Now
                                    <IconArrowRight style={{ width: '1rem', height: '1rem', transition: 'transform 0.3s ease', transform: isHoveringMain ? 'translateX(4px)' : 'translateX(0)' }} />
                                </button>
                                <p style={{ fontSize: '10px', textAlign: 'center', color: colors.gray400, marginTop: '0.625rem', marginBottom: 0, fontWeight: 500 }}>No commitment • Cancel anytime</p>
                            </div>
                        </div>

                        {/* SINGLE REPORT */}
                        <div style={{
                            position: 'relative', border: `2px dashed ${colors.gray200}`, borderRadius: '1rem',
                            padding: '1rem', transition: 'all 0.3s ease', cursor: 'pointer', backgroundColor: colors.white,
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(249,250,251,0.8)'; e.currentTarget.style.borderColor = colors.gray300; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; e.currentTarget.style.borderColor = colors.gray200; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 700, color: colors.gray700, fontSize: '0.875rem' }}>🔍 Single Face Search</span>
                                    <span style={{ fontSize: '10px', color: colors.gray400 }}>One-time payment</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontWeight: 700, color: colors.gray800, fontSize: '1.125rem' }}>14.99€</span>
                                    <span style={{ fontSize: '10px', color: colors.cyan500, textDecoration: 'line-through', fontWeight: 500, opacity: 0.6 }}>29.90€</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.375rem', backgroundColor: colors.cyan50,
                                    padding: '0.375rem 0.625rem', borderRadius: '0.5rem', fontSize: '10px', fontWeight: 700,
                                    color: colors.cyan600, border: '1px solid rgba(207,250,254,0.5)',
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
                            <IconShield style={{ width: '0.75rem', height: '0.75rem' }} /> Secure SSL 256-bit Payment
                        </div>
                        <p style={{ margin: 0 }}>Powered by <span style={{ fontWeight: 700, color: colors.gray600 }}>Stripe</span> & <span style={{ fontWeight: 700, color: colors.gray600 }}>React</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FaceTracePaymentPage;
