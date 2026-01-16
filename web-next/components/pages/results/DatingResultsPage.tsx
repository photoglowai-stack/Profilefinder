"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Lock, Crown, ArrowRight, Check, Shield,
    MapPin, Clock, Eye, Star, Sparkles
} from 'lucide-react';
import Link from 'next/link';

/**
 * DatingResultsPage - Results page for single dating report purchase
 * Shows unlocked dating results with locked other services
 */
export function DatingResultsPage() {
    // Simulated results data
    const results = [
        { name: 'Sarah M.', age: 28, platform: 'Tinder', location: 'Paris', lastActive: '2h ago', match: 98 },
        { name: 'Julie K.', age: 25, platform: 'Bumble', location: 'Lyon', lastActive: '15min ago', match: 95 },
        { name: 'Emma L.', age: 30, platform: 'Badoo', location: 'Paris', lastActive: '1d ago', match: 89 },
    ];

    const lockedServices = [
        { name: 'Face Trace', icon: '🔍', description: 'Reverse image search' },
        { name: 'Following AI', icon: '👀', description: 'Instagram monitoring' },
        { name: 'Fidelity Check', icon: '💔', description: 'Partner detection' },
        { name: 'Chat Analysis', icon: '🧠', description: 'AI conversation insights' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-rose-950/20 to-gray-900">
            {/* Header */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                            alt="ProfileFinder"
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-black text-white">ProfileFinder</span>
                    </Link>
                    <div className="flex items-center gap-2 bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-full text-sm font-medium">
                        <Heart className="w-4 h-4" fill="currentColor" />
                        Dating Report Active
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Results Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500 rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-green-400 font-medium">Report Unlocked</span>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        Dating App Search Results
                    </h1>
                    <p className="text-gray-400">
                        {results.length} profiles found matching your search criteria
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Results Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {results.map((profile, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {profile.name.charAt(0)}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                                            <span className="text-gray-400">{profile.age}</span>
                                            <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                                {profile.match}% Match
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                {profile.platform}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {profile.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                Active {profile.lastActive}
                                            </span>
                                        </div>

                                        <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                                            <Eye className="w-4 h-4" />
                                            View Full Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar - Locked Services */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-lg font-bold text-white">Unlock Everything</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                                Upgrade to Premium and get unlimited access to all 5 services.
                            </p>
                            <Link
                                href="/payment?plan=subscription"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                Upgrade to Premium
                            </Link>
                            <p className="text-center text-gray-500 text-xs mt-2">Only 19.99€/month</p>
                        </div>

                        {/* Locked Services */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                Locked Services
                            </h4>
                            <div className="space-y-2">
                                {lockedServices.map((service, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl opacity-60"
                                    >
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

export default DatingResultsPage;
