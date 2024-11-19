import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@lib/db';

interface Episode {
    no: number;
    description: string;  // Corrected 'String' to 'string' for TypeScript type
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { fanfiction_id } = req.query;

            if (!fanfiction_id) {
                return res.status(400).json({ error: 'fanfiction_id is required' });
            }

            // Fetch both 'no' and 'description' from the database
            const query = `
                SELECT no, description
                FROM episode
                WHERE fanfiction_id = $1
                ORDER BY no
            `;

            const result = await pool.query(query, [fanfiction_id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No episodes found for this fanfiction' });
            }

            // Map the result to include both the 'no' and 'description'
            const episodes = result.rows.map((row: Episode) => ({
                no: row.no,
                description: row.description,
            }));

            // Send the response with both the episode number and description
            res.status(200).json({ episodes });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch episodes' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}