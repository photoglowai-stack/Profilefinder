"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Crown, Sparkles, Lock, ArrowRight,
    Shield, Zap, Star, Clock, X, Infinity as InfinityIcon,
    Search, Eye, Scan, MessageSquare, Heart
} from 'lucide-react';
import { getPaymentConfig, SUBSCRIPTION_CONFIG } from './paymentConfig';

interface PricingSelectorProps {
    serviceId: string;
    onPlanSelect: (planType: 'subscription' | 'single') => void;
    selectedPlan: 'subscription' | 'single';
}

/**
 * PricingSelector - Aggressive Decoy Effect Design
 * Subscription is the HERO (70% visual attention)
 * Single Report is the DECOY (dimmed, less attractive)
 */
export function PricingSelector({ serviceId, onPlanSelect, selectedPlan }: PricingSelectorProps) {
    const serviceConfig = getPaymentConfig(serviceId);
    const isSubscriptionSelected = selectedPlan === 'subscription';

    // Service icons for the features list
    const serviceIcons = [
        { icon: Scan, name: 'Face Trace', desc: 'Reverse image search' },
        { icon: Heart, name: 'Dating Search', desc: 'Find hidden profiles' },
        { icon: Eye, name: 'Instagram AI', desc: 'Activity monitoring' },
        { icon: Search, name: 'Fidelity Check', desc: 'Partner detection' },
        { icon: MessageSquare, name: 'Chat Analysis', desc: 'AI conversation insights' },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="text-center mb-2">
                <h2 className="text-xl font-black text-gray-900 mb-1">Unlock Your Results</h2>
                <p className="text-sm text-gray-500">Choose how you want to access</p>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                OPTION A: SUBSCRIPTION - THE HERO (70% visual attention)
            ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                onClick={() => onPlanSelect('subscription')}
                animate={{
                    scale: isSubscriptionSelected ? 1.02 : 1,
                    y: isSubscriptionSelected ? -4 : 0,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '1.25rem',
                    overflow: 'visible',
                }}
            >
                {/* NEON GLOW BORDER */}
                <div style={{
                    position: 'absolute',
                    inset: '-3px',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #8b5cf6)',
                    borderRadius: '1.35rem',
                    opacity: isSubscriptionSelected ? 1 : 0.6,
                    filter: isSubscriptionSelected ? 'blur(0px)' : 'blur(1px)',
                    transition: 'all 0.3s ease',
                }} />

                {/* ANIMATED GLOW EFFECT */}
                <motion.div
                    animate={{
                        boxShadow: isSubscriptionSelected
                            ? ['0 0 20px rgba(139,92,246,0.4)', '0 0 40px rgba(139,92,246,0.6)', '0 0 20px rgba(139,92,246,0.4)']
                            : '0 0 15px rgba(139,92,246,0.2)',
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '1.35rem',
                    }}
                />

                {/* CARD CONTENT */}
                <div style={{
                    position: 'relative',
                    background: isSubscriptionSelected
                        ? 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
                        : '#ffffff',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    border: '2px solid transparent',
                }}>
                    {/* FLOATING BADGE - "MEILLEURE OFFRE" */}
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        color: 'white',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 15px rgba(245,158,11,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        <Crown style={{ width: '12px', height: '12px' }} />
                        Meilleure Offre
                    </div>

                    {/* Selection Radio */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isSubscriptionSelected
                            ? 'linear-gradient(135deg, #8b5cf6, #a855f7)'
                            : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: isSubscriptionSelected ? '0 4px 10px rgba(139,92,246,0.4)' : 'none',
                    }}>
                        {isSubscriptionSelected && <Check style={{ width: '14px', height: '14px', color: 'white' }} />}
                    </div>

                    {/* Header */}
                    <div style={{ marginTop: '0.5rem', marginLeft: '2.5rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <InfinityIcon style={{ width: '1.25rem', height: '1.25rem', color: '#8b5cf6' }} />
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 900,
                                color: '#1f2937',
                                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                All-Access Pass
                            </h3>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                            Déblocage total • Tous les outils • Sans limite
                        </p>
                    </div>

                    {/* Price */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        marginLeft: '2.5rem',
                    }}>
                        <span style={{
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            color: '#8b5cf6',
                            lineHeight: 1,
                        }}>
                            19,99€
                        </span>
                        <span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 500 }}>/mois</span>
                        <div style={{
                            marginLeft: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <span style={{
                                fontSize: '0.875rem',
                                color: '#9ca3af',
                                textDecoration: 'line-through'
                            }}>39,99€</span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#16a34a',
                                background: '#dcfce7',
                                padding: '2px 8px',
                                borderRadius: '4px',
                            }}>-50%</span>
                        </div>
                    </div>

                    {/* Features Grid - All Services */}
                    <div style={{
                        background: 'linear-gradient(135deg, #faf5ff, #fdf4ff)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '1rem',
                        border: '1px solid #e9d5ff',
                    }}>
                        <div style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: '#8b5cf6',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '0.75rem',
                        }}>
                            ✨ Inclus dans votre accès
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                            {serviceIcons.map((service, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    background: 'white',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{
                                        width: '1.75rem',
                                        height: '1.75rem',
                                        borderRadius: '0.375rem',
                                        background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <service.icon style={{ width: '0.875rem', height: '0.875rem', color: 'white' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1f2937' }}>
                                            {service.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits List */}
                    <div style={{ marginBottom: '1rem' }}>
                        {[
                            'Recherches ILLIMITÉES',
                            'Résultats instantanés',
                            'Support prioritaire 24/7',
                            'Annulation à tout moment',
                        ].map((benefit, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.375rem',
                            }}>
                                <div style={{
                                    width: '1.125rem',
                                    height: '1.125rem',
                                    borderRadius: '50%',
                                    background: '#dcfce7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Check style={{ width: '0.75rem', height: '0.75rem', color: '#16a34a' }} />
                                </div>
                                <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: 500 }}>
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: isSubscriptionSelected
                                ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                : 'linear-gradient(135deg, #9ca3af, #6b7280)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: isSubscriptionSelected
                                ? '0 10px 25px rgba(139,92,246,0.4)'
                                : '0 4px 10px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Sparkles style={{ width: '1.125rem', height: '1.125rem' }} />
                        Débloquer tout maintenant
                        <ArrowRight style={{ width: '1.125rem', height: '1.125rem' }} />
                    </motion.button>

                    {/* Trust Badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        background: '#f0fdf4',
                        borderRadius: '0.5rem',
                        border: '1px solid #bbf7d0',
                    }}>
                        <Shield style={{ width: '0.875rem', height: '0.875rem', color: '#16a34a' }} />
                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#166534' }}>
                            500,000+ utilisateurs • Satisfait ou remboursé
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Divider */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                margin: '0.5rem 0',
            }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                <span style={{ fontSize: '0.6875rem', color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase' }}>
                    ou
                </span>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                OPTION B: SINGLE REPORT - THE DECOY (dimmed, less attractive)
            ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                onClick={() => onPlanSelect('single')}
                animate={{
                    scale: !isSubscriptionSelected ? 1.01 : 1,
                    opacity: isSubscriptionSelected ? 0.65 : 1,
                }}
                whileHover={{ opacity: 0.85, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    background: '#f9fafb',
                    borderRadius: '1rem',
                    padding: '1rem',
                    border: !isSubscriptionSelected ? '2px solid #9ca3af' : '2px dashed #d1d5db',
                }}
            >
                {/* Selection Radio */}
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: !isSubscriptionSelected ? '#6b7280' : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                }}>
                    {!isSubscriptionSelected && <Check style={{ width: '12px', height: '12px', color: 'white' }} />}
                </div>

                <div style={{ marginLeft: '2rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h4 style={{
                                fontSize: '0.9375rem',
                                fontWeight: 700,
                                color: '#4b5563',
                                marginBottom: '0.125rem',
                            }}>
                                {serviceConfig.singleReportName}
                            </h4>
                            <p style={{ fontSize: '0.6875rem', color: '#9ca3af' }}>
                                Paiement unique • 1 seul rapport
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4b5563' }}>
                                {serviceConfig.singleReportPrice}€
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                                {serviceConfig.singleReportOriginalPrice}€
                            </div>
                        </div>
                    </div>

                    {/* Limitations Warning */}
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.625rem',
                        background: '#fef2f2',
                        borderRadius: '0.5rem',
                        border: '1px solid #fecaca',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            {[
                                `Uniquement ${serviceConfig.title}`,
                                'Pas d\'accès aux autres outils',
                                'Validité 24h uniquement',
                            ].map((limitation, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                }}>
                                    <X style={{ width: '0.75rem', height: '0.75rem', color: '#ef4444' }} />
                                    <span style={{ fontSize: '0.6875rem', color: '#7f1d1d' }}>
                                        {limitation}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Limited timer */}
                    <div style={{
                        marginTop: '0.625rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.375rem 0.625rem',
                            background: '#fef3c7',
                            borderRadius: '0.375rem',
                            border: '1px solid #fcd34d',
                        }}>
                            <Clock style={{ width: '0.75rem', height: '0.75rem', color: '#d97706' }} />
                            <span style={{ fontSize: '0.625rem', fontWeight: 600, color: '#92400e' }}>
                                Offre limitée
                            </span>
                        </div>

                        {!isSubscriptionSelected && (
                            <button style={{
                                padding: '0.5rem 1rem',
                                background: '#4b5563',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                            }}>
                                Continuer <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Upsell message when Single is selected */}
            <AnimatePresence>
                {!isSubscriptionSelected && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                            border: '1px solid #fcd34d',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            display: 'flex',
                            gap: '0.75rem',
                        }}>
                            <div style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                background: '#fde68a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <Star style={{ width: '1.25rem', height: '1.25rem', color: '#d97706' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#92400e', marginBottom: '0.25rem' }}>
                                    💡 Économisez 40% avec All-Access !
                                </p>
                                <p style={{ fontSize: '0.6875rem', color: '#a16207', lineHeight: 1.4 }}>
                                    Pour seulement 5€ de plus, accédez aux 5 services en illimité au lieu d'un seul rapport.
                                </p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onPlanSelect('subscription'); }}
                                    style={{
                                        marginTop: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        color: '#8b5cf6',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        padding: 0,
                                    }}
                                >
                                    Passer à All-Access →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default PricingSelector;
