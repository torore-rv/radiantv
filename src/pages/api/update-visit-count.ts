import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Process the visit count using the session ID
        // Example: Update the visit count in your database using sessionId

        // Send a response back
        res.status(200).json({ message: 'Visit count updated successfully' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}