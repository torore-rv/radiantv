import React, { useState } from 'react';

const NameChange: React.FC = () => {
    // 상태 관리 (useState 사용)
    const [name, setName] = useState<string>('');

    // 이름 변경 핸들러
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value); // 상태 업데이트
    };

    // 이름 저장 핸들러
    const handleSave = () => {
        console.log('Saved name:', name);
    };

    return (
        <div className="name-change-container">
            <div className="name-change-header">
                <span className="icon">✏️</span>
                <h2 className="title">Name Change</h2>
            </div>
            <div className="divider" />
            <div className="input-container">
                <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    value={name}
                    onChange={handleNameChange}
                    className="name-input"
                />
                <button onClick={handleSave} className="save-button">
                    이름 저장
                </button>
            </div>
        </div>
    );
};

export default NameChange;