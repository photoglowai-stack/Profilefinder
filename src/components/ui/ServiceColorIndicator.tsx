import { motion } from "motion/react";
import { useService } from "../../lib/ServiceContext";

export function ServiceColorIndicator() {
  const { colors, selectedService } = useService();
  
  const serviceNames = {
    dating: "Dating Search",
    following: "Following AI",
    facetrace: "Face Trace",
    fidelity: "Fidelity Test"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border-2"
      style={{
        background: `linear-gradient(to right, ${colors.primary}15, ${colors.secondary}15)`,
        borderColor: colors.primary
      }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
        />
        <span className="text-sm font-medium" style={{ color: colors.primary }}>
          {serviceNames[selectedService]}
        </span>
      </div>
    </motion.div>
  );
}
