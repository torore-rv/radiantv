import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import pool from '@lib/db';

interface FanfictionRow {
    id: string;
    original_id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
    no: number;
    created_at: Date;
    original_title: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { tag } = req.query;
            let query = `
                SELECT
                    f.id,
                    f.original_id,
                    f.name,
                    f.summary,
                    f.tag,
                    f.description,
                    e.no,
                    e.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul' AS created_at,
                    o.title as original_title
                FROM fanfiction f
                         LEFT OUTER JOIN original o ON f.original_id = o.id
                         LEFT OUTER JOIN episode e ON f.id = e.fanfiction_id  -- episode 테이블 추가
            `;

            // 파라미터 배열 초기화
            let params: any[] = [];

            // tag가 있는 경우 추가 조건 처리
            if (tag) {
                query += `
                    LEFT OUTER JOIN tag t ON f.id = t.fanfiction_id
                    WHERE t.label = $1  -- tag 조건 추가
                `;
                params.push(tag); // tag를 파라미터에 추가
            } else {
                query += `WHERE 1=1`; // tag가 없는 경우 기본 조건 추가 (빈 WHERE 처리)
            }

            // episode의 최신 no 가져오기
                query += `
                    AND e.no = (SELECT MAX(no) FROM episode WHERE fanfiction_id = f.id)  -- 최신 에피소드만 선택
                    ORDER BY o.title, f.name ASC
            `;

            // 쿼리 실행 시 파라미터 전달
            const result = await pool.query(query, params);
            const groupedData = result.rows.reduce((acc: { [key: string]: { originalTitle: string; novels: any[] } }, row: FanfictionRow) => {
                const { original_id, original_title, ...novelData } = row;
                if (!acc[original_id]) {
                    acc[original_id] = {
                        originalTitle: original_title,
                        novels: []
                    };
                }
                acc[original_id].novels.push(novelData);
                return acc;
            }, {});

            res.status(200).json(groupedData);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else if (req.method === 'POST') {
        const { original_id, name, summary, tag, description } = req.body;
        const created_at = new Date();

        try {
            const id = uuidv4(); // 새로운 고유 ID 생성
            const result = await pool.query(
                'INSERT INTO fanfiction (id, original_id, name, summary, tag, description, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [id, original_id, name, summary, tag, description, created_at]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'Failed to create fanfiction entry' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}