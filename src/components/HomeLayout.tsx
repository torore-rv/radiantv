// HomeLayout.tsx
import React from 'react';
import Profile from '@/components/Profile';
import { useRouter } from 'next/router';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    const router = useRouter();
    return (
        <div>
            {router.pathname === '/' && <Profile />}
            <div>{children}</div>
        </div>
    );
};