export type ServiceType = "dating" | "following" | "facetrace" | "fidelity";

export const serviceContent = {
  dating: {
    hero: {
      badge: "Powered by AI",
      title: "Tinder profile search",
      titleHighlight: "with AI",
      description: "Run a Tinder profile lookup with just a name, age and city to see if someone is really active on dating apps.",
      stats: [
        { label: "95% accuracy", icon: "check" },
        { label: "Results in 30s", icon: "clock" },
        { label: "100% confidential", icon: "shield" }
      ]
    },
    serviceSelector: {
      title: "Choose your service",
      services: {
        dating: { name: "Dating Search", description: "Tinder & dating apps" },
        following: { name: "Following AI", description: "Social signals" },
        facetrace: { name: "Face Trace", description: "AI face search" },
        fidelity: { name: "Fidelity Test", description: "Trust analysis" }
      }
    },
    form: {
      title: "Who are you looking for?",
      subtitle: "Select the gender of the person to search for",
      man: "Man",
      woman: "Woman",
      search: "SEARCH",
      searching: "Searching...",
      bottomText: "Get a clear answer in under 2 minutes.",
      badges: [
        "Works on all dating apps",
        "Instant results",
        "100% anonymous"
      ]
    },
    statsBar: {
      items: [
        { value: "500K+", label: "profiles found" },
        { value: "95%", label: "success rate" },
        { value: "24/7", label: "availability" },
        { value: "150+", label: "countries" }
      ]
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Find any dating profile in 3 simple steps",
      steps: [
        {
          number: "1",
          title: "Fill in their basic details",
          description: "Enter the first name, approximate age and the city or area where they most likely use the app. This gives our AI a precise starting point to search Tinder profiles instead of scanning the whole world blindly.",
          features: [
            "Name and age input",
            "Location targeting",
            "Optional photo upload"
          ],
          time: "10 seconds"
        },
        {
          number: "2",
          title: "Launch the Tinder profile lookup",
          description: "Click Search to start the Tinder profile lookup. Our system scans for matching profiles and checks recent activity. When we find likely matches, you see profile photos, bio, distance and other key details that can confirm or contradict what they have told you.",
          features: [
            "Real-time profile scanning",
            "Activity verification",
            "Photo and bio analysis"
          ],
          time: "30 seconds"
        },
        {
          number: "3",
          title: "Activate the Radar if needed",
          description: "If no profile appears or you want ongoing monitoring, turn on the Radar. This feature watches for new activity and alerts you as soon as a profile matching your criteria becomes visible. You no longer need to wonder every time they travel or reinstall dating apps.",
          features: [
            "Continuous monitoring",
            "Instant alerts",
            "Travel tracking"
          ],
          time: "Ongoing"
        }
      ]
    },
    testimonials: {
      title: "What our users say",
      subtitle: "Thousands of people have already discovered the truth",
      items: [
        {
          name: "Sarah M.",
          role: "Verified user",
          content: "I found my boyfriend's secret Tinder profile in less than a minute. This tool saved me from a toxic relationship.",
          rating: 5
        },
        {
          name: "Mike T.",
          role: "Verified user",
          content: "Incredible accuracy! The AI found exactly what I was looking for. Highly recommended.",
          rating: 5
        },
        {
          name: "Emma L.",
          role: "Verified user",
          content: "Simple, fast and discreet. I got my answers without any drama.",
          rating: 5
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What will I find in my Tinder profile search results?",
          answer: "A typical Tinder profile search result shows the person's main profile photo, additional pictures if available, bio text, approximate distance and an activity indicator based on when we last saw the profile. You can compare this with what you already know about them—age, city, interests—to decide whether the profile belongs to the person you searched for."
        },
        {
          question: "Is ProfileFinder confidential and legal to use?",
          answer: "Yes. ProfileFinder only works with publicly available information from dating apps and social networks. We do not hack accounts, read private messages or ask for passwords. Searches are anonymous and visible only to you. Used responsibly, it is a legal way to check if someone maintains public dating profiles while in a relationship."
        },
        {
          question: "Is this a free reverse image search people tool?",
          answer: "No. Generic free reverse image search people tools are designed for broad internet searches. ProfileFinder focuses specifically on dating apps and relationship investigations. We use advanced AI face search and other techniques to narrow the search space and return more relevant matches. Because of the computing cost and ongoing monitoring, we charge a small fee per search."
        },
        {
          question: "Is ProfileFinder just another AI dating app?",
          answer: "ProfileFinder is not an AI dating app that tries to match you with new people. Instead, it is a relationship-intelligence tool: it helps you verify whether someone you already know is active on Tinder or similar platforms. Our goal is not to encourage cheating apps, but to give you clarity so you can decide what to do next."
        },
        {
          question: "How does the Radar feature work?",
          answer: "The Radar feature continuously monitors for new dating profiles matching your search criteria. If someone creates a new profile, reinstalls Tinder, or becomes active in a different location, you receive an instant alert. This is particularly useful for long-distance relationships or when someone travels frequently."
        },
        {
          question: "Can you search other platforms besides Tinder?",
          answer: "Yes! Beyond Tinder profile search, we cover Bumble, Hinge, and many other popular dating platforms. Our AI scans across multiple apps simultaneously to give you the most comprehensive results possible."
        }
      ]
    },
    seoContent: {
      title: "How our Tinder profile finder works",
      sections: [
        {
          title: "Dating Search – find hidden Tinder profiles",
          content: "Dating Search is the core of ProfileFinder. Use it when you want to know if someone has a hidden Tinder profile or still uses dating apps in secret. With one search, you can run a targeted Tinder profile search based on their name, age and city, then review any matching profiles. It is the fastest way to find someone on Tinder when you only have limited information. Instead of manually creating fake accounts or risky cheating apps, you use a safe, purpose-built investigation tool."
        },
        {
          title: "Why people use ProfileFinder instead of random search tools",
          content: "Most online tools were built for casual curiosity or general reverse image search. ProfileFinder is different. It focuses on real-life relationship questions like 'Is my boyfriend on Tinder?', 'Is my girlfriend still on dating apps?', 'Can I trust what they tell me?' By combining Tinder profile search, face recognition search and cheater-oriented analysis, we give you concrete data instead of rumours."
        },
        {
          title: "Search dating profiles anywhere in the world",
          content: "Whether your partner travels for work, studies abroad or spends a lot of time online, ProfileFinder can run a Tinder profile search in any location. Our AI adjusts to the city you choose and focuses the scan there first. You no longer need to create multiple accounts or change your GPS; instead, you run one precise search and let our system do the heavy lifting."
        }
      ]
    }
  },
  following: {
    hero: {
      badge: "Powered by Advanced AI",
      title: "Following AI – your cheater AI",
      titleHighlight: "for social signals",
      description: "Following AI analyses who someone follows and interacts with on their public social media. Discover patterns you might miss before they move to Tinder or other platforms.",
      stats: [
        { label: "Real-time tracking", icon: "check" },
        { label: "Results in 1 min", icon: "clock" },
        { label: "100% discreet", icon: "shield" }
      ]
    },
    serviceSelector: {
      title: "Choose your service",
      services: {
        dating: { name: "Dating Search", description: "Tinder & dating apps" },
        following: { name: "Following AI", description: "Social signals" },
        facetrace: { name: "Face Trace", description: "AI face search" },
        fidelity: { name: "Fidelity Test", description: "Trust analysis" }
      }
    },
    form: {
      title: "Track Instagram subscriptions",
      subtitle: "Discover who a person follows and who follows them on Instagram",
      label: "Instagram username",
      placeholder: "@username",
      search: "Analyze profile",
      searching: "Analyzing...",
      bottomText: "847 people tracked subscriptions today.",
      badges: [
        "Guaranteed discretion",
        "Results in 1 min",
        "24/7 updates"
      ],
      features: [
        "Complete list of new subscriptions",
        "Subscription/unsubscription history",
        "Suspicious profile detection",
        "Real-time alerts"
      ]
    },
    statsBar: {
      items: [
        { value: "2M+", label: "profiles tracked" },
        { value: "99%", label: "accuracy" },
        { value: "24/7", label: "monitoring" },
        { value: "Real-time", label: "alerts" }
      ]
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Analyse social signals in 3 simple steps",
      steps: [
        {
          number: "1",
          title: "Enter username",
          description: "Type the Instagram username you want to monitor. Our AI will start analyzing their public following patterns.",
          features: [
            "Username input",
            "Public profile scanning",
            "Historical baseline"
          ],
          time: "5 seconds"
        },
        {
          number: "2",
          title: "AI pattern analysis",
          description: "Our AI scans all followers and following in real-time, looking for sudden bursts of following new attractive profiles, late-night likes, or heavy interaction with the same few people.",
          features: [
            "Following pattern detection",
            "Interaction analysis",
            "Suspicious account flagging"
          ],
          time: "1 minute"
        },
        {
          number: "3",
          title: "Get structured alerts",
          description: "Instead of scrolling endlessly through their followers, you get a structured view of behaviour that often appears before cheaters move conversations to Tinder chat or other platforms.",
          features: [
            "Real-time notifications",
            "Behavior scoring",
            "Red flag detection"
          ],
          time: "Ongoing"
        }
      ]
    },
    testimonials: {
      title: "What our users say",
      subtitle: "Thousands of people monitor Instagram profiles every day",
      items: [
        {
          name: "Jessica R.",
          role: "Verified user",
          content: "I discovered my partner was following suspicious accounts. This tool opened my eyes.",
          rating: 5
        },
        {
          name: "David K.",
          role: "Verified user",
          content: "Perfect for keeping track of who your kids are following. Peace of mind guaranteed.",
          rating: 5
        },
        {
          name: "Maria S.",
          role: "Verified user",
          content: "Real-time alerts are incredibly useful. I'm notified immediately of any changes.",
          rating: 5
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How does Following AI work as a cheater AI?",
          answer: "Following AI analyses who someone follows and interacts with on their public social media. Think of it as a discreet cheater AI that looks for patterns you might miss: sudden bursts of following new attractive profiles, late-night likes, or heavy interaction with the same few people. Instead of scrolling endlessly through their followers, you get a structured view of behaviour."
        },
        {
          question: "Can the person know I'm tracking them?",
          answer: "No, tracking is completely invisible. The person will never know they're being monitored. We only access publicly available information and do not interact with their account in any way."
        },
        {
          question: "How often are follower lists updated?",
          answer: "Updates are done in real-time. You'll be notified within minutes of any change in their following patterns or new interactions."
        },
        {
          question: "Can I track multiple accounts?",
          answer: "Yes, our premium plan allows you to monitor up to 10 accounts simultaneously, perfect for keeping an eye on multiple social signals."
        }
      ]
    },
    seoContent: {
      title: "Following AI – analyse who they follow and like",
      sections: [
        {
          title: "Social signal analysis for relationship intelligence",
          content: "Following AI reviews public follows, likes and comments to reveal patterns that often appear before cheaters move conversations to dating apps. It highlights unusual spikes in attention to new people, recurring late-night interactions and hidden accounts. Combined with Dating Search, it gives you a broader picture than a traditional cheating app without ever needing access to their phone."
        },
        {
          title: "Digital red flags detection",
          content: "Our AI detects behaviour patterns that often precede infidelity: sudden interest in new profiles, late-night social media activity, hidden accounts, and repetitive interactions with specific users. It's not about spying, but about noticing digital red flags early before they escalate to Tinder chat or secret meetings."
        }
      ]
    }
  },
  facetrace: {
    hero: {
      badge: "Powered by AI face search",
      title: "Face Trace – AI face search",
      titleHighlight: "& reverse image search for people",
      description: "Face Trace lets you investigate using a photo when a name is not enough. Upload a clear picture and our system performs an AI face search combined with a reverse image search people workflow.",
      stats: [
        { label: "Global database", icon: "check" },
        { label: "Results in 30s", icon: "clock" },
        { label: "100% confidential", icon: "shield" }
      ]
    },
    serviceSelector: {
      title: "Choose your service",
      services: {
        dating: { name: "Dating Search", description: "Tinder & dating apps" },
        following: { name: "Following AI", description: "Social signals" },
        facetrace: { name: "Face Trace", description: "AI face search" },
        fidelity: { name: "Fidelity Test", description: "Trust analysis" }
      }
    },
    form: {
      title: "Photo verification",
      subtitle: "Discover if profile photos are authentic or stolen",
      label: "Upload a profile photo",
      uploadText: "Click to upload a photo",
      uploadHint: "JPG, PNG, WEBP (max. 10MB)",
      search: "Analyze photo",
      searching: "Analyzing...",
      bottomText: "653 people verified photos today.",
      badges: [
        "100% confidential",
        "Results in 30s",
        "Global database"
      ],
      alert: {
        title: "How does it work?",
        description: "Our AI analyzes the photo and compares it to millions of images on the Internet."
      },
      features: [
        "Reverse Google Images search",
        "Stock photo detection",
        "Metadata analysis (date, location, device)",
        "Authenticity score (0-100%)"
      ]
    },
    statsBar: {
      items: [
        { value: "10M+", label: "photos analyzed" },
        { value: "97%", label: "detection rate" },
        { value: "Global", label: "database" },
        { value: "Instant", label: "results" }
      ]
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Verify photo authenticity in 3 simple steps",
      steps: [
        {
          number: "1",
          title: "Upload photo",
          description: "Upload the profile photo you want to verify. Our AI works best with clear, front-facing photos where the face is clearly visible.",
          features: [
            "Drag & drop upload",
            "Multiple formats supported",
            "Privacy protected"
          ],
          time: "5 seconds"
        },
        {
          number: "2",
          title: "AI face search analysis",
          description: "Our system performs an AI face search combined with a reverse image search people workflow. We look for profiles where the same face appears, even under different names.",
          features: [
            "Face recognition search",
            "Reverse face search",
            "Dating profile scanning"
          ],
          time: "30 seconds"
        },
        {
          number: "3",
          title: "Get detailed report",
          description: "Receive a detailed authenticity score and source locations. We use face recognition search and reverse face search techniques to highlight possible matches.",
          features: [
            "Authenticity percentage",
            "Source URLs",
            "Match confidence scores"
          ],
          time: "Instant"
        }
      ]
    },
    testimonials: {
      title: "What our users say",
      subtitle: "Thousands avoid catfishes every day thanks to Face Trace",
      items: [
        {
          name: "Chris B.",
          role: "Verified user",
          content: "I discovered the person I was talking to was using a model's photos. Thank you Face Trace!",
          rating: 5
        },
        {
          name: "Amanda P.",
          role: "Verified user",
          content: "Super fast and accurate. Found the original photo source in 20 seconds.",
          rating: 5
        },
        {
          name: "Tom W.",
          role: "Verified user",
          content: "Essential tool before meeting someone from the internet. Total peace of mind.",
          rating: 5
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How does Face Trace work as a face search engine?",
          answer: "Face Trace is our face recognition search feature. When you upload a photo, we run an AI face search and a tailored reverse face search to see if the same person appears on dating profiles or public accounts. It works like a specialised face finder for relationships: instead of crawling the entire internet, we prioritise sources where people usually present themselves to strangers."
        },
        {
          question: "Is this better than free reverse image search people tools?",
          answer: "Yes. Generic free reverse image search people tools are designed for broad internet searches. Face Trace focuses specifically on dating apps and relationship investigations. We use advanced AI face search techniques and face recognition search to narrow the search space and return more relevant matches from dating platforms and social media."
        },
        {
          question: "Can Face Trace detect fake or stolen photos?",
          answer: "Absolutely. Our AI face search can identify if a photo has been used elsewhere on the internet, whether it's a stock photo, a model's picture, or someone else's social media photo. The reverse image search people functionality helps you verify authenticity before investing emotionally."
        },
        {
          question: "Is photo search safe and are images stored?",
          answer: "Absolutely! All face search queries are confidential. Photos are analyzed in real-time and immediately deleted. We never store images from reverse image search people or any facial recognition search queries. Your privacy is guaranteed."
        },
        {
          question: "What makes Face Trace different from other face finders?",
          answer: "Face Trace combines AI face search with relationship-focused databases. Instead of general reverse face search across the entire web, we prioritize dating apps, social networks, and platforms where people create profiles to meet others. This targeted approach gives you more relevant results for relationship verification."
        }
      ]
    },
    seoContent: {
      title: "Face Trace – focused face recognition search",
      sections: [
        {
          title: "AI face search for dating verification",
          content: "Face Trace is our face recognition search feature. When you upload a photo, we run an AI face search and a tailored reverse face search to see if the same person appears on dating profiles or public accounts. It works like a specialised face finder for relationships: instead of crawling the entire internet, we prioritise sources where people usually present themselves to strangers."
        },
        {
          title: "Reverse image search people workflow",
          content: "Our reverse image search people technology focuses on dating apps and social platforms. Upload a photo and we perform face recognition search across Tinder, Bumble, Instagram, and other platforms where people create public profiles. Behind the scenes we use face recognition search and reverse face search techniques to highlight possible matches, so you can see whether that photo is reused on dating apps or other public profiles."
        },
        {
          title: "Why Face Trace beats generic face search engines",
          content: "Most face search engines scan the entire internet indiscriminately. Face Trace is different: our AI face search prioritizes relationship-relevant sources. We focus on dating platforms, social networks, and places where people present themselves to potential partners. This targeted reverse face search approach delivers more accurate, actionable results for relationship verification."
        }
      ]
    }
  },
  fidelity: {
    hero: {
      badge: "Powered by Advanced AI",
      title: "Fidelity Test – from vague doubt",
      titleHighlight: "to clear signals",
      description: "The Fidelity Test asks targeted questions about communication patterns, trips, finances, social media and dating behaviour. Get a structured risk assessment instead of endless guessing.",
      stats: [
        { label: "Confidential analysis", icon: "check" },
        { label: "Results in 2 min", icon: "clock" },
        { label: "Detailed PDF report", icon: "shield" }
      ]
    },
    serviceSelector: {
      title: "Choose your service",
      services: {
        dating: { name: "Dating Search", description: "Tinder & dating apps" },
        following: { name: "Following AI", description: "Social signals" },
        facetrace: { name: "Face Trace", description: "AI face search" },
        fidelity: { name: "Fidelity Test", description: "Trust analysis" }
      }
    },
    form: {
      title: "Fidelity test",
      subtitle: "Analyze conversations to detect suspicious behavior",
      label: "Upload conversation screenshots",
      uploadText: "Click to upload screenshots",
      uploadHint: "JPG, PNG (multiple files accepted)",
      addMore: "+ Add more screenshots",
      search: "Analyze conversations",
      searching: "Analyzing...",
      bottomText: "423 people ran fidelity tests today.",
      badges: [
        "Confidential analysis",
        "Results in 2 min",
        "PDF report"
      ],
      alert: {
        title: "Privacy",
        description: "Screenshots are analyzed locally and never stored."
      },
      features: [
        "Deleted or modified messages",
        "Suspicious language or secret codes",
        "Schedule inconsistencies",
        "Recurring suspicious contacts",
        "Detailed report with risk score"
      ]
    },
    statsBar: {
      items: [
        { value: "100K+", label: "conversations analyzed" },
        { value: "94%", label: "detection accuracy" },
        { value: "Private", label: "and secure" },
        { value: "Instant", label: "results" }
      ]
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Turn vague suspicion into clear signals in 3 steps",
      steps: [
        {
          number: "1",
          title: "Answer targeted questions",
          description: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic cheating patterns. Answer precise questions about phone habits, trips, money, social media and dating app usage.",
          features: [
            "Communication patterns",
            "Travel behaviour",
            "Financial anomalies"
          ],
          time: "2 minutes"
        },
        {
          number: "2",
          title: "AI pattern analysis",
          description: "Our AI then scores the risk level based on your answers combined with what our tools discover. We analyze patterns that often indicate boundaries are being crossed.",
          features: [
            "Behavior scoring",
            "Pattern recognition",
            "Risk assessment"
          ],
          time: "30 seconds"
        },
        {
          number: "3",
          title: "Get actionable recommendations",
          description: "Receive clear next steps, from running another Tinder profile lookup to using Face Trace. While no system can define a cheater with 100% certainty, this structured approach is far more reliable than guessing.",
          features: [
            "Risk percentage",
            "Recommended actions",
            "Detailed PDF report"
          ],
          time: "Instant"
        }
      ]
    },
    testimonials: {
      title: "What our users say",
      subtitle: "Thousands have discovered the truth thanks to the fidelity test",
      items: [
        {
          name: "Laura H.",
          role: "Verified user",
          content: "The AI detected deleted messages I had suspected. Finally, I have proof.",
          rating: 5
        },
        {
          name: "Ryan M.",
          role: "Verified user",
          content: "Incredibly detailed analysis. The report helped me understand what was really going on.",
          rating: 5
        },
        {
          name: "Sophie D.",
          role: "Verified user",
          content: "I had doubts but no proof. This tool gave me the clarity I needed.",
          rating: 5
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How does the Fidelity Test work to catch a cheater?",
          answer: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic cheating patterns. Instead of reading random 'how to catch a cheater' articles, you answer precise questions about phone habits, trips, money, social media and dating app usage. Our AI then scores the risk level and suggests next steps."
        },
        {
          question: "Can the Fidelity Test define a cheater with certainty?",
          answer: "While no system can define a cheater with 100% certainty, the Fidelity Test turns vague suspicion into clearer signals. It combines your observations with AI analysis to estimate the likelihood that boundaries are being crossed, helping you make an informed decision about what to do next."
        },
        {
          question: "Are screenshots stored?",
          answer: "No, all analysis is done in real-time and screenshots are immediately deleted after processing. We take your privacy seriously and never store any personal information or conversation data."
        },
        {
          question: "How accurate is the analysis?",
          answer: "Our system has a 94% accuracy rate in detecting suspicious behavioral patterns based on validated research on infidelity indicators and communication analysis."
        },
        {
          question: "What happens after I get my results?",
          answer: "You receive a detailed PDF report with a risk score and recommended next steps. Depending on your results, we may suggest running a Tinder profile lookup, using Face Trace to verify photos, or activating Following AI to monitor social signals."
        }
      ]
    },
    seoContent: {
      title: "Fidelity Test – a structured way to catch a cheater",
      sections: [
        {
          title: "From vague doubt to clear signals",
          content: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic cheating patterns. Instead of reading random 'how to catch a cheater' articles, you answer precise questions about phone habits, trips, money, social media and dating app usage. Our AI then scores the risk level and suggests next steps, from running another Tinder profile lookup to using Face Trace."
        },
        {
          title: "How to catch a cheater with structured analysis",
          content: "Learning how to catch a cheater requires a systematic approach. The Fidelity Test combines behavioral psychology with AI analysis to identify red flags: secretive phone behavior, unexplained absences, financial inconsistencies, and suspicious social media activity. While we never claim to define a cheater with absolute certainty, this structured approach is far more reliable than guessing or endlessly searching 'how to catch a cheater' online."
        },
        {
          title: "Understanding modern cheating patterns",
          content: "To define a cheater in the digital age means understanding their online behavior patterns. Our Fidelity Test looks for signs of emotionally unavailable partners, secret cheating apps usage, or suspicious activity on dating platforms. The AI identifies patterns that might indicate infidelity, from hidden profiles to suspicious communication behaviors, giving you concrete data to make informed decisions."
        }
      ]
    }
  }
};

