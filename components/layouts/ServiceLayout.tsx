import React from 'react';
import ServiceNavbar from '../ServiceNavbar';
// Footer removed for conversion focus - users should not exit funnel

// ============================================
// SERVICE THEME CONFIGURATION
// ============================================
export type ServiceVariant = 'dating' | 'faceTrace' | 'activity' | 'chat' | 'fidelity' | 'following';

interface ServiceTheme {
    gradient: string;
    accentColor: string;
    accentColorSecondary: string;
    navBg: string;
    footerBg: string;
}

export const SERVICE_THEMES: Record<ServiceVariant, ServiceTheme> = {
    dating: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #FF5E00 0%, #FF085E 35%, #FF004F 60%, #E8003D 100%)',
        accentColor: '#ff4b5c',
        accentColorSecondary: '#ff9e75',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    faceTrace: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #06B6D4 0%, #0EA5E9 35%, #0284C7 60%, #0369A1 100%)',
        accentColor: '#FF6B6B',
        accentColorSecondary: '#FFA502',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    activity: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)',
        accentColor: '#ec4899',
        accentColorSecondary: '#f472b6',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    chat: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)',
        accentColor: '#FF6B6B',
        accentColorSecondary: '#FFA502',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    fidelity: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)',
        accentColor: '#f97316',
        accentColorSecondary: '#fb923c',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    following: {
        gradient: 'radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)',
        accentColor: '#8b5cf6',
        accentColorSecondary: '#a855f7',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    }
};

// ============================================
// SERVICE LAYOUT COMPONENT
// ============================================
interface ServiceLayoutProps {
    variant: ServiceVariant;
    children: React.ReactNode;
    className?: string;
}

export function ServiceLayout({ variant, children, className = '' }: ServiceLayoutProps) {
    const theme = SERVICE_THEMES[variant];

    return (
        <div
            style={{
                minHeight: '100vh',
                background: theme.gradient,
                '--service-accent': theme.accentColor,
                '--service-accent-secondary': theme.accentColorSecondary
            } as React.CSSProperties}
            className={className}
        >
            {/* Minimal Navbar - Logo only for funnel focus */}
            <ServiceNavbar minimal={true} />

            {/* Main Content */}
            {children}

            {/* Footer intentionally removed for conversion optimization */}
        </div>
    );
}

export default ServiceLayout;

