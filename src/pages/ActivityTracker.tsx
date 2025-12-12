import { useState, useEffect, useRef, useCallback } from 'react';
import {
    ShieldCheck, Check, CheckCircle2, Lock, Mail,
    ArrowRight, Loader2, FileText, EyeOff, AlertTriangle,
    Users, Link, Camera, User
} from 'lucide-react';
import ServiceNavbar from '../components/ServiceNavbar';
import { Footer } from '../components/Footer';
import '../styles/activity-tracker.css';

// Log items (English)
const LOG_ITEMS = [
    { text: "Fetching 342 followings... 📥", icon: Users },
    { text: "Checking recent additions (7 days)... 📅", icon: FileText },
    { text: "Filtering brands and ads... 🏢", icon: ShieldCheck },
    { text: "Searching for private profiles... 🔒", icon: Lock },
    { text: "Scanning suspicious bio links (MYM/OF)... 🔗", icon: Link },
    { text: "Checking mutual friends... 🤝", icon: Users },
    { text: "Detecting suspicious behavior... 🚩", icon: AlertTriangle },
    { text: "Creating your final report... 📝", icon: FileText }
];

// Report text
const REPORT_TEXT = `📋 **SCAN RESULTS**

We scanned the entire following list of @alex_... and **3 profiles** stand out.

🚩 **1. Suspicious New Follow**
The account @emily_... was added 2 days ago. It's a private profile, 0 mutual friends.

🚩 **2. Hidden Link**
Detected a link to a paid platform (adult content)... [BLURRED]`;

// Profile list data
const PROFILES = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=60",
        status: 'safe',
        subtext: "Mutual Friend",
        badge: "OK",
        borderColor: ''
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=60",
        status: 'warning',
        subtext: "Instagram Model?",
        badge: "🤔",
        borderColor: 'border-l-4 border-orange-400'
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=60",
        status: 'danger',
        subtext: "Exclusive Link (OF?)",
        badge: "🚩",
        borderColor: 'border-l-4 border-red-500'
    }
];

// Page gradient - same as Hero dating style
const PAGE_GRADIENT = 'linear-gradient(135deg, #ff4b5c 0%, #ff6b6b 50%, #ff9e75 100%)';

