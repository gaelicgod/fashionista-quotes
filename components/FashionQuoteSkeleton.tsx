import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FashionQuoteSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-serif">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-red-700 to-yellow-500 opacity-30"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000),linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-yellow-500 shadow-2xl">
        <CardHeader className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
            <Skeleton className="h-4 w-20" />
          </div>
          <CardTitle className="text-4xl font-bold text-center text-black uppercase tracking-widest mb-2">
            <Skeleton className="h-10 w-40 mx-auto" />
          </CardTitle>
          <div className="text-xl text-center text-black uppercase tracking-wide">
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="mt-6">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}