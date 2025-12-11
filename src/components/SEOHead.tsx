import { useEffect } from "react";
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

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.keywords);

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seo.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', seo.description);

    // Twitter Card tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', seo.title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', seo.description);
  }, [selectedService, seo]);

  return null; // This component doesn't render anything
}
