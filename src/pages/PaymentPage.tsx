import { useState, useEffect, useRef } from 'react';
import { useService } from '../lib/ServiceContext';
import { ServiceType } from '../lib/serviceColors';
import { DatingResultsPreview } from '../components/ui/DatingResultsPreview';
import { FaceTraceResultsPreview } from '../components/ui/FaceTraceResultsPreview';
import { FidelityResultsPreview } from '../components/ui/FidelityResultsPreview';
import { FollowingResultsPreview } from '../components/ui/FollowingResultsPreview';

// PREVIEW_MAP - Deterministic mapping of service to preview component
const PREVIEW_MAP: Record<ServiceType, React.FC> = {
    dating: DatingResultsPreview,
    facetrace: FaceTraceResultsPreview,
    fidelity: FidelityResultsPreview,
    following: FollowingResultsPreview,
};

// Couleurs du thème
const colors = {
    rose500: '#f43f5e',
    rose600: '#e11d48',
    rose50: '#fff1f2',
    rose100: '#ffe4e6',
    rose400: '#fb7185',
    pink600: '#db2777',
    indigo600: '#4f46e5',
    indigo700: '#4338ca',
    indigo500: '#6366f1',
    indigo50: '#eef2ff',
    indigo900: '#312e81',
    indigo100: '#e0e7ff',
    purple500: '#a855f7',
    orange500: '#f97316',
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

// --- ICÔNES SVG INTÉGRÉES ---
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

/**
 * HOOK: CHARGEMENT DYNAMIQUE DE THREE.JS
 */
const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if ((window as any).THREE) {
            setLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
    }, [url]);

    return loaded;
};

/**
 * COMPOSANT: BACKGROUND WEBGL (PARTICULES RÉSEAU)
 * Respects prefers-reduced-motion for accessibility
 */
const WebGLBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const loaded = useThreeScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        // Skip WebGL rendering if user prefers reduced motion
        if (prefersReducedMotion || !loaded || !mountRef.current) return;

        const THREE = (window as any).THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        mountRef.current.appendChild(renderer.domElement);

        // Création des particules
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) mountRef.current.innerHTML = '';
        };
    }, [loaded, prefersReducedMotion]);

    // Don't render anything if user prefers reduced motion
    if (prefersReducedMotion) {
        return null;
    }

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.6,
            }}
        />
    );
};

// Animation Styles
const AnimationStyles = () => (
    <style>{`
        @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
            50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.05); }
        
        .btn-shimmer { position: relative; overflow: hidden; }
        .btn-shimmer::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: translateX(-100%);
        }
        .btn-shimmer:hover::after { animation: shimmer 1.5s infinite; }
    `}</style>
);