export const navigationContent = {
  howItWorks: "How it works",
  testimonials: "Testimonials",
  faq: "FAQ",
  login: "Login"
};

export const ctaContent = {
  title: "Ready to discover the truth?",
  subtitle: "Join thousands of people who have already found answers",
  button: "Run Tinder search now"
};

export const footerContent = {
  tagline: "ProfileFinder is a discreet Tinder profile search and AI face search tool that helps you verify if someone is active on dating apps. Our mission is to give you clarity and confidence in modern relationships.",
  product: "Product",
  company: "Company",
  legal: "Legal",
  links: {
    howItWorks: "How it works",
    pricing: "Pricing",
    features: "Features",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy"
  },
  copyright: "© 2024 ProfileFinder. All rights reserved."
};

// Meta tags and SEO content
export const metaContent = {
  home: {
    title: "Tinder profile search with AI | ProfileFinder",
    description: "Discreet Tinder profile search tool powered by AI. Run a Tinder profile lookup with just a name, age and city to see if someone is active on dating apps."
  },
  tools: {
    title: "Tinder search, face search & Fidelity Test tools | ProfileFinder",
    description: "Explore ProfileFinder tools: Tinder profile search, AI face search, social Following AI and Fidelity Test – a discreet way to catch cheaters and reveal hidden dating profiles."
  }
};

