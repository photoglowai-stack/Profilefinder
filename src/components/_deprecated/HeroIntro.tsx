import { motion } from "framer-motion";
import { heroIntroText } from "../lib/content";

export function HeroIntro() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
          {heroIntroText}
        </p>
      </motion.div>
    </section>
  );
}
