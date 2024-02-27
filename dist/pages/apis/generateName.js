// import OpenAI from 'openai';
// const openai = new OpenAI();
import { openaiClientPromise } from '../utils/openaiClient';
let openai;
async function init() {
    openai = await openaiClientPromise;
}
async function generateName(biography) {
    if (!openai) {
        throw new Error("OpenAI client is not initialized.");
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable assistant asked to tell us the name of an artist when presented with their biography. Just return the name only. If for some reason no name is given, make one up."
                },
                {
                    role: "user",
                    content: biography
                }
            ],
            max_tokens: 300
        });
        if (response && response.choices && response.choices[0].message && response.choices[0].message.content && response.choices.length > 0) {
            return response.choices[0].message.content.trim();
        }
        else {
            throw new Error("Failed to generate name: No text returned from OpenAI.");
        }
    }
    catch (error) {
        console.error("Error generating name:", error);
        throw error; // Rethrow the error for handling upstream
    }
}
init().catch(console.error);
export default generateName;
