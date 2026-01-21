"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroAntigravity from "@/components/HeroAntigravity";
import { StatsBar } from "@/components/StatsBar";
import { HowItWorks } from "@/components/HowItWorks";
import { UGCSection } from "@/components/UGCSection";
import { Footer } from "@/components/Footer";
import { ServiceFormWidget } from "@/components/ServiceFormWidget";
import { ServiceProvider } from "@/lib/ServiceContext";

// Lazy load below-the-fold components for better performance
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const StatsSection = lazy(() => import("@/components/StatsSection").then(m => ({ default: m.StatsSection })));
const ToolComparison = lazy(() => import("@/components/ToolComparison").then(m => ({ default: m.ToolComparison })));
const SEOBlogSection = lazy(() => import("@/components/SEOBlogSection").then(m => ({ default: m.SEOBlogSection })));
const RelatedSearches = lazy(() => import("@/components/RelatedSearches").then(m => ({ default: m.RelatedSearches })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));

// Loading skeleton for lazy components
function SectionSkeleton() {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3 mx-auto mb-6 animate-pulse" />
        <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto mb-8 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
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
    <ServiceProvider initialService="dating">
      <div className="relative min-h-screen bg-slate-50">
        {/* 1. Main Content */}
        <main className="w-full mx-auto pb-40">
          <HeroAntigravity />
          <StatsBar />
          <HowItWorks />
          <UGCSection />

          {/* Lazy loaded sections */}
          <Suspense fallback={<SectionSkeleton />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <StatsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ToolComparison />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SEOBlogSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <RelatedSearches />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <CTASection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <FAQ />
          </Suspense>

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
    </ServiceProvider>
  );
}
