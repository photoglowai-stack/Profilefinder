import { motion } from "framer-motion";
import { Users, Target, Zap, Shield } from "lucide-react";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  target: Target,
  zap: Zap,
  shield: Shield
};

export function StatsBar() {
  const { selectedService, colors } = useService();
  const content = serviceContent[selectedService].statsBar;
  const stats = content.items;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full py-6 md:py-8"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}05)`,
        borderTop: `1px solid ${colors.primary}10`,
        borderBottom: `1px solid ${colors.primary}10`
      }}
    >
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center text-center p-4 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${colors.primary}10`
              }}
            >
              <span
                className="text-2xl md:text-3xl font-black tracking-tight mb-1"
                style={{ color: colors.primary }}
              >
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-medium text-slate-600">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}