import React from 'react';
import ServiceNavbar from '../ServiceNavbar';
// Footer removed for conversion focus - users should not exit funnel

// ============================================
// SERVICE THEME CONFIGURATION
// ============================================
export type ServiceVariant = 'dating' | 'faceTrace' | 'activity' | 'chat' | 'fidelity';

interface ServiceTheme {
    gradient: string;
    accentColor: string;
    accentColorSecondary: string;
    navBg: string;
    footerBg: string;
}

export const SERVICE_THEMES: Record<ServiceVariant, ServiceTheme> = {
    dating: {
        gradient: 'linear-gradient(135deg, #ff4b5c 0%, #ff6b6b 50%, #ff9e75 100%)',
        accentColor: '#ff4b5c',
        accentColorSecondary: '#ff9e75',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    faceTrace: {
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA502 100%)',
        accentColor: '#FF6B6B',
        accentColorSecondary: '#FFA502',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    activity: {
        gradient: 'linear-gradient(135deg, #ff4b5c 0%, #ff6b6b 50%, #ff9e75 100%)',
        accentColor: '#ec4899',
        accentColorSecondary: '#f472b6',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    chat: {
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA502 100%)',
        accentColor: '#FF6B6B',
        accentColorSecondary: '#FFA502',
        navBg: 'rgba(255,255,255,0.05)',
        footerBg: 'rgba(0,0,0,0.1)'
    },
    fidelity: {
        gradient: 'linear-gradient(135deg, #ff4b5c 0%, #ff6b6b 50%, #ff9e75 100%)',
        accentColor: '#f97316',
        accentColorSecondary: '#fb923c',
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

