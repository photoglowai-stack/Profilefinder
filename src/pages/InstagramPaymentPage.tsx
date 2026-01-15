import { useState, useEffect, useRef } from 'react';
import {
    Heart,
    Lock,
    Eye,
    ShieldCheck,
    Clock,
    ArrowRight,
    Shield,
    Check,
    AlertTriangle,
    Activity,
    ChevronRight,
    X,
    AlertOctagon,
    UserPlus,
    Users,
    TrendingUp
} from 'lucide-react';

// --- COMPONENT: INSTAGRAM ACTIVITY PREVIEW ---
function ActivityAnalysisPreview() {
    const [showReport, setShowReport] = useState(false);

    // Simulated profile/list screenshots
    const evidenceScreenshots = [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=500&fit=crop", // Instagram interface style
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=300&h=500&fit=crop",
        "https://images.unsplash.com/photo-1516251193000-18e658706d77?w=300&h=500&fit=crop",
        "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=300&h=500&fit=crop",
    ];

    // The first item is a custom "Card" showing specific activity, not just an image
    const otherEvidence = evidenceScreenshots;

    return (
        <div className="p-4 bg-gradient-to-br from-[#fff5f5] to-[#fff0f5] relative overflow-hidden rounded-xl border border-pink-100 mb-6">
            {/* Header Widget */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-pink-500/20">
                    <Activity className="w-3.5 h-3.5 text-white" />
                    <span>Activity Detected</span>
                </div>
                <div className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold text-[#ff4e71] border border-[#ffe4e9] flex items-center shadow-sm">
                    <UserPlus className="w-3 h-3 mr-1 text-orange-500" />
                    5 New Follows
                </div>
            </div>

            {/* HORIZONTAL SCROLL LINE */}
            <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2 select-none scrollbar-hide snap-x items-stretch">

                {/* 1. CLEAR ACTIVITY CARD (The "Hook") */}
                <div
                    className="relative flex-shrink-0 w-44 sm:w-48 rounded-xl overflow-hidden bg-white border-2 border-red-100 shadow-md snap-start group cursor-pointer transition-transform active:scale-95 flex flex-col"
                    onClick={() => setShowReport(true)}
                >
                    {/* Header: Target Profile */}
                    <div className="bg-gray-50 p-2.5 border-b border-gray-100 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-full h-full rounded-full border border-white" alt="Target" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-gray-800">@target_user</span>
                            <span className="text-[8px] text-green-600 font-medium flex items-center gap-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online Now
                            </span>
                        </div>
                    </div>

                    {/* Activity List */}
                    <div className="p-3 bg-white flex-grow space-y-2.5">
                        {/* Event 1 */}
                        <div className="flex items-start gap-2">
                            <div className="mt-0.5 bg-blue-50 p-1 rounded-md text-blue-600">
                                <UserPlus className="w-3 h-3" />
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-700 leading-tight">
                                    Started following <span className="font-bold">@sarah_99</span> + 2 others.
                                </p>
                                <span className="text-[8px] text-gray-400">2 mins ago</span>
                            </div>
                        </div>
                        {/* Event 2 */}
                        <div className="flex items-start gap-2">
                            <div className="mt-0.5 bg-red-50 p-1 rounded-md text-red-600">
                                <Heart className="w-3 h-3" />
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-700 leading-tight">
                                    Liked 5 posts by <span className="font-bold">@alex_secret</span>.
                                </p>
                                <span className="text-[8px] text-gray-400">15 mins ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="bg-red-50 p-1.5 flex justify-center items-center gap-1 border-t border-red-100">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span className="text-[8px] font-bold text-red-700 uppercase">Suspicious Activity</span>
                    </div>

                    {/* Tap Overlay (Hidden by default, shown on hover/touch hint) */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">View Report</span>
                    </div>
                </div>

                {/* 2. BLURRED FOLLOW LISTS */}
                {otherEvidence.map((src, idx) => (
                    <div
                        key={idx}
                        className="relative flex-shrink-0 w-28 h-48 sm:w-32 sm:h-56 rounded-xl overflow-hidden bg-gray-200 border border-white shadow-sm snap-start"
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={src}
                                alt={`Evidence ${idx}`}
                                className="w-full h-full object-cover blur-[4px] scale-110 opacity-80"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                            <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm mb-1">
                                <Lock className="w-3.5 h-3.5 text-gray-700" />
                            </div>
                            <span className="text-[8px] font-bold text-gray-800 bg-white/90 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-white/50 whitespace-nowrap">
                                Unlock List
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-3 font-medium flex items-center justify-center gap-1">
                <ChevronRight className="w-3 h-3" /> Tap the activity card for details
            </p>

            {/* --- ANALYSIS REPORT MODAL (POPUP) --- */}
            {showReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowReport(false)}>
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white">
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-bold text-sm tracking-wide">Activity Radar Report</span>
                            </div>
                            <button onClick={() => setShowReport(false)} className="text-white/80 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5">

                            {/* Alert Box */}
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-4 flex items-start gap-3">
                                <div className="bg-orange-100 p-1.5 rounded-full shrink-0">
                                    <AlertOctagon className="w-4 h-4 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-orange-700 uppercase mb-0.5">Hidden Interactions Found</h4>
                                    <p className="text-[10px] text-orange-600/80 leading-snug">
                                        The target has recently interacted with 3 accounts that do not follow them back.
                                    </p>
                                </div>
                            </div>

                            {/* Key Findings List */}
                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between items-center text-xs pb-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">New Follows</span>
                                    <span className="font-black text-gray-800">+5 (Last 24h)</span>
                                </div>
                                <div className="flex justify-between items-center text-xs pb-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Like Frequency</span>
                                    <span className="font-bold text-rose-500">High (Night Time)</span>
                                </div>
                                <div className="flex justify-between items-center text-xs pb-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Ghost Followers</span>
                                    <span className="font-bold text-gray-800">12 Detected</span>
                                </div>
                                <div className="flex justify-between items-center text-xs pb-1 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Secret Accounts</span>
                                    <span className="font-bold text-red-600">2 Potential Matches</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setShowReport(false)}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- CONSTANTS & STYLES ---
const AnimationStyles = () => (
    <style>{`
        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
);

// --- HOOKS ---
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
        const particlesCount = 120;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 15;
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.5 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };
        animate();
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) mountRef.current.innerHTML = '';
        };
    }, [loaded, prefersReducedMotion]);

    if (prefersReducedMotion) return null;
    return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
};

// --- MAIN PAGE ---
export default function InstagramPaymentPage() {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes urgency
    const [selectedPlan, setSelectedPlan] = useState<'subscription' | 'single'>('subscription');

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `0${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Features updated for Following/Activity Context
    const features = [
        { name: 'New Follows Tracker', description: 'See who they just started following.', Icon: UserPlus },
        { name: 'Like History', description: 'Reveal liked posts & hidden interactions.', Icon: Heart },
        { name: 'Ghost Follower Detector', description: 'Identify suspicious inactive accounts.', Icon: Users },
        { name: 'Activity Timeline', description: 'Full log of online times & habits.', Icon: Clock },
    ];

    return (
        <>
            <AnimationStyles />
            <div className="min-h-screen w-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden text-gray-800">
                <WebGLBackground />

                {/* Navbar / Header */}
                <nav className="animate-fade-in-down flex items-center justify-center px-6 py-4 max-w-3xl mx-auto mb-6 w-full backdrop-blur-md bg-white/5 border-b border-white/10 rounded-b-2xl relative z-30 text-white">
                    <a href="/" className="flex items-center gap-2 cursor-pointer no-underline text-white hover:opacity-90 transition-opacity">
                        <div style={{ height: '32px', width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <img
                                src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                                alt="ProfileFinder"
                                style={{ height: '100%', width: '100%', objectFit: 'contain', maxHeight: '32px', maxWidth: '32px' }}
                            />
                        </div>
                        <span className="text-lg md:text-xl font-black tracking-tighter drop-shadow-sm">ProfileFinder</span>
                    </a>
                </nav>

                {/* MAIN CARD */}
                <div className="animate-scale-in bg-white/95 backdrop-blur-xl w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative z-20">

                    {/* REPORT SECTION (Top) */}
                    <div className="p-6 pb-2 relative">
                        {/* Title */}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 leading-none tracking-tight">
                                    Instagram <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-500 animate-gradient-xy">
                                        Radar Results
                                    </span>
                                </h1>
                            </div>

                            {/* Score Badge */}
                            <div className="transform hover:scale-105 transition-transform bg-gradient-to-br from-rose-500 to-pink-600 text-white px-4 py-3 rounded-2xl text-center shadow-lg shadow-rose-500/40">
                                <div className="text-[9px] uppercase font-bold tracking-wider opacity-90 mb-0.5">Activity</div>
                                <div className="font-black text-2xl leading-none -tracking-wider">High</div>
                            </div>
                        </div>

                        {/* PREVIEW WIDGET */}
                        <ActivityAnalysisPreview />

                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 border-b border-gray-100 pb-5">
                            <Eye className="w-4 h-4 text-rose-500 animate-pulse" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400">
                                Unlock full activity timeline
                            </span>
                        </div>
                    </div>

                    {/* PRICING SECTION */}
                    <div className="px-6 pb-8 pt-2">

                        {/* 1. SUBSCRIPTION (Recommended) */}
                        <div
                            className={`relative z-10 mt-2 mb-5 transition-all duration-300 cursor-pointer group
                                ${selectedPlan === 'subscription' ? 'transform scale-[1.02]' : 'opacity-90 hover:opacity-100'}
                            `}
                            onClick={() => setSelectedPlan('subscription')}
                        >
                            {/* Glowing Border when selected */}
                            {selectedPlan === 'subscription' && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl opacity-100 blur-[3px] p-[2px] animate-gradient-xy -z-10"></div>
                            )}

                            <div className={`relative bg-white rounded-[0.9rem] p-5 overflow-hidden border-2 transition-all duration-300
                                ${selectedPlan === 'subscription' ? 'border-transparent shadow-xl' : 'border-gray-100 hover:border-indigo-200'}
                            `}>
                                {/* Checkbox Circle */}
                                <div className={`absolute top-4 left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${selectedPlan === 'subscription' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}
                                `}>
                                    {selectedPlan === 'subscription' && <Check className="w-3 h-3 text-white" />}
                                </div>

                                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                                    Best Choice
                                </div>

                                <div className="pl-8 flex justify-between items-center mb-4 mt-1">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 leading-tight">Monthly<br />Tracking</h3>
                                        <p className="text-[10px] text-indigo-600 font-bold bg-indigo-50 inline-block px-2 py-0.5 rounded mt-1">
                                            Real-time Updates & Monitoring
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-indigo-600 -tracking-wide">19.99€</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">/ month</span>
                                    </div>
                                </div>

                                {/* Features List (Expandable) */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${selectedPlan === 'subscription' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-indigo-50/60 rounded-xl p-3 mb-4 flex flex-col gap-3 border border-indigo-100/50">
                                        {features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5">
                                                <div className="mt-0.5 bg-white p-1 rounded-full shadow-sm">
                                                    <feat.Icon className="w-3 h-3 text-indigo-500" />
                                                </div>
                                                <div>
                                                    <div className="text-[13px] font-bold text-gray-900 leading-tight">{feat.name}</div>
                                                    <div className="text-[11px] text-gray-500 leading-tight">{feat.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Social Proof */}
                                    <div className="flex items-center justify-center gap-2 mb-4 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                        <span className="text-[10px] font-bold text-green-700">
                                            Trusted by 100k+ users for clarity
                                        </span>
                                    </div>

                                    <button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-base shadow-lg shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
                                    >
                                        🚀 Start Tracking Now
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                    <p className="text-[9px] text-center text-gray-400 mt-2 font-medium">Cancel anytime easily.</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. ONE-TIME PAYMENT */}
                        <div
                            className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer bg-white group
                                ${selectedPlan === 'single'
                                    ? 'border-2 border-rose-500 shadow-lg scale-[1.01]'
                                    : 'border-2 border-dashed border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-300'}
                            `}
                            onClick={() => setSelectedPlan('single')}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                                    ${selectedPlan === 'single' ? 'border-rose-500 bg-rose-500' : 'border-gray-300'}
                                `}>
                                    {selectedPlan === 'single' && <Check className="w-3 h-3 text-white" />}
                                </div>

                                <div className="flex-grow flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className={`font-bold text-sm transition-colors ${selectedPlan === 'single' ? 'text-gray-900' : 'text-gray-600'}`}>
                                            Single Report
                                        </span>
                                        <span className="text-[10px] text-gray-400">One-time check</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold text-gray-800 text-lg">14.99€</span>
                                        <span className="text-[10px] text-rose-500 line-through font-medium opacity-60">29.90€</span>
                                    </div>
                                </div>
                            </div>

                            {/* Single Action Button (Hidden unless selected) */}
                            <div className={`overflow-hidden transition-all duration-300 ${selectedPlan === 'single' ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <button className="w-full bg-white border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                                    Get 1 Report Only
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Urgency Timer */}
                            <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-100 pt-2">
                                <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded-md text-[9px] font-bold text-rose-600 border border-rose-100">
                                    <Clock className="w-3 h-3 animate-pulse" />
                                    Offer ends in: <span className="font-mono text-[10px]">{formatTime(timeLeft)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Trust */}
                    <div className="bg-gray-50/80 backdrop-blur-md p-3 text-center border-t border-gray-100 text-[9px] text-gray-400 font-medium">
                        <div className="flex items-center justify-center gap-2 mb-1 text-green-600/90">
                            <Shield className="w-3 h-3" /> 256-bit SSL Encrypted Payment
                        </div>
                        <p>Discrete billing. No explicit mention on bank statement.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
