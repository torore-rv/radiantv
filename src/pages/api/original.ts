import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import pool from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // original 테이블에서 모든 데이터를 조회
            const result = await pool.query('SELECT * FROM original');
            console.log("Fetched data from DB:", result.rows);  // 데이터 확인
            res.status(200).json(result.rows);  // 조회된 데이터를 JSON으로 반환
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch original data' });
        }
    } else if (req.method === 'POST') {
        // 클라이언트에서 보낸 데이터 받기
        const { title, simple, description } = req.body;
        const created_at = new Date();

        try {
            const result = await pool.query(
                'INSERT INTO original (id, title, simple, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [uuidv4(), title, simple, description, created_at]
            );
            res.status(201).json(result.rows[0]);  // 생성된 데이터 반환
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'Failed to create original entry' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
