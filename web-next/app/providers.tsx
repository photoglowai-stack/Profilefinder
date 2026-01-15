"use client";

import { ServiceProvider } from "@/lib/ServiceContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ServiceProvider>
            {children}
        </ServiceProvider>
    );
}
