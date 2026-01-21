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
        },
        {
          name: "Jennifer K.",
          role: "Verified user",
          content: "The Radar feature caught him when he traveled for 'business'. Worth every penny for peace of mind.",
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
          answer: "ProfileFinder is not an AI dating app that tries to match you with new people. Instead, it is a relationship-intelligence tool: it helps you verify whether someone you already know is active on Tinder or similar platforms. Our goal is not to encourage intrusive apps, but to give you clarity so you can decide what to do next."
        },
        {
          question: "How does the Radar feature work?",
          answer: "The Radar feature continuously monitors for new dating profiles matching your search criteria. If someone creates a new profile, reinstalls Tinder, or becomes active in a different location, you receive an instant alert. This is particularly useful for long-distance relationships or when someone travels frequently."
        },
        {
          question: "Can you search other platforms besides Tinder?",
          answer: "Yes! Beyond Tinder profile search, we cover Bumble, Hinge, OkCupid, POF, Match.com, and many other popular dating platforms. Our AI scans across multiple apps simultaneously to give you the most comprehensive results possible."
        },
        {
          question: "How can I find a Tinder profile with just a first name?",
          answer: "Enter the first name, approximate age (within 5 years), and the city or area where they likely use the app. Our AI cross-references this with public profile data to find matching accounts. The more accurate your inputs, the better the results. Adding a photo increases match accuracy by 40%."
        },
        {
          question: "Can I search by phone number?",
          answer: "ProfileFinder primarily uses name, age, location, and photos for searching. Phone number searches are available as a premium feature and work when the phone is linked to social profiles. However, most dating apps don't expose phone numbers publicly, so photo-based search typically yields better results."
        },
        {
          question: "Is the search really 100% anonymous?",
          answer: "Absolutely. The person you're searching for will never be notified that you searched for them. We don't interact with their profile, send messages, or leave any digital footprint. Your search history is encrypted and visible only to you."
        },
        {
          question: "How long does a search take?",
          answer: "Most searches complete in under 60 seconds. Complex searches across all platforms may take up to 2 minutes. If you enable continuous monitoring (Radar), you'll receive real-time alerts as new profiles appear, typically within minutes of creation."
        },
        {
          question: "Is ProfileFinder free to use?",
          answer: "We offer a limited free trial to test our service. Full searches require a subscription or pay-per-search credits. Given the computational cost of AI face recognition and multi-platform scanning, we maintain affordable pricing to ensure service quality and accuracy."
        },
        {
          question: "Can I see private or hidden photos on profiles?",
          answer: "No. ProfileFinder only accesses publicly visible information. We cannot bypass privacy settings, access private photos, or read direct messages. If a profile is set to private or hidden, we can only detect its existence if some public data is available."
        },
        {
          question: "What if the person has multiple dating profiles?",
          answer: "Our AI consolidates results across platforms. If someone has profiles on Tinder, Bumble, and Hinge, all three will appear in your results with confidence scores indicating match certainty. This helps you understand the full scope of their online dating presence."
        },
        {
          question: "How accurate is the Radar feature for travel detection?",
          answer: "The Radar feature detects location changes within 24-48 hours of activity. When someone opens a dating app in a new city, our system picks up the location update from public profile data. This is particularly effective for detecting business trip activity or vacation swiping."
        },
        {
          question: "What should I do if I find a profile?",
          answer: "Finding a profile doesn't necessarily mean infidelity—some profiles may be inactive or forgotten. We recommend taking screenshots of your results, gathering additional context, and approaching any conversation calmly. Our results page includes tips for healthy communication and resources if you need support."
        }
      ]
    },
    seoContent: {
      title: "How our Tinder profile finder works",
      sections: [
        {
          title: "Dating Search – find hidden Tinder profiles",
          content: "Dating Search is the core of ProfileFinder. Use it when you want to know if someone has a hidden Tinder profile or still uses dating apps in secret. With one search, you can run a targeted Tinder profile search based on their name, age and city, then review any matching profiles. It is the fastest way to find someone on Tinder when you only have limited information. Instead of manually creating fake accounts or using risky third-party apps, you use a safe, purpose-built investigation tool."
        },
        {
          title: "Why people use ProfileFinder instead of random search tools",
          content: "Most online tools were built for casual curiosity or general reverse image search. ProfileFinder is different. It focuses on real-life relationship questions like 'Is my boyfriend on Tinder?', 'Is my girlfriend still on dating apps?', 'Can I trust what they tell me?' By combining Tinder profile search, face recognition search and trust-focused analysis, we give you concrete data instead of rumours."
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
      title: "Following AI – Monitor Instagram",
      titleHighlight: "subscriptions & follows",
      description: "Following AI monitors who someone follows on Instagram and tracks subscription changes over time. See new follows, unfollows, and suspicious activity in real-time.",
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
        following: { name: "Following AI", description: "Instagram monitoring" },
        facetrace: { name: "Face Trace", description: "AI face search" },
        fidelity: { name: "Fidelity Test", description: "Trust analysis" }
      }
    },
    form: {
      title: "Analyze Social Profile",
      subtitle: "Monitor Instagram subscriptions: see who they follow, who follows them, and track changes over time",
      label: "Instagram username",
      placeholder: "@username (Instagram)",
      search: "ANALYZE",
      searching: "Analyzing...",
      bottomText: "Only public Instagram profiles supported",
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
          description: "Instead of scrolling endlessly through their followers, you get a structured view of behaviour that often appears before conversations move to Tinder chat or other platforms.",
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
          question: "How does Following AI act as a relationship risk monitor?",
          answer: "Following AI analyses who someone follows and interacts with on their public social media. Think of it as a discreet relationship risk monitor that looks for patterns you might miss: sudden bursts of following new attractive profiles, late-night likes, or heavy interaction with the same few people. Instead of scrolling endlessly through their followers, you get a structured view of behaviour."
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
        },
        {
          question: "What social platforms does Following AI support?",
          answer: "Currently Following AI focuses on Instagram public profiles. We analyze following patterns, new follows/unfollows, and interaction frequency. Support for additional platforms is planned for future updates."
        },
        {
          question: "How does the AI detect suspicious activity?",
          answer: "Our AI looks for behavioral patterns that often precede relationship issues: sudden interest in new attractive profiles, repetitive interactions with specific accounts, late-night activity spikes, and following accounts that match certain 'flirty' profiles. We score each pattern and alert you to significant changes."
        },
        {
          question: "What information do I need to start tracking?",
          answer: "You only need the Instagram username of the account you want to monitor. The profile must be public for our system to access following data. Private accounts cannot be tracked."
        },
        {
          question: "Can Following AI see private messages or DMs?",
          answer: "No, absolutely not. Following AI only accesses publicly visible information such as who someone follows and publicly visible interactions. We cannot access private messages, DMs, or any content behind privacy settings."
        },
        {
          question: "How accurate is the suspicious activity detection?",
          answer: "Our AI has a 94% accuracy rate in identifying patterns that correlate with concerning relationship behaviors. However, following new accounts isn't always suspicious—context matters. We provide scores and patterns, but you make the final judgment."
        },
        {
          question: "Will I get alerts for every single new follow?",
          answer: "No, we filter out noise. You receive alerts for patterns, not individual actions. For example, we'll notify you if someone follows 5 attractive new accounts in a week, but not for following a news outlet or brand."
        },
        {
          question: "How far back can I see following history?",
          answer: "We track changes from the moment you start monitoring. Historical data before monitoring starts is limited to what's currently visible on the public profile. For best results, start monitoring early."
        },
        {
          question: "Is this legal to use?",
          answer: "Yes. Following AI only accesses publicly available information that anyone can see on Instagram. We don't hack accounts, bypass privacy settings, or access protected data. Our service is comparable to manually checking someone's public following list."
        },
        {
          question: "Can I cancel monitoring at any time?",
          answer: "Yes, you can stop monitoring any account at any time. Your data is deleted once you cancel, and the person is never notified that they were being monitored."
        },
        {
          question: "How is Following AI different from manually checking followers?",
          answer: "Manually checking is time-consuming and you'd miss temporal patterns. Following AI tracks changes 24/7, alerts you to significant behavior changes, identifies suspicious patterns, and presents data in an actionable format. It saves hours of manual scrolling."
        },
        {
          question: "What should I do if Following AI detects concerning patterns?",
          answer: "Finding suspicious following patterns doesn't automatically mean infidelity—some people follow many accounts innocently. We recommend combining results with other ProfileFinder tools like Dating Search or Face Trace for a complete picture. Our reports include guidance on interpreting results."
        }
      ]
    },
    seoContent: {
      title: "Following AI – analyse who they follow and like",
      sections: [
        {
          title: "Social signal analysis for relationship intelligence",
          content: "Following AI reviews public follows, likes and comments to reveal patterns that often appear before conversations move to dating apps. It highlights unusual spikes in attention to new people, recurring late-night interactions and hidden accounts. Combined with Dating Search, it gives you a broader picture than a traditional surveillance app without ever needing access to their phone."
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
        },
        {
          question: "What photo quality works best for Face Trace?",
          answer: "For optimal results, upload clear, front-facing photos where the face is clearly visible and well-lit. Photos should be at least 200x200 pixels. Side profiles, group photos, or heavily filtered images may reduce accuracy. The clearer the face, the better the match results."
        },
        {
          question: "How is Face Trace different from Google reverse image search?",
          answer: "Google searches for the exact same image across the web. Face Trace uses AI facial recognition to find the same PERSON, even in completely different photos. We can find someone's dating profile even if they use photos you've never seen before."
        },
        {
          question: "Can Face Trace find someone on dating apps from their Instagram photo?",
          answer: "Yes. Upload any clear photo of their face—from Instagram, Facebook, or anywhere else—and our AI will search for matching faces across dating platforms. Even if they use different photos on Tinder, our face recognition can identify the same person."
        },
        {
          question: "How accurate is the face matching?",
          answer: "Face Trace has a 97% accuracy rate for clear, front-facing photos. Accuracy decreases with poor lighting, extreme angles, or heavy filters. Our system provides a confidence score for each match so you can assess reliability."
        },
        {
          question: "Can Face Trace detect AI-generated or deepfake photos?",
          answer: "Yes, our system includes AI-generated image detection. We can identify photos created by AI tools like DALL-E or Midjourney, as well as common deepfake indicators. This helps protect you from sophisticated catfishing attempts."
        },
        {
          question: "What platforms does Face Trace search?",
          answer: "Face Trace searches across major dating apps (Tinder, Bumble, etc.), social media platforms (Instagram, Facebook), and public image databases. We prioritize relationship-relevant sources rather than the entire internet."
        },
        {
          question: "How long does a Face Trace search take?",
          answer: "Most searches complete in 30 seconds or less. Complex searches or rare faces may take up to 2 minutes. You'll receive results directly in your dashboard with confidence scores for each match."
        },
        {
          question: "Can the person I'm searching for find out?",
          answer: "No, Face Trace searches are completely anonymous. We never contact, interact with, or notify anyone about searches. The photos you upload are analyzed locally and never shared or stored."
        },
        {
          question: "What if Face Trace finds multiple matching profiles?",
          answer: "If the same face appears on multiple platforms, we'll show all matches with individual confidence scores. This can reveal if someone maintains profiles on multiple dating apps, or if their photos are being used by catfishers."
        },
        {
          question: "How is Face Trace different from PimEyes?",
          answer: "PimEyes searches the entire public internet, which can return irrelevant results. Face Trace is specifically optimized for relationship verification, focusing on dating apps and social platforms where people create dating profiles. We also offer better privacy protections and don't store your uploaded images."
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
          description: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic boundary-crossing patterns. Answer precise questions about phone habits, trips, money, social media and dating app usage.",
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
          description: "Receive clear next steps, from running another Tinder profile lookup to using Face Trace. While no system can assess trust issues with 100% certainty, this structured approach is far more reliable than guessing.",
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
          question: "How does the Fidelity Test work to confirm hidden activity?",
          answer: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic boundary-crossing patterns. Instead of reading random 'how to verify hidden activity' articles, you answer precise questions about phone habits, trips, money, social media and dating app usage. Our AI then scores the risk level and suggests next steps."
        },
        {
          question: "Can the Fidelity Test assess trust issues with certainty?",
          answer: "While no system can assess trust issues with 100% certainty, the Fidelity Test turns vague suspicion into clearer signals. It combines your observations with AI analysis to estimate the likelihood that boundaries are being crossed, helping you make an informed decision about what to do next."
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
        },
        {
          question: "What types of screenshots can I upload?",
          answer: "You can upload screenshots from any messaging platform: WhatsApp, iMessage, SMS, Instagram DMs, Messenger, Snapchat, or dating apps. The AI analyzes conversation patterns, timing, and language rather than specific platform formats."
        },
        {
          question: "What behavioral patterns does the AI look for?",
          answer: "Our AI detects patterns like secretive phone behavior (turning screen away, stepping out for calls), unexplained schedule changes, financial irregularities, increased grooming or appearance changes, emotional distance, and defensive reactions to simple questions about their day."
        },
        {
          question: "How is this different from reading relationship advice online?",
          answer: "Generic advice lists signs of cheating but can't assess YOUR specific situation. The Fidelity Test asks targeted questions about actual behaviors you've observed and generates a personalized risk score. It's systematic evaluation vs. random guessing."
        },
        {
          question: "Will my partner know I'm using this?",
          answer: "No, the Fidelity Test is completely confidential. We don't contact anyone, access anyone's accounts, or leave any trace. Only you see the questions, screenshots, and results."
        },
        {
          question: "What's included in the PDF report?",
          answer: "The report includes: overall risk score (0-100), breakdown by category (communication, finances, social media, physical behavior), specific red flags identified, comparison to baseline behaviors, and recommended next steps for each concern level."
        },
        {
          question: "Can I run the Fidelity Test multiple times?",
          answer: "Yes, you can run it periodically to track changes in behavior over time. If you have new observations or new screenshots, running another test can help you see if the risk level is increasing or decreasing."
        },
        {
          question: "What if my risk score is high but I'm not sure?",
          answer: "A high score indicates patterns that correlate with boundary-crossing behavior, but doesn't prove anything definitively. We recommend combining with other ProfileFinder tools: run a Dating Search to check for Tinder profiles, use Face Trace to verify photo authenticity, or activate Following AI to monitor social signals."
        },
        {
          question: "Is the Fidelity Test based on scientific research?",
          answer: "Yes, our questions and scoring are based on published research on infidelity predictors from relationship psychology. We use validated behavioral indicators rather than pop psychology guesswork."
        },
        {
          question: "Can I use this for relationships other than romantic partners?",
          answer: "While designed for romantic relationships, the Fidelity Test can help evaluate trust in any close relationship where you suspect dishonesty. Some users have used it for business partnerships or family situations where deception may be occurring."
        },
        {
          question: "What if the test shows low risk but I still feel suspicious?",
          answer: "Intuition matters. A low score means the behaviors you've observed don't match common infidelity patterns, but it doesn't mean nothing is happening. Consider using our other tools for additional data: Dating Search for dating app activity, Face Trace for photo verification, or Following AI for social media monitoring."
        }
      ]
    },
    seoContent: {
      title: "Fidelity Test – a structured way to confirm hidden activity",
      sections: [
        {
          title: "From vague doubt to clear signals",
          content: "The Fidelity Test is an interactive checklist that helps you evaluate whether someone's behaviour matches classic boundary-crossing patterns. Instead of reading random 'how to verify hidden activity' articles, you answer precise questions about phone habits, trips, money, social media and dating app usage. Our AI then scores the risk level and suggests next steps, from running another Tinder profile lookup to using Face Trace."
        },
        {
          title: "How to confirm hidden activity with structured analysis",
          content: "Learning how to verify hidden activity requires a systematic approach. The Fidelity Test combines behavioral psychology with AI analysis to identify red flags: secretive phone behavior, unexplained absences, financial inconsistencies, and suspicious social media activity. While we never claim to assess trust issues with absolute certainty, this structured approach is far more reliable than guessing or endlessly searching 'how to verify hidden activity' online."
        },
        {
          title: "Understanding modern boundary-crossing patterns",
          content: "To assess trust issues in the digital age means understanding their online behavior patterns. Our Fidelity Test looks for signs of emotionally unavailable partners, secret accounts usage, or suspicious activity on dating platforms. The AI identifies patterns that might indicate infidelity, from hidden profiles to suspicious communication behaviors, giving you concrete data to make informed decisions."
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
    description: "Explore ProfileFinder tools: Tinder profile search, AI face search, social Following AI and Fidelity Test – a discreet way to surface hidden activity and reveal hidden dating profiles."
  }
};

// Hero intro paragraph (80-120 words for SEO)
export const heroIntroText = "ProfileFinder is an AI-powered Tinder profile finder that turns hours of swiping into one fast search. Instead of guessing whether your partner is on Tinder or other monitoring apps, you launch a single Tinder profile search. Our engine compares the details you provide—first name, age and location—to live dating profiles and returns the closest matches. The result: a discreet, data-driven way to check if someone is really using dating apps, without touching their phone or logging into their account. It is not a playful AI dating app; it is a serious tool for people who just want the truth.";

// Stats section content
export const statsContent = {
  title: "Why people use ProfileFinder instead of random search tools",
  intro: "Most online tools were built for casual curiosity or general reverse image search. ProfileFinder is different. It focuses on real-life relationship questions like 'Is my boyfriend on Tinder?', 'Is my girlfriend still on dating apps?', 'Can I trust what they tell me?' By combining Tinder profile search, face recognition search and trust-focused analysis, we give you concrete data instead of rumours.",
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
