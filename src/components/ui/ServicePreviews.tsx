import React from 'react';
import {
    AlertTriangle,
    Link as LinkIcon,
    Heart,
    UserPlus,
    MessageCircle,
    ShieldAlert,
    Info
} from 'lucide-react';

/**
 * DisclaimerOverlay - Legal requirement on all previews
 * Shows example report notice
 */
const DisclaimerOverlay = () => (
    <div className="absolute inset-x-0 bottom-0 z-30 bg-gray-900/80 p-3 border-t border-white/10">
        <div className="flex items-start gap-3 max-w-sm mx-auto">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[10px] leading-tight text-gray-300">
                <strong className="text-white">SAMPLE REPORT:</strong> Visual data above is blurred for demonstration. The unlocked report will contain real uncensored results.
            </p>
        </div>
    </div>
);

/**
 * FidelityCheckPreview - Chat Analysis Mockup
 * Investigation / risk atmosphere (indigo / violet)
 */
export const FidelityCheckPreview = () => {
    return (
        <div className="relative w-full h-[400px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex flex-col">
            {/* Sharp Header */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md z-10">
                <div>
                    <div className="font-bold text-sm">Conversation Analysis</div>
                    <div className="text-xs text-indigo-200 flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        3 suspicious conversations
                    </div>
                </div>
                <div className="bg-white/10 px-2 py-1 rounded text-xs font-mono">
                    Score: 34% (RISK)
                </div>
            </div>

            {/* Semi-Blurred Chat Body */}
            <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
                {/* Light blur layer - NOT stacking multiple backdrop-blur */}
                <div className="absolute inset-0 bg-white/50 z-10" style={{ backdropFilter: 'blur(2px)' }} />

                {/* Simulated messages - shapes visible, text unreadable */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
                    <div className="space-y-1 max-w-[70%]">
                        <div className="h-8 bg-gray-200 rounded-2xl rounded-tl-none w-48" />
                        <div className="h-8 bg-gray-200 rounded-2xl rounded-tl-none w-32" />
                    </div>
                </div>

                <div className="flex flex-row-reverse gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-200 shrink-0" />
                    <div className="space-y-1 max-w-[70%] flex flex-col items-end">
                        <div className="h-12 bg-indigo-100 rounded-2xl rounded-tr-none w-56" />
                    </div>
                </div>

                {/* Sharp Suspect Message - Highlighted trigger */}
                <div className="relative z-20 mt-8 ml-12">
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <AlertTriangle className="w-6 h-6 text-red-500 fill-red-100 animate-bounce" />
                    </div>
                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl shadow-lg max-w-[250px]">
                        <p className="text-xs font-bold text-red-700 mb-1 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" />
                            HIDDEN CONTENT
                        </p>
                        <p className="text-xs text-red-600/70 italic">
                            "This message was deleted at 03:42..."
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
                    <div className="space-y-1 max-w-[70%]">
                        <div className="h-8 bg-gray-200 rounded-2xl rounded-tl-none w-40" />
                    </div>
                </div>
            </div>

            <DisclaimerOverlay />
        </div>
    );
};

/**
 * FaceTracePreview - PimEyes-style grid
 * Cyber / investigation mood (cyan / slate / black)
 * Uses abstract silhouettes - NO real faces
 */
export const FaceTracePreview = () => {
    const sources = ['Dating Site', 'Public Forum', 'Archive', 'Social Network'];

    return (
        <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
            {/* Sharp Header */}
            <div className="bg-slate-800 p-3 border-b border-slate-700 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 text-xs font-mono uppercase">Deep Web Search</span>
                </div>
                <span className="text-slate-400 text-xs">24 Results</span>
            </div>

            {/* Results Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 overflow-hidden relative">
                {sources.map((source, i) => (
                    <div key={i} className="bg-slate-800 rounded-lg p-2 border border-slate-700 relative group overflow-hidden">
                        {/* Abstract silhouette - NO real faces */}
                        <div className="aspect-square bg-gradient-to-br from-slate-600 to-slate-700 rounded mb-2 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Body silhouette */}
                                <div className="w-16 h-20 bg-slate-500 rounded-full opacity-40 transform translate-y-4" />
                                {/* Head silhouette */}
                                <div className="absolute w-10 h-10 bg-slate-400 rounded-full opacity-50 -translate-y-4" />
                            </div>
                            {/* Pixel/grain overlay for scraped data feel */}
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
                                }}
                            />
                        </div>

                        {/* Sharp Labels */}
                        <div className="space-y-1 relative z-20">
                            <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded">
                                <LinkIcon className="w-3 h-3 text-cyan-400" />
                                <span className="text-[10px] text-white font-bold truncate">
                                    {source}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[9px] text-slate-400">2d ago</span>
                                <span className="text-[9px] text-green-400 font-mono">{95 + i}% Match</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
            </div>

            <DisclaimerOverlay />
        </div>
    );
};

/**
 * InstagramRadarPreview - Live Activity Tracking
 * Urgent, live, Instagram-like colors
 * Uses CSS animations instead of Framer Motion for performance
 */
export const InstagramRadarPreview = () => {
    const activities = [
        { icon: Heart, text: "Liked 3 photos", time: "2 min", color: "text-red-400" },
        { icon: UserPlus, text: "New follow", time: "15 min", color: "text-blue-400" },
        { icon: MessageCircle, text: "Commented", time: "1h", color: "text-green-400" },
    ];

    return (
        <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden border border-gray-800 flex flex-col">
            {/* Sharp Header */}
            <div className="bg-gray-900/90 p-3 border-b border-gray-800 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                    <span className="text-pink-500 text-xs font-bold uppercase tracking-wider">Radar Active</span>
                </div>
                <span className="text-gray-500 text-xs font-mono">Live Tracking</span>
            </div>

            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black">

                {/* Radar Circles - CSS only */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-[300px] h-[300px] border border-pink-500/50 rounded-full" />
                    <div className="w-[200px] h-[200px] border border-pink-500/30 rounded-full absolute" />
                    <div className="w-[100px] h-[100px] border border-pink-500/20 rounded-full absolute" />
                </div>

                {/* Sweep Line - CSS animation */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                    <div
                        className="w-1/2 h-1/2 bg-gradient-to-l from-pink-500/20 to-transparent origin-bottom-right absolute top-0 left-0"
                        style={{ borderRight: '1px solid rgba(236, 72, 153, 0.5)' }}
                    />
                </div>

                {/* Blips */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_8px_#ec4899] animate-pulse" style={{ animationDelay: '0.5s' }} />

                {/* Activity List - Sharp actions, blurred targets */}
                <div className="absolute top-4 right-4 w-48 space-y-2 z-20">
                    {activities.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-900/80 p-2 rounded-lg border border-gray-700 flex items-center gap-2 animate-fadeIn"
                            style={{ animationDelay: `${i * 200}ms` }}
                        >
                            <div className={`p-1.5 rounded-full bg-gray-800 ${item.color}`}>
                                <item.icon className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] text-gray-300 font-medium truncate">{item.text}</div>
                                <div className="flex items-center gap-1">
                                    {/* Blurred target name */}
                                    <div className="h-1.5 w-8 bg-gray-600 rounded" style={{ filter: 'blur(1px)' }} />
                                    <span className="text-[9px] text-gray-500">{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DisclaimerOverlay />
        </div>
    );
};
