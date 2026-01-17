"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Scan, Camera, Globe, AlertTriangle, Lock, Eye,
    Shield, Fingerprint, Database, CheckCircle2, Zap
} from 'lucide-react';

/**
 * FaceTraceResultsPreview - Blurred reverse image search results
 * PimEyes-style facial recognition matches preview
 */
export function FaceTraceResultsPreview() {
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanProgress(prev => prev < 100 ? prev + 2 : 0);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Simulated face match results
    const faceMatches = [
        { score: 98, source: 'Instagram', date: '2h ago', type: 'exact' },
        { score: 95, source: 'Facebook', date: '1d ago', type: 'exact' },
        { score: 89, source: 'LinkedIn', date: '3d ago', type: 'similar' },
        { score: 87, source: 'Twitter/X', date: '5d ago', type: 'similar' },
        { score: 82, source: 'Dating App', date: '1w ago', type: 'similar' },
        { score: 78, source: 'Unknown', date: '2w ago', type: 'partial' },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #ecfeff 0%, #f0f9ff 50%, #eff6ff 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1rem',
            marginBottom: '1rem'
        }}>
            {/* Scan Grid Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px),
                    linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                pointerEvents: 'none'
            }} />

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    color: 'white',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(6,182,212,0.4)'
                }}>
                    <Scan style={{ width: '1rem', height: '1rem' }} />
                    <span>Biometric Scan Complete</span>
                </div>
                <div style={{
                    background: '#fff',
                    padding: '0.375rem 0.625rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#0891b2',
                    border: '1px solid #cffafe',
                    boxShadow: '0 2px 8px rgba(6,182,212,0.15)'
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '0.375rem',
                        height: '0.375rem',
                        background: '#22c55e',
                        borderRadius: '50%',
                        marginRight: '0.375rem',
                        animation: 'pulse 2s infinite'
                    }} />
                    12M+ Sources Scanned
                </div>
            </div>

            {/* Main Content: Source Image + Results Grid */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                {/* Source Image (User's uploaded photo) */}
                <div style={{
                    width: '5rem',
                    height: '6rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '3px solid #06b6d4',
                    boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
                    flexShrink: 0
                }}>
                    {/* Abstract silhouette */}
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '45%',
                        height: '40%',
                        background: '#94a3b8',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '70%',
                        height: '45%',
                        background: '#94a3b8',
                        borderRadius: '50% 50% 0 0'
                    }} />
                    {/* Scan Line Animation */}
                    <motion.div
                        animate={{ y: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                            boxShadow: '0 0 10px #06b6d4'
                        }}
                    />
                    {/* Source Label */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(6,182,212,0.9)',
                        color: 'white',
                        fontSize: '0.5rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        padding: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Source
                    </div>
                </div>

                {/* Results Grid */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.375rem',
                    filter: 'blur(6px)',
                    pointerEvents: 'none'
                }}>
                    {faceMatches.map((match, idx) => (
                        <div
                            key={idx}
                            style={{
                                aspectRatio: '4/5',
                                borderRadius: '0.5rem',
                                background: `linear-gradient(180deg, 
                                    ${idx % 2 === 0 ? '#d1d5db' : '#e5e7eb'} 0%, 
                                    ${idx % 2 === 0 ? '#9ca3af' : '#d1d5db'} 100%)`,
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* Silhouette */}
                            <div style={{
                                position: 'absolute',
                                top: '15%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '50%',
                                height: '35%',
                                background: '#6b7280',
                                borderRadius: '50%'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '48%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '65%',
                                height: '40%',
                                background: '#6b7280',
                                borderRadius: '50% 50% 0 0'
                            }} />

                            {/* Score Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '0.25rem',
                                right: '0.25rem',
                                background: match.score >= 90 ? '#22c55e' : match.score >= 80 ? '#eab308' : '#f97316',
                                color: 'white',
                                fontSize: '0.5rem',
                                fontWeight: 800,
                                padding: '0.125rem 0.25rem',
                                borderRadius: '0.25rem'
                            }}>
                                {match.score}%
                            </div>

                            {/* Source Info */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '0.25rem',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                color: 'white'
                            }}>
                                <div style={{ fontSize: '0.4375rem', fontWeight: 600 }}>{match.source}</div>
                                <div style={{ fontSize: '0.375rem', opacity: 0.7 }}>{match.date}</div>
                            </div>

                            {/* Type Badge */}
                            {match.type === 'exact' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0.25rem',
                                    left: '0.25rem',
                                    background: '#dc2626',
                                    color: 'white',
                                    fontSize: '0.375rem',
                                    fontWeight: 700,
                                    padding: '0.125rem 0.25rem',
                                    borderRadius: '0.25rem',
                                    textTransform: 'uppercase'
                                }}>
                                    Match
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '0.75rem',
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(6,182,212,0.2)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0891b2' }}>3</div>
                    <div style={{ fontSize: '0.5rem', color: '#64748b', fontWeight: 500 }}>Exact Matches</div>
                </div>
                <div style={{ width: '1px', background: '#e2e8f0' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0891b2' }}>12</div>
                    <div style={{ fontSize: '0.5rem', color: '#64748b', fontWeight: 500 }}>Similar Faces</div>
                </div>
                <div style={{ width: '1px', background: '#e2e8f0' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f97316' }}>!</div>
                    <div style={{ fontSize: '0.5rem', color: '#64748b', fontWeight: 500 }}>Dark Web</div>
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
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)'
            }}>
                <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    boxShadow: '0 8px 32px rgba(6,182,212,0.25)',
                    marginBottom: '0.75rem'
                }}>
                    <Lock style={{ width: '1.75rem', height: '1.75rem', color: '#0891b2' }} />
                </div>
                <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.9)',
                    maxWidth: '200px',
                    lineHeight: 1.4
                }}>
                    3 identical profiles & 12 similar detected.
                    <br />
                    <span style={{ color: '#0891b2' }}>Unlock to see URLs.</span>
                </p>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

