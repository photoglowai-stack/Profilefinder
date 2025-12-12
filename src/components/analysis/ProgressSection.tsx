import React, { useRef, useEffect } from 'react';

interface ProgressSectionProps {
    progress: number;
    progressText: string;
    logs: string[];
    isComplete: boolean;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
    progress,
    progressText,
    logs,
    isComplete,
}) => {
    const logListRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs to bottom when new log appears
    useEffect(() => {
        if (logListRef.current) {
            logListRef.current.scrollTop = logListRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                <span
                    className={
                        isComplete ? "text-[11px] font-bold text-green-600" : ""
                    }
                >
                    {progressText}
                </span>
                <span className="text-blue-600">{Math.floor(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2.5">
                <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                />
            </div>
            {/* Scrollable Log List */}
            <div
                ref={logListRef}
                className="log-list flex flex-col gap-1.5 h-[80px] overflow-y-auto relative pr-1"
            >
                {logs.map((log, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 text-[10px] text-gray-600 check-anim shrink-0"
                    >
                        <div className="w-3.5 h-3.5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            <i className="fas fa-check text-[8px]" />
                        </div>
                        <span className="font-medium truncate">{log}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
