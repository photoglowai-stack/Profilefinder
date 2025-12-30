import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, MessageSquare, AlertTriangle } from "lucide-react";
import { serviceContent } from "../../lib/content";
import { useNavigate } from "react-router-dom";

export function FidelityForm() {
  const navigate = useNavigate();
  // Force the type since this form is only rendered for 'fidelity' service
  const content = serviceContent.fidelity.form;
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFiles = (files: File[]) => {
    if (files.length === 0) return;

    setScreenshots(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearch = () => {
    if (screenshots.length > 0) {
      setIsSearching(true);
      // Store uploaded images in sessionStorage for the analysis page
      sessionStorage.setItem('pf_fidelity_uploads', JSON.stringify(previews));
      setTimeout(() => {
        navigate("/fidelity-test/analysis");
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-lg border border-gray-100 w-full max-w-md mx-auto p-6 md:p-8">
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] p-4 rounded-xl shadow-md">
          <MessageSquare className="w-8 h-8 text-white" strokeWidth={2.5} />
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
        <label htmlFor="screenshots-upload" className="block text-sm font-medium text-gray-700 mb-2">
          {content.label || 'Upload conversation screenshots'}
        </label>

        <input
          ref={fileInputRef}
          id="screenshots-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {previews.length === 0 ? (
          <label
            htmlFor="screenshots-upload"
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
            <p className="text-gray-700 mb-1 font-medium text-sm">{content.uploadText || 'Drag & drop screenshots or click browse'}</p>
            <p className="text-xs text-gray-500">{content.uploadHint || 'JPG, PNG (multiple files accepted)'}</p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm hover:border-[#ff4e71] hover:text-[#ff4e71]"
            >
              Browse files
            </button>
          </label>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3">
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
                    className="w-full h-20 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-[#ff4e71] to-[#ff7f66] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
            <label
              htmlFor="screenshots-upload"
              className="block text-center text-xs text-[#ff4e71] hover:text-[#ff7f66] cursor-pointer font-medium underline py-1"
            >
              + Add more screenshots
            </label>
          </div>
        )}
      </div>

      {/* Uploaded Files Overview */}
      <div className="mb-5">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-800">Uploaded files</p>
              <p className="text-xs text-gray-500">Review the captures before launching the analysis.</p>
            </div>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="text-xs font-semibold text-white bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] px-3 py-1.5 rounded-full hover:shadow-md transition-shadow"
            >
              Add screenshots
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {screenshots.length > 0 ? (
              screenshots.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                >
                  <div className="truncate max-w-[180px]">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No files uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Warning Alert - Compact */}
      <motion.div
        className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <p className="font-semibold mb-0.5">{content.alert?.title || 'Privacy'}</p>
            <p className="text-amber-700">{content.alert?.description || 'Screenshots are analyzed locally and never stored.'}</p>
          </div>
        </div>
      </motion.div>

      {/* Features List - Compact */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-5 border border-red-100">
        <h4 className="text-xs font-semibold text-[#ff4e71] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff4e71] rounded-full"></span>
          Our AI will detect:
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
        disabled={screenshots.length === 0 || isSearching}
        className={`w-full relative flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all ${screenshots.length > 0 && !isSearching
          ? "bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] hover:shadow-lg cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
          }`}
        whileHover={screenshots.length > 0 && !isSearching ? { scale: 1.02 } : {}}
        whileTap={screenshots.length > 0 && !isSearching ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center gap-2">
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white text-base font-semibold">{content.searching}</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5 text-white" />
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