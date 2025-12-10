import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, ScanFace, ShieldAlert, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useService } from '../lib/ServiceContext';

/**
 * ProfileFinder Widget - Using INLINE STYLES to guarantee dimensions
 */

export type ServiceType = 'dating' | 'following' | 'facetrace' | 'fidelity';

const SERVICES = [
    { id: 'dating' as ServiceType, label: 'Dating', icon: Heart, title: 'WHO ARE YOU LOOKING FOR?' },
    { id: 'following' as ServiceType, label: 'Social AI', icon: Users, title: 'ANALYZE SOCIAL PROFILE' },
    { id: 'facetrace' as ServiceType, label: 'Face', icon: ScanFace, title: 'BIOMETRIC FACE SCAN' },
    { id: 'fidelity' as ServiceType, label: 'Fidelity', icon: ShieldAlert, title: 'PARTNER FIDELITY CHECK' },
];

// ============================================
// TAB BUTTON
// ============================================
const TabButton = ({ active, onClick, icon: Icon, label }: {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 600,
            border: active ? 'none' : '1px solid #e5e7eb',
            backgroundColor: active ? '#EF3E5C' : 'white',
            color: active ? 'white' : '#4b5563',
            cursor: 'pointer',
            transition: 'all 0.2s',
        }}
    >
        <Icon size={16} />
        <span>{label}</span>
    </button>
);

// ============================================
// CTA BUTTON WITH HAND
// ============================================
const CTAButton = ({ label, onClick, disabled }: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}) => (
    <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '16px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            }}
        >
            {label}
        </button>
        <motion.span
            style={{
                position: 'absolute',
                bottom: '-8px',
                right: '-8px',
                fontSize: '28px',
                pointerEvents: 'none',
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
            👆
        </motion.span>
    </div>
);

// ============================================
// DATING VIEW - STRICT INLINE STYLES
// ============================================
const DatingView = ({ onSearch, isLoading }: { onSearch: (g: 'man' | 'woman') => void; isLoading: boolean }) => {
    const [selected, setSelected] = useState<'man' | 'woman'>('man');

    const cardStyle = (isSelected: boolean): React.CSSProperties => ({
        width: '90px',
        height: '115px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isSelected ? '2px solid #10B981' : '2px solid #cbd5e1',
        boxShadow: isSelected ? '0 8px 20px rgba(16, 185, 129, 0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease',
        opacity: isSelected ? 1 : 0.85,
        flexShrink: 0,
        position: 'relative',
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            {/* Gender Cards Container */}
            <div style={{ display: 'flex', gap: '12px' }}>
                {/* MAN Card */}
                <div onClick={() => setSelected('man')} style={cardStyle(selected === 'man')}>
                    {/* Checkmark */}
                    {selected === 'man' && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4L6 11.5L2.5 8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    <div style={{ height: '70%', backgroundColor: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <img
                            src="/assets/avatars/widget-man.png"
                            alt="Man"
                            style={{
                                width: '110%',
                                height: '110%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                    <div style={{
                        height: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'man' ? '#10B981' : '#94a3b8',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        MAN
                    </div>
                </div>

                {/* WOMAN Card */}
                <div onClick={() => setSelected('woman')} style={cardStyle(selected === 'woman')}>
                    {/* Checkmark */}
                    {selected === 'woman' && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4L6 11.5L2.5 8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    <div style={{ height: '70%', backgroundColor: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <img
                            src="/assets/avatars/widget-woman.png"
                            alt="Woman"
                            style={{
                                width: '110%',
                                height: '110%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                    <div style={{
                        height: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'woman' ? '#10B981' : '#94a3b8',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        WOMAN
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <CTAButton
                label={isLoading ? "..." : "SEARCH"}
                onClick={() => onSearch(selected)}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// SOCIAL AI VIEW
// ============================================
const SocialView = ({ onAnalyze, isLoading }: { onAnalyze: (u: string) => void; isLoading: boolean }) => {
    const [username, setUsername] = useState('');

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #fbbf24, #ef4444, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                }}>
                    <Camera size={20} color="white" />
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    style={{
                        width: '100%',
                        paddingLeft: '64px',
                        paddingRight: '16px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        backgroundColor: '#f9fafb',
                        border: '2px solid #f3f4f6',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontWeight: 500,
                        outline: 'none',
                    }}
                />
            </div>
            <CTAButton
                label={isLoading ? "..." : "ANALYZE"}
                onClick={() => onAnalyze(username)}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// UPLOAD VIEW
// ============================================
const UploadView = ({ icon: Icon, title, subtitle, btnLabel, onAction, isLoading }: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    btnLabel: string;
    onAction: () => void;
    isLoading: boolean;
}) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
        <div
            onClick={onAction}
            style={{
                flex: 1,
                height: '64px',
                border: '2px dashed rgba(239, 62, 92, 0.4)',
                backgroundColor: 'rgba(239, 62, 92, 0.05)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '16px',
                cursor: 'pointer',
            }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                flexShrink: 0,
            }}>
                <Icon size={20} color="#EF3E5C" />
            </div>
            <div>
                <p style={{ fontWeight: 700, color: '#1f2937', margin: 0, fontSize: '14px' }}>{title}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{subtitle}</p>
            </div>
        </div>
        <CTAButton
            label={isLoading ? "..." : btnLabel}
            onClick={onAction}
            disabled={isLoading}
        />
    </div>
);

// ============================================
// MAIN WIDGET
// ============================================
export const ServiceFormWidget = () => {
    const { selectedService, setSelectedService } = useService();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const activeConfig = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

    const handleAction = (path: string) => {
        setIsLoading(true);
        setTimeout(() => {
            navigate(path);
            setIsLoading(false);
        }, 400);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '0 12px',
            boxSizing: 'border-box'
        }}>
            {/* Card - No service tabs */}
            <motion.div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '2px solid #EF3E5C',
                    boxShadow: '0 16px 40px rgba(239, 62, 92, 0.2)',
                    padding: '12px',
                }}
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ boxShadow: '0 20px 50px rgba(239, 62, 92, 0.25)' }}
                transition={{ duration: 0.2 }}
            >
                {/* Title */}
                <h3 style={{
                    color: '#EF3E5C',
                    fontSize: '11px',
                    fontWeight: 800,
                    textAlign: 'center',
                    marginBottom: '10px',
                    letterSpacing: '0.5px',
                }}>
                    {activeConfig.title}
                </h3>

                {/* Content */}
                {selectedService === 'dating' && (
                    <DatingView
                        onSearch={(g) => handleAction(`/payment?gender=${g}&service=dating`)}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'following' && (
                    <SocialView
                        onAnalyze={(u) => handleAction(`/payment?username=${u}&service=following`)}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'facetrace' && (
                    <UploadView
                        icon={Camera}
                        title="Upload Photo"
                        subtitle="JPG/PNG Match"
                        btnLabel="SCAN"
                        onAction={() => handleAction('/payment?service=facetrace')}
                        isLoading={isLoading}
                    />
                )}
                {selectedService === 'fidelity' && (
                    <UploadView
                        icon={MessageCircle}
                        title="Upload Chat"
                        subtitle="Analyze Logs"
                        btnLabel="TEST"
                        onAction={() => handleAction('/payment?service=fidelity')}
                        isLoading={isLoading}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default ServiceFormWidget;
