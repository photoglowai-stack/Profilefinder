import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  highlightedWords?: string[];
  italic?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  highlightedWords = [],
  italic = true
}: SectionHeaderProps) {
  const highlightText = (text: string) => {
    if (highlightedWords.length === 0) return text;

    const parts = text.split(new RegExp(`(${highlightedWords.join('|')})`, 'gi'));
    return parts.map((part, index) =>
      highlightedWords.some(word => word.toLowerCase() === part.toLowerCase()) ? (
        <span
          key={index}
          style={{
            background: 'linear-gradient(135deg, #ff4e71, #ff7f66)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: italic ? 'italic' : 'normal',
            fontWeight: 900
          }}
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
      style={{
        textAlign: 'center',
        marginBottom: '48px',
        fontFamily: "'Inter Tight', system-ui, sans-serif"
      }}
    >
      {label && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #ff4e71, #ff7f66)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 4px 20px rgba(255, 78, 113, 0.3)'
          }}
        >
          {label}
        </div>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          fontWeight: 900,
          color: '#0f172a',
          letterSpacing: '-0.03em',
          margin: '0 auto 16px',
          lineHeight: 1.1,
          fontFamily: "'Inter Tight', system-ui, sans-serif"
        }}
      >
        {highlightText(title)}
      </h2>
      {description && (
        <p
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
            color: '#64748b',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 500,
            fontFamily: "'Inter Tight', system-ui, sans-serif"
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}