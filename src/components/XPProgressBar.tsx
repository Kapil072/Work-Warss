import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const XPProgressBar = () => {
  const { xp, currentRank, xpToNextLevel } = useQuiz();
  const [prevXP, setPrevXP] = useState(xp);
  const [xpAnimation, setXpAnimation] = useState<'increase' | 'decrease' | null>(null);

  useEffect(() => {
    if (xp > prevXP) {
      setXpAnimation('increase');
    } else if (xp < prevXP) {
      setXpAnimation('decrease');
    }
    setPrevXP(xp);

    // Reset animation after it completes
    const timer = setTimeout(() => {
      setXpAnimation(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [xp, prevXP]);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'gold':
        return 'from-yellow-400 to-amber-500';
      case 'silver':
        return 'from-gray-400 to-gray-500';
      case 'bronze':
        return 'from-amber-600 to-yellow-600';
      default:
        return 'from-blue-400 to-blue-500';
    }
  };

  const getRankEmoji = (rank: string) => {
    switch (rank) {
      case 'gold':
        return '👑';
      case 'silver':
        return '🥈';
      case 'bronze':
        return '🥉';
      default:
        return '⭐';
    }
  };

  const getProgressPercentage = () => {
    const thresholds = {
      unranked: 30,
      bronze: 60,
      silver: 90,
      gold: 140
    };

    const currentThreshold = thresholds[currentRank as keyof typeof thresholds];
    const previousThreshold = currentRank === 'unranked' ? 0 :
                            currentRank === 'bronze' ? thresholds.unranked :
                            currentRank === 'silver' ? thresholds.bronze :
                            thresholds.silver;

    const progressInCurrentLevel = xp - previousThreshold;
    const xpNeededForNextLevel = currentThreshold - previousThreshold;
    return Math.min((progressInCurrentLevel / xpNeededForNextLevel) * 100, 100);
  };

  const getNextLevelXP = () => {
    const thresholds = {
      unranked: 30,
      bronze: 60,
      silver: 90,
      gold: 90
    };

    const currentThreshold = thresholds[currentRank as keyof typeof thresholds];
    const previousThreshold = currentRank === 'unranked' ? 0 :
                            currentRank === 'bronze' ? thresholds.unranked :
                            currentRank === 'silver' ? thresholds.bronze :
                            thresholds.silver;

    return currentThreshold - previousThreshold;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`bg-gradient-to-r ${getRankColor(currentRank)} p-2 rounded-lg`}>
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">XP Progress</h3>
            <p className="text-xs text-gray-500 capitalize">{currentRank} Rank</p>
          </div>
        </div>
        <div className="text-right">
          <div 
            className={cn(
              "text-lg font-bold transition-all duration-300",
              xpAnimation === 'increase' && "animate-xp-increase",
              xpAnimation === 'decrease' && "animate-xp-decrease",
              !xpAnimation && "text-gray-800"
            )}
          >
            {xp}
          </div>
          <div className="text-xs text-gray-500">XP</div>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getRankColor(currentRank)} transition-all duration-500 ease-out`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <span className="text-2xl">{getRankEmoji(currentRank)}</span>
          <span className="text-sm font-medium text-gray-600 capitalize">{currentRank}</span>
        </div>
        {currentRank !== 'gold' && (
          <div className="text-xs text-gray-500">
            {getNextLevelXP() - (xp % getNextLevelXP())} XP to next rank
          </div>
        )}
      </div>
    </div>
  );
};

export default XPProgressBar; 