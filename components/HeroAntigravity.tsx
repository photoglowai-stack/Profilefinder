"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useService } from '../lib/ServiceContext';
import { ServiceType } from '../lib/content';
import {
    Search, Globe, User, Check, Shield, Clock, Menu, X,
    Heart, Users, ScanFace, MessageSquare, Instagram,
    MessageCircle, Fingerprint, TrendingUp, Star,
    UploadCloud, Activity, ArrowRight
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
    const router = useRouter();
    const { selectedService, setSelectedService } = useService();
    const [selectedGender, setSelectedGender] = useState<GenderType>('man');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [faceTraceImage, setFaceTraceImage] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        { id: 'dating' as ServiceType, label: 'Dating Search', icon: <Heart size={20} strokeWidth={2.5} />, path: '/' },
        { id: 'following' as ServiceType, label: 'Following AI', icon: <Users size={20} strokeWidth={2.5} />, path: '/following-ai' },
        { id: 'facetrace' as ServiceType, label: 'Face Trace', icon: <ScanFace size={20} strokeWidth={2.5} />, path: '/face-trace' },
        { id: 'fidelity' as ServiceType, label: 'Fidelity Test', icon: <MessageSquare size={20} strokeWidth={2.5} />, path: '/fidelity-test' },
    ];

    const trendingKeywords = [
        "Pimeyes Alternative", "Reverse Image Search", "Face Search Free", "Instagram Finder", "Tinder Profile Search", "AI Face Recognition"
    ];

    const contentMap: Record<ServiceType, { h1: string; desc: string; instruction: string; cta: string; ctaEmoji: string; buttonIcon: React.ReactNode; buttonBg: string }> = {
        dating: {
            h1: "Find any profile on Tinder with AI Face Search",
            desc: "Uncover your partner's secrets with the #1 Tinder Profile Finder. More accurate than Pimeyes for dating apps.",
            instruction: "WHO ARE YOU LOOKING FOR?",
            cta: "START SEARCH",
            ctaEmoji: "🔍",
            buttonIcon: <Search size={22} strokeWidth={3} />,
            buttonBg: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)"
        },
        following: {
            h1: "Reveal Hidden Instagram Connections",
            desc: "Analyze their entire following list instantly. See who they recently followed and uncover suspicious interactions.",
            instruction: "ENTER TARGET USERNAME",
            cta: "ANALYZE FOLLOWINGS",
            ctaEmoji: "📊",
            buttonIcon: <Instagram size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%)"
        },
        facetrace: {
            h1: "Track Digital Footprint & Web Activity",
            desc: "The ultimate Pimeyes alternative. Find every profile, blog post, and image trace across the entire web.",
            instruction: "UPLOAD PHOTO TO SCAN",
            cta: "START WEB SCAN",
            ctaEmoji: "🌐",
            buttonIcon: <ScanFace size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)"
        },
        fidelity: {
            h1: "Scan Chat Screenshots for Red Flags",
            desc: "Upload screenshots of suspicious conversations (WhatsApp, SMS, Tinder). Our AI detects hidden infidelity signals.",
            instruction: "UPLOAD CHAT SCREENSHOT",
            cta: "ANALYZE CHAT",
            ctaEmoji: "🛡️",
            buttonIcon: <MessageCircle size={22} strokeWidth={2.5} />,
            buttonBg: "linear-gradient(135deg, #9d174d 0%, #be185d 50%, #db2777 100%)"
        }
    };

    const currentContent = contentMap[selectedService];

    // Premium mesh-style radial gradient backgrounds per service (CheatEye inspired)
    const gradientMap: Record<ServiceType, string> = {
        dating: 'radial-gradient(ellipse 150% 80% at 50% 20%, #FF5E00 0%, #FF085E 35%, #FF004F 60%, #E8003D 100%)',
        following: 'radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)',
        facetrace: 'radial-gradient(ellipse 150% 80% at 50% 20%, #06B6D4 0%, #0EA5E9 35%, #0284C7 60%, #0369A1 100%)',
        fidelity: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)'
    };

    // Accent colors per service for consistent theming
    const accentColors: Record<ServiceType, { primary: string; secondary: string; light: string }> = {
        dating: { primary: '#dc2626', secondary: '#ef4444', light: '#fef2f2' },
        following: { primary: '#7c3aed', secondary: '#8b5cf6', light: '#f5f3ff' },
        facetrace: { primary: '#0284c7', secondary: '#0ea5e9', light: '#f0f9ff' },
        fidelity: { primary: '#be185d', secondary: '#db2777', light: '#fdf2f8' }
    };

    const currentAccent = accentColors[selectedService];

    return (
        <section style={{
            width: '100%',
            background: gradientMap[selectedService],
            color: '#ffffff',
            fontFamily: "var(--font-display), 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '80px',
            borderRadius: '0 0 48px 48px',
            transition: 'background 0.5s ease'
        }}>
            {/* Soft white gradient fade at bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.9) 85%, #ffffff 100%)',
                pointerEvents: 'none',
                borderRadius: '0 0 48px 48px'
            }} />

            {/* CSS is now in globals.css - no inline style tag needed */}

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
                position: 'relative',
                zIndex: 50
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

                        {/* Services Section */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '8px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Our Services
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Dating Search', path: '/dating-search/form', icon: '❤️' },
                                    { label: 'Following AI', path: '/following-ai', icon: '👥' },
                                    { label: 'Face Trace', path: '/face-trace', icon: '🔍' },
                                    { label: 'Fidelity Test', path: '/fidelity-test', icon: '🛡️' }
                                ].map((service) => (
                                    <a
                                        key={service.label}
                                        href={service.path}
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            padding: '10px 16px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(239,62,92,0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'all 0.2s'
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{service.icon}</span>
                                        {service.label}
                                    </a>
                                ))}
                            </div>
                        </div>

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
                        fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                        fontWeight: 800,
                        marginBottom: '24px',
                        maxWidth: '900px',
                        margin: '0 auto 24px',
                        lineHeight: 1.0,
                        letterSpacing: '-0.03em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.25)',
                        fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif"
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
                <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Choose your service:
                </p>
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
                            onClick={() => {
                                setSelectedService(service.id);
                                router.push(service.path);
                            }}
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
                                border: selectedService === service.id ? '2px solid #0a0a0a' : '2px solid transparent',
                                backgroundColor: selectedService === service.id ? '#0a0a0a' : '#ffffff',
                                color: selectedService === service.id ? '#ffffff' : '#475569',
                                boxShadow: selectedService === service.id ? '0 6px 16px rgba(10,10,10,0.25)' : '0 2px 6px rgba(0,0,0,0.06)',
                                transform: selectedService === service.id ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
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
                                    color="#ff4b5c"
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
                                onClick={() => {
                                    if (selectedService === 'facetrace') {
                                        if (typeof window !== 'undefined' && faceTraceImage) {
                                            sessionStorage.setItem('pf_facetrace_image', faceTraceImage);
                                        }
                                        router.push('/face-trace');
                                    } else if (selectedService === 'following') {
                                        router.push('/activity-tracker');
                                    } else if (selectedService === 'dating') {
                                        // Scroll to form instead of redirecting (SEO: avoid duplicate content)
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        // Navigate to form wizard
                                        router.push('/dating-search/form');
                                    } else {
                                        router.push('/payment');
                                    }
                                }}
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
                                        {currentContent.cta} {currentContent.ctaEmoji}
                                    </span>
                                    <ArrowRight size={20} strokeWidth={3} />
                                </div>

                                <span
                                    className="finger-point-animate"
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '28px',
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

            {/* Hero Bottom Fade - Smooth transition to next section */}
            <div className="hero-bottom-fade" />

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
            opacity: selected ? 1 : 0.85,
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
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
