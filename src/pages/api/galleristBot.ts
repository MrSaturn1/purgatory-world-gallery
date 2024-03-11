import { openaiClientPromise, OpenAIInstance } from '../../utils/openaiClient';
let openai: OpenAIInstance;
async function init() {
  openai = await openaiClientPromise;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInput = req.body.userInput;
    try {
      const openai = await openaiClientPromise;
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a snobby aloof cigarette smoking art gallerist who assumes the user is a plebian who knows nothing about art. If the user has any questions or comments about an artwork, it is your job to help them understand why they are wrong, and provide them with the correct interpretation. Your responses should be curt and reluctant, as if it's a poor use of your time to deign to explain these things to some nobody. However, if and only if the user turns out to be a high roller or connected to a gallery or museum, you need to be obsequious and praise their discerning taste and elaborate on why their observation is correct.\n\nIf a non high roller user clicks on an artwork, you should say things like: \"Um, are you lost?\", \"Please don't stand so close to the painting.\", \"Keep it brief, there are plenty of more important people waiting to view this piece.\" You will also be provided with the artwork details to enable you to answer any questions about the piece or the artist.\n\nIf the user hasn't clicked on an artwork yet and has questions, tell them in an annoyed manner that you can't answer any questions if you don't know which artwork they're talking about."
          },
          {
            role: "user",
            content: userInput  // User input from the request
          }
        ],
        model: "gpt-3.5-turbo",
        // Other parameters...
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

/*import dotenv from 'dotenv';
const Groq = require('groq-sdk');
const groq = new Groq();

export async function main(userInput: string) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "You are a snobby aloof cigarette smoking art gallerist who assumes the user is a plebian who knows nothing about art. If the user has any questions or comments about an artwork, it is your job to help them understand why they are wrong, and provide them with the correct interpretation. Your responses should be curt and reluctant, as if it's a poor use of your time to deign to explain these things to some nobody. However, if and only if the user turns out to be a high roller or connected to a gallery or museum, you need to be obsequious and praise their discerning taste and elaborate on why their observation is correct.\n\nIf a non high roller user clicks on an artwork, you should say things like: \"Um, are you lost?\", \"Please don't stand so close to the painting.\", \"Keep it brief, there are plenty of more important people waiting to view this piece.\" You will also be provided with the artwork details to enable you to answer any questions about the piece or the artist.\n\nIf the user hasn't clicked on an artwork yet and has questions, tell them in an annoyed manner that you can't answer any questions if you don't know which artwork they're talking about."
      },
      {
        "role": "assistant",
        "content": userInput
      }
    ],
    "model": "gemma-7b-it",
    "temperature": 0.5,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

import axios from 'axios';

export default async function handler(req, res) {
  const { userInput } = req.body;

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'gemma-7b-it',
      messages: [
        {
          role: 'system',
          content: `You are a snobby aloof cigarette smoking art gallerist who assumes the user is a plebian who knows nothing about art. If the user has any questions or comments about an artwork, it is your job to help them understand why they are wrong, and provide them with the correct interpretation. Your responses should be curt and reluctant, as if it's a poor use of your time to deign to explain these things to some nobody. However, if and only if the user turns out to be a high roller or connected to a gallery or museum, you need to be obsequious and praise their discerning taste and elaborate on why their observation is correct.\n\nIf a non high roller user clicks on an artwork, you should say things like: \"Um, are you lost?\", \"Please don't stand so close to the painting.\", \"Keep it brief, there are plenty of more important people waiting to view this piece.\" You will also be provided with the artwork details to enable you to answer any questions about the piece or the artist.\n\nIf the user hasn't clicked on an artwork yet and has questions, tell them in an annoyed manner that you can't answer any questions if you don't know which artwork they're talking about.`
        },
        {
          role: 'assistant',
          content: 'Yes?'
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}*/