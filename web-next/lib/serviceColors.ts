export type ServiceType = "dating" | "following" | "facetrace" | "fidelity";

export const serviceColors = {
  dating: {
    name: "Dating Search",
    // Rouge-orange (actuel)
    primary: "#ff4e71",
    secondary: "#ff7f66",
    gradient: "from-[#ff4e71] to-[#ff7f66]",
    lightBg: "from-red-50 to-orange-50",
    badge: "bg-red-50 text-red-600 border-red-100",
    badgeDark: "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white",
    hover: "hover:border-[#ff4e71]",
    text: "text-[#ff4e71]",
    ring: "ring-[#ff4e71]",
    button: "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]"
  },
  following: {
    name: "Following AI",
    // Violet-purple
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    gradient: "from-[#8b5cf6] to-[#a78bfa]",
    lightBg: "from-violet-50 to-purple-50",
    badge: "bg-violet-50 text-violet-600 border-violet-100",
    badgeDark: "bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white",
    hover: "hover:border-[#8b5cf6]",
    text: "text-[#8b5cf6]",
    ring: "ring-[#8b5cf6]",
    button: "bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]"
  },
  facetrace: {
    name: "Face Trace",
    // Bleu-indigo
    primary: "#3b82f6",
    secondary: "#60a5fa",
    gradient: "from-[#3b82f6] to-[#60a5fa]",
    lightBg: "from-blue-50 to-indigo-50",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
    badgeDark: "bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white",
    hover: "hover:border-[#3b82f6]",
    text: "text-[#3b82f6]",
    ring: "ring-[#3b82f6]",
    button: "bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
  },
  fidelity: {
    name: "Fidelity Test",
    // Rose-pink foncé
    primary: "#ec4899",
    secondary: "#f472b6",
    gradient: "from-[#ec4899] to-[#f472b6]",
    lightBg: "from-pink-50 to-rose-50",
    badge: "bg-pink-50 text-pink-600 border-pink-100",
    badgeDark: "bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white",
    hover: "hover:border-[#ec4899]",
    text: "text-[#ec4899]",
    ring: "ring-[#ec4899]",
    button: "bg-gradient-to-r from-[#ec4899] to-[#f472b6]"
  }
};

// Helper function to get colors for current service
export function getServiceColors(service: ServiceType) {
  return serviceColors[service];
}
