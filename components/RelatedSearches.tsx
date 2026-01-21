import { motion } from "framer-motion";
import { Search, Shield, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useService } from "../lib/ServiceContext";

export function RelatedSearches() {
  const { selectedService } = useService();

  // Only show for dating service
  if (selectedService !== "dating") return null;

  const features = [
    {
      icon: Search,
      title: "AI-Powered Profile Detection",
      description: "Our advanced algorithm scans Tinder and identifies matching profiles based on the information you provide.",
      stat: "98%",
      statLabel: "Accuracy"
    },
    {
      icon: Shield,
      title: "Private & Anonymous",
      description: "Your searches are completely confidential. We never store personal data or share information with third parties.",
      stat: "100%",
      statLabel: "Private"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Alerts",
      description: "The Radar feature notifies you when a profile matching your criteria becomes active or travels to new locations.",
      stat: "24/7",
      statLabel: "Monitoring"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join hundreds of thousands who have gained clarity about their relationships using ProfileFinder.",
      stat: "500K+",
      statLabel: "Users"
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #fef2f2 50%, #ffffff 100%)',
      padding: '80px 0',
      fontFamily: "'Inter Tight', system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #FF5E00, #FF085E)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 4px 20px rgba(255, 94, 0, 0.25)'
          }}>
            <CheckCircle size={14} />
            Why ProfileFinder
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '16px',
            letterSpacing: '-0.04em',
            lineHeight: 1.1
          }}>
            The Smart Way to <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF5E00, #FF085E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Verify Dating Activity</span>
          </h2>

          <p style={{
            color: '#64748b',
            fontSize: '1.15rem',
            fontWeight: 500,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Stop wondering. Get definitive answers with AI-powered profile search technology.
          </p>
        </motion.div>

        {/* Features Grid - 2x2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(255, 94, 0, 0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative gradient blob */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(255,94,0,0.08), rgba(255,8,94,0.08))',
                  borderRadius: '50%',
                  filter: 'blur(30px)'
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF5E00, #FF085E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(255, 94, 0, 0.25)'
                  }}>
                    <Icon size={28} color="#ffffff" strokeWidth={2} />
                  </div>

                  {/* Stat badge */}
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #FF5E00, #FF085E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.02em'
                    }}>
                      {feature.stat}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {feature.statLabel}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '10px',
                    letterSpacing: '-0.02em'
                  }}>
                    {feature.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    lineHeight: 1.65,
                    fontWeight: 500,
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
