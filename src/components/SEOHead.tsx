import { Helmet } from "react-helmet-async";
import { useService } from "../lib/ServiceContext";

const seoData = {
  dating: {
    title: "Tinder profile search with AI | ProfileFinder",
    description: "Discreet Tinder profile search tool powered by AI. Run a Tinder profile lookup with just a name, age and city to see if someone is active on dating apps.",
    keywords: "tinder profile search, tinder profile lookup, search tinder profiles, find someone on tinder, how does tinder work, tinder chat, ai dating app, dating safety, relationship verification"
  },
  following: {
    title: "Following AI - Track Social Signals | ProfileFinder",
    description: "Following AI analyses who someone follows and interacts with on their public social media. Detect patterns before they move to Tinder or other platforms.",
    keywords: "following ai, instagram tracker, social signals, relationship risk ai, instagram followers, track instagram, social media monitoring"
  },
  facetrace: {
    title: "Face Trace - AI face search & reverse image search | ProfileFinder",
    description: "Upload a photo and our AI performs face recognition search combined with reverse image search people workflow to find dating profiles and social accounts.",
    keywords: "reverse image search people, reverse face search, face recognition search, ai face search, face search engine, face finder, face search free, photo search engine reverse"
  },
  fidelity: {
    title: "Fidelity Test - Structured relationship analysis | ProfileFinder",
    description: "Interactive checklist that helps you evaluate behavior patterns. Turn vague suspicion into clear signals with AI-powered relationship analysis.",
    keywords: "fidelity test, verify hidden activity, relationship risk ai, assess trust issues, relationship analysis, trust issues, infidelity detection"
  }
};

export function SEOHead() {
  const { selectedService } = useService();
  const seo = seoData[selectedService];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Helmet>
  );
}
