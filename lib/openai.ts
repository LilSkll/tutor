import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatResponse {
  reply: string
  correction?: string
  explanation?: string
}

export interface Lesson {
  title: string
  introduction: string
  dialogue: Array<{
    speaker: string
    text: string
  }>
  vocabulary: Array<{
    spanish: string
    english: string
    category: string
  }>
  grammar: string
  exercises: Array<{
    question: string
    answer: string
    type: 'translation' | 'fill_blank' | 'multiple_choice'
  }>
  quiz: Array<{
    question: string
    options: string[]
    correct: number
  }>
}

export async function getChatResponse(
  message: string,
  scenario: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<ChatResponse> {
  const systemPrompt = `Eres un tutor de español experto y amigable. Estás actuando como ${scenario} en una conversación de práctica de español.

Tus respuestas deben seguir esta estructura:
1. Responde naturalmente como el personaje
2. Si el estudiante comete errores gramaticales, proporciona una corrección suave
3. Ofrece una breve explicación gramatical si es necesario

Responde SIEMPRE en español. Sé paciente y alentador.

Formato de respuesta JSON:
{
  "reply": "Tu respuesta natural en español",
  "correction": "Oración corregida (si hay errores)",
  "explanation": "Breve explicación gramatical (si es necesario)"
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const response = JSON.parse(completion.choices[0].message.content || "{}")
    return response
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Error al conectar con el tutor de IA')
  }
}

export async function generateLesson(
  topic: string,
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1',
  grammar: string,
  duration: number
): Promise<Lesson> {
  const systemPrompt = `Eres un profesor de español experto. Genera una lección completa y estructurada sobre el tema solicitado.

La lección debe ser adecuada para el nivel ${level} y tener una duración aproximada de ${duration} minutos.

Estructura requerida:
1. Introducción clara y motivadora
2. Diálogo contextual relevante
3. Vocabulario temático con categorías
4. Explicación gramatical clara de: ${grammar}
5. Ejercicios prácticos variados
6. Quiz de evaluación
7. Actividad de conversación

Responde en español con formato JSON estricto:
{
  "title": "Título de la lección",
  "introduction": "Introducción motivadora",
  "dialogue": [
    {"speaker": "Persona A", "text": "Diálogo en español"},
    {"speaker": "Persona B", "text": "Respuesta en español"}
  ],
  "vocabulary": [
    {"spanish": "palabra", "english": "translation", "category": "noun/verb/adjective"}
  ],
  "grammar": "Explicación detallada de ${grammar}",
  "exercises": [
    {"question": "Pregunta del ejercicio", "answer": "Respuesta correcta", "type": "translation"}
  ],
  "quiz": [
    {"question": "Pregunta de opción múltiple", "options": ["Opción A", "Opción B", "Opción C", "Opción D"], "correct": 0}
  ]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Genera una lección sobre: ${topic}` }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    })

    const lesson = JSON.parse(completion.choices[0].message.content || "{}")
    return lesson
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Error al generar la lección')
  }
}

export async function generateTeacherLesson(
  lessonTopic: string,
  studentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1',
  grammarFocus: string,
  vocabularyTheme: string,
  lessonDuration: number
): Promise<Lesson> {
  const systemPrompt = `Eres un profesor de español experimentado creando un plan de lección completo para otros docentes.

Crea una lección detallada para estudiantes de nivel ${studentLevel} con duración de ${lessonDuration} minutos.

Tema: ${lessonTopic}
Enfoque gramatical: ${grammarFocus}
Tema vocabulario: ${vocabularyTheme}

La lección debe incluir:
1. Objetivos de aprendizaje claros
2. Materiales necesarios
3. Procedimiento paso a paso
4. Actividades interactivas
5. Evaluación formativa
6. Tareas para casa

Responde en español con formato JSON:
{
  "title": "Título completo de la lección",
  "introduction": "Objetivos y descripción general",
  "dialogue": [{"speaker": "Profesor", "text": "Ejemplo de diálogo modelo"}],
  "vocabulary": [{"spanish": "término", "english": "traducción", "category": "tipo"}],
  "grammar": "Explicación gramatical detallada para el profesor",
  "exercises": [{"question": "Instrucción del ejercicio", "answer": "Respuesta modelo", "type": "tipo"}],
  "quiz": [{"question": "Pregunta evaluativa", "options": ["A", "B", "C", "D"], "correct": 0}]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Crea un plan de lección completo sobre ${lessonTopic}` }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const lesson = JSON.parse(completion.choices[0].message.content || "{}")
    return lesson
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Error al generar el plan de lección')
  }
}
