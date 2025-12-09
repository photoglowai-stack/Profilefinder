import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Users, ScanFace, MessageCircle, Camera, ShieldAlert, LucideIcon } from 'lucide-react';
import { useService } from '../lib/ServiceContext';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ------------------------------------------------------------------
 * 1. CONFIGURATION & TYPES
 * ------------------------------------------------------------------
 */

export type ServiceType = 'dating' | 'following' | 'facetrace' | 'fidelity';

interface Assets {
    man: string;
    woman: string;
    hand: string;
}

const ASSETS: Assets = {
    man: "/assets/avatars/dating-man-3d.png",
    woman: "/assets/avatars/dating-woman-3d.png",
    hand: "https://em-content.zobj.net/source/apple/391/backhand-index-pointing-up_1f446.png",
};

const SERVICES = [
    { id: 'dating' as ServiceType, label: 'Dating', icon: Heart, headerTitle: "Who are you looking for?" },
    { id: 'following' as ServiceType, label: 'Social AI', icon: Users, headerTitle: "Analyze Social Profile" },
    { id: 'facetrace' as ServiceType, label: 'Face', icon: ScanFace, headerTitle: "Biometric Face Scan" },
    { id: 'fidelity' as ServiceType, label: 'Fidelity', icon: ShieldAlert, headerTitle: "Partner Fidelity Check" },
];

/**
 * ------------------------------------------------------------------
 * 2. SUB-COMPONENTS
 * ------------------------------------------------------------------
 */

interface ServiceTabProps {
    active: boolean;
    onClick: () => void;
    icon: LucideIcon;
    label: string;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`
      flex-none px-3 py-2 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all duration-200 snap-center shadow-sm border
      ${active
                ? 'bg-[#EF3E5C] text-white border-[#EF3E5C] shadow-md scale-[1.02]'
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
            }
    `}
    >
        <Icon size={14} className={active ? "text-white" : "text-gray-400"} />
        <span className="whitespace-nowrap">{label}</span>
    </button>
);

interface MagicButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const MagicButton: React.FC<MagicButtonProps> = ({ label, onClick, disabled }) => (
    <div className="relative w-[130px] min-w-[130px] max-w-[130px] h-[50px] min-h-[50px] flex-none group ml-2">
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full h-full bg-black rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-gray-900 active:scale-95 transition-all cursor-pointer relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            <span className="text-white font-black text-sm tracking-wide">{label}</span>
        </button>
        <motion.img
            src={ASSETS.hand}
            className="absolute -bottom-3 -right-3 w-10 h-10 rotate-[-10deg] drop-shadow-xl pointer-events-none z-20"
            alt="pointer"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

// --- Gender Card ---
interface GenderCardProps {
    label: string;
    img: string;
    selected: boolean;
    onClick: () => void;
}

const GenderCard: React.FC<GenderCardProps> = ({ label, img, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`
      group relative w-[70px] min-w-[70px] aspect-3/4 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 bg-white flex-none
      ${selected
                ? 'border-[#10B981] shadow-[0_4px_12px_rgba(16,185,129,0.3)] scale-[1.03] z-10'
                : 'border-transparent hover:border-gray-100 shadow-sm opacity-80 hover:opacity-100'
            }
    `}
    >
        <div className="h-full w-full pb-5 bg-gray-50">
            <img src={img} className="w-full h-full object-cover object-top" alt={label} />
        </div>
        <div className={`
      absolute bottom-0 inset-x-0 py-1 text-center text-[9px] font-black uppercase tracking-wider text-white transition-colors duration-200
      ${selected ? 'bg-[#10B981]' : 'bg-[#EF3E5C]'}
    `}>
            {label}
        </div>
    </div>
);

// --- Dating View ---
interface DatingViewProps {
    onSearch: (gender: 'man' | 'woman') => void;
    isSearching?: boolean;
}

const DatingView: React.FC<DatingViewProps> = ({ onSearch, isSearching }) => {
    const [selected, setSelected] = useState<'man' | 'woman'>('man');

    return (
        <div className="flex flex-row items-center justify-center gap-4 px-1 py-1">
            <div className="flex gap-2">
                <GenderCard label="MAN" img={ASSETS.man} selected={selected === 'man'} onClick={() => setSelected('man')} />
                <GenderCard label="WOMAN" img={ASSETS.woman} selected={selected === 'woman'} onClick={() => setSelected('woman')} />
            </div>
            <MagicButton label={isSearching ? "..." : "SEARCH"} onClick={() => onSearch(selected)} disabled={isSearching} />
        </div>
    );
};

// --- Social View ---
interface SocialViewProps {
    onAnalyze: (username: string) => void;
    isSearching?: boolean;
}

const SocialView: React.FC<SocialViewProps> = ({ onAnalyze, isSearching }) => {
    const [username, setUsername] = useState('');

    return (
        <div className="flex flex-row items-center justify-between gap-3 w-full px-1 py-1">
            <div className="relative flex-1 min-w-0">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none z-10">
                    <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                        <Camera size={14} />
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="@username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-3 h-[50px] min-h-[50px] bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-[#EF3E5C] focus:outline-none font-bold text-gray-800 transition-colors text-sm placeholder:text-gray-400"
                />
            </div>
            <MagicButton label={isSearching ? "..." : "ANALYZE"} onClick={() => onAnalyze(username)} disabled={isSearching} />
        </div>
    );
};

// --- Upload View ---
interface UploadViewProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    btnText: string;
    onAction: () => void;
    isSearching?: boolean;
}

