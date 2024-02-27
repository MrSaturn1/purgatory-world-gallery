import OpenAI from "openai";
async function createOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY environment variable is not set.");
    }
    const openai = new OpenAI({
        apiKey: apiKey,
    });
    return openai;
}
export const openaiClientPromise = createOpenAIClient();
