import React, { useState, useEffect } from 'react';

const NameChange: React.FC = () => {
    const [name, setName] = useState<string>('○○');

    useEffect(() => {
        // 초기 로드시 저장된 이름 가져오기
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        if (name.trim()) {
            try {
                localStorage.setItem('userName', name.trim());
                alert('이름이 저장되었습니다!');
            } catch (error) {
                console.error('Error saving name:', error);
                alert('이름 저장에 실패했습니다.');
            }
        } else {
            alert('이름을 입력해주세요.');
        }
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
                <button
                    onClick={handleSave}
                    className="save-button"
                    disabled={!name.trim()}
                >
                    이름 저장
                </button>
            </div>
        </div>
    );
};

export default NameChange;