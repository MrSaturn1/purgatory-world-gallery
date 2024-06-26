import nouns from '../pages/data/nouns.json';
import artists from '../pages/data/artists.json';
import mediums from '../pages/data/mediums.json';
import jargons from '../pages/data/jargon.json';
import generateBiography from '../pages/api/generateBiography';
import generateName from '../pages/api/generateName';
import generateTitle from '../pages/api/generateTitle';
import generateArtistPhoto from '../pages/api/generateArtistPhoto';

import { openaiClientPromise, OpenAIInstance } from './openaiClient';
openaiClientPromise.then(openai => console.log("OpenAI client imported:"));
let openai;
async function init() {
  try {
    console.log("init starting");
    openai = await openaiClientPromise;
    console.log("init completed?");
  } catch (error) {
    console.error("Error initializing OpenAI client:", error);
  }
}

await init();

function generateRandomPrompt(): string {
  const medium = mediums[Math.floor(Math.random() * mediums.length)];
  const artist = artists[Math.floor(Math.random() * artists.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const jargon = jargons[Math.floor(Math.random() * jargons.length)];

  return `Paint a ${medium} painting in the style of ${artist} of ${noun} with a ${jargon} essence.`;
}

function trimBiographyToLastCompleteSentence(biography: string): string {
  // Find the last period in the biography
  const lastPeriodIndex = biography.lastIndexOf('.');
  // If a period is found, trim the biography up to that point (including the period)
  // If no period is found (lastPeriodIndex is -1), return the original biography
  return lastPeriodIndex !== -1 ? biography.substring(0, lastPeriodIndex + 1) : biography;
}


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
export default async function handler() {
  const picPrompt = generateRandomPrompt();
  
  // Generate the image
  try {
    // Call OpenAI API to generate an image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: picPrompt,
      n: 1,
      size: "1024x1024"
    });
    
    // Pull the image and generate all other art attributes
    if (response.data && response.data.length > 0) {
      const image = response.data[0];
      const imageUrl = image.url;
      const revisedPrompt = image.revised_prompt;
      let initBio = "Artist Unknown";
      let title = "Untitled";
      if (typeof revisedPrompt == 'string') {
        initBio = await generateBiography(revisedPrompt);
        title = await generateTitle(revisedPrompt);
      }
      const biography = trimBiographyToLastCompleteSentence(initBio);
      const artist = await generateName(biography);
      const artistPhoto = await generateArtistPhoto(biography);

      console.log({
        imageUrl,
        biography,
        artist,
        title,
        artistPhoto,
      });

      const artworkDetails = {
        imageUrl: imageUrl,
        biography: biography,
        artist: artist,
        title: title,
        artistUrl: artistPhoto,
      };
      console.log(artworkDetails)
      return artworkDetails;
    } else {
      // Handle the case where the image data is not in the expected format or is missing
      console.error('Image data is missing or not in the expected format:', response.data);
      return null;
    }
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    return null;
  }
}
