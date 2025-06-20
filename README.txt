# Work Wars 2.0 - Interactive Quiz Application

A modern quiz application built with React, TypeScript, and Express.js, featuring AI-powered question generation and an engaging user interface.

## Features

- Interactive quiz interface with real-time feedback
- Multiple difficulty levels (Bronze, Silver, Gold)
- Timer-based questions
- Progress tracking and level system
- Beautiful and responsive UI with Tailwind CSS
- AI-powered question generation
- XP and badge system

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd work-wars-2.0
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
GOOGLE_API_KEY=your_google_api_key_here
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
.
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── contexts/         # React contexts
│   ├── pages/           # Page components
│   └── styles/          # CSS and styling files
├── server.cjs            # Backend server
├── config.cjs           # Configuration file
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Framer Motion
- Radix UI Components

### Backend
- Express.js
- OpenAI API
- Google Generative AI
- Winston (Logging)
- Helmet (Security)
- CORS
- Rate Limiting

## API Endpoints

- `POST /api/generate-quiz`: Generate quiz questions
- `GET /api/health`: Health check endpoint

## Development

### Available Scripts

- `npm run dev`: Start backend development server
- `npm run dev:frontend`: Start frontend development server
- `npm run build`: Build frontend for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run ESLint

### Code Style

The project uses ESLint for code linting and follows TypeScript best practices. Make sure to run the linter before committing:

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 