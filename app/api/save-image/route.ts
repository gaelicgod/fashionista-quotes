import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { Address } from 'viem'

type SaveImageRequest = {
  address: Address
  imageUrl: string
}

export async function POST(request: Request) {
  try {
    const { address, imageUrl } = await request.json() as SaveImageRequest

    if (!address || !imageUrl) {
      return NextResponse.json({ error: 'Address and image URL are required' }, { status: 400 })
    }

    // Save the image URL for the user
    await kv.set(`user:${address}:image`, imageUrl)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving image URL:', error)
    return NextResponse.json({ error: 'Failed to save image URL' }, { status: 500 })
  }
}