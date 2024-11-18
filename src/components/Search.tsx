import React, { useState } from "react";

interface SearchProps {
    onTagChange: (tags: string[]) => void;
    onSearchSubmit: (searchQuery: string) => void;
}

const Search = ({ onTagChange, onSearchSubmit }: SearchProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleTagClick = (tag: string) => {
        setSearchInput(""); // 태그 클릭시 검색어 초기화
        const newTags = selectedTags.includes(tag)
            ? []  // 이미 선택된 태그면 제거
            : [tag];  // 새로운 태그 선택

        setSelectedTags(newTags);
        onTagChange(newTags);
    };

    const handleSearchSubmit = () => {
        // 검색어를 tag로 전달
        if (searchInput) {
            onTagChange([searchInput]);
            setSelectedTags([]);  // 검색 시 선택된 태그 초기화
        }
        onSearchSubmit(searchInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className="search-container">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="search-input flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="검색어를 입력하세요..."
                />
                <button
                    onClick={handleSearchSubmit}
                    className="save-button py-2 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    검색
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                ※ 태그는 하나만 검색해주세요
            </div>
        </div>
    );
};

export default Search;