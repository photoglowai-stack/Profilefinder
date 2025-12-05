import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { BackToTop } from "./components/BackToTop";
import { SEOHead } from "./components/SEOHead";
import { SmoothScroll } from "./components/SmoothScroll";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Home } from "./pages/Home";
import { LegalNotice } from "./pages/LegalNotice";
import { TermsOfSales } from "./pages/TermsOfSales";
import { FONT_BODY } from "./styles/typography";
import { ServiceProvider } from "./lib/ServiceContext";

export default function App() {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <div style={{ fontFamily: FONT_BODY }}>
          <SEOHead />
          <SmoothScroll />

          <Router>
            {/* Lien d’accessibilité pour “passer au contenu” */}
            <a href="#main" className="sr-only focus:not-sr-only">
              Aller au contenu principal
            </a>

            <Navbar />

            <main id="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mentions-legales" element={<LegalNotice />} />
                <Route path="/conditions-generales" element={<TermsOfSales />} />
              </Routes>
            </main>

            <Footer />
            <StickyCTA />
            <BackToTop />
          </Router>
        </div>
      </ServiceProvider>
    </LanguageProvider>
  );
}
