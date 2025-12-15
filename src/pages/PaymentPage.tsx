import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useService } from '../lib/ServiceContext';
import { TinderResultsPreview } from '../components/ui/TinderResultsPreview';
import {
    FidelityCheckPreview,
    FaceTracePreview,
    InstagramRadarPreview
} from '../components/ui/ServicePreviews';
import {
    Lock,
    CheckCircle2,
    Clock,
    ArrowRight,
    Zap,
    ShieldCheck,
    Star,
    Eye,
    Shield
} from 'lucide-react';

// --- SERVICE CONFIGURATION ---
const SERVICE_DETAILS = {
    dating: {
        title: "Dating App Search",
        description: "Unlimited searches across all dating apps",
        singlePriceLabel: "Single Dating Report"
    },
    following: {
        title: "Following AI",
        description: "Daily analysis of Instagram followers",
        singlePriceLabel: "Single Instagram Audit"
    },
    facetrace: {
        title: "Face Trace",
        description: "Reverse face search across all platforms",
        singlePriceLabel: "Single Face Search"
    },
    fidelity: {
        title: "Cheating Analytics",
        description: "Complete reports and real-time alerts",
        singlePriceLabel: "Single Fidelity Check"
    }
};

// All features included in subscription
const GLOBAL_FEATURES = [
    { name: 'Dating App Search', description: 'Unlimited searches across all dating apps', Icon: Zap },
    { name: 'Following AI', description: 'Daily analysis of Instagram followers', Icon: Eye },
    { name: 'Face Trace', description: 'Reverse face search across all platforms', Icon: ShieldCheck },
    { name: 'Cheating Analytics', description: 'Complete reports and real-time alerts', Icon: Star },
];

// --- WEBGL BACKGROUND ---
const useThreeScript = (url: string) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if ((window as any).THREE) { setLoaded(true); return; }
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
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
        const updateSize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        updateSize();
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 15;
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.4 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            updateSize();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (mountRef.current) mountRef.current.innerHTML = '';
        };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
};

// CSS Animations
const AnimationStyles = () => (
    <style>{`
        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
    `}</style>
);

