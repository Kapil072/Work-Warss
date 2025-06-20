import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  // Recently used items from achievements
  const recentItems = [
    {
      id: 'react',
      name: 'React.js',
      description: 'Build modern user interfaces with React',
      badge: 'Gold Badge',
      progress: 100,
      completed: true
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Master modern JavaScript and ES6+ features',
      badge: 'Silver Badge',
      progress: 60,
      completed: false
    },
    {
      id: 'html-css',
      name: 'HTML & CSS',
      description: 'Learn the fundamentals of web markup and styling',
      badge: 'Bronze Badge',
      progress: 75,
      completed: false
    }
  ];

  // Recently used cluster from achievements
  const recentCluster = {
    id: 'web-development',
    name: 'Web Development',
    description: 'Master modern web development technologies and frameworks',
    progress: 66, // Example: 3 of 5 topics completed (adjust as needed)
  };

  const getBadgeEmoji = (badge: string) => {
    switch (badge) {
      case 'Bronze Badge': return '🥉';
      case 'Silver Badge': return '🥈';
      case 'Gold Badge': return '🥇';
      default: return '🏆';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Bronze Badge': return 'from-[#CD7F32] via-[#E8AC7E] to-[#CD7F32]';
      case 'Silver Badge': return 'from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0]';
      case 'Gold Badge': return 'from-[#FFD700] via-[#FFF1AA] to-[#FFD700]';
      default: return 'from-blue-400 to-blue-500';
    }
  };

  return (
    <div className="px-4 mb-4 space-y-4">
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

      {/* Recently Used Cluster */}
      <Card>
        <CardContent className="p-0">
          <div
            onClick={() => navigate(`/achievements#${recentCluster.id}`)}
            className="flex items-center gap-3 px-4 py-4 mt-2 bg-blue-600 rounded-lg cursor-pointer transition-colors border border-blue-700 hover:bg-blue-700"
            style={{ boxShadow: '0 2px 8px 0 rgba(30, 64, 175, 0.08)' }}
          >
            <div className="bg-blue-700 p-3 rounded-md flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white text-base truncate">{recentCluster.name}</h4>
                <Badge variant="outline" className="text-xs border-white text-white bg-blue-700">
                  {recentCluster.progress}%
                </Badge>
              </div>
              <p className="text-xs text-blue-100 truncate">{recentCluster.description}</p>
              <div className="mt-2 h-2 bg-blue-500 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${recentCluster.progress}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCards; 