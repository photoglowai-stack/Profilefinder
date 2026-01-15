import { motion } from "framer-motion";
import { serviceColors } from "../lib/serviceColors";
import { Heart, Users, ScanFace, MessageSquare } from "lucide-react";

const services = [
  { id: "dating", name: "Dating Search", icon: Heart },
  { id: "following", name: "Following AI", icon: Users },
  { id: "facetrace", name: "Face Trace", icon: ScanFace },
  { id: "fidelity", name: "Fidelity Test", icon: MessageSquare }
] as const;

export function ServiceColorGuide() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Service Colors</h3>
      <div className="space-y-2">
        {services.map((service) => {
          const colors = serviceColors[service.id];
          const Icon = service.icon;
          
          return (
            <div key={service.id} className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-900">{colors.name}</div>
                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
