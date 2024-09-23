import { kv } from '@vercel/kv'
import { Address } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { cache } from 'react'
import 'server-only'

type UserData = {
  address: Address
  icon: string
  imageUrl?: string
}

const getUserData = cache(async () => {
  const keys = await kv.keys('user:*:icon')
  const userData = await Promise.all(
    keys.map(async (key) => {
      const address = key.split(':')[1] as Address
      const icon = await kv.get(key)
      const imageUrl = await kv.get(`user:${address}:image`)
      return { address, icon, imageUrl } as UserData
    })
  )
  return userData
})

export default async function IconsPage() {
  const userData = await getUserData()

  return (
    <div className="min-h-screen bg-[#0A1A2F] font-serif p-4">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1A2F] opacity-90"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_75%,#ffffff_75%,#ffffff),linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_75%,#ffffff_75%,#ffffff)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-4xl bg-white shadow-2xl overflow-hidden">
          <CardHeader className="relative bg-white pb-8 pt-12">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-b-md">
              Exclusive
            </div>
            <CardTitle className="text-5xl font-bold text-center text-[#0A1A2F] uppercase tracking-widest mb-2">Fashionista Icons</CardTitle>
            <div className="text-xl text-center text-[#0A1A2F] uppercase tracking-wide">Icon Gallery</div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
            {userData.map(({ address, icon, imageUrl }: UserData) => (
              <Card key={address} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-blue-600 py-2 px-4">
                  <p className="text-xs text-blue-200 mb-1">Wallet</p>
                  <p className="text-sm font-mono text-white truncate">{address}</p>
                </CardHeader>
                <CardContent className="p-4">
                  {imageUrl && (
                    <div className="w-full h-48 relative mb-4">
                      <Image
                        src={imageUrl}
                        alt={`Generated image for ${icon}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mb-1 text-center">Fashion Icon</p>
                  <Badge variant="secondary" className="text-lg py-1 px-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0A1A2F] border-none w-full text-center">
                    {icon}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


export const revalidate = 300 // Revalidate every 5 minutes