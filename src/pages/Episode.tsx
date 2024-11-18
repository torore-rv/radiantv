import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NovelLayout from "@/styles/NovelLayout";
import { textToHTML } from "@/styles/NovelStyle";

const Episode = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("○○");
    const [content, setContent] = useState<string>("");
    const { fanfiction_id, no, episodeName } = router.query; // 'episodeName'을 추가로 가져옴

    useEffect(() => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            setName(savedName);
        }
    }, []);

    useEffect(() => {
        const fetchEpisode = async () => {
            if (fanfiction_id && no) {
                try {
                    const response = await fetch(`/api/episode?fanfiction_id=${fanfiction_id}&no=${no}`);
                    const data = await response.json();
                    if (response.ok) {
                        const savedName = localStorage.getItem("userName");
                        let updatedContent = data.content;
                        if (savedName) {
                            updatedContent = updatedContent.replace(/○○/g, savedName);
                        }
                        setContent(updatedContent);

                        if (data.name) {
                            localStorage.setItem("userName", data.name);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching episode:", error);
                }
            }
        };

        fetchEpisode();
    }, [fanfiction_id, no]);

    const goBack = () => {
        router.replace(
            `/EpisodeList?fanfiction_id=${fanfiction_id}&name=${episodeName}`, // 'episodeName'을 사용
            undefined,
            { shallow: true }
        ).then(() => {
            console.log("뒤로가기");
        });
    };

    return (
        <NovelLayout onGoBack={goBack}>
            <div className="novel">
                {textToHTML(content)} {/* 교체된 content 출력 */}
            </div>
        </NovelLayout>
    );
};

export default Episode;