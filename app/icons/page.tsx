import { kv } from '@vercel/kv'
import { Address } from 'viem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

type UserData = {
  address: Address
  icon: string
  imageUrl?: string
}

async function getUserData() {
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
}

export default async function IconsPage() {
  const userData = await getUserData()

  return (
    <div className="min-h-screen bg-[#0A1A2F] font-serif">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 opacity-30"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000),linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-6xl bg-white/90 backdrop-blur-sm border-2 border-blue-300 shadow-2xl mb-8">
          <CardHeader className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
              Exclusive
            </div>
            <CardTitle className="text-4xl font-bold text-center text-[#0A1A2F] uppercase tracking-widest mb-2">Fashionista Icons</CardTitle>
            <CardDescription className="text-xl text-center text-[#0A1A2F] uppercase tracking-wide">Icon Gallery</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {userData.map(({ address, icon, imageUrl }: UserData) => (
              <Card key={address} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 py-2">
                  <CardTitle className="text-sm font-mono text-white truncate">
                    Wallet: {address}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex flex-col items-center space-y-4">
                  {imageUrl ? (
                    <div className="w-full h-48 relative">
                      <Image
                        src={imageUrl}
                        alt={`Generated image for ${icon}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                      <p className="text-gray-500">No image generated</p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Fashion Icon:</p>
                    <Badge variant="secondary" className="text-lg py-1 px-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0A1A2F] border-none">
                      {icon}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}