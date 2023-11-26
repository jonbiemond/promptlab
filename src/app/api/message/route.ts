import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import {NextResponse} from "next/server";

dotenv.config();

export async function POST(req: Request) {
  try {
    // instance
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // get message from user
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({'message': 'Message is required'}, {status: 400})
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: "gpt-3.5-turbo"
    });

    // check if choices array is empty
    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      return NextResponse.json({'error': 'No response from AI model'}, {status: 500})
    }

    // JSON response with the result message
    return NextResponse.json(chatCompletion.choices[0]?.message?.content || 'No text available', {status: 200});
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({'error': 'An error occurred'}, {status: 500})
  }
}
