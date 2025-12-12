import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useService } from '../lib/ServiceContext';
import { ServiceType } from '../lib/content';
import {
    Search, Globe, User, Check, Shield, Clock, Menu, X,
    Heart, Users, ScanFace, MessageSquare, Instagram,
    MessageCircle, Fingerprint, TrendingUp, Star,
    UploadCloud, Lock, Activity, ArrowRight
} from 'lucide-react';
import { FidelityForm } from './forms/FidelityForm';

// --- Types ---
type GenderType = 'man' | 'woman';

interface GenderCardProps {
    gender: string;
    selected: boolean;
    onClick: () => void;
    img: string;
    color: string;
    isWoman?: boolean;
}

interface UploadZoneProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    accentColor: string;
    badge: React.ReactNode;
}

const HeroAntigravity: React.FC = () => {
    const navigate = useNavigate();
    const { selectedService, setSelectedService } = useService();
    const [selectedGender, setSelectedGender] = useState<GenderType>('man');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [faceTraceImage, setFaceTraceImage] = useState<string | null>(null);
    const [faceTraceFile, setFaceTraceFile] = useState<File | null>(null);

    const handleFaceTraceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFaceTraceFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFaceTraceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearFaceTraceImage = () => {
        setFaceTraceImage(null);
        setFaceTraceFile(null);
    };

    // --- Images ---
    const avatarMan = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(6).svg";
    const avatarWoman = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/FEMME.svg";

    const trustedUsers = [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=5",
        "https://i.pravatar.cc/100?img=9",
        "https://i.pravatar.cc/100?img=32"
    ];

    const services = [
        { id: 'dating' as ServiceType, label: 'Dating Search', icon: <Heart size={20} strokeWidth={2.5} /> },
        { id: 'following' as ServiceType, label: 'Following AI', icon: <Users size={20} strokeWidth={2.5} /> },
        { id: 'facetrace' as ServiceType, label: 'Face Trace', icon: <ScanFace size={20} strokeWidth={2.5} /> },
        { id: 'fidelity' as ServiceType, label: 'Fidelity Test', icon: <MessageSquare size={20} strokeWidth={2.5} /> },
    ];

    const trendingKeywords = [
        "Pimeyes Alternative", "Reverse Image Search", "Face Search Free", "Instagram Finder", "Tinder Profile Search", "AI Face Recognition"
    ];

    const contentMap: Record<ServiceType, { h1: string; desc: string; instruction: string; cta: string; buttonIcon: React.ReactNode; buttonBg: string }> = {
        dating: {
            h1: "Find any profile on Tinder with AI Face Search",
            desc: "Uncover your partner's secrets with the #1 Tinder Profile Finder. More accurate than Pimeyes for dating apps.",
            instruction: "WHO ARE YOU LOOKING FOR?",
            cta: "START SEARCH",
            buttonIcon: <Search size={22} strokeWidth={3} />,
            buttonBg: "#0a0a0a"
        },
        following: {
            h1: "Reveal Hidden Instagram Connections",
            desc: "Analyze their entire following list instantly. See who they recently followed and uncover suspicious interactions.",
            instruction: "ENTER TARGET USERNAME",
            cta: "ANALYZE FOLLOWINGS",
            buttonIcon: <Instagram size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)"
        },
        facetrace: {
            h1: "Track Digital Footprint & Web Activity",
            desc: "The ultimate Pimeyes alternative. Find every profile, blog post, and image trace across the entire web.",
            instruction: "UPLOAD PHOTO TO SCAN",
            cta: "START WEB SCAN",
            buttonIcon: <ScanFace size={22} strokeWidth={2.5} />,
            buttonBg: "#0a0a0a"
        },
        fidelity: {
            h1: "Scan Chat Screenshots for Red Flags",
            desc: "Upload screenshots of suspicious conversations (WhatsApp, SMS, Tinder). Our AI detects hidden infidelity signals.",
            instruction: "UPLOAD CHAT SCREENSHOT",
            cta: "ANALYZE CHAT",
            buttonIcon: <MessageCircle size={22} strokeWidth={2.5} />,
            buttonBg: "#0f172a"
        }
    };

    const currentContent = contentMap[selectedService];

    // Dynamic gradient backgrounds per service
    const gradientMap: Record<ServiceType, string> = {
        dating: 'linear-gradient(135deg, #ff4b5c 0%, #ff6b6b 50%, #ff9e75 100%)',
        following: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
        facetrace: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
        fidelity: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)'
    };



    return (
        <section style={{
            width: '100%',
            background: gradientMap[selectedService],
            color: '#ffffff',
            fontFamily: "'Inter Tight', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '80px',
            transition: 'background 0.5s ease'
        }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
        }
        .animate-float { animation: float 2.5s ease-in-out infinite; }
        
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .shimmer-effect:hover .shimmer-bar { animation: shimmer 2s infinite; }
        
        .hero-btn:hover { transform: scale(1.02); }
        .hero-btn:active { transform: scale(0.98); }
        .gender-card:hover { transform: scale(1.02); }
        .tab-btn:hover { transform: translateY(-2px); }
        
        /* Responsive Navigation */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        
        /* Focus styles for accessibility */
        button:focus-visible, a:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
      `}</style>

            {/* Navigation */}
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
                position: 'relative'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <img
                        src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                        alt="ProfileFinder"
                        loading="lazy"
                        style={{
                            height: '32px',
                            width: 'auto'
                        }}
                    />
                    <span style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        ProfileFinder
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <div className="desktop-nav" style={{
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
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '8px 12px', borderRadius: '12px', fontWeight: 600, fontSize: '14px' }}>
                        <Globe size={16} />
                        <span>EN</span>
                    </div>
                    <button
                        style={{
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
                        }}
                        onFocus={(e) => e.currentTarget.style.outline = '2px solid #ffffff'}
                        onBlur={(e) => e.currentTarget.style.outline = 'none'}
                    >
                        <User size={18} />
                        <span>Profile</span>
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
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
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s'
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div
                        className="mobile-menu"
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
                                onClick={() => setIsMenuOpen(false)}
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

            {/* Main Content */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '32px',
                paddingBottom: '48px',
                paddingLeft: '16px',
                paddingRight: '16px',
                textAlign: 'center',
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto'
            }}>

                {/* Trusted Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    marginBottom: '40px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex' }}>
                        {trustedUsers.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt="user"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '2px solid #ff6b6b',
                                    marginLeft: i > 0 ? '-12px' : '0'
                                }}
                            />
                        ))}
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            color: '#ff4b5c',
                            border: '2px solid #ff6b6b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '10px',
                            marginLeft: '-12px',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            +99
                        </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', fontWeight: 700, lineHeight: 1.3, textAlign: 'left', paddingLeft: '8px', letterSpacing: '0.02em' }}>
                        TRUSTED BY <br />
                        <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                            500k+ users <Check size={12} style={{ backgroundColor: '#22c55e', borderRadius: '50%', padding: '2px', color: '#fff' }} strokeWidth={4} />
                        </span>
                    </div>
                </div>

                {/* Headlines */}
                <div style={{ width: '100%', marginBottom: '40px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 900,
                        marginBottom: '24px',
                        maxWidth: '900px',
                        margin: '0 auto 24px',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        {currentContent.h1}
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'rgba(255,255,255,0.9)',
                        maxWidth: '640px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        fontWeight: 500
                    }}>
                        {currentContent.desc}
                    </p>
                </div>

                {/* Service Selector */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '32px',
                    width: '100%',
                    maxWidth: '700px',
                    padding: '0 8px'
                }}>
                    {services.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className="tab-btn"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 16px',
                                borderRadius: '9999px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: selectedService === service.id ? '2px solid #10b981' : '2px solid transparent',
                                backgroundColor: selectedService === service.id ? '#10b981' : '#ffffff',
                                color: selectedService === service.id ? '#ffffff' : '#475569',
                                boxShadow: selectedService === service.id ? '0 6px 16px rgba(16,185,129,0.3)' : '0 2px 6px rgba(0,0,0,0.06)',
                                transform: selectedService === service.id ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {React.cloneElement(service.icon as React.ReactElement, { size: 16 })}
                            <span style={{ fontWeight: 700, letterSpacing: '0.01em' }}>{service.label}</span>
                        </button>
                    ))}
                </div>

                {/* The Card */}
                <div style={{
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    borderRadius: '40px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '480px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                    position: 'relative',
                    marginBottom: '64px',
                    border: '1px solid rgba(255,255,255,0.6)'
                }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 20 }}>

                        {/* Instruction Header */}
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <div style={{
                                backgroundColor: '#f1f5f9',
                                borderRadius: '8px',
                                padding: '8px 24px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    letterSpacing: '0.15em',
                                    color: '#ff4b5c',
                                    textTransform: 'uppercase'
                                }}>
                                    {currentContent.instruction}
                                </span>
                            </div>
                        </div>

                        {/* Content Switching */}
                        {selectedService === 'dating' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <GenderCard
                                    gender="MAN"
                                    selected={selectedGender === 'man'}
                                    onClick={() => setSelectedGender('man')}
                                    img={avatarMan}
                                    color="#10b981"
                                />
                                <GenderCard
                                    gender="WOMAN"
                                    selected={selectedGender === 'woman'}
                                    onClick={() => setSelectedGender('woman')}
                                    img={avatarWoman}
                                    color="#ff4b5c"
                                    isWoman={true}
                                />
                            </div>
                        )}

                        {selectedService === 'following' && (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '300px', justifyContent: 'center' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 24px rgba(168,85,247,0.3)',
                                        marginBottom: '16px',
                                        transform: 'rotate(3deg)'
                                    }}>
                                        <Instagram size={40} color="#ffffff" />
                                    </div>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, textAlign: 'center', padding: '0 16px' }}>
                                        Analyze public profiles & hidden connections.
                                    </p>
                                </div>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8',
                                        fontWeight: 800,
                                        fontSize: '18px',
                                        zIndex: 10
                                    }}>@</div>
                                    <input
                                        type="text"
                                        placeholder="instagram_handle"
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '16px',
                                            padding: '16px 16px 16px 40px',
                                            fontSize: '16px',
                                            fontWeight: 800,
                                            color: '#1e293b',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedService === 'facetrace' && (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                                {!faceTraceImage ? (
                                    <label
                                        htmlFor="facetrace-upload"
                                        style={{
                                            position: 'relative',
                                            flex: 1,
                                            marginBottom: '16px',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            borderRadius: '16px',
                                            border: '4px dashed #e2e8f0',
                                            backgroundColor: 'rgba(248,250,252,0.5)',
                                            transition: 'all 0.3s',
                                            color: '#ff4b5c'
                                        }}
                                    >
                                        <div
                                            className="animate-scan"
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                height: '3px',
                                                backgroundColor: '#ff4b5c',
                                                boxShadow: '0 0 20px #ff4b5c',
                                                zIndex: 10,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '16px',
                                            padding: '24px'
                                        }}>
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#ffffff',
                                                borderRadius: '50%',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#ff4b5c',
                                                position: 'relative',
                                                zIndex: 20,
                                                border: '4px solid #f1f5f9'
                                            }}>
                                                <ScanFace size={48} strokeWidth={1.5} />
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '-4px',
                                                    right: '-4px',
                                                    backgroundColor: '#1e293b',
                                                    color: '#ffffff',
                                                    borderRadius: '50%',
                                                    padding: '6px',
                                                    border: '4px solid #ffffff'
                                                }}>
                                                    <Fingerprint size={16} />
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center', zIndex: 20 }}>
                                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                                                    Drag & Drop Photo
                                                </h3>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#64748b',
                                                    fontWeight: 700,
                                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                                    padding: '4px 12px',
                                                    borderRadius: '9999px',
                                                    border: '1px solid #e2e8f0',
                                                    display: 'inline-block'
                                                }}>
                                                    JPG, PNG (Max 10MB)
                                                </p>
                                            </div>
                                            <div style={{
                                                backgroundColor: '#1e293b',
                                                color: '#ffffff',
                                                fontSize: '12px',
                                                fontWeight: 800,
                                                padding: '10px 20px',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '8px',
                                                cursor: 'pointer'
                                            }}>
                                                <UploadCloud size={16} strokeWidth={3} />
                                                Browse Files
                                            </div>
                                        </div>
                                        <input
                                            id="facetrace-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaceTraceUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                ) : (
                                    <div style={{
                                        position: 'relative',
                                        flex: 1,
                                        marginBottom: '16px',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '4px solid #22c55e'
                                    }}>
                                        <img
                                            src={faceTraceImage}
                                            alt="Preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <button
                                            onClick={clearFaceTraceImage}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                backgroundColor: '#ff4b5c',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <X size={18} strokeWidth={3} />
                                        </button>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            left: '12px',
                                            backgroundColor: '#22c55e',
                                            color: '#ffffff',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <Check size={14} strokeWidth={3} />
                                            Photo ready
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedService === 'fidelity' && (
                            <div style={{ marginTop: '-12px' }}>
                                <FidelityForm />
                            </div>
                        )}

                        {/* Action Button - Only for non-fidelity services */}
                        {selectedService !== 'fidelity' && (
                            <button
                                onClick={() => navigate('/payment')}
                                className="hero-btn shimmer-effect"
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    background: currentContent.buttonBg,
                                    color: '#ffffff',
                                    borderRadius: '9999px',
                                    padding: '16px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    marginTop: '8px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <div
                                    className="shimmer-bar"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                        transform: 'translateX(-150%) skewX(-15deg)'
                                    }}
                                />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 20 }}>
                                    <span style={{ opacity: 0.9 }}>
                                        {currentContent.buttonIcon}
                                    </span>
                                    <span style={{
                                        fontSize: '18px',
                                        fontWeight: 900,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}>
                                        {currentContent.cta}
                                    </span>
                                    <ArrowRight size={20} strokeWidth={3} />
                                </div>

                                <span
                                    className="animate-float"
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        bottom: '8px',
                                        fontSize: '30px',
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                                        zIndex: 30,
                                        pointerEvents: 'none'
                                    }}
                                >
                                    👆
                                </span>
                            </button>
                        )}

                        {/* Social Proof */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#fefce8',
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                border: '1px solid #fef08a'
                            }}>
                                <div style={{ display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#FFB800" color="#FFB800" />)}
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>4.9/5 Rating</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                                <Activity size={12} color="#22c55e" />
                                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>1,302 searches today</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-56px',
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            backgroundColor: '#ff0033',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '9999px',
                            fontSize: '10px',
                            fontWeight: 700,
                            boxShadow: '0 8px 24px rgba(255,0,51,0.3)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={12} strokeWidth={3} /> 100% Private</span>
                            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} strokeWidth={3} /> Instant</span>
                            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} strokeWidth={3} /> 99% Accuracy</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* SEO Marquee */}
            <div style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 0',
                overflow: 'hidden'
            }}>
                <div className="animate-marquee" style={{ display: 'flex', alignItems: 'center', gap: '48px', whiteSpace: 'nowrap' }}>
                    {[...trendingKeywords, ...trendingKeywords].map((keyword, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '10px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}>
                            <TrendingUp size={12} color="#ff4b5c" />
                            {keyword}
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

// --- Sub-components with INLINE STYLES ---

const UploadZone: React.FC<UploadZoneProps> = ({ icon, title, subtitle, accentColor, badge }) => (
    <div style={{
        position: 'relative',
        flex: 1,
        marginBottom: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '16px',
        border: `4px dashed #e2e8f0`,
        backgroundColor: 'rgba(248,250,252,0.5)',
        transition: 'all 0.3s',
        color: accentColor
    }}>
        <div
            className="animate-scan"
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}`,
                zIndex: 10,
                pointerEvents: 'none'
            }}
        />
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '24px'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentColor,
                position: 'relative',
                zIndex: 20,
                border: '4px solid #f1f5f9'
            }}>
                {icon}
                <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                    borderRadius: '50%',
                    padding: '6px',
                    border: '4px solid #ffffff'
                }}>
                    {badge}
                </div>
            </div>
            <div style={{ textAlign: 'center', zIndex: 20 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontWeight: 700,
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid #e2e8f0',
                    display: 'inline-block'
                }}>
                    {subtitle}
                </p>
            </div>
            <div style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '10px 20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                cursor: 'pointer'
            }}>
                <UploadCloud size={16} strokeWidth={3} />
                Browse Files
            </div>
        </div>
    </div>
);

const GenderCard: React.FC<GenderCardProps> = ({ gender, selected, onClick, img, color, isWoman }) => (
    <div
        onClick={onClick}
        className="gender-card"
        style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s',
            transform: selected ? 'scale(1.03)' : 'scale(1)',
            opacity: selected ? 1 : 0.85
        }}
    >
        <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `4px solid ${selected ? color : 'transparent'}`,
            boxShadow: selected ? `0 15px 35px -10px ${color}99` : 'none',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff'
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: selected ? '#ffffff' : '#f1f5f9'
            }} />

            {/* Image container */}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '48px',
                top: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingBottom: '8px'
            }}>
                <img
                    src={img}
                    alt={gender}
                    style={{
                        width: isWoman ? '82%' : '85%',
                        height: 'auto',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        objectPosition: 'bottom',
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                        transition: 'transform 0.7s'
                    }}
                />
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 0',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: '#ffffff',
                backgroundColor: selected ? color : '#94a3b8',
                transition: 'background-color 0.3s',
                zIndex: 20,
                borderRadius: '0 0 20px 20px'
            }}>
                {gender}
            </div>

            {selected && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    padding: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 30
                }}>
                    <Check size={16} strokeWidth={4} color={color} />
                </div>
            )}
        </div>
    </div>
);

export default HeroAntigravity;
