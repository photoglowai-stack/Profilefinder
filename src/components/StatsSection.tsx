import { motion } from "framer-motion";
import { Heart, Eye, Lock } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { statsContent } from "../lib/content";

const statistics = [
  {
    stat: "60%",
    text: "Around 60% of Tinder users are estimated to already be in a relationship.",
    icon: Heart
  },
  {
    stat: "1/2",
    text: "About half of the Tinder profile searches run with ProfileFinder detect at least one active or recently active profile.",
    icon: Eye
  },
  {
    stat: "19%",
    text: "Studies suggest that almost 1 in 5 people admit to having cheated on a partner at least once.",
    icon: Lock
  }
];

export function StatsSection() {
  return (
    <section className="max-w-[1760px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <SectionHeader
        label="Statistics"
        title={statsContent.title}
      />

      {/* SEO Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-10 md:mb-12"
      >
        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          {statsContent.intro}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {statistics.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl text-center border-2 border-[#ff0051] overflow-hidden group"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4e71]/10 to-[#ff7f66]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="mb-4 md:mb-5">
                <item.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto text-[#ff4e71]" />
              </div>
              <p className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] mb-3 md:mb-4 font-black tracking-tighter">
                {item.stat}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                {item.text}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Closing Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mt-10 md:mt-12"
      >
        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          {statsContent.closing}
        </p>
      </motion.div>
    </section>
  );
}