import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-osb8kvu2n8";
import imgMan from "figma:asset/a09286d16cb2e61dcf74ec8ac8654c045da214eb.png";
import imgWoman from "figma:asset/8efef5880f89d6834ee5c2665d6e6809b1da0c14.png";
import { useService } from "../../lib/ServiceContext";
import { serviceContent } from "../../lib/content";
import { ServiceButton } from "../ui/ServiceButton";

import { useNavigate } from "react-router-dom";

export function DatingForm() {
  const { selectedService } = useService();
  const navigate = useNavigate();
  const content = serviceContent[selectedService].form;
  const [selected, setSelected] = useState<"man" | "woman" | null>(null);
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

  return (
    <div className="bg-white relative rounded-[32px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] border border-gray-100 w-full max-w-2xl mx-auto min-h-[500px] p-6 md:p-10 backdrop-blur-sm">
      {/* Heading */}
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-['Inter_Tight:Bold',sans-serif] text-[#020817] text-2xl md:text-3xl mb-3">
          {content.title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          {content.subtitle}
        </p>
      </div>

      {/* Avatars Section */}
      <div className="mb-8 md:mb-10">
        {/* Avatars Container */}
        <div className="flex justify-center gap-4 md:gap-6">

          {/* Man Avatar */}
          <motion.button
            onClick={() => setSelected("man")}
            className={`relative rounded-[20px] shrink-0 w-[140px] h-[140px] md:w-[180px] md:h-[180px] transition-all ${selected === "man" ? "scale-105" : "hover:scale-105"
              }`}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px] transition-colors ${selected === "man" ? "border-green-500" : "border-slate-200"
                }`}
            />

            <div className="absolute bottom-[30px] md:bottom-[39.67px] h-[140px] md:h-[180.53px] left-1/2 translate-x-[-50%] w-[132px] md:w-[170.67px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMan} />
              </div>
            </div>

            <div
              className={`absolute bottom-[3.67px] content-stretch flex h-[48px] md:h-[60px] items-center justify-center left-[2.59%] right-[2.59%] rounded-bl-[15px] rounded-br-[15px] transition-colors ${selected === "man" ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]" : "bg-[#dddddd]"
                }`}
            >
              <div className={`flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18px] md:text-[24px] text-center text-nowrap ${selected === "man" ? "text-white" : "text-black"
                }`}>
                <p className="leading-[28px] md:leading-[32px] whitespace-pre">{content.man}</p>
              </div>
            </div>
          </motion.button>

          {/* Woman Avatar */}
          <motion.button
            onClick={() => setSelected("woman")}
            className={`relative rounded-[20px] shrink-0 w-[140px] h-[140px] md:w-[180px] md:h-[180px] transition-all ${selected === "woman" ? "scale-105" : "hover:scale-105"
              }`}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px] transition-colors ${selected === "woman" ? "border-green-500" : "border-slate-200"
                }`}
            />

            <div className="absolute bottom-[30px] md:bottom-[39.66px] left-1/2 w-[132px] h-[140px] md:w-[170.67px] md:h-[170.67px] translate-x-[-50%]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgWoman} />
              </div>
            </div>

            <div
              className={`absolute bottom-[3.67px] content-stretch flex h-[48px] md:h-[60px] items-center justify-center left-[2.59%] right-[2.59%] rounded-bl-[15px] rounded-br-[15px] transition-colors ${selected === "woman" ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]" : "bg-[#dddddd]"
                }`}
            >
              <div className={`flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18px] md:text-[24px] text-center text-nowrap ${selected === "woman" ? "text-white" : "text-black"
                }`}>
                <p className="leading-[28px] md:leading-[32px] whitespace-pre">{content.woman}</p>
              </div>
            </div>
          </motion.button>

        </div>
      </div>

      {/* Button Container */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-center">
          <motion.button
            onClick={handleSearch}
            disabled={!selected || isSearching}
            className={`relative box-border content-stretch flex items-center justify-center px-[48px] md:px-[72px] py-[8px] rounded-[9999px] shrink-0 transition-all shadow-lg ${selected && !isSearching
                ? "bg-black cursor-pointer hover:bg-gray-900 hover:shadow-xl"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            whileHover={selected && !isSearching ? { scale: 1.02, y: -2 } : {}}
            whileTap={selected && !isSearching ? { scale: 0.98 } : {}}
          >
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full">
                <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] md:text-[30px] text-center text-nowrap text-slate-50">
                  <p className="leading-[28px] md:leading-[36px] whitespace-pre">
                    {isSearching ? content.searching : content.search}
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="flex flex-col font-['Inter_Tight:ExtraLight',sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap text-slate-50">
                  <p className="leading-[14px] md:leading-[16px] whitespace-pre">
                    {isSearching ? "Veuillez patienter..." : "️Obtenez votre réponse en 2 min"}
                  </p>
                </div>
              </div>
            </div>

            {!isSearching && (
              <div className="absolute right-[12px] size-[32px] md:size-[40px] top-1/2 translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                  <g>
                    <path d={svgPaths.p6a7c500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                    <path d="M3.33333 20H36.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                  </g>
                </svg>
              </div>
            )}

            {!isSearching && (
              <motion.div
                className="absolute content-stretch flex flex-col items-center right-[-12px] md:right-[-16px] top-[24px] md:top-[32px]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[36px] md:text-[48px] text-center text-nowrap text-slate-50">
                  <p className="leading-[40px] md:leading-[48px] whitespace-pre">👆</p>
                </div>
              </motion.div>
            )}

            {isSearching && (
              <motion.div
                className="absolute right-[12px] size-[32px] md:size-[40px] top-1/2 translate-y-[-50%]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-4 border-white border-t-transparent rounded-full" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="space-y-3 md:space-y-4">
        <div className="text-center">
          <p className="font-['Inter_Tight:Light',sans-serif] font-light text-[#020817] text-xs md:text-sm">
            {content.bottomText}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-[9999px] px-4 md:px-6 py-2.5 shadow-lg">
            <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-center">

              {content.badges.map((badge, index) => (
                <div key={index} className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[20px] md:size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d={svgPaths.pace200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d="M9 12L11 14L15 10" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] md:text-[12px] text-nowrap text-white">
                    <p className="leading-[14px] md:leading-[16px] whitespace-pre">{badge}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}