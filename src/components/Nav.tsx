import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <nav>
            <div className="flex gap-4 p-4">
                <Link
                    href="/"
                    className={currentPath === '/' ? 'active' : ''}
                >
                    홈
                </Link>
                <Link
                    href="/NovelLayout"
                    className={currentPath === '/NovelLayout' ? 'active' : ''}
                >
                    소설
                </Link>
                {/*<Link*/}
                {/*    href="/AdminPage"*/}
                {/*    className={currentPath === '/AdminPage' ? 'active' : ''}*/}
                {/*>*/}
                {/*    Admin*/}
                {/*</Link>*/}
            </div>
        </nav>
    );
};

export default Nav;