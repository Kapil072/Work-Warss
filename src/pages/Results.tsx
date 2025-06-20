import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { ArrowLeft, Trophy, Star, XCircle, CheckCircle, Medal } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const {
    score,
    userAnswers,
    allUserQuestions,
    allUserAnswers,
    currentLevel,
    streak,
    maxStreak,
    coins,
    xp,
    currentRank,
    quizSetup,
    badges
  } = useQuiz();

  const [showAIReview, setShowAIReview] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  // Calculate overall correct and incorrect answers for the entire quiz
  const totalQuestions = allUserQuestions.length;
  const overallCorrect = allUserAnswers.filter((answer, idx) => answer === allUserQuestions[idx]?.correctAnswer).length;
  const overallIncorrect = totalQuestions - overallCorrect;
  const percentage = totalQuestions > 0 ? (overallCorrect / totalQuestions) * 100 : 0;

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You've mastered this topic!";
    if (percentage >= 70) return "Great job! You're doing well!";
    if (percentage >= 50) return "Good effort! Keep practicing to improve!";
    return "Keep learning! Practice makes perfect!";
  };

  // Example earned badges (replace with real context if available)
  const allPossibleBadges = [
    { name: 'Gold Badge', emoji: '🥇', color: 'bg-yellow-400' },
    { name: 'Silver Badge', emoji: '🥈', color: 'bg-gray-400' },
    { name: 'Bronze Badge', emoji: '🥉', color: 'bg-amber-600' },
  ];

  // Use badges from context if available, fallback to previous logic
  const earnedBadges: string[] = Array.isArray(badges) && badges.length > 0
    ? badges
    : allPossibleBadges.filter(b => (score > 0 && b.name !== 'Gold Badge') || (score > 5 && b.name === 'Gold Badge')).map(b => b.name);

  // Level progress bar logic (Olympic order, correct coloring)
  const olympicLevels = [
    { name: 'bronze', color: 'bg-amber-600' },
    { name: 'gold', color: 'bg-yellow-400' },
    { name: 'silver', color: 'bg-gray-400' },
  ];
  const levelOrder = ['unranked', 'bronze', 'silver', 'gold'];
  const currentLevelIndex = levelOrder.indexOf(currentLevel.toLowerCase());

  // Olympic badge order: Bronze (left), Gold (center/top), Silver (right)
  const olympicBadges = [
    { name: 'Bronze Badge', emoji: '🥉', color: 'bg-amber-600' },
    { name: 'Gold Badge', emoji: '🥇', color: 'bg-yellow-400' },
    { name: 'Silver Badge', emoji: '🥈', color: 'bg-gray-400' },
  ];
  const earnedOlympicBadges: string[] = olympicBadges.map(b => b.name).filter(name => earnedBadges.includes(name));

  // Add a custom slow-glow animation for badges
  const slowGlowStyle = {
    animation: 'slow-glow 2.5s infinite alternate',
    filter: 'drop-shadow(0 0 12px gold) drop-shadow(0 0 6px #fff)'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate('/')}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-gray-600">Level {currentRank}</span>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> Congratulations!</h1>
          {/* Level Progress Bar (Gamified, glowing, gold center, no badge icons) */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Order: Bronze (left), Gold (center), Silver (right) */}
            {['bronze', 'gold', 'silver'].map((level, idx) => {
              // Map to the correct index in levelOrder and colors
              const levelIdx = levelOrder.indexOf(level);
              const isCompleted = levelIdx <= currentLevelIndex;
              const isCurrent = levelIdx === currentLevelIndex;
              const colors = [
                'from-amber-400 to-yellow-600', // Bronze
                'from-yellow-300 to-yellow-500', // Gold
                'from-gray-300 to-gray-500'   // Silver
              ];
              return (
                <div key={level} className="flex flex-col items-center">
                  <div
                    className={`h-3 w-24 rounded-full transition-all duration-300 mb-1
                      bg-gradient-to-r ${colors[idx]}
                      ${isCompleted ? 'shadow-[0_0_16px_4px_rgba(255,215,0,0.7)] animate-glow' : 'bg-gray-200'}
                      ${isCurrent ? 'ring-4 ring-yellow-300' : ''}
                    `}
                    title={level.charAt(0).toUpperCase() + level.slice(1)}
                  />
                </div>
              );
            })}
          </div>
          {/* Olympic Badges Display (Gold center/top, Silver right, Bronze left, only earned, with glow) */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-8 mb-2">
              {/* Olympic order: Bronze (left), Gold (center), Silver (right) */}
              {['Bronze Badge', 'Gold Badge', 'Silver Badge'].map((badgeName, i) => (
                earnedBadges.includes(badgeName) && (
                  <button
                    key={badgeName}
                    onClick={() => { setSelectedBadge(badgeName); setShowBadgeModal(true); }}
                    className={`focus:outline-none ${badgeName === 'Gold Badge' ? 'order-2' : badgeName === 'Silver Badge' ? 'order-3' : 'order-1'}`}
                    title={badgeName}
                    style={slowGlowStyle}
                  >
                    <span className="text-6xl hover:scale-125 transition-transform duration-200">{olympicBadges.find(b => b.name === badgeName)?.emoji}</span>
                  </button>
                )
              ))}
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-1">Badges Earned</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">{earnedBadges.filter(b => ['Bronze Badge', 'Gold Badge', 'Silver Badge'].includes(b)).length} </div>
          </div>
          {/* Overall Results Summary */}
          <div className="mb-4">
            <div className="text-lg font-bold text-gray-700"></div>
            <div className="flex justify-center gap-4 mt-2 text-base">
              <div className="bg-blue-100 rounded-lg px-3 py-1">
                <span className="font-semibold text-blue-700">Total</span> <span className="text-gray-700">{totalQuestions}</span>
              </div>
              <div className="bg-green-100 rounded-lg px-3 py-1">
                <span className="font-semibold text-green-700">Correct</span> <span className="text-gray-700">{overallCorrect}</span>
              </div>
              <div className="bg-red-100 rounded-lg px-3 py-1">
                <span className="font-semibold text-red-700">Incorrect</span> <span className="text-gray-700">{overallIncorrect}</span>
              </div>
              <div className="bg-yellow-100 rounded-lg px-3 py-1">
                <span className="font-semibold text-yellow-700">Accuracy</span> <span className="text-gray-700">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          {/* AI Review clickable */}
          <div
            className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 mt-4 mb-2 shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowAIReview(true)}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-blue-700">AI Review</span>
            </div>
            <div className="text-base text-gray-700 font-medium">{getPerformanceMessage()}</div>
            <div className="text-xs text-blue-600 mt-1">Click for details</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => navigate('/e-learning')}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
          >
            Start Learning
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* AI Review Modal */}
      {showAIReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAIReview(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">AI Review</h2>
            <div className="text-lg text-gray-800 mb-2">{getPerformanceMessage()}</div>
            {/* Add more detailed review here if you want */}
          </div>
        </div>
      )}

      {/* Badge Modal */}
      {showBadgeModal && selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-xs w-full shadow-2xl relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowBadgeModal(false)}>&times;</button>
            <div className="text-7xl mb-4">{olympicBadges.find(b => b.name === selectedBadge)?.emoji}</div>
            <div className="text-xl font-bold mb-2">{selectedBadge}</div>
            <Button
              onClick={() => { setShowBadgeModal(false); navigate('/badge-verification'); }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white mt-4"
            >
              Verify Badge
            </Button>
          </div>
        </div>
      )}

      {/* Add the slow-glow keyframes to a <style> tag at the top level of the component */}
      <style>{`
      @keyframes slow-glow {
        0% { filter: drop-shadow(0 0 4px gold) drop-shadow(0 0 2px #fff); }
        100% { filter: drop-shadow(0 0 24px gold) drop-shadow(0 0 12px #fff); }
      }
      @keyframes glow {
        0% { box-shadow: 0 0 8px 2px rgba(255,215,0,0.5); }
        100% { box-shadow: 0 0 24px 8px rgba(255,215,0,1); }
      }
      .animate-glow {
        animation: glow 1.2s ease-in-out infinite alternate;
      }
      @keyframes gem-bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-8px) scale(1.15); }
      }
      .animate-gem-bounce {
        animation: gem-bounce 1.2s infinite;
      }
      `}</style>
    </div>
  );
};

export default Results; 