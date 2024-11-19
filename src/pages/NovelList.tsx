import React, { useState, useEffect } from "react";
import { utcToZonedTime, format } from 'date-fns-tz';
import Link from "next/link";

interface Novel {
    id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
    no: number;
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
                                        <span>{novel.no} 화</span>
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
                            <p>작품이 없습니다.</p>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

// Get the client's timezone
const getClientTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Convert UTC date string to client's local time
const convertToLocalTime = (utcDateString: string): Date => {
    const timeZone = getClientTimeZone();
    return utcToZonedTime(new Date(utcDateString), timeZone);
};

// Check if a novel is new (posted within last 72 hours)
const isNew = (createdAt: string): boolean => {
    const localCreatedAt = convertToLocalTime(createdAt);
    const now = new Date();
    const localNow = utcToZonedTime(now, getClientTimeZone());

    const diffInHours = (localNow.getTime() - localCreatedAt.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 72;
};

// Format the time difference in a human-readable way
const formatTime = (dateString: string): string => {
    const localDate = convertToLocalTime(dateString);
    const now = new Date();
    const localNow = utcToZonedTime(now, getClientTimeZone());

    const diffInMinutes = (localNow.getTime() - localDate.getTime()) / (1000 * 60);

    // Less than an hour ago
    if (diffInMinutes < 60) {
        return `${Math.floor(diffInMinutes)}분 전`;
    }

    // Less than 24 hours ago
    if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)}시간 전`;
    }

    // More than 24 hours ago - show MM.DD format
    return format(localDate, 'MM.dd', { timeZone: getClientTimeZone() });
};


export default NovelList;