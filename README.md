# Fashionista Quotes

Fashionista Quotes is a Next.js application that provides inspirational quotes from famous fashion icons based on the user's job and mood.

## Features

- Dynamic quote generation using OpenAI's GPT-4 model
- Responsive design with Tailwind CSS
- Sleek UI with custom animations
- Server-side rendering with client-side interactivity
- Loading skeleton for improved user experience

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code
- `components/`: Reusable React components
- `lib/`: Utility functions and helpers
- `public/`: Static assets

## API

The project uses an Edge API route for generating fashion quotes. You can find the implementation here:


## Styling

This project uses Tailwind CSS for styling. The main configuration can be found in:


## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Framer Motion](https://www.framer.com/motion/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.