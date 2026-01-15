"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop component - scrolls to top of page on every route change
 * Must be placed inside the root layout
 */
export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to top immediately on route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate effect
        });
    }, [pathname]);

    return null;
}

export default ScrollToTop;
