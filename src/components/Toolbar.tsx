import React, { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Flame, Coins, User } from 'lucide-react';

interface ToolbarProps {
  wide?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ wide = false }) => {
  const { userName, streak, coins, maxStreak } = useQuiz();
  const [showProfile, setShowProfile] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  return (
    <>
      <style>{`
@keyframes toolbar-glow {
  0% { box-shadow: 0 0 0px 0px #60a5fa, 0 0 0px 0px #facc15; }
  100% { box-shadow: 0 0 12px 4px #60a5fa55, 0 0 8px 2px #facc1555; }
}
`}</style>
      <nav
        className="w-full flex items-center justify-between gap-2 px-2 py-2 bg-gradient-to-r from-sky-600 to-blue-800 shadow-lg rounded-none mb-4 transition-all duration-500"
        style={{
          maxWidth: wide ? '100vw' : undefined,
          margin: wide ? '0 auto' : undefined,
        }}
      >
        {/* Profile */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-none px-2 py-1 bg-transparent hover:bg-blue-700 transition group border-0 text-white"
          onClick={() => setShowProfile(true)}
        >
          <Avatar className="h-9 w-9 border-2 border-blue-400 group-hover:scale-105 transition">
            <AvatarFallback>
              <User className="w-6 h-6 text-white" />
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white text-sm sm:text-base">
            {userName || 'Player'}
          </span>
        </Button>

        {/* Streak Bar */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer px-2 py-1 w-32 sm:w-48"
          onClick={() => setShowStreak(true)}
          title="View Streak"
        >
          <div className="flex items-center w-full mb-1 gap-1">
            <span className="text-lg">🔥</span>
            <span className="text-xs text-red-500 font-semibold">Streak</span>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-red-400">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(streak, maxStreak || 10) / (maxStreak || 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Coins */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-none px-2 py-1 bg-transparent hover:bg-blue-700 transition group border-0 text-white"
          onClick={() => setShowCoins(true)}
        >
          <Coins className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition" />
          <span className="font-bold text-yellow-500 text-sm sm:text-base">
            {coins} <span className="hidden sm:inline">Coins</span>
          </span>
        </Button>
      </nav>
      {/* Coins Modal */}
      {showCoins && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs mx-4 relative flex flex-col items-center gap-3">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowCoins(false)}
            >
              ×
            </button>
            <Coins className="w-12 h-12 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-600 mb-1">{coins} Coins</div>
            <div className="text-gray-700 text-center text-base mb-2">
              Earn coins by answering questions correctly, completing levels, and earning badges!
            </div>
            <div className="text-xs text-gray-500 text-center">Use coins to unlock new features and rewards in the future!</div>
          </div>
        </div>
      )}
      {/* Player Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-16 w-16 border-2 border-blue-400">
                <AvatarFallback>
                  <User className="w-10 h-10 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="text-lg font-bold text-gray-800">{userName || 'Player'}</div>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <Flame className="w-5 h-5 text-orange-500" />
                Streak: <span className="font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <Coins className="w-5 h-5 text-yellow-400" />
                Coins: <span className="font-bold">{coins}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Streak Modal */}
      {showStreak && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowStreak(false)}
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3">
              <Flame className="h-14 w-14 text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-orange-600">Current Streak: {streak}</div>
              <div className="w-full mt-2">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(streak, 10) * 10}%` }}></div>
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                  <span>0</span>
                  <span>{maxStreak || 10}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">Keep answering correctly to increase your streak!</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toolbar; 