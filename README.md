# Fashionista Quotes

Fashionista Quotes is a Next.js application that generates inspirational fashion quotes and images based on the user's job, mood, and self-description.

## Features

- Dynamic quote generation using OpenAI's GPT-4 model
- Image generation using DALL-E 3
- Web3 integration with RainbowKit for wallet connection
- Responsive design with Tailwind CSS
- Sleek UI with custom animations using Framer Motion
- Server-side rendering with client-side interactivity
- Loading skeleton for improved user experience
- Fashion icon information panel
- Image sharing and downloading capabilities
- User profile storage using Vercel KV

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
   NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id_here
   KV_URL=your_kv_url_here
   KV_REST_API_URL=your_kv_rest_api_url_here
   KV_REST_API_TOKEN=your_kv_rest_api_token_here
   KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code and API routes
- `components/`: Reusable React components
- `public/`: Static assets

## API Routes

- `app/api/chat/route.ts`: Generates fashion quotes
- `app/api/generate-image/route.ts`: Generates fashion images using DALL-E 3
- `app/api/save-icon/route.ts`: Saves user's fashion icon to Vercel KV
- `app/api/save-image/route.ts`: Saves user's generated image URL to Vercel KV
- `app/api/proxy-download/route.ts`: Proxies image downloads

## Key Components

- `FashionQuoteGeneratorClient`: The main component for generating quotes and images
- `FashionIconPanel`: A sliding panel displaying information about fashion icons
- `FashionQuoteSkeleton`: A loading skeleton for improved user experience
- `IconsPage`: Displays a gallery of user-generated fashion icons and images

## Styling

This project uses Tailwind CSS for styling. The main configuration can be found in `tailwind.config.js`. Custom UI components are located in the `components/ui/` directory.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Framer Motion](https://www.framer.com/motion/)
- [RainbowKit](https://www.rainbowkit.com/docs/introduction)
- [wagmi](https://wagmi.sh/)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [pnpm](https://pnpm.io/motivation)

## Deployment

This project is designed to be deployed on Vercel. Make sure to set up the necessary environment variables in your Vercel project settings.

## Scripts

- `pnpm dev`: Runs the development server
- `pnpm build`: Builds the application for production
- `pnpm start`: Starts the production server
- `pnpm lint`: Runs the linter