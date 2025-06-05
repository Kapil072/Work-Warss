import React, { useState, useEffect, useRef } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Clock } from 'lucide-react';

const Timer = () => {
  const { timePerQuestion, goToNextQuestion, currentQuestionIndex, currentRank } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const timerRef = useRef<NodeJS.Timeout>();
  const prevTimePerQuestionRef = useRef(timePerQuestion);

  // Reset timer when timePerQuestion changes or question changes
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset time left to the new timePerQuestion
    setTimeLeft(timePerQuestion);
    prevTimePerQuestionRef.current = timePerQuestion;

    // Start new timer with the new time
    if (timePerQuestion > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            goToNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timePerQuestion, currentQuestionIndex, goToNextQuestion]);

  const getProgressColor = () => {
    if (timeLeft <= timePerQuestion * 0.2) return 'bg-red-500';
    if (timeLeft <= timePerQuestion * 0.4) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const getRankColor = () => {
    switch (currentRank) {
      case 'unranked':
        return 'text-gray-600';
      case 'bronze':
        return 'text-amber-600';
      case 'silver':
        return 'text-[#A8A9AD]';
      case 'gold':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div 
      key={`timer-${currentRank}-${timePerQuestion}-${currentQuestionIndex}`} 
      className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`bg-blue-500/10 p-2 rounded-lg ${getRankColor()}`}>
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Time Remaining</h3>
            <p className={`text-xs font-medium ${getRankColor()}`}>
              {timeLeft} seconds
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Timer; 