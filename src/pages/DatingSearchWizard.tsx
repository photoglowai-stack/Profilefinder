import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, ChevronDown, Check, Lock, UserCircle, MapPin,
    Cloud, Building, Users, Loader2, ArrowRight, Mail
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// ============================================
// TYPES
// ============================================
interface ToastMessage {
    id: number;
    name: string;
    action: string;
    exiting?: boolean;
}

// ============================================
// CONSTANTS
// ============================================
const TOAST_MESSAGES = [
    { name: "Sarah L.", action: "found 2 hidden accounts" },
    { name: "Alex M.", action: "unlocked full history" },
    { name: "Emma K.", action: "discovered a secret profile" }
];

// Page gradient (Dating = red-orange)
const PAGE_GRADIENT = 'linear-gradient(180deg, #F87171 0%, #FBBF24 100%)';

// ============================================
// MAIN COMPONENT
// ============================================
export default function DatingSearchWizard() {
    const navigate = useNavigate();

    // Steps: 1=Name, 2=Age, 3=Location, 4=Loading, 5=Result
    const [currentStep, setCurrentStep] = useState(1);
    const [targetName, setTargetName] = useState('');
    const [targetAge, setTargetAge] = useState('20');
    const [locationInput, setLocationInput] = useState('');
    const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Loading state
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [activeLogs, setActiveLogs] = useState<number[]>([1]);

    // Email gate
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Social proof toasts
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const toastIdRef = useRef(0);

    // Map refs
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    // Search timeout
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ============================================
    // SOCIAL PROOF TOASTS
    // ============================================
    const addToast = useCallback((name: string, action: string) => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, name, action }]);

        // Auto remove after 4s
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 300);
        }, 4000);
    }, []);

    // Start toast cycle
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const msg = TOAST_MESSAGES[index % TOAST_MESSAGES.length];
            addToast(msg.name, msg.action);
            index++;
        }, 6000);

        // First toast after 2s
        const firstTimeout = setTimeout(() => {
            addToast(TOAST_MESSAGES[0].name, TOAST_MESSAGES[0].action);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(firstTimeout);
        };
    }, [addToast]);

    // ============================================
    // STEP NAVIGATION
    // ============================================
    const goToStep = (step: number) => {
        setCurrentStep(step);

        // Initialize map when entering step 3
        if (step === 3) {
            setTimeout(() => initMap(), 200);
        }

        // Start loading animation for step 4
        if (step === 4) {
            startLoading();
        }
    };

    // ============================================
    // MAP INITIALIZATION (Leaflet)
    // ============================================
    const initMap = async () => {
        if (mapRef.current || !mapContainerRef.current) return;

        const L = await import('leaflet');

        mapRef.current = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            boxZoom: false,
            keyboard: false
        }).setView([20, 0], 2);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(mapRef.current);

        // Fix blank map issue
        setTimeout(() => {
            mapRef.current?.invalidateSize();
        }, 100);
    };

    // ============================================
    // LOCATION SEARCH (Nominatim)
    // ============================================
    const handleLocationSearch = (query: string) => {
        setLocationInput(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await res.json();
                if (data.length > 0) {
                    setSuggestions(data.slice(0, 4));
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (err) {
                console.error('Location search error:', err);
            }
        }, 300);
    };

    const selectLocation = async (lat: string, lon: string, name: string) => {
        const simpleName = name.split(',').slice(0, 2).join(',');
        setLocationInput(simpleName);
        setShowSuggestions(false);

        if (mapRef.current) {
            const L = await import('leaflet');

            // Remove existing marker
            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
            }

            // Custom red icon
            const redIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div style='background-color:#EF4444; width:12px; height:12px; border-radius:50%; border:2px solid white; box-shadow:0 0 10px rgba(239,68,68,0.5);'></div>",
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            markerRef.current = L.marker([parseFloat(lat), parseFloat(lon)], { icon: redIcon }).addTo(mapRef.current);

            // Cinematic fly to
            mapRef.current.flyTo([parseFloat(lat), parseFloat(lon)], 12, {
                animate: true,
                duration: 2.5
            });
        }
    };

    // ============================================
    // LOADING ANIMATION
    // ============================================
    const startLoading = () => {
        setLoadingPercent(0);
        setActiveLogs([1]);

        // Activate logs progressively
        setTimeout(() => setActiveLogs(prev => [...prev, 2]), 1000);
        setTimeout(() => setActiveLogs(prev => [...prev, 3]), 2000);

        // Progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            setLoadingPercent(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => goToStep(5), 600);
            }
        }, 30);
    };

    // ============================================
    // FORM SUBMIT
    // ============================================
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            navigate('/payment');
        }, 1000);
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <div style={{ minHeight: '100vh', background: PAGE_GRADIENT }} className="flex items-center justify-center p-4">
            {/* Custom Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap');
                
                .wizard-card { font-family: 'Inter Tight', sans-serif; }
                
                .btn-primary {
                    background: linear-gradient(90deg, #F87171 0%, #EC4899 100%);
                    box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.39);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .btn-primary:active { transform: scale(0.98); box-shadow: none; }
                
                .progress-segment {
                    height: 6px;
                    border-radius: 99px;
                    background-color: #E5E7EB;
                    transition: background-color 0.3s ease;
                }
                .progress-segment.active {
                    background: linear-gradient(90deg, #EF4444, #F59E0B);
                }
                
                .step-content {
                    display: none;
                    animation: fadeIn 0.4s ease-out;
                }
                .step-content.active { display: block; }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .check-circle { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                
                .custom-input {
                    background-color: #E5E7EB;
                    border: none;
                    transition: box-shadow 0.2s;
                }
                .custom-input:focus {
                    background-color: #F3F4F6;
                    box-shadow: 0 0 0 2px #F87171;
                }
                
                .suggestion-item {
                    padding: 12px 16px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #374151;
                    border-bottom: 1px solid #f9fafb;
                    transition: background 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .suggestion-item:hover { background-color: #fff1f2; color: #ef4444; }
                .suggestion-item:last-child { border-bottom: none; }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .toast-enter { animation: slideIn 0.3s ease-out; }
                .toast-exit { animation: slideOut 0.3s ease-in; }
            `}</style>

            {/* Main Card */}
            <div className="wizard-card w-full max-w-[500px] bg-white rounded-3xl shadow-2xl p-6 relative flex flex-col min-h-[500px]">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-extrabold text-black tracking-tight">ProfileFinder</h1>

                    {/* Detective Icon */}
                    <div className="absolute left-1/2 top-6 transform -translate-x-1/2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                            <span className="text-2xl">🕵️‍♂️</span>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">Thinking..</span>
                        <div className="relative">
                            <img
                                src="https://ui-avatars.com/api/?name=User&background=000&color=fff"
                                alt="User"
                                className="w-9 h-9 rounded-full border-2 border-green-500 p-0.5"
                            />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] border border-white">
                                ✔
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {[1, 2, 3, 4].map((seg) => (
                        <div
                            key={seg}
                            className={`progress-segment ${currentStep >= seg ? 'active' : ''}`}
                        />
                    ))}
                </div>

                {/* ==================== STEP 1: NAME ==================== */}
                <div className={`step-content ${currentStep === 1 ? 'active' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">What is his/her name?</h2>

                    <div className="bg-gray-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
                        <span className="text-xl">🕵️</span>
                        <input
                            type="text"
                            value={targetName}
                            onChange={(e) => setTargetName(e.target.value)}
                            placeholder="His/her name"
                            className="bg-transparent w-full outline-none text-gray-700 font-medium placeholder-gray-500 text-lg"
                        />
                    </div>

                    <div className="bg-slate-500 text-white rounded-xl p-3 text-xs mb-8 flex gap-2 items-start shadow-sm">
                        <span className="text-yellow-300 text-base">💡</span>
                        <p className="leading-relaxed opacity-90">Our system detects similar names automatically (like "Alex", "Alek", "Lex")</p>
                    </div>

                    <button
                        onClick={() => goToStep(2)}
                        className="w-full btn-primary text-white font-bold py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 mt-auto hover:shadow-xl"
                    >
                        <Search size={22} />
                        <span>Check if he is on a dating app</span>
                        <ArrowRight size={20} className="ml-1" />
                    </button>
                </div>

                {/* ==================== STEP 2: AGE ==================== */}
                <div className={`step-content ${currentStep === 2 ? 'active' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">What is his/her age?</h2>

                    <div className="relative mb-6">
                        <div className="bg-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-gray-700 font-bold">{targetAge}</span>
                            <ChevronDown size={20} className="text-gray-500" />
                        </div>
                        <select
                            value={targetAge}
                            onChange={(e) => setTargetAge(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                            {Array.from({ length: 13 }, (_, i) => 18 + i).map((age) => (
                                <option key={age} value={age}>{age}{age === 30 ? '+' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-slate-500 text-white rounded-xl p-3 text-xs mb-2 flex gap-2 items-start shadow-sm">
                        <span className="text-yellow-300 text-base">💡</span>
                        <p className="leading-relaxed opacity-90">Our AI analyzes profiles across platforms to estimate age with high accuracy.</p>
                    </div>
                    <div className="bg-slate-500 text-white rounded-xl p-3 text-xs mb-8 flex gap-2 items-center shadow-sm">
                        <div className="bg-green-500 rounded text-[10px] p-0.5">
                            <Check size={12} className="text-white" />
                        </div>
                        <p className="leading-relaxed opacity-90">No account needed. 100% discreet.</p>
                    </div>

                    <button
                        onClick={() => goToStep(3)}
                        className="w-full btn-primary text-white font-bold py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 mt-auto hover:shadow-xl"
                    >
                        <Search size={22} />
                        <span>Check if he is on a dating app</span>
                        <ArrowRight size={20} className="ml-1" />
                    </button>
                </div>

                {/* ==================== STEP 3: LOCATION ==================== */}
                <div className={`step-content ${currentStep === 3 ? 'active' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Where is <span className="text-gray-900">{targetName || 'Target'}</span> right now?
                    </h2>

                    {/* Location Input */}
                    <div className="relative mb-4 z-50">
                        <div className="bg-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                value={locationInput}
                                onChange={(e) => handleLocationSearch(e.target.value)}
                                placeholder="Enter a city (e.g. Paris)"
                                className="bg-transparent w-full outline-none text-gray-600 text-sm placeholder-gray-400 font-medium"
                            />
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white rounded-b-xl shadow-lg border border-gray-100 z-50 max-h-[150px] overflow-y-auto">
                                {suggestions.map((place, idx) => (
                                    <div
                                        key={idx}
                                        className="suggestion-item"
                                        onClick={() => selectLocation(place.lat, place.lon, place.display_name)}
                                    >
                                        <MapPin size={16} className="text-gray-400" />
                                        <span>{place.display_name.split(',').slice(0, 2).join(',')}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Map Container */}
                    <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 mb-4 h-40 relative bg-gray-50">
                        <div ref={mapContainerRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
                        <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-gray-600 shadow-sm z-[400] flex items-center gap-1">
                            <span className="text-green-500">📡</span> Live Sat
                        </div>
                    </div>

                    <div className="bg-slate-500 text-white rounded-xl p-3 text-xs mb-8 flex gap-2 items-center shadow-sm">
                        <span className="text-red-400 text-base">📍</span>
                        <p className="leading-relaxed opacity-90">Find out where he might be using real-time profile data.</p>
                    </div>

                    <button
                        onClick={() => goToStep(4)}
                        className="w-full btn-primary text-white font-bold py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 mt-auto hover:shadow-xl"
                    >
                        <Search size={22} />
                        <span>Start Full Scan</span>
                        <ArrowRight size={20} className="ml-1" />
                    </button>
                </div>

                {/* ==================== STEP 4: LOADING ==================== */}
                <div className={`step-content ${currentStep === 4 ? 'active' : ''} pt-4`}>
                    <div className="flex justify-between items-end mb-2">
                        <h2 className="text-lg font-bold text-pink-600">Scan Finished!</h2>
                        <span className="text-lg font-bold text-gray-900">{loadingPercent}%</span>
                    </div>

                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                        <div
                            className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 transition-all ease-out duration-300"
                            style={{ width: `${loadingPercent}%` }}
                        />
                    </div>

                    <div className="space-y-4">
                        {/* Log 1 */}
                        <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ${!activeLogs.includes(1) ? 'opacity-50' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${activeLogs.includes(1) ? 'bg-green-100 text-green-500' : 'bg-white text-gray-400'}`}>
                                {activeLogs.includes(1) ? <Check size={16} /> : <Cloud size={16} />}
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Fetching database records...</span>
                        </div>

                        {/* Log 2 */}
                        <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ${!activeLogs.includes(2) ? 'opacity-50' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${activeLogs.includes(2) ? 'bg-green-100 text-green-500' : 'bg-white text-gray-400'}`}>
                                {activeLogs.includes(2) ? <Check size={16} /> : <Building size={16} />}
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Filtering Business Accounts...</span>
                        </div>

                        {/* Log 3 */}
                        <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ${!activeLogs.includes(3) ? 'opacity-50' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${activeLogs.includes(3) ? 'bg-green-100 text-green-500' : 'bg-white text-gray-400'}`}>
                                {activeLogs.includes(3) ? <Check size={16} /> : <Users size={16} />}
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Checking Mutual Friends...</span>
                        </div>
                    </div>
                </div>

                {/* ==================== STEP 5: RESULT GATE ==================== */}
                <div className={`step-content ${currentStep === 5 ? 'active' : ''} pt-8 text-center`}>

                    <div className="inline-block relative mb-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center check-circle">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <Check size={24} className="text-white" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Result Ready!</h2>
                    <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                        Analysis complete. We've compiled a secure report with <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">3 key findings</span>.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full border-2 border-green-400 rounded-xl px-4 py-3.5 text-center text-gray-700 outline-none focus:ring-2 focus:ring-green-200 transition-shadow font-medium text-lg placeholder-gray-400"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span>Unlock Report</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="flex justify-center gap-6 mt-8 text-xs font-semibold text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <Lock size={14} className="text-green-500" /> Secure
                        </span>
                        <span className="flex items-center gap-1.5">
                            <UserCircle size={14} className="text-gray-500" /> Private
                        </span>
                    </div>
                </div>
            </div>

            {/* Social Proof Toasts */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 bg-gray-900/95 text-white px-4 py-3 rounded-xl shadow-2xl ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
                        style={{ backdropFilter: 'blur(12px)', minWidth: '250px' }}
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold">{toast.name}</span> {toast.action}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
