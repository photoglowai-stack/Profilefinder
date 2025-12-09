import { useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
const DatingView = ({
    selected,
    onSelect,
    onSearch,
    isLoading,
}: {
    selected: 'man' | 'woman';
    onSelect: (g: 'man' | 'woman') => void;
    onSearch: () => void;
    isLoading: boolean;
}) => {

    const cardStyle = (isSelected: boolean): CSSProperties => ({
        width: '100px',
        height: '130px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isSelected ? '3px solid #10B981' : '2px solid #e5e7eb',
        boxShadow: isSelected ? '0 8px 20px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease',
        opacity: isSelected ? 1 : 0.75,
        flexShrink: 0,
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            {/* Gender Cards Container */}
            <div style={{ display: 'flex', gap: '16px' }}>
                {/* MAN Card */}
                <div onClick={() => onSelect('man')} style={cardStyle(selected === 'man')}>
                    <div style={{ height: '75%', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
                        <img
                            src="/assets/avatars/widget-man.png"
                            alt="Man"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </div>
                    <div style={{
                        height: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'man' ? '#10B981' : '#EF3E5C',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}>
                        MAN
                    </div>
                </div>

                {/* WOMAN Card */}
                <div onClick={() => onSelect('woman')} style={cardStyle(selected === 'woman')}>
                    <div style={{ height: '75%', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
                        <img
                            src="/assets/avatars/widget-woman.png"
                            alt="Woman"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </div>
                    <div style={{
                        height: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected === 'woman' ? '#10B981' : '#EF3E5C',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}>
                        WOMAN
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <CTAButton
                label={isLoading ? "..." : "SEARCH"}
                onClick={onSearch}
                disabled={isLoading}
            />
        </div>
    );
};

// ============================================
// MAIN WIDGET
// ============================================
export const ServiceFormWidget = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState<'man' | 'woman'>('man');

    const handleAction = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate(`/payment?gender=${selectedGender}&service=dating`);
            setIsLoading(false);
        }, 400);
    };

    return (
        <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
            {/* Card */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                border: '3px solid #EF3E5C',
                boxShadow: '0 20px 50px rgba(239, 62, 92, 0.25)',
                padding: '24px',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <h3 style={{
                        color: '#EF3E5C',
                        fontSize: '15px',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        margin: '0 0 8px 0',
                    }}>
                        WHO ARE YOU LOOKING FOR?
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
                        Choose a gender then launch the dating search to continue to payment.
                    </p>
                </div>

                <DatingView
                    selected={selectedGender}
                    onSelect={setSelectedGender}
                    onSearch={handleAction}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default ServiceFormWidget;
