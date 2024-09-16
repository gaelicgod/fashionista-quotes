'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function FashionQuoteGenerator() {
  const [job, setJob] = useState('')
  const [mood, setMood] = useState('')

  const { messages, append, isLoading } = useChat()

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = `I&#39;m a ${job} and I&#39;m feeling ${mood}. Can you give me an inspirational fashion quote that&#39;s relevant to my situation?`
    append({ role: 'user', content: prompt })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-serif">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-red-700 to-yellow-500 opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-repeat opacity-10"></div>
      </div>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-yellow-500 shadow-2xl">
        <CardHeader className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
            Exclusive
          </div>
          <CardTitle className="text-4xl font-bold text-center text-black uppercase tracking-widest mb-2">Vogue</CardTitle>
          <div className="text-xl text-center text-black uppercase tracking-wide">Fashion Oracle</div>
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
          {messages.length > 0 && (
            <div className="mt-6 p-4 bg-black/80 text-white rounded-lg">
              <p className="text-lg font-semibold text-center italic">{messages[messages.length - 1].content}</p>
              <div className="mt-2 text-xs text-center uppercase tracking-wider">- The Fashion Oracle</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}