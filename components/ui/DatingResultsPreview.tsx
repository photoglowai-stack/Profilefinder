"use client";
import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

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
    const nameStr = gender === 'man' ? 'afef' : 'afef';

    const profiles = [
        { age: 24, distance: '4 km', match: 88, img: selectedPhotos[0] },
        { age: 27, distance: '2 km', match: 91, img: selectedPhotos[1] },
        { age: 23, distance: '5 km', match: 86, img: selectedPhotos[2] },
        { age: 26, distance: '3 km', match: 90, img: selectedPhotos[3] },
        { age: 25, distance: '1 km', match: 84, img: selectedPhotos[4] },
    ];

    return (
        <div style={{
            background: 'transparent',
            position: 'relative',
            width: '100%',
        }}>
            {/* Header matching screenshot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h2 style={{ color: '#ff4e71', fontSize: '1.625rem', fontWeight: 800, lineHeight: 1.1, maxWidth: '60%', letterSpacing: '-0.02em' }}>
                    Voici les résultats<br />de votre<br />recherche
                </h2>
                <div style={{ background: '#ff4e71', color: 'white', padding: '6px 14px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span style={{ border: '2px solid #5eead4', color: '#5eead4', borderRadius: '50%', padding: '2px 4px', fontSize: '0.65rem' }}>80%</span> 
                    Match 
                    <span style={{ background: '#3b82f6', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontStyle: 'italic', fontWeight: 700 }}>i</span>
                </div>
            </div>

            {/* Correspondances pill */}
            <div style={{ background: '#fff0f5', color: '#ff4e71', display: 'inline-block', padding: '8px 24px', borderRadius: '999px', fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Correspondances : 20 +
            </div>

            {/* Scrollable Container Box */}
            <div style={{
                background: '#ffffff',
                borderRadius: '1rem',
                padding: '1.25rem',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                border: '1px solid #f3f4f6',
                position: 'relative'
            }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                    Potential Matches : {nameStr}<br />
                    <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#4b5563' }}>Paris, France</span>
                </div>

                {/* Horizontal Carousel */}
                <div className="hide-scrollbar" style={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                }}>
                    {profiles.map((p, idx) => (
                        <div key={idx} style={{
                            minWidth: '140px',
                            width: '140px',
                            height: '190px',
                            borderRadius: '12px',
                            position: 'relative',
                            overflow: 'hidden',
                            scrollSnapAlign: 'start',
                            border: '2px solid #ff4e71',
                            flexShrink: 0
                        }}>
                            {/* Blurred Image Background */}
                            <div style={{
                                position: 'absolute', inset: -10,
                                backgroundImage: `url(${p.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'blur(8px)',
                                zIndex: 1
                            }} />
                            {/* Dark gradient overlay for bottom text readability */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)', zIndex: 2 }} />

                            {/* Match pill top */}
                            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#ff4e71', color: 'white', padding: '4px 12px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontSize: '0.7rem', fontWeight: 700, zIndex: 3, whiteSpace: 'nowrap' }}>
                                {p.match}% Match
                            </div>

                            {/* Distance & Info bottom */}
                            <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                                <div style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', color: 'white', padding: '2px 10px', borderRadius: '999px', fontSize: '0.65rem', marginBottom: '4px', fontWeight: 600 }}>
                                    {p.distance} away
                                </div>
                                <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, fontStyle: 'italic' }}>
                                    {nameStr}, {p.age}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Détaillé Tab UI at bottom of preview */}
            <div style={{ marginTop: '2rem', borderBottom: '2px solid #e5e7eb', display: 'flex' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px',
                    borderBottom: '2px solid #ff4e71',
                    marginBottom: '-2px',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#1f2937'
                }}>
                    <Lock size={20} /> détaillé
                </div>
            </div>

            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>
        </div>
    );
}

export default DatingResultsPreview;

