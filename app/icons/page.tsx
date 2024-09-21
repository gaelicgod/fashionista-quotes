import { kv } from '@vercel/kv'
import { Address } from 'viem'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type IconData = {
  address: Address
  icon: string
}

async function getIcons() {
  const keys = await kv.keys('user:*:icon')
  const icons = await Promise.all(
    keys.map(async (key) => {
      const address = key.split(':')[1] as Address
      const icon = await kv.get(key)
      return { address, icon } as IconData
    })
  )
  return icons
}

export default async function IconsPage() {
  const icons = await getIcons()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-12 text-white drop-shadow-lg">
          Fashionista Icons
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icons.map(({ address, icon }: IconData) => (
            <Card key={address} className="overflow-hidden bg-white/90 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 py-3">
                <p className="text-sm font-mono text-white truncate">{address}</p>
              </CardHeader>
              <CardContent className="p-4 flex justify-center items-center">
                <Badge variant="secondary" className="text-lg py-1 px-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none">
                  {icon}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}