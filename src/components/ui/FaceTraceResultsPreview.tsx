import React from 'react';
import { Search, Globe, Lock, CheckCircle } from 'lucide-react';

/**
 * FaceTraceResultsPreview - Blurred face search results for payment teaser
 * Shows faces found across different social platforms
 */
export function FaceTraceResultsPreview() {
    const platforms = [
        { name: 'Instagram', color: '#E4405F', icon: '📸', matches: 3 },
        { name: 'LinkedIn', color: '#0A66C2', icon: '💼', matches: 1 },
        { name: 'Facebook', color: '#1877F2', icon: '👤', matches: 2 },
        { name: 'Twitter', color: '#1DA1F2', icon: '🐦', matches: 1 },
    ];

    const faceResults = [
        { platform: 'Instagram', confidence: 94 },
        { platform: 'LinkedIn', confidence: 87 },
        { platform: 'Facebook', confidence: 91 },
        { platform: 'Instagram', confidence: 82 },
        { platform: 'Twitter', confidence: 78 },
        { platform: 'Facebook', confidence: 89 },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
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
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.3)'
                }}>
                    <Search style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Face Detected</span>
                </div>
                <div style={{
                    background: '#fff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#3b82f6',
                    border: '1px solid #dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    <Globe style={{ width: '0.625rem', height: '0.625rem' }} />
                    8 Platforms Scanned
                </div>
            </div>

            {/* Platform Summary */}
            <div style={{
                display: 'flex',
                gap: '0.375rem',
                marginBottom: '0.75rem',
                flexWrap: 'wrap'
            }}>
                {platforms.map((p, idx) => (
                    <div key={idx} style={{
                        background: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        border: `1px solid ${p.color}20`
                    }}>
                        <span>{p.icon}</span>
                        <span style={{ color: '#374151' }}>{p.matches}</span>
                    </div>
                ))}
            </div>

            {/* Face Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                filter: 'blur(10px)',
                pointerEvents: 'none'
            }}>
                {faceResults.map((result, idx) => (
                    <div
                        key={idx}
                        style={{
                            aspectRatio: '1',
                            borderRadius: '0.75rem',
                            background: '#e5e7eb',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Abstract face silhouette */}
                        <div style={{
                            position: 'absolute',
                            top: '15%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '55%',
                            height: '55%',
                            background: '#9ca3af',
                            borderRadius: '50%'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            top: '65%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '70%',
                            height: '35%',
                            background: '#9ca3af',
                            borderRadius: '40% 40% 0 0'
                        }}></div>

                        {/* Confidence badge */}
                        <div style={{
                            position: 'absolute',
                            bottom: '0.25rem',
                            right: '0.25rem',
                            background: result.confidence > 85 ? '#22c55e' : '#f59e0b',
                            color: 'white',
                            padding: '0.125rem 0.375rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.5rem',
                            fontWeight: 700
                        }}>
                            {result.confidence}%
                        </div>

                        {/* Platform indicator */}
                        <div style={{
                            position: 'absolute',
                            top: '0.25rem',
                            left: '0.25rem',
                            background: 'white',
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.5rem',
                            fontWeight: 600,
                            color: '#3b82f6'
                        }}>
                            {result.platform.slice(0, 2).toUpperCase()}
                        </div>
                    </div>
                ))}
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
                    <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
                </div>
                <p style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#374151',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                }}>
                    Unlock to see all matches
                </p>
            </div>
        </div>
    );
}

export default FaceTraceResultsPreview;
