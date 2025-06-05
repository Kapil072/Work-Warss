import React, { useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Star } from 'lucide-react';

const LevelUpPopup = () => {
  const { currentLevel, setShowLevelUpPopup } = useQuiz();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLevelUpPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setShowLevelUpPopup]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-500 scale-100 animate-in fade-in zoom-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up!</h2>
          <p className="text-gray-600 mb-4">
            Congratulations! You've reached level {currentLevel}
          </p>
          <div className="text-sm text-gray-500">
            Keep going to reach higher levels!
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelUpPopup; 