import { motion } from "motion/react";
import { useService } from "../../lib/ServiceContext";
import svgPaths from "../../imports/svg-wg56ef214f";
import { ServiceType } from "../../lib/content";
import { getServiceTheme } from "../../lib/serviceThemes";

interface ServiceButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isSearching?: boolean;
  searchText: string;
  searchingText: string;
  subtitle?: string;
  serviceId?: ServiceType;
}

export function ServiceButton({
  onClick,
  disabled,
  isSearching,
  searchText,
  searchingText,
  subtitle,
  serviceId
}: ServiceButtonProps) {
  const { selectedService } = useService();
  const theme = getServiceTheme(serviceId ?? selectedService);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative box-border content-stretch flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-full shrink-0 transition-all shadow-lg ${
        !disabled && !isSearching
          ? `${theme.primaryBg} ${theme.primaryHoverBg} ${theme.primaryText} cursor-pointer hover:shadow-xl`
          : "bg-gray-400 text-white cursor-not-allowed"
      }`}
      whileHover={!disabled && !isSearching ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !isSearching ? { scale: 0.98 } : {}}
    >
      <div className="content-stretch flex flex-col items-start relative shrink-0">
        <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full">
          <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] md:text-[30px] text-center text-nowrap text-slate-50">
            <p className="leading-[28px] md:leading-[36px] whitespace-pre">
              {isSearching ? searchingText : searchText}
            </p>
          </div>
        </div>
        {subtitle && (
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <div className="flex flex-col font-['Inter_Tight:ExtraLight',sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap text-slate-50">
              <p className="leading-[14px] md:leading-[16px] whitespace-pre">
                {isSearching ? "Veuillez patienter..." : subtitle}
              </p>
            </div>
          </div>
        )}
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

      {isSearching && (
        <div className="absolute right-[12px] top-1/2 translate-y-[-50%]">
          <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.button>
  );
}
