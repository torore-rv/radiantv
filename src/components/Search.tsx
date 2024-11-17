import React, { useState } from 'react';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="검색어를 입력하세요..."
            />
            {/* 태그 필터링 또는 추가적인 검색 옵션을 여기에 추가할 수 있습니다 */}
            <div className="filter-tags">
                {/* 예시로 필터 태그가 표시됩니다 */}
                <span className="tag">Tag1</span>
                <span className="tag">Tag2</span>
            </div>
        </div>
    );
};

export default Search;