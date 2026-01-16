"use client";

import { Suspense } from 'react';
import { ChatAnalysisPaymentPage } from '@/components/pages/ChatAnalysisPaymentPage';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ChatAnalysisPaymentPage />
        </Suspense>
    );
}
