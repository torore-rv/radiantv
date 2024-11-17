import React from "react";


type NovelItemProps = {
    id: String;
    title: string;
    summary: string;
    status: string;
    episodeCount: number;
    updateTime: string;
    tags: string[];
    views: number;
    recommendations: number;
    comments: number;
};

const Novel = ({
                       id,
                       title,
                       summary,
                       status,
                       episodeCount,
                       updateTime,
                       tags,
                       views,
                       recommendations,
                       comments,
                   }: NovelItemProps) => {
    return (
        <div className="novel-item">
            <h2>{id} : {title}</h2>
            <p>{summary}</p>
            <p>
                {status} - {episodeCount ? `${episodeCount}화` : updateTime}
            </p>
            <div>{tags.map((tag, index) => <span key={index}>{tag}</span>)}</div>
            <p>조회: {views}, 추천: {recommendations}, 댓글: {comments}</p>
        </div>
    );
};

export default Novel;