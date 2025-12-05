import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useService } from '../lib/ServiceContext';
import { motion } from 'motion/react';

// Avatars pour Dating Search
const AVATAR_MAN = '/assets/avatars/dating-man-new.png';
const AVATAR_WOMAN = '/assets/avatars/dating-woman-new.png';

export const StickyGenderSelector = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<'man' | 'woman'>('man');
    const [instagramUsername, setInstagramUsername] = useState('');
    const { selectedService } = useService();
    const navigate = useNavigate();
    const location = useLocation();

    // Ne pas afficher sur la page de paiement
    const isPaymentPage = location.pathname === '/payment';

    // Détecter le scroll pour afficher/masquer le composant
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 600;
            setIsVisible(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAction = () => {
        if (selectedService === 'dating') {
            navigate(`/payment?gender=${selectedGender}&service=${selectedService}`);
        } else {
            navigate(`/payment?service=${selectedService}`);
        }
    };

    // Ne pas afficher sur la page de paiement
    if (isPaymentPage) return null;

    // Configuration par service
    const serviceConfig: Record<string, { title: string; buttonText: string; icon?: string }> = {
        dating: { title: 'Who are you looking for?', buttonText: 'SEARCH' },
        following: { title: 'Analyze Social Profile', buttonText: 'ANALYZE', icon: '⚡' },
        facetrace: { title: 'Find via Photo', buttonText: 'SCAN', icon: '�' },
        fidelity: { title: 'Fidelity Test', buttonText: 'TEST FIDELITY', icon: '💔' }
    };

    const config = serviceConfig[selectedService] || serviceConfig.dating;

    // Render different content based on service
    const renderServiceContent = () => {
        switch (selectedService) {
            case 'dating':
                return (
                    <div className="flex gap-3 md:gap-4 justify-center">
                        {/* Man Option */}
                        <label className="cursor-pointer group relative">
                            <input
                                type="radio"
                                name="gender-sticky"
                                value="man"
                                className="hidden"
                                checked={selectedGender === 'man'}
                                onChange={() => setSelectedGender('man')}
                            />
                            <div
                                className={`relative w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden transition-all duration-300 ${selectedGender === 'man'
                                    ? 'ring-2 ring-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                                    : 'hover:shadow-md grayscale-[30%] hover:grayscale-0'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gray-100">
                                    <img
                                        src={AVATAR_MAN}
                                        alt="Man"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className={`absolute inset-x-0 bottom-0 p-2 pt-6 bg-gradient-to-t from-black/80 to-transparent text-center transition-opacity duration-300 ${selectedGender === 'man' ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                    <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Man</span>
                                </div>
                                {selectedGender === 'man' && (
                                    <div className="absolute top-2 right-2 bg-[#10B981] text-white rounded-full p-1 shadow-sm">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </label>

                        {/* Woman Option */}
                        <label className="cursor-pointer group relative">
                            <input
                                type="radio"
                                name="gender-sticky"
                                value="woman"
                                className="hidden"
                                checked={selectedGender === 'woman'}
                                onChange={() => setSelectedGender('woman')}
                            />
                            <div
                                className={`relative w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden transition-all duration-300 ${selectedGender === 'woman'
                                    ? 'ring-2 ring-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                                    : 'hover:shadow-md grayscale-[30%] hover:grayscale-0'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gray-100">
                                    <img
                                        src={AVATAR_WOMAN}
                                        alt="Woman"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className={`absolute inset-x-0 bottom-0 p-2 pt-6 bg-gradient-to-t from-black/80 to-transparent text-center transition-opacity duration-300 ${selectedGender === 'woman' ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                    <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Woman</span>
                                </div>
                                {selectedGender === 'woman' && (
                                    <div className="absolute top-2 right-2 bg-[#10B981] text-white rounded-full p-1 shadow-sm">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>
                );

            case 'following':
                return (
                    <div className="w-full max-w-sm space-y-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-6 h-6" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                                    <defs>
                                        <radialGradient id="instagram-gradient" r="150%" cx="30%" cy="107%">
                                            <stop stopColor="#fdf497" offset="0" />
                                            <stop stopColor="#fdf497" offset="0.05" />
                                            <stop stopColor="#fd5949" offset="0.45" />
                                            <stop stopColor="#d6249f" offset="0.6" />
                                            <stop stopColor="#285AEB" offset="0.9" />
                                        </radialGradient>
                                    </defs>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="@username (Instagram)"
                                value={instagramUsername}
                                onChange={(e) => setInstagramUsername(e.target.value)}
                                className="custom-input w-full pl-14 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 text-base md:text-lg font-medium text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white transition-colors"
                            />
                        </div>
                        <p className="text-xs text-gray-400 text-center font-medium">
                            <span className="mr-1">ℹ️</span> Only public Instagram profiles supported
                        </p>
                    </div>
                );

            case 'facetrace':
                return (
                    <div className="upload-zone w-full max-w-sm h-32 md:h-40 rounded-2xl flex flex-col items-center justify-center cursor-pointer group bg-gray-50 relative overflow-hidden">
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="bg-white p-3 rounded-full shadow-md mb-2 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EF3E5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium text-sm group-hover:text-[#EF3E5C] transition-colors">Drop a photo here</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG supported</p>
                    </div>
                );

            case 'fidelity':
                return (
                    <div className="upload-zone w-full max-w-sm h-32 md:h-40 rounded-2xl flex flex-col items-center justify-center cursor-pointer group bg-gray-50 relative overflow-hidden">
                        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="bg-white p-3 rounded-full shadow-md mb-2 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EF3E5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium text-sm group-hover:text-[#EF3E5C] transition-colors">Upload chat screenshots</p>
                        <p className="text-xs text-gray-400 mt-1">WhatsApp, iMessage, Instagram...</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            className="fixed bottom-4 left-1/2 z-50"
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 100,
                x: '-50%'
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            {/* Main Container - Styled like the HTML reference */}
            <div
                className="bg-white rounded-[2rem] px-4 py-6 md:px-8 md:py-8 shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6 w-[calc(100vw-32px)] md:w-auto md:max-w-[750px]"
                style={{
                    border: '3px solid #EF3E5C',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                {/* Title */}
                <h2 className="text-center md:text-left text-xl md:text-2xl font-extrabold tracking-tight text-[#EF3E5C] mb-2 md:mb-0 md:min-w-[180px]">
                    {config.title}
                </h2>

                {/* Dynamic Content based on service */}
                {renderServiceContent()}

                {/* Action Button */}
                <div className="relative mt-4 md:mt-0 md:ml-4 shrink-0 z-20">
                    <button
                        onClick={handleAction}
                        className="bg-black text-white text-lg md:text-xl font-bold px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-3 border-2 border-transparent hover:border-gray-700"
                    >
                        {config.buttonText}
                        {config.icon && <span className="text-lg">{config.icon}</span>}
                    </button>

                    {/* Bouncing Hand Animation */}
                    <motion.div
                        className="absolute -bottom-10 -right-8 pointer-events-none z-30"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="https://em-content.zobj.net/source/apple/391/backhand-index-pointing-up_1f446.png"
                            className="w-14 h-14 md:w-16 md:h-16 -rotate-45 drop-shadow-xl"
                            alt="Click here"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StickyGenderSelector;
