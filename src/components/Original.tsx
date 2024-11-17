import React from "react";
import Novel from "@/components/Novel";
import {v4 as uuidv4} from "uuid";  // 컴포넌트 불러오기

type Novel = {
    title: string;
    simple: string;
    description: string;
};

type OriginalWorkProps = {
    title: string;
    totalCount: number;
    novels: Novel[];  // novels는 Novel 타입의 배열입니다.
};

const Original = ({ title, totalCount, novels }: OriginalWorkProps) => {
    return (
        <div className="original-work">
            <div className="original-title p-4">
                {title}
                <span className="work-count">총 {totalCount}편</span>
            </div>
            <div className="novel-list">
                {novels.map((novel, index) => (
                    <div key={index} className="novel-item">
                        <h3>{novel.title}</h3>
                        <p>{novel.simple}</p>
                        <p>{novel.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Original;