import React, { useRef, useEffect } from 'react';

interface ReportSectionProps {
    typedText: string;
    showGate: boolean;
    textBlurred: boolean;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ReportSection: React.FC<ReportSectionProps> = ({
    typedText,
    showGate,
    textBlurred,
    isSubmitting,
    onSubmit,
}) => {
    const emailInputRef = useRef<HTMLInputElement>(null);

    // Focus email input when gate appears
    useEffect(() => {
        if (showGate && emailInputRef.current) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 300);
        }
    }, [showGate]);

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-gray-800">
                        Final Verdict
                    </h3>
                </div>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 font-bold">
                    CONFIDENTIAL
                </span>
            </div>

            {/* Report Box */}
            <div
                className="report-box bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden"
                style={{ height: showGate ? "280px" : "120px" }}
            >
                {/* Text Content */}
                <div className="p-4 text-sm leading-relaxed text-gray-700">
                    <div className={textBlurred ? "text-blur" : ""}>
                        <span className="typing-cursor block font-medium whitespace-pre-wrap">
                            {typedText}
                        </span>
                    </div>
                </div>

                {/* INLINE GATE */}
                <div
                    className={`absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${showGate
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="w-full max-w-[280px] text-center">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3 text-xl shadow-sm mx-auto border border-emerald-100">
                            <i className="fas fa-check" />
                        </div>

                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                            Result Ready
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">
                            <span className="font-bold text-emerald-600">
                                3 red flags
                            </span>{" "}
                            found. Unlock full report.
                        </p>

                        <form className="w-full space-y-3" onSubmit={onSubmit}>
                            <div className="relative group text-left">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-gray-400 text-xs" />
                                </div>
                                <input
                                    ref={emailInputRef}
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-50 text-sm outline-none transition bg-white text-gray-900 placeholder-gray-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm cursor-pointer disabled:opacity-75"
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-circle-notch fa-spin" />{" "}
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <span>Reveal Results</span>
                                        <i className="fas fa-arrow-right text-xs" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-3 flex items-center justify-center gap-3 text-[9px] text-gray-400 font-medium">
                            <span className="flex items-center gap-1">
                                <i className="fas fa-shield-alt text-green-500" /> Secure
                            </span>
                            <span className="bg-gray-200 w-1 h-1 rounded-full" />
                            <span className="flex items-center gap-1">
                                <i className="fas fa-lock" /> Private
                            </span>
                        </div>
                    </div>
                </div>

                {/* Gradient Fade (Visible while typing, hidden when gate shows) */}
                <div
                    className={`absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ${showGate ? "opacity-0" : "opacity-100"
                        }`}
                />
            </div>
        </div>
    );
};
