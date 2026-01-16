"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MessageSquare, Brain, AlertTriangle, Lock, Eye,
    CheckCircle2, Zap, TrendingUp, Heart, Shield,
    Sparkles, XCircle, ThumbsUp, ThumbsDown, Lightbulb
} from 'lucide-react';

/**
 * ChatAnalysisResultsPreview - AI-powered chat analysis with red flags detection
 * Shows highlighted conversation with toxicity metrics
 */
export function ChatAnalysisResultsPreview() {
    // Simulated chat messages with analysis
    const messages = [
        {
            sender: 'them', text: "Hey, I have been really busy lately with ****", flag: 'warning', flagText: 'Excuse pattern'
        },
        { sender: 'you', text: 'I noticed you were online but...', flag: null },
        { sender: 'them', text: '*** *** my phone in my pocket', flag: 'danger', flagText: 'Deflection' },
        { sender: 'you', text: 'We should talk about this...', flag: null },
        { sender: 'them', text: "You are being paranoid *** *** ***", flag: 'danger', flagText: 'Gaslighting' },
        { sender: 'them', text: 'I love you, you know that', flag: 'warning', flagText: 'Love bombing' },
    ];

    const metrics = [
        { label: 'Toxicity Index', value: 'High', color: '#dc2626', icon: AlertTriangle },
        { label: 'Hidden Interest', value: '85%', color: '#f97316', icon: Eye },
        { label: 'Red Flags', value: '3', color: '#dc2626', icon: XCircle },
        { label: 'Trust Score', value: 'Low', color: '#dc2626', icon: Shield },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #fef3c7 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1rem',
            marginBottom: '1rem'
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
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    color: 'white',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(168,85,247,0.4)'
                }}>
                    <Brain style={{ width: '1rem', height: '1rem' }} />
                    <span>AI Analysis Complete</span>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
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
                    <AlertTriangle style={{ width: '0.75rem', height: '0.75rem' }} />
                    3 Alerts
                </motion.div>
            </div>

            {/* Chat Preview (Blurred) */}
            <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '0.75rem',
                marginBottom: '0.75rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxHeight: '12rem',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Simulated Chat Interface */}
                <div style={{
                    filter: 'blur(4px)',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    {messages.map((msg, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start',
                            position: 'relative'
                        }}>
                            <div style={{
                                maxWidth: '75%',
                                padding: '0.5rem 0.75rem',
                                borderRadius: msg.sender === 'you'
                                    ? '1rem 1rem 0.25rem 1rem'
                                    : '1rem 1rem 1rem 0.25rem',
                                background: msg.sender === 'you'
                                    ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                                    : '#f3f4f6',
                                color: msg.sender === 'you' ? 'white' : '#1f2937',
                                fontSize: '0.75rem',
                                position: 'relative',
                                border: msg.flag === 'danger'
                                    ? '2px solid #dc2626'
                                    : msg.flag === 'warning'
                                        ? '2px solid #f97316'
                                        : 'none'
                            }}>
                                {msg.text}

                                {/* Flag Badge */}
                                {msg.flag && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-0.5rem',
                                        right: msg.sender === 'you' ? 'auto' : '-0.25rem',
                                        left: msg.sender === 'you' ? '-0.25rem' : 'auto',
                                        background: msg.flag === 'danger' ? '#dc2626' : '#f97316',
                                        color: 'white',
                                        fontSize: '0.4375rem',
                                        fontWeight: 700,
                                        padding: '0.125rem 0.375rem',
                                        borderRadius: '0.25rem',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        ⚠️ {msg.flagText}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient Fade */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3rem',
                    background: 'linear-gradient(transparent, white)',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Metrics Dashboard */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem'
            }}>
                {metrics.map((metric, idx) => {
                    const MetricIcon = metric.icon;
                    return (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: '0.75rem',
                            padding: '0.625rem',
                            border: `1px solid ${metric.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            filter: 'blur(2px)',
                            pointerEvents: 'none'
                        }}>
                            <div style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '0.5rem',
                                background: `${metric.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MetricIcon style={{ width: '1rem', height: '1rem', color: metric.color }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.5rem', color: '#6b7280', fontWeight: 500 }}>{metric.label}</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: metric.color }}>{metric.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lock Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(2px)'
            }}>
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '50%',
                        boxShadow: '0 8px 32px rgba(168,85,247,0.25)',
                        marginBottom: '0.75rem'
                    }}
                >
                    <Lock style={{ width: '1.75rem', height: '1.75rem', color: '#a855f7' }} />
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
                    AI detected <span style={{ color: '#dc2626' }}>3 warning signs</span> in this conversation.
                </p>
            </div>
        </div>
    );
}

/**
 * ChatAnalysisLoadingScreen - Brain/message analysis animation
 */
export function ChatAnalysisLoadingScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const analysisSteps = [
        { text: "Semantic analysis in progress...", icon: MessageSquare },
        { text: "Detecting subtext & hidden meanings...", icon: Eye },
        { text: "Calculating interest score...", icon: TrendingUp },
        { text: "Identifying manipulation patterns...", icon: Lightbulb },
        { text: "Red flags detected!", icon: AlertTriangle },
    ];

    useEffect(() => {
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
        <div className="w-full max-w-sm mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden p-6"
            >
                {/* Brain Animation */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Brain className="w-12 h-12 text-white" />
                        </div>

                        {/* Thinking Particles */}
                        <motion.div
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-5, -15, -25],
                                x: [0, 10, 5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            className="absolute -top-2 right-0"
                        >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                        </motion.div>
                        <motion.div
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-5, -20, -30],
                                x: [0, -10, -5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-2 left-2"
                        >
                            <Sparkles className="w-3 h-3 text-pink-400" />
                        </motion.div>
                        <motion.div
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-5, -18, -28],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="absolute -top-3 left-1/2 -translate-x-1/2"
                        >
                            <Sparkles className="w-4 h-4 text-fuchsia-400" />
                        </motion.div>

                        {/* Pulse Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl -z-10"
                        />
                    </motion.div>
                </div>

                {/* Analysis Steps */}
                <div className="space-y-3 mb-4">
                    {analysisSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = index <= currentStep;
                        const isCurrent = index === currentStep;
                        const isLast = index === analysisSteps.length - 1;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.3, x: -10 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.3,
                                    x: isActive ? 0 : -10
                                }}
                                transition={{ delay: index * 0.2 }}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isCurrent
                                    ? isLast
                                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200'
                                        : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
                                    : isActive
                                        ? 'bg-gray-50 border border-gray-100'
                                        : 'bg-gray-50/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <StepIcon className={`w-4 h-4 ${isLast && isCurrent ? 'text-red-500' :
                                        isCurrent ? 'text-purple-500' :
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
                                        className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"
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
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-medium"
                    >
                        Deep analysis in progress...
                    </motion.span>
                </div>
            </motion.div>
        </div>
    );
}

export default ChatAnalysisResultsPreview;
