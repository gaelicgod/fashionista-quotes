import { NextResponse } from 'next/server'
import { OpenAI } from 'openai';

export const runtime = 'edge';
export const maxDuration = 30;

type RequestType = {
  description: string;
  signatureElement: string;
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
});

export async function POST(req: Request) {
  try {
    const { description, signatureElement } = await req.json() as RequestType;

    const response = await openaiClient.images.generate({
      model: "dall-e-3",
      prompt: `A fashion-inspired image featuring a person described as ${description}, incorporating the signature element: ${signatureElement}. The image should be stylish and evocative of high fashion.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return NextResponse.json({ imageUrl: response.data[0].url })
  } catch (error) {
    if (error instanceof OpenAI.OpenAIError) {
      console.error('OpenAI Error:', error.message)
    } else {
      console.error('Error generating image:', error)
    }
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}