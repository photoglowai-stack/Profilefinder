import { motion } from "framer-motion";
import { CheckCircle2, Eye, Sparkles } from "lucide-react";
import { useService } from "../lib/ServiceContext";

// --- ICÔNES SVG INTÉGRÉES ---
const IconZap = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const IconClock = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const IconBell = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
const IconFingerprint = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"></path><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path><path d="M8.65 22c.21-.66.45-1.32.57-2"></path><path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path><path d="M2 16h.01"></path><path d="M21.8 16c.2-2 .131-5.354 0-6"></path><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"></path>
  </svg>
);
const IconMessageCircle = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
const IconAlertTriangle = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
const IconMapPin = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const IconSearch = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Couleurs
const colors = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  indigo600: '#4f46e5',
  indigo500: '#6366f1',
  indigo400: '#818cf8',
  indigo300: '#a5b4fc',
  indigo100: '#e0e7ff',
  indigo50: '#eef2ff',
  purple500: '#a855f7',
  rose500: '#f43f5e',
  rose400: '#fb7185',
  rose100: '#ffe4e6',
  rose50: '#fff1f2',
  emerald900: '#064e3b',
  emerald800: '#065f46',
  emerald600: '#059669',
  emerald400: '#34d399',
  blue600: '#2563eb',
  blue500: '#3b82f6',
  blue100: '#dbeafe',
  blue50: '#eff6ff',
  orange500: '#f97316',
  yellow500: '#eab308',
  green500: '#22c55e',
  white: '#ffffff',
};

