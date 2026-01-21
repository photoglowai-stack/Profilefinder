"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 301 Redirect: Dating Search is now served from homepage
export default function DatingSearchPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to homepage with smooth scroll to form
        router.replace('/');
    }, [router]);

    // Return minimal loading state during redirect
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f8fafc'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #e2e8f0',
                    borderTop: '3px solid #ff4b5c',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
                    Redirecting...
                </p>
            </div>
        </div>
    );
}
