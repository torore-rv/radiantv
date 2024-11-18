import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const EpisodeList = () => {
    const router = useRouter();
    const { fanfiction_id, name } = router.query;  // URL에서 fanfiction_id와 name을 받아옴
    const [episodes, setEpisodes] = useState<number[]>([]);  // 에피소드 번호를 담을 상태

    useEffect(() => {
        if (fanfiction_id) {
            const fetchEpisodes = async () => {
                try {
                    const response = await fetch(`/api/episodeList?fanfiction_id=${fanfiction_id}`);
                    const data = await response.json();
                    setEpisodes(data.episodes);  // 에피소드 번호 배열을 상태에 저장
                } catch (error) {
                    console.error("Error fetching episodes:", error);
                }
            };

            fetchEpisodes();
        }
    }, [fanfiction_id]);  // fanfiction_id가 변경될 때마다 실행

    if (!fanfiction_id || !name) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="novel">
            <div className="title">{name}</div>  {/* 전달받은 name을 제목으로 표시 */}
            <div className="episodes">
                {episodes.map((episodeNumber) => (
                    <span key={episodeNumber} className="episode">
                        <Link
                            href={{
                                pathname: '/Episode',
                                query: { fanfiction_id: fanfiction_id, no: episodeNumber },  // 동적으로 에피소드 번호 넘기기
                            }}
                        >
                            {episodeNumber}화
                        </Link>
                    </span>
                ))}
            </div>

            <br /><br />

            <div className="navigation">
                <Link href="/NovelLayout" className="home-button">목록</Link>
            </div>
        </div>
    );
};

export default EpisodeList;
