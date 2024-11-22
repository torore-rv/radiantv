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


const NovelShort: React.FC<NovelListProps> = ({ filterTags, searchQuery }) => {
    const [novels, setNovels] = useState<GroupedData>({});

    // useEffect(() => {
    //     const fetchNovels = async () => {
    //         try {
    //             const params = new URLSearchParams();
    //             if (searchQuery) {
    //                 params.append('query', searchQuery);
    //             }
    //             if (filterTags.length > 0) {
    //                 params.append('tag', filterTags[0]);
    //             }
    //
    //             const response = await fetch(`/api/fanfiction?${params}`);
    //             const data = await response.json();
    //             setNovels(data);
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     };
    //
    //     fetchNovels();
    // }, [filterTags, searchQuery]);

    return (
        <>
            <div className="original-work">
                <div className="original-title">
                    어쩌다보니 시리즈 단편
                    <span className="work-count">
                        {/*{Array.isArray(group.novels) ? group.novels.length : 0} */}
                        1 작품
                    </span>
                </div>
                <div className="novel-list">
                    <div className="novel-item">
                        <div className="novel-title">
                            도쿄 리벤저스
                        </div>
                        <div className="novel-info">
                            <span title="<범천> 카쿠쵸">위험한 남자인 걸 알아도</span><span className="dot-divider">·</span>
                            <span title="<범천> 하이타니 란">위험한 여자인 걸 알아도</span>
                                <span className="dot-divider">│</span>
                            <span title="하이타니 란">그 때까지는 나랑 계속 함께야</span><span className="dot-divider">·</span>
                            <span title="하이타니 린도">그 때까지는 너와 계속 함께야</span>
                            <span className="dot-divider">│</span>
                            <span title="사노 신이치로">내게 필요한 건</span><span className="dot-divider">·</span>
                            <span title="이마우시 와카사">당신에게 필요한 건</span>
                        </div>
                        <div className="tags">
                            <span className="tag">카쿠쵸</span>
                            <span className="tag">하이타니 란</span>
                            <span className="tag">하이타니 린도</span>
                            <span className="tag">사노 신이치로</span>
                            <span className="tag">이마우시 와카사</span>
                        </div>
                    </div>
                    <div className="novel-item">
                        <div className="novel-title">
                            주술회전
                        </div>
                        <div className="novel-info">
                            <span title="나나미 켄토">사심이 있는 남자</span><span className="dot-divider">·</span>
                            <span title="젠인 나오야">계획이 있는 남자</span>
                        </div>
                        <div className="tags">
                            <span className="tag">나나미 켄토</span>
                            <span className="tag">젠인 나오야</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="original-work">
                <div className="original-title">
                    단편
                    <span className="work-count">
                        {/*{Array.isArray(group.novels) ? group.novels.length : 0} */}
                        1 작품
                    </span>
                </div>
                <div className="novel-list">
                    <div className="novel-item">
                        <div className="novel-title">
                            귀멸의 칼날
                        </div>
                        {/*<div className="novel-summary">요약</div>*/}
                        <div className="novel-info">
                            <span title="토미오카 기유">연어무조림을 좋아하게 된 이유</span>
                            <span className="dot-divider">·</span>
                            <span title="시나즈가와 사네미, 토미오카 기유(if)">잊을 수 없는 일</span>
                            <span className="dot-divider">·</span>
                            <span title="렌고쿠 코쥬로">별이 된 약속</span>
                            <span className="dot-divider">·</span>
                            <span title="[귀멸학원AU] 사비토">한여름밤의 꿈</span>
                        </div>
                        <div className="tags">
                            <span className="tag">토미오카 기유</span>
                            <span className="tag">시나즈가와 사네미</span>
                            <span className="tag">렌고쿠 코쥬로</span>
                            <span className="tag">사비토</span>
                        </div>
                    </div>
                    <div className="novel-item">
                        <div className="novel-title">
                            명탐정 코난
                        </div>
                        <div className="novel-info">
                            <span title="아무로 토오루">이니셜 A & T</span>
                            <span className="dot-divider">·</span>
                            <span title="아무로 토오루, 오키야 스바루">Dessert</span>
                        </div>
                        <div className="tags">
                            <span className="tag">아무로 토오루</span>
                            <span className="tag">오키야 스바루</span>
                        </div>
                    </div>
                    <div className="novel-item">
                        <div className="novel-title">
                            최유기
                        </div>
                        <div className="novel-info">
                            <span title="오곡">어른의 위로 방법</span>
                        </div>
                        <div className="tags">
                            <span className="tag">오곡</span>
                        </div>
                    </div>
                </div>
            </div>
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


export default NovelShort;