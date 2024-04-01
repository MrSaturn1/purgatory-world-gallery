import dotenv from 'dotenv';

export default async function handler(req, res) {
    const printfulApiKey = process.env.PRINTFUL_API_KEY;
    if (!printfulApiKey) {
        return res.status(500).json({ error: 'Printful API key is not set.' });
    }

    const bodyData = {
        // Example body data structure
        // Replace this with the actual data structure required by Printful API for the action you're performing
        name: "Custom T-Shirt",
        files: [{
            url: "https://example.com/path/to/your/artwork.jpg", // URL of your artwork
            type: "default"
        }],
        // Additional product details as required by the Printful endpoint
    };

    // Set up options for Printful API request
    const options = {
        method: 'POST', // or 'POST', depending on the operation
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
