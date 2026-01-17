import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useService } from "../lib/ServiceContext";

const comparisonData = {
  facetrace: {
    title: "Why Choose FaceCheck ID Over Competitors?",
    subtitle: "See how we compare to PimEyes, TinEye, and Yandex Reverse Search",
    tools: [
      { name: "FaceCheck ID", logo: "🎯" },
      { name: "PimEyes", logo: "👁️" },
      { name: "TinEye", logo: "🔍" },
      { name: "Yandex", logo: "🌐" }
    ],
    features: [
      {
        name: "Reverse Face Search",
        values: [true, true, false, true]
      },
      {
        name: "Creator Profile Finder",
        values: [true, false, false, false]
      },
      {
        name: "Instagram Finder",
        values: [true, false, false, false]
      },
      {
        name: "Public Figure Face Match",
        values: [true, true, false, false]
      },
      {
        name: "Free Face ID Search",
        values: [true, false, true, true]
      },
      {
        name: "AI Facial Recognition",
        values: [true, true, false, true]
      },
      {
        name: "Social Media Search",
        values: [true, false, false, false]
      },
      {
        name: "Real-time Results",
        values: [true, false, true, true]
      },
      {
        name: "Global Database Access",
        values: [true, true, false, true]
      },
      {
        name: "Privacy Guaranteed",
        values: [true, true, true, true]
      }
    ]
  }
};

export function ToolComparison() {
  const { selectedService } = useService();

  // Only show for facetrace
  if (selectedService !== "facetrace") return null;

  const data = comparisonData[selectedService];
  if (!data) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl text-[#020817] mb-4">
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
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-700">Features</div>
            {data.tools.map((tool, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{tool.logo}</div>
                <div className={`text-sm font-semibold ${index === 0 ? 'text-[#ff4e71]' : 'text-gray-700'}`}>
                  {tool.name}
                </div>
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
              transition={{ delay: fIndex * 0.05 }}
              className={`grid grid-cols-5 gap-4 p-6 ${fIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 hover:bg-blue-50/30 transition-colors`}
            >
              <div className="text-sm text-gray-700 font-medium flex items-center">
                {feature.name}
              </div>
              {feature.values.map((value, vIndex) => (
                <div key={vIndex} className="flex justify-center items-center">
                  {value ? (
                    <div className={`${vIndex === 0 ? 'bg-gradient-to-br from-[#ff4e71] to-[#ff7f66]' : 'bg-green-500'} rounded-full p-1.5`}>
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="bg-gray-200 rounded-full p-1.5">
                      <X className="w-4 h-4 text-gray-500" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}

          {/* CTA Row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="text-sm font-semibold text-gray-700 flex items-center">
              Get Started
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                Try Free
              </button>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Visit Site →</span>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Visit Site →</span>
            </div>
            <div className="flex justify-center">
              <span className="text-gray-400 text-sm">Visit Site →</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-600 max-w-4xl mx-auto">
          <strong className="text-[#ff4e71]">FaceCheck ID</strong> combines the best features of PimEyes (Pim Eyes, PimEye),
          TinEye (TinyEye, TinEyes), Yandex reverse search, and more into one powerful platform.
          Perform reverse face search, facial recognition search, creator profile discovery, Instagram finder,
          public figure face matching, and comprehensive reverse image search people - all with industry-leading accuracy
          and the fastest results. Better than PimEyes.com, FaceSeek, StarByFace, and other alternatives.
        </p>
      </motion.div>
    </section>
  );
}
