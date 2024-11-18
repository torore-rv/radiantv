import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import NovelLayout from "@/styles/NovelLayout";
import { textToHTML } from '@/styles/NovelStyle';

const Episode = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('○○');
    const [content, setContent] = useState<string>('');
    const { fanfiction_id, no } = router.query; // URL에서 파라미터 가져오기

    useEffect(() => {
        // localStorage에서 name을 가져오고 상태에 설정
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            console.log("localStorage에서 읽은 name: ", savedName); // localStorage에서 읽은 값 출력
            setName(savedName);
        } else {
            console.log("localStorage에 저장된 userName이 없음");
        }
    }, []);

    useEffect(() => {
        const fetchEpisode = async () => {
            if (fanfiction_id && no) {
                try {
                    const response = await fetch(`/api/episode?fanfiction_id=${fanfiction_id}&no=${no}`);
                    const data = await response.json();
                    if (response.ok) {
                        // console.log("DB에서 받은 데이터: ", data); // DB에서 받은 전체 데이터 출력

                        // DB에서 받은 content 내에서 '○○'를 localStorage의 userName으로 교체
                        const savedName = localStorage.getItem('userName');
                        let updatedContent = data.content;
                        if (savedName) {
                            // '○○'를 savedName으로 교체 (전체 문자열에서)
                            updatedContent = updatedContent.replace(/○○/g, savedName); // 정규 표현식으로 모든 "○○"를 교체
                        }

                        // 교체된 content 상태 업데이트
                        setContent(updatedContent);

                        // DB에서 받은 name을 localStorage에 저장
                        if (data.name) {
                            localStorage.setItem('userName', data.name);
                            // console.log("새로운 name이 localStorage에 저장됨: ", data.name);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching episode:', error);
                }
            }
        };

        fetchEpisode();
    }, [fanfiction_id, no]);  // savedName을 의존성 배열에서 제거 (이제 더 이상 필요 없음)

    const goBack = () => {
        router.push('/EpisodeList').then(() => {
            console.log(`뒤로가기 ${name}`);
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