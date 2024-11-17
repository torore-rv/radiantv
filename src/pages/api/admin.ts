import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import pool from '@lib/db'; // 절대경로로 db.ts 가져오기

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { type } = req.body;

    try {
        switch (type) {
            case 'original':
                await handleOriginal(req, res);
                break;
            case 'fanfiction':
                await handleFanfiction(req, res);
                break;
            default:
                res.status(400).json({ message: 'Invalid type' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleOriginal(req: NextApiRequest, res: NextApiResponse) {
    const { title, simple, description } = req.body;
    const id = uuidv4();
    const created_at = new Date().toISOString();

    await pool.query(
        'INSERT INTO original (id, title, simple, description, created_at) VALUES ($1, $2, $3, $4, $5)',
        [id, title, simple, description, created_at]
    );

    res.status(200).json({ message: 'Original created successfully', id });
}

async function handleFanfiction(req: NextApiRequest, res: NextApiResponse) {
    const { original_id, name, summary, tag, description } = req.body;
    const id = uuidv4();
    const created_at = new Date().toISOString();

    await pool.query(
        'INSERT INTO fanfiction (id, original_id, name, summary, tag, description, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, original_id, name, summary, tag, description, created_at]
    );

    res.status(200).json({ message: 'Fanfiction created successfully', id });
}