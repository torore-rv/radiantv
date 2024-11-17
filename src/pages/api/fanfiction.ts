import { NextApiRequest, NextApiResponse } from 'next'; // Next.js API request/response types
import { v4 as uuidv4 } from 'uuid';
import pool from '@lib/db'; // 절대경로로 db.ts 가져오기

interface FanfictionRow {
    id: string;
    original_id: string;
    name: string;
    summary: string;
    tag: string;
    description: string;
    created_at: Date;
    original_title: string; // original_title이 있을 경우
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
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
    } else if (req.method === 'GET') {
        try {
            const query = `
                SELECT f.id, f.original_id, f.name, f.summary, f.tag, f.description, f.created_at, o.title as original_title
                FROM fanfiction f
                         JOIN original o ON f.original_id = o.id
                ORDER BY o.title, f.name ASC
            `;
            const result = await pool.query(query);

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'No fanfiction found' });
            } else {
                // original_id로 그룹화
                const groupedData = result.rows.reduce((acc: any, row: FanfictionRow) => {
                    const { original_id, original_title, ...fanfictionData } = row;

                    if (!acc[original_id]) {
                        acc[original_id] = {
                            originalTitle: original_title,
                            novels: []
                        };
                    }

                    acc[original_id].novels.push(fanfictionData);
                    return acc;
                }, {});

                res.status(200).json(groupedData);
            }
        } catch (error) {
            console.error('Error fetching fanfiction:', error);
            res.status(500).json({ error: 'Failed to fetch fanfiction data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}