import React, { useState } from 'react';
import { useBasicQuiz } from '@/contexts/BasicQuizContext';
import {
  Clock, HelpCircle, Star, Trophy, Target, Sparkles, ChevronDown, ChevronUp,
  BrainCircuit, TrendingUp, BookOpenCheck
} from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  const { selectedCategory, selectedTopic } = useBasicQuiz();
  const [showAIDetails, setShowAIDetails] = useState(false);

  if (!selectedCategory || !selectedTopic) {
    return <div>Please select a category and topic first.</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome to {selectedTopic} Quiz</h1>
        <p className="text-gray-600">Category: {selectedCategory}</p>
      </div>

      {/* AI-Powered Quiz Description */}
      <div
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 mb-4 cursor-pointer hover:from-indigo-100 hover:to-purple-100 transition-all duration-300"
        onClick={() => setShowAIDetails(!showAIDetails)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-indigo-800">AI-Powered E-Learning Experience</h3>
          </div>
          {showAIDetails ? (
            <ChevronUp className="h-4 w-4 text-indigo-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-indigo-600" />
          )}
        </div>

        {showAIDetails && (
          <div className="mt-2 pt-2 border-t border-indigo-100 text-sm text-gray-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>AI adapts questions based on your performance and level.</li>
              <li>Earn XP to progress through ranks: Unranked → Bronze → Silver → Gold.</li>
              <li>Time per question adjusts with difficulty: faster thinking, higher rewards!</li>
              <li>Reinforce learning through instant feedback and retry opportunities.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Quiz Info */}
      <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="absolute inset-0 flex">
            <div className="w-1/4 h-full bg-blue-400 border-r border-white"></div>
            <div className="w-1/4 h-full bg-yellow-100 border-r border-white"></div>
            <div className="w-1/4 h-full bg-gray-300 border-r border-white"></div>
            <div className="w-1/4 h-full bg-yellow-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
            <span className="text-blue-700">Unranked</span>
            <span className="text-yellow-700">Bronze</span>
            <span className="text-gray-800">Silver</span>
            <span className="text-yellow-900">Gold</span>
          </div>
        </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">10 Questions</p>
            <p className="text-sm text-gray-600">Multiple choice format</p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Dynamic Timer</p>
            <p className="text-sm text-gray-600">10–30 seconds based on level</p>
          </div>
        </div>

        <div className="flex items-start">
          <TrendingUp className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">XP System</p>
            <p className="text-sm text-gray-600">Earn XP for correct answers and speed</p>
          </div>
        </div>

        <div className="flex items-start">
          <Target className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Rank Progression</p>
            <p className="text-sm text-gray-600">Advance through levels by earning XP</p>
          </div>
        </div>

        {/* Level Bar */}
        
        {/* Level Info */}

        <div className="flex items-start">
          <BookOpenCheck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">E-Learning Support</p>
            <p className="text-sm text-gray-600">Retry incorrect answers and track growth</p>
          </div>
        </div>

        <div className="flex items-start">
          <Trophy className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Earn Badges</p>
            <p className="text-sm text-gray-600">Unlock rewards as you rank up</p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizIntro;
