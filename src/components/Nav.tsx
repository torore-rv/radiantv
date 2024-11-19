import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <nav>
            <div className="flex gap-4 p-4">
                <Link href="/" className={currentPath === '/' ? 'active' : ''}>홈</Link>
                <Link href="/NameChange" className={currentPath === '/NameChange' ? 'active' : ''}>이름변환</Link>
                <Link href="/NovelLayout" className={currentPath === '/NovelLayout' ? 'active' : ''}>장편</Link>
                {session && (
                    <>
                        {/*<Link href="/NovelShort" className={currentPath === '/NovelShort' ? 'active' : ''}>중단편</Link>*/}
                        <Link href="/AdminPage" className={currentPath === '/AdminPage' ? 'active' : ''}>Admin</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;