export function PaymentPage() {
    const { selectedService } = useService();
    const [timeLeft, setTimeLeft] = useState(91);
    const [isHoveringMain, setIsHoveringMain] = useState(false);

    // Get the preview component for the current service
    const PreviewComponent = PREVIEW_MAP[selectedService] || DatingResultsPreview;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `0${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const features = [
        { name: 'Dating App Search', description: 'Unlimited searches across all dating apps', Icon: IconZap },
        { name: 'Following AI', description: 'Daily analysis of Instagram followers', Icon: IconEye },
        { name: 'Face Trace', description: 'Reverse face search across all platforms', Icon: IconShieldCheck },
        { name: 'Cheating Analytics', description: 'Complete reports and real-time alerts', Icon: IconStar },
    ];

    return (
        <>
            <AnimationStyles />
            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: 'linear-gradient(to bottom right, #ff5f6d, #ffc371)',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
            }}>

                {/* LAYER WEBGL */}
                <WebGLBackground />

                {/* LOCKED CHECKOUT HEADER - Logo only, no exit points */}
                <nav
                    className="animate-fade-in-down"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px 24px',
                        maxWidth: '720px',
                        margin: '0 auto',
                        marginBottom: '1.5rem',
                        width: '100%',
                        backdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0 0 16px 16px',
                        position: 'relative',
                        zIndex: 30,
                        color: 'white'
                    }}
                >
                    {/* Logo only - locked checkout */}
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
                        <img
                            src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                            alt="ProfileFinder"
                            loading="lazy"
                            style={{ height: '32px', width: 'auto' }}
                        />
                        <span style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            ProfileFinder
                        </span>
                    </a>
                </nav>

                {/* CARTE PRINCIPALE - FIXE (pas de tilt) */}
                <div
                    className="animate-scale-in"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        width: '100%',
                        maxWidth: '28rem',
                        borderRadius: '2.5rem',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.35)',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 20,
                    }}
                >

                    {/* DYNAMIC SERVICE PREVIEW */}
                    <div style={{ borderRadius: '1rem', overflow: 'hidden', margin: '0.5rem' }}>
                        <PreviewComponent />
                    </div>

                    {/* SECTION PRIX */}
                    <div style={{ padding: '0 1.5rem 2rem 1.5rem' }}>

                        {/* 1. ABONNEMENT (HERO CARD) */}
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 10,
                                marginTop: '0.5rem',
                                marginBottom: '1.25rem',
                                transition: 'all 0.3s ease',
                                transform: isHoveringMain ? 'translateY(-4px)' : 'translateY(0)',
                            }}
                            onMouseEnter={() => setIsHoveringMain(true)}
                            onMouseLeave={() => setIsHoveringMain(false)}
                        >
                            {/* Animated Border Gradient */}
                            <div
                                className="animate-gradient-xy"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `linear-gradient(to right, ${colors.indigo500}, ${colors.purple500}, ${colors.indigo500})`,
                                    borderRadius: '1rem',
                                    opacity: isHoveringMain ? 1 : 0.75,
                                    filter: 'blur(1px)',
                                    padding: '2px',
                                }}
                            ></div>

                            <div style={{
                                position: 'relative',
                                backgroundColor: colors.white,
                                borderRadius: '0.9rem',
                                padding: '1.25rem',
                                overflow: 'hidden',
                                boxShadow: isHoveringMain ? `0 20px 40px -10px rgba(99,102,241,0.3)` : 'none',
                                transition: 'box-shadow 0.3s ease',
                            }}>
                                {/* Badge Recommandé */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}>
                                    <div style={{
                                        backgroundColor: colors.indigo600,
                                        color: colors.white,
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        padding: '0.375rem 0.75rem',
                                        borderBottomLeftRadius: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}>
                                        Best Value
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                    marginTop: '0.25rem',
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 900,
                                            color: colors.gray900,
                                            lineHeight: 1.2,
                                            margin: 0,
                                        }}>Monthly<br />Subscription</h3>
                                        <p style={{
                                            fontSize: '11px',
                                            color: colors.indigo600,
                                            fontWeight: 700,
                                            backgroundColor: colors.indigo50,
                                            display: 'inline-block',
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            marginTop: '0.25rem',
                                            margin: 0,
                                        }}>
                                            Unlimited access to all tools
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            display: 'block',
                                            fontSize: '1.875rem',
                                            fontWeight: 900,
                                            color: colors.indigo600,
                                            letterSpacing: '-0.05em',
                                        }}>19.99€</span>
                                        <span style={{
                                            fontSize: '10px',
                                            color: colors.gray400,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>/ month</span>
                                    </div>
                                </div>

                                {/* Services inclus */}
                                <div style={{
                                    backgroundColor: 'rgba(238,242,255,0.8)',
                                    borderRadius: '0.75rem',
                                    padding: '1rem',
                                    marginBottom: '1.25rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.875rem',
                                    border: `1px solid rgba(224,231,255,0.5)`,
                                }}>
                                    {features.map((feat, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                        }}>
                                            <feat.Icon style={{ width: '1.25rem', height: '1.25rem', color: colors.rose500, flexShrink: 0, marginTop: '0.125rem' }} />
                                            <div>
                                                <div style={{
                                                    fontSize: '0.9375rem',
                                                    fontWeight: 700,
                                                    color: colors.gray900,
                                                    lineHeight: 1.3,
                                                }}>{feat.name}</div>
                                                <div style={{
                                                    fontSize: '0.8125rem',
                                                    color: colors.gray500,
                                                    fontWeight: 400,
                                                    marginTop: '0.125rem',
                                                }}>{feat.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Proof - CRO boost */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                }}>
                                    <IconShieldCheck style={{ width: '1rem', height: '1rem', color: colors.green500 }} />
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: colors.green600,
                                    }}>
                                        🔒 500k+ users trust ProfileFinder
                                    </span>
                                </div>

                                <button
                                    style={{
                                        width: '100%',
                                        backgroundColor: colors.indigo600,
                                        color: colors.white,
                                        fontWeight: 700,
                                        padding: '1rem',
                                        borderRadius: '0.75rem',
                                        fontSize: '1rem',
                                        boxShadow: isHoveringMain ? `0 15px 25px -5px rgba(99,102,241,0.5)` : `0 10px 15px -3px rgba(99,102,241,0.3)`,
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.indigo700;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.indigo600;
                                    }}
                                >
                                    🔒 Activate Now
                                    <IconArrowRight
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            transition: 'transform 0.3s ease',
                                            transform: isHoveringMain ? 'translateX(4px)' : 'translateX(0)',
                                        }}
                                    />
                                </button>
                                <p style={{
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    color: colors.gray400,
                                    marginTop: '0.625rem',
                                    marginBottom: 0,
                                    fontWeight: 500,
                                }}>No commitment • Cancel anytime</p>
                            </div>
                        </div>

                        {/* 2. OFFRE UNIQUE (SECONDAIRE) */}
                        <div
                            style={{
                                position: 'relative',
                                border: `2px dashed ${colors.gray200}`,
                                borderRadius: '1rem',
                                padding: '1rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                backgroundColor: colors.white,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(249,250,251,0.8)';
                                e.currentTarget.style.borderColor = colors.gray300;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.white;
                                e.currentTarget.style.borderColor = colors.gray200;
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{
                                        fontWeight: 700,
                                        color: colors.gray700,
                                        fontSize: '0.875rem',
                                        transition: 'color 0.3s ease',
                                    }}>Single Report</span>
                                    <span style={{
                                        fontSize: '10px',
                                        color: colors.gray400,
                                    }}>One-time payment</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}>
                                    <span style={{
                                        fontWeight: 700,
                                        color: colors.gray800,
                                        fontSize: '1.125rem',
                                        transition: 'transform 0.3s ease',
                                    }}>14.99€</span>
                                    <span style={{
                                        fontSize: '10px',
                                        color: colors.rose500,
                                        textDecoration: 'line-through',
                                        fontWeight: 500,
                                        opacity: 0.6,
                                    }}>29.90€</span>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                    backgroundColor: colors.rose50,
                                    padding: '0.375rem 0.625rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: colors.rose600,
                                    border: `1px solid rgba(255,228,230,0.5)`,
                                }}>
                                    <IconClock className="animate-pulse" style={{ width: '0.75rem', height: '0.75rem' }} />
                                    Ends in <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem' }}>{formatTime(timeLeft)}</span>
                                </div>
                                <button style={{
                                    backgroundColor: colors.white,
                                    border: `1px solid ${colors.gray200}`,
                                    color: colors.gray600,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.gray100;
                                        e.currentTarget.style.color = colors.gray800;
                                        e.currentTarget.style.borderColor = colors.gray300;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.white;
                                        e.currentTarget.style.color = colors.gray600;
                                        e.currentTarget.style.borderColor = colors.gray200;
                                    }}
                                >
                                    Select
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* FOOTER */}
                    <div style={{
                        backgroundColor: 'rgba(249,250,251,0.8)',
                        backdropFilter: 'blur(10px)',
                        padding: '1rem',
                        textAlign: 'center',
                        borderTop: `1px solid ${colors.gray100}`,
                        fontSize: '10px',
                        color: colors.gray400,
                        fontWeight: 500,
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.375rem',
                            marginBottom: '0.375rem',
                            color: 'rgba(22,163,74,0.8)',
                        }}>
                            <IconShield style={{ width: '0.75rem', height: '0.75rem' }} /> Secure SSL 256-bit Payment
                        </div>
                        <p style={{ margin: 0 }}>
                            Powered by <span style={{ fontWeight: 700, color: colors.gray600 }}>Stripe</span> & <span style={{ fontWeight: 700, color: colors.gray600 }}>React</span>
                        </p>
                    </div>

                </div>

                {/* Footer intentionally removed for locked checkout - CRO optimization */}
            </div>
        </>
    );
}

export default PaymentPage;
