import type { NextApiRequest, NextApiResponse } from 'next';
import { list } from '@vercel/blob';
import dotenv from 'dotenv';
dotenv.config();

interface ArtworkDetails {
  id: string; // Keep if you have a unique identifier for each artwork
  title: string;
  description: string;
  imageUrl: string;
  artistUrl: string;
  artist: string; 
  biography: string;
}

interface ArtworkResponse {
  artworks: ArtworkDetails[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ArtworkResponse | { error: string }>) {
  const artFolder = "vaporwave/snes-vibes/details";
  const artworkPath = `${process.env.VERCEL_BLOB_STORE_NAME}/art/${artFolder}`;
  const artworks: ArtworkDetails[] = [];

  try {
    const files = await list({ prefix: artworkPath });
    console.log('Files received:', files.blobs);

    for (const file of files.blobs) {
      // Only process JSON files
      if (file.size > 0 && file.pathname.endsWith('.json')) {
        try {
          const jsonResponse = await fetch(file.url);
          if (!jsonResponse.ok) {
            throw new Error(`Failed to fetch: ${file.url}`);
          }
          const jsonDetails: ArtworkDetails = await jsonResponse.json();

          // Assuming jsonDetails correctly format and include imageUrl
          artworks.push({
            id: jsonDetails.id,
            title: jsonDetails.title,
            description: jsonDetails.description,
            imageUrl: jsonDetails.imageUrl,
            artistUrl: jsonDetails.imageUrl,
            artist: jsonDetails.artist,
            biography: jsonDetails.biography,
          });
        } catch (jsonError) {
          console.error(`Error fetching JSON for ${file.url}:`, jsonError);
        }
      }
    }

    res.status(200).json({ artworks });
  } catch (error) {
    console.error('Error fetching artwork metadata:', error);
    res.status(500).json({ error: 'Failed to fetch artwork metadata' });
  }
}


/*export default async function handler(req: NextApiRequest, res: NextApiResponse<ArtworkResponse | { error: string }>) {
  const artFolder = "vaporwave/snes-vibes";
  const artworkPath = `${process.env.VERCEL_BLOB_STORE_NAME}/art/${artFolder}`;
  const artworks: ArtworkDetails[] = [];
  const vercelBlobBaseUrl = process.env.VERCEL_BLOB_BASE_URL;
  
  try {
    const files = await list({ prefix: artworkPath });
    console.log('Files received:', files.blobs);
    // Iterate through each file in the retrieved list
    files.blobs.forEach(file => {
      if (file.size > 0) {
        const imageUrl = file.url // `${vercelBlobBaseUrl}${file.pathname}`;
        console.log("Constructed Image URL:", imageUrl);
        artworks.push({
        	id: file.pathname.replace('/art/' + artFolder + '/', ''),
        	title: "Untitled",
          description: "This is a masterpiece alright!"
          imageUrl: imageUrl,
          artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
          artist: "Tatsuo Nakamura",
          biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
        });
      }
    });
    res.status(200).json({ artworks });
  } catch (error) {
    console.error('Error fetching artwork metadata:', error);
    res.status(500).json({ error: 'Failed to fetch artwork metadata' });
  }
}*/
