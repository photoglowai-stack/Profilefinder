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
        "name": "Cheaterbuster AI - Tinder Profile Search",
        "applicationCategory": "UtilitiesApplication",
        "description": "Advanced AI-powered dating profile finder. Search Tinder profiles, detect cheaters, and find hidden dating app accounts with 95% accuracy.",
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
          "Cheater Detection AI",
          "Multi-Platform Search",
          "Anonymous Searches",
          "Instant Results"
        ],
        "keywords": "cheaterbuster ai, cheater buster, tinder profile search, tinder profile lookup, how to catch a cheater, ai dating, dating apps, swindler buster"
      };
    } else if (selectedService === "facetrace") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "FaceCheck ID - Reverse Face Search & Facial Recognition",
        "applicationCategory": "UtilitiesApplication",
        "description": "Advanced FaceCheck ID and PimEyes alternative. Perform reverse face search, facial recognition search, OnlyFans finder, Instagram finder, pornstar by face search with 97% accuracy.",
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
          "OnlyFans Finder",
          "Instagram Finder",
          "Pornstar by Face Search",
          "Face ID Search Free",
          "Reverse Image Search People",
          "AI Face Search"
        ],
        "keywords": "facecheck id, pimeyes, reverse face search, facial recognition search, onlyfans finder, instagram finder, pornstar by face, face id search, pim eyes, tineye, yandex reverse search"
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
            "name": "How does Cheaterbuster AI work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cheaterbuster AI uses advanced algorithms to scan millions of Tinder profiles and dating apps. Simply provide basic information, and our AI performs a comprehensive tinder profile lookup across multiple platforms instantly."
            }
          },
          {
            "@type": "Question",
            "name": "How to catch a cheater using Tinder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use our Cheater Buster AI to perform a Tinder profile search. Enter their information, and we'll scan Tinder, Bumble, Hinge, and other dating apps to detect hidden profiles and suspicious activities."
            }
          },
          {
            "@type": "Question",
            "name": "Is Cheaterbuster AI free?",
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
              "text": "FaceCheck ID provides facial recognition search similar to PimEyes. We perform reverse face search and reverse image search people across billions of images including OnlyFans finder, Instagram finder, and Facebook image search capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it as an OnlyFans finder and Instagram finder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our face search engine works as an OnlyFans search tool and Instagram finder. Upload a photo to perform OnlyFans search, Instagram account lookup, and Facebook profile search to find someone on social platforms."
            }
          },
          {
            "@type": "Question",
            "name": "How does pornstar by face search work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our pornstar finder lets you search pornstar by face. Upload a photo for reverse image search porn, porn image search, or to identify pornstar face matches with our AI porn finder technology."
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
