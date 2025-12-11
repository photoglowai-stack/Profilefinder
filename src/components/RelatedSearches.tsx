import { motion } from "framer-motion";
import { Search, TrendingUp, Heart, Users, Shield, Eye, ScanFace, Image, UserSearch } from "lucide-react";
import { useService } from "../lib/ServiceContext";

const datingSearches = [
  { icon: Search, text: "Tinder Profile Search", popular: true },
  { icon: Heart, text: "Profile Safety Check", popular: true },
  { icon: Shield, text: "Verify Dating Activity", popular: true },
  { icon: Eye, text: "Tinder Profile Lookup", popular: false },
  { icon: Users, text: "Dating Apps Search", popular: false },
  { icon: TrendingUp, text: "Swindler Buster", popular: false },
  { icon: Search, text: "AI Dating App", popular: false },
  { icon: Heart, text: "Behavior Risk Detection", popular: false },
  { icon: Shield, text: "Online Dating Check", popular: false },
  { icon: Eye, text: "How Does Tinder Work", popular: false },
  { icon: Users, text: "Hinge vs Bumble", popular: false },
  { icon: Search, text: "Relationship Red Flags", popular: false },
];

const facetraceSearches = [
  { icon: ScanFace, text: "FaceCheck ID", popular: true },
  { icon: Search, text: "PimEyes Alternative", popular: true },
  { icon: Eye, text: "Reverse Face Search", popular: true },
  { icon: Image, text: "Facial Recognition Search", popular: true },
  { icon: UserSearch, text: "Creator Profile Finder", popular: true },
  { icon: Users, text: "Instagram Finder", popular: true },
  { icon: Search, text: "Public Figure Face Match", popular: false },
  { icon: Eye, text: "Face ID Search Free", popular: false },
  { icon: Image, text: "Reverse Image Search People", popular: false },
  { icon: ScanFace, text: "TinEye Alternative", popular: false },
  { icon: UserSearch, text: "Yandex Reverse Search", popular: false },
  { icon: Users, text: "Doppelganger Finder", popular: false },
];

export function RelatedSearches() {
  const { selectedService } = useService();

  // Only show for dating and facetrace services
  if (selectedService !== "dating" && selectedService !== "facetrace") return null;

  const searches = selectedService === "dating" ? datingSearches : facetraceSearches;
  const titleText = selectedService === "dating"
    ? "Related Dating Profile Searches"
    : "Related Face Search & Image Recognition Queries";

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] px-4 py-2 rounded-full mb-4">
          <TrendingUp className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Popular Searches</span>
        </div>
        <h2 className="text-2xl md:text-3xl text-[#020817] mb-3">
          {titleText}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          {selectedService === "dating"
            ? "Explore popular search terms and discover how our AI helps you validate online dating activity."
            : "Discover popular facial recognition and reverse image search tools powered by advanced AI"}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {searches.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all ${
                item.popular
                  ? "bg-gradient-to-br from-red-50 to-orange-50 border-[#ff4e71] shadow-md"
                  : "bg-white border-gray-200 hover:border-[#ff4e71] shadow-sm"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg font-medium">
                  HOT
                </div>
              )}

              <div className={`flex-shrink-0 p-2 rounded-lg ${
                item.popular
                  ? "bg-gradient-to-br from-[#ff4e71] to-[#ff7f66]"
                  : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#ff4e71] group-hover:to-[#ff7f66]"
              } transition-all`}>
                <Icon className={`w-4 h-4 ${
                  item.popular ? "text-white" : "text-gray-600 group-hover:text-white"
                } transition-colors`} strokeWidth={2} />
              </div>

              <span className={`text-xs md:text-sm text-left flex-1 ${
                item.popular ? "text-[#020817] font-medium" : "text-gray-700 group-hover:text-[#020817]"
              } transition-colors`}>
                {item.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Additional Keywords Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg md:text-xl text-[#020817] mb-4 text-center">
          Also Available: Extended Search Capabilities
        </h3>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {selectedService === "dating" ? (
            <>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Tinder Sign Up Verification
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Delete Tinder Account Check
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Tinder Chat Analysis
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Secure Profile Review
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Community Safety Monitoring
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Creator Platform Lookup
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Emotional Availability Signs
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Risky App Detection
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                SocialCatfish Alternative
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Tinder Reddit Verification
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Bumble Reddit Check
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 rounded-full border border-red-100">
                Hinge Profile Search
              </span>
            </>
          ) : (
            <>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                PimEyes.com Alternative
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Social Profile Search Engine
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Public Figure Recognition
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Instagram Profile Photo Download
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Facebook People Search
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                AI Content Safety Detection
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                StarByFace
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                FaceSeek
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Google Photo Reverse Search
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Instagram Account Lookup
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                Sensitive Image Filter
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full border border-blue-100">
                GeoSpy AI
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500">
          Trusted by over <span className="font-semibold text-[#ff4e71]">500,000+</span> users worldwide for
          {selectedService === "dating" ? " accurate dating profile searches" : " facial recognition and reverse image searches"}
        </p>
      </motion.div>
    </section>
  );
}
