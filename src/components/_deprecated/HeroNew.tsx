import { motion } from "framer-motion";
import { Users } from "lucide-react";
import imgWebsiteLogo from "../assets/4b7948bf098fa302d0479c7e50133880ecda62bd.png";
import { useService } from "../lib/ServiceContext";
import { ServiceSelector } from "./ServiceSelector";
import { DatingForm } from "./forms/DatingForm";
import { FollowingForm } from "./forms/FollowingForm";
import { FaceTraceForm } from "./forms/FaceTraceForm";
import { FidelityForm } from "./forms/FidelityForm";

export function HeroNew() {
    const { selectedService, setSelectedService, colors } = useService();

    const renderForm = () => {
        switch (selectedService) {
            case "dating":
                return <DatingForm />;
            case "following":
                return <FollowingForm />;
            case "facetrace":
                return <FaceTraceForm />;
            case "fidelity":
                return <FidelityForm />;
            default:
                return <DatingForm />;
        }
    };

    // SEO content based on selected service
    const seoContent = {
        dating: {
            h1: "Tinder profile search with AI",
            subtitle: "Run a Tinder profile lookup with just a name, age and city to see if someone is really active on dating apps.",
            badge: "Trusted by 1000+ users"
        },
        following: {
            h1: "Following AI - Track Social Signals",
            subtitle: "Analyze who someone follows and interacts with on their public social media to detect patterns.",
            badge: "AI-Powered Analysis"
        },
        facetrace: {
            h1: "Face Trace - AI face search",
            subtitle: "Upload a photo and our AI performs face recognition search combined with reverse image search people workflow.",
            badge: "Advanced Face Recognition"
        },
        fidelity: {
            h1: "Fidelity Test - Relationship Analysis",
            subtitle: "Interactive checklist that helps you evaluate behavior patterns and turn vague suspicion into clear signals.",
            badge: "Structured Analysis"
        }
    };

    const content = seoContent[selectedService];

    return (
        <div
            className="relative bg-gradient-to-br pb-12 md:pb-20 overflow-hidden"
            style={{
                background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary} 40%, ${colors.primary}dd)`
            }}
        >
            {/* Animated background elements - Optimized for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/10 rounded-full blur-2xl md:blur-3xl -top-32 -left-32"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 rounded-full blur-2xl md:blur-3xl -bottom-32 -right-32"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative max-w-[1760px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between"
            >
                <motion.div
                    className="flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        src={imgWebsiteLogo}
                        alt="ProfileFinder"
                        className="max-h-8 max-w-[120px] h-auto w-auto object-contain drop-shadow-lg"
                        style={{ height: '32px', maxHeight: '32px' }}
                    />
                </motion.div>

                <div className="hidden md:flex items-center gap-4">
                    <a href="#how-it-works" className="text-white hover:text-white/80 transition text-sm font-medium">
                        Tinder Profile Search
                    </a>
                    <a href="#blog" className="text-white hover:text-white/80 transition text-sm font-medium">
                        Blog
                    </a>
                    <a href="#affiliate" className="text-white hover:text-white/80 transition text-sm font-medium">
                        Affiliate Program
                    </a>
                    <button
                        className="bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 transition shadow-lg"
                        style={{ color: colors.primary }}
                    >
                        Sign In
                    </button>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white p-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </motion.nav>

            {/* Hero Content */}
            <div className="relative max-w-[1760px] mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Trust Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/40 shadow-xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Users className="w-4 h-4 text-white" />
                            <span className="text-white text-xs md:text-sm font-medium">{content.badge}</span>
                        </motion.div>

                        {/* H1 - SEO Optimized & Dynamic */}
                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-['Cal_Sans:SemiBold',sans-serif] leading-tight mb-4 md:mb-6 drop-shadow-2xl">
                            {content.h1}
                        </h1>

                        {/* Subheading - SEO Optimized & Dynamic */}
                        <p className="text-white text-base md:text-xl lg:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed mb-8 font-medium">
                            {content.subtitle}
                        </p>

                        {/* Reassurance line */}
                        <p className="text-white text-sm md:text-base opacity-90 mb-8">
                            Get a clear answer in under 2 minutes.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Service Selector - Positioned at bottom of hero */}
            <ServiceSelector
                selected={selectedService}
                onSelect={setSelectedService}
            />

            {/* Form Container - Below hero */}
            <div className="max-w-[1760px] mx-auto px-4 md:px-8 relative z-10 mb-12 md:mb-16 -mt-8">
                <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    {renderForm()}
                </motion.div>
            </div>
        </div>
    );
}
