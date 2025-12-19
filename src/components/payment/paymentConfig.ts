import { ComponentType } from 'react';

// Types pour la configuration de paiement par service
export interface PaymentServiceConfig {
    previewComponent: ComponentType<{ searchTarget?: string }>;
    title: string;
    subtitle: string;
    badgeText: string;
    singleReportName: string;
    accentColors: {
        primary: string;
        secondary: string;
        gradient: string;
    };
    features?: { name: string; description: string; Icon?: any }[];
}

// Couleurs par défaut (Dating)
const DATING_COLORS = {
    primary: '#f43f5e',
    secondary: '#db2777',
    gradient: 'linear-gradient(to right, #f43f5e, #f97316)',
};

const FIDELITY_COLORS = {
    primary: '#f43f5e', // rose-500
    secondary: '#f97316', // orange-500
    gradient: 'linear-gradient(to right, #f43f5e, #f97316)',
};

const FACETRACE_COLORS = {
    primary: '#ff4e71',
    secondary: '#ff7f66',
    gradient: 'linear-gradient(to right, #ff4e71, #ff7f66)',
};

// Import lazy des composants preview (sera résolu après création)
// Note: Les composants sont importés dans PaymentPage.tsx pour éviter les dépendances circulaires

export const SERVICE_ACCENT_COLORS: Record<string, typeof DATING_COLORS> = {
    dating: DATING_COLORS,
    faceTrace: FACETRACE_COLORS,
    following: { primary: '#8b5cf6', secondary: '#6366f1', gradient: 'linear-gradient(to right, #8b5cf6, #6366f1)' },
    fidelity: FIDELITY_COLORS,
};

export const PAYMENT_CONFIG: Record<string, Omit<PaymentServiceConfig, 'previewComponent'>> = {
    dating: {
        title: 'Search',
        subtitle: 'Results',
        badgeText: '20+ Matches Found',
        singleReportName: '📋 Single Dating Report',
        accentColors: DATING_COLORS,
        features: [
            { name: '💕 Dating App Search', description: 'Unlimited searches across all dating apps' },
            { name: '👀 Following AI', description: 'Daily analysis of Instagram followers' },
            { name: '🔍 Face Trace', description: 'Reverse face search across all platforms' },
            { name: '💔 Cheating Analytics', description: 'Complete reports and real-time alerts' },
        ],
    },
    faceTrace: {
        title: 'Face Trace',
        subtitle: 'Results',
        badgeText: '20+ Photos Found',
        singleReportName: '📋 Single Face Trace Report',
        accentColors: FACETRACE_COLORS,
        features: [
            { name: '🔍 Reverse Face Search', description: 'Find profiles by uploading a photo' },
            { name: '📸 Photo Discovery', description: 'Access hidden photos from all socials' },
            { name: '🌐 Global Coverage', description: 'Searches across 500+ social platforms' },
            { name: '📊 Integrity Report', description: 'Full report on findings and locations' },
        ],
    },
    following: {
        title: 'Following',
        subtitle: 'Analysis',
        badgeText: 'Activity Detected',
        singleReportName: '📋 Single Following Report',
        accentColors: SERVICE_ACCENT_COLORS.following,
        features: [
            { name: '📊 Activity Analysis', description: 'Spots unusual timing & secret contacts' },
            { name: '🕵️ Following Tracker', description: 'Real-time alerts on new interactions' },
            { name: '⚠️ Risk Detection', description: 'Calculates probability of secrecy' },
            { name: '📋 Behavior Report', description: 'Download detailed activity evidence' },
        ],
    },
    fidelity: {
        title: 'Fidelity',
        subtitle: 'Check Results',
        badgeText: 'Analysis Complete',
        singleReportName: '📋 Single Fidelity Report',
        accentColors: FIDELITY_COLORS,
        features: [
            { name: 'Conversation Analysis', description: 'AI detects flirting & hidden meanings.' },
            { name: 'Behavior Patterns', description: 'Spots unusual timing & secret contacts.' },
            { name: 'Risk Assessment', description: 'Calculates probability of unfaithfulness.' },
            { name: 'Full Proof PDF', description: 'Download detailed evidence report.' },
        ],
    },
};

export function getPaymentConfig(service: string) {
    return PAYMENT_CONFIG[service] || PAYMENT_CONFIG.dating;
}
