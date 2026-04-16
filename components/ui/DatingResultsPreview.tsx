"use client";
import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Lock, Sparkles } from 'lucide-react';

/**
 * DatingResultsPreview - Blurred dating profiles for payment teaser
 * Shows Tinder/Bumble style profile cards with real blurred photos
 */
export function DatingResultsPreview() {
    const [gender, setGender] = useState<string>('woman'); // default

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedGender = sessionStorage.getItem('pf_dating_gender');
            if (savedGender) {
                setGender(savedGender);
            }
        }
    }, []);

    // Reliable high-quality portrait photos from Unsplash
    const womenPhotos = [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&q=80"
    ];

    const menPhotos = [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80"
    ];

    const selectedPhotos = gender === 'man' ? menPhotos : womenPhotos;

    const profiles = [
        { age: 24, distance: '2km', verified: true, img: selectedPhotos[0] },
        { age: 27, distance: '5km', verified: true, img: selectedPhotos[1] },
        { age: 23, distance: '3km', verified: false, img: selectedPhotos[2] },
        { age: 26, distance: '8km', verified: true, img: selectedPhotos[3] },
        { age: 25, distance: '1km', verified: true, img: selectedPhotos[4] },
        { age: 29, distance: '4km', verified: false, img: selectedPhotos[5] },
    ];

    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fff5f5 0%, #fff0f5 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1rem'
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
                filter: 'blur(10px)',
                pointerEvents: 'none'
            }}>
                {profiles.map((profile, idx) => (
                    <div
                        key={idx}
                        style={{
                            aspectRatio: '3/4',
                            borderRadius: '0.75rem',
                            backgroundImage: `url(${profile.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Info overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '0.5rem',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
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
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)'
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
                    color: '#1f2937',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(255,255,255,0.9)'
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

