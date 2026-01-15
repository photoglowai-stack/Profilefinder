import { motion } from "framer-motion";
import { Heart, Users, ScanFace, MessageSquare } from "lucide-react";
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
  
  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-8 -mt-16 md:-mt-20 mb-12 md:mb-16 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <h3 className="text-center text-base md:text-lg text-white font-semibold mb-6 md:mb-8 drop-shadow-2xl tracking-wide">
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
                className={`group relative rounded-full px-3 md:px-4 py-2 transition-all border-2 ${
                  isSelected
                    ? "shadow-lg"
                    : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                }`}
                style={isSelected ? {
                  borderColor: serviceColor.primary,
                  background: `linear-gradient(135deg, ${serviceColor.primary}, ${serviceColor.secondary})`,
                  color: 'white'
                } : {}}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1
                }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <service.icon 
                    className={`w-4 h-4 flex-shrink-0 ${!isSelected ? "text-gray-600" : "text-white"}`} 
                    strokeWidth={2.5} 
                  />
                  
                  {/* Title */}
                  <span className={`text-xs md:text-sm whitespace-nowrap ${
                    !isSelected ? "text-gray-800" : "text-white"
                  }`}>
                    {content.services[service.id].name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}