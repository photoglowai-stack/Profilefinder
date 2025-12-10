import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HeroAntigravity from "./components/HeroAntigravity";
import { StatsBar } from "./components/StatsBar";
import { HowItWorks } from "./components/HowItWorks";
import { UGCSection } from "./components/UGCSection";
import { Testimonials } from "./components/Testimonials";
import { StatsSection } from "./components/StatsSection";
import { SEOHead } from "./components/SEOHead";
import { StructuredData } from "./components/StructuredData";
import { ToolComparison } from "./components/ToolComparison";
import { SEOBlogSection } from "./components/SEOBlogSection";
import { RelatedSearches } from "./components/RelatedSearches";
import { CTASection } from "./components/CTASection";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ServiceProvider } from "./lib/ServiceContext";
import { ServiceColorIndicator } from "./components/ui/ServiceColorIndicator";
import { ServiceFormWidget } from "./components/ServiceFormWidget";
import { PaymentPage } from "./pages/PaymentPage";

function LandingPage() {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show widget after scrolling past the Hero section (approximately 800px)
      setShowWidget(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* 1. Main Content */}
      <main className="w-full mx-auto pb-40">
        <HeroAntigravity />
        <StatsBar />
        <HowItWorks />
        <UGCSection />
        <Testimonials />
        <StatsSection />
        <ToolComparison />
        <SEOBlogSection />
        <RelatedSearches />
        <CTASection />
        <FAQ />
        <Footer />
      </main>

      {/* 2. Sticky Widget - appears after scrolling past Hero */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: 0,
              right: 0,
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <div style={{
              width: '100%',
              maxWidth: '448px',
              padding: '0 16px',
              boxSizing: 'border-box',
              pointerEvents: 'auto'
            }}>
              <ServiceFormWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <SEOHead />
        <StructuredData />
        <ServiceColorIndicator />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;