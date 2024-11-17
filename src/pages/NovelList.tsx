import React, { useEffect, useState } from "react";
// import "@/styles/globals.css";

interface Novel {
    id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
    created_at: string;
}

interface GroupedData {
    [key: string]: {
        originalTitle: string;
        novels: Novel[];
    }
}

const NovelList = () => {
    const [groupedData, setGroupedData] = useState<GroupedData>({});

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await fetch("/api/fanfiction");
                const data = await response.json();
                setGroupedData(data);
            } catch (error) {
                console.error("Error fetching fanfictions:", error);
            }
        };

        fetchNovels();
    }, []);

    return (
        <>
            {Object.entries(groupedData).map(([originalId, group]) => (
                <div key={originalId} className="original-work">
                    <div className="original-title">
                        {group.originalTitle}
                        <span className="work-count">총 {group.novels.length}편</span>
                    </div>
                    <div className="novel-list">
                        {group.novels.map((novel, index) => (
                            <div key={novel.id} className="novel-item">
                                <div className="novel-title">
                                    {novel.name}
                                    {index === 0 && <span className="new-tag">NEW</span>}
                                </div>
                                <div className="novel-info">
                                    <span>연재중</span>
                                    <span className="dot-divider">·</span>
                                    <span>0화</span>
                                    <span className="dot-divider">·</span>
                                    <span className="update-time">
                                        {formatTime(novel.created_at)}
                                    </span>
                                </div>


                                <div className="novel-summary">
                                    {novel.summary}
                                </div>

                                <div className="tags">
                                    {novel.tag.split(", ").map((tag, tagIndex) => (
                                        <span key={tagIndex} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="novel-meta">
                                    <span>조회 0</span>
                                    <span>추천 0</span>
                                    <span>댓글 0</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};


// 시간 포맷팅 함수
const formatTime = (dateString: string) => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffInMinutes = (now.getTime() - targetDate.getTime()) / (1000 * 60);
    const diffInHours = diffInMinutes / 60;

    if (diffInMinutes < 60) {
        // 1시간 이내일 경우
        const minutes = Math.floor(diffInMinutes);
        return `${minutes}분 전`;
    } else if (diffInHours < 24) {
        // 24시간 이내일 경우
        const hours = Math.floor(diffInHours);
        return `${hours}시간 전`;
    } else {
        // 24시간 이후일 경우 MM.DD 형식으로 표시
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        return `${month}.${day}`;
    }
};

export default NovelList;