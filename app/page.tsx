import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Spanish AI Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn Spanish through AI conversations, generated lessons, and teacher-created content
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link href="/practice">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  Conversation Practice
                </CardTitle>
                <CardDescription>
                  Practice Spanish conversations with AI in real-world scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Café conversations</li>
                  <li>• Airport dialogues</li>
                  <li>• Hotel interactions</li>
                  <li>• Job interviews</li>
                  <li>• Meeting friends</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/lesson">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  AI Lessons
                </CardTitle>
                <CardDescription>
                  Generate personalized Spanish lessons instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Custom topics</li>
                  <li>• Level-appropriate content</li>
                  <li>• Grammar focus</li>
                  <li>• Interactive exercises</li>
                  <li>• Practice quizzes</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/teacher">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👨‍🏫</span>
                  Teacher Mode
                </CardTitle>
                <CardDescription>
                  Create comprehensive lesson plans for your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Professional lesson plans</li>
                  <li>• Editable content</li>
                  <li>• Student materials</li>
                  <li>• Assessment tools</li>
                  <li>• Export options</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </main>

        <footer className="text-center mt-16 text-gray-600">
          <p>© 2024 Spanish AI Tutor. Learn Spanish smarter with AI.</p>
        </footer>
      </div>
    </div>
  )
}
