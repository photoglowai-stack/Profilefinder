import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  highlightedWords?: string[];
}

export function SectionHeader({
  label,
  title,
  description,
  highlightedWords = []
}: SectionHeaderProps) {
  const highlightText = (text: string) => {
    if (highlightedWords.length === 0) return text;

    const parts = text.split(new RegExp(`(${highlightedWords.join('|')})`, 'gi'));
    return parts.map((part, index) =>
      highlightedWords.some(word => word.toLowerCase() === part.toLowerCase()) ? (
        <span
          key={index}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10 md:mb-12"
    >
      {label && (
        <span className="text-[#ff4e71] uppercase tracking-[0.15em] text-xs md:text-sm mb-3 block font-bold">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl text-slate-900 mb-3 md:mb-4 font-black tracking-tighter">
        {highlightText(title)}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          {description}
        </p>
      )}
    </motion.div>
  );
}