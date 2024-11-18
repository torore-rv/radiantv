import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Novel {
    id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
    created_at: string;
    original_title: string;
}

interface GroupedData {
    [key: string]: {
        originalTitle: string;
        novels: Novel[];
    };
}

interface NovelListProps {
    filterTags: string[];
    searchQuery: string;
}

const NovelList: React.FC<NovelListProps> = ({ filterTags, searchQuery }) => {
    const [novels, setNovels] = useState<GroupedData>({});

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const params = new URLSearchParams();
                if (searchQuery) {
                    params.append('query', searchQuery);
                }
                if (filterTags.length > 0) {
                    params.append('tag', filterTags[0]);
                }

                const response = await fetch(`/api/fanfiction?${params}`);
                const data = await response.json();
                setNovels(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchNovels();
    }, [filterTags, searchQuery]);

    return (
        <>
            {Object.entries(novels).map(([originalId, group]) => (
                <div key={originalId} className="original-work">
                    <div className="original-title">
                        {group.originalTitle}
                        <span className="work-count">
                            {Array.isArray(group.novels) ? group.novels.length : 0} 작품
                        </span>
                    </div>
                    <div className="novel-list">
                        {Array.isArray(group.novels) && group.novels.length > 0 ? (
                            group.novels.map((novel) => (
                                <div key={novel.id} className="novel-item">
                                    <div className="novel-title">
                                        <Link
                                            href={{
                                                pathname: '/EpisodeList',
                                                query: { fanfiction_id: novel.id, name: novel.name },
                                            }}
                                        >
                                            {novel.name}
                                        </Link>
                                        {isNew(novel.created_at) && <span className="new-tag">NEW</span>}
                                    </div>
                                    <div className="novel-info">
                                        <span>연재중</span>
                                        <span className="dot-divider">·</span>
                                        <span>0화</span>
                                        <span className="dot-divider">·</span>
                                        <span className="update-time">{formatTime(novel.created_at)}</span>
                                    </div>
                                    <div className="novel-summary">{novel.summary}</div>
                                    <div className="tags">
                                        {novel.tag.split(", ").map((tag, tagIndex) => (
                                            <span key={tagIndex} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>작품이 없습니다.</p>  // 배열이 없을 때 대체 UI
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

const isNew = (createdAt: string) => {
    const now = new Date();
    const targetDate = new Date(createdAt);
    return (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60) <= 72;
};

const formatTime = (dateString: string) => {
    const targetDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = (now.getTime() - targetDate.getTime()) / (1000 * 60);

    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;

    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");
    return `${month}.${day}`;
};

export default NovelList;
