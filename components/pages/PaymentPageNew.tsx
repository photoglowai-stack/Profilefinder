"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useService } from '@/lib/ServiceContext';
import {
    getPaymentConfig,
    SUBSCRIPTION_CONFIG,
    getStripePrice,
    getSuccessUrl
} from '@/components/payment/paymentConfig';
import { PricingSelector } from '@/components/payment/PricingSelector';
import { DatingResultsPreview } from '@/components/ui/DatingResultsPreview';
import { FaceTraceResultsPreview } from '@/components/ui/FaceTraceResultsPreview';
import { FidelityCheckResultsPreview } from '@/components/ui/FidelityCheckResultsPreview';
import { ChatAnalysisResultsPreview } from '@/components/ui/ChatAnalysisResultsPreview';
import { FollowingResultsPreview } from '@/components/ui/FollowingResultsPreview';

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
        if (typeof window === 'undefined') return;
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
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
    }, []);

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
        const particlesCount = 100;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 12; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.03, color: 0xffffff, transparent: true, opacity: 0.5 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        const animate = () => { requestAnimationFrame(animate); particlesMesh.rotation.y += 0.0008; renderer.render(scene, camera); };
        animate();

        const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.innerHTML = ''; };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }} />;
};

// Service-specific preview components
const PreviewComponents: Record<string, React.ComponentType> = {
    dating: DatingResultsPreview,
    faceTrace: FaceTraceResultsPreview,
    fidelity: FidelityCheckResultsPreview,
    chatAnalysis: ChatAnalysisResultsPreview,
    following: FollowingResultsPreview,
};

// Get gradient based on service
const getServiceGradient = (service: string): string => {
    const gradients: Record<string, string> = {
        dating: 'linear-gradient(135deg, #f43f5e, #f97316)',
        faceTrace: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        following: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        fidelity: 'linear-gradient(135deg, #dc2626, #f97316)',
        chatAnalysis: 'linear-gradient(135deg, #a855f7, #ec4899)',
    };
    return gradients[service] || gradients.dating;
};

// Map URL path segments to service IDs
const pathToServiceId: Record<string, string> = {
    'facetrace': 'faceTrace',
    'fidelity': 'fidelity',
    'chat-analysis': 'chatAnalysis',
    'instagram': 'following',
    'dating': 'dating',
};

