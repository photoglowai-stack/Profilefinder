import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbnailGrid } from "./analysis/ThumbnailGrid";
import { ProgressSection } from "./analysis/ProgressSection";
import { ReportSection } from "./analysis/ReportSection";
import { SocialToast } from "./analysis/SocialToast";

// Log messages for the progress phase
const LOG_MESSAGES = [
    "Initializing OCR Engine...",
    "Scanning text patterns...",
    "Analyzing emotional tone...",
    "Detecting hidden semantics...",
    "Cross-referencing database...",
    "Checking image metadata...",
    "Verifying timestamps...",
    "Finalizing Risk Score...",
];

// Report text for the typewriter effect
const REPORT_TEXT =
    "🔍 AI ANALYSIS\nSTATUS: 🚩 SUSPICIOUS ACTIVITY DETECTED\n\n1. TIMESTAMPS: 11:42 PM activity suggests concealment (92% probability).\n\n2. LINGUISTICS: The phrase 'Don't worry about it' in this context is a classic deflection technique.\n\n3. VISUALS: The usage of eyes 👀 implies... [REDACTED]";

// Default placeholder images
const DEFAULT_PHOTOS = [
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&q=70",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=70",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=70",
];

interface ChatAnalysisCardProps {
    /** Optional list of uploaded screenshots (URLs or data URLs) */
    photos?: string[];
    /** URL of payment / checkout page */
    paymentUrl: string;
}

interface Toast {
    id: number;
    name: string;
    action: string;
    visible: boolean;
}

const ChatAnalysisCard: React.FC<ChatAnalysisCardProps> = ({
    photos = [],
    paymentUrl,
}) => {
    const navigate = useNavigate();

    // State
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("Initializing AI Model...");
    const [progressComplete, setProgressComplete] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [typedText, setTypedText] = useState("");
    const [showGate, setShowGate] = useState(false);
    const [textBlurred, setTextBlurred] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Refs
    const toastIdRef = useRef(0);

    // Determine which photos to display (use provided or fall back to defaults)
    const displayPhotos = [
        photos[0] || DEFAULT_PHOTOS[0],
        photos[1] || DEFAULT_PHOTOS[1],
        photos[2] || DEFAULT_PHOTOS[2],
    ];

    // Progress simulation
    useEffect(() => {
        let p = 0;
        let logIndex = 0;

        const interval = setInterval(() => {
            p += Math.random() * 5 + 2;
            if (p > 100) p = 100;

            setProgress(p);

            // Check if we should add a new log
            const threshold = (logIndex + 1) * (100 / LOG_MESSAGES.length) - 5;
            if (p >= threshold && logIndex < LOG_MESSAGES.length) {
                const logMsg = LOG_MESSAGES[logIndex];
                setLogs((prev) => [...prev, logMsg]);
                setProgressText(logMsg);
                logIndex++;
            }

            if (p >= 100) {
                clearInterval(interval);
                setProgressComplete(true);
                setProgressText("Analysis Complete");
            }
        }, 60);

        return () => clearInterval(interval);
    }, []);

    // Start typewriter after progress completes
    useEffect(() => {
        if (!progressComplete) return;

        const timer = setTimeout(() => {
            startTypewriter();
        }, 300);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressComplete]);

    // Typewriter effect
    const startTypewriter = () => {
        let charIndex = 0;
        const len = REPORT_TEXT.length;

        const typeNext = () => {
            if (charIndex < len) {
                const char = REPORT_TEXT.charAt(charIndex);
                setTypedText((prev) => prev + (char === "\n" ? "\r\n" : char));
                charIndex++;

                // Trigger gate at ~60% of text
                if (charIndex === Math.floor(len * 0.6)) {
                    triggerInlineGate();
                }

                setTimeout(typeNext, 15);
            } else {
                // Ensure gate is shown at the end
                triggerInlineGate();
            }
        };

        typeNext();
    };

    // Trigger the inline gate overlay
    const triggerInlineGate = () => {
        if (showGate) return;
        setTextBlurred(true);
        setShowGate(true);
    };

    // Social proof toasts
    useEffect(() => {
        const timer1 = setTimeout(() => {
            addToast("Emma W.", "unlocked 1 report");
        }, 800);

        const timer2 = setTimeout(() => {
            addToast("Lucas D.", "found 2 matches");
        }, 2500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToast = (name: string, action: string) => {
        const id = toastIdRef.current++;
        setToasts((prev) => [...prev, { id, name, action, visible: true }]);

        // Hide after 3.5 seconds
        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
            );
            // Remove from DOM after fade out
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 500);
        }, 3500);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            navigate(paymentUrl);
        }, 1000);
    };

    return (
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FFA502] min-h-screen flex items-center justify-center p-4">
            {/* Styles for animations */}
            <style>{`
        .typing-cursor::after {
          content: '|';
          animation: blink 0.5s step-start infinite;
          color: #3B82F6;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .text-blur {
          filter: blur(6px);
          user-select: none;
          transition: filter 0.8s ease;
        }

        .scan-line {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2));
          border-bottom: 2px solid rgba(59, 130, 246, 0.8);
          animation: softScan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes softScan {
          0% { top: -100%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .check-anim {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .float-toast {
          animation: floatToast 0.5s ease-out forwards;
        }
        @keyframes floatToast {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .report-box {
          transition: height 0.5s ease;
        }

        .log-list::-webkit-scrollbar {
          width: 4px;
        }
        .log-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .log-list::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>

            {/* Main Card */}
            <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-auto">
                {/* Header */}
                <div className="px-6 py-4 text-center border-b border-gray-50 bg-white z-20">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-7 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                            <i className="fas fa-robot text-sm" />
                        </div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">
                            ProfileFinder AI
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Deep Chat Analysis v2.4
                    </p>
                </div>

                {/* Main Content */}
                <div className="p-5 space-y-5 flex-1 relative z-10 bg-white">
                    <ThumbnailGrid photos={displayPhotos} isComplete={progressComplete} />
                    <ProgressSection
                        progress={progress}
                        progressText={progressText}
                        logs={logs}
                        isComplete={progressComplete}
                    />
                    <ReportSection
                        typedText={typedText}
                        showGate={showGate}
                        textBlurred={textBlurred}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                    />
                </div>

                {/* Social Proof Toasts */}
                <SocialToast toasts={toasts} />
            </div>
        </div>
    );
};

export default ChatAnalysisCard;
