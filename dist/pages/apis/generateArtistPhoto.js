// import OpenAI from 'openai';
// const openai = new OpenAI();
import { openaiClientPromise } from '../utils/openaiClient';
let openai;
async function init() {
    openai = await openaiClientPromise;
}
async function generateArtistPhoto(biography) {
    if (!openai) {
        throw new Error("OpenAI client is not initialized.");
    }
    try {
        console.log(biography);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate a realistic, plain photo of this artist: ${biography}`,
            n: 1,
            size: "1024x1024"
        });
        if (response.data && response.data.length > 0) {
            const image = response.data[0];
            const imageUrl = image.url;
            if (typeof imageUrl === 'undefined') {
                throw new Error('Image URL is undefined');
            }
            return imageUrl;
        }
        else {
            // Handle the case where the image data is not in the expected format or is missing
            console.error('Image data is missing or not in the expected format:', response.data);
            return "error";
        }
    }
    catch (error) {
        console.error('OpenAI API call failed:', error);
        return "error";
    }
}
init().catch(console.error);
export default generateArtistPhoto;
