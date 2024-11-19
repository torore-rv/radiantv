import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Search from "@/components/Search";  // 직접 import로 변경

const NovelList = dynamic(() => import("./NovelList"));
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
            <NovelList filterTags={filterTags} searchQuery={searchQuery} />
        </div>
    );
};

export default NovelLayout;