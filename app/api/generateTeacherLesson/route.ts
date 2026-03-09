import { NextRequest, NextResponse } from 'next/server'
import { generateTeacherLesson } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { lessonTopic, studentLevel, grammarFocus, vocabularyTheme, lessonDuration } = await request.json()

    if (!lessonTopic || !studentLevel || !grammarFocus || !vocabularyTheme || !lessonDuration) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const lesson = await generateTeacherLesson(lessonTopic, studentLevel, grammarFocus, vocabularyTheme, lessonDuration)
    
    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Teacher lesson generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate teacher lesson' },
      { status: 500 }
    )
  }
}
