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
}

// Couleurs par défaut (Dating)
const DATING_COLORS = {
    primary: '#f43f5e',
    secondary: '#db2777',
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
    fidelity: { primary: '#ef4444', secondary: '#dc2626', gradient: 'linear-gradient(to right, #ef4444, #dc2626)' },
};

export const PAYMENT_CONFIG: Record<string, Omit<PaymentServiceConfig, 'previewComponent'>> = {
    dating: {
        title: 'Search',
        subtitle: 'Results',
        badgeText: '20+ Matches Found',
        singleReportName: '📋 Single Dating Report',
        accentColors: DATING_COLORS,
    },
    faceTrace: {
        title: 'Face Trace',
        subtitle: 'Results',
        badgeText: '20+ Photos Found',
        singleReportName: '📋 Single Face Trace Report',
        accentColors: FACETRACE_COLORS,
    },
    following: {
        title: 'Following',
        subtitle: 'Analysis',
        badgeText: 'Activity Detected',
        singleReportName: '📋 Single Following Report',
        accentColors: SERVICE_ACCENT_COLORS.following,
    },
    fidelity: {
        title: 'Fidelity',
        subtitle: 'Report',
        badgeText: 'Analysis Complete',
        singleReportName: '📋 Single Fidelity Report',
        accentColors: SERVICE_ACCENT_COLORS.fidelity,
    },
};

export function getPaymentConfig(service: string) {
    return PAYMENT_CONFIG[service] || PAYMENT_CONFIG.dating;
}
