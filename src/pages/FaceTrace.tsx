import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Lock, ArrowRight, ShieldCheck,
    UserX, Quote, CheckCircle2, Loader2, Heart, Camera, Sparkles, Mail, Globe, List, Search
} from 'lucide-react';
import ServiceNavbar from '../components/ServiceNavbar';
import { Footer } from '../components/Footer';
import { useService } from '../lib/ServiceContext';
import '../styles/face-trace.css';

// ============================================
// DATA
// ============================================
const LOGS = [
    "Scanning social networks...",
    "Analyzing dating sites...",
    "Checking blogs...",
    "Biometric comparison...",
    "Extracting metadata...",
    "Compiling results..."
];

interface MockResult {
    id: number;
    source: string;
    sourceKey: 'tinder' | 'instagram' | 'bumble' | 'blog';
    type: string;
    confidence: number;
    img: string;
    snippet: string;
}

const MOCK_RESULTS: MockResult[] = [
    {
        id: 1,
        source: "Tinder",
        sourceKey: "tinder",
        type: "Dating",
        confidence: 99,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=20",
        snippet: "Active 2h ago. Bio: \"Loves travel ✈️...\""
    },
    {
        id: 2,
        source: "Instagram",
        sourceKey: "instagram",
        type: "Social",
        confidence: 95,
        img: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=100&q=20",
        snippet: "Public Account. 3 recent posts detected."
    },
    {
        id: 3,
        source: "Bumble",
        sourceKey: "bumble",
        type: "Dating",
        confidence: 92,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=20",
        snippet: "Verified photo. Location: Paris."
    },
    {
        id: 4,
        source: "Travel Blog",
        sourceKey: "blog",
        type: "Web",
        confidence: 88,
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=20",
        snippet: "Article found: \"My summer in Greece...\""
    }
];

const TOAST_MESSAGES = [
    { name: "Emma L.", action: "just unlocked her report" },
    { name: "Thomas K.", action: "found 8 matches" },
    { name: "Sarah M.", action: "discovered a hidden profile" }
];

