import { ServiceType } from "./content";

type ServiceTheme = { primaryBg: string; primaryHoverBg: string; primaryText: string };

const DEFAULT_THEME: ServiceTheme = {
  primaryBg: "bg-pink-600",
  primaryHoverBg: "hover:bg-pink-700",
  primaryText: "text-white"
};

export const SERVICE_COLOR_THEMES: Record<ServiceType, ServiceTheme> = {
  dating: {
    primaryBg: "bg-pink-600",
    primaryHoverBg: "hover:bg-pink-700",
    primaryText: "text-white"
  },
  following: {
    primaryBg: "bg-purple-600",
    primaryHoverBg: "hover:bg-purple-700",
    primaryText: "text-white"
  },
  facetrace: {
    primaryBg: "bg-indigo-600",
    primaryHoverBg: "hover:bg-indigo-700",
    primaryText: "text-white"
  },
  fidelity: {
    primaryBg: "bg-rose-600",
    primaryHoverBg: "hover:bg-rose-700",
    primaryText: "text-white"
  }
};

export function getServiceTheme(service: ServiceType | undefined) {
  if (!service) return DEFAULT_THEME;
  return SERVICE_COLOR_THEMES[service] ?? DEFAULT_THEME;
}
