"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Lock, Crown, Check, MapPin, Clock,
    AlertTriangle, Sparkles, Shield, Flame
} from 'lucide-react';
import Link from 'next/link';

export function FidelityResultsPage() {
    const profile = {
        name: 'Julian***',
        age: 27,
        platform: 'Tinder',
        location: '2km away',
        lastActive: '22 min ago',
        bio: 'Looking for something casual...',
        verified: true
    };

    const lockedServices = [
        { name: 'Dating Search', icon: '💕', description: 'Find dating profiles' },
        { name: 'Face Trace', icon: '🔍', description: 'Reverse image search' },
        { name: 'Following AI', icon: '👀', description: 'Instagram monitoring' },
        { name: 'Chat Analysis', icon: '🧠', description: 'AI conversation insights' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950/20 to-gray-900">
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg" alt="ProfileFinder" className="h-8 w-8" />
                        <span className="text-xl font-black text-white">ProfileFinder</span>
                    </Link>
                    <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        Suspicious Profile Found
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-red-500 rounded-full p-1"><AlertTriangle className="w-4 h-4 text-white" /></div>
                        <span className="text-red-400 font-medium">Alert: Active Profile Detected</span>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">Fidelity Check Results</h1>
                    <p className="text-gray-400">1 suspicious dating profile found in your search area</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-3xl overflow-hidden"
                        >
                            {/* Profile Header */}
                            <div className="h-48 bg-gradient-to-br from-red-500 to-orange-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <span className="text-4xl font-black text-white">{profile.name.charAt(0)}</span>
                                    </div>
                                </div>
                                {profile.verified && (
                                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Verified
                                    </div>
                                )}
                            </div>

                            {/* Profile Info */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-2xl font-black text-white">{profile.name}</h2>
                                    <span className="text-gray-400">{profile.age}</span>
                                    <Flame className="w-5 h-5 text-orange-500" />
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                        <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                        <p className="text-red-400 font-bold">{profile.lastActive}</p>
                                        <p className="text-gray-500 text-xs">Last Active</p>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                        <MapPin className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                        <p className="text-red-400 font-bold">{profile.location}</p>
                                        <p className="text-gray-500 text-xs">Distance</p>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                        <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                        <p className="text-red-400 font-bold">{profile.platform}</p>
                                        <p className="text-gray-500 text-xs">Platform</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 mb-4">
                                    <p className="text-gray-400 text-sm italic">"{profile.bio}"</p>
                                </div>

                                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                                    <AlertTriangle className="w-5 h-5" />
                                    View Full Profile Details
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-lg font-bold text-white">Get Full Access</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">Monitor this profile 24/7 with Premium.</p>
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

export default FidelityResultsPage;
