import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useService } from '../lib/ServiceContext';

const UGCSection = () => {
  const { colors } = useService();
  const [activeIndex, setActiveIndex] = useState(1); // Start with center video
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const TESTIMONIALS = [
    {
      id: 1,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/relationship-proof.mp4",
      author: "@julie_investigate",
      role: "Verified User",
      quote: "I had a doubt, now I have proof. Thanks ProfileFinder.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/SnapInsta.to_AQOnlVE_ulm8mX1L8JD1Y8HPc-GSm9yGlOnuxtuQf4ni4Lll7ts8izk_XrjEqVt7BSs0ogrT4XMj_xIg2GVSZWh20UQhSMEX1GJDBwI.mp4",
      author: "@alex_hunter",
      role: "Investigator",
      quote: "The face recognition tool is just mind-blowing accuracy.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/real-story-profilefinder.mp4",
      author: "@sarah_truth",
      role: "Daily User",
      quote: "Found him in 2 minutes flat. It's almost scary how effective it is.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Auto-play the active video when it changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => { });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section style={{
      background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10, white)`,
      padding: '64px 0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter Tight', system-ui, sans-serif"
    }}>
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
            <Heart size={14} fill="white" />
            Wall of Love
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            margin: '0 auto 24px'
          }}>
            Real Stories, <span style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Real Truth</span>.
          </h2>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={goToPrev}
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
                color: colors.primary
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
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
              <ChevronRight size={20} />
            </button>
          </div>
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
          {TESTIMONIALS.map((item, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
            const isNext = index === (activeIndex + 1) % TESTIMONIALS.length;
            const isVisible = isActive || isPrev || isNext;

            // Calculate position
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

        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {TESTIMONIALS.map((_, index) => (
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
};

interface VideoCardProps {
  data: {
    id: number;
    videoUrl: string;
    author: string;
    role: string;
    quote: string;
    avatar: string;
  };
  colors: { primary: string; secondary: string };
  isActive: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ data, colors, isActive, videoRef }) => {
  const [isMuted, setIsMuted] = useState(true);
  const internalRef = useRef<HTMLVideoElement | null>(null);

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
          src={data.videoUrl}
          preload="auto"
          loop
          muted={isMuted}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
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
      </div>

      {/* Testimonial Card - Only show when active */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <img
            src={data.avatar}
            alt={data.author}
            loading="lazy"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${colors.primary}20`
            }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{data.author}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={12} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>• {data.role}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            width: '3px',
            borderRadius: '2px',
            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
            flexShrink: 0
          }} />
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#475569',
            fontWeight: 500,
            lineHeight: 1.5,
            fontStyle: 'italic'
          }}>
            "{data.quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export { UGCSection };
export default UGCSection;
