import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * RevealOnScroll - Performance-optimized scroll reveal component
 * 
 * Wraps content to animate only when scrolled into view.
 * Uses IntersectionObserver for performance (no scroll listeners).
 * Animates with GPU-only properties (transform, opacity).
 */
export const RevealOnScroll: React.FC<RevealProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: '800ms',
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className={`transition-all ${className} ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