// Source icons and colors
const getSourceStyle = (key: MockResult['sourceKey']) => {
    switch (key) {
        case 'tinder':
            return { Icon: Heart, color: '#ec4899', bgColor: '#fdf2f8' };
        case 'instagram':
            return { Icon: Camera, color: '#9333ea', bgColor: '#faf5ff' };
        case 'bumble':
            return { Icon: Sparkles, color: '#eab308', bgColor: '#fefce8' };
        case 'blog':
            return { Icon: Globe, color: '#3b82f6', bgColor: '#eff6ff' };
    }
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function FaceTrace() {
    const location = useLocation();
    const uploadedImage = (location.state as { image?: string })?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

    // Set service context for colors
    const { setSelectedService, colors } = useService();

    useEffect(() => {
        setSelectedService('facetrace');
    }, [setSelectedService]);

    // State
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("Analyzing databases...");
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [results, setResults] = useState<MockResult[]>([]);
    const [scanComplete, setScanComplete] = useState(false);
    const [showMatchBadge, setShowMatchBadge] = useState(false);
    const [showGate, setShowGate] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: number; name: string; action: string; exiting?: boolean }>>([]);

    // Refs
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const toastIdRef = useRef(0);
    const resultIndexRef = useRef(0);

    // Add toast
    const addToast = useCallback((name: string, action: string) => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, name, action }]);

        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        }, 3500);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    // Progress simulation
    useEffect(() => {
        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                const increment = Math.random() * 3 + 1;
                const newProgress = Math.min(prev + increment, 100);
                return newProgress;
            });
        }, 50);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    // Handle progress updates
    useEffect(() => {
        // Update logs
        const logThreshold = (currentLogIndex + 1) * (100 / LOGS.length) - 5;
        if (progress >= logThreshold && currentLogIndex < LOGS.length) {
            setProgressText(LOGS[currentLogIndex]);
            setCurrentLogIndex(prev => prev + 1);
        }

        // Add results progressively (starting at 20%)
        if (progress > 20 && resultIndexRef.current < MOCK_RESULTS.length) {
            const threshold = 20 + (resultIndexRef.current * 20);
            if (progress >= threshold) {
                const nextResult = MOCK_RESULTS[resultIndexRef.current];
                if (nextResult) {
                    setResults(prev => [...prev, nextResult]);
                }
                resultIndexRef.current++;
            }
        }

        // Complete
        if (progress >= 100 && !scanComplete) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            setScanComplete(true);
            setShowMatchBadge(true);

            setTimeout(() => {
                setShowGate(true);
                setTimeout(() => {
                    scrollContainerRef.current?.scrollTo({
                        top: scrollContainerRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 300);
            }, 500);
        }
    }, [progress, currentLogIndex, scanComplete]);

    // Schedule toasts
    useEffect(() => {
        const timers = [
            setTimeout(() => addToast(TOAST_MESSAGES[0].name, TOAST_MESSAGES[0].action), 1500),
            setTimeout(() => addToast(TOAST_MESSAGES[1].name, TOAST_MESSAGES[1].action), 4000),
            setTimeout(() => addToast(TOAST_MESSAGES[2].name, TOAST_MESSAGES[2].action), 7000)
        ];
        return () => timers.forEach(clearTimeout);
    }, [addToast]);

    // Form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            window.location.href = '/payment';
        }, 1000);
    };

    return (
        <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
            {/* ServiceNavbar - Same as Hero */}
            <ServiceNavbar />

            {/* Main Content */}
            <div className="face-trace-wrapper">
                <div className="face-trace-card">

                    {/* Header - Same style as Fidelity Test */}
                    <div style={{
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #fff7ed',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(12px)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 20,
                        flexShrink: 0
                    }}>
                        {/* Centered Logo at top - the scanner */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <img
                                src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/LOGO%20PROFILEFINDER%20HD%20REALIST.svg"
                                alt="ProfileFinder"
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    filter: 'drop-shadow(0 8px 16px rgba(249, 115, 22, 0.3))',
                                    animation: 'pulse 2s infinite'
                                }}
                            />
                            <h1 style={{
                                fontWeight: 800,
                                color: '#111827',
                                fontSize: '18px',
                                margin: '8px 0 0 0',
                                letterSpacing: '-0.02em'
                            }}>ProfileFinder AI</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#22c55e',
                                        animation: 'pulse 2s infinite'
                                    }}></span>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.05em' }}>Online & Ready</span>
                                </div>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>
                                    <ShieldCheck style={{ width: '12px', height: '12px', color: '#22c55e' }} />
                                    Private
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Area */}
                    <div ref={scrollContainerRef} className="custom-scroll-ft" style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f9fafb', position: 'relative' }}>

                        {/* 1. Active Scan Section */}
                        <div style={{ padding: '20px', backgroundColor: 'white', marginBottom: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{
                                position: 'relative', borderRadius: '16px', overflow: 'hidden',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6',
                                backgroundColor: '#111827', height: '192px', marginBottom: '16px'
                            }}>
                                {/* Uploaded Target Image */}
                                <img
                                    src={uploadedImage}
                                    alt="Target"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                                />

                                {/* Magnifying Glass Emoji Animation */}
                                <span className="magnifying-glass-ft">🔍</span>

                                {/* Face Box */}
                                <div className="face-box-glow-ft" style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    width: '96px', height: '96px', border: '2px solid rgba(249,115,22,0.8)', borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <div style={{ width: '80px', height: '80px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}></div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#374151' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: scanComplete ? '#16a34a' : '#374151' }}>
                                        {scanComplete ? (
                                            <><CheckCircle2 style={{ width: '16px', height: '16px', color: '#22c55e' }} />Scan complete!</>
                                        ) : (
                                            <><Loader2 className="spin-ft" style={{ width: '16px', height: '16px', color: '#f97316' }} />{progressText}</>
                                        )}
                                    </span>
                                    <span style={{ color: '#ea580c' }}>{Math.floor(progress)}%</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
                                    <div className="progress-bar-ft" style={{ height: '100%', width: `${progress}%`, transition: 'width 0.3s ease-out', borderRadius: '9999px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Results Feed */}
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                    <List style={{ width: '16px', height: '16px', color: '#f97316' }} /> Results
                                </h3>
                                {showMatchBadge && (
                                    <span style={{
                                        fontSize: '10px', backgroundColor: '#fef2f2', color: '#dc2626',
                                        padding: '4px 8px', borderRadius: '9999px', fontWeight: 700, animation: 'pulse 2s infinite'
                                    }}>
                                        14 MATCHES
                                    </span>
                                )}
                            </div>

                            {/* Loading State */}
                            {results.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '12px' }}>
                                    <Search style={{ width: '32px', height: '32px', margin: '0 auto 8px', opacity: 0.2 }} />
                                    <p style={{ margin: 0 }}>Searching...</p>
                                </div>
                            )}

                            {/* Results List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
                                {results.filter(Boolean).map((item, index) => (
                                    <ResultItem key={item.id} item={item} index={index} />
                                ))}
                            </div>

                            {/* 3. Gate Section */}
                            <div style={{
                                marginTop: '24px',
                                opacity: showGate ? 1 : 0,
                                transform: showGate ? 'translateY(0)' : 'translateY(16px)',
                                transition: 'all 1s ease'
                            }}>
                                {/* Separator */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px', opacity: 0.5 }}>
                                    <div style={{ height: '1px', backgroundColor: '#d1d5db', width: '48px' }}></div>
                                    <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase' }}>More results</span>
                                    <div style={{ height: '1px', backgroundColor: '#d1d5db', width: '48px' }}></div>
                                </div>

                                {/* Gate Box */}
                                <div style={{
                                    backgroundColor: 'white', borderRadius: '16px', padding: '24px',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid #fed7aa',
                                    position: 'relative', overflow: 'hidden'
                                }}>
                                    {/* Decoration */}
                                    <div style={{
                                        position: 'absolute', top: 0, right: 0, width: '96px', height: '96px',
                                        backgroundColor: '#fff7ed', borderBottomLeftRadius: '9999px',
                                        marginRight: '-40px', marginTop: '-40px', zIndex: 0
                                    }}></div>

                                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                                        <div style={{
                                            width: '48px', height: '48px', backgroundColor: '#fef2f2', color: '#ef4444',
                                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #fecaca'
                                        }}>
                                            <Lock style={{ width: '24px', height: '24px' }} />
                                        </div>

                                        <h4 style={{ fontWeight: 700, color: '#111827', fontSize: '18px', margin: '0 0 4px 0' }}>Unlock All 14 Links</h4>
                                        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px', lineHeight: 1.6, padding: '0 8px' }}>
                                            Source URLs (Tinder, Instagram, Blogs) are hidden for privacy reasons.
                                        </p>

                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{
                                                        width: '100%', paddingLeft: '44px', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px',
                                                        borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb',
                                                        fontSize: '14px', outline: 'none', fontWeight: 500, boxSizing: 'border-box'
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                style={{
                                                    width: '100%', backgroundColor: '#111827', color: 'white', fontWeight: 700,
                                                    padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center',
                                                    justifyContent: 'center', gap: '8px', fontSize: '14px', opacity: isSubmitting ? 0.8 : 1
                                                }}
                                            >
                                                {isSubmitting ? (
                                                    <><Loader2 className="spin-ft" style={{ width: '16px', height: '16px' }} />Verifying...</>
                                                ) : (
                                                    <>Access Full Report<ArrowRight style={{ width: '16px', height: '16px' }} /></>
                                                )}
                                            </button>
                                        </form>

                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontSize: '9px', color: '#9ca3af', fontWeight: 500 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <ShieldCheck style={{ width: '12px', height: '12px', color: '#22c55e' }} /> Secure Data
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <UserX style={{ width: '12px', height: '12px' }} /> 100% Anonymous
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fake blurred items */}
                                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.5, filter: 'blur(2px)', pointerEvents: 'none', userSelect: 'none' }}>
                                    <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '56px', height: '56px', backgroundColor: '#e5e7eb', borderRadius: '8px' }}></div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                                            <div style={{ height: '12px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '33%' }}></div>
                                            <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', width: '66%' }}></div>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '56px', height: '56px', backgroundColor: '#e5e7eb', borderRadius: '8px' }}></div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                                            <div style={{ height: '12px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '25%' }}></div>
                                            <div style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', width: '50%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Toast Container */}
                    <div style={{
                        position: 'absolute', bottom: '24px', left: 0, right: 0, padding: '0 16px',
                        pointerEvents: 'none', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                    }}>
                        {toasts.map(toast => (
                            <div
                                key={toast.id}
                                className={toast.exiting ? 'toast-exit-ft' : 'toast-enter-ft'}
                                style={{
                                    backgroundColor: 'rgba(17,24,39,0.95)', backdropFilter: 'blur(12px)',
                                    border: '1px solid #374151', color: 'white', padding: '10px 16px',
                                    borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                    display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
                                <span><strong>{toast.name}</strong> {toast.action}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

// ============================================
// RESULT ITEM COMPONENT
// ============================================
const ResultItem = ({ item, index }: { item: MockResult; index: number }) => {
    const style = getSourceStyle(item.sourceKey);
    const IconComponent = style.Icon;

    return (
        <div
            className="reveal-item-ft"
            style={{
                backgroundColor: 'white', padding: '12px', borderRadius: '12px',
                border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'flex', gap: '12px', position: 'relative', overflow: 'hidden',
                animationDelay: `${index * 0.1}s`
            }}
        >
            {/* Thumbnail */}
            <div style={{
                width: '56px', height: '56px', borderRadius: '8px', backgroundColor: '#f3f4f6',
                overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid #e5e7eb'
            }}>
                <img src={item.img} alt="" className="blur-img-ft" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                    position: 'absolute', bottom: 0, right: 0, backgroundColor: style.bgColor,
                    padding: '4px', borderTopLeftRadius: '6px'
                }}>
                    <IconComponent style={{ width: '10px', height: '10px', color: style.color }} />
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h4 style={{ fontWeight: 700, fontSize: '14px', color: '#111827', margin: 0 }}>{item.source}</h4>
                        <span style={{ fontSize: '9px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{item.type}</span>
                    </div>
                    <span style={{
                        fontSize: '10px', fontWeight: 700, color: '#16a34a', backgroundColor: '#f0fdf4',
                        padding: '2px 6px', borderRadius: '6px', border: '1px solid #bbf7d0'
                    }}>
                        {item.confidence}% Match
                    </span>
                </div>

                <div style={{
                    marginTop: '8px', fontSize: '10px', color: '#4b5563', backgroundColor: '#f9fafb',
                    padding: '6px', borderRadius: '4px', border: '1px solid #f3f4f6',
                    display: 'flex', alignItems: 'flex-start', gap: '6px'
                }}>
                    <Quote style={{ width: '8px', height: '8px', color: '#d1d5db', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.snippet}</span>
                </div>
            </div>
        </div>
    );
};
