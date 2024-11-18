// components/HomeLayout.tsx
import { useRouter } from "next/router";
import Profile from "@/components/Profile";

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
}