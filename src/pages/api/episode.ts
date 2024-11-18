import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { fanfiction_id, no } = req.query;

            const query = `
                SELECT content
                FROM episode
                WHERE episode.fanfiction_id = $1
                AND no = $2
            `;

            const result = await pool.query(query, [fanfiction_id, no]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Episode not found' });
            }

            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch episode' });
        }
    }
}