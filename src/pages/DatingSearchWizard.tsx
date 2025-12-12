import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, ChevronDown, Check, Lock, UserCircle, MapPin,
    Cloud, Building, Users, Loader2, ArrowRight
} from 'lucide-react';
import ServiceNavbar from '../components/ServiceNavbar';
import { Footer } from '../components/Footer';
import 'leaflet/dist/leaflet.css';
import '../styles/dating-search.css';

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

        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 300);
        }, 4000);
    }, []);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const msg = TOAST_MESSAGES[index % TOAST_MESSAGES.length];
            addToast(msg.name, msg.action);
            index++;
        }, 6000);

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

        if (step === 3) {
            setTimeout(() => initMap(), 200);
        }

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

        setTimeout(() => {
            mapRef.current?.invalidateSize();
        }, 100);
    };

    // ============================================
    // LOCATION SEARCH
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

            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
            }

            const redIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div style='background-color:#EF4444; width:12px; height:12px; border-radius:50%; border:2px solid white; box-shadow:0 0 10px rgba(239,68,68,0.5);'></div>",
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            markerRef.current = L.marker([parseFloat(lat), parseFloat(lon)], { icon: redIcon }).addTo(mapRef.current);

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

        setTimeout(() => setActiveLogs(prev => [...prev, 2]), 1000);
        setTimeout(() => setActiveLogs(prev => [...prev, 3]), 2000);

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
        <div style={{ minHeight: '100vh', background: PAGE_GRADIENT }}>
            <ServiceNavbar />

            <div className="dating-search-wrapper">
                <div className="dating-card">

                    {/* HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>ProfileFinder</h1>

                        {/* Detective Icon */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '24px',
                            transform: 'translateX(-50%)',
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <span style={{ fontSize: '24px' }}>🕵️‍♂️</span>
                        </div>

                        {/* Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>Thinking..</span>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src="https://ui-avatars.com/api/?name=User&background=000&color=fff"
                                    alt="User"
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #22c55e', padding: '2px' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-4px',
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '14px',
                                    height: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '8px',
                                    border: '2px solid white'
                                }}>✔</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '32px' }}>
                        {[1, 2, 3, 4].map((seg) => (
                            <div
                                key={seg}
                                className={`dating-progress-segment ${currentStep >= seg ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    {/* ==================== STEP 1: NAME ==================== */}
                    <div className={`dating-step ${currentStep === 1 ? 'active' : ''}`}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '24px' }}>What is his/her name?</h2>

                        <div className="dating-input-wrapper" style={{ marginBottom: '24px' }}>
                            <span style={{ fontSize: '20px' }}>🕵️</span>
                            <input
                                type="text"
                                value={targetName}
                                onChange={(e) => setTargetName(e.target.value)}
                                placeholder="His/her name"
                            />
                        </div>

                        <div className="dating-info-box" style={{ marginBottom: '32px' }}>
                            <span style={{ fontSize: '16px' }}>💡</span>
                            <p style={{ lineHeight: 1.5, opacity: 0.9 }}>Our system detects similar names automatically (like "Alex", "Alek", "Lex")</p>
                        </div>

                        <button onClick={() => goToStep(2)} className="dating-btn-primary">
                            <Search size={20} />
                            <span>Check if he is on a dating app</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* ==================== STEP 2: AGE ==================== */}
                    <div className={`dating-step ${currentStep === 2 ? 'active' : ''}`}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '24px' }}>What is his/her age?</h2>

                        <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <div className="dating-input-wrapper" style={{ justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 700, color: '#374151' }}>{targetAge}</span>
                                <ChevronDown size={20} style={{ color: '#9ca3af' }} />
                            </div>
                            <select
                                value={targetAge}
                                onChange={(e) => setTargetAge(e.target.value)}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            >
                                {Array.from({ length: 13 }, (_, i) => 18 + i).map((age) => (
                                    <option key={age} value={age}>{age}{age === 30 ? '+' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div className="dating-info-box" style={{ marginBottom: '8px' }}>
                            <span style={{ fontSize: '16px' }}>💡</span>
                            <p style={{ lineHeight: 1.5, opacity: 0.9 }}>Our AI analyzes profiles across platforms to estimate age with high accuracy.</p>
                        </div>
                        <div className="dating-info-box" style={{ marginBottom: '32px' }}>
                            <div style={{ backgroundColor: '#22c55e', borderRadius: '4px', padding: '2px', display: 'flex' }}>
                                <Check size={12} style={{ color: 'white' }} />
                            </div>
                            <p style={{ lineHeight: 1.5, opacity: 0.9 }}>No account needed. 100% discreet.</p>
                        </div>

                        <button onClick={() => goToStep(3)} className="dating-btn-primary">
                            <Search size={20} />
                            <span>Check if he is on a dating app</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* ==================== STEP 3: LOCATION ==================== */}
                    <div className={`dating-step ${currentStep === 3 ? 'active' : ''}`}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                            Where is <span style={{ color: '#111' }}>{targetName || 'Target'}</span> right now?
                        </h2>

                        {/* Location Input */}
                        <div style={{ position: 'relative', marginBottom: '16px', zIndex: 50 }}>
                            <div className="dating-input-wrapper">
                                <Search size={16} style={{ color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    value={locationInput}
                                    onChange={(e) => handleLocationSearch(e.target.value)}
                                    placeholder="Enter a city (e.g. Paris)"
                                    style={{ fontSize: '14px' }}
                                />
                            </div>

                            {showSuggestions && suggestions.length > 0 && (
                                <div className="dating-suggestions">
                                    {suggestions.map((place, idx) => (
                                        <div
                                            key={idx}
                                            className="dating-suggestion-item"
                                            onClick={() => selectLocation(place.lat, place.lon, place.display_name)}
                                        >
                                            <MapPin size={16} style={{ color: '#9ca3af' }} />
                                            <span>{place.display_name.split(',').slice(0, 2).join(',')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Map Container */}
                        <div className="dating-map-container" style={{ marginBottom: '16px' }}>
                            <div ref={mapContainerRef} />
                            <div style={{
                                position: 'absolute',
                                bottom: '8px',
                                right: '8px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#6b7280',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                zIndex: 400
                            }}>
                                <span style={{ color: '#22c55e' }}>📡</span> Live Sat
                            </div>
                        </div>

                        <div className="dating-info-box" style={{ marginBottom: '32px' }}>
                            <span style={{ fontSize: '16px', color: '#ef4444' }}>📍</span>
                            <p style={{ lineHeight: 1.5, opacity: 0.9 }}>Find out where he might be using real-time profile data.</p>
                        </div>

                        <button onClick={() => goToStep(4)} className="dating-btn-primary">
                            <Search size={20} />
                            <span>Start Full Scan</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* ==================== STEP 4: LOADING ==================== */}
                    <div className={`dating-step ${currentStep === 4 ? 'active' : ''}`} style={{ paddingTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ec4899' }}>Scan Finished!</h2>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{loadingPercent}%</span>
                        </div>

                        <div style={{ height: '16px', width: '100%', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden', marginBottom: '32px' }}>
                            <div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(to right, #fb923c, #ec4899, #a855f7)',
                                    transition: 'width 0.3s ease-out',
                                    width: `${loadingPercent}%`
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className={`dating-log-item ${!activeLogs.includes(1) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(1) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(1) ? <Check size={16} /> : <Cloud size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Fetching database records...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(2) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(2) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(2) ? <Check size={16} /> : <Building size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Filtering Business Accounts...</span>
                            </div>

                            <div className={`dating-log-item ${!activeLogs.includes(3) ? 'inactive' : ''}`}>
                                <div className={`dating-log-icon ${activeLogs.includes(3) ? 'done' : 'pending'}`}>
                                    {activeLogs.includes(3) ? <Check size={16} /> : <Users size={16} />}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>Checking Mutual Friends...</span>
                            </div>
                        </div>
                    </div>

                    {/* ==================== STEP 5: RESULT GATE ==================== */}
                    <div className={`dating-step ${currentStep === 5 ? 'active' : ''}`} style={{ paddingTop: '32px', textAlign: 'center', alignItems: 'center' }}>

                        <div className="dating-check-circle" style={{ marginBottom: '16px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#dcfce7',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#22c55e',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                                }}>
                                    <Check size={24} style={{ color: 'white' }} />
                                </div>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>Result Ready!</h2>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px', maxWidth: '280px', lineHeight: 1.6 }}>
                            Analysis complete. We've compiled a secure report with <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>3 key findings</span>.
                        </p>

                        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="dating-email-input"
                            />

                            <button type="submit" disabled={isSubmitting} className="dating-btn-dark">
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

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Lock size={14} style={{ color: '#22c55e' }} /> Secure
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <UserCircle size={14} style={{ color: '#6b7280' }} /> Private
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Social Proof Toasts */}
            <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={toast.exiting ? 'dating-toast-exit' : 'dating-toast-enter'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: 'rgba(17, 24, 39, 0.95)',
                            color: 'white',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(12px)',
                            minWidth: '250px'
                        }}
                    >
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#ec4899', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                        <div style={{ fontSize: '14px' }}>
                            <span style={{ fontWeight: 700 }}>{toast.name}</span> {toast.action}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
