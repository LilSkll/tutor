# Spanish AI Tutor

A production-ready AI-powered Spanish language learning web application that helps students learn through conversations, AI-generated lessons, and teacher-created content.

## Features

### 🗣️ Conversation Practice
- Practice Spanish with AI in real-world scenarios
- Multiple scenarios: Café, Airport, Hotel, Job Interview, Meeting Friends
- AI provides corrections and grammar explanations
- Real-time chat interface with typing indicators

### 📚 AI Lesson Generator
- Generate personalized Spanish lessons instantly
- Customizable topics, levels (A1-C1), grammar focus, and duration
- Structured lessons with dialogue, vocabulary, grammar, exercises, and quizzes
- Interactive and engaging content

### 👨‍🏫 Teacher Mode
- Create comprehensive lesson plans for students
- Editable content for customization
- Professional formatting for classroom use
- Export-ready materials

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **AI**: OpenAI ChatGPT API
- **Deployment**: Vercel-ready
- **Version Control**: Git-compatible

## Project Structure

```
spanish-ai-tutor/
├── app/
│   ├── api/
│   │   ├── chat/route.ts           # Chat API endpoint
│   │   ├── generateLesson/route.ts # Lesson generation API
│   │   └── generateTeacherLesson/route.ts # Teacher lesson API
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Homepage
│   ├── practice/page.tsx           # Conversation practice
│   ├── lesson/page.tsx             # AI lesson generator
│   └── teacher/page.tsx           # Teacher mode
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── chat/                       # Chat components
│   ├── lesson/                     # Lesson components
│   └── teacher/                    # Teacher components
├── lib/
│   ├── openai.ts                   # OpenAI utilities
│   └── utils.ts                    # Utility functions
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spanish-ai-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

### Using the Application

1. **Homepage**: Choose between Conversation Practice, AI Lessons, or Teacher Mode
2. **Conversation Practice**: Select a scenario and start chatting in Spanish
3. **AI Lessons**: Configure lesson parameters and generate personalized content
4. **Teacher Mode**: Create and edit professional lesson plans

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `OPENAI_API_KEY`: Your OpenAI API key

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - Your app will be live at a `.vercel.app` domain

### Environment Variables for Production

Make sure to add these environment variables in your deployment platform:

```
OPENAI_API_KEY=your_production_openai_api_key
NODE_ENV=production
```

## API Endpoints

### POST `/api/chat`
Handles conversation practice with AI.

**Request:**
```json
{
  "message": "Hola, ¿qué tal?",
  "scenario": "Café",
  "history": []
}
```

**Response:**
```json
{
  "reply": "¡Hola! Muy bien, gracias. ¿Qué te gustaría pedir?",
  "correction": "Hola, ¿cómo estás?",
  "explanation": "¿Qué tal? is informal, ¿cómo estás? is more standard."
}
```

### POST `/api/generateLesson`
Generates AI lessons for students.

**Request:**
```json
{
  "topic": "Ordering food",
  "level": "A2",
  "grammar": "Present tense",
  "duration": 10
}
```

### POST `/api/generateTeacherLesson`
Generates comprehensive lesson plans for teachers.

**Request:**
```json
{
  "lessonTopic": "Daily routines",
  "studentLevel": "B1",
  "grammarFocus": "Reflexive verbs",
  "vocabularyTheme": "Daily activities",
  "lessonDuration": 45
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

#### Adding New Scenarios
Edit `app/practice/page.tsx` and add to the `scenarios` array:

```typescript
{ id: 'restaurant', name: 'Restaurant', emoji: '🍽️', description: 'Dining out' }
```

#### Modifying AI Prompts
Edit the system prompts in `lib/openai.ts` to customize AI behavior and responses.

#### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Use shadcn/ui components in `components/ui/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check that your OpenAI API key is correctly set
2. Ensure all dependencies are installed
3. Verify environment variables are properly configured
4. Check the browser console for error messages

## Future Enhancements

- [ ] User authentication and progress tracking
- [ ] Voice input/output for pronunciation practice
- [ ] Gamification elements
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced analytics for teachers
- [ ] Lesson sharing and community features
