import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Heart, Instagram, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProfileCardProps {
  name: string;
  age: number;
  distance: string;
  bio: string;
  job?: string;
  school?: string;
  interests: string[];
  instagram?: string;
  imageUrl: string;
  verified?: boolean;
  matchPercentage?: number;
}

function ProfileCard({ 
  name, 
  age, 
  distance, 
  bio, 
  job, 
  school, 
  interests, 
  instagram,
  imageUrl,
  verified = false,
  matchPercentage
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-[400px] md:h-[450px]">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
        {/* Match percentage badge - Enhanced */}
        {matchPercentage && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-5 right-5"
          >
            <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white px-5 py-2.5 rounded-full shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                <span className="font-bold">{matchPercentage}% Match</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Name, Age, Distance - Enhanced positioning */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-white font-bold drop-shadow-2xl" style={{ fontSize: '32px' }}>{name}</h3>
              <span className="text-white drop-shadow-2xl" style={{ fontSize: '32px', fontWeight: '300' }}>{age}</span>
              {verified && (
                <div className="bg-blue-500 rounded-full p-0.5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white fill-blue-500" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-white/95 drop-shadow-xl">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Section - Enhanced spacing */}
      <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/30">
        {/* Job, Education, Instagram - Improved styling */}
        <div className="space-y-3">
          {job && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3 text-gray-700"
            >
              <Briefcase className="w-[18px] h-[18px] flex-shrink-0 mt-0.5 text-gray-500" />
              <span className="text-[15px] leading-relaxed">{job}</span>
            </motion.div>
          )}
          {school && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-start gap-3 text-gray-700"
            >
              <GraduationCap className="w-[18px] h-[18px] flex-shrink-0 mt-0.5 text-gray-500" />
              <span className="text-[15px] leading-relaxed">{school}</span>
            </motion.div>
          )}
          {instagram && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3 text-gray-700"
            >
              <Instagram className="w-[18px] h-[18px] flex-shrink-0 mt-0.5 text-gray-500" />
              <span className="text-[15px] leading-relaxed">@{instagram}</span>
            </motion.div>
          )}
        </div>

        {/* Interests - Completely redesigned */}
        {interests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
              Centres d'intérêt
            </h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-pink-50 to-red-50 text-[#ff4e71] px-4 py-2 rounded-full font-medium border border-pink-100/50 hover:border-pink-200 transition-all shadow-sm"
                  style={{ fontSize: '13px' }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Verified Badge - Enhanced design */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="pt-4 border-t border-gray-100"
        >
          <div className="flex items-center gap-2.5 text-green-600">
            <div className="bg-green-500 rounded-full p-0.5 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white fill-green-500" strokeWidth={3} />
            </div>
            <span className="font-medium" style={{ fontSize: '14px' }}>Profil vérifié et actif</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function TinderProfileResults() {
  const profiles: ProfileCardProps[] = [
    {
      name: "Sophie",
      age: 26,
      distance: "À 3 km",
      bio: "Passionnée de voyages 🌍 et de photographie 📸. Adore les soirées entre amis et découvrir de nouveaux restaurants. À la recherche de quelqu'un pour partager de belles aventures !",
      job: "Designer Graphique chez Figma",
      school: "École des Beaux-Arts de Paris",
      interests: ["Voyages", "Photographie", "Yoga", "Cuisine", "Art"],
      instagram: "sophie.designs",
      imageUrl: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Mzk2NDE5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      matchPercentage: 87
    },
    {
      name: "Thomas",
      age: 29,
      distance: "À 5 km",
      bio: "Entrepreneur dans la tech 💻. Fan de sport et de musique live 🎸. Toujours partant pour un bon café ou une randonnée le week-end.",
      job: "CEO chez StartupLab",
      school: "HEC Paris",
      interests: ["Technologie", "Sport", "Musique", "Entrepreneuriat", "Randonnée"],
      instagram: "thomas.ventures",
      imageUrl: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQwMzk4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      matchPercentage: 92
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-5">
        {/* Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white p-5 rounded-[24px] shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl mb-1">2 Profils trouvés</h3>
              <p className="text-white/95" style={{ fontSize: '14px' }}>Résultats en 28 secondes</p>
            </div>
            <div className="bg-white/20 rounded-full p-2.5 backdrop-blur-sm">
              <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Profile Cards - Enhanced stacking effect */}
        <div className="relative">
          {/* Background cards effect - improved */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-3 left-3 right-3 h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-[28px] shadow-lg opacity-40 -z-10" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="absolute top-6 left-6 right-6 h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-[28px] shadow-md opacity-25 -z-20" 
          />
          
          {/* Main card preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProfileCard {...profiles[0]} />
          </motion.div>
        </div>

        {/* Info badge - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/60 rounded-2xl p-4 shadow-sm"
        >
          <p className="text-[#ff4e71] text-center font-medium" style={{ fontSize: '13px' }}>
            ✨ Toutes les informations sont à jour et vérifiées
          </p>
        </motion.div>
      </div>
    </div>
  );
}