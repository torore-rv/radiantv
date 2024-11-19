import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
    const router = useRouter();

    // 페이지 경로 변경 시 스크롤을 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router.pathname]); // pathname이 변경될 때만 실행

    return null; // 렌더링하지 않음
};

export default ScrollToTop;
