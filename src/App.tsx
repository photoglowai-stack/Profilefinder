import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { PaymentPage } from "./pages/PaymentPage";

function LandingPage() {
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