"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MessageSquare, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { serviceContent } from "../../lib/content";
import { getServiceColors } from "../../lib/serviceColors";

export function FidelityForm() {
  const router = useRouter();
  const content = serviceContent.fidelity.form;
  const colors = getServiceColors("fidelity");
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
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pf_fidelity_uploads', JSON.stringify(previews));
      }
      setTimeout(() => {
        router.push("/fidelity-test/analysis");
        setIsSearching(false);
      }, 800);
    }
  };

  const features = content.features || [
    'Deleted or modified messages',
    'Suspicious language or secret codes',
    'Schedule inconsistencies',
    'Recurring suspicious contacts',
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Area */}
      {previews.length === 0 ? (
        <label
          htmlFor="screenshots-upload"
          className="group border-2 border-dashed border-slate-300 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50/50 transition-all"
          style={{ borderColor: `${colors.primary}66` }}
        >
          <div className={`p-2.5 bg-gradient-to-br ${colors.gradient} rounded-xl mb-2 group-hover:scale-110 transition-transform`}>
            <Upload className="w-5 h-5 text-white" />
          </div>
          <p className="text-slate-700 font-semibold text-sm">{content.uploadText || 'Click to upload screenshots'}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{content.uploadHint || 'JPG, PNG (multiple files accepted)'}</p>
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
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {previews.map((preview, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <img
                  src={preview}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-16 object-cover rounded-lg border border-slate-200"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 bg-rose-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
          <label
            htmlFor="screenshots-upload"
            className="block text-center text-[11px] cursor-pointer font-semibold"
            style={{ color: colors.primary }}
          >
            + Add more
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

      {/* Privacy note - compact inline */}
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-700">Screenshots are analyzed locally and never stored.</p>
      </div>

      {/* Features - ultra compact horizontal pills */}
      <div className="flex flex-wrap gap-1.5">
        {features.slice(0, 4).map((item, index) => (
            <span key={index} className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: colors.primary }} />
            {item}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={handleSearch}
        disabled={screenshots.length === 0 || isSearching}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white transition-all ${screenshots.length > 0 && !isSearching
            ? `${colors.button} shadow-[0_8px_24px_rgba(236,72,153,0.3)] hover:shadow-lg cursor-pointer`
            : "bg-slate-300 cursor-not-allowed"
          }`}
        whileHover={screenshots.length > 0 && !isSearching ? { scale: 1.02 } : {}}
        whileTap={screenshots.length > 0 && !isSearching ? { scale: 0.98 } : {}}
      >
        {isSearching ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <MessageSquare className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">{content.searching || 'Analyzing...'}</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm tracking-wide">{content.search || 'Analyze conversations'}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
