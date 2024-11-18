import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@lib/db';

interface Episode {
    no: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { fanfiction_id } = req.query;

            if (!fanfiction_id) {
                return res.status(400).json({ error: 'fanfiction_id is required' });
            }

            const query = `
                SELECT no
                FROM episode
                WHERE fanfiction_id = $1
                ORDER BY no
            `;

            const result = await pool.query(query, [fanfiction_id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No episodes found for this fanfiction' });
            }

            const episodeNumbers = result.rows.map((row: Episode) => row.no); // 타입 정의 추가
            res.status(200).json({ episodes: episodeNumbers });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch episodes' });
        }
    }
}
