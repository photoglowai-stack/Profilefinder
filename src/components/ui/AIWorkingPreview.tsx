import { motion } from "motion/react";
import { Brain, Zap, Search, CheckCircle2 } from "lucide-react";

export function AIWorkingPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden p-6"
      >
        {/* AI Brain Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            {/* Pulse effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-2xl"
            />
          </motion.div>
        </div>

        {/* Scanning Apps */}
        <div className="space-y-3 mb-4">
          {[
            { name: "Tinder", delay: 0.2 },
            { name: "Bumble", delay: 0.4 },
            { name: "Happn", delay: 0.6 }
          ].map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: app.delay }}
              className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#ff4e71]" />
                <span className="text-sm font-medium text-gray-900">{app.name}</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: app.delay + 0.8 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden mb-3">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-full bg-gradient-to-r from-[#ff4e71] to-[#ff7f66]"
          />
        </div>

        {/* Status Text */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-[#ff4e71]" />
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-medium"
          >
            Analyse en cours...
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
