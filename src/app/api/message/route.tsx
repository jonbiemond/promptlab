import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // instance
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // get message from user
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: "gpt-3.5-turbo"
    });

    // check if choices array is empty
    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      return res.status(500).json({ error: 'No response from AI model' });
    }

    // JSON response with the result message
    res.status(200).json(chatCompletion.choices[0]?.message?.content || 'No content available');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default handler;
