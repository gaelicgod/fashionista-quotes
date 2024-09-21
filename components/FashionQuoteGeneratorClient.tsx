'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Share2, Download, Image as ImageIcon } from "lucide-react"
import { FashionIconPanel } from '@/components/FashionIconPanel'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-hot-toast'
import { Address } from 'viem'
import { motion, AnimatePresence } from 'framer-motion'

interface QuoteData {
  quote: string;
  icon: string;
  signatureElement: string;
  elementDescription: string;
}

interface IconInfo {
  bio: string;
  achievements: string[];
}

export function FashionQuoteGeneratorClient() {
  const [job, setJob] = useState('')
  const [mood, setMood] = useState('')
  const [description, setDescription] = useState('')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [currentIcon, setCurrentIcon] = useState('')
  const [iconInfo, setIconInfo] = useState<IconInfo | null>(null)
  const [isIconInfoLoading, setIsIconInfoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const { address } = useAccount()

  const { append, isLoading } = useChat({
    api: '/api/chat',
    body: { action: 'generateQuote' },
    onFinish: (message) => {
      try {
        const structuredQuoteData = JSON.parse(message.content) as QuoteData
        setQuoteData(structuredQuoteData)
        if (address) {
          saveIconForUser(address, structuredQuoteData.icon)
        }
      } catch (parseError) {
        console.error('Failed to parse quote data:', parseError)
        setError('Failed to generate quote. Please try again.')
      }
    },
    onError: (error) => {
      console.error('Error generating quote:', error.message)
      setError('Failed to generate quote. Please try again.')
    },
  })

  const { append: appendIconInfo } = useChat({
    api: '/api/chat',
    body: { action: 'getIconInfo' },
    onFinish: (message) => {
      try {
        const info = JSON.parse(message.content) as IconInfo
        setIconInfo(info)
      } catch (iconError) {
        console.error('Failed to parse icon info:', iconError)
        setError('Failed to load icon information. Please try again.')
      } finally {
        setIsIconInfoLoading(false)
      }
    },
    onError: (error) => {
      console.error('Error fetching icon info:', error)
      setError('Failed to load icon information. Please try again.')
      setIsIconInfoLoading(false)
    },
  })

  async function saveIconForUser(userAddress: Address, iconName: string) {
    try {
      const response = await fetch('/api/save-icon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: userAddress, icon: iconName }),
      })
      if (response.ok) {
        toast.success('Fashion icon saved to your profile!')
      } else {
        throw new Error('Failed to save fashion icon')
      }
    } catch (error) {
      console.error('Error saving icon:', error)
      toast.error('Failed to save fashion icon. Please try again.')
    }
  }

  async function saveImageForUser(userAddress: Address, imageUrl: string) {
    try {
      const response = await fetch('/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: userAddress, imageUrl }),
      })
      if (response.ok) {
        toast.success('Fashion image saved to your profile!')
      } else {
        throw new Error('Failed to save fashion image')
      }
    } catch (error) {
      console.error('Error saving image:', error)
      toast.error('Failed to save fashion image. Please try again.')
    }
  }

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setQuoteData(null)
    setGeneratedImage(null)
    const prompt = `I'm a ${job} and I'm feeling ${mood}. I would describe myself as ${description}. Can you give me an inspirational fashion quote that's relevant to my situation?`
    append({ role: 'user', content: prompt })
  }

  const handleIconClick = (iconName: string) => {
    setCurrentIcon(iconName)
    setIconInfo(null)
    setIsIconInfoLoading(true)
    setIsPanelOpen(true)
    appendIconInfo({ role: 'user', content: iconName })
  }

  const handleGenerateImage = async () => {
    if (!quoteData || !address) return
    setIsGeneratingImage(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, signatureElement: quoteData.signatureElement }),
      })
      const data = await response.json() as { imageUrl: string }
      setGeneratedImage(data.imageUrl)

      // Save the image URL to Vercel KV
      await saveImageForUser(address, data.imageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handleShare = () => {
    if (quoteData && generatedImage) {
      const shareText = `"${quoteData.quote}" - ${quoteData.icon}\nGenerated by Fashionista Quotes`
      navigator.share({
        title: 'My Fashion Quote',
        text: shareText,
        url: generatedImage
      }).then(() => {
        toast.success('Shared successfully!')
      }).catch((error) => {
        console.error('Error sharing:', error)
        toast.error('Failed to share. Please try again.')
      })
    }
  }

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(generatedImage)}`
        const response = await fetch(proxyUrl)

        if (!response.ok) {
          throw new Error('Failed to download image')
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'fashion-quote-image.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        toast.success('Image downloaded successfully!')
      } catch (error) {
        console.error('Error downloading image:', error)
        toast.error('Failed to download image. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-black font-serif">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-red-700 to-yellow-500 opacity-30"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000),linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-yellow-500 shadow-2xl">
          <CardHeader className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
              Exclusive
            </div>
            <CardTitle className="text-4xl font-bold text-center text-black uppercase tracking-widest mb-2">Vogue</CardTitle>
            <div className="text-xl text-center text-black uppercase tracking-wide">Fashion Oracle</div>
            <div className="mt-4 flex justify-center">
              <ConnectButton />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateQuote} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job" className="text-sm font-bold uppercase tracking-wide text-black">Occupation</Label>
                <Input
                  id="job"
                  placeholder="e.g. Designer, Model, Editor"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mood" className="text-sm font-bold uppercase tracking-wide text-black">Current Mood</Label>
                <Input
                  id="mood"
                  placeholder="e.g. Fierce, Avant-garde, Minimalist"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  required
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold uppercase tracking-wide text-black">Describe yourself</Label>
                <Input
                  id="description"
                  placeholder="e.g. Tall, elegant, with a penchant for vintage"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-yellow-500 text-white hover:text-black transition-colors duration-300 uppercase font-bold tracking-wider" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Channeling...
                  </>
                ) : (
                  'Get Inspired'
                )}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                {error}
              </div>
            )}
            <AnimatePresence>
              {quoteData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-black/80 text-white rounded-lg"
                >
                  <p className="text-lg font-semibold text-center italic">&ldquo;{quoteData.quote}&rdquo;</p>
                  <Button
                    onClick={() => handleIconClick(quoteData.icon)}
                    className="mt-2 text-xs text-center uppercase tracking-wider text-yellow-500 hover:text-yellow-400 transition-colors duration-300 w-full"
                    variant="link"
                  >
                    - {quoteData.icon} (Click for more info)
                  </Button>
                  {!generatedImage && address && (
                    <Button
                      onClick={handleGenerateImage}
                      className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black transition-colors duration-300"
                      disabled={isGeneratingImage}
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Image...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Generate Fashion Image
                        </>
                      )}
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-6"
                >
                  <img src={generatedImage} alt="Generated fashion image" className="w-full rounded-lg shadow-lg" />
                  <div className="mt-4 flex justify-center space-x-4">
                    <Button onClick={handleShare} className="flex items-center">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button onClick={handleDownload} className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
      <FashionIconPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        iconName={currentIcon}
        iconInfo={iconInfo}
        isLoading={isIconInfoLoading}
      />
    </div>
  )
}