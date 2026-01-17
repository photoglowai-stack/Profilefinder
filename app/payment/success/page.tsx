"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, Crown, Sparkles, Shield, Gift } from 'lucide-react';
import Link from 'next/link';
import { getPaymentConfig } from '@/components/payment/paymentConfig';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    const planType = searchParams?.get('plan') || 'subscription';
    const serviceId = searchParams?.get('service') || 'dating';
    const serviceConfig = getPaymentConfig(serviceId);

    const isSubscription = planType === 'subscription';
    const redirectUrl = isSubscription ? '/dashboard' : serviceConfig.resultPage;

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push(redirectUrl);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router, redirectUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 max-w-lg w-full"
            >
                {/* Success Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center">
                    {/* Animated Check Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-6 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                        <div className="absolute inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-14 h-14 text-white" />
                        </div>
                        {/* Sparkles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0"
                        >
                            <Sparkles className="absolute -top-2 left-1/2 w-5 h-5 text-yellow-400" />
                            <Sparkles className="absolute top-1/2 -right-2 w-4 h-4 text-yellow-300" />
                            <Sparkles className="absolute -bottom-1 left-1/4 w-4 h-4 text-yellow-400" />
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-black text-white mb-2"
                    >
                        Payment Successful! 🎉
                    </motion.h1>

                    {/* Plan Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        {isSubscription ? (
                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full px-4 py-2 mx-auto w-fit">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <span className="text-white font-bold">Premium All-Access Activated</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-full px-4 py-2 mx-auto w-fit">
                                <Gift className="w-5 h-5 text-indigo-400" />
                                <span className="text-white font-medium">{serviceConfig.singleReportName}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-300 mb-6"
                    >
                        {isSubscription
                            ? "Welcome to Premium! You now have unlimited access to all 5 services. Your dashboard is ready."
                            : `Your ${serviceConfig.title} report is ready to view. We're redirecting you to your results...`
                        }
                    </motion.p>

                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-2 text-green-400 text-sm mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        <span>Secure payment processed by Stripe</span>
                    </motion.div>

                    {/* Countdown */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-6"
                    >
                        <p className="text-gray-400 text-sm mb-2">
                            Redirecting in <span className="text-white font-bold">{countdown}</span> seconds...
                        </p>
                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 5, ease: 'linear' }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            />
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link
                            href={redirectUrl}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
                        >
                            {isSubscription ? (
                                <>
                                    <Crown className="w-5 h-5" />
                                    Go to Dashboard
                                </>
                            ) : (
                                <>
                                    View Results
                                </>
                            )}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Receipt Link */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-gray-500 text-xs mt-4"
                    >
                        A receipt has been sent to your email.
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
