import { useEffect } from 'react';
import { useRouter } from 'next/router';


function ScrollToTop() {
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router.pathname]);
}

export default ScrollToTop;