import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Play, Star, Volume2, VolumeX } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Cheater.mp4",
    author: "@julie_investigate",
    role: "Verified User",
    quote: "I had a doubt, now I have proof. Thanks ProfileFinder.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    videoUrl:
      "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/SnapInsta.to_AQOnlVE_ulm8mX1L8JD1Y8HPc-GSm9yGlOnuxtuQf4ni4Lll7ts8izk_XrjEqVt7BSs0ogrT4XMj_xIg2GVSZWh20UQhSMEX1GJDBwI.mp4",
    author: "@alex_hunter",
    role: "Investigator",
    quote: "The face recognition tool is just mind-blowing accuracy.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    videoUrl:
      "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Worst%20fear%20came%20true%20%20%23catchingcheaters%20%23tinder%20%23profilefinder%20%23betrayal%20%23breakuptiktok%20%23breakups.mp4",
    author: "@sarah_truth",
    role: "Daily User",
    quote: "Found him in 2 minutes flat. It's almost scary how effective it is.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 4,
    videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Cheater.mp4",
    author: "@mike_detect",
    role: "Pro Investigator",
    quote: "The geolocation history feature is a game changer for my cases.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

export const UGCSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="ugc-videos"
      className="py-16 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden font-sans"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-white text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md shadow-sm">
              <Heart className="w-3 h-3 fill-white text-white animate-pulse" />
              Wall of Love
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-sm leading-tight">
              Real Stories, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-white">Real Truth</span>.
            </h2>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 text-white transition-all backdrop-blur-md active:scale-95 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 text-white transition-all backdrop-blur-md active:scale-95 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="flex-shrink-0 snap-center">
              <VideoCard data={item} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </section>
  );
};

type VideoCardProps = {
  data: (typeof TESTIMONIALS)[number];
};

const VideoCard: React.FC<VideoCardProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col gap-3 group w-[260px] md:w-[280px]">
      <div
        className="relative aspect-[9/16] bg-black rounded-[1.5rem] border-[4px] border-white/50 shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-rose-500/30 cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={data.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 p-1.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors z-20"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-xl p-4 rounded-xl border border-white/60 shadow-md text-left transition-all hover:bg-white transform hover:-translate-y-1">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full border border-rose-100 overflow-hidden flex-shrink-0 shadow-sm">
            <img src={data.avatar} alt={data.author} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 text-xs font-bold truncate">{data.author}</p>
            <div className="flex items-center">
              <div className="flex mr-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-[9px] text-gray-400 font-medium truncate">• {data.role}</span>
            </div>
          </div>
        </div>

        <div className="relative pl-3">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-rose-300 rounded-full"></div>
          <p className="text-gray-600 text-[11px] font-medium italic leading-snug line-clamp-2">"{data.quote}"</p>
        </div>
      </div>
    </div>
  );
};

export default UGCSection;
