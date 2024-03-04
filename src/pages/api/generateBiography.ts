// import OpenAI from 'openai';
// const openai = new OpenAI();

import { openaiClientPromise, OpenAIInstance } from '../../utils/openaiClient';
let openai: OpenAIInstance;
async function init() {
  openai = await openaiClientPromise;
}

async function generateBiography(description: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client is not initialized.");
  }

  try {
  	const response = await openai.chat.completions.create({
  		model: 'gpt-3.5-turbo',
  		messages: [
  			{
  				role: "system",
  				content: "You are a knowledgeable assistant asked to generate a fictional artist biography based on the description of a painting. The artist's name must be fake and original, you cannot use any artist names given in the description. Details should include nationality, place of birth, and upbringing even when no pertinent details are provided. Make sure your response doesn't end in the middle of a sentence, and ends with a period."
  			},
  			{
  				role: "user",
  				content: description
  			}
  		],
  		max_tokens: 350
  	});

  	if (response && response.choices && response.choices[0].message && response.choices[0].message.content && response.choices.length > 0) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("Failed to generate biography: No text returned from OpenAI.");
    }
  } catch (error) {
    console.error("Error generating biography:", error);
    throw error; // Rethrow the error for handling upstream
  }
}

init().catch(console.error);
export default generateBiography;
