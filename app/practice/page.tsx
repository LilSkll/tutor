'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const scenarios = [
  { id: 'cafe', name: 'Café', emoji: '☕', description: 'Order coffee and pastries' },
  { id: 'airport', name: 'Airport', emoji: '✈️', description: 'Check-in and security' },
  { id: 'hotel', name: 'Hotel', emoji: '🏨', description: 'Check-in and room service' },
  { id: 'job', name: 'Job Interview', emoji: '💼', description: 'Professional interview' },
  { id: 'friends', name: 'Meeting Friends', emoji: '👫', description: 'Casual conversation' },
]

export default function PracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/practice">
              <Button variant="outline" className="mb-4">
                ← Back to Scenarios
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {scenarios.find(s => s.id === selectedScenario)?.emoji}{' '}
              {scenarios.find(s => s.id === selectedScenario)?.name} Conversation
            </h1>
            <p className="text-gray-600 mt-2">
              {scenarios.find(s => s.id === selectedScenario)?.description}
            </p>
          </div>

          <ChatInterface scenario={selectedScenario} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conversation Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a scenario to practice Spanish conversations with AI
          </p>
        </header>

        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scenarios.map((scenario) => (
            <Card 
              key={scenario.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{scenario.emoji}</span>
                  {scenario.name}
                </CardTitle>
                <CardDescription>
                  {scenario.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  )
}

function ChatInterface({ scenario }: { scenario: string }) {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant'
    content: string
    correction?: string
    explanation?: string
  }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const scenarioName = scenarios.find(s => s.id === scenario)?.name || ''

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setIsLoading(true)

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          scenario: scenarioName,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        correction: data.correction,
        explanation: data.explanation
      }])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Chat with AI</CardTitle>
        <CardDescription>
          Practice your Spanish in a {scenarioName} scenario
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>¡Hola! Start the conversation in Spanish.</p>
              <p className="text-sm mt-2">The AI will respond as {scenarioName} staff/customer.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <p>{message.content}</p>
                {message.correction && (
                  <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                    <strong>Correction:</strong> {message.correction}
                  </div>
                )}
                {message.explanation && (
                  <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm">
                    <strong>Explanation:</strong> {message.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message in Spanish..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
