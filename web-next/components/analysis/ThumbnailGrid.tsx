import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ThumbnailGridProps {
    photos: string[];
    isComplete: boolean;
}

export const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({ photos, isComplete }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Analysing Uploads
                </h3>
                <span
                    className={`text-[10px] font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${isComplete
                        ? "text-green-600 bg-green-50 border-green-100"
                        : "text-blue-600 bg-blue-50 border-blue-100"
                        }`}
                >
                    {isComplete ? (
                        <>
                            <Check size={10} /> Done
                        </>
                    ) : (
                        <>
                            <Loader2 size={10} className="animate-spin" /> Processing
                        </>
                    )}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, idx) => (
                    <div
                        key={idx}
                        className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 shadow-sm group"
                    >
                        <img
                            src={photo}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-full h-full object-cover opacity-90 blur-[0.5px] group-hover:opacity-100 transition-opacity"
                        />
                        <div
                            className="scan-line"
                            style={{ animationDelay: `${idx * 0.3}s` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
