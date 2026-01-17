"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import svgPaths from "../../imports/svg-osb8kvu2n8";
import { useService } from "../../lib/ServiceContext";
import { serviceContent } from "../../lib/content";

// Avatars from public folder
const imgMan = '/assets/avatars/dating-man-3d.png';
const imgWoman = '/assets/avatars/dating-woman-3d.png';

export function DatingForm() {
  const { selectedService } = useService();
  const router = useRouter();
  // Type assertion for dating form which has man/woman properties
  const content = serviceContent[selectedService].form as {
    title: string;
    subtitle: string;
    man: string;
    woman: string;
    search: string;
    searching: string;
    bottomText: string;
    badges: string[];
  };
  const [selected, setSelected] = useState<"man" | "woman" | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (selected) {
      setIsSearching(true);
      setTimeout(() => {
        router.push("/payment");
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-lg border border-gray-100 w-full max-w-md mx-auto p-6 md:p-8">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-gray-900 text-xl md:text-2xl mb-2">
          {content.title}
        </h2>
        <p className="text-gray-500 text-sm">
          {content.subtitle}
        </p>
      </div>

      {/* Avatars Section - Compact */}
      <div className="mb-6">
        <div className="flex justify-center gap-5">
          {/* Man Avatar */}
          <motion.button
            onClick={() => setSelected("man")}
            className={`group relative w-32 h-40 md:w-36 md:h-48 rounded-2xl transition-all duration-300 overflow-hidden bg-white border-3 ${selected === "man"
              ? "border-[#10B981] ring-4 ring-[#10B981]/30 scale-105"
              : "border-gray-200 hover:border-gray-300 hover:scale-102"
              }`}
            style={{ boxShadow: selected === "man" ? '0 10px 30px rgba(16, 185, 129, 0.4)' : '0 6px 16px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-[75%] w-full relative bg-gray-50">
              <img
                src={imgMan}
                alt="Man"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className={`h-[25%] w-full flex items-center justify-center transition-colors ${selected === "man" ? "bg-[#10B981]" : "bg-[#EF3E5C]"
              }`}>
              <span className="text-white font-bold text-sm tracking-wide">
                {content.man}
              </span>
            </div>
          </motion.button>

          {/* Woman Avatar */}
          <motion.button
            onClick={() => setSelected("woman")}
            className={`group relative w-32 h-40 md:w-36 md:h-48 rounded-2xl transition-all duration-300 overflow-hidden bg-white border-3 ${selected === "woman"
              ? "border-[#10B981] ring-4 ring-[#10B981]/30 scale-105"
              : "border-gray-200 hover:border-gray-300 hover:scale-102"
              }`}
            style={{ boxShadow: selected === "woman" ? '0 10px 30px rgba(16, 185, 129, 0.4)' : '0 6px 16px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-[75%] w-full relative bg-gray-50">
              <img
                src={imgWoman}
                alt="Woman"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className={`h-[25%] w-full flex items-center justify-center transition-colors ${selected === "woman" ? "bg-[#10B981]" : "bg-[#EF3E5C]"
              }`}>
              <span className="text-white font-bold text-sm tracking-wide">
                {content.woman}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Button Container - FIXED: Compact size */}
      <div className="mb-5">
        <div className="flex justify-center">
          <motion.button
            onClick={handleSearch}
            disabled={!selected || isSearching}
            className={`relative flex items-center justify-center gap-3 px-8 py-3 rounded-full transition-all ${selected && !isSearching
              ? "bg-black cursor-pointer hover:bg-gray-900 shadow-lg hover:shadow-xl"
              : "bg-gray-300 cursor-not-allowed"
              }`}
            whileHover={selected && !isSearching ? { scale: 1.02 } : {}}
            whileTap={selected && !isSearching ? { scale: 0.98 } : {}}
          >
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg">
                {isSearching ? content.searching : content.search}
              </span>
              <span className="text-white/70 text-[10px] font-light">
                {isSearching ? "Please wait..." : "Get your answer in 2 min"}
              </span>
            </div>

            {!isSearching && (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}

            {isSearching && (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Bouncing hand */}
            {!isSearching && selected && (
              <motion.span
                className="absolute -right-2 -bottom-2 text-2xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                👆
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Bottom Info - Compact */}
      <div className="space-y-3">
        <p className="text-center text-gray-500 text-xs">
          {content.bottomText}
        </p>

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full px-4 py-2 shadow-md">
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {content.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white text-[10px] font-semibold whitespace-nowrap">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}