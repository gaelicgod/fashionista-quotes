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
    const prompt = `I'm a ${job} and I'm feeling ${mood}. Can you give me an inspirational fashion quote that's relevant to my situation?`
    append({ role: 'user', content: prompt })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Fashionista Quote Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateQuote} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job">What&#39;s your job?</Label>
              <Input
                id="job"
                placeholder="e.g. Designer, Teacher, CEO"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">How are you feeling today?</Label>
              <Input
                id="mood"
                placeholder="e.g. Excited, Confident, Stressed"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Inspired'
              )}
            </Button>
          </form>
          {messages.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold text-center italic">{messages[messages.length - 1].content}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}