"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Heart, MapPin, Lock, AlertTriangle, Clock, Eye,
    Radar, Wifi, CheckCircle2, Zap, Flame, User,
    Navigation, Activity, Shield
} from 'lucide-react';

/**
 * FidelityCheckResultsPreview - CheaterBuster-style dating profile detection
 * Shows Tinder/Bumble profile cards with alarming activity metrics
 */
export function FidelityCheckResultsPreview() {
    const [lastSeen, setLastSeen] = useState(22);

    useEffect(() => {
        const interval = setInterval(() => {
            setLastSeen(prev => prev > 1 ? prev - 1 : 1);
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 50%, #fef3c7 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1rem',
            marginBottom: '1rem'
        }}>
            {/* Radar Animation Background */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-30%',
                width: '200px',
                height: '200px',
                opacity: 0.1
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid #dc2626',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '50%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #dc2626, transparent)',
                        transformOrigin: 'left center'
                    }} />
                </motion.div>
            </div>

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
                    background: 'linear-gradient(135deg, #dc2626, #f97316)',
                    color: 'white',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(220,38,38,0.4)'
                }}>
                    <AlertTriangle style={{ width: '1rem', height: '1rem' }} />
                    <span>Suspected Profile Found</span>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                        background: '#fef2f2',
                        padding: '0.375rem 0.625rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <Activity style={{ width: '0.75rem', height: '0.75rem' }} />
                    ACTIVE NOW
                </motion.div>
            </div>

            {/* Tinder-Style Profile Card (Blurred) */}
            <div style={{
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                marginBottom: '0.75rem'
            }}>
                {/* Profile Image Area */}
                <div style={{
                    height: '10rem',
                    background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
                    position: 'relative',
                    filter: 'blur(8px)',
                    pointerEvents: 'none'
                }}>
                    {/* Abstract silhouette */}
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '35%',
                        height: '40%',
                        background: '#94a3b8',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '55%',
                        height: '45%',
                        background: '#94a3b8',
                        borderRadius: '50% 50% 0 0'
                    }} />

                    {/* Distance Badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.75rem',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '0.375rem 0.625rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <Navigation style={{ width: '0.625rem', height: '0.625rem' }} />
                        2km from your location
                    </div>

                    {/* Verified Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.5rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <Shield style={{ width: '0.5rem', height: '0.5rem' }} />
                        VERIFIED
                    </div>
                </div>

                {/* Profile Info (Partially Revealed) */}
                <div style={{ padding: '1rem', filter: 'blur(4px)', pointerEvents: 'none' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937' }}>
                            Juli***
                        </span>
                        <span style={{ fontSize: '1rem', color: '#6b7280' }}>27</span>
                        <Flame style={{ width: '1rem', height: '1rem', color: '#f97316', fill: '#f97316' }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: '#6b7280',
                        fontSize: '0.75rem'
                    }}>
                        <MapPin style={{ width: '0.75rem', height: '0.75rem' }} />
                        <span>Looking for something casual 💋</span>
                    </div>
                </div>
            </div>

            {/* Alarming Metrics */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                marginBottom: '0.75rem'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    border: '1px solid #fee2e2',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.25rem'
                    }}>
                        <Clock style={{ width: '0.875rem', height: '0.875rem', color: '#dc2626' }} />
                        <span style={{ fontSize: '0.625rem', color: '#6b7280', fontWeight: 600 }}>Last Active</span>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: '1.125rem', fontWeight: 800, color: '#dc2626' }}
                    >
                        {lastSeen} min ago
                    </motion.div>
                </div>
                <div style={{
                    background: 'white',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    border: '1px solid #fee2e2',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        marginBottom: '0.25rem'
                    }}>
                        <Heart style={{ width: '0.875rem', height: '0.875rem', color: '#dc2626' }} />
                        <span style={{ fontSize: '0.625rem', color: '#6b7280', fontWeight: 600 }}>Match Rate</span>
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#dc2626' }}>
                        High
                    </div>
                </div>
            </div>

            {/* Platform Badges */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
            }}>
                {['Tinder', 'Bumble', 'Badoo'].map((app, idx) => (
                    <div key={idx} style={{
                        background: idx === 0 ? '#ff4458' : idx === 1 ? '#ffc629' : '#783bf9',
                        color: idx === 1 ? '#1f2937' : 'white',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.5rem',
                        fontWeight: 700,
                        opacity: 0.9
                    }}>
                        {app}
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
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)'
            }}>
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '50%',
                        boxShadow: '0 8px 32px rgba(220,38,38,0.25)',
                        marginBottom: '0.75rem'
                    }}
                >
                    <Lock style={{ width: '1.75rem', height: '1.75rem', color: '#dc2626' }} />
                </motion.div>
                <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.9)',
                    maxWidth: '220px',
                    lineHeight: 1.4
                }}>
                    <span style={{ color: '#dc2626' }}>1 Highly Active</span> suspect profile found in your zone.
                </p>
            </div>
        </div>
    );
}

/**
 * FidelityCheckLoadingScreen - Radar scan animation
 */
export function FidelityCheckLoadingScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const scanSteps = [
        { text: "Pinging Tinder servers...", icon: Wifi },
        { text: "Geolocating profiles...", icon: MapPin },
        { text: "Analyzing activity timestamps...", icon: Clock },
        { text: "Cross-referencing data...", icon: Activity },
        { text: "Suspect profile detected!", icon: AlertTriangle },
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => prev >= 100 ? 100 : prev + 0.6);
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
                {/* Radar Animation */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28">
                        {/* Radar Background */}
                        <div className="absolute inset-0 rounded-full border-2 border-red-200" />
                        <div className="absolute inset-4 rounded-full border border-red-100" />
                        <div className="absolute inset-8 rounded-full border border-red-50" />

                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full" />

                        {/* Rotating Radar Line */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-transparent origin-left" />
                        </motion.div>

                        {/* Blip Dots */}
                        <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute top-3 right-6 w-2 h-2 bg-red-500 rounded-full"
                        />
                        <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-orange-500 rounded-full"
                        />
                    </div>
                </div>

                {/* Scan Steps */}
                <div className="space-y-3 mb-4">
                    {scanSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = index <= currentStep;
                        const isCurrent = index === currentStep;
                        const isLast = index === scanSteps.length - 1;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: isActive ? 1 : 0.3 }}
                                transition={{ delay: index * 0.2 }}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isCurrent
                                        ? isLast
                                            ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200'
                                            : 'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200'
                                        : isActive
                                            ? 'bg-gray-50 border border-gray-100'
                                            : 'bg-gray-50/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <StepIcon className={`w-4 h-4 ${isLast && isCurrent ? 'text-red-500' :
                                            isCurrent ? 'text-rose-500' :
                                                isActive ? 'text-green-500' : 'text-gray-400'
                                        }`} />
                                    <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step.text}
                                    </span>
                                </div>
                                {isActive && index < currentStep && (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                )}
                                {isCurrent && !isLast && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full"
                                    />
                                )}
                                {isCurrent && isLast && (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </motion.div>
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
                        className="h-full bg-gradient-to-r from-rose-500 to-red-500"
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-rose-500" />
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-medium"
                    >
                        Scanning dating apps...
                    </motion.span>
                </div>
            </motion.div>
        </div>
    );
}

export default FidelityCheckResultsPreview;
