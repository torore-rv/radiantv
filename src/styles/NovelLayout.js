import React from 'react';

const NovelLayout = ({ children, onGoBack }) => {
    return (
        <div className="select-none max-w-4xl mx-auto">
            <div className="min-h-screen p-8 bg-[#F0F7F4]">
                <div className="whitespace-pre-wrap">
                    {children}
                </div>
                <div className="navigation mt-8">
                    <button
                        onClick={onGoBack}
                        className="back-button text-lg font-[NanumMyeongjoExtraBold]"
                    >
                        뒤로가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NovelLayout;