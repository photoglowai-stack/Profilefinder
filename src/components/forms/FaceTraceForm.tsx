import { useState } from "react";
import { motion } from "motion/react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import svgPaths from "../../imports/svg-osb8kvu2n8";
import { useService } from "../../lib/ServiceContext";
import { serviceContent } from "../../lib/content";

import { useNavigate } from "react-router-dom";

export function FaceTraceForm() {
  const { selectedService } = useService();
  const navigate = useNavigate();
  const content = serviceContent[selectedService].form;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (imageFile) {
      setIsSearching(true);
      setTimeout(() => {
        navigate("/payment");
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-[32px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] border border-gray-100 w-full max-w-2xl mx-auto min-h-[500px] p-6 md:p-10 backdrop-blur-sm">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-5 rounded-2xl shadow-lg">
          <ImageIcon className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl text-center text-[#020817] mb-3 font-['Inter_Tight:Bold',sans-serif]">
        {content.title}
      </h3>

      <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
        {content.subtitle}
      </p>

      {/* Upload Area */}
      <div className="mb-6">
        <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-3">
          {content.label || 'Upload a profile photo'}
        </label>

        {!imagePreview ? (
          <label
            htmlFor="photo-upload"
            className="group border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#ff4e71] hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all"
          >
            <div className="p-4 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-700 mb-2 font-medium">{content.uploadText || 'Click to upload a photo'}</p>
            <p className="text-xs text-gray-500">{content.uploadHint || 'JPG, PNG, WEBP (max. 10MB)'}</p>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-2xl border-2 border-gray-200"
            />
            <button
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
              className="absolute -top-2 -right-2 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] text-white p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Alert */}
      <motion.div
        className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-blue-800">
            <p className="font-semibold mb-1">{content.alert?.title || 'How does it work?'}</p>
            <p className="text-blue-700">{content.alert?.description || 'Our AI analyzes the photo and compares it to millions of images on the Internet.'}</p>
          </div>
        </div>
      </motion.div>

      {/* Features List */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 md:p-6 mb-6 border border-red-100">
        <h4 className="text-sm font-semibold text-[#ff4e71] mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff4e71] rounded-full"></span>
          Analysis results:
        </h4>
        <ul className="space-y-2.5">
          {(content.features || []).map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Search Button */}
      <motion.button
        onClick={handleSearch}
        disabled={!imageFile || isSearching}
        className={`relative w-full md:w-fit md:min-w-[240px] box-border flex items-center justify-center px-12 py-4 rounded-full transition-all shadow-lg ${imageFile && !isSearching
            ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-xl cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
          }`}
        whileHover={imageFile && !isSearching ? { scale: 1.02, y: -2 } : {}}
        whileTap={imageFile && !isSearching ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center gap-3">
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ImageIcon className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-white text-lg md:text-xl font-semibold">{content.searching}</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-white" />
              <span className="text-white text-lg md:text-xl font-semibold">{content.search}</span>
              <motion.div
                className="absolute right-4"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 40 40">
                  <path d={svgPaths.p6a7c500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M3.33333 20H36.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </motion.button>

      {/* Bottom Badge */}
      <div className="mt-5 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white text-xs shadow-lg">
        {content.badges && content.badges.map((badge, index) => (
          <span key={index} className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}