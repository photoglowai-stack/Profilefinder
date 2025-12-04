import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useService } from "../lib/ServiceContext";

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: "Choisir le service" },
  { number: 2, label: "Remplir le formulaire" },
  { number: 3, label: "Lancer la recherche" }
];

export function ProgressSteps({ currentStep = 1 }: { currentStep?: number }) {
  const { colors } = useService();

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 md:py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step Circle */}
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div
                    className={`relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all ${
                      isCompleted || isCurrent
                        ? "border-transparent shadow-lg"
                        : "border-gray-300 bg-white"
                    }`}
                    style={
                      isCompleted || isCurrent
                        ? {
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          }
                        : {}
                    }
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <span
                        className={`text-xs md:text-sm ${
                          isCurrent ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}
                  </motion.div>

                  {/* Step Label */}
                  <span
                    className={`hidden sm:inline text-xs md:text-sm whitespace-nowrap transition-colors ${
                      isCurrent
                        ? "font-semibold"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                    style={
                      isCurrent
                        ? {
                            color: colors.primary,
                          }
                        : {}
                    }
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-8 md:w-16 lg:w-24 h-0.5 mx-2 md:mx-3 bg-gray-200 relative overflow-hidden">
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
