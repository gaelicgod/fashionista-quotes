import { kv } from '@vercel/kv'
import { Address } from 'viem'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="min-h-screen bg-[#0A1A2F] font-serif">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 opacity-30"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000),linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm border-2 border-blue-300 shadow-2xl mb-8">
          <CardHeader className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
              Exclusive
            </div>
            <CardTitle className="text-4xl font-bold text-center text-[#0A1A2F] uppercase tracking-widest mb-2">Fashionista Icons</CardTitle>
            <div className="text-xl text-center text-[#0A1A2F] uppercase tracking-wide">Icon Gallery</div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {icons.map(({ address, icon }: IconData) => (
              <Card key={address} className="overflow-hidden bg-[#0A1A2F]/10 backdrop-blur-sm border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 py-2">
                  <p className="text-sm font-mono text-white truncate">{address}</p>
                </CardHeader>
                <CardContent className="p-4 flex justify-center items-center">
                  <Badge variant="secondary" className="text-lg py-1 px-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0A1A2F] border-none">
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