import type { NextApiRequest, NextApiResponse } from 'next';
import { list } from '@vercel/blob';
import dotenv from 'dotenv';
dotenv.config();

interface ArtworkDetails {
  id: string;
  title: string;
  artist: string;
  biography: string;
  imageUrl: string;
  artistUrl: string;
}

interface ArtworkResponse {
  artworks: ArtworkDetails[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ArtworkResponse | { error: string }>) {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset() * 60000; // convert offset to milliseconds
  const adjustedDate = new Date(currentDate.getTime() - timeZoneOffset);
  // const dateFolderName = adjustedDate.toISOString().split('T')[0];
  // Temporary hardcoding due to DALL-E billing limit
  const dateFolderName = "2024-02-24";
  const basePath = `${process.env.VERCEL_BLOB_STORE_NAME}/art/${dateFolderName}`;
  // console.log(`basePath: ${basePath}`);
  const artworks: ArtworkDetails[] = [];
  const vercelBlobBaseUrl = process.env.VERCEL_BLOB_BASE_URL;
  try {
    // Assuming you have 9 folders for each day
    for (let i = 1; i <= 9; i++) {
      const artworkPath = `${basePath}/${i}`;
      // console.log(`artworkPath for iteration ${i}: ${artworkPath}`);
      // Listing the contents of each artwork folder
      const files = await list({ bucketName: process.env.VERCEL_BLOB_STORE_NAME, prefix: artworkPath });
      // console.log(`Files fetched for ${artworkPath}:`, files);
      // Find image and artist files based on the naming convention and use their URLs directly
      const imageFile = files.blobs.find(file => file.url.includes('image_'));
      const artistFile = files.blobs.find(file => file.url.includes('artist_'));
      // console.log(`imageFile:`, imageFile);
      // console.log(`artistFile:`, artistFile);
      // Construct URLs for the artwork and artist images using the base URL
      const imageUrl = imageFile.url;
      const artistUrl = artistFile.url;
      // console.log(`Constructed imageUrl: ${imageUrl}`);
      // console.log(`Constructed artistUrl: ${artistUrl}`);
      // Assuming details.json, imageUrl, and artistUrl have predictable names or processing logic
      const detailsFile = files.blobs.find(file => file.url.includes('details'));
      // Since you have the direct URL, you can fetch the JSON content directly
      const detailsResponse = await fetch(detailsFile.url);
      const details = await detailsResponse.json();
      // console.log("details:", details);

      artworks.push({
        id: imageFile.pathname,
        title: details.title,
        artist: details.artist,
        biography: details.biography,
        imageUrl: imageUrl, // Update this to use Vercel Blob URLs
        artistUrl: artistUrl, // Update this to use Vercel Blob URLs
      });
      // console.log("artworks.push:", artworks);
    }
    console.log("final artworks", artworks);
    res.status(200).json({ artworks });
  } catch (error) {
    console.error('Error fetching artwork metadata:', error);
    res.status(500).json({ error: 'Failed to fetch artwork metadata' });
  }
}
