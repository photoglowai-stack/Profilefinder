"use client";

import { Suspense } from 'react';
import { FidelityCheckPaymentPage } from '@/components/pages/FidelityCheckPaymentPage';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <FidelityCheckPaymentPage />
        </Suspense>
    );
}
