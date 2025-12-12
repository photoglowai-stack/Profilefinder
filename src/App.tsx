import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ScreenshotAnalysis from "./components/ScreenshotAnalysis";
import ChatAnalysisCard from "./components/ChatAnalysisCard";
import FidelityTestAnalysis from "./pages/FidelityTestAnalysis";
import ActivityTracker from "./pages/ActivityTracker";

// Wrapper component to receive photos from route state
function ChatAnalysisPage() {
  const location = useLocation();
  const photos = (location.state as any)?.photos || [];

  return (
    <ChatAnalysisCard
      photos={photos}
      paymentUrl="/payment"
    />
  );
}


function LandingPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [bottomInset, setBottomInset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide widget when near bottom (footer area) - within 400px of bottom
      const isNearBottom = scrollY + windowHeight > documentHeight - 400;

      // Show widget after scrolling past hero (1200px) but hide near footer
      setShowWidget(scrollY > 1200 && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateInset = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;

      const chromeHeight = window.innerHeight - viewport.height - viewport.offsetTop;
      setBottomInset(24 + Math.max(0, chromeHeight));
    };

    updateInset();
    window.visualViewport?.addEventListener('resize', updateInset);
    window.addEventListener('scroll', updateInset, { passive: true });

    return () => {
      window.visualViewport?.removeEventListener('resize', updateInset);
      window.removeEventListener('scroll', updateInset);
    };
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
              bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomInset}px)`,
              left: 0,
              right: 0,
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              transform: 'translateZ(0)'
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
        <AppContent />
      </ServiceProvider>
    </BrowserRouter>
  );
}

// Separate component to use useLocation hook inside BrowserRouter
function AppContent() {
  return (
    <>
      <SEOHead />
      <StructuredData />
      <ServiceColorIndicator />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/analysis" element={<ScreenshotAnalysis />} />
        <Route path="/chat-analysis" element={<ChatAnalysisPage />} />
        <Route path="/fidelity-test/analysis" element={<FidelityTestAnalysis />} />
        <Route path="/activity-tracker" element={<ActivityTracker />} />
      </Routes>
    </>
  );
}

export default App;