import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { Address } from 'viem'

type SaveIconRequest = {
  address: Address
  icon: string
}

export async function POST(request: Request) {
  try {
    const { address, icon } = await request.json() as SaveIconRequest

    if (!address || !icon) {
      return NextResponse.json({ error: 'Address and icon are required' }, { status: 400 })
    }

    // Save the icon for the user
    await kv.set(`user:${address}:icon`, icon)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving icon:', error)
    return NextResponse.json({ error: 'Failed to save icon' }, { status: 500 })
  }
}