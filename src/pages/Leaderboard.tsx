import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, User, Info, Coins, Medal, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  
  // This is a simple placeholder leaderboard
  // In a real application, this would fetch data from a backend
  const topUsers = [
    { name: "Alex", score: 950, level: "expert" },
    { name: "Jordan", score: 850, level: "expert" },
    { name: "Taylor", score: 780, level: "intermediate" },
  ];

  const otherUsers = [
    { name: "Riley", score: 720, level: "intermediate" },
    { name: "Casey", score: 650, level: "beginner" },
    { name: "Morgan", score: 620, level: "beginner" },
    { name: "Jamie", score: 580, level: "beginner" },
  ];

  const currentUserRank = 239;

  const getLevelBadge = (level: string) => {
    switch(level) {
      case 'beginner': 
        return <span className="px-2 py-1 bg-[#32c48d]/10 text-[#32c48d] rounded-full text-xs">Beginner</span>;
      case 'intermediate': 
        return <span className="px-2 py-1 bg-[#32c48d]/20 text-[#32c48d] rounded-full text-xs">Intermediate</span>;
      case 'expert': 
        return <span className="px-2 py-1 bg-[#32c48d]/30 text-[#32c48d] rounded-full text-xs">Expert</span>;
      default:
        return null;
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-5 w-24 h-24 bg-sky-400 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-sky-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-2 sm:p-4 max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            className="text-gray-800 hover:bg-gray-100 p-2" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Work Wars
          </h1>
          <div className="flex items-center gap-0.5 bg-yellow-500 px-2 py-0.5 rounded-full text-black font-semibold text-sm">
            <Coins size={14} />
            <span>0</span>
          </div>
        </div>

        {/* Leaderboard Title */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Leaderboard</h2>
          <div className="flex items-center gap-1 text-sky-600 text-sm">
            <span>How it Works</span>
            <Info size={14} />
          </div>
        </div>

        {/* Top 3 Users Podium */}
        <div className="relative mb-8 h-56 sm:h-48 w-full max-w-lg mx-auto overflow-x-auto pt-16">
          {/* Podium Structure */}
          <div className="flex items-end w-[340px] sm:w-full h-full flex-nowrap">
            {/* 2nd Place */}
            <div className="flex-1 min-w-[100px] flex flex-col items-center relative h-32 bg-gray-200 rounded-t-lg shadow-md mr-0.5">
              {/* User Info for 2nd Place */}
              <div className="flex flex-col items-center absolute -top-10">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center border-2 border-sky-200 shadow-md mb-2">
                  <User size={20} className="text-white" />
                </div>
                <div className="text-center text-xs">
                  <p className="font-semibold text-gray-800">{topUsers[1].name}</p>
                  <span className="text-sm text-gray-600 font-medium flex items-center justify-center">{topUsers[1].score} <span className="ml-0.5">🔥</span></span>
                </div>
              </div>
              <div className="mt-auto mb-1 text-2xl font-bold text-gray-700">2</div>
            </div>
            {/* 1st Place */}
            <div className="flex-1 min-w-[100px] flex flex-col items-center relative h-40 bg-yellow-400 rounded-t-lg shadow-lg mx-0.5">
              <Crown className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-600 w-8 h-8" />
              {/* User Info for 1st Place */}
              <div className="flex flex-col items-center absolute -top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-lg mb-2">
                  <User size={24} className="text-white" />
                </div>
                <div className="text-center text-sm">
                  <p className="font-bold text-gray-800">{topUsers[0].name}</p>
                  <span className="text-sm text-yellow-800 font-medium flex items-center justify-center">{topUsers[0].score} <span className="ml-0.5">🔥</span></span>
                </div>
              </div>
              <div className="mt-auto mb-1 text-3xl font-bold text-gray-800">1</div>
            </div>
            {/* 3rd Place */}
            <div className="flex-1 min-w-[100px] flex flex-col items-center relative h-28 bg-orange-400 rounded-t-lg shadow-md ml-0.5">
              {/* User Info for 3rd Place */}
              <div className="flex flex-col items-center absolute -top-9">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-sky-300 shadow-md mb-2">
                  <User size={20} className="text-white" />
                </div>
                <div className="text-center text-xs">
                  <p className="font-semibold text-gray-800">{topUsers[2].name}</p>
                  <span className="text-orange-800 font-medium flex items-center justify-center">{topUsers[2].score} <span className="ml-0.5">🔥</span></span>
                </div>
              </div>
              <div className="mt-auto mb-1 text-2xl font-bold text-gray-700">3</div>
            </div>
          </div>
        </div>

        {/* Current User Rank */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-3 mb-4 border border-sky-200 shadow-sm w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-2">
            <span className="text-gray-700">You Currently Rank</span>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-gray-800">{currentUserRank}</span>
              <div className="w-5 h-5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs text-white">▲</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Rankings */}
        <div className="space-y-2 w-full">
          {otherUsers.map((user, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-300 text-sm gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold block text-gray-800">{user.name}</span>
                  {getLevelBadge(user.level)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">{user.score}</span>
                <div className="w-5 h-5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs text-white">▲</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
