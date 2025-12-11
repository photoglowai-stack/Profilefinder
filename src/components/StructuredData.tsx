import { useEffect } from "react";
import { useService } from "../lib/ServiceContext";

export function StructuredData() {
  const { selectedService } = useService();

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data based on service
    let structuredData = {};

    if (selectedService === "dating") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ProfileFinder AI - Tinder Profile Verification",
        "applicationCategory": "UtilitiesApplication",
        "description": "Advanced AI-powered dating profile finder. Search Tinder profiles and identify hidden dating app accounts with privacy-safe accuracy.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "12847"
        },
        "featureList": [
          "Tinder Profile Search",
          "Dating App Detection",
          "Relationship Activity Insights",
          "Multi-Platform Search",
          "Anonymous Searches",
          "Instant Results"
        ],
        "keywords": "profile finder ai, tinder profile search, tinder profile lookup, dating safety tool, relationship verification, ai dating insights, swindler buster"
      };
    } else if (selectedService === "facetrace") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "FaceCheck ID - Reverse Face Search & Facial Recognition",
        "applicationCategory": "UtilitiesApplication",
        "description": "Advanced FaceCheck ID and PimEyes alternative. Perform reverse face search, facial recognition search, social profile discovery, and identity verification with 97% accuracy.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "15632"
        },
        "featureList": [
          "Reverse Face Search",
          "Facial Recognition Search",
          "Creator Profile Finder",
          "Instagram Finder",
          "Public Figure Face Match",
          "Face ID Search Free",
          "Reverse Image Search People",
          "AI Face Search"
        ],
        "keywords": "facecheck id, pimeyes, reverse face search, facial recognition search, creator profile finder, instagram finder, public figure face match, face id search, pim eyes, tineye, yandex reverse search"
      };
    }

    // Create FAQ structured data
    let faqStructuredData = {};

    if (selectedService === "dating") {
      faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does ProfileFinder AI work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProfileFinder AI uses advanced algorithms to scan millions of Tinder profiles and dating apps. Simply provide basic information, and our AI performs a comprehensive Tinder profile lookup across multiple platforms instantly."
            }
          },
          {
            "@type": "Question",
            "name": "How can I verify someone's dating activity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use our ProfileFinder AI to perform a Tinder profile search. Enter their information, and we'll scan Tinder, Bumble, Hinge, and other dating apps to detect hidden profiles and suspicious activities."
            }
          },
          {
            "@type": "Question",
            "name": "Is ProfileFinder AI free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer both free trial searches and premium features. Basic Tinder profile search functions are available for free, while advanced monitoring requires a subscription."
            }
          },
          {
            "@type": "Question",
            "name": "What is Tinder and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tinder is a popular dating app where users swipe to connect. Our system understands how Tinder works and can perform thorough profile lookups even if someone tries to hide their presence."
            }
          }
        ]
      };
    } else if (selectedService === "facetrace") {
      faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does FaceCheck ID compare to PimEyes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FaceCheck ID provides facial recognition search similar to PimEyes. We perform reverse face search and reverse image search people across billions of images including social profile discovery and Facebook image search capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it as a creator or Instagram finder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our face search engine works as a creator search tool and Instagram finder. Upload a photo to perform social account lookup and Facebook profile search to find someone on social platforms."
            }
          },
          {
            "@type": "Question",
            "name": "How does public figure face matching work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our public figure matcher lets you identify people by face. Upload a photo for reverse image search or to identify face matches with our AI recognition technology."
            }
          },
          {
            "@type": "Question",
            "name": "Is FaceCheck ID better than TinEye and Yandex?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! While TinEye and Yandex reverse search are good for general images, our face ID search specializes in facial recognition search and reverse image search people with 97% accuracy."
            }
          }
        ]
      };
    }

    // Create Organization structured data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ProfileFinder AI",
      "url": "https://profilefinder.ai",
      "logo": "https://profilefinder.ai/logo.png",
      "description": "Advanced AI-powered profile search and dating app detection platform. Trusted by over 500,000 users worldwide.",
      "sameAs": [
        "https://twitter.com/profilefinderai",
        "https://facebook.com/profilefinderai"
      ]
    };

    // Combine all structured data
    const combinedData = {
      "@context": "https://schema.org",
      "@graph": [structuredData, faqStructuredData, organizationData]
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(combinedData);
    document.head.appendChild(script);
  }, [selectedService]);

  return null; // This component doesn't render anything
}
