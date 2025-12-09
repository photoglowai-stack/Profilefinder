import { motion } from "framer-motion";
import { useService } from "../lib/ServiceContext";
import { serviceContent } from "../lib/content";
import { BookOpen, Target, Search, Shield, TrendingUp } from "lucide-react";

const sectionIcons = [Search, Target, BookOpen, Shield, TrendingUp];

export function SEOContent() {
  const { selectedService, colors } = useService();
  const content = serviceContent[selectedService].seoContent;

  return (
    <section className="max-w-[1760px] mx-auto px-4 md:px-8 py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r px-5 py-2 rounded-full text-white mb-6 shadow-lg" style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}>
          <Search className="w-4 h-4" />
          <span className="text-sm">Découvrez tout ce que vous obtiendrez</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#020817] mb-4 max-w-4xl mx-auto leading-tight">
          Des insights complets et détaillés pour prendre les bonnes décisions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg">
          Plus de 50 points de données analysés en temps réel pour vous donner une vision complète
        </p>
      </motion.div>

      {/* Main Feature Cards */}
      <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto mb-12 md:mb-16">
        
        {/* Card 1: Complete Profile Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg" style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl text-[#020817]">
                    Analyse complète du profil
                  </h3>
                  <p className="text-sm text-gray-500">En temps réel</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Accédez à toutes les informations du profil avec une précision chirurgicale. Photos HD, bio complète, centres d'intérêt, et bien plus encore.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Toutes les photos du profil</p>
                    <p className="text-xs text-gray-600">Téléchargez toutes les photos en qualité HD, même celles cachées</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Bio et informations détaillées</p>
                    <p className="text-xs text-gray-600">Nom, âge, localisation, centres d'intérêt, emploi, éducation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Liens vers réseaux sociaux</p>
                    <p className="text-xs text-gray-600">Instagram, Snapchat, TikTok et autres comptes connectés</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full border-2" style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: `${colors.primary}10`
                }}>
                  Photos HD
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full border-2" style={{ 
                  borderColor: colors.secondary,
                  color: colors.secondary,
                  background: `${colors.secondary}10`
                }}>
                  Bio complète
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full border-2 border-green-500 text-green-700 bg-green-50">
                  Vérification
                </span>
              </div>
            </div>

            {/* Right: Visual Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full blur-2xl" style={{ background: colors.primary }}></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-2xl" style={{ background: colors.secondary }}></div>
              </div>

              {/* Mock Profile Card */}
              <div className="relative w-full max-w-sm">
                <motion.div 
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Profile Header */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Active now
                    </div>
                    
                    {/* Photo indicators */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-3">
                      <div className="h-1 flex-1 max-w-[60px] rounded-full" style={{ background: colors.primary }}></div>
                      <div className="h-1 flex-1 max-w-[60px] bg-white/50 rounded-full"></div>
                      <div className="h-1 flex-1 max-w-[60px] bg-white/50 rounded-full"></div>
                      <div className="h-1 flex-1 max-w-[60px] bg-white/50 rounded-full"></div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2"></div>
                        <div className="h-4 w-24 bg-gray-100 rounded"></div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg" style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      }}>
                        <span className="text-white text-lg">✓</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="h-3 w-full bg-gray-100 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
                      <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        📍 2 km
                      </div>
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        🎓 Student
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-3 border-2 border-blue-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-xs text-blue-600 font-semibold">5 Photos</p>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-3 border-2 border-purple-100"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <p className="text-xs text-purple-600 font-semibold">IG Linked</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Activity Timeline & Location */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Right: Visual First */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden order-2 md:order-1">
              {/* Activity Heatmap */}
              <div className="w-full max-w-md space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Activité des 7 derniers jours</h4>
                    <div className="text-xs text-gray-500">Live</div>
                  </div>
                  
                  {/* Activity bars */}
                  <div className="space-y-3">
                    {[
                      { day: 'Lun', activity: 85 },
                      { day: 'Mar', activity: 60 },
                      { day: 'Mer', activity: 95 },
                      { day: 'Jeu', activity: 40 },
                      { day: 'Ven', activity: 100 },
                      { day: 'Sam', activity: 75 },
                      { day: 'Dim', activity: 30 }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="text-xs text-gray-600 w-8">{item.day}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full flex items-center justify-end pr-2"
                            style={{ 
                              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                              width: `${item.activity}%`
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.activity}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + 0.2, duration: 0.6 }}
                          >
                            <span className="text-[10px] text-white font-semibold">{item.activity}%</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-blue-100 to-purple-100">
                    {/* Simplified map pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-8 w-16 h-16 border-2 border-blue-400 rounded-lg"></div>
                      <div className="absolute bottom-4 right-8 w-12 h-12 border-2 border-purple-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative pt-16">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      }}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Paris, France</p>
                        <p className="text-xs text-gray-500">Dernière connexion: il y a 2h</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl border border-orange-100">
                        <p className="text-2xl mb-1">🔥</p>
                        <p className="text-xs text-gray-600">12 connexions<br/>aujourd'hui</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
                        <p className="text-2xl mb-1">📍</p>
                        <p className="text-xs text-gray-600">3 lieux<br/>visités</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: Content */}
            <div className="p-8 md:p-12 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg" style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl text-[#020817]">
                    Timeline d'activité complète
                  </h3>
                  <p className="text-sm text-gray-500">Analyse comportementale</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Suivez chaque mouvement avec une précision inégalée. Découvrez les patterns d'activité, les horaires de connexion préférés et les changements de localisation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Horodatage précis</p>
                    <p className="text-xs text-gray-600">Dernière connexion, temps passé en ligne, fréquence d'utilisation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Géolocalisation avancée</p>
                    <p className="text-xs text-gray-600">Historique des positions, rayon de recherche, zones fréquentées</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Patterns comportementaux</p>
                    <p className="text-xs text-gray-600">Analyse IA des habitudes, pics d'activité, changements suspects</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">Mises à jour en temps réel</p>
                    <p className="text-xs text-amber-700">Recevez des notifications instantanées à chaque nouvelle activité détectée</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Alerts & Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg" style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl text-[#020817]">
                    Surveillance intelligente 24/7
                  </h3>
                  <p className="text-sm text-gray-500">Alertes automatiques</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Notre IA surveille en continu et vous alerte instantanément de tout changement suspect. Photos, bio, activité, localisation - rien ne nous échappe.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Détection de changements</p>
                    <p className="text-xs text-gray-600">Nouvelles photos, modifications de bio, changements de localisation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Notifications push instantanées</p>
                    <p className="text-xs text-gray-600">Email, SMS, et notifications app en temps réel</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Historique complet</p>
                    <p className="text-xs text-gray-600">Accès à tout l'historique des modifications et activités passées</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-2xl mb-1" style={{ color: colors.primary }}>24/7</p>
                  <p className="text-[10px] text-gray-600">Surveillance</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-2xl mb-1" style={{ color: colors.primary }}>∞</p>
                  <p className="text-[10px] text-gray-600">Alertes illimitées</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-2xl mb-1" style={{ color: colors.primary }}>100%</p>
                  <p className="text-[10px] text-gray-600">Fiabilité</p>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              {/* Notification Feed */}
              <div className="w-full max-w-md space-y-4">
                <div className="text-white mb-6">
                  <h4 className="text-lg font-semibold mb-1">Centre de notifications</h4>
                  <p className="text-sm text-gray-400">Flux d'activité en direct</p>
                </div>

                {/* Notification Items */}
                <motion.div
                  className="bg-gradient-to-r p-4 rounded-2xl shadow-xl border-2 border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}dd, ${colors.secondary}dd)`
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">⚠️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm mb-1">Nouvelle photo détectée!</p>
                      <p className="text-white/80 text-xs mb-2">Le profil a ajouté 2 nouvelles photos</p>
                      <p className="text-white/60 text-[10px]">Il y a 5 minutes</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm mb-1">Bio modifiée</p>
                      <p className="text-white/70 text-xs mb-2">Changement dans la description du profil</p>
                      <p className="text-white/50 text-[10px]">Il y a 2 heures</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">🌍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm mb-1">Changement de localisation</p>
                      <p className="text-white/70 text-xs mb-2">Déplacement de 15 km détecté</p>
                      <p className="text-white/50 text-[10px]">Il y a 5 heures</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20 opacity-60"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">🔥</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm mb-1">Activité intense</p>
                      <p className="text-white/70 text-xs mb-2">25 connexions aujourd'hui</p>
                      <p className="text-white/50 text-[10px]">Il y a 1 jour</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-r rounded-3xl p-8 md:p-12 text-white shadow-2xl" style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}>
          <div className="text-center mb-8">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl md:text-3xl mb-2">Plus de 50 points de données analysés</h3>
            <p className="text-white/90">L'analyse la plus complète du marché</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">📸</div>
              <p className="text-sm opacity-90">Photos HD illimitées</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">📍</div>
              <p className="text-sm opacity-90">Géolocalisation précise</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">🔔</div>
              <p className="text-sm opacity-90">Alertes temps réel</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">📊</div>
              <p className="text-sm opacity-90">Analyses comportementales</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}