import { useState, useEffect, useRef, useCallback } from 'react';
import {
    ShieldCheck, Sparkles, Check, Ghost, Lock, Mail,
    ArrowRight, Loader2, FileText, EyeOff, AlertTriangle,
    Smartphone, Heart, Trash2, Moon, Users, Calculator, Pencil
} from 'lucide-react';
import ServiceNavbar from '../components/ServiceNavbar';
import { Footer } from '../components/Footer';
import '../styles/fidelity-analysis.css';

// Log items with lucide icons
const LOG_ITEMS = [
    { text: "Reading chat screenshots... 📱", icon: Smartphone },
    { text: "Looking for flirting patterns... 💘", icon: Heart },
    { text: "Checking for deleted messages... 🗑️", icon: Trash2 },
    { text: "Detecting late night activity... 🌙", icon: Moon },
    { text: "Analyzing 'Just a friend' behavior... 🚩", icon: Users },
    { text: "Calculating Loyalty Score... 🔮", icon: Calculator },
    { text: "Creating Final Report... 📝", icon: Pencil }
];

// Report text content
const REPORT_TEXT = `👀 **ANALYSIS RESULT**

We analyzed the conversation and found **3 suspicious signs** that usually indicate cheating.

🚩 **1. Late Night Activity**
Messages sent at 11:42 PM often mean they are hiding something.

🚩 **2. Defensive Language**
Saying "Don't worry about it" is a common way to avoid the truth.

... [BLURRED]`;

// Page colors (orange gradient)
const PAGE_COLORS = {
    primary: '#ff4e71',
    secondary: '#ffb347'
};

