import React from 'react';

export default function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1 className="profile-title">TORORE (토로레, T양)</h1>

                <div className="profile-section">
                    <div className="profile-item">
                        <span className="label">Like</span>
                        <span className="text">2차 / 드림 / 노멀커플링(헤테로러브, HL)</span>
                    </div>

                    <div className="profile-item">
                        <span className="label">Email</span>
                        <span className="text">ptororez@gmail.com</span>
                    </div>

                    <div className="profile-item">
                        <span className="label">Blog</span>
                        <a
                            href="https://radiantv.tistory.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-link"
                        >
                            T양의 블로그
                        </a>
                    </div>

                    <div className="profile-item">
                        <span className="label">Q & A</span>
                        <a
                            href="https://moaform.com/q/soDSlQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-link"
                        >
                            익명함
                        </a> (답변은 블로그에 올라옵니다.)
                    </div>

                    <div className="profile-item">
                        <span className="label">Home</span>
                        <span className="text">https://radiantv.vercel.app</span>
                    </div>
                </div>

                <div className="warning-message">
                    ※ 키워드가 괜찮으신 분들만 읽어주세요. 읽은 후, 불만은 책임지지 않습니다.
                </div>
            </div>
        </div>
    );
}