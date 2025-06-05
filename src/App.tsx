import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from '@/contexts/QuizContext';
import Home from '@/pages/Home';
import TopicSelection from '@/pages/TopicSelection';
import Quiz from '@/pages/Quiz';
import Result from '@/pages/Result';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";
import Leaderboard from "./pages/Leaderboard";
import FunGames from "./pages/FunGames";
import BadgeVerification from "./pages/BadgeVerification";
import Achievements from "./pages/Achievements";
import Elearning from "./pages/Elearning";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topics" element={<TopicSelection />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Result />} />
              <Route path="/review" element={<Review />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/fun-games" element={<FunGames />} />
              <Route path="/badge-verification" element={<BadgeVerification />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/e-learning" element={<Elearning />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;
