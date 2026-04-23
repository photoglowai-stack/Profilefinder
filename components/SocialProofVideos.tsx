"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, TrendingUp, Eye } from 'lucide-react';
import { useService } from '../lib/ServiceContext';

const VIDEOS = [
  {
    id: 1,
    src: '/assets/social-proof-1.mp4',
    author: '@profilefinder_user',
    caption: 'She found his Tinder profile on ProfileFinder',
    views: '2.4M',
    hashtags: '#cheater #catchingcheaters #tinder'
  },
  {
    id: 2,
    src: '/assets/social-proof-2.mp4',
    author: '@dating_detective',
    caption: 'The tip everyone needs to know',
    views: '1.8M',
    hashtags: '#cheating #fyp #relationship'
  },
  {
    id: 3,
    src: '/assets/social-proof-3.mp4',
    author: '@truth_seeker',
    caption: 'Playing around with ProfileFinder and found that...',
    views: '956K',
    hashtags: '#messy #profilefinder #dating'
  }
];

// ═══════════════════════════════════════════════════
// VIDEO CARD (same style as UGCSection VideoCard)
// ═══════════════════════════════════════════════════
interface VideoCardProps {
  data: typeof VIDEOS[0];
  colors: { primary: string; secondary: string };
  isActive: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ data, colors, isActive, videoRef }) => {
  const [isMuted, setIsMuted] = useState(true);
  const internalRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = internalRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = true;
      video.currentTime = 0;
      const attemptPlay = async () => {
        try {
          await video.play();
        } catch {
          setTimeout(() => { video.play().catch(() => {}); }, 100);
        }
      };
      if (video.readyState >= 3) {
        attemptPlay();
      } else {
        video.addEventListener('canplay', attemptPlay, { once: true });
        video.load();
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (internalRef.current) {
      internalRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
      {/* Video Frame */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '9/16',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#1e293b',
          boxShadow: isActive
            ? `0 25px 50px -12px ${colors.primary}40`
            : '0 20px 40px rgba(0,0,0,0.15)',
          transition: 'box-shadow 0.5s ease'
        }}
      >
        <video
          ref={(el) => {
            internalRef.current = el;
            videoRef(el);
          }}
          src={data.src}
          preload="auto"
          loop
          muted
          autoPlay={isActive}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#1e293b'
          }}
          onLoadedData={(e) => {
            const video = e.target as HTMLVideoElement;
            if (!isActive) {
              video.currentTime = 0.1;
            }
          }}
        />

        {/* Play Button Overlay - Only show when not active */}
        {!isActive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${colors.primary}40`,
              transition: 'transform 0.2s'
            }}>
              <Play size={28} color="white" fill="white" style={{ marginLeft: '4px' }} />
            </div>
          </div>
        )}

        {/* Views badge - top left */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          padding: '6px 10px',
          borderRadius: '8px',
          color: 'white',
          fontSize: '11px',
          fontWeight: 700
        }}>
          <Eye size={12} />
          {data.views} views
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backdropFilter: 'blur(8px)'
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Active indicator glow */}
        {isActive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            border: `3px solid ${colors.primary}`,
            pointerEvents: 'none',
            boxShadow: `inset 0 0 20px ${colors.primary}20`
          }} />
        )}

        {/* Bottom gradient + caption */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '48px 14px 14px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
          pointerEvents: 'none'
        }}>
          <p style={{
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            margin: '0 0 4px',
            lineHeight: 1.4
          }}>
            {data.caption}
          </p>
          <p style={{
            color: colors.primary,
            fontSize: '11px',
            fontWeight: 700,
            margin: 0
          }}>
            {data.hashtags}
          </p>
        </div>
      </div>

      {/* Author Card - Only visible when active */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 900
          }}>
            {data.author.charAt(1).toUpperCase()}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{data.author}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={12} color="#64748b" />
              <span style={{ fontSize: '11px', color: '#64748b' }}>{data.views} views • Viral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// MAIN SECTION (same layout as UGCSection)
// ═══════════════════════════════════════════════════
export function SocialProofVideos() {
  const { colors } = useService();
  const [activeIndex, setActiveIndex] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Pause all videos when not in view
  useEffect(() => {
    if (!isInView) {
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    }
  }, [isInView]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10, white)`,
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter Tight', system-ui, sans-serif"
      }}
    >
      {/* Decorators */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `${colors.primary}10`,
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `${colors.secondary}10`,
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1760px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header - Centered */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '16px',
            boxShadow: `0 4px 15px ${colors.primary}30`
          }}>
            <TrendingUp size={14} />
            Trending on Social Media
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            margin: '0 auto 0'
          }}>
            Going viral for a <span style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>reason</span>.
          </h2>
        </div>

        {/* Video Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Navigation Buttons - Above carousel */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 20
          }}>
            <button
              onClick={goToPrev}
              aria-label="Previous video"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: `2px solid ${colors.primary}30`,
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                color: colors.primary,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next video"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                color: 'white',
                boxShadow: `0 4px 15px ${colors.primary}30`
              }}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Video Carousel */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
            minHeight: '520px'
          }}>
            {VIDEOS.map((item, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + VIDEOS.length) % VIDEOS.length;
              const isNext = index === (activeIndex + 1) % VIDEOS.length;
              const isVisible = isActive || isPrev || isNext;

              let translateX = '0';
              let scale = 1;
              let opacity = 1;
              let zIndex = 1;

              if (isActive) {
                translateX = '0';
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                translateX = '-320px';
                scale = 0.85;
                opacity = 0.6;
                zIndex = 5;
              } else if (isNext) {
                translateX = '320px';
                scale = 0.85;
                opacity = 0.6;
                zIndex = 5;
              }

              if (!isVisible) return null;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    position: 'absolute',
                    transform: `translateX(${translateX}) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: isActive ? 'default' : 'pointer',
                    filter: isActive ? 'none' : 'brightness(0.8)'
                  }}
                >
                  <VideoCard
                    data={item}
                    colors={colors}
                    isActive={isActive}
                    videoRef={(el) => { videoRefs.current[index] = el; }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: activeIndex === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: activeIndex === index
                  ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                  : '#d1d5db',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofVideos;
