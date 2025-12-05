import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#hero" className="text-lg font-semibold text-gray-900">
          Unlocky
        </a>

        <nav className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <a className="hover:text-gray-900" href="#steps">
            {t("Comment ça marche", "How it works")}
          </a>
          <a className="hover:text-gray-900" href="#security">
            {t("Sécurité", "Security")}
          </a>
          <a className="hover:text-gray-900" href="#pricing">
            {t("Tarifs", "Pricing")}
          </a>
          <a className="hover:text-gray-900" href="#faq">
            FAQ
          </a>
          <button
            className="rounded-full border border-gray-200 px-3 py-1 text-xs"
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            aria-label={t("Changer de langue", "Switch language")}
          >
            {language.toUpperCase()}
          </button>
        </nav>
      </div>
    </header>
  );
}