export default function ActivityTracker() {
    // State (removed useService - using fixed page colors)

    // State
    const [progress, setProgress] = useState(0);
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<typeof LOG_ITEMS>([]);
    const [progressText, setProgressText] = useState("Analyzing profiles... 🧐");
    const [scanComplete, setScanComplete] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [gateTriggered, setGateTriggered] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: number; name: string; action: string }>>([]);

    // Refs
    const logListRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const toastIdRef = useRef(0);

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
            setProgressText("Scan Complete!");
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

    // Social proof toasts
    useEffect(() => {
        const timer1 = setTimeout(() => {
            addToast("Julie K.", "found a hidden account 😱");
        }, 1500);
        const timer2 = setTimeout(() => {
            addToast("Thomas", "scanned 250 followings");
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const addToast = (name: string, action: string) => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, name, action }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

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
            window.location.href = '/payment';
        }, 1000);
    };

    return (
        <div style={{ minHeight: '100vh', background: PAGE_GRADIENT }}>
            {/* ServiceNavbar with page colors */}
            <ServiceNavbar />

            {/* Main Content */}
            <div className="activity-tracker-wrapper">
                <div className="activity-card">

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
                                    filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3))',
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

                        {/* 1. Profile Monitor List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                                    Analyzing Followings... 👀
                                </h3>
                                <span style={{
                                    fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '4px 10px', borderRadius: '9999px',
                                    backgroundColor: scanComplete ? '#f0fdf4' : '#fdf2f8',
                                    color: scanComplete ? '#16a34a' : '#db2777'
                                }}>
                                    {scanComplete ? <><CheckCircle2 style={{ width: '12px', height: '12px' }} /> Done</> : <><Loader2 style={{ width: '12px', height: '12px', animation: 'spin 1s linear infinite' }} /> Scanning</>}
                                </span>
                            </div>

                            {/* Profile List Box */}
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', overflow: 'hidden', position: 'relative', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                {/* Scan line overlay */}
                                <div className="scan-list-overlay"></div>

                                {/* Profiles */}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {PROFILES.map((profile, index) => (
                                        <div
                                            key={profile.id}
                                            className={`scan-item ${profile.borderColor}`}
                                            style={{
                                                padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                borderBottom: index < PROFILES.length - 1 ? '1px solid #f9fafb' : 'none',
                                                backgroundColor: profile.status === 'warning' ? 'rgba(255,237,213,0.3)' : profile.status === 'danger' ? 'rgba(254,226,226,0.3)' : 'transparent',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                {/* Avatar with story ring for suspicious */}
                                                <div className={profile.status !== 'safe' ? 'story-ring' : ''} style={{ width: '40px', height: '40px', borderRadius: '50%', position: 'relative' }}>
                                                    <div style={{
                                                        width: '100%', height: '100%', borderRadius: '50%', border: '2px solid white', overflow: 'hidden', backgroundColor: '#e5e7eb'
                                                    }}>
                                                        <img src={profile.img} alt="" style={{
                                                            width: '100%', height: '100%', objectFit: 'cover',
                                                            opacity: profile.status === 'safe' ? 0.8 : 0.9,
                                                            filter: profile.status === 'safe' ? 'blur(1px)' : 'blur(2px)'
                                                        }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ height: '12px', width: profile.status === 'warning' ? '112px' : '96px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 2s infinite' }}></div>
                                                    <div style={{
                                                        fontSize: '10px', fontWeight: profile.status === 'safe' ? 400 : 700, display: 'flex', alignItems: 'center', gap: '4px',
                                                        color: profile.status === 'safe' ? '#9ca3af' : profile.status === 'warning' ? '#f97316' : '#ef4444'
                                                    }}>
                                                        {profile.status === 'safe' && <CheckCircle2 style={{ width: '10px', height: '10px', color: '#4ade80' }} />}
                                                        {profile.status === 'warning' && <Camera style={{ width: '10px', height: '10px' }} />}
                                                        {profile.status === 'danger' && <Link style={{ width: '10px', height: '10px' }} />}
                                                        {profile.subtext}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="pop-badge" style={{
                                                fontSize: profile.status === 'safe' ? '10px' : '15px',
                                                fontWeight: 700,
                                                color: '#9ca3af',
                                                backgroundColor: profile.status === 'safe' ? '#f3f4f6' : 'transparent',
                                                padding: profile.status === 'safe' ? '4px 8px' : '0',
                                                borderRadius: '8px',
                                                animationDelay: `${0.5 + index * 0.5}s`
                                            }}>{profile.badge}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Disclaimer */}
                                <div style={{ backgroundColor: '#f9fafb', padding: '8px 12px', textAlign: 'center', borderTop: '1px solid #f3f4f6' }}>
                                    <p style={{ fontSize: '9px', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: 0 }}>
                                        <Lock style={{ width: '10px', height: '10px', color: '#d1d5db' }} />
                                        Note: We cannot see photos from private accounts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Progress & Logs */}
                        <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
                                <span style={{ color: scanComplete ? '#db2777' : '#374151' }}>{progressText}</span>
                                <span style={{ color: '#db2777' }}>{Math.floor(progress)}%</span>
                            </div>

                            <div style={{ height: '12px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden', marginBottom: '12px' }}>
                                <div className="progress-bar-instagram" style={{ height: '100%', width: `${progress}%`, transition: 'all 0.3s ease-out' }}></div>
                            </div>

                            <div ref={logListRef} className="custom-scroll-activity" style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '80px', overflowY: 'auto', paddingRight: '8px' }}>
                                {visibleLogs.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div key={index} className="fade-in-up-activity" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#4b5563', flexShrink: 0, padding: '4px 0' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', flexShrink: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                                <IconComponent style={{ width: '10px', height: '10px' }} />
                                            </div>
                                            <span style={{ fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</span>
                                            <Check style={{ width: '12px', height: '12px', color: '#22c55e', marginLeft: 'auto', opacity: 0, animation: 'fadeIn 0.5s 0.2s forwards' }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Report & Gate */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '6px', borderRadius: '8px' }}>
                                        <FileText style={{ width: '12px', height: '12px' }} />
                                    </div>
                                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', margin: 0 }}>Scan Summary</h3>
                                </div>
                                <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', color: '#6b7280', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <EyeOff style={{ width: '12px', height: '12px' }} /> HIDDEN
                                </span>
                            </div>

                            {/* Report Box */}
                            <div style={{
                                backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden',
                                height: gateTriggered ? '320px' : '150px', transition: 'all 0.5s'
                            }}>
                                <div style={{ padding: '20px', fontSize: '14px', lineHeight: '1.75', color: '#4b5563', fontWeight: 500 }}>
                                    <div className={gateTriggered ? 'blur-content-activity' : ''} style={{ transition: 'all 0.5s' }}>
                                        <span className={isTyping && !gateTriggered ? 'typing-cursor-green' : ''} style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                                            {typedText}
                                        </span>
                                    </div>
                                </div>

                                {/* Gate Overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                                    zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px',
                                    opacity: gateTriggered ? 1 : 0, pointerEvents: gateTriggered ? 'auto' : 'none', transition: 'all 0.7s'
                                }}>
                                    <div className="fade-in-up-activity" style={{ width: '100%', textAlign: 'center' }}>
                                        <div style={{
                                            width: '56px', height: '56px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                                            color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #bbf7d0', outline: '4px solid white'
                                        }}>
                                            <Check style={{ width: '28px', height: '28px' }} />
                                        </div>

                                        <h4 style={{ fontWeight: 900, fontSize: '20px', color: '#111827', marginBottom: '4px' }}>It's Ready! 🎉</h4>
                                        <p style={{ fontSize: '12px', color: '#6b7280', maxWidth: '280px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                                            We found <span style={{ fontWeight: 700, color: '#16a34a', backgroundColor: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>3 suspicious profiles</span> added recently. Get the list now.
                                        </p>

                                        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ position: 'relative', textAlign: 'left' }}>
                                                <div style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                                    <Mail style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                                                </div>
                                                <input
                                                    ref={emailInputRef}
                                                    type="email"
                                                    required
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{
                                                        width: '100%', padding: '14px 16px 14px 40px', borderRadius: '12px', border: '1px solid #e5e7eb',
                                                        backgroundColor: '#f9fafb', fontSize: '14px', color: '#111827', fontWeight: 500,
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)', outline: 'none', transition: 'all 0.2s'
                                                    }}
                                                />
                                            </div>

                                            <button type="submit" disabled={isSubmitting} style={{
                                                width: '100%', backgroundColor: '#111827', color: 'white', fontWeight: 700, padding: '14px',
                                                borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex',
                                                justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', border: 'none',
                                                opacity: isSubmitting ? 0.8 : 1
                                            }}>
                                                {isSubmitting ? <><Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> Securing...</> : <><span>See the Names 🔓</span><ArrowRight style={{ width: '14px', height: '14px', opacity: 0.7 }} /></>}
                                            </button>
                                        </form>

                                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '10px', color: '#9ca3af', fontWeight: 500 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck style={{ width: '12px', height: '12px', color: '#22c55e' }} /> Secure</span>
                                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User style={{ width: '12px', height: '12px' }} /> Anonymous</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Text fade */}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, width: '100%', height: '64px',
                                    background: 'linear-gradient(to top, white, transparent)', pointerEvents: 'none',
                                    opacity: gateTriggered ? 0 : 1, transition: 'opacity 0.3s'
                                }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Toast Container */}
                    <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, padding: '0 16px', pointerEvents: 'none', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        {toasts.map(toast => (
                            <div key={toast.id} className="float-toast" style={{
                                backgroundColor: 'rgba(31,41,55,0.95)', color: 'white', padding: '10px 12px', borderRadius: '8px',
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px',
                                fontSize: '10px', backdropFilter: 'blur(12px)', border: '1px solid rgba(55,65,81,1)'
                            }}>
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#ec4899', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                                </div>
                                <div><span style={{ fontWeight: 700 }}>{toast.name}</span> {toast.action}</div>
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
