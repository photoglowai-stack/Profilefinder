"use client";

import { Heart, Users, ScanFace, MessageCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MASCOT_LOGO = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/LOGO%20PROFILEFINDER%20HD%20REALIST.svg";

interface ServiceTab {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
}

const SERVICES: ServiceTab[] = [
    { id: 'dating', label: 'Dating Search', icon: <Heart size={16} />, path: '/payment?service=dating' },
    { id: 'following', label: 'Following AI', icon: <Users size={16} />, path: '/activity-tracker' },
    { id: 'facetrace', label: 'Face Trace', icon: <ScanFace size={16} />, path: '/face-trace' },
    { id: 'fidelity', label: 'Fidelity Test', icon: <MessageCircle size={16} />, path: '/fidelity-test/analysis' },
];

interface ToolHeaderProps {
    activeService?: string;
}

export default function ToolHeader({ activeService }: ToolHeaderProps) {
    const router = useRouter();

    return (
        <div style={{
            padding: '24px 16px 16px'
        }}>
            {/* Top Section - Logo & Status */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                {/* Mascot Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <img
                        src={MASCOT_LOGO}
                        alt="ProfileFinder AI"
                        style={{ height: '80px', width: 'auto' }}
                    />
                </div>

                {/* Title */}
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#111827',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.02em'
                }}>
                    ProfileFinder AI
                </h1>

                {/* Status Badges */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px'
                }}>
                    {/* Online & Ready */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#22c55e',
                        fontSize: '14px',
                        fontWeight: 600
                    }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#22c55e',
                            animation: 'pulse 2s infinite'
                        }}></span>
                        Online & Ready
                    </div>

                    {/* Separator */}
                    <span style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#d1d5db'
                    }}></span>

                    {/* Private Badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#6b7280',
                        fontSize: '14px',
                        fontWeight: 500
                    }}>
                        <ShieldCheck size={16} style={{ color: '#22c55e' }} />
                        Private
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px'
            }}>
                {SERVICES.map((service) => {
                    const isActive = activeService === service.id;
                    return (
                        <button
                            key={service.id}
                            onClick={() => router.push(service.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 20px',
                                borderRadius: '9999px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                backgroundColor: isActive ? '#10b981' : 'white',
                                color: isActive ? 'white' : '#374151',
                                boxShadow: isActive
                                    ? '0 4px 12px rgba(16,185,129,0.3)'
                                    : '0 2px 8px rgba(0,0,0,0.08)'
                            }}
                        >
                            {service.icon}
                            {service.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
