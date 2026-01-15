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

export default FollowingResultsPreview;
