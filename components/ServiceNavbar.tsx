import { useState, useEffect, useCallback } from 'react';
import { Globe, User, Menu, X, Flame, Instagram, ScanFace, MessageSquare } from 'lucide-react';

const LOGO_URL = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg";

interface ServiceNavbarProps {
    minimal?: boolean; // When true, shows only logo for funnel focus
}

export default function ServiceNavbar({ minimal = false }: ServiceNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on ESC key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    // Toggle body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => {
            document.body.classList.remove('menu-open');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen, handleKeyDown]);

    const navLinks = ['Search Profile', 'Blog', 'Affiliate Program'];

    const ServiceIcon = ({ type }: { type: 'tinder' | 'instagram' | 'facetrace' | 'message' }) => {
        const className = "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_18px_rgba(0,0,0,0.22)]";
        if (type === 'tinder') {
            return <span className={className} style={{ background: 'linear-gradient(135deg,#ff4458,#ff6b2c)' }}><Flame size={20} fill="white" color="white" /></span>;
        }
        if (type === 'instagram') {
            return <span className={className} style={{ background: 'radial-gradient(circle at 30% 105%, #feda75 0%, #fa7e1e 28%, #d62976 58%, #962fbf 78%, #4f5bd5 100%)' }}><Instagram size={20} color="white" strokeWidth={2.4} /></span>;
        }
        if (type === 'facetrace') {
            return <span className={className} style={{ background: 'linear-gradient(135deg,#075985,#0ea5e9)' }}><ScanFace size={21} color="white" strokeWidth={2.4} /></span>;
        }
        return <span className={className} style={{ background: 'linear-gradient(135deg,#34c759,#0a8f3d)' }}><MessageSquare size={20} fill="white" color="white" strokeWidth={2.2} /></span>;
    };

    // Minimal mode: Logo only for conversion-focused pages
    if (minimal) {
        return (
            <nav className="flex items-center justify-center px-4 md:px-6 py-4 max-w-[1280px] mx-auto w-full backdrop-blur-md bg-white/5 border-b border-white/10 rounded-b-2xl mt-2 relative text-white">
                <a
                    href="/"
                    className="flex items-center gap-2 cursor-pointer no-underline text-white"
                    aria-label="ProfileFinder Home"
                >
                    <img
                        src={LOGO_URL}
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
                </a>
            </nav>
        );
    }

    // Full mode: All navigation links
    return (
        <>
            <nav className="flex items-center justify-between px-4 md:px-6 py-4 max-w-[1280px] mx-auto w-full backdrop-blur-md bg-white/5 border-b border-white/10 rounded-b-2xl mt-2 relative text-white">
                {/* Logo */}
                <a
                    href="/"
                    className="flex items-center gap-2 cursor-pointer no-underline text-white"
                    aria-label="ProfileFinder Home"
                >
                    <img
                        src={LOGO_URL}
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
                </a>

                {/* Desktop Navigation Links */}
                <div className="desktop-nav-service hidden md:flex items-center gap-8 font-semibold text-sm">
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href={item === 'Affiliate Program' ? 'https://profilefinder.tolt.io/login' : '#'}
                            className="text-white/80 no-underline transition-colors duration-200 py-2 hover:text-white focus:text-white"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop Right Section */}
                <div className="desktop-nav-service hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-xl font-semibold text-sm">
                        <Globe size={16} aria-hidden="true" />
                        <span>EN</span>
                    </div>
                    <button
                        className="flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="User Profile"
                    >
                        <User size={18} aria-hidden="true" />
                        <span>Profile</span>
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="mobile-menu-btn-service flex md:hidden items-center justify-center w-11 h-11 border border-white/30 bg-white/10 rounded-xl text-white cursor-pointer backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay - Full Screen Scrollable */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="mobile-menu-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation menu"
                >
                    <div className="min-h-screen flex flex-col p-6">
                        {/* Close button */}
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center w-11 h-11 border border-white/20 bg-white/10 rounded-xl text-white cursor-pointer"
                                aria-label="Close menu"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Services Section - AT TOP */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-white/50 mb-3 uppercase tracking-widest px-4">
                                Choose your service
                            </p>
                            <div className="flex flex-col gap-2">
                                {[
	                                    { label: 'Tinder Search', path: '/', icon: 'tinder' as const },
	                                    { label: 'Following AI', path: '/following-ai', icon: 'instagram' as const },
	                                    { label: 'Face Trace', path: '/face-trace', icon: 'facetrace' as const },
	                                    { label: 'Fidelity Test', path: '/fidelity-test', icon: 'message' as const }
                                ].map((service) => (
                                    <a
                                        key={service.label}
                                        href={service.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-white/90 no-underline text-base font-semibold px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
                                        style={{ backgroundColor: 'rgba(239,62,92,0.15)' }}
                                    >
	                                        <ServiceIcon type={service.icon} />
                                        {service.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Other Navigation Links */}
                        <div className="flex flex-col gap-4 flex-1 border-t border-white/10 pt-6">
                            {['Blog', 'Affiliate Program'].map((item) => (
                                <a
                                    key={item}
	                                    href={item === 'Affiliate Program' ? 'https://profilefinder.tolt.io/login' : '#'}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white/90 no-underline text-lg font-semibold px-4 py-3 rounded-xl bg-white/5 transition-all duration-200 hover:bg-white/10"
                                >
                                    {item}
                                </a>
                            ))}

                            {/* Services Section */}
                            <div className="border-t border-white/10 pt-4 mt-2">
                                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/50 mb-3 px-4">Our Services</p>
                                <div className="flex flex-col gap-2">
                                    {[
	                                        { label: 'Dating Search', path: '/', icon: 'tinder' as const },
	                                        { label: 'Following AI', path: '/following-ai', icon: 'instagram' as const },
	                                        { label: 'Face Trace', path: '/face-trace', icon: 'facetrace' as const },
	                                        { label: 'Fidelity Test', path: '/fidelity-test', icon: 'message' as const },
                                    ].map((service) => (
                                        <a
                                            key={service.label}
                                            href={service.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-xl bg-rose-500/15 px-4 py-2.5 text-base font-semibold text-white/90 no-underline transition-all duration-200 hover:bg-rose-500/25"
                                        >
	                                            <ServiceIcon type={service.icon} />
                                            {service.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="border-t border-white/10 pt-6 mt-6 flex gap-3">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/20 bg-transparent text-white text-sm font-semibold cursor-pointer"
                                aria-label="Change language"
                            >
                                <Globe size={18} aria-hidden="true" />
                                EN
                            </button>
                            <button
                                className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl border-none bg-white text-gray-900 text-sm font-bold cursor-pointer"
                                aria-label="User Profile"
                            >
                                <User size={18} aria-hidden="true" />
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
