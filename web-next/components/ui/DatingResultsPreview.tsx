"use client";
import React from 'react';
import { Heart, MapPin, Lock, Sparkles } from 'lucide-react';

/**
 * DatingResultsPreview - Blurred dating profiles for payment teaser
 * Shows Tinder/Bumble style profile cards with blur overlay
 */
export function DatingResultsPreview() {
    // Abstract silhouette profiles (no real faces)
    const profiles = [
        { age: 24, distance: '2km', verified: true },
        { age: 27, distance: '5km', verified: true },
        { age: 23, distance: '3km', verified: false },
        { age: 26, distance: '8km', verified: true },
        { age: 25, distance: '1km', verified: true },
        { age: 29, distance: '4km', verified: false },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fff5f5 0%, #fff0f5 100%)',
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
                    background: 'linear-gradient(135deg, #ff4e71, #ff7f66)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(255,78,113,0.3)'
                }}>
                    <Heart style={{ width: '0.875rem', height: '0.875rem', fill: 'white' }} />
                    <span>Dating Profiles Found</span>
                </div>
                <div style={{
                    background: '#fff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#ff4e71',
                    border: '1px solid #ffe4e9'
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '0.375rem',
                        height: '0.375rem',
                        background: '#22c55e',
                        borderRadius: '50%',
                        marginRight: '0.25rem',
                        animation: 'pulse 2s infinite'
                    }}></span>
                    20+ Matches
                </div>
            </div>

            {/* Profile Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                filter: 'blur(8px)',
                pointerEvents: 'none'
            }}>
                {profiles.map((profile, idx) => (
                    <div
                        key={idx}
                        style={{
                            aspectRatio: '3/4',
                            borderRadius: '0.75rem',
                            background: `linear-gradient(180deg, 
                ${idx % 2 === 0 ? '#e0e0e0' : '#d0d0d0'} 0%, 
                ${idx % 2 === 0 ? '#b0b0b0' : '#a0a0a0'} 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Abstract silhouette */}
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40%',
                            height: '35%',
                            background: '#9ca3af',
                            borderRadius: '50%'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            top: '52%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '40%',
                            background: '#9ca3af',
                            borderRadius: '50% 50% 0 0'
                        }}></div>

                        {/* Info overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '0.5rem',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                            color: 'white'
                        }}>
                            <div style={{ fontSize: '0.625rem', fontWeight: 700 }}>
                                Profile #{idx + 1}, {profile.age}
                            </div>
                            <div style={{
                                fontSize: '0.5rem',
                                opacity: 0.8,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <MapPin style={{ width: '0.5rem', height: '0.5rem' }} />
                                {profile.distance} away
                            </div>
                        </div>

                        {/* Verified badge */}
                        {profile.verified && (
                            <div style={{
                                position: 'absolute',
                                top: '0.375rem',
                                right: '0.375rem',
                                background: '#3b82f6',
                                borderRadius: '50%',
                                padding: '0.125rem',
                                display: 'flex'
                            }}>
                                <Sparkles style={{ width: '0.5rem', height: '0.5rem', color: 'white' }} />
                            </div>
                        )}
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
                    <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#ff4e71' }} />
                </div>
                <p style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#374151',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                }}>
                    Unlock to reveal profiles
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

export default DatingResultsPreview;
