"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { serviceContent } from "../../lib/content";

export function FollowingForm() {
  const router = useRouter();
  // Force the type since this form is only rendered for 'following' service
  const content = serviceContent.following.form;
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (username.trim()) {
      setIsSearching(true);
      // Store the search query in sessionStorage for the next page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pf_following_query', username);
      }
      setTimeout(() => {
        router.push("/activity-tracker");
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-lg border border-gray-100 w-full max-w-md mx-auto p-6 md:p-8">
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-4 rounded-xl shadow-md">
          <Instagram className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl text-center text-gray-900 mb-2 font-bold">
        {content.title}
      </h3>

      <p className="text-center text-gray-500 mb-6 text-sm">
        {content.subtitle}
      </p>

      {/* Input Field - Compact */}
      <div className="mb-5">
        <label htmlFor="instagram-username" className="block text-sm font-medium text-gray-700 mb-2">
          {content.label || 'Instagram username'}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Instagram className="w-5 h-5 text-gray-400" />
          </div>
          <input
            id="instagram-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={content.placeholder || '@username'}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff4e71] focus:ring-2 focus:ring-[#ff4e71]/20 focus:outline-none transition-all text-base"
          />
        </div>
      </div>

      {/* Features List - Compact */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-5 border border-red-100">
        <h4 className="text-xs font-semibold text-[#ff4e71] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff4e71] rounded-full"></span>
          What you'll get:
        </h4>
        <ul className="space-y-2">
          {(content.features || []).map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2 text-xs text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Search Button - FIXED: Compact size */}
      <motion.button
        onClick={handleSearch}
        disabled={!username.trim() || isSearching}
        className={`w-full relative flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all ${username.trim() && !isSearching
          ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-lg cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
          }`}
        whileHover={username.trim() && !isSearching ? { scale: 1.02 } : {}}
        whileTap={username.trim() && !isSearching ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center gap-2">
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white text-base font-semibold">{content.searching}</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5 text-white" />
              <span className="text-white text-base font-semibold">{content.search}</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Bottom Badge - Compact */}
      <div className="mt-4 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full py-2 px-3 flex flex-wrap items-center justify-center gap-2 text-white text-[10px] shadow-md">
        {content.badges && content.badges.map((badge, index) => (
          <span key={index} className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}