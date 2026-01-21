"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Scan, Eye, Search as SearchIcon, MessageSquare,
    ArrowRight, Activity, Plus, ArrowLeft, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useCredits } from '@/lib/useCredits';

interface ServiceConfig {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    toolPath: string;
    creditKey: 'dating' | 'faceTrace' | 'following' | 'fidelity' | 'chatAnalysis';
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
    'dating-search': {
        id: 'dating-search',
        name: 'Dating App Search',
        description: 'Find hidden profiles on Tinder, Bumble, Badoo & more',
        icon: <Heart className="w-8 h-8 text-white" />,
        gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
        toolPath: '/dating-search/form',
        creditKey: 'dating',
    },
    'face-trace': {
        id: 'face-trace',
        name: 'Face Trace',
        description: 'Reverse image search across 12M+ sources',
        icon: <Scan className="w-8 h-8 text-white" />,
        gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
        toolPath: '/face-trace',
        creditKey: 'faceTrace',
    },
    'following-ai': {
        id: 'following-ai',
        name: 'Following AI',
        description: 'Monitor Instagram activity & interactions',
        icon: <Eye className="w-8 h-8 text-white" />,
        gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
        toolPath: '/activity-tracker',
        creditKey: 'following',
    },
    'fidelity-check': {
        id: 'fidelity-check',
        name: 'Fidelity Check',
        description: 'Detect dating profiles by name & location',
        icon: <SearchIcon className="w-8 h-8 text-white" />,
        gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
        toolPath: '/fidelity-test/form',
        creditKey: 'fidelity',
    },
    'chat-analysis': {
        id: 'chat-analysis',
        name: 'Chat Analysis',
        description: 'AI-powered conversation insights & red flags',
        icon: <MessageSquare className="w-8 h-8 text-white" />,
        gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
        toolPath: '/analysis',
        creditKey: 'chatAnalysis',
    },
};

interface ServiceDashboardProps {
    serviceId: string;
}

export function ServiceDashboard({ serviceId }: ServiceDashboardProps) {
    const { getCredits } = useCredits();
    const config = SERVICE_CONFIGS[serviceId];

    if (!config) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
                    <Link href="/dashboard" className="text-indigo-400 hover:underline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const credits = getCredits(config.creditKey);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Dashboard</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="https://pub-a708aef7cab14c7e8c61d131d5e3682d.r2.dev/Design%20sans%20titre%20(7).svg"
                                alt="ProfileFinder"
                                className="h-8 w-8"
                            />
                            <span className="text-xl font-black text-white">ProfileFinder</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Service Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative rounded-3xl overflow-hidden mb-8 ${config.gradient} p-8`}
                >
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    {config.icon}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-white mb-1">{config.name}</h1>
                                    <p className="text-white/80">{config.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Credits Display */}
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                                <Zap className="w-5 h-5 text-yellow-300" />
                                <div>
                                    <div className="text-2xl font-black text-white">{credits}</div>
                                    <div className="text-xs text-white/70">Credits Remaining</div>
                                </div>
                            </div>
                            <Link
                                href={config.toolPath}
                                className="bg-white hover:bg-white/90 text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Start a New Search
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Ongoing Searches Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Ongoing Searches</h2>
                        <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
                            <Activity className="w-4 h-4" />
                            Active
                        </div>
                    </div>

                    {/* Empty State */}
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SearchIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-400 mb-2 text-lg font-medium">No active searches</p>
                        <p className="text-sm text-gray-500 mb-6">
                            You haven't started any searches with this tool yet.<br />
                            Click the button above to launch your first search.
                        </p>
                        <Link
                            href={config.toolPath}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Start First Search
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help with {config.name}?{' '}
                        <Link href="/support" className="text-indigo-400 hover:underline">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ServiceDashboard;
