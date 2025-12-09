import { motion } from "framer-motion";
import { Users, Target, Zap, Shield } from "lucide-react";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";

const iconMap = {
  users: Users,
  target: Target,
  zap: Zap,
  shield: Shield
};

export function StatsBar() {
  const { selectedService } = useService();
  const content = serviceContent[selectedService].statsBar;

  const stats = content.items;

  return null;
}