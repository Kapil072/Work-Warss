import React from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ThreeCandles = () => (
  <div className="relative w-6 h-6 flex items-end justify-center gap-0.5">
    {/* Second place candle (left) */}
    <div className="relative w-1.5 h-4 bg-white rounded-t-sm">
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
    </div>
    {/* First place candle (middle) */}
    <div className="relative w-1.5 h-5 bg-white rounded-t-sm">
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
    </div>
    {/* Third place candle (right) */}
    <div className="relative w-1.5 h-3 bg-white rounded-t-sm">
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
    </div>
  </div>
);

const ActionCards = () => {
  const navigate = useNavigate();
  
  const cards = [
    {
      title: 'Leaderboard',
      icon: <ThreeCandles />,
      bgColor: 'bg-blue-500',
      onClick: () => navigate('/leaderboard')
    },
    {
      title: 'Achievements',
      icon: <Trophy className="w-6 h-6 text-white" />,
      bgColor: 'bg-green-500',
      onClick: () => navigate('/achievements')
    }
  ];

  return (
    <div className="px-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`${card.bgColor} rounded-2xl p-4 h-24 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer`}
          >
            <div className="mb-2">
              {card.icon}
            </div>
            <span className="text-white text-xs font-medium text-center">
              {card.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCards; 