"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Scan, Lock, Crown, ArrowRight, Check, Shield,
    Globe, Image, AlertTriangle, Sparkles, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export function FaceTraceResultsPage() {
    const results = [
        { source: 'Instagram', url: 'instagram.com/user***', score: 98, type: 'exact' },
        { source: 'Facebook', url: 'facebook.com/profile***', score: 95, type: 'exact' },
        { source: 'LinkedIn', url: 'linkedin.com/in/***', score: 89, type: 'similar' },
        { source: 'Twitter/X', url: 'x.com/user***', score: 87, type: 'similar' },
        { source: 'Dating App', url: '[Hidden Profile]', score: 82, type: 'alert' },
    ];

    const lockedServices = [
        { name: 'Dating Search', icon: '💕', description: 'Find dating profiles' },
        { name: 'Following AI', icon: '👀', description: 'Instagram monitoring' },
        { name: 'Fidelity Check', icon: '💔', description: 'Partner detection' },
        { name: 'Chat Analysis', icon: '🧠', description: 'AI conversation insights' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-cyan-950/20 to-gray-900">
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" className="h-8 w-8" />
                        <span className="text-xl font-black text-white">ProfileFinder</span>
                    </Link>
                    <div className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-full text-sm font-medium">
                        <Scan className="w-4 h-4" />
                        Face Trace Active
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500 rounded-full p-1"><Check className="w-4 h-4 text-white" /></div>
                        <span className="text-green-400 font-medium">Scan Complete</span>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">Face Recognition Results</h1>
                    <p className="text-gray-400">{results.length} matches found across 12M+ sources</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {results.map((result, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/10 transition-all ${result.type === 'alert' ? 'border-red-500/50' : 'border-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${result.type === 'exact' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' :
                                                result.type === 'alert' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                                    'bg-gradient-to-br from-gray-500 to-gray-600'
                                            }`}>
                                            {result.type === 'alert' ?
                                                <AlertTriangle className="w-7 h-7 text-white" /> :
                                                <Image className="w-7 h-7 text-white" />
                                            }
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-gray-400" />
                                                <span className="text-white font-bold">{result.source}</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${result.score >= 90 ? 'bg-green-500/20 text-green-400' :
                                                        result.score >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {result.score}% Match
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">{result.url}</p>
                                        </div>
                                    </div>
                                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                        View
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-lg font-bold text-white">Unlock Everything</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">Upgrade to Premium for unlimited access.</p>
                            <Link href="/payment?plan=subscription" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                                <Sparkles className="w-5 h-5" />Upgrade to Premium
                            </Link>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Locked Services</h4>
                            <div className="space-y-2">
                                {lockedServices.map((service, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl opacity-60">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{service.icon}</span>
                                            <div>
                                                <p className="text-white font-medium text-sm">{service.name}</p>
                                                <p className="text-gray-500 text-xs">{service.description}</p>
                                            </div>
                                        </div>
                                        <Lock className="w-4 h-4 text-gray-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default FaceTraceResultsPage;
