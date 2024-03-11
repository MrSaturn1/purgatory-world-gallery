import dotenv from 'dotenv';

export default async function handler(req, res) {
    const printfulApiKey = process.env.PRINTFUL_API_KEY;
    if (!printfulApiKey) {
        return res.status(500).json({ error: 'Printful API key is not set.' });
    }

    // Set up options for Printful API request
    const options = {
        method: 'GET', // or 'POST', depending on the operation
        headers: {
            'Authorization': `Bearer ${printfulApiKey}`,
            'Content-Type': 'application/json'
        },
        // Include body if necessary for POST requests
    };

    // Example API request to Printful (modify the URL and options as needed)
    try {
        const printfulResponse = await fetch('https://api.printful.com/store/products', options);
        const data = await printfulResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Printful' });
    }
}
