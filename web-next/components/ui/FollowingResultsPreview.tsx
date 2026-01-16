"use client";
import React from 'react';
import { Eye, Bell, Lock, Users, AlertCircle, Activity } from 'lucide-react';

/**
 * FollowingResultsPreview - Instagram monitoring preview for payment teaser
 * Shows account activity with hidden subscriptions detected
 */
export function FollowingResultsPreview() {
    const stats = {
        followers: '1,247',
        following: '892',
        posts: '156',
    };

    const alerts = [
        { type: 'New suspicious follow', time: '2h ago' },
        { type: 'Private account interaction', time: '5h ago' },
        { type: 'Hidden subscription detected', time: '1d ago' },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(139,92,246,0.3)'
                }}>
                    <Eye style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Monitoring Active</span>
                </div>
                <div style={{
                    background: '#fff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#8b5cf6',
                    border: '1px solid #e9d5ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    <Activity style={{ width: '0.625rem', height: '0.625rem' }} />
                    Live Tracking
                </div>
            </div>

            {/* Account Preview */}
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '0.75rem',
                filter: 'blur(5px)',
                pointerEvents: 'none'
            }}>
                {/* Profile Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                }}>
                    {/* Abstract avatar */}
                    <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                        border: '2px solid #8b5cf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '50%',
                            background: '#9ca3af'
                        }}></div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1f2937' }}>
                            @username_hidden
                        </div>
                        <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                            Account under surveillance
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '0.5rem 0',
                    borderTop: '1px solid #f3f4f6',
                    borderBottom: '1px solid #f3f4f6'
                }}>
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1f2937' }}>
                                {value}
                            </div>
                            <div style={{ fontSize: '0.5rem', color: '#6b7280', textTransform: 'capitalize' }}>
                                {key}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alerts Section */}
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                filter: 'blur(4px)',
                pointerEvents: 'none'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    marginBottom: '0.5rem'
                }}>
                    <Bell style={{ width: '0.75rem', height: '0.75rem', color: '#8b5cf6' }} />
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#374151' }}>
                        Recent Alerts
                    </span>
                    <span style={{
                        background: '#fef2f2',
                        color: '#dc2626',
                        fontSize: '0.5rem',
                        fontWeight: 700,
                        padding: '0.125rem 0.375rem',
                        borderRadius: '9999px'
                    }}>
                        3 new
                    </span>
                </div>

                {alerts.map((alert, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.375rem 0',
                        borderBottom: idx < alerts.length - 1 ? '1px solid #f3f4f6' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <AlertCircle style={{
                                width: '0.625rem',
                                height: '0.625rem',
                                color: alert.type.includes('Hidden') ? '#dc2626' : '#f59e0b'
                            }} />
                            <span style={{ fontSize: '0.625rem', color: '#374151' }}>{alert.type}</span>
                        </div>
                        <span style={{ fontSize: '0.5rem', color: '#9ca3af' }}>{alert.time}</span>
                    </div>
                ))}

                {/* Hidden subscriptions warning */}
                <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: '#fef2f2',
                    borderRadius: '0.5rem',
                    border: '1px solid #fecaca'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: '#dc2626'
                    }}>
                        <Users style={{ width: '0.625rem', height: '0.625rem' }} />
                        Premium Content Subscriptions Found
                    </div>
                    <div style={{ fontSize: '0.5rem', color: '#6b7280', marginTop: '0.125rem' }}>
                        2 paid content platforms detected
                    </div>
                </div>
            </div>

            {/* Lock Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(1px)'
            }}>
                <div style={{
                    background: 'white',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    marginBottom: '0.5rem'
                }}>
                    <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} />
                </div>
                <p style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#374151',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                }}>
                    Unlock full activity log
                </p>
            </div>
        </div>
    );
}

/**
 * InstagramLoadingScreen - Social graph analysis animation
 */
export function InstagramLoadingScreen() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const analysisSteps = [
        { text: "Connecting to Instagram API...", icon: "🔗" },
        { text: "Mapping social graph...", icon: "🕸️" },
        { text: "Analyzing follower patterns...", icon: "👥" },
        { text: "Detecting hidden interactions...", icon: "🔍" },
        { text: "Compiling activity report...", icon: "📊" },
    ];

    React.useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => prev >= 100 ? 100 : prev + 0.5);
        }, 50);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <div style={{
            width: '100%',
            maxWidth: '24rem',
            margin: '0 auto',
            padding: '1.5rem',
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        }}>
            {/* Social Graph Animation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem',
            }}>
                <div style={{
                    position: 'relative',
                    width: '6rem',
                    height: '6rem',
                }}>
                    {/* Center node */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(139,92,246,0.4)',
                        animation: 'pulse 2s infinite',
                    }}>
                        <svg style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    </div>

                    {/* Orbiting nodes */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '1rem',
                                height: '1rem',
                                background: i % 2 === 0 ? '#ddd6fe' : '#c4b5fd',
                                borderRadius: '50%',
                                transform: `rotate(${i * 60}deg) translateX(2.5rem) translateY(-50%)`,
                                animation: `orbit 4s linear infinite`,
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    ))}

                    {/* Connecting lines */}
                    <svg style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.3,
                    }}>
                        {[0, 1, 2, 3, 4, 5].map((i) => {
                            const angle = (i * 60 * Math.PI) / 180;
                            const x = 48 + Math.cos(angle) * 40;
                            const y = 48 + Math.sin(angle) * 40;
                            return (
                                <line
                                    key={i}
                                    x1="48"
                                    y1="48"
                                    x2={x}
                                    y2={y}
                                    stroke="#8b5cf6"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Analysis Steps */}
            <div style={{ marginBottom: '1rem' }}>
                {analysisSteps.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                borderRadius: '0.75rem',
                                background: isCurrent
                                    ? 'linear-gradient(to right, #f3e8ff, #faf5ff)'
                                    : isActive
                                        ? '#f9fafb'
                                        : '#f9fafb80',
                                border: isCurrent ? '1px solid #c4b5fd' : '1px solid transparent',
                                opacity: isActive ? 1 : 0.4,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1rem' }}>{step.icon}</span>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#1f2937' : '#9ca3af',
                                }}>
                                    {step.text}
                                </span>
                            </div>
                            {isActive && index < currentStep && (
                                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                            {isCurrent && (
                                <div style={{
                                    width: '1.25rem',
                                    height: '1.25rem',
                                    border: '2px solid #8b5cf6',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Progress Bar */}
            <div style={{
                background: '#f3f4f6',
                borderRadius: '9999px',
                height: '0.75rem',
                overflow: 'hidden',
                marginBottom: '0.75rem',
            }}>
                <div style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #8b5cf6, #a78bfa)',
                    width: `${progress}%`,
                    transition: 'width 0.1s ease',
                }} />
            </div>

            {/* Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
            }}>
                <span style={{ animation: 'pulse 2s infinite' }}>👀</span>
                <span style={{ fontWeight: 500 }}>Analyzing social connections...</span>
            </div>

            <style>{`
                @keyframes orbit {
                    from { transform: rotate(0deg) translateX(2.5rem) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(2.5rem) rotate(-360deg); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

export default FollowingResultsPreview;
