import React from 'react';
import { Flame } from 'lucide-react';

const CurrentStreak = () => {
  const streak = 2; // This should come from your context/state
  const streakMax = 7;
  const streakMilestones = [1, 3, 5, 7];

  return (
    <div className="mx-4 mb-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-gray-900">Current Streak</span>
          </div>
          <span className="text-xs font-medium text-gray-600">{streak} Days</span>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((streak / streakMax) * 100, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-1.5">
          {streakMilestones.map((milestone) => (
            <div
              key={milestone}
              className={`w-1 h-1 rounded-full ${
                streak >= milestone ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentStreak; 