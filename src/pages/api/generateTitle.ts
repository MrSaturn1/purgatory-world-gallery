// import OpenAI from 'openai';
// const openai = new OpenAI();

import { openaiClientPromise, OpenAIInstance } from '../../utils/openaiClient';
let openai: OpenAIInstance;
async function init() {
  openai = await openaiClientPromise;
}

async function generateTitle(description: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client is not initialized.");
  }

  try {
  	const response = await openai.chat.completions.create({
  		model: 'gpt-3.5-turbo',
  		messages: [
  			{
  				role: "system",
  				content: "You are a knowledgeable assistant asked to generate the title of a work of art based on a provided description of the piece. Be creative and avant-garde, try not to cut and paste from the description directly and do not reference any artist names. Return ONLY the title of the work."},
  			{
  				role: "user",
  				content: description
  			}
  		],
  		max_tokens: 60
  	});

  	if (response && response.choices && response.choices[0].message && response.choices[0].message.content && response.choices.length > 0) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("Failed to generate title: No text returned from OpenAI.");
    }
  } catch (error) {
    console.error("Error generating title:", error);
    throw error; // Rethrow the error for handling upstream
  }
}

init().catch(console.error);
export default generateTitle;
