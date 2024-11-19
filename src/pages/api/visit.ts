import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@lib/db';
import { VisitResponse } from '@/interfaces/types';

// 방문 카운트를 업데이트하거나 가져오는 API
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<VisitResponse>
) {
    const { sessionId } = req.body;

    if (req.method === 'GET') {
        // sessionId가 없는 경우 - 방문자 수만 반환
        if (!sessionId) {
            try {
                // 오늘 방문한 사람 수 (한국 시간 기준)
                const todayVisitorsResult = await pool.query(
                    `SELECT COUNT(*)
                     FROM visit
                     WHERE last_visited::date = 
                           (now() AT TIME ZONE 'Asia/Seoul')::date;`
                );
                const todayVisitors = parseInt(todayVisitorsResult.rows[0].count, 10);

                // 총 방문자 수
                const totalVisitorsResult = await pool.query('SELECT COUNT(*) FROM visit');
                const totalVisitors = parseInt(totalVisitorsResult.rows[0].count, 10);

                res.status(200).json({ todayVisitors, totalVisitors });
            } catch (error) {
                console.error('Error fetching visit counts:', error);
                res.status(500).json({ error: 'Failed to fetch visit counts' });
            }
        }
        // sessionId가 있는 경우 - 오늘 방문했는지 확인
        else {
            try {
                // 세션 ID로 오늘 방문 여부 확인 (한국 시간 기준)
                const visitResult = await pool.query(
                    `SELECT COUNT(*) 
                     FROM visit 
                     WHERE session_id = $1
                       AND (last_visited AT TIME ZONE 'Asia/Seoul')::date = 
                           (now() AT TIME ZONE 'Asia/Seoul')::date`,
                    [sessionId]
                );

                const visitedToday = parseInt(visitResult.rows[0].count, 10) > 0;

                // 오늘 방문자 수와 총 방문자 수도 함께 반환
                const todayVisitorsResult = await pool.query(
                    `SELECT COUNT(DISTINCT session_id)
                     FROM visit
                     WHERE (last_visited AT TIME ZONE 'Asia/Seoul')::date = 
                           (now() AT TIME ZONE 'Asia/Seoul')::date;`
                );
                const todayVisitors = parseInt(todayVisitorsResult.rows[0].count, 10);

                const totalVisitorsResult = await pool.query(
                    'SELECT COUNT(DISTINCT session_id) FROM visit'
                );
                const totalVisitors = parseInt(totalVisitorsResult.rows[0].count, 10);

                res.status(200).json({ visitedToday, todayVisitors, totalVisitors });
            } catch (error) {
                console.error('Error checking visit for session:', error);
                res.status(500).json({ error: 'Failed to check visit for session' });
            }
        }
    }

    // POST 요청: 방문 카운트 업데이트
    if (req.method === 'POST') {
        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        try {
            const visitedToday = await isVisitedToday(sessionId);

            if (visitedToday) {
                return res.status(200).json({ message: 'Already visited today' });
            }

            await incrementVisitCount(sessionId);

            // 업데이트된 방문자 수 반환
            const todayVisitorsResult = await pool.query(
                `SELECT COUNT(DISTINCT session_id)
                 FROM visit
                 WHERE (last_visited AT TIME ZONE 'Asia/Seoul')::date = 
                       (now() AT TIME ZONE 'Asia/Seoul')::date;`
            );
            const todayVisitors = parseInt(todayVisitorsResult.rows[0].count, 10);

            const totalVisitorsResult = await pool.query(
                'SELECT COUNT(DISTINCT session_id) FROM visit'
            );
            const totalVisitors = parseInt(totalVisitorsResult.rows[0].count, 10);

            res.status(200).json({
                message: 'Visit count updated successfully',
                todayVisitors,
                totalVisitors
            });
        } catch (error) {
            console.error('Error updating visit count:', error);
            res.status(500).json({ error: 'Failed to update visit count' });
        }
    }
}

// 오늘 방문했는지 확인하는 함수 (한국 시간 기준)
async function isVisitedToday(sessionId: string): Promise<boolean> {
    const result = await pool.query(
        `SELECT last_visited
         FROM visit
         WHERE session_id = $1
           AND (last_visited AT TIME ZONE 'Asia/Seoul')::date = 
               (now() AT TIME ZONE 'Asia/Seoul')::date`,
        [sessionId]
    );
    return result.rows.length > 0;
}

// 방문 카운트 업데이트 함수
async function incrementVisitCount(sessionId: string): Promise<void> {
    const currentCount = await getVisitCount(sessionId);

    if (currentCount === 0) {
        // 방문 기록이 없다면 새로 삽입 (한국 시간으로 저장)
        await pool.query(
            `INSERT INTO visit (session_id, visit_count, last_visited)
             VALUES ($1, 1, timezone('Asia/Seoul', now()))`,
            [sessionId]
        );
    } else {
        // 방문 기록이 있으면 방문 횟수만 증가 (한국 시간으로 업데이트)
        await pool.query(
            `UPDATE visit
             SET visit_count = visit_count + 1, 
                 last_visited = timezone('Asia/Seoul', now())
             WHERE session_id = $1`,
            [sessionId]
        );
    }
}

// 방문 횟수를 가져오는 함수
async function getVisitCount(sessionId: string): Promise<number> {
    const result = await pool.query(
        'SELECT visit_count FROM visit WHERE session_id = $1',
        [sessionId]
    );
    return result.rows[0]?.visit_count || 0;
}