"use client";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";

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

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    handle: "sarah_finding",
    content: "I finally found the truth. The reverse image search is scary accurate. Found profiles I didn't know existed in seconds. 🙏",
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
    content: "Service incroyable pour vérifier avant un date. Le support m'a aidé à interpréter les résultats. 5/5 pour l'efficacité.",
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
    content: "Was skeptical seeing this on stories but tried the face trace. Worth every penny for the peace of mind! 🕵️‍♀️✨",
    daysAgo: 1,
    verified: true,
    platform: 'instagram',
    avatar: imgDavid,
    likes: 234,
    comments: 18,
  },
];

function formatDate(daysAgo: number): string {
  if (daysAgo === 0) return "now";
  if (daysAgo === 1) return "1d";
  if (daysAgo < 7) return `${daysAgo}d`;
  return `${Math.floor(daysAgo / 7)}w`;
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
      className="bg-black rounded-2xl p-4 border border-zinc-800 text-white relative"
    >
      {/* X Logo */}
      <div className="absolute top-4 right-4">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
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
          <span className="text-zinc-500 text-[15px]">@{review.handle}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-[15px] leading-relaxed mb-3 whitespace-pre-wrap">
        {review.content}
      </p>

      {/* Timestamp */}
      <p className="text-zinc-500 text-sm mb-3">
        {formatDate(review.daysAgo)} · <span className="text-white">ProfileFinder.ai</span>
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-zinc-500">
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
      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
    >
      {/* Trustpilot Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Trustpilot Logo */}
          <svg className="h-5" viewBox="0 0 126 31" fill="none">
            <path d="M33.076 9.401h4.473v17.026h-4.473V9.401zm11.903 0h4.188l6.283 11.67V9.4h4.26v17.026h-4.188L49.24 14.756v11.671h-4.261V9.401zm-8.49 0h4.26v17.026h-4.26V9.401zm31.9 4.64c-.712-.656-1.67-.984-2.875-.984-1.507 0-2.616.574-3.328 1.722-.407.656-.611 1.476-.611 2.46v7.381h-4.26V9.401h4.116v2.132c.61-.82 1.181-1.394 1.71-1.722.956-.656 2.138-.984 3.542-.984 1.831 0 3.267.492 4.31 1.476 1.018.984 1.54 2.378 1.567 4.182v11.942h-4.331v-10.63c0-.902-.244-1.64-.732-2.214-.488-.574-1.161-.861-2.019-.861-.997 0-1.791.328-2.381.984-.407.41-.611.943-.611 1.599v11.122H62.4V9.401h4.116v2.214c.61-.902 1.181-1.517 1.71-1.845.997-.656 2.199-.984 3.603-.984 1.872 0 3.348.492 4.432 1.476 1.058.984 1.588 2.378 1.588 4.182v11.983h-4.33v-10.712c-.025-.82-.244-1.517-.659-2.091-.488-.574-1.161-.902-2.019-.902-1.058 0-1.872.369-2.443 1.107-.407.492-.611 1.066-.611 1.722v10.876H62.4V9.401h4.116v2.091c.61-.82 1.181-1.394 1.71-1.722.956-.656 2.138-.984 3.542-.984 1.831 0 3.267.492 4.31 1.476l.001-.001zm-56.612 0h9.412v3.116h-5.16v3.568h4.757v3.116h-4.757v4.016h5.384v3.21H11.777V9.401z" fill="#191919" />
            <path d="M21.586 12.66l-6.524 4.74 2.493 7.672-6.524-4.74-6.524 4.74 2.493-7.672L.476 12.66h8.062l2.493-7.672 2.493 7.672h8.062z" fill="#00B67A" />
            <path d="M15.565 19.08l-1.502-1.092-4.51 3.284 1.723-5.302-4.509-3.276 5.573-.001 1.723-5.301 1.502 4.623 4.51 3.276-4.51 3.284v.505z" fill="#005128" />
          </svg>
        </div>
        <span className="text-xs text-gray-400">{review.daysAgo === 1 ? 'Yesterday' : `${review.daysAgo} days ago`}</span>
      </div>

      {/* Trustpilot Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 flex items-center justify-center ${i < (review.rating || 5) ? 'bg-[#00b67a]' : 'bg-gray-200'}`}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Review Content */}
      <p className="text-gray-800 font-medium leading-relaxed mb-4">
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
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
    >
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

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-24">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <SectionHeader
          label="Social Proof"
          title="Loved Across the Web"
          description="Real reviews from real users on their favorite platforms."
          highlightedWords={["Across the Web"]}
        />

        {/* Platform Logos Header */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => {
            switch (review.platform) {
              case 'twitter':
                return <TwitterCard key={review.id} review={review} />;
              case 'trustpilot':
                return <TrustpilotCard key={review.id} review={review} />;
              case 'instagram':
                return <InstagramCard key={review.id} review={review} />;
            }
          })}
        </div>
      </div>
    </section>
  );
}