export default function FidelityTestAnalysis() {
    // State (removed useService - using fixed page colors)

    // State
    const [progress, setProgress] = useState(0);
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<typeof LOG_ITEMS>([]);
    const [progressText, setProgressText] = useState("Starting Scan... 🚀");
    const [scanComplete, setScanComplete] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [gateTriggered, setGateTriggered] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [thumbnails, setThumbnails] = useState<string[]>([]); // NO FALLBACK - only show uploaded images

    // Refs
    const logListRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load thumbnails from sessionStorage
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
            console.warn('Failed to load thumbnails from sessionStorage');
        }
    }, []);

    // Simulate loading progress
    useEffect(() => {
        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.min(prev + (Math.random() * 4 + 1), 100);
                return newProgress;
            });
        }, 60);

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    // Handle progress updates and logs
    useEffect(() => {
        if (progress >= 100 && !scanComplete) {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            setScanComplete(true);
            setProgressText("Report Ready!");
            setTimeout(() => setIsTyping(true), 500);
        }

        // Add logs based on progress thresholds
        const threshold = (currentLogIndex + 1) * (100 / LOG_ITEMS.length) - 5;
        if (progress >= threshold && currentLogIndex < LOG_ITEMS.length) {
            setVisibleLogs(prev => [...prev, LOG_ITEMS[currentLogIndex]]);
            setProgressText(LOG_ITEMS[currentLogIndex].text);
            setCurrentLogIndex(prev => prev + 1);
        }
    }, [progress, currentLogIndex, scanComplete]);

    // Auto-scroll logs
    useEffect(() => {
        if (logListRef.current) {
            logListRef.current.scrollTo({ top: logListRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [visibleLogs]);

    // Typing effect
    const triggerGate = useCallback(() => {
        if (gateTriggered) return;
        setGateTriggered(true);
        setTimeout(() => {
            emailInputRef.current?.focus();
        }, 500);
    }, [gateTriggered]);

    useEffect(() => {
        if (!isTyping) return;

        let charIndex = 0;
        const typeNextChar = () => {
            if (charIndex < REPORT_TEXT.length) {
                setTypedText(REPORT_TEXT.slice(0, charIndex + 1));
                charIndex++;

                // Trigger gate at 65%
                if (charIndex === Math.floor(REPORT_TEXT.length * 0.65)) {
                    triggerGate();
                }

                typingTimeoutRef.current = setTimeout(typeNextChar, 15);
            } else {
                triggerGate();
            }
        };

        typeNextChar();

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [isTyping, triggerGate]);

    // Handle email submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            window.location.href = 'https://profilefinder-wheat.vercel.app/';
        }, 1000);
    };


    return (
        <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${PAGE_COLORS.primary} 0%, ${PAGE_COLORS.secondary} 100%)` }}>
            {/* ServiceNavbar with page colors */}
            <ServiceNavbar />

            {/* Main Content with Gradient Background */}
            <div className="fidelity-analysis-wrapper">
                {/* Main Card */}
                <div className="fidelity-card">

                    {/* Header */}
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
                        zIndex: 20
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

                    {/* Content */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: 'white' }}>

                        {/* 1. Thumbnails */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <h3 style={{
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    color: '#9ca3af',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    margin: 0
                                }}>Scanning Images 📸</h3>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    borderRadius: '9999px',
                                    backgroundColor: scanComplete ? '#f0fdf4' : '#fff7ed',
                                    color: scanComplete ? '#16a34a' : '#ea580c'
                                }}>
                                    {scanComplete ? (
                                        <><Check style={{ width: '12px', height: '12px' }} /> Done</>
                                    ) : (
                                        <><Sparkles style={{ width: '12px', height: '12px', animation: 'spin 1s linear infinite' }} /> Analyzing...</>
                                    )}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {thumbnails.map((src, index) => (
                                    <div key={index} className="fidelity-thumbnail">
                                        <img src={src} alt={`Photo ${index + 1}`} />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(249, 115, 22, 0.1)',
                                            mixBlendMode: 'overlay'
                                        }}></div>
                                        <div className="scan-line" style={{ animationDelay: `${index * 0.8}s` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Logs */}
                        <div className="fidelity-progress-container">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#374151',
                                marginBottom: '12px'
                            }}>
                                <span style={{ color: scanComplete ? '#16a34a' : '#374151' }}>{progressText}</span>
                                <span style={{ color: '#ea580c' }}>{Math.floor(progress)}%</span>
                            </div>

                            <div className="fidelity-progress-bar">
                                <div
                                    className="fidelity-progress-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            {/* Scrollable Logs Area */}
                            <div
                                ref={logListRef}
                                className="custom-scroll"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    height: '90px',
                                    overflowY: 'auto',
                                    paddingRight: '8px'
                                }}
                            >
                                {visibleLogs.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="fade-in-up"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                fontSize: '12px',
                                                color: '#4b5563',
                                                flexShrink: 0,
                                                padding: '4px 0'
                                            }}
                                        >
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                backgroundColor: 'white',
                                                border: '1px solid #fed7aa',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fb923c',
                                                flexShrink: 0,
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                            }}>
                                                <IconComponent style={{ width: '12px', height: '12px' }} />
                                            </div>
                                            <span style={{ fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</span>
                                            <Check style={{
                                                width: '12px',
                                                height: '12px',
                                                color: '#22c55e',
                                                marginLeft: 'auto',
                                                opacity: 0,
                                                animation: 'fadeIn 0.5s 0.2s forwards'
                                            }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Report & Gate */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        backgroundColor: '#fef2f2',
                                        color: '#ef4444',
                                        padding: '6px',
                                        borderRadius: '8px'
                                    }}>
                                        <FileText style={{ width: '12px', height: '12px' }} />
                                    </div>
                                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1f2937', margin: 0 }}>Your Report</h3>
                                </div>
                                <span style={{
                                    fontSize: '10px',
                                    backgroundColor: '#f3f4f6',
                                    color: '#6b7280',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    border: '1px solid #e5e7eb',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <EyeOff style={{ width: '12px', height: '12px' }} /> HIDDEN
                                </span>
                            </div>

                            {/* Report Box */}
                            <div
                                className="fidelity-report-box"
                                style={{ height: gateTriggered ? '340px' : '150px' }}
                            >
                                {/* Text Area */}
                                <div style={{ padding: '20px', fontSize: '14px', lineHeight: '1.75', color: '#4b5563', fontWeight: 500 }}>
                                    <div className={gateTriggered ? 'blur-content' : ''} style={{ transition: 'all 0.5s' }}>
                                        <span
                                            className={isTyping && !gateTriggered ? 'typing-cursor' : ''}
                                            style={{ display: 'block', whiteSpace: 'pre-wrap' }}
                                        >
                                            {typedText}
                                        </span>
                                    </div>
                                </div>

                                {/* INLINE GATE (The Overlay) */}
                                <div className={`fidelity-gate-overlay ${gateTriggered ? 'visible' : 'hidden'}`}>
                                    <div className="fade-in-up" style={{ width: '100%', textAlign: 'center' }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            backgroundColor: '#fef2f2',
                                            color: '#ef4444',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '12px',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            margin: '0 auto 12px',
                                            border: '1px solid #fecaca',
                                            outline: '4px solid white'
                                        }}>
                                            <AlertTriangle style={{ width: '28px', height: '28px' }} />
                                        </div>

                                        <h4 style={{ fontWeight: 900, fontSize: '20px', color: '#111827', marginBottom: '4px' }}>Result Ready! 🫣</h4>
                                        <p style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                            marginBottom: '20px',
                                            maxWidth: '280px',
                                            margin: '0 auto 20px',
                                            lineHeight: '1.6'
                                        }}>
                                            We found <span style={{
                                                fontWeight: 700,
                                                color: '#dc2626',
                                                backgroundColor: '#fef2f2',
                                                padding: '2px 6px',
                                                borderRadius: '4px'
                                            }}>3 Red Flags 🚩</span> in this chat. <br />Enter your email to see what they are hiding.
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ position: 'relative', textAlign: 'left' }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '14px',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none'
                                                }}>
                                                    <Mail style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                                                </div>
                                                <input
                                                    ref={emailInputRef}
                                                    type="email"
                                                    required
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="fidelity-email-input"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="fidelity-submit-btn"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                                                        Securing Data...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>See the Truth 🔓</span>
                                                        <ArrowRight style={{ width: '16px', height: '16px', opacity: 0.7 }} />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Trust Badges */}
                                        <div style={{
                                            marginTop: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '16px',
                                            fontSize: '10px',
                                            color: '#9ca3af',
                                            fontWeight: 500,
                                            opacity: 0.8
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Lock style={{ width: '12px', height: '12px', color: '#22c55e' }} /> Secure
                                            </span>
                                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Ghost style={{ width: '12px', height: '12px' }} /> 100% Anonymous
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Gradient Fade (Visible while typing) */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '64px',
                                    background: 'linear-gradient(to top, white, transparent)',
                                    pointerEvents: 'none',
                                    opacity: gateTriggered ? 0 : 1,
                                    transition: 'opacity 0.3s'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
