import React, { useState, useEffect } from 'react';
import { ArrowLeft, Gamepad2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SnakeGame from '../components/SnakeGame';
import TicTacToe from '../components/TicTacToe';

const FunGames: React.FC = () => {
  const [selected, setSelected] = useState<'snake' | 'tictactoe'>('snake');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGameSelect = (game: 'snake' | 'tictactoe') => {
    setIsLoading(true);
    setTimeout(() => {
      setSelected(game);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#32c48d]/10 to-[#32c48d]/20">
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-t-3xl pt-6 px-4 -mt-4 flex flex-col shadow-lg relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full animate-pulse delay-300" />
          </div>

          <div className="flex items-center mb-6 relative">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-center flex-1 text-gray-800 flex items-center justify-center gap-2">
              <Gamepad2 className="w-6 h-6 text-emerald-500" />
              Fun Games
            </h1>
          </div>

          <div className="flex justify-center gap-4 mb-6 relative">
            <button
              className={`group relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                selected === 'snake'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleGameSelect('snake')}
            >
              <span className="relative z-10">Snake</span>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
            <button
              className={`group relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                selected === 'tictactoe'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleGameSelect('tictactoe')}
            >
              <span className="relative z-10">Tic Tac Toe</span>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-white to-gray-50 rounded-xl p-4 relative">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin-slow">
                  <Gamepad2 className="w-12 h-12 text-emerald-500" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full animate-fade-in">
                {selected === 'tictactoe' ? (
                  <TicTacToe />
                ) : (
                  <SnakeGame />
                )}
              </div>
            )}
          </div>

          {/* Floating action button for quick game switch */}
          <button
            onClick={() => handleGameSelect(selected === 'snake' ? 'tictactoe' : 'snake')}
            className="absolute bottom-4 right-4 p-3 bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunGames; 