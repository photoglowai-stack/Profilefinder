"use client";

import { Suspense } from 'react';
import { PaymentPage } from '@/components/pages/PaymentPageNew';

function PaymentLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );
}

export default function FaceTracePayment() {
    return (
        <Suspense fallback={<PaymentLoading />}>
            <PaymentPage />
        </Suspense>
    );
}
