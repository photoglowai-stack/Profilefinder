import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroNew } from "./components/HeroNew";
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
import { StickyGenderSelector } from "./components/StickyGenderSelector";

function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
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
      </div>
    </>
  );
}

export default function App() {
  return (
    <ServiceProvider>
      <SEOHead />
      <StructuredData />
      <ServiceColorIndicator />
      <BrowserRouter>
        <StickyGenderSelector />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}