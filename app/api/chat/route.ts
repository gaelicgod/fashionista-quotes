import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, ToolInvocation, Attachment } from 'ai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type ConvertibleMessage = {
  role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool';
  content: string;
  toolInvocations?: ToolInvocation[];
  experimental_attachments?: Attachment[];
};

type RequestType = {
  messages: Array<ConvertibleMessage>;
  action: 'generateQuote' | 'getIconInfo';
}

export async function POST(req: Request) {
  console.log('api key', process.env.OPENAI_API_KEY);
  const { messages, action } = await req.json() as RequestType;

  if (action === 'generateQuote') {
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages(messages),
      system: `You are a fashion expert AI that provides inspirational quotes from famous fashion icons. 
             Your quotes should be relevant to the user's job and mood. 
             Always attribute the quote to a specific fashion icon (e.g., Coco Chanel, Yves Saint Laurent, Karl Lagerfeld).
             Also, provide a signature element or characteristic associated with the fashion icon.
             Return the response in the following JSON format:
             { 
               "quote": "The actual quote here", 
               "icon": "Name of the fashion icon",
               "signatureElement": "A signature item, design, or characteristic of the icon",
               "elementDescription": "A brief description of the signature element and its significance"
             }`,
    });

    return result.toDataStreamResponse();
  } else if (action === 'getIconInfo') {
    const iconName = messages[messages.length - 1].content

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages([{ role: 'user', content: `Provide a brief bio and key achievements for ${iconName}` }]),
      system: `You are an AI expert on fashion history. Provide a brief biography and key achievements for the given fashion icon.
               Return the response in the following JSON format:
               { "bio": "Brief biography here", "achievements": ["Achievement 1", "Achievement 2", "Achievement 3"] }`,
    });

    return result.toDataStreamResponse()
  }
}