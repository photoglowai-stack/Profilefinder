import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function TinderResultsPreview() {
  const profiles = [
    {
      name: "Sophie",
      age: 26,
      distance: "3 km",
      match: 87,
      imageUrl: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Mzk2NDE5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true
    },
    {
      name: "Emma",
      age: 24,
      distance: "5 km",
      match: 92,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDAzOTg3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full p-2">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-gray-900">2 Profils trouvés</p>
              <p className="text-xs text-gray-500">Recherche terminée en 28s</p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-[#ff4e71]" />
        </div>
      </motion.div>

      {/* Profile Cards Stack */}
      <div className="relative space-y-3">
        {profiles.map((profile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="flex gap-4 p-4">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Match Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white rounded-full px-2 py-1 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-white" />
                    <span className="text-xs font-bold">{profile.match}%</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{profile.name}</h3>
                  <span className="text-gray-600">{profile.age}</span>
                  {profile.verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-sm">À {profile.distance}</span>
                </div>

                {/* Quick Info Tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-gradient-to-r from-pink-50 to-red-50 text-[#ff4e71] px-2.5 py-1 rounded-full text-xs font-medium border border-pink-100">
                    Actif maintenant
                  </span>
                  <span className="bg-gradient-to-r from-pink-50 to-red-50 text-[#ff4e71] px-2.5 py-1 rounded-full text-xs font-medium border border-pink-100">
                    Vérifié
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/60 rounded-xl px-4 py-2.5">
          <Sparkles className="w-4 h-4 text-[#ff4e71]" />
          <span className="text-xs text-[#ff4e71] font-medium">
            Informations vérifiées par IA
          </span>
        </div>
      </motion.div>
    </div>
  );
}
