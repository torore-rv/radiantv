import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Search from "@/components/Search";
import NovelLong from "@pages/NovelLong";  // 직접 import로 변경

const NovelList = dynamic(() => import("./NovelLong"));
const NameChange = dynamic(() => import("@pages/NameChange"));

interface NovelLayoutProps {}

const NovelLayout: React.FC<NovelLayoutProps> = () => {
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleTagChange = (tags: string[]) => {
        setFilterTags(tags);
    };

    const handleSearchSubmit = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Search onTagChange={handleTagChange} onSearchSubmit={handleSearchSubmit} />
            <NovelLong filterTags={filterTags} searchQuery={searchQuery} />
        </div>
    );
};

export default NovelLayout;