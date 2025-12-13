import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ctaContent } from "../lib/content";
import { useService } from "../lib/ServiceContext";

export function CTASection() {
  const { colors } = useService();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.primary}dd)`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl top-0 left-1/4"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-1/4"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative max-w-[1760px] mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5 md:mb-6">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">20,000+ profiles detected</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              fontFamily: "'Inter Tight', system-ui, sans-serif"
            }}
          >
            Ready to Find <span style={{ fontStyle: 'italic' }}>the Truth?</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            {ctaContent.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255,255,255,0.4)',
                  '0 0 0 10px rgba(255,255,255,0)',
                  '0 0 0 0 rgba(255,255,255,0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-full"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToTop}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {ctaContent.button}
              </Button>
            </motion.div>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Learn more
            </Button>
          </div>

          <p className="text-white/80 text-xs md:text-sm mt-4 md:mt-5">
            ✓ No commitment · ✓ First search free · ✓ Instant results
          </p>
        </motion.div>
      </div>
    </section>
  );
}