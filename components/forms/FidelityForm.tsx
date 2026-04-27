"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MessageSquare, X, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { serviceContent } from "../../lib/content";
import { TrustPanel } from "../ui/TrustPanel";

export function FidelityForm() {
  const router = useRouter();
  // Force the type since this form is only rendered for 'fidelity' service
  const content = serviceContent.fidelity.form;
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setScreenshots([...screenshots, ...files]);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    if (screenshots.length > 0) {
      setIsSearching(true);
      // Store uploaded images in sessionStorage for the analysis page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pf_fidelity_uploads', JSON.stringify(previews));
      }
      setTimeout(() => {
        router.push("/fidelity-test/form");
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-lg border border-gray-100 w-full max-w-md mx-auto p-4 md:p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-3 rounded-2xl shadow-md shrink-0">
          <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl md:text-2xl text-gray-900 font-black leading-tight">
            {content.title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-snug mt-1">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Upload Area - Compact */}
      <div className="mb-3">
        <label htmlFor="screenshots-upload" className="block text-sm font-semibold text-gray-700 mb-2">
          {content.label || 'Upload conversation screenshots'}
        </label>

        {previews.length === 0 ? (
          <label
            htmlFor="screenshots-upload"
            className="group border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#ff4e71] hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all"
          >
            <div className="p-3 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-xl group-hover:scale-105 transition-transform shrink-0">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-800 mb-1 font-bold text-sm">{content.uploadText || 'Click to upload screenshots'}</p>
              <p className="text-xs text-gray-500 leading-snug">{content.uploadHint || 'JPG, PNG (multiple files accepted)'}</p>
            </div>
            <input
              id="screenshots-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {previews.map((preview, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={preview}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-16 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] text-white p-1 rounded-full opacity-100 shadow-lg hover:scale-110"
                    aria-label={`Remove screenshot ${index + 1}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
            <label
              htmlFor="screenshots-upload"
              className="inline-flex text-xs text-[#ff4e71] hover:text-[#ff7f66] cursor-pointer font-bold py-1"
            >
              + Add more screenshots
            </label>
            <input
              id="screenshots-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Warning Alert - Compact */}
      <motion.div
        className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <p className="font-semibold mb-0.5">{content.alert?.title || 'Privacy'}</p>
            <p className="text-amber-700">{content.alert?.description || 'Screenshots are analyzed locally and never stored.'}</p>
          </div>
        </div>
      </motion.div>

      {/* Features List - Compact */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 mb-3 border border-red-100">
        <h4 className="text-xs font-bold text-[#ff4e71] mb-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-[#ff4e71] rounded-full"></span>
          Red flags checked:
        </h4>
        <div className="grid grid-cols-1 gap-1.5">
          {(content.features || []).slice(0, 3).map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-2 text-xs text-gray-700 bg-white/70 border border-white rounded-lg px-2.5 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </div>
      </div>

      {/* Search Button - FIXED: Compact size */}
      <motion.button
        onClick={(e) => {
          if (screenshots.length === 0) {
            e.preventDefault();
            document.getElementById('screenshots-upload')?.click();
          } else {
            handleSearch();
          }
        }}
        disabled={isSearching}
        className={`w-full relative flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 rounded-full transition-all shadow-lg overflow-visible ${
          !isSearching
            ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-xl cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        whileHover={!isSearching ? { scale: 1.02 } : {}}
        whileTap={!isSearching ? { scale: 0.98 } : {}}
      >
        <div className="relative flex items-center gap-2 sm:gap-3 w-full min-w-0">
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0" strokeWidth={2.4} />

          <span className="text-white text-[clamp(0.95rem,4vw,1.125rem)] font-black tracking-wide text-center flex-1 min-w-0 whitespace-nowrap pr-[58px]">
            {isSearching ? content.searching : screenshots.length === 0 ? 'UPLOAD CHATS' : 'ANALYZE CHATS'}
          </span>

          {isSearching ? (
            <motion.div
              className="w-10 h-10 border-2 border-white border-t-transparent rounded-full shrink-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <div className="absolute right-[-30px] sm:right-[-34px] top-1/2 -translate-y-1/2 flex items-center gap-2 shrink-0 pointer-events-none">
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/18 border border-white/22 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white cta-arrow-animate" />
              </span>
              <span
                className="finger-point-inline"
                style={{
                  fontSize: 'clamp(26px, 7vw, 34px)',
                  display: 'inline-block',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.24))',
                }}
              >
                👈
              </span>
            </div>
          )}
        </div>
      </motion.button>

      <TrustPanel service="fidelity" />
          </div>
  );
}
