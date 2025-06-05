import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';

const LevelSystem = () => {
  const { currentLevel } = useQuiz();

  const getLevelColor = () => {
    switch (currentLevel) {
      case 'unranked':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelEmoji = () => {
    switch (currentLevel) {
      case 'unranked':
        return '❓';
      case 'bronze':
        return '🥉';
      case 'silver':
        return '🥈';
      case 'gold':
        return '🥇';
      default:
        return '❓';
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-center">
        <div className={`flex items-center px-3 py-1.5 rounded-full border-2 ${getLevelColor()} shadow-md`}>
          <span className="text-sm font-bold mr-1.5 capitalize">{currentLevel}</span>
          <span className="text-lg">{getLevelEmoji()}</span>
        </div>
      </div>
    </div>
  );
};

export default LevelSystem; 