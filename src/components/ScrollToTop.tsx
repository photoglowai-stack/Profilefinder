import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component - scrolls to top of page on every route change
 * Must be placed inside BrowserRouter but outside Routes
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

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
