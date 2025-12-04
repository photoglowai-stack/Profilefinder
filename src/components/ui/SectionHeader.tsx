import { motion } from "motion/react";

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
        <span className="text-[#ff4e71] uppercase tracking-wider text-xs md:text-sm mb-3 block font-semibold">
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-4xl text-[#020817] mb-3 md:mb-4">
        {highlightText(title)}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}