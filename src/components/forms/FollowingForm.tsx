import { useState } from "react";
import { motion } from "motion/react";
import { Instagram, Search } from "lucide-react";
import svgPaths from "../../imports/svg-osb8kvu2n8";
import { useService } from "../../lib/ServiceContext";
import { serviceContent } from "../../lib/content";

import { useNavigate } from "react-router-dom";

export function FollowingForm() {
  const { selectedService } = useService();
  const navigate = useNavigate();
  const content = serviceContent[selectedService].form;
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (username.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        navigate("/payment", { state: { searchQuery: username } });
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-[32px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] border border-gray-100 w-full max-w-2xl mx-auto min-h-[500px] p-6 md:p-10 backdrop-blur-sm">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-5 rounded-2xl shadow-lg">
          <Instagram className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl text-center text-[#020817] mb-3 font-['Inter_Tight:Bold',sans-serif]">
        {content.title}
      </h3>

      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        {content.subtitle}
      </p>

      {/* Input Field */}
      <div className="mb-6">
        <label htmlFor="instagram-username" className="block text-sm font-medium text-gray-700 mb-3">
          {content.label || 'Instagram username'}
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Instagram className="w-5 h-5 text-gray-400" />
          </div>
          <input
            id="instagram-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={content.placeholder || '@username'}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff4e71] focus:ring-2 focus:ring-[#ff4e71]/20 focus:outline-none transition-all text-lg"
          />
        </div>
      </div>

      {/* Features List */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 md:p-6 mb-6 border border-red-100">
        <h4 className="text-sm font-semibold text-[#ff4e71] mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff4e71] rounded-full"></span>
          What you'll get:
        </h4>
        <ul className="space-y-2.5">
          {(content.features || []).map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Search Button */}
      <motion.button
        onClick={handleSearch}
        disabled={!username.trim() || isSearching}
        className={`relative w-full md:w-fit md:min-w-[220px] box-border overflow-hidden flex items-center justify-center px-10 py-3 rounded-full transition-all shadow-lg ${username.trim() && !isSearching
          ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-xl cursor-pointer"
          : "bg-gray-400 cursor-not-allowed"
          }`}
        whileHover={username.trim() && !isSearching ? { scale: 1.02, y: -2 } : {}}
        whileTap={username.trim() && !isSearching ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center gap-3">
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-white text-lg md:text-xl font-semibold">{content.searching}</span>
            </>
          ) : (
            <>
              <Search className="w-6 h-6 text-white" />
              <span className="text-white text-lg md:text-xl font-semibold">{content.search}</span>
              <motion.div
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 40 40">
                  <path d={svgPaths.p6a7c500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M3.33333 20H36.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </motion.button>

      {/* Bottom Badge */}
      <div className="mt-5 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white text-xs shadow-lg">
        {content.badges && content.badges.map((badge, index) => (
          <span key={index} className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
        {!content.badges && (
          <>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              24/7 updates
            </span>
          </>
        )}
      </div>
    </div>
  );
}