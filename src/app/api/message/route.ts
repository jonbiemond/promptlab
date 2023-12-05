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
    const { userMessage: userMessage } = await req.json();

    if (!userMessage) {
      return NextResponse.json({'userMessage': 'Message is required'}, {status: 400})
    }

    // the user message will be appended to it in the prompt given to the bot
    const prefix = `You are an LLM prompt instructor, your goal is to teach users how 
    to write effective prompts for LLMs. Given the user prompt, answer their query and 
    provide feedback on how they could improve their query in the area of clarity, scope 
    and improvement. Format your response as JSON it should have the following structure: 
    {"query_response": "", "feedback": {"clarity": "", "scope": "", "improvement":""}} User prompt: `;
    const query = prefix + userMessage;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
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
