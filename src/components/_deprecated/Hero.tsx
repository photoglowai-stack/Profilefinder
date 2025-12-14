import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, Shield } from "lucide-react";
import imgWebsiteLogo from "../assets/4b7948bf098fa302d0479c7e50133880ecda62bd.png";
import { useService } from "../lib/ServiceContext";
import { serviceContent, navigationContent } from "../lib/content";

export function Hero() {
  const { selectedService, colors } = useService();
  const content = serviceContent[selectedService].hero;
  return (
    <div className={`relative bg-gradient-to-br pb-12 md:pb-16 overflow-hidden`} style={{
      background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary} 40%, ${colors.primary}dd)`
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -top-32 -left-32"
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
          className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -bottom-32 -right-32"
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
        <motion.div
          className="absolute w-[400px] h-[400px] bg-pink-300/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
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
        className="relative max-w-[1760px] mx-auto px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-between"
      >
        <motion.div
          className="flex items-center gap-1.5"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img src={imgWebsiteLogo} alt="ProfileFinder" className="max-h-8 max-w-[120px] h-auto w-auto object-contain drop-shadow-lg" style={{ height: '32px', maxHeight: '32px' }} />
        </motion.div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#how-it-works" className="text-white hover:text-white/80 transition text-xs">
            {navigationContent.howItWorks}
          </a>
          <a href="#testimonials" className="text-white hover:text-white/80 transition text-xs">
            {navigationContent.testimonials}
          </a>
          <a href="#faq" className="text-white hover:text-white/80 transition text-xs">
            {navigationContent.faq}
          </a>
          <button className="bg-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-white/90 transition shadow-lg" style={{ color: colors.primary }}>
            {navigationContent.login}
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative max-w-[1760px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-16 md:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-5 py-2 rounded-full mb-6 md:mb-8 border border-white/40 shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-xs md:text-sm font-medium">{content.badge}</span>
          </motion.div>

          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-['Cal_Sans:SemiBold',sans-serif] leading-tight mb-4 md:mb-6 drop-shadow-2xl">
            {content.title}<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
              {content.titleHighlight}
            </span>
          </h1>

          <p className="text-white text-sm md:text-lg lg:text-xl max-w-3xl mx-auto opacity-95 leading-relaxed mb-8 md:mb-10 px-2">
            {content.description}
          </p>

          {/* Trust indicators - Enhanced */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
              >
                {stat.icon === "check" && <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-white" />}
                {stat.icon === "clock" && <Clock className="w-4 h-4 flex-shrink-0 text-white" />}
                {stat.icon === "shield" && <Shield className="w-4 h-4 flex-shrink-0 text-white" />}
                <span className="text-white text-xs md:text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}