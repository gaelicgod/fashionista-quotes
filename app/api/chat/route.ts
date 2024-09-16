import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log('api key', process.env.OPENAI_API_KEY);
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: `You are a fashion expert AI that provides inspirational quotes from famous fashion icons. 
                  Your quotes should be relevant to the user's job and mood. 
                  Always attribute the quote to a specific fashion icon (e.g., Coco Chanel, Yves Saint Laurent, Karl Lagerfeld).
                  If you're not sure about the attribution, say it's inspired by the style of that icon.
                  Keep your responses concise and impactful.`
  });

  return result.toDataStreamResponse();
}