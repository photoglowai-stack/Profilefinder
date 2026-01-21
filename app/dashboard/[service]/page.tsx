"use client";

import { Suspense } from 'react';
import { ServiceDashboard } from '@/components/pages/ServiceDashboard';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}

interface PageProps {
    params: { service: string };
}

export default function ServiceDashboardPage({ params }: PageProps) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ServiceDashboard serviceId={params.service} />
        </Suspense>
    );
}
