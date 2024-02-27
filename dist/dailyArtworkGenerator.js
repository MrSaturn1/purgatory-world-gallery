import fs from 'fs';
import path from 'path';
import axios from 'axios';
import generateArt from './pages/utils/generateArt';
async function saveImageToLocalFolder(imageUrl, filename, folderPath) {
    const response = await axios({ url: imageUrl, responseType: 'stream' });
    const fullPath = path.join(folderPath, filename);
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(fullPath))
            .on('finish', () => resolve(fullPath))
            .on('error', (error) => reject(error));
    });
}
export async function dailyArtworkGenerator() {
    try {
        const artworkDetails = await generateArt();
        if (artworkDetails && artworkDetails.imageUrl) {
            // Define the folder where you want to save the images
            const artFolderPath = path.join(__dirname, '..', 'art');
            // Ensure the directory exists
            if (!fs.existsSync(artFolderPath)) {
                fs.mkdirSync(artFolderPath, { recursive: true });
            }
            // Define a filename for the artwork
            const filename = `Artwork_${Date.now()}.jpg`; // Adjust the extension based on the image format
            // Save the image to the folder
            const savedPath = await saveImageToLocalFolder(artworkDetails.imageUrl, filename, artFolderPath);
            console.log(`New artwork saved at: ${savedPath}`);
        }
        else {
            console.log('Artwork generation failed or returned incomplete details.');
        }
    }
    catch (error) {
        console.error('Error generating or saving artwork:', error);
    }
}
