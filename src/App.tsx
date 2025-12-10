import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroNew } from "./components/HeroNew";
import { StatsBar } from "./components/StatsBar";
import { HowItWorks } from "./components/HowItWorks";
import { ServiceFormWidget } from "./components/ServiceFormWidget";
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
import { PaymentPage } from "./pages/PaymentPage";

function LandingPage() {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show widget after scrolling past ~80% of viewport height (approximately when Hero is out of view)
      const scrollThreshold = window.innerHeight * 0.8;
      setShowWidget(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* 1. Main Content */}
      <main className="w-full mx-auto max-w-7xl pb-40">
        <HeroNew />
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

      {/* 2. Floating Action Dock Widget - Only visible after scrolling past Hero */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.6
            }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[480px]">
              <ServiceFormWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ServiceProvider>
      <SEOHead />
      <StructuredData />
      <ServiceColorIndicator />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}