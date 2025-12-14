import { motion } from "framer-motion";
import { Star, ArrowRight, Shield } from "lucide-react";
import { footerContent } from "../lib/content";

const LOGO_URL = "https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg";

// Footer theme variants
export type FooterVariant = 'default' | 'dating' | 'faceTrace' | 'activity' | 'fidelity' | 'chat';

interface FooterTheme {
  bg: string;
  accent: string;
  hoverAccent: string;
  borderColor: string;
}

const FOOTER_THEMES: Record<FooterVariant, FooterTheme> = {
  default: {
    bg: 'rgba(0,0,0,0.1)',
    accent: '#ff4b5c',
    hoverAccent: '#ff6b6b',
    borderColor: 'rgba(255,255,255,0.2)'
  },
  dating: {
    bg: 'rgba(255,75,92,0.15)',
    accent: '#ff4b5c',
    hoverAccent: '#ff6b6b',
    borderColor: 'rgba(255,75,92,0.3)'
  },
  faceTrace: {
    bg: 'rgba(255,107,107,0.15)',
    accent: '#FF6B6B',
    hoverAccent: '#FFA502',
    borderColor: 'rgba(255,107,107,0.3)'
  },
  activity: {
    bg: 'rgba(236,72,153,0.15)',
    accent: '#ec4899',
    hoverAccent: '#f472b6',
    borderColor: 'rgba(236,72,153,0.3)'
  },
  fidelity: {
    bg: 'rgba(249,115,22,0.15)',
    accent: '#f97316',
    hoverAccent: '#fb923c',
    borderColor: 'rgba(249,115,22,0.3)'
  },
  chat: {
    bg: 'rgba(255,107,107,0.15)',
    accent: '#FF6B6B',
    hoverAccent: '#FFA502',
    borderColor: 'rgba(255,107,107,0.3)'
  }
};

const footerLinks = {
  useful: [
    { label: footerContent.links.howItWorks, href: "#how-it-works" },
    { label: footerContent.links.pricing, href: "#pricing" },
    { label: footerContent.links.about, href: "#about" }
  ],
  resources: [
    { label: footerContent.links.blog, href: "#blog" },
    { label: "FAQ", href: "#faq" },
    { label: footerContent.links.contact, href: "#support" }
  ],
  legal: [
    { label: footerContent.links.terms, href: "#terms" },
    { label: footerContent.links.privacy, href: "#privacy" },
    { label: footerContent.links.cookies, href: "#legal" }
  ]
};

interface FooterProps {
  variant?: FooterVariant;
}

export function Footer({ variant = 'default' }: FooterProps) {
  const theme = FOOTER_THEMES[variant];

  return (
    <footer
      className="text-white py-6 md:py-7"
      style={{
        backgroundColor: theme.bg,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-5">
          {/* Brand */}
          <div>
            <img
              src={LOGO_URL}
              alt="ProfileFinder"
              loading="lazy"
              style={{
                height: '24px',
                maxHeight: '24px',
                width: 'auto',
                maxWidth: '80px'
              }}
              className="mb-1.5"
            />
            <p className="text-white/80 text-xs leading-relaxed mb-1.5 font-medium">
              {footerContent.tagline}
            </p>
            <div className="flex gap-0.5" aria-label="Note: 5 sur 5 étoiles">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3" style={{ fill: theme.accent, color: theme.accent }} />
              ))}
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-sm mb-1.5 font-extrabold tracking-tight">{footerContent.product}</h3>
            <ul className="space-y-1 text-xs text-white/80 font-medium">
              {footerLinks.useful.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition flex items-center gap-1.5 group"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.hoverAccent}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-sm mb-1.5 font-extrabold tracking-tight">{footerContent.company}</h3>
            <ul className="space-y-1 text-xs text-white/80 font-medium">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition flex items-center gap-1.5 group"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.hoverAccent}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm mb-1.5 font-extrabold tracking-tight">{footerContent.legal}</h3>
            <ul className="space-y-1 text-xs text-white/80 font-medium">
              {footerLinks.legal.slice(0, 2).map((link) => (
                <li key={link.href} className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 flex-shrink-0" />
                  <a
                    href={link.href}
                    className="transition"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.hoverAccent}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="pt-3"
          style={{ borderTop: `1px solid ${theme.borderColor}` }}
        >
          <div className="text-center text-white/70">
            <p className="mb-2 text-xs font-medium">
              {footerContent.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-[10px]">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition font-medium"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = theme.hoverAccent}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-1.5 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white/80 font-medium"
            style={{ backgroundColor: theme.bg }}
          >
            <Shield className="w-3 h-3" style={{ color: theme.accent }} />
            <span>Secure and certified site</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}