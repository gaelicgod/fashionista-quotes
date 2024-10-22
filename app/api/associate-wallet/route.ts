import { kv } from '@vercel/kv'
import { cookies } from 'next/headers'
import 'server-only'
import { NextResponse } from 'next/server'

/**
 * API Route: POST /api/associate-wallet
 * 
 * Associates a wallet address with a user ID. If the user ID does not exist in the cookies,
 * a new user ID is generated and set in the cookies. The wallet address and user ID are then
 * stored in the key-value store.
 * 
 * Request Body:
 * - address: string - The wallet address to associate with the user.
 * 
 * Response:
 * - success: boolean - Indicates whether the association was successful.
 */

export async function POST(request: Request) {
  const { address } = await request.json()
  const systemCookies = await cookies()

  let userId: string;
  const idObj = systemCookies.get('userId')
  if (idObj) {
    userId = idObj.value
  } else {
    userId = crypto.randomUUID()
    systemCookies.set('userId', userId)
  }

  await kv.set(`wallet:${address}`, userId)
  await kv.set(`user:${userId}:wallet`, address)

  return NextResponse.json({ success: true })
}