"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useService } from "../lib/ServiceContext";
import { ServiceType } from "../lib/content";
import {
  Activity,
  ArrowRight,
  Check,
  Clock,
  Fingerprint,
  Globe,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  MessageSquare,
  ScanFace,
  Search,
  Shield,
  Star,
  TrendingUp,
  UploadCloud,
  User,
  Users,
  X,
} from "lucide-react";
import { FidelityForm } from "./forms/FidelityForm";

// --- Types ---
type GenderType = "man" | "woman";

type ServiceContent = {
  h1: string;
  desc: string;
  instruction: string;
  cta: string;
  ctaEmoji: string;
  buttonIcon: React.ReactNode;
  buttonClass: string;
};

interface GenderCardProps {
  gender: string;
  selected: boolean;
  onClick: () => void;
  img: string;
  isWoman?: boolean;
  accent: AccentClasses;
}

interface UploadDropzoneProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accent: AccentClasses;
}

type AccentClasses = {
  text: string;
  border: string;
  shadow: string;
  badge: string;
};

const HERO_AVATAR_MAN =
  "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(6).svg";
const HERO_AVATAR_WOMAN =
  "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/FEMME.svg";
const HERO_LOGO =
  "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg";

const TRUSTED_USERS = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=9",
  "https://i.pravatar.cc/100?img=32",
];

const SERVICES = [
  {
    id: "dating" as ServiceType,
    label: "Dating Search",
    icon: <Heart size={20} strokeWidth={2.5} />,
    path: "/",
  },
  {
    id: "following" as ServiceType,
    label: "Following AI",
    icon: <Users size={20} strokeWidth={2.5} />,
    path: "/following-ai",
  },
  {
    id: "facetrace" as ServiceType,
    label: "Face Trace",
    icon: <ScanFace size={20} strokeWidth={2.5} />,
    path: "/face-trace",
  },
  {
    id: "fidelity" as ServiceType,
    label: "Fidelity Test",
    icon: <MessageSquare size={20} strokeWidth={2.5} />,
    path: "/fidelity-test",
  },
];

const NAV_ITEMS = ["Search Profile", "Blog", "Affiliate Program"];

const SERVICE_LINKS = [
  { label: "Dating Search", path: "/dating-search/form", icon: "❤️" },
  { label: "Following AI", path: "/following-ai", icon: "👥" },
  { label: "Face Trace", path: "/face-trace", icon: "🔍" },
  { label: "Fidelity Test", path: "/fidelity-test", icon: "🛡️" },
];

const TRENDING_KEYWORDS = [
  "Pimeyes Alternative",
  "Reverse Image Search",
  "Face Search Free",
  "Instagram Finder",
  "Tinder Profile Search",
  "AI Face Recognition",
];

const CONTENT_MAP: Record<ServiceType, ServiceContent> = {
  dating: {
    h1: "Find any profile on Tinder with AI Face Search",
    desc: "Uncover your partner's secrets with the #1 Tinder Profile Finder. More accurate than Pimeyes for dating apps.",
    instruction: "WHO ARE YOU LOOKING FOR?",
    cta: "START SEARCH",
    ctaEmoji: "🔍",
    buttonIcon: <Search size={22} strokeWidth={3} />,
    buttonClass: "bg-hero-cta-dating",
  },
  following: {
    h1: "Reveal Hidden Instagram Connections",
    desc: "Analyze their entire following list instantly. See who they recently followed and uncover suspicious interactions.",
    instruction: "ENTER TARGET USERNAME",
    cta: "ANALYZE FOLLOWINGS",
    ctaEmoji: "📊",
    buttonIcon: <Instagram size={22} strokeWidth={2.5} />,
    buttonClass: "bg-hero-cta-following",
  },
  facetrace: {
    h1: "Track Digital Footprint & Web Activity",
    desc: "The ultimate Pimeyes alternative. Find every profile, blog post, and image trace across the entire web.",
    instruction: "UPLOAD PHOTO TO SCAN",
    cta: "START WEB SCAN",
    ctaEmoji: "🌐",
    buttonIcon: <ScanFace size={22} strokeWidth={2.5} />,
    buttonClass: "bg-hero-cta-facetrace",
  },
  fidelity: {
    h1: "Scan Chat Screenshots for Red Flags",
    desc: "Upload screenshots of suspicious conversations (WhatsApp, SMS, Tinder). Our AI detects hidden infidelity signals.",
    instruction: "UPLOAD CHAT SCREENSHOT",
    cta: "ANALYZE CHAT",
    ctaEmoji: "🛡️",
    buttonIcon: <MessageCircle size={22} strokeWidth={2.5} />,
    buttonClass: "bg-hero-cta-fidelity",
  },
};

