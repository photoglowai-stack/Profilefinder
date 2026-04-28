"use client";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";
import { useService } from "../lib/ServiceContext";

// Import avatars
import imgSarah from "../assets/avatar-testimonial-sarah.png";
import imgMarcus from "../assets/avatar-testimonial-marcus.png";
import imgDavid from "../assets/avatar-testimonial-david.png";

type Platform = 'trustpilot' | 'twitter' | 'instagram';

interface Review {
  id: number;
  name: string;
  handle: string;
  content: string;
  rating?: number;
  daysAgo: number;
  verified: boolean;
  platform: Platform;
  avatar: typeof imgSarah;
  likes?: number;
  retweets?: number;
  comments?: number;
}

const reviewsConfig: Record<string, Review[]> = {
  dating: [
    {
      id: 1,
      name: "Sarah M.",
      handle: "sarah_finding",
      content: "I finally found the truth. Found his hidden Tinder profile in seconds. 🙏",
      daysAgo: 2,
      verified: true,
      platform: 'twitter',
      avatar: imgSarah,
      likes: 47,
      retweets: 12,
      comments: 8,
    },
    {
      id: 2,
      name: "Marcus T.",
      handle: "marcus_t",
      content: "Amazing service to verify before a date. Uncovered multiple dating profiles. 5/5 for effectiveness.",
      rating: 5,
      daysAgo: 5,
      verified: true,
      platform: 'trustpilot',
      avatar: imgMarcus,
    },
    {
      id: 3,
      name: "Jessica L.",
      handle: "jess_real",
      content: "Was skeptical seeing this on stories but it found exactly what he was hiding on dating apps! 🕵️‍♀️✨",
      daysAgo: 1,
      verified: true,
      platform: 'instagram',
      avatar: imgDavid,
      likes: 234,
      comments: 18,
    }
  ],
  following: [
    {
      id: 1,
      name: "Sarah M.",
      handle: "sarah_finding",
      content: "The AI tracker spotted the late-night Instagram follows I completely missed. So glad I used this before confronting him. 🙏",
      daysAgo: 2,
      verified: true,
      platform: 'twitter',
      avatar: imgSarah,
      likes: 47,
      retweets: 12,
      comments: 8,
    },
    {
      id: 2,
      name: "Marcus T.",
      handle: "marcus_t",
      content: "The automated activity reports are essential. It tracked who she was interacting with daily. 5/5 accuracy.",
      rating: 5,
      daysAgo: 5,
      verified: true,
      platform: 'trustpilot',
      avatar: imgMarcus,
    },
    {
      id: 3,
      name: "Jessica L.",
      handle: "jess_real",
      content: "Following AI literally gave me the exact timezone patterns of when he was active. The data doesn't lie! 🕵️‍♀️✨",
      daysAgo: 1,
      verified: true,
      platform: 'instagram',
      avatar: imgDavid,
      likes: 234,
      comments: 18,
    }
  ],
  facetrace: [
    {
      id: 1,
      name: "Sarah M.",
      handle: "sarah_finding",
      content: "I reverse searched an old photo and found his newly created secret accounts across 3 different sites. Scary accurate. 🙏",
      daysAgo: 2,
      verified: true,
      platform: 'twitter',
      avatar: imgSarah,
      likes: 47,
      retweets: 12,
      comments: 8,
    },
    {
      id: 2,
      name: "Marcus T.",
      handle: "marcus_t",
      content: "Face Trace uncovered a completely fake identity my 'match' was using. Saved me from a major scam. 5/5.",
      rating: 5,
      daysAgo: 5,
      verified: true,
      platform: 'trustpilot',
      avatar: imgMarcus,
    },
    {
      id: 3,
      name: "Jessica L.",
      handle: "jess_real",
      content: "Found all the social media accounts tied to the picture he sent me. Better than any PI! 🕵️‍♀️✨",
      daysAgo: 1,
      verified: true,
      platform: 'instagram',
      avatar: imgDavid,
      likes: 234,
      comments: 18,
    }
  ],
  fidelity: [
    {
      id: 1,
      name: "Sarah M.",
      handle: "sarah_finding",
      content: "The fidelity check analyzed all the red flags I was ignoring. It gave me the clarity I needed to finally leave. 🙏",
      daysAgo: 2,
      verified: true,
      platform: 'twitter',
      avatar: imgSarah,
      likes: 47,
      retweets: 12,
      comments: 8,
    },
    {
      id: 2,
      name: "Marcus T.",
      handle: "marcus_t",
      content: "Incredible AI assessment tool. It connected the dots between behavioral changes and digital footprints perfectly.",
      rating: 5,
      daysAgo: 5,
      verified: true,
      platform: 'trustpilot',
      avatar: imgMarcus,
    },
    {
      id: 3,
      name: "Jessica L.",
      handle: "jess_real",
      content: "The 360° relationship scan highlighted exactly what was wrong. Gave me the ultimate peace of mind. 🕵️‍♀️✨",
      daysAgo: 1,
      verified: true,
      platform: 'instagram',
      avatar: imgDavid,
      likes: 234,
      comments: 18,
    }
  ]
};

