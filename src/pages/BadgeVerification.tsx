import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Trophy, Sparkles } from 'lucide-react';

const BADGES = [
  { name: 'Bronze Badge', emoji: '🥉', description: 'Complete Beginner Level', color: 'from-blue-400 to-blue-500' },
  { name: 'Silver Badge', emoji: '🥈', description: 'Complete Intermediate Level', color: 'from-blue-500 to-blue-600' },
  { name: 'Gold Badge', emoji: '🥇', description: 'Complete Expert Level', color: 'from-blue-600 to-blue-700' },
];

const getInitialVerified = () => {
  const stored = localStorage.getItem('verifiedBadges');
  return stored ? JSON.parse(stored) : [];
};

const BadgeVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState<string | null>(null);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [verified, setVerified] = useState<string[]>(getInitialVerified());
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('verifiedBadges', JSON.stringify(verified));
  }, [verified]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verifying && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && verifying) {
      setVerified(v => [...v, verifying]);
      setVerifying(null);
      setTimer(600);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    return () => clearInterval(interval);
  }, [verifying, timer]);

  const startVerification = (badge: string) => {
    setVerifying(badge);
    setTimer(600);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (timeLeft: number) => {
    if (timeLeft > 400) return 'text-blue-500';
    if (timeLeft > 200) return 'text-blue-400';
    return 'text-blue-300';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl pt-8 px-6 -mt-4 flex flex-col items-center shadow-xl relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full animate-pulse delay-300" />
          </div>

          <div className="w-full flex items-center mb-6 relative">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            </button>
            <h1 className="text-2xl font-bold text-center flex-1 text-gray-800 flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-blue-500" />
              Badge Verification
            </h1>
          </div>

          <p className="text-gray-600 text-center mb-6 max-w-sm">
            Verify your badges by completing a 10-minute interview for each. Your progress is saved automatically.
          </p>

          {verifying ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="relative mb-6">
                <div className="text-6xl mb-2 animate-bounce">
                  {BADGES.find(b => b.name === verifying)?.emoji}
                </div>
                {showConfetti && (
                  <div className="absolute inset-0 animate-confetti">
                    <Sparkles className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Verifying: {verifying}</h2>
              <p className="mb-4 text-gray-500 text-center">
                Interview in progress...<br/>
                Please stay on this page.
              </p>
              <div className={`text-4xl font-mono mb-4 ${getProgressColor(timer)}`}>
                {formatTime(timer)}
              </div>
              <div className="w-full max-w-xs bg-blue-100 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(timer / 600) * 100}%` }}
                />
              </div>
              <button
                className="mt-2 px-6 py-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-all duration-300 hover:scale-105"
                onClick={() => { setVerifying(null); setTimer(600); }}
              >
                Cancel Verification
              </button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 gap-4 mb-6">
              {BADGES.map(badge => {
                const isVerified = verified.includes(badge.name);
                return (
                  <div 
                    key={badge.name} 
                    className={`flex flex-col items-center bg-gradient-to-br ${badge.color} rounded-xl p-4 shadow-lg transform transition-all duration-300 hover:scale-105 ${
                      isVerified ? 'opacity-90' : 'opacity-100'
                    }`}
                  >
                    <div className="text-4xl mb-2 transform hover:scale-110 transition-transform duration-300">
                      {badge.emoji}
                    </div>
                    <div className="font-semibold text-white mb-1 text-center">{badge.name}</div>
                    <div className="text-xs text-white/80 mb-3 text-center">{badge.description}</div>
                    {isVerified ? (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </div>
                    ) : (
                      <button
                        className="px-4 py-1.5 bg-white text-blue-600 rounded-full text-xs font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
                        onClick={() => startVerification(badge.name)}
                      >
                        Start Verification
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats Section */}
          <div className="w-full bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Verified Badges</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {verified.length}/{BADGES.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeVerification; 