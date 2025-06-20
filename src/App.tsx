import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { QuizProvider } from '@/contexts/QuizContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from 'sonner';

// Pages
import Home from '@/pages/Home';
import QuizSetup from '@/pages/QuizSetup';
import Quiz from '@/pages/Quiz';
import Results from '@/pages/Results';
import Review from '@/pages/Review';
import Leaderboard from '@/pages/Leaderboard';
import FunGames from '@/pages/FunGames';
import BadgeVerification from '@/pages/BadgeVerification';
import Achievements from '@/pages/Achievements';
import Elearning from '@/pages/Elearning';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz-setup" element={<QuizSetup />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/review" element={<Review />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/fun-games" element={<FunGames />} />
              <Route path="/badge-verification" element={<BadgeVerification />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/e-learning" element={<Elearning />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;
