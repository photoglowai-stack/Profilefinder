import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const UGCSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // DONNÉES DES TÉMOIGNAGES (Vidéos + Infos + Nouvelles Photos HQ)
  const TESTIMONIALS = [
    {
      id: 1,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Cheater.mp4",
      author: "@julie_investigate",
      role: "Verified User",
      quote: "I had a doubt, now I have proof. Thanks ProfileFinder.",
      // Photo femme professionnelle
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/SnapInsta.to_AQOnlVE_ulm8mX1L8JD1Y8HPc-GSm9yGlOnuxtuQf4ni4Lll7ts8izk_XrjEqVt7BSs0ogrT4XMj_xIg2GVSZWh20UQhSMEX1GJDBwI.mp4",
      author: "@alex_hunter",
      role: "Investigator",
      quote: "The face recognition tool is just mind-blowing accuracy.",
      // Photo homme sérieux/investigateur
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      videoUrl: "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Worst%20fear%20came%20true%20%20%23catchingcheaters%20%23tinder%20%23profilefinder%20%23betrayal%20%23breakuptiktok%20%23breakups.mp4",
      author: "@sarah_truth",
      role: "Daily User",
      quote: "Found him in 2 minutes flat. It's almost scary how effective it is.",
      // Photo jeune femme
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Fonction de défilement manuel (Flèches)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; // Largeur d'une carte + écart
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="ugc-section">

      {/* Background Decorators */}
      <div className="ugc-decorator ugc-decorator-1" />
      <div className="ugc-decorator ugc-decorator-2" />

      <div className="ugc-container">

        {/* Header Compact & Navigation */}
        <div className="ugc-header">
          <div className="ugc-title-area">
            <div className="ugc-badge">
              <Heart className="ugc-badge-icon" />
              Wall of Love
            </div>
            <h2 className="ugc-title">
              Real Stories, <span className="ugc-title-highlight">Real Truth</span>.
            </h2>
          </div>

          {/* Boutons de Navigation (Visible sur Desktop uniquement) */}
          <div className="ugc-nav-buttons">
            <button
              onClick={() => scroll('left')}
              className="ugc-nav-btn"
              aria-label="Scroll left"
            >
              <ChevronLeft className="ugc-nav-icon" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="ugc-nav-btn"
              aria-label="Scroll right"
            >
              <ChevronRight className="ugc-nav-icon" />
            </button>
          </div>
        </div>

        {/* CONTENEUR DU SLIDER (Scroll Horizontal) */}
        <div
          ref={scrollRef}
          className="ugc-slider"
        >
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="ugc-slide">
              <VideoCard data={item} />
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
}

const VideoCard: React.FC<VideoCardProps> = ({ data }) => {
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
    <div className="video-card">
      {/* Cadre Téléphone (Format 9:16) */}
      <div
        className="video-frame"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={data.videoUrl}
          className="video-element"
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80"
        />

        {/* Bouton Play (Visible si en pause) */}
        {!isPlaying && (
          <div className="video-play-overlay">
            <div className="video-play-button">
              <Play className="video-play-icon" />
            </div>
          </div>
        )}

        {/* Bouton Mute (Coin haut droit) */}
        <button
          onClick={toggleMute}
          className="video-mute-btn"
        >
          {isMuted ? <VolumeX className="video-mute-icon" /> : <Volume2 className="video-mute-icon" />}
        </button>
      </div>

      {/* Carte Avis (Sous la vidéo) */}
      <div className="testimonial-card">
        <div className="testimonial-header">
          <div className="testimonial-avatar">
            <img src={data.avatar} alt={data.author} className="testimonial-avatar-img" />
          </div>
          <div className="testimonial-info">
            <p className="testimonial-author">{data.author}</p>
            <div className="testimonial-meta">
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="testimonial-star" />)}
              </div>
              <span className="testimonial-role">• {data.role}</span>
            </div>
          </div>
        </div>

        <div className="testimonial-quote-container">
          {/* Barre décorative rose à gauche de la citation */}
          <div className="testimonial-quote-bar"></div>
          <p className="testimonial-quote">
            "{data.quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export { UGCSection };
export default UGCSection;
