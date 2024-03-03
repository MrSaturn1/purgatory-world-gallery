console.log("dailyArtworkGenerator started")
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import generateArt from './pages/utils/generateArt';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';
dotenv.config();

console.log("BLOB_READ_WRITE_TOKEN:", process.env.BLOB_READ_WRITE_TOKEN);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function uploadImageToVercelBlob(imageUrl, filePath) {
  const blobStoreName = process.env.VERCEL_BLOB_STORE_NAME;
  const fullFilePath = `${blobStoreName}/${filePath}`;
  try {
    const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const { url } = await put(fullFilePath, buffer, { access: 'public' });
    console.log(`Image uploaded: ${url}`);
  } catch (error) {
    console.error('Error uploading image to Vercel Blob:', error);
  }
}

async function uploadArtworkDetailsToVercelBlob(details, filePath) {
  const blobStoreName = process.env.VERCEL_BLOB_STORE_NAME;
  const fullFilePath = `${blobStoreName}/${filePath}`;
  try {
    const detailsString = JSON.stringify(details);
    const { url } = await put(fullFilePath, detailsString, { access: 'public', contentType: 'application/json' });
    console.log(`Artwork details uploaded: ${url}`);
  } catch (error) {
    console.error('Error uploading artwork details to Vercel Blob:', error);
  }
}

export async function dailyArtworkGenerator() {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset() * 60000; // convert offset to milliseconds
  const adjustedDate = new Date(currentDate.getTime() - timeZoneOffset);
  const dateFolderName = adjustedDate.toISOString().split('T')[0];

  for (let i = 1; i <= 9; i++){
    const artworkDetails = await generateArt();
    if (artworkDetails && artworkDetails.imageUrl) {
      // Define the folder where you want to save the details
      const filename = `Artwork_${Date.now()}.jpg`;
      const imagePath = `art/${dateFolderName}/${i}/image_${filename}`;
      const artistPath = `art/${dateFolderName}/${i}/artist_${filename}`;
      const detailsPath = `art/${dateFolderName}/${i}/details.json`;
      // const artFolderPath = path.join(baseArtFolderPath, String(i));
      await uploadImageToVercelBlob(artworkDetails.imageUrl, imagePath);
      await uploadImageToVercelBlob(artworkDetails.artistUrl, artistPath);
      await uploadArtworkDetailsToVercelBlob(artworkDetails, detailsPath);
      console.log(`Artwork #${i} saved`);
    } else {
      console.log('Artwork generation failed or returned incomplete details.');
    }
  }  
}

dailyArtworkGenerator();
