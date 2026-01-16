"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useService } from '@/lib/ServiceContext';
import {
    getPaymentConfig,
    SUBSCRIPTION_CONFIG,
    getStripePrice,
    getSuccessUrl
} from '@/components/payment/paymentConfig';
import { PlanSelector } from '@/components/payment/PlanSelector';
import { DatingResultsPreview } from '@/components/ui/DatingResultsPreview';
import { FaceTraceResultsPreview } from '@/components/ui/FaceTraceResultsPreview';
import { FidelityCheckResultsPreview } from '@/components/ui/FidelityCheckResultsPreview';
import { ChatAnalysisResultsPreview } from '@/components/ui/ChatAnalysisResultsPreview';

// Theme colors
const colors = {
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    green500: '#22c55e',
    green600: '#16a34a',
    white: '#ffffff',
};

// Icons
const IconShield = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const IconArrowRight = ({ style }: { style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

// WebGL Background
const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if ((window as any).THREE) { setLoaded(true); return; }
        const script = document.createElement('script');
        script.src = url; script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
    }, [url]);
    return loaded;
};

const WebGLBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const loaded = useThreeScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReducedMotion || !loaded || !mountRef.current) return;
        const THREE = (window as any).THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.6 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        const animate = () => { requestAnimationFrame(animate); particlesMesh.rotation.y += 0.001; renderer.render(scene, camera); };
        animate();

        const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.innerHTML = ''; };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
};

// Service-specific preview components
const PreviewComponents: Record<string, React.ComponentType> = {
    dating: DatingResultsPreview,
    faceTrace: FaceTraceResultsPreview,
    fidelity: FidelityCheckResultsPreview,
    chatAnalysis: ChatAnalysisResultsPreview,
};

// Get gradient based on service
const getServiceGradient = (service: string): string => {
    const gradients: Record<string, string> = {
        dating: 'linear-gradient(to bottom right, #f43f5e, #f97316)',
        faceTrace: 'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
        following: 'linear-gradient(to bottom right, #8b5cf6, #6366f1)',
        fidelity: 'linear-gradient(to bottom right, #dc2626, #f97316)',
        chatAnalysis: 'linear-gradient(to bottom right, #a855f7, #ec4899)',
    };
    return gradients[service] || gradients.dating;
};

