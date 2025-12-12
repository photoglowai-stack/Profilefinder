import { useState } from 'react';
import { Globe, User, Menu, X } from 'lucide-react';

const LOGO_URL = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg";

interface ServiceNavbarProps {
    /** Primary gradient color for mobile menu background */
    primaryColor?: string;
}

export default function ServiceNavbar({ primaryColor = '#ff4e71' }: ServiceNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* CSS for responsive nav */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav-service { display: none !important; }
                    .mobile-menu-btn-service { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .mobile-menu-btn-service { display: none !important; }
                    .mobile-menu-service { display: none !important; }
                }
            `}</style>

            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                maxWidth: '1280px',
                margin: '0 auto',
                width: '100%',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0 0 16px 16px',
                marginTop: '8px',
                position: 'relative',
                color: 'white'
            }}>
                {/* Logo */}
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
                    <img
                        src={LOGO_URL}
                        alt="ProfileFinder"
                        loading="lazy"
                        style={{ height: '32px', width: 'auto' }}
                    />
                    <span style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        ProfileFinder
                    </span>
                </a>

                {/* Desktop Navigation Links */}
                <div className="desktop-nav-service" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px',
                    fontWeight: 600,
                    fontSize: '15px'
                }}>
                    {['Search Profile', 'Blog', 'Affiliate Program'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            style={{
                                color: 'rgba(255,255,255,0.8)',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                padding: '8px 0'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop Right Section */}
                <div className="desktop-nav-service" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '8px 12px', borderRadius: '12px', fontWeight: 600, fontSize: '14px' }}>
                        <Globe size={16} />
                        <span>EN</span>
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '10px 20px',
                        borderRadius: '9999px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s'
                    }}>
                        <User size={18} />
                        <span>Profile</span>
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="mobile-menu-btn-service"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    style={{
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div
                        className="mobile-menu-service"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '0 0 24px 24px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            zIndex: 100,
                            marginTop: '8px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {['Search Profile', 'Blog', 'Affiliate Program'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {item}
                            </a>
                        ))}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                            <button style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backgroundColor: 'transparent',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                <Globe size={18} />
                                EN
                            </button>
                            <button style={{
                                flex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: '#ffffff',
                                color: '#0a0a0a',
                                fontSize: '14px',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}>
                                <User size={18} />
                                Profile
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
