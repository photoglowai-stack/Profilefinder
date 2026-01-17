import React from 'react';

interface Toast {
    id: number;
    name: string;
    action: string;
    visible: boolean;
}

interface SocialToastProps {
    toasts: Toast[];
}

export const SocialToast: React.FC<SocialToastProps> = ({ toasts }) => {
    return (
        <div className="absolute bottom-4 left-0 right-0 px-4 pointer-events-none z-[60] flex flex-col items-center gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`bg-gray-800/95 text-white px-3 py-2.5 rounded-lg shadow-xl flex items-center gap-3 text-[10px] float-toast backdrop-blur-md border border-gray-700 w-auto transition-all duration-500 ${toast.visible ? "opacity-100" : "opacity-0 translate-y-2"
                        }`}
                >
                    <div className="relative flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <span className="font-bold text-yellow-400">{toast.name}</span>{" "}
                        {toast.action}
                    </div>
                </div>
            ))}
        </div>
    );
};
