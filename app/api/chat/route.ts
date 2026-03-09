import { NextRequest, NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { message, scenario, history } = await request.json()

    if (!message || !scenario) {
      return NextResponse.json(
        { error: 'Message and scenario are required' },
        { status: 400 }
      )
    }

    const response = await getChatResponse(message, scenario, history || [])
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
