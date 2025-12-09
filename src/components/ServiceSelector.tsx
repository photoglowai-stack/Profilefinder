import { AnimatePresence, motion } from "framer-motion";
import { Heart, Users, ScanFace, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceType, serviceContent } from "../lib/content";
import { useService } from "../lib/ServiceContext";
import { serviceColors } from "../lib/serviceColors";

interface ServiceSelectorProps {
  selected: ServiceType;
  onSelect: (service: ServiceType) => void;
}

const services = [
  {
    id: "dating" as ServiceType,
    title: "DATING APP SEARCH",
    description: "Find any profile on dating apps",
    icon: Heart
  },
  {
    id: "following" as ServiceType,
    title: "FOLLOWING AI",
    description: "Track someone's Instagram following",
    icon: Users
  },
  {
    id: "facetrace" as ServiceType,
    title: "FACE TRACE",
    description: "Verify if someone uses fake photos",
    icon: ScanFace
  },
  {
    id: "fidelity" as ServiceType,
    title: "FIDELITY TEST",
    description: "Analyze conversations to detect anomalies",
    icon: MessageSquare
  }
];

export function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  const { selectedService } = useService();
  const content = serviceContent[selectedService].serviceSelector;
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSelector(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-8 -mt-16 md:-mt-20 mb-12 md:mb-16 relative z-20">
      <AnimatePresence>
        {showSelector && (
          <motion.div
            key="service-selector"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-center text-sm md:text-base text-white font-semibold mb-4 md:mb-6 drop-shadow-2xl tracking-wide">
              {content.title}
            </h3>

            <div className="flex flex-wrap justify-center gap-2 max-w-4xl w-full">
              {services.map((service, index) => {
                const serviceColor = serviceColors[service.id];
                const isSelected = selected === service.id;

                return (
                  <motion.button
                    key={service.id}
                    onClick={() => onSelect(service.id)}
                    aria-label={content.services[service.id].name}
                    className={`group relative rounded-full px-2.5 md:px-3.5 py-1.5 transition-all border-2 ${
                      isSelected
                        ? "shadow-lg"
                        : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                    }`}
                    style={isSelected ? {
                      borderColor: serviceColor.primary,
                      background: `linear-gradient(135deg, ${serviceColor.primary}, ${serviceColor.secondary})`,
                      color: "white"
                    } : {}}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div className="flex items-center justify-center gap-1.5 md:gap-2">
                      <service.icon
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 ${!isSelected ? "text-gray-600" : "text-white"}`}
                        strokeWidth={2.5}
                      />
                      <span className="sr-only">{content.services[service.id].name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}