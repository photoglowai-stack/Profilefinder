import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";

export function FAQ() {
  const { selectedService } = useService();
  const content = serviceContent[selectedService].faq;
  const faqs = content.items;
  return (
    <section id="faq" className="max-w-[1760px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <SectionHeader
        label="FAQ"
        title={content.title}
      />

      <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
        {faqs.map((faq, index) => (
          <motion.details
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all group border border-gray-100"
          >
            <summary className="cursor-pointer text-base md:text-lg text-[#020817] list-none flex items-start justify-between group-hover:text-[#ff4e71] transition-colors">
              <span className="pr-4 flex-1">{faq.question}</span>
              <span className="text-2xl md:text-3xl text-[#ff4e71] group-open:rotate-45 transition-transform flex-shrink-0 leading-none">
                +
              </span>
            </summary>
            <motion.p 
              className="mt-4 md:mt-6 text-gray-600 leading-relaxed pl-2 md:pl-4 border-l-4 border-[#ff4e71] text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {faq.answer}
            </motion.p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}