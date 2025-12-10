import { motion } from "framer-motion";
import { Star, ArrowRight, Shield, Lock } from "lucide-react";
import imgWebsiteLogo from "figma:asset/4b7948bf098fa302d0479c7e50133880ecda62bd.png";
import { footerContent } from "../lib/content";

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

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#020817] via-[#1e293b] to-[#020817] text-white py-10 md:py-12">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-10">
          {/* Brand */}
          <div>
            <img
              src={imgWebsiteLogo}
              alt="ProfileFinder"
              className="h-7 md:h-9 mb-3 md:mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-3 font-medium">
              {footerContent.tagline}
            </p>
            <div className="flex gap-1" aria-label="Note: 5 sur 5 étoiles">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
              ))}
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-base md:text-lg mb-3 md:mb-4 font-extrabold tracking-tight">{footerContent.product}</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              {footerLinks.useful.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-lg mb-4 md:mb-6 font-extrabold tracking-tight">{footerContent.company}</h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-400">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4 md:mb-6 font-extrabold tracking-tight">{footerContent.legal}</h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-400">
              {footerLinks.legal.slice(0, 2).map((link) => (
                <li key={link.href} className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="text-center text-gray-400">
            <p className="mb-4 text-sm md:text-base">
              {footerContent.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300">
            <Shield className="w-4 h-4" />
            <span>Secure and certified site</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}