export function HowItWorks() {
  const { colors: serviceColors } = useService();

  const barHeights = [35, 60, 45, 90, 65, 85, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const notifications = [
    { text: 'Bio Updated', color: colors.blue500 },
    { text: 'New Photo', color: colors.rose500 },
    { text: 'Location Change', color: colors.orange500 },
  ];

  // Steps pour la colonne de droite
  const steps = [
    {
      number: 1,
      title: "Fill in their details",
      description: "Enter the first name, approximate age and city. This gives our AI a precise starting point to search Tinder profiles.",
      features: [
        "First name, age, and approximate location",
        "100% anonymous - no account required"
      ]
    },
    {
      number: 2,
      title: "Launch the Tinder lookup",
      description: "Click Search to start the Tinder profile lookup. Our AI scans for matching profiles and checks recent activity.",
      features: [
        "AI scans 50+ dating apps simultaneously",
        "Real-time database updates"
      ]
    },
    {
      number: 3,
      title: "Activate Radar if needed",
      description: "Turn on the Radar for ongoing monitoring. Get alerts as soon as a matching profile becomes visible.",
      features: [
        "Full profile with photos and bio",
        "Set up alerts for profile changes"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="max-w-[1760px] mx-auto px-4 md:px-8 py-12 md:py-16 bg-gradient-to-b from-white via-gray-50/50 to-white">

      {/* SEO HEADER */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: 'linear-gradient(to right, #ff4e71, #ff7f66)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255,78,113,0.3)'
          }}>
          <IconSearch style={{ width: '0.875rem', height: '0.875rem' }} />
          <span className="text-xs font-semibold">How our Tinder profile finder works</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">
          Find someone on Tinder{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500">
            in 3 simple steps
          </span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          ProfileFinder turns hours of manual swiping into one fast Tinder profile search.
          Get a clear answer about hidden dating profiles in under 2 minutes.
        </p>
      </div>

      {/* Stats Banner */}
      <motion.div
        className="max-w-4xl mx-auto mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-3 md:gap-6 bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2" style={{ borderColor: `${serviceColors.primary}15` }}>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>3</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Simple Steps</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>30s</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Average Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: serviceColors.primary }}>95%</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Success Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content: TINDER CARD LEFT + STEPS RIGHT */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT: TINDER PROFILE CARD (STICKY) */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white dark:bg-[#1e293b] rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-sm mx-auto transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700 border border-white/10">

              {/* Badge LIVE */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border z-10" style={{
                backgroundColor: `${serviceColors.primary}15`,
                color: serviceColors.primary,
                borderColor: `${serviceColors.primary}30`
              }}>
                <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: serviceColors.primary }}></div>
                LIVE
              </div>

              {/* Header: Name, Age, Location */}
              <div className="text-center mb-6 mt-2">
                <h2 className="text-gray-900 dark:text-white text-2xl font-bold flex items-center justify-center gap-2">
                  Victor, 26
                  <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest mt-1">
                  New York • Detected 2m ago
                </p>
              </div>

              {/* Photo with Scan Effect */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 group shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                  alt="Victor"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                {/* Progress Bars & Match Score */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-1 mb-2">
                    <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-white rounded-full"></div>
                    </div>
                    <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
                    <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white text-sm font-medium">Match probability</span>
                    <span className="text-green-400 text-xl font-bold">98%</span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="space-y-3 bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" style={{ color: serviceColors.primary }} /> Last activity
                  </span>
                  <span className="text-green-500 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: serviceColors.primary }} /> Verified account
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              {/* CTA Button */}
              <button className="mt-4 w-full py-3 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 group" style={{
                background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`,
                boxShadow: `0 10px 30px ${serviceColors.primary}30`
              }}>
                <Sparkles className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                View full report
              </button>
            </div>
          </motion.div>

          {/* RIGHT: STEPS */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 group"
                style={{ borderColor: `${serviceColors.primary}15` }}
              >
                {/* Step Number Badge */}
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300" style={{
                      background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`
                    }}>
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 font-medium">
                      {step.description}
                    </p>

                    {/* Features List */}
                    {step.features && step.features.length > 0 && (
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" style={{ color: serviceColors.primary }} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* OUR TOOLS SECTION - BENTO GRID */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', marginTop: '5rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h3 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
            Our Tools
          </h3>
          <p style={{ color: '#6b7280' }}>
            A complete toolkit to investigate relationship doubts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* DATING SEARCH - SPAN 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
              color: 'white',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid #334155',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'rgba(99,102,241,0.2)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(99,102,241,0.3)',
              }}>
                <IconClock style={{ width: '1.25rem', height: '1.25rem', color: colors.indigo400 }} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.indigo300, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dating Search</span>
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Find hidden Tinder profiles</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>Run a targeted Tinder profile search based on name, age and city.</p>

            {/* Mini Chart */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '0.5rem', height: '4rem' }}>
                {barHeights.map((h, i) => (
                  <div key={i} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', background: 'linear-gradient(to top, #6366f1, #a855f7)', borderRadius: '2px 2px 0 0', opacity: 0.8, height: `${h}%` }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                {days.map((day) => <span key={day}>{day}</span>)}
              </div>
            </div>
          </motion.div>

          {/* 24/7 RADAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '1.25rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              border: '1px solid #f1f5f9',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#fff1f2',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ffe4e6',
              }}>
                <IconBell style={{ width: '1.25rem', height: '1.25rem', color: colors.rose500 }} />
              </div>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: colors.rose500,
                color: 'white',
                fontSize: '9px',
                fontWeight: 700,
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
              }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '9999px' }}></span> LIVE
              </span>
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>24/7 Radar</h4>
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Instant alerts for profile changes.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {notifications.map((notif, i) => (
                <div key={i} style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: notif.color }}></div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#334155' }}>{notif.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FACE TRACE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '1.25rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              border: '1px solid #f1f5f9',
            }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#eff6ff',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
                border: '1px solid #dbeafe',
              }}
            >
              <IconFingerprint style={{ width: '1.25rem', height: '1.25rem', color: colors.blue600 }} />
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>Face Trace</h4>
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
              AI face search & reverse image lookup.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#334155' }}>Photo</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#334155' }}>Match</span>
              </div>
            </div>
          </motion.div>

          {/* FIDELITY TEST - SPAN 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              backgroundColor: '#064e3b',
              color: 'white',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              boxShadow: '0 25px 50px -12px rgba(6,78,59,0.25)',
              border: '1px solid #065f46',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: 'rgba(16,185,129,0.2)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(16,185,129,0.3)',
                  }}>
                    <IconMessageCircle style={{ width: '1.25rem', height: '1.25rem', color: colors.emerald400 }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.emerald400, textTransform: 'uppercase' }}>Fidelity Test</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>How to catch a cheater</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Evaluate behavior against classic cheating patterns.</p>
              </div>

              {/* Chat Visual */}
              <div style={{ flex: 1, minWidth: '150px', maxWidth: '200px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ backgroundColor: '#059669', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', borderTopRightRadius: '0.25rem' }}>Where were you?</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(6,95,70,0.8)', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', borderTopLeftRadius: '0.25rem' }}>Fell asleep early.</div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(239,68,68,0.9)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '9px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    zIndex: 10,
                  }}>
                    <IconAlertTriangle style={{ width: '0.625rem', height: '0.625rem' }} /> Gap: 4h
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FOLLOWING AI - SPAN 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2"
            style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              border: '1px solid #f1f5f9',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#eef2ff',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e0e7ff',
                }}>
                  <IconMapPin style={{ width: '1.25rem', height: '1.25rem', color: colors.indigo600 }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>Following AI</h4>
                  <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Analyse who they follow and like</p>
                </div>
              </div>
              <span style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, color: '#475569' }}>Cheater AI</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Reviews public follows and likes to reveal patterns before cheaters move to dating apps.</p>
          </motion.div>

        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-12 md:mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white shadow-xl font-semibold" style={{
          background: `linear-gradient(135deg, ${serviceColors.primary}, ${serviceColors.secondary})`
        }}>
          <Sparkles className="w-5 h-5" />
          <span className="text-sm md:text-base">Ready to discover the truth? Start your Tinder search now</span>
        </div>
      </motion.div>
    </section>
  );
}

export default HowItWorks;