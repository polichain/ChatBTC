import { NextApiRequest, NextApiResponse } from 'next';

// API handler function for creating an invoice
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { amount } = req.body;

    // Validate the 'amount' parameter
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount specified. Amount must be a positive number.' });
    }

    try {
        // Simulate invoice creation (replace this with actual Lightspark or other payment integration)
        const invoice = { lnurl: 'https://lightning.url/example' }; // Mock invoice URL

        // Send back the invoice as a JSON response
        return res.status(200).json(invoice);
    } catch (error) {
        console.error('Error generating invoice:', error);

        // Send a generic error response with status 500
        return res.status(500).json({ error: 'Failed to generate invoice. Please try again later.' });
    }
}
