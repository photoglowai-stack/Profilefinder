"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Crown, Sparkles, Lock, ArrowRight,
    Shield, Zap, Star, Clock, Infinity
} from 'lucide-react';
import { getPaymentConfig, SUBSCRIPTION_CONFIG } from './paymentConfig';

interface PlanSelectorProps {
    serviceId: string;
    onPlanSelect: (planType: 'subscription' | 'single') => void;
    selectedPlan: 'subscription' | 'single';
}

export function PlanSelector({ serviceId, onPlanSelect, selectedPlan }: PlanSelectorProps) {
    const serviceConfig = getPaymentConfig(serviceId);
    const [isHoveringSubscription, setIsHoveringSubscription] = useState(false);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Choose Your Plan</h2>
                <p className="text-sm text-gray-500">Unlock your results instantly</p>
            </div>

            {/* OPTION A: Subscription - Hero Choice */}
            <motion.div
                onClick={() => onPlanSelect('subscription')}
                onMouseEnter={() => setIsHoveringSubscription(true)}
                onMouseLeave={() => setIsHoveringSubscription(false)}
                animate={{
                    scale: selectedPlan === 'subscription' ? 1.02 : 1,
                    y: isHoveringSubscription ? -4 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${selectedPlan === 'subscription'
                        ? 'ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/20'
                        : 'shadow-lg hover:shadow-xl'
                    }`}
            >
                {/* Animated Border Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl transition-opacity duration-300 ${selectedPlan === 'subscription' ? 'opacity-100' : 'opacity-60'
                    }`} style={{ padding: '2px' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-sm animate-pulse" />
                </div>

                {/* Card Content */}
                <div className="relative bg-white m-[2px] rounded-[14px] p-5">
                    {/* Badges */}
                    <div className="absolute -top-0 -right-0">
                        <div className="flex gap-1">
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                BEST VALUE
                            </span>
                        </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className={`absolute top-5 left-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === 'subscription'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent'
                            : 'border-gray-300 bg-white'
                        }`}>
                        {selectedPlan === 'subscription' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                            >
                                <Check className="w-4 h-4 text-white" />
                            </motion.div>
                        )}
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-start mt-6 mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Infinity className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-xl font-black text-gray-900">Premium All-Access</h3>
                            </div>
                            <p className="text-sm text-gray-500">Unlimited access to ALL services</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-indigo-600">{SUBSCRIPTION_CONFIG.price}€</span>
                                <span className="text-sm text-gray-400">/mo</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-sm text-gray-400 line-through">{SUBSCRIPTION_CONFIG.originalPrice}€</span>
                                <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">-50%</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {SUBSCRIPTION_CONFIG.features.slice(0, 6).map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-2 text-sm bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-lg px-3 py-2"
                            >
                                <Check className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-medium text-xs leading-tight">{feature.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-green-50 rounded-full border border-green-100 mb-3">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-semibold text-green-700">500,000+ trusted users • Cancel anytime</span>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${selectedPlan === 'subscription'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30'
                                : 'bg-gray-300'
                            }`}
                    >
                        <Sparkles className="w-5 h-5" />
                        {selectedPlan === 'subscription' ? 'Continue with Premium' : 'Select Premium'}
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* OPTION B: Single Report - Basic Choice */}
            <motion.div
                onClick={() => onPlanSelect('single')}
                animate={{
                    scale: selectedPlan === 'single' ? 1.01 : 1,
                    opacity: selectedPlan === 'single' ? 1 : 0.75,
                }}
                transition={{ duration: 0.3 }}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${selectedPlan === 'single'
                        ? 'ring-2 ring-gray-400 shadow-lg'
                        : 'border-2 border-dashed border-gray-200 hover:border-gray-300'
                    }`}
            >
                <div className="bg-gray-50/80 p-4">
                    {/* Selection Indicator */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === 'single'
                                    ? 'bg-gray-700 border-transparent'
                                    : 'border-gray-300 bg-white'
                                }`}>
                                {selectedPlan === 'single' && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check className="w-3 h-3 text-white" />
                                    </motion.div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{serviceConfig.singleReportName}</h3>
                                <p className="text-xs text-gray-500">{serviceConfig.singleReportDescription}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-gray-800">{serviceConfig.singleReportPrice}€</div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-400 line-through">{serviceConfig.singleReportOriginalPrice}€</span>
                                <span className="text-[10px] font-bold text-green-600">-50%</span>
                            </div>
                            <span className="text-[10px] text-gray-400">one-time</span>
                        </div>
                    </div>

                    {/* Limited access warning */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Only includes {serviceConfig.title} • Other services locked</span>
                    </div>

                    {/* Timer */}
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-orange-600 font-medium">Limited offer expires soon</span>
                        </div>
                        {selectedPlan === 'single' && (
                            <button className="px-4 py-2 bg-gray-700 text-white text-sm font-bold rounded-lg flex items-center gap-1">
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Upgrade Incentive */}
            <AnimatePresence>
                {selectedPlan === 'single' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 rounded-full p-2">
                                <Star className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-amber-800">Save 40% with Premium!</p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                    Get unlimited access to ALL 5 services for just 5€ more per month.
                                </p>
                                <button
                                    onClick={() => onPlanSelect('subscription')}
                                    className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                                >
                                    Switch to Premium →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default PlanSelector;
