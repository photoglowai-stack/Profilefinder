"use client";
import React from 'react';
import { FileText, AlertTriangle, Lock, MessageCircle, TrendingUp, Clock } from 'lucide-react';

/**
 * FidelityResultsPreview - Blurred PDF report for payment teaser
 * Shows fidelity analysis report with suspicious patterns
 */
export function FidelityResultsPreview() {
    const suspiciousItems = [
        { type: 'Late night messages', count: 12, severity: 'high' },
        { type: 'Deleted conversations', count: 8, severity: 'high' },
        { type: 'Hidden contacts', count: 3, severity: 'medium' },
        { type: 'App usage anomaly', count: 5, severity: 'medium' },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
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
                    background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(236,72,153,0.3)'
                }}>
                    <FileText style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Analysis Complete</span>
                </div>
                <div style={{
                    background: '#fef2f2',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    <AlertTriangle style={{ width: '0.625rem', height: '0.625rem' }} />
                    Suspicious Activity
                </div>
            </div>

            {/* PDF Preview */}
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                filter: 'blur(6px)',
                pointerEvents: 'none'
            }}>
                {/* Report Header */}
                <div style={{
                    borderBottom: '2px solid #ec4899',
                    paddingBottom: '0.5rem',
                    marginBottom: '0.5rem'
                }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1f2937' }}>
                        FIDELITY ANALYSIS REPORT
                    </div>
                    <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                        Generated: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Risk Score */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    padding: '0.5rem',
                    background: '#fef2f2',
                    borderRadius: '0.5rem',
                    border: '1px solid #fecaca'
                }}>
                    <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        background: 'conic-gradient(#dc2626 0deg, #dc2626 270deg, #e5e7eb 270deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.625rem',
                            fontWeight: 800,
                            color: '#dc2626'
                        }}>
                            75%
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>
                            High Risk Score
                        </div>
                        <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                            Multiple red flags detected
                        </div>
                    </div>
                </div>

                {/* Suspicious Items */}
                <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: '#374151',
                        marginBottom: '0.375rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Detected Patterns
                    </div>
                    {suspiciousItems.map((item, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.375rem 0',
                            borderBottom: idx < suspiciousItems.length - 1 ? '1px solid #f3f4f6' : 'none'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                {item.type.includes('message') && <MessageCircle style={{ width: '0.625rem', height: '0.625rem', color: '#6b7280' }} />}
                                {item.type.includes('night') && <Clock style={{ width: '0.625rem', height: '0.625rem', color: '#6b7280' }} />}
                                {item.type.includes('Deleted') && <AlertTriangle style={{ width: '0.625rem', height: '0.625rem', color: '#6b7280' }} />}
                                {item.type.includes('usage') && <TrendingUp style={{ width: '0.625rem', height: '0.625rem', color: '#6b7280' }} />}
                                <span style={{ fontSize: '0.625rem', color: '#374151' }}>{item.type}</span>
                            </div>
                            <div style={{
                                fontSize: '0.5rem',
                                fontWeight: 700,
                                padding: '0.125rem 0.375rem',
                                borderRadius: '9999px',
                                background: item.severity === 'high' ? '#fef2f2' : '#fffbeb',
                                color: item.severity === 'high' ? '#dc2626' : '#d97706'
                            }}>
                                {item.count} found
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Preview (heavily blurred) */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    filter: 'blur(3px)'
                }}>
                    <div style={{ fontSize: '0.5rem', color: '#9ca3af' }}>
                        [Chat excerpt redacted - unlock to view]
                    </div>
                    <div style={{
                        height: '2rem',
                        background: 'repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 4px, transparent 4px, transparent 8px)'
                    }}></div>
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
                    <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#ec4899' }} />
                </div>
                <p style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#374151',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                }}>
                    Unlock full report
                </p>
            </div>
        </div>
    );
}

export default FidelityResultsPreview;