const HERO_GRADIENT_CLASSES: Record<ServiceType, string> = {
  dating: "bg-hero-dating",
  following: "bg-hero-following",
  facetrace: "bg-hero-facetrace",
  fidelity: "bg-hero-fidelity",
};

const ACCENT_CLASSES: Record<ServiceType, AccentClasses> = {
  dating: {
    text: "text-rose-500",
    border: "border-rose-500",
    shadow: "shadow-rose-500/40",
    badge: "bg-rose-500",
  },
  following: {
    text: "text-violet-500",
    border: "border-violet-500",
    shadow: "shadow-violet-500/40",
    badge: "bg-violet-500",
  },
  facetrace: {
    text: "text-sky-500",
    border: "border-sky-500",
    shadow: "shadow-sky-500/40",
    badge: "bg-sky-500",
  },
  fidelity: {
    text: "text-pink-600",
    border: "border-pink-600",
    shadow: "shadow-pink-500/40",
    badge: "bg-pink-600",
  },
};

const HeroAntigravity: React.FC = () => {
  const router = useRouter();
  const { selectedService, setSelectedService } = useService();
  const [selectedGender, setSelectedGender] = useState<GenderType>("man");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faceTraceImage, setFaceTraceImage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [faceTraceFile, setFaceTraceFile] = useState<File | null>(null);

  const handleFaceTraceUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFaceTraceFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaceTraceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const clearFaceTraceImage = useCallback(() => {
    setFaceTraceImage(null);
    setFaceTraceFile(null);
  }, []);

  const currentContent = useMemo(() => CONTENT_MAP[selectedService], [selectedService]);
  const heroGradient = HERO_GRADIENT_CLASSES[selectedService];
  const accent = ACCENT_CLASSES[selectedService];

  const handleServiceSelect = useCallback(
    (service: (typeof SERVICES)[number]) => {
      setSelectedService(service.id);
      router.push(service.path);
    },
    [router, setSelectedService]
  );

  const handleActionClick = useCallback(() => {
    if (selectedService === "facetrace") {
      if (typeof window !== "undefined" && faceTraceImage) {
        sessionStorage.setItem("pf_facetrace_image", faceTraceImage);
      }
      router.push("/face-trace");
      return;
    }

    if (selectedService === "following") {
      router.push("/activity-tracker");
      return;
    }

    if (selectedService === "dating") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push("/dating-search/form");
      return;
    }

    router.push("/payment");
  }, [faceTraceImage, router, selectedService]);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-b-[48px] pb-20 text-white transition-colors duration-500",
        "font-[var(--font-display),_'Plus_Jakarta_Sans',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]",
        heroGradient
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] rounded-b-[48px] bg-hero-bottom-fade" />

      <HeroNavbar isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen(prev => !prev)} />

      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 pb-12 pt-8 text-center">
        <div className="mb-10 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur">
          <div className="flex">
            {TRUSTED_USERS.map((url, index) => (
              <div
                key={url}
                className={cn(
                  "relative h-8 w-8 overflow-hidden rounded-full border-2 border-rose-400",
                  index > 0 && "-ml-3"
                )}
              >
                <Image src={url} alt="User" fill sizes="32px" className="object-cover" />
              </div>
            ))}
            <div className="relative -ml-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-400 bg-white text-[10px] font-bold text-rose-500">
              +99
            </div>
          </div>
          <div className="text-left text-[12px] font-bold tracking-[0.02em] text-white/95">
            TRUSTED BY <br />
            <span className="flex items-center gap-1 font-extrabold text-white">
              500k+ users
              <Check size={12} className="rounded-full bg-emerald-500 p-[2px] text-white" strokeWidth={4} />
            </span>
          </div>
        </div>

        <div className="mb-10 w-full">
          <h1 className="mx-auto mb-6 max-w-[900px] text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            {currentContent.h1}
          </h1>
          <p className="mx-auto max-w-[640px] text-[clamp(1rem,2vw,1.25rem)] font-medium leading-relaxed text-white/90">
            {currentContent.desc}
          </p>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.05em] text-white/90">
          Choose your service:
        </p>
        <ServiceTabSelector
          services={SERVICES}
          selectedService={selectedService}
          onSelect={handleServiceSelect}
        />

        <div className="relative mb-16 w-full max-w-[480px] rounded-[40px] border border-white/60 bg-white p-6 text-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
          <div className="relative z-20 flex flex-col gap-6">
            <div className="flex justify-center">
              <div className="rounded-lg border border-slate-200 bg-slate-100 px-6 py-2">
                <span className="text-[12px] font-black uppercase tracking-[0.15em] text-rose-500">
                  {currentContent.instruction}
                </span>
              </div>
            </div>

            {selectedService === "dating" && (
              <div className="grid grid-cols-2 gap-4">
                <GenderSelectionCard
                  gender="MAN"
                  selected={selectedGender === "man"}
                  onClick={() => setSelectedGender("man")}
                  img={HERO_AVATAR_MAN}
                  accent={ACCENT_CLASSES.dating}
                />
                <GenderSelectionCard
                  gender="WOMAN"
                  selected={selectedGender === "woman"}
                  onClick={() => setSelectedGender("woman")}
                  img={HERO_AVATAR_WOMAN}
                  isWoman
                  accent={ACCENT_CLASSES.dating}
                />
              </div>
            )}

            {selectedService === "following" && (
              <div className="flex h-[300px] flex-col justify-center">
                <div className="flex flex-1 flex-col items-center justify-center pb-6">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-[0_8px_24px_rgba(168,85,247,0.3)]">
                    <Instagram size={40} />
                  </div>
                  <p className="px-4 text-center text-sm font-semibold text-slate-500">
                    Analyze public profiles & hidden connections.
                  </p>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg font-extrabold text-slate-400">
                    @
                  </div>
                  <input
                    type="text"
                    placeholder="instagram_handle"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 pl-10 text-base font-extrabold text-slate-800 outline-none"
                  />
                </div>
              </div>
            )}

            {selectedService === "facetrace" && (
              <div className="flex h-[300px] flex-col">
                {!faceTraceImage ? (
                  <UploadDropzone onUpload={handleFaceTraceUpload} accent={accent} />
                ) : (
                  <div className="relative flex-1 overflow-hidden rounded-2xl border-4 border-emerald-500">
                    <Image
                      src={faceTraceImage}
                      alt="Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      onClick={clearFaceTraceImage}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                    >
                      <X size={18} strokeWidth={3} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-1.5 text-[12px] font-bold text-white">
                      <Check size={14} strokeWidth={3} />
                      Photo ready
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedService === "fidelity" && (
              <div className="-mt-3">
                <FidelityForm />
              </div>
            )}

            {selectedService !== "fidelity" && (
              <button
                onClick={handleActionClick}
                className={cn(
                  "hero-btn shimmer-effect relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-full border border-white/10 px-6 py-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
                  currentContent.buttonClass
                )}
              >
                <div className="shimmer-bar absolute inset-0 bg-hero-shimmer" />
                <div className="relative z-20 flex items-center gap-4">
                  <span className="opacity-90">{currentContent.buttonIcon}</span>
                  <span className="text-lg font-black uppercase tracking-[0.1em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                    {currentContent.cta} {currentContent.ctaEmoji}
                  </span>
                  <ArrowRight size={20} strokeWidth={3} />
                </div>
                <span className="finger-point-animate pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[28px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                  👆
                </span>
              </button>
            )}

            <div className="mt-4 flex flex-col items-center gap-2 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={12} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-600">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={12} className="text-emerald-500" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.05em]">
                  1,302 searches today
                </span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-14 left-0 flex w-full justify-center">
            <div className="flex items-center gap-4 rounded-full border border-white/20 bg-red-600 px-6 py-3 text-[10px] font-bold text-white shadow-[0_8px_24px_rgba(255,0,51,0.3)]">
              <span className="flex items-center gap-2">
                <Shield size={12} strokeWidth={3} /> 100% Private
              </span>
              <span className="h-3 w-px bg-white/30" />
              <span className="flex items-center gap-2">
                <Clock size={12} strokeWidth={3} /> Instant
              </span>
              <span className="h-3 w-px bg-white/30" />
              <span className="flex items-center gap-2">
                <Check size={12} strokeWidth={3} /> 99% Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10 bg-black/30 py-4 backdrop-blur">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap px-4">
          {[...TRENDING_KEYWORDS, ...TRENDING_KEYWORDS].map((keyword, index) => (
            <div
              key={`${keyword}-${index}`}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60"
            >
              <TrendingUp size={12} className="text-rose-500" />
              {keyword}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-bottom-fade" />
    </section>
  );
};

const HeroNavbar = memo(function HeroNavbar({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <nav className="relative z-50 mx-auto mt-2 flex w-full max-w-[1280px] items-center justify-between rounded-b-2xl border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Image src={HERO_LOGO} alt="ProfileFinder" width={32} height={32} priority />
        <span className="text-[clamp(18px,4vw,24px)] font-black tracking-tight drop-shadow">
          ProfileFinder
        </span>
      </div>

      <div className="desktop-nav flex items-center gap-8 text-[15px] font-semibold">
        {NAV_ITEMS.map(item => (
          <a
            key={item}
            href="#"
            className="text-white/80 transition-colors hover:text-white"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="desktop-nav flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white">
          <Globe size={16} />
          <span>EN</span>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-white">
          <User size={18} />
          <span>Profile</span>
        </button>
      </div>

      <button
        className="mobile-menu-btn flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur transition"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="mobile-menu absolute left-0 right-0 top-full z-[100] mt-2 flex flex-col gap-4 rounded-b-3xl border border-white/10 bg-black/95 p-6 backdrop-blur-2xl">
          {NAV_ITEMS.map(item => (
            <a
              key={item}
              href="#"
              className="rounded-xl bg-white/5 px-4 py-3 text-lg font-semibold text-white/90"
              onClick={onToggleMenu}
            >
              {item}
            </a>
          ))}

          <div className="mt-2 border-t border-white/10 pt-4">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white/50">
              Our Services
            </p>
            <div className="flex flex-col gap-2">
              {SERVICE_LINKS.map(service => (
                <a
                  key={service.label}
                  href={service.path}
                  className="flex items-center gap-3 rounded-xl bg-rose-500/15 px-4 py-2.5 text-base font-semibold text-white/90"
                  onClick={onToggleMenu}
                >
                  <span>{service.icon}</span>
                  {service.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-3 border-t border-white/10 pt-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent py-3 text-sm font-semibold text-white">
              <Globe size={18} />
              EN
            </button>
            <button className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-slate-900">
              <User size={18} />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
});

const ServiceTabSelector = memo(function ServiceTabSelector({
  services,
  selectedService,
  onSelect,
}: {
  services: typeof SERVICES;
  selectedService: ServiceType;
  onSelect: (service: (typeof SERVICES)[number]) => void;
}) {
  return (
    <div className="mb-8 flex w-full max-w-[700px] flex-wrap justify-center gap-2 px-2">
      {services.map(service => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={cn(
            "tab-btn flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[13px] font-bold shadow-sm transition",
            selectedService === service.id
              ? "border-slate-900 bg-slate-900 text-white shadow-md"
              : "border-transparent bg-white text-slate-600"
          )}
        >
          {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
          <span className="tracking-wide">{service.label}</span>
        </button>
      ))}
    </div>
  );
});

const UploadDropzone = memo(function UploadDropzone({ onUpload, accent }: UploadDropzoneProps) {
  return (
    <div
      className={cn(
        "relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50/60 p-6 transition",
        accent.text
      )}
    >
      <div className="animate-scan absolute left-0 right-0 h-[3px] bg-current shadow-[0_0_20px_currentColor]" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <ScanFace size={48} strokeWidth={1.5} />
          <div className="absolute -bottom-1 -right-1 rounded-full border-4 border-white bg-slate-900 p-1 text-white">
            <Fingerprint size={16} />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-black text-slate-900">Drag & Drop Photo</h3>
          <p className="inline-block rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[12px] font-bold text-slate-500">
            JPG, PNG (Max 10MB)
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-[12px] font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <UploadCloud size={16} strokeWidth={3} />
          Browse Files
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </div>
  );
});

const GenderSelectionCard = memo(function GenderSelectionCard({
  gender,
  selected,
  onClick,
  img,
  isWoman,
  accent,
}: GenderCardProps) {
  return (
    <div onClick={onClick} className="gender-card flex cursor-pointer flex-col items-center">
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-3xl border-4 bg-white transition",
          selected ? cn(accent.border, "shadow-lg", accent.shadow) : "border-transparent"
        )}
      >
        <div className={cn("absolute inset-0", selected ? "bg-white" : "bg-slate-100")} />
        <div className="absolute inset-x-0 bottom-12 top-0 flex items-end justify-center overflow-hidden pb-2">
          <div className="relative h-full w-full">
            <Image
              src={img}
              alt={gender}
              fill
              sizes="(max-width: 768px) 45vw, 200px"
              priority
              className={cn(
                "object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-700",
                isWoman ? "scale-[0.95]" : "scale-100"
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 rounded-b-[20px] py-3 text-center text-[14px] font-black tracking-[0.25em] text-white",
            selected ? accent.badge : "bg-slate-400"
          )}
        >
          {gender}
        </div>
        {selected && (
          <div className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Check size={16} strokeWidth={4} className={accent.text} />
          </div>
        )}
      </div>
    </div>
  );
});

export default HeroAntigravity;
