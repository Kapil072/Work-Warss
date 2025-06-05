import React from 'react';
import { useNavigate } from 'react-router-dom';

const FunGames = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mb-4">
      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <div className="relative">
            <span className="text-3xl">🎮</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="absolute top-2 -right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="pr-20">
          <h3 className="text-white text-2xl font-bold mb-1">Fun Games</h3>
          <p className="text-white/90 text-sm mb-4">Play and enjoy</p>
          
          <button 
            onClick={() => navigate('/fun-games')}
            className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Play Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunGames; 