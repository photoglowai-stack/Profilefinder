"use client";

import { Suspense } from 'react';
import { PaymentPage } from '@/components/pages/PaymentPageNew';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PaymentPage />
        </Suspense>
    );
}
