import { NextRequest, NextResponse } from 'next/server'
import { generateLesson } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { topic, level, grammar, duration } = await request.json()

    if (!topic || !level || !grammar || !duration) {
      return NextResponse.json(
        { error: 'Topic, level, grammar, and duration are required' },
        { status: 400 }
      )
    }

    const lesson = await generateLesson(topic, level, grammar, duration)
    
    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Lesson generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    )
  }
}
