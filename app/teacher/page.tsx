'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Lesson } from '@/lib/openai'

export default function TeacherPage() {
  const [formData, setFormData] = useState({
    lessonTopic: '',
    studentLevel: 'A2' as 'A1' | 'A2' | 'B1' | 'B2' | 'C1',
    grammarFocus: '',
    vocabularyTheme: '',
    lessonDuration: 45
  })
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateTeacherLesson = async () => {
    if (!formData.lessonTopic || !formData.grammarFocus || !formData.vocabularyTheme) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generateTeacherLesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate lesson')
      }

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
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

          <EditableLessonDisplay lesson={lesson} setLesson={setLesson} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teacher Mode
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create comprehensive lesson plans for your Spanish students
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Plan Generator</CardTitle>
              <CardDescription>
                Create professional lesson plans tailored to your students' needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Topic
                </label>
                <input
                  type="text"
                  value={formData.lessonTopic}
                  onChange={(e) => setFormData({ ...formData, lessonTopic: e.target.value })}
                  placeholder="e.g., Daily Routines, Spanish Culture, Business Spanish"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Level
                </label>
                <select
                  value={formData.studentLevel}
                  onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  value={formData.grammarFocus}
                  onChange={(e) => setFormData({ ...formData, grammarFocus: e.target.value })}
                  placeholder="e.g., Preterite vs Imperfect, Subjunctive mood, Conditional tense"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vocabulary Theme
                </label>
                <input
                  type="text"
                  value={formData.vocabularyTheme}
                  onChange={(e) => setFormData({ ...formData, vocabularyTheme: e.target.value })}
                  placeholder="e.g., Food & Dining, Travel, Medical, Technology"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.lessonDuration}
                  onChange={(e) => setFormData({ ...formData, lessonDuration: parseInt(e.target.value) || 45 })}
                  min="15"
                  max="120"
                  step="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <Button 
                onClick={generateTeacherLesson} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Generating Lesson Plan...' : 'Generate Lesson Plan'}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function EditableLessonDisplay({ lesson, setLesson }: { 
  lesson: Lesson
  setLesson: (lesson: Lesson) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editableLesson, setEditableLesson] = useState(lesson)

  const handleSave = () => {
    setLesson(editableLesson)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditableLesson(lesson)
    setIsEditing(false)
  }

  const updateField = (field: keyof Lesson, value: any) => {
    setEditableLesson(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{editableLesson.title}</h2>
        <div className="space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Lesson</Button>
          ) : (
            <>
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <textarea
              value={editableLesson.introduction}
              onChange={(e) => updateField('introduction', e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <p className="text-gray-700">{editableLesson.introduction}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dialogue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {editableLesson.dialogue.map((line, index) => (
              <div key={index} className={`flex ${line.speaker.includes('A') ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  line.speaker.includes('A') 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={line.speaker}
                        onChange={(e) => {
                          const newDialogue = [...editableLesson.dialogue]
                          newDialogue[index].speaker = e.target.value
                          updateField('dialogue', newDialogue)
                        }}
                        className="font-semibold text-sm bg-transparent border-b border-gray-400 focus:outline-none"
                      />
                      <textarea
                        value={line.text}
                        onChange={(e) => {
                          const newDialogue = [...editableLesson.dialogue]
                          newDialogue[index].text = e.target.value
                          updateField('dialogue', newDialogue)
                        }}
                        className="w-full bg-transparent resize-none focus:outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-sm">{line.speaker}</p>
                      <p>{line.text}</p>
                    </>
                  )}
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
            {editableLesson.vocabulary.map((word, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                {isEditing ? (
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={word.spanish}
                      onChange={(e) => {
                        const newVocab = [...editableLesson.vocabulary]
                        newVocab[index].spanish = e.target.value
                        updateField('vocabulary', newVocab)
                      }}
                      className="font-semibold bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={word.category}
                      onChange={(e) => {
                        const newVocab = [...editableLesson.vocabulary]
                        newVocab[index].category = e.target.value
                        updateField('vocabulary', newVocab)
                      }}
                      className="text-sm bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={word.english}
                      onChange={(e) => {
                        const newVocab = [...editableLesson.vocabulary]
                        newVocab[index].english = e.target.value
                        updateField('vocabulary', newVocab)
                      }}
                      className="bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="font-semibold">{word.spanish}</span>
                      <span className="text-sm text-gray-500 ml-2">({word.category})</span>
                    </div>
                    <span className="text-gray-600">{word.english}</span>
                  </>
                )}
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
          {isEditing ? (
            <textarea
              value={editableLesson.grammar}
              onChange={(e) => updateField('grammar', e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{editableLesson.grammar}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editableLesson.exercises.map((exercise, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={`Exercise ${index + 1}`}
                      readOnly
                      className="font-semibold bg-transparent"
                    />
                    <textarea
                      value={exercise.question}
                      onChange={(e) => {
                        const newExercises = [...editableLesson.exercises]
                        newExercises[index].question = e.target.value
                        updateField('exercises', newExercises)
                      }}
                      className="w-full bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={exercise.answer}
                      onChange={(e) => {
                        const newExercises = [...editableLesson.exercises]
                        newExercises[index].answer = e.target.value
                        updateField('exercises', newExercises)
                      }}
                      className="w-full bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-semibold mb-2">Exercise {index + 1}</p>
                    <p className="text-gray-700 mb-2">{exercise.question}</p>
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Show Answer</summary>
                      <p className="mt-2 text-green-600">{exercise.answer}</p>
                    </details>
                  </>
                )}
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
            {editableLesson.quiz.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={`Question ${index + 1}`}
                      readOnly
                      className="font-semibold bg-transparent"
                    />
                    <textarea
                      value={question.question}
                      onChange={(e) => {
                        const newQuiz = [...editableLesson.quiz]
                        newQuiz[index].question = e.target.value
                        updateField('quiz', newQuiz)
                      }}
                      className="w-full bg-transparent border-b border-gray-400 focus:outline-none"
                    />
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${index}`}
                          checked={optIndex === question.correct}
                          onChange={() => {
                            const newQuiz = [...editableLesson.quiz]
                            newQuiz[index].correct = optIndex
                            updateField('quiz', newQuiz)
                          }}
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newQuiz = [...editableLesson.quiz]
                            newQuiz[index].options[optIndex] = e.target.value
                            updateField('quiz', newQuiz)
                          }}
                          className="flex-1 bg-transparent border-b border-gray-400 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
