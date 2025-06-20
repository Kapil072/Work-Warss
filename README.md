# Work Wars 2.0 - Interactive Quiz Application

A modern, gamified quiz application built with React, TypeScript, and Express.js. This application features AI-powered question generation, an engaging user interface, and a comprehensive progress tracking system.

## 🌟 Features

### Core Features
- Interactive quiz interface with real-time feedback
- Multiple difficulty levels (Bronze, Silver, Gold)
- Timer-based questions with countdown
- Progress tracking and level system
- XP (Experience Points) accumulation
- Badge system for achievements
- Beautiful and responsive UI with Tailwind CSS
- AI-powered question generation
- Mobile-first design approach

### Technical Features
- Real-time state management
- Secure API endpoints
- Rate limiting for API protection
- Comprehensive error handling
- Responsive design for all devices
- Optimized performance
- SEO-friendly structure

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- Node.js (v14 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- npm (comes with Node.js)
  - Verify installation: `npm --version`
- Git
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Recommended Development Tools
- Visual Studio Code (or your preferred IDE)
- Chrome DevTools (for debugging)
- Postman (for API testing)

## 📥 Installation

### 1. Clone the Repository
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd work-wars-2.0
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm install

# This will install:
# - Frontend dependencies (React, TypeScript, etc.)
# - Backend dependencies (Express, OpenAI, etc.)
# - Development dependencies (ESLint, Testing libraries, etc.)
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
# API Keys
GOOGLE_API_KEY=your_google_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (if applicable)
DATABASE_URL=your_database_url_here

# Security
JWT_SECRET=your_jwt_secret_here
```

## 🚀 Running the Application

### Development Mode

1. Start the Backend Server:
```bash
# Start the Express.js server
npm run dev

# The server will start on http://localhost:5000
# You should see a message: "Server is running on port 5000"
```

2. Start the Frontend Development Server:
```bash
# In a new terminal window
npm run dev:frontend

# The frontend will start on http://localhost:5173
# You should see the Vite development server running
```

### Production Build

1. Build the Frontend:
```bash
# Create optimized production build
npm run build

# This will create a 'dist' folder with optimized assets
```

2. Start the Production Server:
```bash
# Start the production server
npm start

# The application will be available on the configured port
```

## 📁 Project Structure

```
work-wars-2.0/
├── src/                    # Frontend source code
│   ├── components/        # Reusable React components
│   │   ├── ui/           # UI components
│   │   └── quiz/         # Quiz-specific components
│   ├── contexts/         # React context providers
│   ├── pages/           # Page components
│   ├── styles/          # CSS and styling files
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── server/               # Backend source code
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
├── public/              # Static files
├── server.cjs          # Backend server entry
├── config.cjs          # Configuration file
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-generation frontend tooling
- **React Router**: Client-side routing
- **Framer Motion**: Animation library
- **Radix UI**: Accessible UI components
- **React Query**: Data fetching and caching

### Backend
- **Express.js**: Web framework
- **OpenAI API**: AI question generation
- **Google Generative AI**: Enhanced AI capabilities
- **Winston**: Logging system
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API protection
- **JWT**: Authentication

## 🔌 API Endpoints

### Quiz Management
- `POST /api/generate-quiz`: Generate new quiz questions
- `GET /api/quiz/:id`: Get specific quiz
- `POST /api/quiz/submit`: Submit quiz answers

### User Management
- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `GET /api/user/profile`: Get user profile

### Progress Tracking
- `GET /api/progress`: Get user progress
- `POST /api/progress/update`: Update user progress
- `GET /api/badges`: Get user badges

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start backend development server
npm run dev:frontend     # Start frontend development server

# Building
npm run build           # Build frontend for production
npm run start           # Start production server

# Testing
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate test coverage report

# Linting
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues automatically

# Type Checking
npm run type-check     # Run TypeScript type checking
```

### Code Style

The project uses ESLint and Prettier for code formatting. Configuration files:
- `.eslintrc.js`: ESLint configuration
- `.prettierrc`: Prettier configuration

### Git Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Description of your changes"
```

3. Push to remote:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

## 🐛 Debugging

### Frontend Debugging
- Use Chrome DevTools
- React Developer Tools extension
- Console logging with `console.log()`

### Backend Debugging
- Use VS Code debugger
- Winston logging
- Postman for API testing

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Component Documentation](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Pull Request Process
1. Update the README.md with details of changes
2. Update the documentation if needed
3. Ensure all tests pass
4. Get code review approval

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by various quiz applications
- Built with modern web technologies 