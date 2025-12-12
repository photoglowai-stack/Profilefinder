import { motion } from "framer-motion";
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-full shadow-xl backdrop-blur-md border-2"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
        borderColor: colors.primary,
        boxShadow: `0 4px 20px ${colors.primary}40`
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
        />
        <span className="text-sm font-semibold" style={{ color: colors.primary }}>
          {serviceNames[selectedService]}
        </span>
      </div>
    </motion.div>
  );
}
