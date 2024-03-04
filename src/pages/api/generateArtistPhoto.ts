// import OpenAI from 'openai';
// const openai = new OpenAI();

import { openaiClientPromise, OpenAIInstance } from '../../utils/openaiClient';
let openai: OpenAIInstance;
async function init() {
 	openai = await openaiClientPromise;
}

function trimBiographyToFirstSentence(biography) {
  // Use a regular expression to find the first period followed by a space, which likely indicates the end of a sentence
  const firstSentenceEnd = biography.match(/\.(\s|$)/);
  if (firstSentenceEnd) {
    return biography.substring(0, firstSentenceEnd.index + 1);
  }
  // If there's no period found, return the whole biography as it might be a single sentence
  return biography;
}

async function generateArtistPhoto(biography: string): Promise<string> {
	if (!openai) {
	    throw new Error("OpenAI client is not initialized.");
	}
	const trimmedBiography = trimBiographyToFirstSentence(biography)
	try {
		console.log(trimmedBiography)
	    const response = await openai.images.generate({
			model: "dall-e-3",
			prompt: `Generate a realistic, plain photo portrait of this artist: ${trimmedBiography}`,
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
		} else {
			// Handle the case where the image data is not in the expected format or is missing
			console.error('Image data is missing or not in the expected format:', response.data);
			return "error";
		}
	} catch (error) {
	console.error('OpenAI API call failed:', error);
	return "error";
	}
}

init().catch(console.error);
export default generateArtistPhoto;
