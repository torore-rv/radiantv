import React from "react";
import Link from "next/link";

const EpisodeList = () => {

    return (
        <>
            <div className="novel">
                <div className="title">제 목소리를 들어주세요</div>
                <div className="episodes">
                    <span className="episode">
                        <Link href="/Episode">1화</Link>
                    </span>
                    <span className="episode">
                        <Link href="/Episode">2화</Link>
                    </span>
                    <span className="episode">
                        <Link href="/Episode">3화</Link>
                    </span>
                </div>

            <br /><br />

            <div className="navigation">
                <Link href="/NovelLayout" className="home-button">목록</Link>
            </div>
            </div>
        </>
    );
};

export default EpisodeList;