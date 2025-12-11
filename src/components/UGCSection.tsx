import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useService } from '../lib/ServiceContext';

const UGCSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { colors } = useService();

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
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
              backgroundClip: 'text'
            }}>Real Truth</span>.
          </h2>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => scroll('left')}
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
              onClick={() => scroll('right')}
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

        {/* Slider - Centered */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: '16px',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            justifyContent: 'center'
          }}
        >
          {TESTIMONIALS.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: 'center', flexShrink: 0 }}>
              <VideoCard data={item} colors={colors} />
            </div>
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
}

const VideoCard: React.FC<VideoCardProps> = ({ data, colors }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
      {/* Video Frame */}
      <div
        onClick={togglePlay}
        style={{
          position: 'relative',
          aspectRatio: '9/16',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#1e293b',
          cursor: 'pointer',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}
      >
        <video
          ref={videoRef}
          src={data.videoUrl}
          preload="metadata"
          loop
          muted={isMuted}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
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
      </div>

      {/* Testimonial Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
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