function formatDate(daysAgo: number): string {
  if (daysAgo === 0) return "now";
  if (daysAgo === 1) return "1d";
  if (daysAgo < 7) return `${daysAgo}d`;
  return `${Math.floor(daysAgo / 7)}w`;
}

function formatReviewDate(daysAgo: number): string {
  if (daysAgo === 0) return "today";
  if (daysAgo === 1) return "1 day ago";
  return `${daysAgo} days ago`;
}

// ═══════════════════════════════════════════════════════════════
// TWITTER/X EMBED CARD
// ═══════════════════════════════════════════════════════════════
function TwitterCard({ review }: { review: Review }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="min-h-[244px] w-[min(84vw,360px)] shrink-0 rounded-[1.35rem] border border-slate-200/80 bg-white p-5 text-slate-950 shadow-[0_18px_45px_rgba(15,23,42,0.08)] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-slate-950" />
      {/* X Logo */}
      <div className="absolute top-4 right-4">
        <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Image
          src={review.avatar}
          alt={review.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px] truncate">{review.name}</span>
            {review.verified && (
              <svg className="w-[18px] h-[18px] text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
          </div>
          <span className="text-slate-500 text-[15px]">@{review.handle}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-[15px] leading-relaxed mb-3 whitespace-pre-wrap text-slate-800">
        {review.content}
      </p>

      {/* Timestamp */}
      <p className="text-slate-500 text-sm mb-3">
        {formatDate(review.daysAgo)} · <span className="text-slate-900">ProfileFinder.ai</span>
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500">
        <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition-colors group">
          <MessageCircle className="w-[18px] h-[18px] group-hover:bg-[#1d9bf0]/10 rounded-full" />
          <span className="text-[13px]">{review.comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
          <Repeat2 className="w-[18px] h-[18px]" />
          <span className="text-[13px]">{review.retweets}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-pink-500 transition-colors">
          <Heart className="w-[18px] h-[18px]" />
          <span className="text-[13px]">{review.likes}</span>
        </button>
        <button className="hover:text-[#1d9bf0] transition-colors">
          <Share className="w-[18px] h-[18px]" />
        </button>
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRUSTPILOT EMBED CARD
// ═══════════════════════════════════════════════════════════════
function TrustpilotCard({ review }: { review: Review }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="min-h-[244px] w-[min(84vw,360px)] shrink-0 rounded-[1.35rem] border border-emerald-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#00b67a]" />
      {/* Trustpilot Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00b67a] shadow-[0_8px_18px_rgba(0,182,122,0.22)]">
            <svg className="h-4.5 w-4.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-[15px] font-black tracking-[-0.02em] text-slate-950">Trustpilot</span>
        </div>
        <span className="text-xs text-gray-400">{review.daysAgo === 1 ? 'Yesterday' : `${review.daysAgo} days ago`}</span>
      </div>

      {/* Trustpilot Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-md flex items-center justify-center ${i < (review.rating || 5) ? 'bg-[#00b67a]' : 'bg-gray-200'}`}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Review Content */}
      <p className="text-[15px] text-slate-800 font-semibold leading-relaxed mb-4">
        {review.content}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <Image
          src={review.avatar}
          alt={review.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
          {review.verified && (
            <div className="flex items-center gap-1 text-[#00b67a] text-xs">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════
// INSTAGRAM EMBED CARD
// ═══════════════════════════════════════════════════════════════
function InstagramCard({ review }: { review: Review }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="min-h-[244px] w-[min(84vw,360px)] shrink-0 rounded-[1.35rem] border border-pink-100 bg-white overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.08)] relative"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600" />
      {/* Instagram Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <div className="bg-white rounded-full p-[2px]">
              <Image
                src={review.avatar}
                alt={review.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{review.handle}</span>
              <svg className="w-3.5 h-3.5 text-[#3897f0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Instagram Logo */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDC80" />
              <stop offset="25%" stopColor="#F77737" />
              <stop offset="50%" stopColor="#F56040" />
              <stop offset="75%" stopColor="#C13584" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">{review.handle}</span>{" "}
          {review.content}
        </p>
        <p className="text-gray-400 text-xs mt-2 uppercase">
          {review.daysAgo === 0 ? 'Today' : review.daysAgo === 1 ? '1 day ago' : `${review.daysAgo} days ago`}
        </p>
      </div>

      {/* Instagram Actions */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="hover:opacity-60 transition-opacity">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <Share className="w-6 h-6" />
          </button>
        </div>
        <button className="hover:opacity-60 transition-opacity">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      {/* Likes */}
      <div className="px-4 pb-3">
        <p className="font-semibold text-sm">{review.likes?.toLocaleString()} likes</p>
      </div>
    </motion.article>
  );
}

function PlatformMark({ platform }: { platform: Platform }) {
  if (platform === "trustpilot") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00b67a] text-white shadow-[0_10px_24px_rgba(0,182,122,0.22)]">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
    );
  }

  if (platform === "instagram") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-[0_10px_24px_rgba(219,39,119,0.24)]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </span>
  );
}

function platformName(platform: Platform): string {
  if (platform === "trustpilot") return "Trustpilot";
  if (platform === "instagram") return "Instagram";
  return "Twitter/X";
}

function platformCardTheme(platform: Platform) {
  if (platform === "trustpilot") {
    return {
      topLine: "via-[#00b67a]",
      halo: "from-[#00b67a]/10",
      pill: "border-emerald-100 bg-emerald-50 text-emerald-600",
      label: "Trustpilot review",
      stars: "text-[#00b67a]",
    };
  }

  if (platform === "instagram") {
    return {
      topLine: "via-pink-400",
      halo: "from-pink-500/10",
      pill: "border-pink-100 bg-pink-50 text-pink-600",
      label: "Instagram post",
      stars: "text-[#ff9f00]",
    };
  }

  return {
    topLine: "via-slate-950",
    halo: "from-slate-950/10",
    pill: "border-slate-200 bg-slate-50 text-slate-700",
    label: "Twitter/X post",
    stars: "text-[#ff9f00]",
  };
}

function PlatformFooterMeta({ review }: { review: Review }) {
  if (review.platform === "trustpilot") {
    return (
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#00b67a]">
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        <span>Verified Trustpilot review</span>
      </div>
    );
  }

  if (review.platform === "instagram") {
    return (
      <div className="mt-4 flex items-center gap-4 text-xs font-bold text-slate-400">
        <span>{review.likes?.toLocaleString()} likes</span>
        <span>{review.comments} comments</span>
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center gap-4 text-xs font-bold text-slate-400">
      <span>{review.comments} replies</span>
      <span>{review.retweets} reposts</span>
      <span>{review.likes} likes</span>
    </div>
  );
}

function OrganicReviewCard({ review, index }: { review: Review; index: number }) {
  const isRaised = index % 4 === 1 || index % 4 === 2;
  const theme = platformCardTheme(review.platform);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`group relative flex min-h-[260px] w-[min(84vw,410px)] shrink-0 flex-col justify-between overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white p-6 text-left shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:w-[430px] md:p-7 ${isRaised ? "md:mt-8" : ""}`}
    >
      <div className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${theme.topLine} to-transparent`} />
      <div className={`pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${theme.halo} to-transparent blur-2xl`} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <PlatformMark platform={review.platform} />
          <div>
            <p className="text-sm font-black tracking-[-0.02em] text-slate-950">{platformName(review.platform)}</p>
            <p className="text-xs font-semibold text-slate-400">@{review.handle}</p>
          </div>
        </div>
        <span className="shrink-0 text-sm font-semibold text-slate-400">{formatReviewDate(review.daysAgo)}</span>
      </div>

      <div className="mt-7">
        <div className={`mb-4 flex gap-1.5 ${theme.stars}`} aria-label={`${review.rating || 5} out of 5 stars`}>
          {[...Array(5)].map((_, starIndex) => (
            <svg key={starIndex} className="h-5 w-5 drop-shadow-[0_6px_10px_rgba(255,159,0,0.2)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-[1.28rem] font-semibold leading-[1.45] tracking-[-0.02em] text-slate-800 md:text-[1.45rem]">
          {review.content}
        </p>
        <PlatformFooterMeta review={review} />
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3">
          <Image
            src={review.avatar}
            alt={review.name}
            width={46}
            height={46}
            className="rounded-full ring-2 ring-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          />
          <div>
            <p className="text-lg font-black tracking-[-0.02em] text-slate-950">{review.name}</p>
            {review.verified && <p className="text-sm font-semibold text-emerald-600">Verified</p>}
          </div>
        </div>
        <div className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${theme.pill}`}>
          {theme.label}
        </div>
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export function Testimonials() {
  const { selectedService } = useService();
  const currentReviews = reviewsConfig[selectedService] || reviewsConfig.dating;
  const otherReviews = Object.entries(reviewsConfig)
    .filter(([service]) => service !== selectedService)
    .flatMap(([, reviews]) => reviews);
  const reviewRail = [...currentReviews, ...otherReviews, ...currentReviews, ...otherReviews];

  return (
    <section id="testimonials" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <SectionHeader
          label="Social Proof"
          title="Loved Across the Web"
          description="Real reviews from real users on their favorite platforms."
          highlightedWords={["Across the Web"]}
        />

        {/* Platform Logos Header */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur border border-slate-200 rounded-full px-5 md:px-6 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            {/* Trustpilot */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#00b67a] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">4.9</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            {/* X/Twitter */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">12K+</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            {/* Instagram */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">8K+</span>
            </div>
          </div>
        </div>

        {/* Across the Web Rail */}
        <div className="relative -mx-4 md:-mx-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

          <div className="testimonials-marquee overflow-x-auto md:overflow-hidden px-4 md:px-8 py-4">
            <div className="testimonials-marquee-track flex w-max items-stretch gap-5 md:gap-6">
              {reviewRail.map((review, index) => (
                <OrganicReviewCard
                  key={`${review.platform}-${review.id}-${review.handle}-${index}`}
                  review={review}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
