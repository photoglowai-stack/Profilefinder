import { motion } from "motion/react";
import { Search, MapPin, User } from "lucide-react";

export function SearchFormPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] p-4 text-white">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <h3 className="font-bold">Rechercher un profil</h3>
          </div>
        </div>

        {/* Simple Form Fields Preview */}
        <div className="p-5 space-y-3">
          {/* Name Field */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-xl px-4 py-3">
            <User className="w-4 h-4 text-[#ff4e71]" />
            <span className="text-gray-900 text-sm font-medium">Sophie</span>
          </div>

          {/* Location Field */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-xl px-4 py-3">
            <MapPin className="w-4 h-4 text-[#ff4e71]" />
            <span className="text-gray-900 text-sm font-medium">Paris, France</span>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white py-3 rounded-xl font-bold shadow-lg mt-2"
          >
            Rechercher
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}