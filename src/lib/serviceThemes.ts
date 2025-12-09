import { ServiceType } from "./content";

export const SERVICE_COLOR_THEMES: Record<
  ServiceType,
  { primaryBg: string; primaryHoverBg: string; primaryText: string }
> = {
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

export function getServiceTheme(service: ServiceType) {
  return SERVICE_COLOR_THEMES[service];
}
