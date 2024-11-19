import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface EpisodeDesc {
    no: number;
    originalTitle: string;
    description: string;
}

const EpisodeList = () => {
    const router = useRouter();
    const { fanfiction_id, name: episodeName } = router.query;
    const [episodes, setEpisodes] = useState<EpisodeDesc[]>([]); // Initialize as an empty array of EpisodeDesc

    useEffect(() => {
        if (fanfiction_id) {
            const fetchEpisodes = async () => {
                try {
                    const response = await fetch(`/api/episodeList?fanfiction_id=${fanfiction_id}`);
                    const data = await response.json();
                    // console.log("Fetched data:", data);

                    // Assuming the API returns data in the expected structure
                    setEpisodes(data.episodes);
                } catch (error) {
                    console.error("Error fetching episodes:", error);
                }
            };

            fetchEpisodes();
        }
    }, [fanfiction_id]);

    if (!fanfiction_id || !episodeName) {
        return <div>로딩 중...</div>;
    }

    const goToNovelLayout = () => {
        router.push("/NovelLayout"); // Navigate to the NovelLayout page
    };

    return (
        <div className="novel">
            <div className="title">{episodeName}</div> {/* Display the episode name */}

            <div className="episodes">
                {/* Loop through the grouped data */}
                {Object.keys(episodes).map((key) => {
                    const group = episodes[parseInt(key)];
                    return (
                        <div key={key} className="group">
                            <h3>{group.originalTitle}</h3>
                            <div className="novels">
                                <div key={group.no} className="episode">
                                    <Link
                                        href={{
                                            pathname: '/Episode',
                                            query: { fanfiction_id: fanfiction_id, no: group.no, episodeName },
                                        }}
                                    >
                                        {group.description ? (
                                            `${group.description}화`
                                        ) : (
                                            `${group.no}화`
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

            <br /><br />

            <button
                onClick={goToNovelLayout}
                className="button-common"
                style={{ color: 'white' }}
            >
                목록
            </button>
        </div>
    );
};

export default EpisodeList;
