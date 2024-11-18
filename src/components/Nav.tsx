import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav>
            <div className="flex gap-4 p-4">
                <Link href="/">홈</Link>
                <Link href="/NovelLayout">소설</Link>
                {session && (
                    <>
                        <Link href="/EpisodeList">Episode</Link>
                        <Link href="/AdminPage">Admin</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;