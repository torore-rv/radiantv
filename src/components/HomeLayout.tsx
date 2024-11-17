import React from 'react';
import Profile from '@/components/Profile';
import { useRouter } from 'next/router';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
    const router = useRouter();

    return (
        <div>
            {router.pathname === '/' && <Profile />} {/* Only show Profile on Home page */}
            <div>{children}</div>
        </div>
    );
};