export function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { searchTarget, selectedService } = useService();

    // Get service from URL or context
    const urlService = searchParams?.get('service') ?? null;
    const activeService = urlService || selectedService || 'dating';
    const config = getPaymentConfig(activeService);

    // Plan selection state - default to subscription (hero choice)
    const [selectedPlan, setSelectedPlan] = useState<'subscription' | 'single'>('subscription');
    const [isProcessing, setIsProcessing] = useState(false);

    // Get the preview component for current service
    const PreviewComponent = PreviewComponents[activeService] || DatingResultsPreview;

    // Handle payment
    const handlePayment = async () => {
        setIsProcessing(true);

        // Get Stripe price ID based on selected plan
        const priceId = getStripePrice(activeService, selectedPlan);
        const successUrl = getSuccessUrl(activeService, selectedPlan);

        // TODO: Integrate with Stripe Checkout
        console.log('Processing payment:', {
            priceId,
            planType: selectedPlan,
            service: activeService,
            successUrl,
        });

        // Simulate redirect to success page for demo
        setTimeout(() => {
            router.push(`/payment/success?plan=${selectedPlan}&service=${activeService}`);
        }, 1500);
    };

    return (
        <>
            <style>{`
                @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
                .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
                .animate-scale-in { animation: scale-in 0.5s ease-out; }
            `}</style>

            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: getServiceGradient(activeService),
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <WebGLBackground />

                {/* Navigation */}
                <nav className="animate-fade-in-down" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '16px 24px', maxWidth: '900px', margin: '0 auto',
                    backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.05)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 0 16px 16px',
                    position: 'relative', zIndex: 30, color: 'white'
                }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" loading="lazy" style={{ height: '32px', width: 'auto' }} />
                        <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em' }}>ProfileFinder</span>
                    </a>
                </nav>

                {/* Main Content */}
                <div style={{
                    maxWidth: '900px',
                    margin: '2rem auto',
                    padding: '0 1rem',
                    position: 'relative',
                    zIndex: 20,
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'start',
                    }}>
                        {/* Left Column: Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="animate-scale-in"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '2rem',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                overflow: 'hidden',
                                padding: '1.5rem',
                            }}
                        >
                            {/* Results Header */}
                            <div style={{ marginBottom: '1rem' }}>
                                <h1 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    color: colors.gray800,
                                    lineHeight: 1.2,
                                    marginBottom: '0.5rem',
                                }}>
                                    {config.title} <br />
                                    <span style={{
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        backgroundImage: config.accentColors.gradient,
                                    }}>
                                        {config.subtitle}
                                    </span>
                                </h1>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: `${config.accentColors.primary}15`,
                                    color: config.accentColors.primary,
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                }}>
                                    <span style={{
                                        width: '0.5rem',
                                        height: '0.5rem',
                                        borderRadius: '50%',
                                        backgroundColor: config.accentColors.primary,
                                        animation: 'pulse 2s infinite',
                                    }} />
                                    {config.badgeText}
                                </div>
                            </div>

                            {/* Preview Component */}
                            <PreviewComponent />

                            {/* Trust Footer */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '1rem',
                                padding: '0.75rem',
                                backgroundColor: colors.gray50,
                                borderRadius: '0.75rem',
                                fontSize: '0.75rem',
                                color: colors.gray500,
                            }}>
                                <IconShield style={{ width: '1rem', height: '1rem', color: colors.green500 }} />
                                <span>Secure payment • 256-bit SSL encryption</span>
                            </div>
                        </motion.div>

                        {/* Right Column: Plan Selection */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '2rem',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                overflow: 'hidden',
                                padding: '1.5rem',
                            }}
                        >
                            {/* Plan Selector */}
                            <PlanSelector
                                serviceId={activeService}
                                selectedPlan={selectedPlan}
                                onPlanSelect={setSelectedPlan}
                            />

                            {/* Pay Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePayment}
                                disabled={isProcessing}
                                style={{
                                    width: '100%',
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: selectedPlan === 'subscription'
                                        ? 'linear-gradient(to right, #4f46e5, #7c3aed)'
                                        : colors.gray700,
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: selectedPlan === 'subscription'
                                        ? '0 10px 30px -5px rgba(79,70,229,0.5)'
                                        : 'none',
                                    opacity: isProcessing ? 0.7 : 1,
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                width: '1.25rem',
                                                height: '1.25rem',
                                                border: '2px solid white',
                                                borderTopColor: 'transparent',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        🔒 Pay {selectedPlan === 'subscription'
                                            ? `${SUBSCRIPTION_CONFIG.price}€/month`
                                            : `${config.singleReportPrice}€`
                                        }
                                        <IconArrowRight style={{ width: '1rem', height: '1rem' }} />
                                    </>
                                )}
                            </motion.button>

                            {/* Payment Info */}
                            <p style={{
                                textAlign: 'center',
                                fontSize: '0.6875rem',
                                color: colors.gray400,
                                marginTop: '0.75rem',
                            }}>
                                {selectedPlan === 'subscription'
                                    ? 'Cancel anytime • No commitment • Instant access'
                                    : 'One-time payment • Instant access to results'
                                }
                            </p>

                            {/* Secure Footer */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginTop: '1rem',
                                paddingTop: '1rem',
                                borderTop: `1px solid ${colors.gray100}`,
                            }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" style={{ height: '20px', opacity: 0.5 }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '16px', opacity: 0.5 }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '20px', opacity: 0.5 }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