/**
 * FaceTraceLoadingScreen - Biometric scan animation before payment
 */
export function FaceTraceLoadingScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const scanSteps = [
        { text: "Encoding facial features...", icon: Fingerprint },
        { text: "Analyzing 12 million sources...", icon: Database },
        { text: "Scanning social networks...", icon: Globe },
        { text: "Checking Dark Web databases...", icon: AlertTriangle },
        { text: "Matches found!", icon: CheckCircle2 },
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 0.5;
            });
        }, 50);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <div className="w-full max-w-sm mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden p-6"
            >
                {/* Biometric Scanner Icon */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <Scan className="w-12 h-12 text-white" />
                        </div>
                        {/* Radar Pulse */}
                        <motion.div
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.6, 0, 0.6]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl -z-10"
                        />
                        {/* Corner Brackets */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400" />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400" />
                    </motion.div>
                </div>

                {/* Scan Steps */}
                <div className="space-y-3 mb-4">
                    {scanSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = index <= currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.3, x: -10 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.3,
                                    x: isActive ? 0 : -10
                                }}
                                transition={{ delay: index * 0.3 }}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isCurrent
                                        ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200'
                                        : isActive
                                            ? 'bg-gray-50 border border-gray-100'
                                            : 'bg-gray-50/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <StepIcon className={`w-4 h-4 ${isCurrent ? 'text-cyan-500' : isActive ? 'text-green-500' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step.text}
                                    </span>
                                </div>
                                {isActive && index < currentStep && (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                )}
                                {isCurrent && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-3">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-cyan-500" />
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-medium"
                    >
                        {Math.round(progress)}% - Biometric scan in progress...
                    </motion.span>
                </div>
            </motion.div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </div>
    );
}

export default FaceTraceResultsPreview;
