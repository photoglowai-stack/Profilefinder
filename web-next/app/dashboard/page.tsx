"use client";

import { Suspense } from 'react';
import { DashboardPage } from '@/components/pages/DashboardPage';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <DashboardPage />
        </Suspense>
    );
}
