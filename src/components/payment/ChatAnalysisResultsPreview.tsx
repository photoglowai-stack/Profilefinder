// Chat Analysis / Fidelity Results Preview Component

// Icône MessageCircle
const IconMessageCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

// Icône AlertTriangle
const IconAlertTriangle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

// Icône Lock
const IconLock = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

// Icône ChevronRight
const IconChevronRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// Images simulant des screenshots de conversations (Vertical ratio)
const CHAT_SCREENSHOTS = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=500&fit=crop", // SCREENSHOT UPLOADÉ
    "https://images.unsplash.com/photo-1534679541033-b9df7c31e21d?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1530543787849-128d94430c6b?w=300&h=500&fit=crop",
];

export function ChatAnalysisResultsPreview() {
    const uploadedScreenshot = CHAT_SCREENSHOTS[0];
    const evidenceScreenshots = CHAT_SCREENSHOTS.slice(1);

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(to bottom right, #fff5f5, #fff0f5)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0.75rem',
            border: '1px solid #fce7f3',
            marginBottom: '1.5rem',
        }}>
            {/* Header Widget */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(to bottom right, #ff4e71, #ff7f66)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 6px -1px rgba(255, 78, 113, 0.2)',
                }}>
                    <IconMessageCircle className="w-3.5 h-3.5" />
                    <span>Analysis Complete</span>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#ff4e71',
                    border: '1px solid #ffe4e9',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                    <IconAlertTriangle className="w-3 h-3 mr-1 text-orange-500" />
                    Risks Detected
                </div>
            </div>

            {/* HORIZONTAL SCROLL LINE */}
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '0.75rem',
                paddingBottom: '0.5rem',
                margin: '0 -0.5rem',
                padding: '0 0.5rem 0.5rem 0.5rem',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                alignItems: 'stretch',
            }}>

                {/* 1. UPLOADED SCREENSHOT (Clear / Analyzed) */}
                <div style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '7rem',
                    height: '12rem',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    border: '2px solid #fecaca',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    scrollSnapAlign: 'start',
                }}>
                    <img
                        src={uploadedScreenshot}
                        alt="Your Upload"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.9,
                        }}
                    />

                    {/* Analysis Overlay on the clear image */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent, transparent 60%, rgba(127, 29, 29, 0.5))',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            fontSize: '0.5rem',
                            fontWeight: 700,
                            padding: '0.125rem 0.375rem',
                            borderRadius: '9999px',
                            animation: 'pulse 2s infinite',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        }}>
                            FLAGGED
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            left: '0.5rem',
                            right: '0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(4px)',
                            padding: '0.375rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #fecaca',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '0.125rem',
                            }}>
                                <span style={{ fontSize: '0.4375rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Risk Score</span>
                                <span style={{ fontSize: '0.5rem', fontWeight: 900, color: '#dc2626' }}>85%</span>
                            </div>
                            <div style={{
                                height: '0.25rem',
                                width: '100%',
                                backgroundColor: '#e5e7eb',
                                borderRadius: '9999px',
                                overflow: 'hidden',
                            }}>
                                <div style={{ height: '100%', backgroundColor: '#ef4444', width: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. EVIDENCE SCREENSHOTS (Blurred) */}
                {evidenceScreenshots.map((src, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'relative',
                            flexShrink: 0,
                            width: '7rem',
                            height: '12rem',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                            backgroundColor: '#e5e7eb',
                            border: '1px solid white',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            scrollSnapAlign: 'start',
                        }}
                    >
                        {/* Image Floue (Scale pour cacher les bords) */}
                        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            <img
                                src={src}
                                alt={`Evidence ${idx}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'blur(5px)',
                                    transform: 'scale(1.1)',
                                    opacity: 0.8,
                                }}
                            />
                        </div>

                        {/* Locked Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(4px)',
                                padding: '0.375rem',
                                borderRadius: '9999px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                marginBottom: '0.25rem',
                            }}>
                                <IconLock className="w-3.5 h-3.5 text-gray-700" />
                            </div>
                            <span style={{
                                fontSize: '0.5rem',
                                fontWeight: 700,
                                color: '#1f2937',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                padding: '0.125rem 0.375rem',
                                borderRadius: '0.375rem',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid rgba(255,255,255,0.5)',
                            }}>
                                Hidden Evidence
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <p style={{
                textAlign: 'center',
                fontSize: '0.625rem',
                color: '#9ca3af',
                marginTop: '0.75rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
            }}>
                <IconChevronRight className="w-3 h-3" /> Scroll to view related screenshots
            </p>
        </div>
    );
}

export default ChatAnalysisResultsPreview;