const UploadView: React.FC<UploadViewProps> = ({ icon: Icon, title, desc, btnText, onAction, isSearching }) => (
    <div className="flex flex-row items-center justify-between gap-3 w-full px-1 py-1">
        <div
            onClick={onAction}
            className="flex-1 h-[50px] min-h-[50px] border-2 border-dashed border-[#EF3E5C]/30 bg-[#EF3E5C]/5 rounded-xl flex items-center justify-start cursor-pointer hover:bg-[#EF3E5C]/10 transition-colors px-3 gap-3 min-w-0"
        >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <Icon size={16} className="text-[#EF3E5C]" />
            </div>
            <div className="flex flex-col justify-center overflow-hidden">
                <span className="font-bold text-gray-800 text-xs whitespace-nowrap">{title}</span>
                <span className="text-[9px] text-gray-500 whitespace-nowrap">{desc}</span>
            </div>
        </div>
        <MagicButton label={isSearching ? "..." : btnText} onClick={onAction} disabled={isSearching} />
    </div>
);

/**
 * ------------------------------------------------------------------
 * 3. MAIN WIDGET COMPONENT
 * ------------------------------------------------------------------
 */

export const StickyGenderSelector = () => {
    const { selectedService, setSelectedService } = useService();
    const [isVisible, setIsVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isPaymentPage = location.pathname === '/payment';
    const activeTab = selectedService;
    const activeServiceConfig = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isPaymentPage) return null;

    const handleSearch = (gender: 'man' | 'woman') => {
        setIsSearching(true);
        setTimeout(() => {
            navigate(`/payment?gender=${gender}&service=dating`);
            setIsSearching(false);
        }, 500);
    };

    const handleAnalyze = (username: string) => {
        setIsSearching(true);
        setTimeout(() => {
            navigate(`/payment?username=${username}&service=following`);
            setIsSearching(false);
        }, 500);
    };

    const handleScan = () => {
        setIsSearching(true);
        setTimeout(() => {
            navigate('/payment?service=facetrace');
            setIsSearching(false);
        }, 500);
    };

    const handleFidelityTest = () => {
        setIsSearching(true);
        setTimeout(() => {
            navigate('/payment?service=fidelity');
            setIsSearching(false);
        }, 500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
                >
                    <div className="relative z-20 w-full max-w-[480px] mx-auto px-4 flex flex-col gap-3 pointer-events-auto">
                        {/* Navigation Tabs */}
                        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 snap-x justify-center">
                            {SERVICES.map((service) => (
                                <ServiceTab
                                    key={service.id}
                                    active={activeTab === service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    icon={service.icon}
                                    label={service.label}
                                />
                            ))}
                        </div>

                        {/* Main Card */}
                        <div className="bg-white rounded-4xl border-[3px] border-[#EF3E5C] shadow-[0_20px_60px_-10px_rgba(239,62,92,0.3)] p-4 relative overflow-hidden">
                            <h2 className="text-[#EF3E5C] text-xs font-extrabold text-center mb-3 tracking-wide uppercase opacity-90">
                                {activeServiceConfig.headerTitle}
                            </h2>

                            <div className="w-full flex justify-center">
                                {activeTab === 'dating' && <DatingView onSearch={handleSearch} isSearching={isSearching} />}
                                {activeTab === 'following' && <SocialView onAnalyze={handleAnalyze} isSearching={isSearching} />}
                                {activeTab === 'facetrace' && (
                                    <UploadView icon={Camera} title="Upload Photo" desc="JPG/PNG Match" btnText="SCAN" onAction={handleScan} isSearching={isSearching} />
                                )}
                                {activeTab === 'fidelity' && (
                                    <UploadView icon={MessageCircle} title="Upload Chat" desc="Analyze Logs" btnText="TEST" onAction={handleFidelityTest} isSearching={isSearching} />
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyGenderSelector;
