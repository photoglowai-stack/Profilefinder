// FaceTrace Results Preview Component

// Icône ScanFace inline
const IconScanFace = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
    </svg>
);

// Icône Globe inline
const IconGlobe = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

// Images de résultats pour FaceTrace
const FACETRACE_RESULTS = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop"
];

export function FaceTraceResultsPreview() {
    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(to bottom right, #fff5f5, #fff0f5)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0.75rem',
            border: '1px solid #fce7f3',
            marginBottom: '1.5rem',
        }}>
            {/* En-tête du widget */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(to bottom right, #ff4e71, #ff7f66)',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 6px -1px rgba(255, 78, 113, 0.2)',
                }}>
                    <IconScanFace className="w-3.5 h-3.5" />
                    <span>Résultats du scan</span>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#ff4e71',
                    border: '1px solid #ffe4e9',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '0.375rem',
                        height: '0.375rem',
                        backgroundColor: '#22c55e',
                        borderRadius: '9999px',
                        marginRight: '0.25rem',
                        animation: 'pulse 2s infinite',
                    }}></span>
                    20+ Photos Trouvées
                </div>
            </div>

            {/* LIGNE DE DÉFILEMENT HORIZONTAL */}
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '0.75rem',
                paddingBottom: '0.5rem',
                margin: '0 -0.5rem',
                padding: '0 0.5rem 0.5rem 0.5rem',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
            }}>
                {FACETRACE_RESULTS.map((src, idx) => {
                    const isFirst = idx === 0;
                    return (
                        <div
                            key={idx}
                            style={{
                                position: 'relative',
                                flexShrink: 0,
                                width: '6rem',
                                height: '6rem',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                backgroundColor: '#e5e7eb',
                                border: '1px solid white',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                scrollSnapAlign: 'start',
                            }}
                        >
                            {/* Image : Scale pour éviter les bords blancs du flou */}
                            <img
                                src={src}
                                alt={`Result ${idx}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'all 0.3s ease',
                                    filter: isFirst ? 'none' : 'blur(8px)',
                                    transform: isFirst ? 'scale(1)' : 'scale(1.25)',
                                    opacity: isFirst ? 1 : 0.9,
                                }}
                            />

                            {/* Badges / Overlays */}
                            {isFirst ? (
                                <>
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.375rem',
                                        right: '0.375rem',
                                        backgroundColor: '#22c55e',
                                        width: '0.625rem',
                                        height: '0.625rem',
                                        borderRadius: '9999px',
                                        border: '2px solid white',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                        zIndex: 10,
                                        animation: 'pulse 2s infinite',
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                        padding: '0.375rem',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <span style={{
                                                backgroundColor: 'rgba(34, 197, 94, 0.9)',
                                                backdropFilter: 'blur(4px)',
                                                color: 'white',
                                                fontSize: '0.5rem',
                                                fontWeight: 700,
                                                padding: '0.125rem 0.375rem',
                                                borderRadius: '0.375rem',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            }}>
                                                99% Match
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0.25rem',
                                    right: '0.25rem',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    backdropFilter: 'blur(2px)',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.5rem',
                                    color: 'white',
                                    padding: '0.125rem 0.375rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}>
                                    <IconGlobe className="w-2 h-2 mr-0.5 opacity-80" />
                                    <span>Web</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <p style={{
                textAlign: 'center',
                fontSize: '0.625rem',
                color: '#9ca3af',
                marginTop: '0.5rem',
                fontWeight: 500,
            }}>
                ← Défilez pour voir les autres correspondances →
            </p>
        </div>
    );
}

export default FaceTraceResultsPreview;
