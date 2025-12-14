import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import imgRectangle2 from "../assets/38184caaa6ab566a83195983852fd8b71d52beaf.png";
import imgRectangle3 from "../assets/aadff942611a595d4d80d86e8dc34b1cd143c92f.png";
import imgRectangle6 from "../assets/94adf2b3fb40514489d6f4135e59a7e8ce5a957e.png";
import { SectionHeader } from "./ui/SectionHeader";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";

const testimonialImages = [imgRectangle2, imgRectangle3, imgRectangle6];

export function Testimonials() {
  const { selectedService, colors } = useService();
  const content = serviceContent[selectedService].testimonials;

  const testimonials = content.items.map((item, index) => ({
    img: testimonialImages[index],
    name: item.name,
    age: item.role,
    text: item.content,
    rating: item.rating
  }));
  return (
    <section id="testimonials" className="bg-gradient-to-b from-white via-pink-50/30 to-white py-12 md:py-16">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <SectionHeader
          label="Testimonials"
          title="Real Users, Real Results"
          description="Join thousands who discovered the truth they needed"
          highlightedWords={["Real Results"]}
        />

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-4"
                    style={{ '--tw-ring-color': `${colors.primary}20` } as React.CSSProperties}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#22c55e] rounded-full p-1">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-900 font-bold">{testimonial.name}</p>
                  <p className="text-slate-500 text-sm font-medium">{testimonial.age}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                "{testimonial.text}"
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}