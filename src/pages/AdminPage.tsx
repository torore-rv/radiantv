import React, { useState } from 'react';

interface OriginalForm {
    title: string;
    simple: string;
    description: string;
}

interface FanfictionForm {
    original_id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
}

const AdminPage = () => {
    const [originalForm, setOriginalForm] = useState<OriginalForm>({
        title: '',
        simple: '',
        description: ''
    });

    const [fanfictionForm, setFanfictionForm] = useState<FanfictionForm>({
        original_id: '',
        name: '',
        summary: '',
        tag: '',
        description: ''
    });

    const handleOriginalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'original',
                    ...originalForm
                }),
            });

            if (response.ok) {
                alert('Original 작품이 등록되었습니다.');
                setOriginalForm({ title: '', simple: '', description: '' });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('등록 중 오류가 발생했습니다.');
        }
    };

    const handleFanfictionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'fanfiction',
                    ...fanfictionForm
                }),
            });

            if (response.ok) {
                alert('Fanfiction이 등록되었습니다.');
                setFanfictionForm({
                    original_id: '',
                    name: '',
                    summary: '',
                    tag: '',
                    description: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>관리자 페이지</h1>

            <div style={{ marginBottom: '40px' }}>
                <h2>Original 작품 등록</h2>
                <form onSubmit={handleOriginalSubmit}>
                    <div>
                        <label>
                            제목:
                            <input
                                type="text"
                                value={originalForm.title}
                                onChange={(e) => setOriginalForm({
                                    ...originalForm,
                                    title: e.target.value
                                })}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            간단 설명:
                            <input
                                type="text"
                                value={originalForm.simple}
                                onChange={(e) => setOriginalForm({
                                    ...originalForm,
                                    simple: e.target.value
                                })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            상세 설명:
                            <textarea
                                value={originalForm.description}
                                onChange={(e) => setOriginalForm({
                                    ...originalForm,
                                    description: e.target.value
                                })}
                            />
                        </label>
                    </div>
                    <button type="submit">Original 등록</button>
                </form>
            </div>

            <div>
                <h2>Fanfiction 등록</h2>
                <form onSubmit={handleFanfictionSubmit}>
                    <div>
                        <label>
                            Original ID:
                            <input
                                type="text"
                                value={fanfictionForm.original_id}
                                onChange={(e) => setFanfictionForm({
                                    ...fanfictionForm,
                                    original_id: e.target.value
                                })}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            제목:
                            <input
                                type="text"
                                value={fanfictionForm.name}
                                onChange={(e) => setFanfictionForm({
                                    ...fanfictionForm,
                                    name: e.target.value
                                })}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            요약:
                            <input
                                type="text"
                                value={fanfictionForm.summary}
                                onChange={(e) => setFanfictionForm({
                                    ...fanfictionForm,
                                    summary: e.target.value
                                })}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            태그 (콤마로 구분):
                            <input
                                type="text"
                                value={fanfictionForm.tag}
                                onChange={(e) => setFanfictionForm({
                                    ...fanfictionForm,
                                    tag: e.target.value
                                })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            상세 설명:
                            <textarea
                                value={fanfictionForm.description}
                                onChange={(e) => setFanfictionForm({
                                    ...fanfictionForm,
                                    description: e.target.value
                                })}
                            />
                        </label>
                    </div>
                    <button type="submit">Fanfiction 등록</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;