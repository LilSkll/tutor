'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Lesson } from '@/lib/openai'

export default function LessonPage() {
  const [formData, setFormData] = useState({
    topic: '',
    level: 'A2' as 'A1' | 'A2' | 'B1' | 'B2' | 'C1',
    grammar: '',
    duration: 10
  })
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateLesson = async () => {
    if (!formData.topic || !formData.grammar) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generateLesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const generatedLesson = await response.json()
      setLesson(generatedLesson)
    } catch (error) {
      console.error('Error generating lesson:', error)
      alert('Failed to generate lesson')
    } finally {
      setIsLoading(false)
    }
  }

  if (lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => setLesson(null)} className="mb-4">
              ← Generate New Lesson
            </Button>
            <Link href="/">
              <Button variant="outline" className="mb-4 ml-2">
                ← Home
              </Button>
            </Link>
          </div>

          <LessonDisplay lesson={lesson} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Lesson Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate personalized Spanish lessons with AI
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Parameters</CardTitle>
              <CardDescription>
                Configure your lesson to generate personalized content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Ordering food, Travel, Family"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grammar Focus
                </label>
                <input
                  type="text"
                  value={formData.grammar}
                  onChange={(e) => setFormData({ ...formData, grammar: e.target.value })}
                  placeholder="e.g., Present tense, Ser vs Estar, Subjunctive"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 10 })}
                  min="5"
                  max="60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <Button 
                onClick={generateLesson} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Lesson'}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function LessonDisplay({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3">Introduction</h3>
            <p className="text-gray-700">{lesson.introduction}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dialogue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lesson.dialogue.map((line, index) => (
              <div key={index} className={`flex ${line.speaker.includes('A') ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  line.speaker.includes('A') 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  <p className="font-semibold text-sm">{line.speaker}</p>
                  <p>{line.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((word, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">{word.spanish}</span>
                  <span className="text-sm text-gray-500 ml-2">({word.category})</span>
                </div>
                <span className="text-gray-600">{word.english}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grammar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{lesson.grammar}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lesson.exercises.map((exercise, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-2">Exercise {index + 1}</p>
                <p className="text-gray-700 mb-2">{exercise.question}</p>
                <details className="text-sm">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Show Answer</summary>
                  <p className="mt-2 text-green-600">{exercise.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lesson.quiz.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-3">Question {index + 1}</p>
                <p className="text-gray-700 mb-3">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      className={`p-2 rounded ${
                        optIndex === question.correct 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {String.fromCharCode(65 + optIndex)}. {option}
                      {optIndex === question.correct && ' ✓'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
