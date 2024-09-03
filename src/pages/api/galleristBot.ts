import { openaiClientPromise, OpenAIInstance } from '../../utils/openaiClient';
let openai: OpenAIInstance;
async function init() {
  openai = await openaiClientPromise;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userInput, conversationHistory, artist, biography, title, description } = req.body;
    
    let additionalInfo = `The guest has just entered the exhibit. If the guest has any questions about the exhibit, the Artist is: ${artist}. The Biography of the artist is: ${biography}`;
    if (title && description) {
      additionalInfo += ` The guest is currently viewing "${title}", which is described as: ${description}`;
    }

    const messages = [
      {
          role: "system",
          content: "You are a snobby aloof cigarette smoking art gallerist who assumes the user is a plebian who knows nothing about art. However, if the patron identifies themself as a high roller, someone with money to spend, treat them as an expert whose opinion and presence is highly valued.",
      },
      ...conversationHistory,
      {
          role: "user",
          content: userInput,
      }
    ];
    try {
      const openai = await openaiClientPromise;

      const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      res.status(200).json({ reply: chatCompletion.choices[0].message.content });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}