export function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { searchTarget, selectedService } = useService();

    // Get service from URL path, query params, or context
    const getServiceFromPath = (): string => {
        if (pathname) {
            const segments = pathname.split('/');
            const lastSegment = segments[segments.length - 1];
            if (pathToServiceId[lastSegment]) {
                return pathToServiceId[lastSegment];
            }
        }
        return '';
    };

    const urlService = searchParams?.get('service') ?? null;
    const pathService = getServiceFromPath();
    const activeService = pathService || urlService || selectedService || 'dating';
    const config = getPaymentConfig(activeService);

    // Plan selection state - default to subscription (HERO CHOICE)
    const [selectedPlan, setSelectedPlan] = useState<'subscription' | 'single'>('subscription');
    const [isProcessing, setIsProcessing] = useState(false);

    // Get the preview component for current service
    const PreviewComponent = PreviewComponents[activeService] || DatingResultsPreview;

    /**
     * HANDLE CHECKOUT - Conditional Redirect Logic
     * 
     * Subscription (19.99€) → success_url: /dashboard
     * Single Report → success_url: /results/{service}
     */
    const handleCheckout = async () => {
        setIsProcessing(true);

        // Get Stripe price ID based on selected plan
        const priceId = getStripePrice(activeService, selectedPlan);

        // Determine success URL based on plan type
        let successUrl: string;
        if (selectedPlan === 'subscription') {
            // Subscription → Dashboard Hub
            successUrl = `/payment/success?plan=subscription`;
        } else {
            // Single Report → Specific Results Page
            successUrl = `/payment/success?plan=single&service=${activeService}`;
        }

        // Log for debugging (remove in production)
        console.log('Checkout initiated:', {
            priceId,
            planType: selectedPlan,
            service: activeService,
            successUrl,
            redirectAfterSuccess: selectedPlan === 'subscription' ? '/dashboard' : config.resultPage,
        });

        // TODO: Replace with actual Stripe Checkout Session creation
        // const session = await createCheckoutSession({
        //     priceId,
        //     successUrl: `${window.location.origin}${successUrl}`,
        //     cancelUrl: `${window.location.origin}/payment?service=${activeService}`,
        // });
        // window.location.href = session.url;

        // DEMO: Simulate redirect to success page
        setTimeout(() => {
            router.push(successUrl);
        }, 1500);
    };

    return (
        <>
            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
            `}</style>

            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: getServiceGradient(activeService),
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <WebGLBackground />

                {/* Navigation */}
                <nav className="animate-fade-in" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '16px 24px', maxWidth: '960px', margin: '0 auto',
                    backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: '0 0 20px 20px',
                    position: 'relative', zIndex: 30, color: 'white'
                }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" loading="lazy" style={{ height: '36px', width: 'auto' }} />
                        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>ProfileFinder</span>
                    </a>
                </nav>

                {/* Main Content - Two Columns on Desktop */}
                <div style={{
                    maxWidth: '960px',
                    margin: '1.5rem auto',
                    padding: '0 1rem',
                    position: 'relative',
                    zIndex: 20,
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr)',
                        gap: '1.5rem',
                    }}>
                        {/* Mobile: Preview on top */}
                        <div className="block lg:hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.97)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    padding: '1.25rem',
                                }}
                            >
                                {/* Results Header */}
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <h1 style={{
                                        fontSize: '1.375rem',
                                        fontWeight: 800,
                                        color: '#1f2937',
                                        lineHeight: 1.2,
                                        marginBottom: '0.375rem',
                                    }}>
                                        {config.title}{' '}
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
                                        gap: '0.375rem',
                                        backgroundColor: `${config.accentColors.primary}15`,
                                        color: config.accentColors.primary,
                                        padding: '0.25rem 0.625rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.6875rem',
                                        fontWeight: 700,
                                    }}>
                                        <span style={{
                                            width: '6px', height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: config.accentColors.primary,
                                            animation: 'pulse 2s infinite',
                                        }} />
                                        {config.badgeText}
                                    </div>
                                </div>
                                <PreviewComponent />
                            </motion.div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 400px', gap: '1.5rem', alignItems: 'start' }}>
                            {/* Left: Preview */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.97)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '1.75rem',
                                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    padding: '1.5rem',
                                }}
                            >
                                <div style={{ marginBottom: '1rem' }}>
                                    <h1 style={{
                                        fontSize: '1.625rem',
                                        fontWeight: 800,
                                        color: '#1f2937',
                                        lineHeight: 1.2,
                                        marginBottom: '0.5rem',
                                    }}>
                                        {config.title}{' '}
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
                                            width: '8px', height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: config.accentColors.primary,
                                            animation: 'pulse 2s infinite',
                                        }} />
                                        {config.badgeText}
                                    </div>
                                </div>
                                <PreviewComponent />

                                {/* Trust Footer */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.6875rem',
                                    color: '#6b7280',
                                }}>
                                    <IconShield style={{ width: '1rem', height: '1rem', color: '#22c55e' }} />
                                    <span>Chiffrement SSL 256-bit • Paiement 100% sécurisé</span>
                                </div>
                            </motion.div>

                            {/* Right: Pricing */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.97)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '1.75rem',
                                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    padding: '1.5rem',
                                }}
                            >
                                <PricingSelector
                                    serviceId={activeService}
                                    selectedPlan={selectedPlan}
                                    onPlanSelect={setSelectedPlan}
                                />

                                {/* Pay Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.25rem',
                                        padding: '1rem',
                                        background: selectedPlan === 'subscription'
                                            ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                            : 'linear-gradient(135deg, #4b5563, #374151)',
                                        color: 'white',
                                        borderRadius: '0.875rem',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: isProcessing ? 'wait' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: selectedPlan === 'subscription'
                                            ? '0 12px 30px rgba(139,92,246,0.4)'
                                            : '0 6px 15px rgba(0,0,0,0.15)',
                                        opacity: isProcessing ? 0.7 : 1,
                                        transition: 'all 0.3s ease',
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
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            🔒 Payer {selectedPlan === 'subscription'
                                                ? `${SUBSCRIPTION_CONFIG.price}€/mois`
                                                : `${config.singleReportPrice}€`
                                            }
                                            <IconArrowRight style={{ width: '1rem', height: '1rem' }} />
                                        </>
                                    )}
                                </motion.button>

                                {/* Payment Info */}
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '0.625rem',
                                    color: '#9ca3af',
                                    marginTop: '0.625rem',
                                }}>
                                    {selectedPlan === 'subscription'
                                        ? 'Sans engagement • Annulation en 1 clic • Accès immédiat'
                                        : 'Paiement unique • Accès immédiat aux résultats'
                                    }
                                </p>

                                {/* Payment Logos */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid #f3f4f6',
                                }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" style={{ height: '18px', opacity: 0.4 }} />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '14px', opacity: 0.4 }} />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '18px', opacity: 0.4 }} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Mobile: Pricing below */}
                        <div className="block lg:hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.97)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    padding: '1.25rem',
                                }}
                            >
                                <PricingSelector
                                    serviceId={activeService}
                                    selectedPlan={selectedPlan}
                                    onPlanSelect={setSelectedPlan}
                                />

                                {/* Pay Button - Mobile */}
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: selectedPlan === 'subscription'
                                            ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                            : 'linear-gradient(135deg, #4b5563, #374151)',
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
                                            ? '0 10px 25px rgba(139,92,246,0.35)'
                                            : '0 4px 12px rgba(0,0,0,0.1)',
                                        opacity: isProcessing ? 0.7 : 1,
                                    }}
                                >
                                    {isProcessing ? 'Traitement...' : (
                                        <>
                                            🔒 Payer {selectedPlan === 'subscription'
                                                ? `${SUBSCRIPTION_CONFIG.price}€/mois`
                                                : `${config.singleReportPrice}€`
                                            }
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
