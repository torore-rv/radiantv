import { useEffect, useState } from 'react';

export default function Home() {
    const [todayVisitors, setTodayVisitors] = useState<number>(0);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        // sessionStorage에서 sessionId 가져오기
        let sessionId = sessionStorage.getItem('sessionId');

        if (!sessionId) {
            // sessionId가 없으면 새로 생성해서 sessionStorage에 저장
            sessionId = generateSessionId();
            sessionStorage.setItem('sessionId', sessionId);
        }

        // sessionId 상태 업데이트
        setSessionId(sessionId);

        // 방문 카운트 가져오기 및 업데이트
        fetchVisitCounts(sessionId);
        updateVisitCount(sessionId);
    }, []);

    // 세션 ID 생성 함수
    const generateSessionId = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    // 방문 카운트 가져오기 (서버에서)
    const fetchVisitCounts = async (sessionId: string) => {
        try {
            const response = await fetch('/api/visit', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'session-id': sessionId, // 세션 ID를 헤더에 추가
                },
            });

            const data = await response.json();
            setTodayVisitors(data.todayVisitors);
            setTotalVisitors(data.totalVisitors);
        } catch (error) {
            console.error('Error fetching visit counts:', error);
        }
    };

    // 방문 카운트 업데이트 (서버에 세션 ID와 함께 보내기)
    const updateVisitCount = async (sessionId: string) => {
        try {
            await fetch('/api/visit', {
                method: 'POST',
                body: JSON.stringify({ sessionId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Visit count updated');
        } catch (error) {
            console.error('Error updating visit count:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="visitor-item">
                <span className="visitor-label">Today:</span>
                <span className="visitor-value">{todayVisitors}</span>
                <span className="visitor-label">Total:</span>
                <span className="visitor-value">{totalVisitors}</span>
            </div>
        </div>
    );
}
