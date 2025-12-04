import { motion } from "motion/react";
import { BookOpen, ArrowRight } from "lucide-react";
import { useService } from "../lib/ServiceContext";

const blogArticles = {
  facetrace: [
    {
      title: "PimEyes vs FaceCheck ID: Complete Comparison Guide 2024",
      excerpt: "Discover the differences between PimEyes, Pim Eyes, and FaceCheck ID. Learn which reverse face search tool offers the best facial recognition search capabilities, OnlyFans finder features, and Instagram finder accuracy.",
      tags: ["PimEyes", "Face Search", "Comparison"]
    },
    {
      title: "How to Use Reverse Image Search People Tools: TinEye, Yandex & More",
      excerpt: "Master reverse image search people techniques with our comprehensive guide covering TinEye (tineye, tinyeye), Yandex reverse search, Google photo reverse search, and advanced facial recognition search methods for finding profiles.",
      tags: ["TinEye", "Yandex", "Tutorial"]
    },
    {
      title: "OnlyFans Finder & Instagram Finder: Complete Social Media Search Guide",
      excerpt: "Learn how to find someone on OnlyFans and Instagram using face ID search free tools. Our guide covers OnlyFans search, only fans finder, Instagram account lookup, Instagram profile photo download, and social searcher techniques.",
      tags: ["OnlyFans", "Instagram", "Guide"]
    },
    {
      title: "Pornstar by Face Search: How AI Porn Finder Technology Works",
      excerpt: "Understanding pornstar finder and pornstar search engines. Learn about pornstar by face technology, reverse image search porn, porn image search, name that pornstar tools, and AI porn finder accuracy for identifying adult performers.",
      tags: ["Adult Search", "AI Technology", "Recognition"]
    },
    {
      title: "Face Search Engine Comparison: FaceSeek, StarByFace, Doppelganger Finder",
      excerpt: "Compare top face search engines including FaceSeek, StarByFace, doppelganger finder, and face check ID services. Discover which facial recognition search tool offers the best AI face search free features and accuracy.",
      tags: ["Face Search", "Tools Review", "Comparison"]
    },
    {
      title: "Instagram Profile Photo Download & Facebook Image Search Tutorial",
      excerpt: "Complete guide to Instagram pfp downloader, insta pfp tools, get instadp methods, Facebook image search, Facebook profile search, and Instagram search user techniques. Learn how to download and verify profile photos across platforms.",
      tags: ["Instagram", "Facebook", "Download"]
    }
  ]
};

export function SEOBlogSection() {
  const { selectedService } = useService();

  // Only show for facetrace
  if (selectedService !== "facetrace") return null;

  const articles = blogArticles[selectedService];
  if (!articles) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">Knowledge Base</span>
        </div>
        <h2 className="text-3xl md:text-4xl text-[#020817] mb-4">
          Guides & Resources
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Learn everything about reverse face search, facial recognition, and social media profile finding
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="mb-4">
              <h3 className="text-lg md:text-xl text-[#020817] mb-3 leading-tight group-hover:text-[#ff4e71] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag, tIndex) => (
                <span
                  key={tIndex}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="flex items-center gap-2 text-[#ff4e71] text-sm font-medium group-hover:gap-3 transition-all">
              Read more
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.article>
        ))}
      </div>

      {/* SEO Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 border border-blue-100"
      >
        <h3 className="text-xl md:text-2xl text-[#020817] mb-4 text-center">
          Comprehensive Face Recognition & Reverse Image Search Resources
        </h3>
        <div className="text-sm text-gray-700 leading-relaxed space-y-3 max-w-5xl mx-auto">
          <p>
            Our <strong>FaceCheck ID</strong> platform serves as the ultimate alternative to <strong>PimEyes</strong> (Pim Eyes, PimEye, PimEyes.com), 
            offering advanced <strong>reverse face search</strong> and <strong>facial recognition search</strong> capabilities. 
            Whether you need an <strong>OnlyFans finder</strong>, <strong>Instagram finder</strong>, or comprehensive <strong>pornstar by face</strong> search, 
            our AI-powered technology delivers accurate results faster than traditional tools.
          </p>
          <p>
            Unlike <strong>TinEye</strong> (tineye, tinyeye, tineyes) or <strong>Yandex reverse search</strong> (images search yandex, поиск по картинке), 
            we specialize in <strong>face ID search free</strong> services with advanced <strong>AI face search</strong> algorithms. 
            Our platform combines the functionality of <strong>FaceSeek</strong>, <strong>StarByFace</strong>, and <strong>doppelganger finder</strong> tools 
            while adding unique features like <strong>Instagram profile photo download</strong> (insta pfp, ig pic profile, get instadp) 
            and <strong>Facebook image search</strong> capabilities.
          </p>
          <p>
            For adult content searches, our <strong>pornstar finder</strong> and <strong>AI porn finder</strong> technology enables 
            <strong>reverse image search porn</strong>, <strong>porn image search</strong>, and accurate <strong>pornstar search</strong> results. 
            Use our "name that pornstar" (namethatpornstar, name that porn) feature to identify performers instantly. 
            Additionally, our <strong>social searcher</strong> helps you perform <strong>Instagram account lookup</strong>, 
            <strong>Facebook profile search</strong>, <strong>OnlyFans search</strong>, and comprehensive profile verification across all platforms.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
