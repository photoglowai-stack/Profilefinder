import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileRead = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }

    clearFileInput();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileRead(file);
      clearFileInput();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setImageFile(null);
    setImagePreview(null);
    clearFileInput();
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
    <div className="bg-white relative rounded-3xl shadow-lg border border-gray-100 w-full max-w-md mx-auto p-6 md:p-8">
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-4 rounded-xl shadow-md">
          <ImageIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl text-center text-gray-900 mb-2 font-bold">
        {content.title}
      </h3>

      <p className="text-center text-gray-500 mb-6 text-sm">
        {content.subtitle}
      </p>

      {/* Upload Area - Compact */}
      <div className="mb-5">
        <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-2">
          {content.label || 'Upload a profile photo'}
        </label>

        <input
          ref={fileInputRef}
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!imagePreview ? (
          <label
            htmlFor="photo-upload"
            onClick={handleBrowseClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging
                ? "border-[#ff4e71] bg-gradient-to-br from-red-50 to-orange-50"
                : "border-gray-300 hover:border-[#ff4e71] hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50"
              }`}
            role="button"
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleBrowseClick();
              }
            }}
          >
            <div className="p-3 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700 mb-1 font-medium text-sm">{content.uploadText || 'Drag & drop a photo or click browse'}</p>
            <p className="text-xs text-gray-500">{content.uploadHint || 'JPG, PNG, WEBP (max. 10MB)'}</p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm hover:border-[#ff4e71] hover:text-[#ff4e71]"
            >
              Browse files
            </button>
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
              className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
            />
            <button
              onClick={handleRemoveFile}
              className="absolute -top-2 -right-2 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Uploaded Files Overview */}
      <div className="mb-5">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-800">Uploaded files</p>
              <p className="text-xs text-gray-500">Keep track of what will be analyzed.</p>
            </div>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="text-xs font-semibold text-white bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] px-3 py-1.5 rounded-full hover:shadow-md transition-shadow"
            >
              Add / Replace
            </button>
          </div>

          <div className="mt-3">
            {imageFile ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{imageFile.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(imageFile.size)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="text-xs font-semibold text-[#ff4e71] hover:text-[#ff7f66]"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500">No file uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Alert - Compact */}
      <motion.div
        className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-800">
            <p className="font-semibold mb-0.5">{content.alert?.title || 'How does it work?'}</p>
            <p className="text-blue-700">{content.alert?.description || 'Our AI analyzes the photo and compares it to millions of images on the Internet.'}</p>
          </div>
        </div>
      </motion.div>

      {/* Features List - Compact */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-5 border border-red-100">
        <h4 className="text-xs font-semibold text-[#ff4e71] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff4e71] rounded-full"></span>
          Analysis results:
        </h4>
        <ul className="space-y-2">
          {(content.features || []).map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2 text-xs text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Search Button - FIXED: Compact size */}
      <motion.button
        onClick={handleSearch}
        disabled={!imageFile || isSearching}
        className={`w-full relative flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all ${imageFile && !isSearching
            ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-lg cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
          }`}
        whileHover={imageFile && !isSearching ? { scale: 1.02 } : {}}
        whileTap={imageFile && !isSearching ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center gap-2">
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ImageIcon className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white text-base font-semibold">{content.searching}</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 text-white" />
              <span className="text-white text-base font-semibold">{content.search}</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Bottom Badge - Compact */}
      <div className="mt-4 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full py-2 px-3 flex flex-wrap items-center justify-center gap-2 text-white text-[10px] shadow-md">
        {content.badges && content.badges.map((badge, index) => (
          <span key={index} className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}