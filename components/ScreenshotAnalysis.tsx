import React, { useEffect, useState } from "react";
import {
    Bot,
    Satellite,
    Check,
    Lock,
    LockOpen,
    Mail,
    ArrowRight,
    Loader2,
    ShieldCheck
} from "lucide-react";

const LOG_STEPS = [
    "Extracting text patterns (OCR)",
    "Analyzing emotional tone",
    "Checking for hidden meanings",
    "Cross-referencing behavioral database",
    "Calculating final probability",
];

const REPORT_TEXT =
    "🔍 AI Analysis Result:\n\n" +
    "🚩 Suspected Behavior: DETECTED.\n\n" +
    "⚠️ Analysis Summary:\n" +
    "Our AI has flagged 3 specific interactions in this conversation. The tone shift at 11:42 PM suggests an attempt to hide information (Gaslighting score: 8/10). 🤐\n\n" +
    "Furthermore, the use of the 'eyes' emoji (👀) in this specific context is highly correlated with... [ACCESS RESTRICTED]";

interface ScreenshotAnalysisProps {
    photos?: string[];
    paymentUrl?: string;
}

const ScreenshotAnalysis: React.FC<ScreenshotAnalysisProps> = ({
    photos = [],
    paymentUrl = "https://profilefinder-wheat.vercel.app/"
}) => {
    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState("Initializing AI Model...");
    const [logs, setLogs] = useState<string[]>([]);
    const [typedText, setTypedText] = useState("");
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    // Default placeholder images if no photos provided
    const defaultPhotos = [
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80",
    ];

    // Use provided photos or fall back to defaults
    const displayPhotos = [
        photos[0] || defaultPhotos[0],
        photos[1] || defaultPhotos[1],
        photos[2] || defaultPhotos[2],
    ];

    // Typing effect
    function startTypewriter() {
        let index = 0;
        const len = REPORT_TEXT.length;

        const typeNext = () => {
            if (index < len) {
                const char = REPORT_TEXT.charAt(index);
                setTypedText((prev) => prev + char);
                index++;

                // Trigger blur + email gate around 85% of text
                if (index === Math.floor(len * 0.85)) {
                    setShowEmailGate(true);
                }

                const speed = Math.random() * 30 + 20;
                setTimeout(typeNext, speed);
            } else {
                // Safety: ensure gate is visible at the end
                setShowEmailGate(true);
            }
        };

        typeNext();
    }

    useEffect(() => {
        // Progress + logs
        let p = 0;
        let logIndex = 0;

        const interval = setInterval(() => {
            if (p < 60) p += Math.random() * 4;
            else p += Math.random() * 1.5;
            if (p > 100) p = 100;

            setProgress(p);

            if (logIndex < LOG_STEPS.length) {
                const threshold = (logIndex + 1) * (100 / LOG_STEPS.length) - 10;
                if (p >= threshold) {
                    setLogs((prev) => [...prev, LOG_STEPS[logIndex]]);
                    setProgressLabel(LOG_STEPS[logIndex] + "...");
                    logIndex++;
                }
            }

            if (p === 100) {
                clearInterval(interval);
                setProgressLabel("Analysis Complete");
                setAnalysisComplete(true);
                setTimeout(() => startTypewriter(), 500);
            }
        }, 80);

        // Social proof toasts
        const t1Show = setTimeout(() => setShowToast1(true), 1500);
        const t1Hide = setTimeout(() => setShowToast1(false), 1500 + 4000);
        const t2Show = setTimeout(() => setShowToast2(true), 3800);
        const t2Hide = setTimeout(() => setShowToast2(false), 3800 + 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(t1Show);
            clearTimeout(t1Hide);
            clearTimeout(t2Show);
            clearTimeout(t2Hide);
        };
    }, []);

    const handlePaymentRedirect = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRedirecting(true);

        setTimeout(() => {
            window.location.href = paymentUrl;
        }, 1500);
    };

    return (
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FFA502] min-h-screen flex items-center justify-center p-4 font-sans">
            {/* Custom styles (animations + custom classes) */}
            <style>{`
        .typing-cursor::after {
          content: '|';
          animation: blink 1s step-start infinite;
          color: #EF4444;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .blur-reveal {
          filter: blur(0);
          transition: filter 2.5s ease-in;
        }
        .blur-reveal.is-blurred {
          filter: blur(12px);
          user-select: none;
          pointer-events: none;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #EF4444;
          box-shadow: 0 0 15px #EF4444;
          animation: scan 2s linear infinite;
          opacity: 0.8;
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .check-anim {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .float-up {
          animation: floatUp 0.5s ease-out forwards;
        }
        @keyframes floatUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

            {/* Card Container */}
            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[750px] flex flex-col">
                {/* Header */}
                <div className="p-5 text-center border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                            <Bot size={18} />
                        </div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">
                            ProfileFinder AI
                        </span>
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                        Deep Chat Analysis v2.4
                    </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
                    {/* SECTION 1: Uploaded Screens (Visual Confirmation) */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                Analysing Screenshots
                            </h3>
                            <span
                                className={
                                    analysisComplete
                                        ? "text-xs text-green-600 font-bold flex items-center gap-1"
                                        : "text-xs text-red-500 font-bold animate-pulse flex items-center gap-1"
                                }
                            >
                                {analysisComplete ? (
                                    <>
                                        <Check size={12} /> COMPLETE
                                    </>
                                ) : (
                                    <>
                                        <Satellite size={12} /> Processing...
                                    </>
                                )}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-2">
                            {/* Thumbnail 1 */}
                            <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 shadow-sm transform transition hover:scale-105">
                                <img
                                    src={displayPhotos[0]}
                                    alt="Screenshot 1"
                                    className="w-full h-full object-cover opacity-80 blur-[1px]"
                                />
                                <div className="scan-line" />
                            </div>
                            {/* Thumbnail 2 */}
                            <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 shadow-sm transform transition hover:scale-105">
                                <img
                                    src={displayPhotos[1]}
                                    alt="Screenshot 2"
                                    className="w-full h-full object-cover opacity-80 blur-[1px]"
                                />
                                <div className="scan-line" style={{ animationDelay: "0.5s" }} />
                            </div>
                            {/* Thumbnail 3 */}
                            <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 shadow-sm transform transition hover:scale-105">
                                <img
                                    src={displayPhotos[2]}
                                    alt="Screenshot 3"
                                    className="w-full h-full object-cover opacity-80 blur-[1px]"
                                />
                                <div className="scan-line" style={{ animationDelay: "1s" }} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                            <Lock size={10} className="text-gray-300" /> Uploads are end-to-end encrypted
                        </div>
                    </div>

                    {/* SECTION 2: Progress & Logs */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-inner">
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                            <span>{progressLabel}</span>
                            <span className="text-red-500">
                                {Math.floor(progress)}%
                            </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-3">
                            <div
                                className="h-full bg-gradient-to-r from-orange-400 to-red-600 transition-all duration-300 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                            </div>
                        </div>

                        {/* Logs */}
                        <div className="space-y-2">
                            <div className="flex flex-col gap-2">
                                {logs.map((text, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 text-[10px] text-gray-500 check-anim"
                                    >
                                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0">
                                            <Check size={8} />
                                        </div>
                                        <span className="font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: The "Juicy" Report (Teasing) */}
                    <div className="relative pt-2">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <h3 className="text-sm font-bold text-gray-800">
                                    Final Verdict
                                </h3>
                            </div>
                            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                                CONFIDENTIAL
                            </span>
                        </div>

                        <div
                            className={
                                "bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 text-sm leading-relaxed text-gray-800 min-h-[220px] shadow-sm blur-reveal relative overflow-hidden" +
                                (showEmailGate ? " is-blurred" : "")
                            }
                        >
                            <span className="typing-cursor font-medium whitespace-pre-line">
                                {typedText}
                            </span>
                        </div>

                        {/* OVERLAY: The Gate */}
                        <div
                            className={
                                "absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700" +
                                (showEmailGate
                                    ? " opacity-100 pointer-events-auto"
                                    : " opacity-0 pointer-events-none")
                            }
                        >
                            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 w-full">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center mb-3 text-2xl shadow-lg mx-auto animate-bounce">
                                    <LockOpen size={24} />
                                </div>
                                <h4 className="font-black text-xl text-gray-900 mb-1">
                                    Result Ready!
                                </h4>
                                <p className="text-xs text-gray-500 mb-5 px-2">
                                    Our AI detected{" "}
                                    <span className="font-bold text-red-500">3 red flags</span> in
                                    your chat. Enter your email to reveal the full breakdown
                                    immediately.
                                </p>

                                <form
                                    className="w-full space-y-3"
                                    onSubmit={handlePaymentRedirect}
                                >
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="your@email.com"
                                            className="w-full pl-9 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-0 text-sm outline-none transition font-medium bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={redirecting}
                                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-3.5 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition duration-200 flex justify-center items-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        {redirecting ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin" />
                                                <span>Secure Redirect...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Unlock Full Report</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 flex items-center justify-center gap-3 text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-semibold">SECURE PAYMENT</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-[10px] font-semibold">SSL ENCRYPTED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof Notification (Toast) */}
                    <div className="absolute bottom-20 left-0 right-0 px-4 pointer-events-none z-10">
                        {showToast1 && (
                            <div className="bg-gray-900/90 text-white p-3 rounded-lg shadow-lg mb-2 flex items-center gap-3 text-xs float-up backdrop-blur-sm border border-gray-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <div>
                                    <span className="font-bold text-yellow-400">Sarah M.</span>{" "}
                                    just unlocked a report
                                </div>
                            </div>
                        )}
                        {showToast2 && (
                            <div className="bg-gray-900/90 text-white p-3 rounded-lg shadow-lg mb-2 flex items-center gap-3 text-xs float-up backdrop-blur-sm border border-gray-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <div>
                                    <span className="font-bold text-yellow-400">Alex K.</span>{" "}
                                    found 2 hidden profiles
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScreenshotAnalysis;
