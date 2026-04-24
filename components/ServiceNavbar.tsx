import { useState, useEffect, useCallback } from 'react';
import { Globe, User, Menu, X, Heart, Users, ScanFace, ShieldAlert, ArrowRight } from 'lucide-react';

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
    const services = [
        { label: 'Dating Search', path: '/', icon: Heart, bg: 'from-rose-500/30 to-orange-400/25', border: 'border-rose-300/30' },
        { label: 'Following AI', path: '/following-ai', icon: Users, bg: 'from-violet-500/30 to-fuchsia-400/25', border: 'border-violet-300/30' },
        { label: 'Face Trace', path: '/face-trace', icon: ScanFace, bg: 'from-sky-500/30 to-indigo-400/25', border: 'border-sky-300/30' },
        { label: 'Fidelity Test', path: '/fidelity-test', icon: ShieldAlert, bg: 'from-pink-500/30 to-rose-400/25', border: 'border-pink-300/30' },
    ];

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
                            href="#"
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
                    <div className="min-h-screen flex flex-col p-6 text-white">
                        <div className="pointer-events-none absolute -top-20 -left-24 h-56 w-56 rounded-full bg-pink-500/35 blur-3xl" />
                        <div className="pointer-events-none absolute top-1/3 -right-20 h-52 w-52 rounded-full bg-orange-400/30 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-24 left-1/3 h-44 w-44 rounded-full bg-violet-500/25 blur-3xl" />

                        {/* Close button */}
                        <div className="relative z-10 flex justify-between items-center mb-8">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/65 font-semibold">Quick menu</p>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center w-11 h-11 border border-white/20 bg-white/10 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="relative z-10 flex flex-col gap-5 flex-1">
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/60 mb-3 px-2">Services</p>
                                <div className="flex flex-col gap-2.5">
                                    {services.map((service) => {
                                        const Icon = service.icon;
                                        return (
                                            <a
                                                key={service.label}
                                                href={service.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`group flex items-center justify-between rounded-2xl border ${service.border} bg-gradient-to-r ${service.bg} px-4 py-3 no-underline transition-all duration-200 hover:scale-[1.01] hover:border-white/45`}
                                            >
                                                <span className="flex items-center gap-3 text-base font-semibold text-white">
                                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                                        <Icon size={18} aria-hidden="true" />
                                                    </span>
                                                    {service.label}
                                                </span>
                                                <ArrowRight size={18} className="text-white/80 group-hover:translate-x-0.5 transition-transform" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-white/15 pt-4">
                                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/55 mb-3 px-2">Navigation</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {navLinks.map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white/90 no-underline text-base font-semibold px-4 py-3 rounded-xl bg-white/10 border border-white/15 transition-all duration-200 hover:bg-white/20"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="relative z-10 border-t border-white/15 pt-5 mt-5 space-y-3">
                            <a
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl no-underline bg-white text-[#1b1b1f] text-sm font-bold shadow-lg"
                                aria-label="Start a search"
                            >
                                Start a search
                                <ArrowRight size={16} aria-hidden="true" />
                            </a>
                            <div className="flex gap-3">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/20 bg-transparent text-white text-sm font-semibold cursor-pointer"
                                aria-label="Change language"
                            >
                                <Globe size={18} aria-hidden="true" />
                                EN
                            </button>
                            <button
                                className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl border-none bg-white/90 text-gray-900 text-sm font-bold cursor-pointer"
                                aria-label="User Profile"
                            >
                                <User size={18} aria-hidden="true" />
                                Profile
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
