import { useState } from "react";
import { motion } from "framer-motion";
import svgPaths from "../../imports/svg-osb8kvu2n8";
import { useService } from "../../lib/ServiceContext";
import { serviceContent } from "../../lib/content";
import { useNavigate } from "react-router-dom";

// Avatars from public folder
const imgMan = '/assets/avatars/dating-man-3d.png';
const imgWoman = '/assets/avatars/dating-woman-3d.png';

export function DatingForm() {
  const { selectedService } = useService();
  const navigate = useNavigate();
  const content = serviceContent[selectedService].form;
  const [selected, setSelected] = useState<"man" | "woman" | null>("man");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (selected) {
      setIsSearching(true);
      setTimeout(() => {
        navigate("/payment");
        setIsSearching(false);
      }, 800);
    }
  };

  const cardClasses = (gender: "man" | "woman") =>
    `group relative w-32 h-40 md:w-36 md:h-44 rounded-2xl transition-all duration-300 overflow-hidden bg-white border-2 ${
      selected === gender
        ? "border-[#10B981] ring-4 ring-[#10B981]/20 scale-105 shadow-[0_12px_30px_rgba(16,185,129,0.25)]"
        : "border-gray-200 hover:border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
    }`;

  const labelClasses = (gender: "man" | "woman") =>
    `h-[25%] w-full flex items-center justify-center transition-colors text-sm font-bold tracking-wide ${
      selected === gender ? "bg-[#EF3E5C] text-white" : "bg-gray-100 text-gray-700"
    }`;

  return (
    <div className="bg-gradient-to-br from-[#ff9ba2] via-[#ffc1b1] to-[#ffe3d4] rounded-[26px] p-1">
      <div className="bg-white relative rounded-3xl shadow-xl border border-white/60 w-full max-w-md mx-auto p-6 md:p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="font-bold text-gray-900 text-xl md:text-2xl mb-2">
            {content.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Avatars Section */}
        <div className="mb-6 flex justify-center gap-6">
          <motion.button
            type="button"
            onClick={() => setSelected("man")}
            className={cardClasses("man")}
            whileTap={{ scale: 0.97 }}
          >
            <div className="h-[75%] w-full relative bg-[#f8fafc] flex items-center justify-center">
              <img
                src={imgMan}
                alt="Man"
                className="w-full h-full object-contain object-center"
                draggable={false}
              />
            </div>
            <div className={labelClasses("man")}>
              <span>{content.man}</span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setSelected("woman")}
            className={cardClasses("woman")}
            whileTap={{ scale: 0.97 }}
          >
            <div className="h-[75%] w-full relative bg-[#f8fafc] flex items-center justify-center">
              <img
                src={imgWoman}
                alt="Woman"
                className="w-full h-full object-contain object-center"
                draggable={false}
              />
            </div>
            <div className={labelClasses("woman")}>
              <span>{content.woman}</span>
            </div>
          </motion.button>
        </div>

        {/* Button Container */}
        <div className="mb-6 flex justify-center">
          <motion.button
            type="button"
            onClick={handleSearch}
            disabled={!selected || isSearching}
            className={`relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full transition-all font-semibold text-white ${
              selected && !isSearching
                ? "bg-black cursor-pointer hover:bg-gray-900 shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            whileHover={selected && !isSearching ? { scale: 1.01 } : {}}
            whileTap={selected && !isSearching ? { scale: 0.98 } : {}}
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="text-lg md:text-xl font-bold">
                {isSearching ? content.searching : content.search}
              </span>
              <span className="text-white/80 text-[11px] font-medium">
                {isSearching ? "Please wait..." : "Get your answer in 2 minutes"}
              </span>
            </div>

            {!isSearching && (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            {!isSearching && selected && (
              <motion.span
                className="absolute -right-3 -bottom-3 text-3xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                👆
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Bottom Info */}
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
    </div>
  );
}