// Hero intro paragraph (80-120 words for SEO)
export const heroIntroText = "ProfileFinder is an AI-powered Tinder profile finder that turns hours of swiping into one fast search. Instead of guessing whether your partner is on Tinder or other cheating apps, you launch a single Tinder profile search. Our engine compares the details you provide—first name, age and location—to live dating profiles and returns the closest matches. The result: a discreet, data-driven way to check if someone is really using dating apps, without touching their phone or logging into their account. It is not a playful AI dating app; it is a serious tool for people who just want the truth.";

// Stats section content
export const statsContent = {
  title: "Why people use ProfileFinder instead of random search tools",
  intro: "Most online tools were built for casual curiosity or general reverse image search. ProfileFinder is different. It focuses on real-life relationship questions like 'Is my boyfriend on Tinder?', 'Is my girlfriend still on dating apps?', 'Can I trust what they tell me?' By combining Tinder profile search, face recognition search and cheater-oriented analysis, we give you concrete data instead of rumours.",
  stats: [
    {
      value: "60%",
      label: "Around 60% of Tinder users are estimated to already be in a relationship."
    },
    {
      value: "1/2",
      label: "About half of the Tinder profile searches run with ProfileFinder detect at least one active or recently active profile."
    },
    {
      value: "19%",
      label: "Studies suggest that almost 1 in 5 people admit to having cheated on a partner at least once."
    }
  ],
  closing: "Eliminate doubts, protect your time and emotional energy, and use data instead of promises to understand what is really happening."
};
