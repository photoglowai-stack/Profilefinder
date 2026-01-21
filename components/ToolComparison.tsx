import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Clock, DollarSign, Star, Trophy, Sparkles } from "lucide-react";
import { useService } from "../lib/ServiceContext";

const comparisonData = {
  facetrace: {
    title: "Why ProfileFinder is the #1 Face Search Tool",
    subtitle: "Compare our Face Trace technology against PimEyes, TinEye, and Yandex",
    tools: [
      { name: "ProfileFinder", logo: "🏆", highlight: true, subtitle: "Face Trace" },
      { name: "PimEyes", logo: "👁️", subtitle: "$29.99/mo" },
      { name: "TinEye", logo: "🔍", subtitle: "Basic" },
      { name: "Yandex", logo: "🌐", subtitle: "Limited" }
    ],
    features: [
      {
        name: "Dating Apps Search",
        description: "Find profiles on Tinder, Bumble, Hinge",
        values: ["✅ Exclusive", "❌ Not Available", "❌ Not Available", "❌ Not Available"],
        icons: [true, false, false, false],
        highlight: true
      },
      {
        name: "Social Media Search",
        description: "Instagram, Facebook, Twitter profiles",
        values: ["✅ Full Access", "⚠️ Limited", "❌ No", "❌ No"],
        icons: [true, false, false, false],
        highlight: true
      },
      {
        name: "AI Facial Recognition",
        description: "Advanced face matching algorithm",
        values: ["✅ 98% Accuracy", "✅ 90%", "❌ Image-only", "⚠️ 75%"],
        icons: [true, true, false, true]
      },
      {
        name: "Scan Speed",
        description: "Time to get results",
        values: ["⚡ Under 30s", "⏳ 1-2 min", "⚡ 30s", "⚡ 30s"],
        icons: [true, true, true, true]
      },
      {
        name: "Privacy Protection",
        description: "Your searches stay private",
        values: ["🛡️ 100% Anonymous", "⚠️ Stores Data", "✅ Anonymous", "⚠️ Logged"],
        icons: [true, false, true, false]
      },
      {
        name: "Reverse Face Search",
        values: [true, true, false, true],
        icons: [true, true, false, true]
      },
      {
        name: "Creator Profile Finder",
        values: [true, false, false, false],
        icons: [true, false, false, false]
      },
      {
        name: "Instagram Profile Lookup",
        values: [true, false, false, false],
        icons: [true, false, false, false]
      },
      {
        name: "Public Figure Matching",
        values: [true, true, false, false],
        icons: [true, true, false, false]
      },
      {
        name: "24/7 Radar Monitoring",
        description: "Continuous alert system",
        values: ["✅ Included", "❌ Not Available", "❌ Not Available", "❌ Not Available"],
        icons: [true, false, false, false],
        highlight: true
      },
      {
        name: "Real-time Results",
        values: [true, false, true, true],
        icons: [true, false, true, true]
      },
      {
        name: "Deepfake Detection",
        values: [true, false, false, false],
        icons: [true, false, false, false]
      }
    ],
    pricing: {
      name: "Price / Value",
      values: ["💰 €14.90 One-Time", "💸 €29.99/month", "🆓 Free (Very Limited)", "🆓 Free (Very Limited)"]
    }
  }
};

export function ToolComparison() {
  const { selectedService, colors: serviceColors } = useService();

  // Only show for facetrace
  if (selectedService !== "facetrace") return null;

  const data = comparisonData[selectedService];
  if (!data) return null;

  const renderValue = (value: string | boolean, isFirst: boolean) => {
    if (typeof value === 'string') {
      return (
        <span
          className="text-xs font-semibold"
          style={{ color: isFirst ? serviceColors.primary : '#64748b' }}
        >
          {value}
        </span>
      );
    }
    return value ? (
      <div
        className="rounded-full p-1.5"
        style={{
          background: isFirst
            ? `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`
            : '#22c55e'
        }}
      >
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
    ) : (
      <div className="bg-gray-200 rounded-full p-1.5">
        <X className="w-4 h-4 text-gray-500" strokeWidth={3} />
      </div>
    );
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full text-xs font-bold mb-4"
          style={{ background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})` }}
        >
          <Trophy className="w-4 h-4" />
          COMPARISON
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#020817] mb-4">
          {data.title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          {data.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto"
      >
        <div className="min-w-[800px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-gray-200">
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Features
            </div>
            {data.tools.map((tool, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl mb-2 ${index === 0 ? 'animate-pulse' : ''}`}>
                  {tool.logo}
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: index === 0 ? serviceColors.primary : 'rgba(255,255,255,0.8)' }}
                >
                  {tool.name}
                </div>
                <span className="text-[10px] text-white/50">{tool.subtitle}</span>
                {index === 0 && (
                  <div className="mt-2">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-white text-[10px] font-bold rounded-full"
                      style={{ background: serviceColors.primary }}
                    >
                      <Star className="w-3 h-3" fill="white" />
                      #1 RATED
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {data.features.map((feature, fIndex) => (
            <motion.div
              key={fIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: fIndex * 0.03 }}
              className={`grid grid-cols-5 gap-4 p-5 border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${feature.highlight ? 'bg-gradient-to-r from-blue-50/50 to-cyan-50/50' : fIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
            >
              <div className="text-sm font-medium flex flex-col justify-center">
                <span className="text-gray-700">{feature.name}</span>
                {feature.description && (
                  <span className="text-[10px] text-gray-400">{feature.description}</span>
                )}
              </div>
              {feature.values.map((value, vIndex) => (
                <div key={vIndex} className="flex justify-center items-center">
                  {renderValue(value, vIndex === 0)}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Pricing Row */}
          <div className="grid grid-cols-5 gap-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
            <div className="text-sm text-gray-800 font-bold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-600" />
              {data.pricing.name}
            </div>
            {data.pricing.values.map((value, vIndex) => (
              <div key={vIndex} className="flex justify-center items-center">
                <span
                  className="text-xs font-bold"
                  style={{ color: vIndex === 0 ? serviceColors.primary : '#64748b' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Get Started
            </div>
            <div className="flex justify-center">
              <button
                className="text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                style={{ background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})` }}
              >
                <Sparkles className="w-4 h-4" />
                Start Search
              </button>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">$29.99/mo →</span>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Limited →</span>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Limited →</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Summary Card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 max-w-4xl mx-auto"
      >
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})` }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">
              ProfileFinder: The Complete Face Search Platform
            </h3>
          </div>
          <p className="text-sm text-white/90 leading-relaxed mb-4 max-w-2xl mx-auto">
            Unlike PimEyes ($360/year), TinEye (image-only), or Yandex (privacy concerns),
            <strong> ProfileFinder's Face Trace</strong> gives you dating app search, social media lookup,
            24/7 monitoring, and AI accuracy—all in one affordable tool.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Dating App Exclusive", "98% Accuracy", "100% Anonymous", "24/7 Monitoring", "One-Time Payment"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