// --- MAIN COMPONENT ---
export function PaymentPage() {
    const navigate = useNavigate();
    const { selectedService, colors } = useService();
    const [timeLeft, setTimeLeft] = useState(600); // 10 min timer
    const [isHoveringMain, setIsHoveringMain] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `0${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handlePayment = (plan: 'subscription' | 'single') => {
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); navigate('/dashboard'); }, 2000);
    };

    // Dynamic preview based on service
    const renderPreview = () => {
        switch (selectedService) {
            case 'dating': return <TinderResultsPreview />;
            case 'fidelity': return <FidelityCheckPreview />;
            case 'facetrace': return <FaceTracePreview />;
            case 'following': return <InstagramRadarPreview />;
            default: return <TinderResultsPreview />;
        }
    };

    // Get current service info
    const currentInfo = SERVICE_DETAILS[selectedService as keyof typeof SERVICE_DETAILS] || {
        title: colors.name,
        description: "Deep analysis",
        singlePriceLabel: `Single ${colors.name} Report`
    };

    return (
        <>
            <AnimationStyles />
            <div
                className="min-h-screen w-full font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden"
                style={{ background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})` }}
            >
                <WebGLBackground />

                {/* LOCKED CHECKOUT HEADER */}
                <nav className="animate-fade-in-down flex items-center justify-center py-4 px-6 max-w-3xl w-full mx-auto mb-6 bg-white/5 backdrop-blur-md border-b border-white/10 rounded-b-2xl relative z-30 text-white">
                    <span className="text-xl md:text-2xl font-black tracking-tight drop-shadow-md">
                        ProfileFinder
                    </span>
                </nav>

                {/* MAIN CARD */}
                <div className="animate-scale-in w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-20">

                    {/* DYNAMIC PREVIEW SECTION */}
                    <div className="p-4 md:p-6 pb-2 relative">
                        {/* Dynamic Title */}
                        <div className="text-center mb-4">
                            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                Résultats{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
                                >
                                    {currentInfo.title}
                                </span>
                            </h1>
                            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 shadow-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Analyse terminée à 100%
                            </div>
                        </div>

                        {/* Preview Component */}
                        <div className="rounded-2xl overflow-hidden shadow-inner border border-gray-100 bg-gray-50">
                            {renderPreview()}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 border-b border-gray-100 pb-4 mt-4">
                            <Eye className="w-4 h-4 animate-bounce" style={{ color: colors.primary }} />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400">
                                Débloquez pour voir les photos et le rapport
                            </span>
                        </div>
                    </div>

                    {/* PRICING SECTION */}
                    <div className="px-6 pb-8 pt-2">

                        {/* SUBSCRIPTION CARD (MAIN OFFER) */}
                        <div
                            className="relative z-10 mt-2 mb-5 transition-all duration-300"
                            style={{ transform: isHoveringMain ? 'translateY(-4px)' : 'translateY(0)' }}
                            onMouseEnter={() => setIsHoveringMain(true)}
                            onMouseLeave={() => setIsHoveringMain(false)}
                        >
                            {/* Animated border */}
                            <div
                                className="animate-gradient-xy absolute -inset-[2px] rounded-2xl opacity-75 blur-[2px]"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.primary})` }}
                            />

                            <div className="relative bg-white rounded-xl p-5 shadow-xl">
                                {/* Best Value Badge */}
                                <div className="absolute top-0 right-0">
                                    <div className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-lg shadow-sm flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        BEST VALUE
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="flex justify-between items-start mb-4 mt-1">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 leading-none">
                                            Monthly<br />Subscription
                                        </h3>
                                        <p
                                            className="text-[11px] text-white font-bold inline-block px-2 py-0.5 rounded mt-1.5 shadow-sm"
                                            style={{ backgroundColor: colors.primary }}
                                        >
                                            Unlimited access to all tools
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-gray-900 tracking-tighter">
                                            19.99€
                                        </span>
                                        <div className="flex flex-col items-end -mt-1">
                                            <span className="text-xs text-gray-400 font-bold line-through decoration-red-400">49.99€</span>
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded">-60%</span>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">/ month</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="bg-gray-50/80 rounded-xl p-3 mb-4 border border-gray-100 space-y-2.5">
                                    {GLOBAL_FEATURES.map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <div className="p-1 rounded-full bg-white shadow-sm mt-0.5">
                                                <feat.Icon className="w-3 h-3" style={{ color: colors.primary }} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-900 leading-tight">{feat.name}</div>
                                                <div className="text-[10px] text-gray-500 leading-tight mt-0.5">{feat.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Proof */}
                                <div className="flex items-center justify-center gap-2 mb-3 py-1.5 px-3 bg-green-50 rounded-full border border-green-100">
                                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                    <span className="text-[10px] font-bold text-green-700">
                                        🔒 500k+ users trust ProfileFinder
                                    </span>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handlePayment('subscription')}
                                    disabled={isLoading}
                                    className="w-full text-white font-bold py-3.5 px-4 rounded-xl text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                                    style={{ backgroundColor: colors.primary }}
                                >
                                    {isLoading ? "Processing..." : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span className="relative z-10">ACTIVATE NOW</span>
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                                <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                                    No commitment • Cancel anytime
                                </p>
                            </div>
                        </div>

                        {/* OR SEPARATOR */}
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">OR</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* SINGLE REPORT OPTION */}
                        <div
                            onClick={() => handlePayment('single')}
                            className="relative border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl p-4 transition-all duration-300 cursor-pointer bg-white group mt-2"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                                        {currentInfo.singlePriceLabel}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        One-time payment, no subscription
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-800 text-lg group-hover:scale-105 transition-transform">
                                        15.99€
                                    </span>
                                    <span className="text-[10px] text-gray-400 line-through decoration-red-300">
                                        29.99€
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded text-red-600 border border-red-100">
                                    <Clock className="w-3 h-3 animate-pulse" />
                                    <span className="text-[10px] font-bold">
                                        Expires in <span className="font-mono">{formatTime(timeLeft)}</span>
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 flex items-center gap-1">
                                    Select <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="bg-gray-50/80 backdrop-blur-sm p-3 text-center border-t border-gray-100">
                        <div className="flex items-center justify-center gap-1.5 mb-1 text-green-600/80">
                            <Shield className="w-3 h-3" />
                            <span className="text-[10px] font-bold">Secure SSL 256-bit Payment</span>
                        </div>
                        <p className="text-[9px] text-gray-400 m-0 font-medium">
                            Powered by <span className="font-bold text-gray-500">Stripe</span> & <span className="font-bold text-gray-500">React</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
