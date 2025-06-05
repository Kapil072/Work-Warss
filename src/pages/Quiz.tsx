import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';
import { quizData } from '@/data/quizData';
import LevelUpPopup from '@/components/LevelUpPopup';
import Timer from '@/components/Timer';
import XPProgressBar from '@/components/XPProgressBar';

const AnswerButton = ({ option, index, isSelected, onClick, isAnswered, isCorrect }: { 
  option: string; 
  index: number; 
  isSelected: boolean; 
  onClick: () => void;
  isAnswered: boolean;
  isCorrect: boolean;
}) => {
  const getButtonStyle = () => {
    if (!isAnswered) {
      return isSelected
        ? 'bg-blue-500 text-white shadow-lg'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md';
    }
    
    if (isCorrect) {
      return 'bg-blue-500 text-white shadow-lg';
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-red-500 text-white shadow-lg';
    }
    
    return 'bg-gray-100 text-gray-800 opacity-50';
  };

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${getButtonStyle()}`}
    >
      <div className="flex items-center">
        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-left">{option}</span>
      </div>
    </button>
  );
};

const Quiz = () => {
  const navigate = useNavigate();
  const { 
    questions,
    setQuestions, 
    goToNextQuestion, 
    answerQuestion, 
    isQuizCompleted,
    userAnswers,
    currentQuestionIndex,
    streak,
    badges,
    currentLevel,
    topic,
    earnedBadges,
    progressInLevel,
    questionsForLevel,
    resetQuiz,
    calculateScore,
    levelComplete,
    coins,
    timePerQuestion,
    showLevelUpPopup,
    setShowLevelUpPopup,
    currentRank
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setQuestions(quizData);
  }, [setQuestions]);

  useEffect(() => {
    if (!topic) {
      navigate('/topic-selection');
    }
  }, [topic, navigate]);

  useEffect(() => {
    if (isQuizCompleted) {
      calculateScore();
      navigate('/results');
    }
  }, [isQuizCompleted, navigate, calculateScore]);

  const handleAnswerSelected = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    answerQuestion(currentQuestion.options[answerIndex]);
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswered(false);
      goToNextQuestion();
    }, 1500);
  };

  const handleEndQuiz = () => {
    calculateScore();
    navigate('/results');
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getBackgroundColor = () => {
    switch (currentRank) {
      case 'bronze':
        return 'from-[#CE8946] via-[#CE8946] to-[#CE8946]';
      case 'silver':
        return 'from-[#6D6E71] via-[#6D6E71] to-[#6D6E71]';
      case 'gold':
        return 'from-[#EFBF04] via-[#EFBF04] to-[#EFBF04]';
      default:
        return 'from-cyan-400 via-blue-500 to-blue-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundColor()} p-4 transition-colors duration-500`}>
      {/* Mobile Layout - Keep Original */}
      <div className="block lg:hidden max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={handleBackToHome}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-gray-600">Level {currentRank}</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <XPProgressBar />
        </div>

        {/* Timer */}
        <div className="mb-6">
          <Timer />
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {currentQuestion?.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <AnswerButton
                key={index}
                option={option}
                index={index}
                isSelected={selectedAnswer === index}
                onClick={() => handleAnswerSelected(index)}
                isAnswered={isAnswered}
                isCorrect={option === currentQuestion.correctAnswer}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button
            onClick={handleEndQuiz}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            End Quiz
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-[2000px] mx-auto px-8 py-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={handleBackToHome}
                className="bg-white/10 hover:bg-white/20 text-white text-lg px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                <span className="text-lg font-medium text-gray-600">Level {currentRank}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {currentQuestion?.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion?.options.map((option, index) => (
                  <AnswerButton
                    key={index}
                    option={option}
                    index={index}
                    isSelected={selectedAnswer === index}
                    onClick={() => handleAnswerSelected(index)}
                    isAnswered={isAnswered}
                    isCorrect={option === currentQuestion.correctAnswer}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={handleEndQuiz}
                className="w-full max-w-md bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
              >
                End Quiz
              </Button>
            </div>
          </div>

          {/* Sidebar - Timer and XP */}
          <div className="col-span-4">
            <div className="sticky top-6 space-y-6">
              {/* XP Progress Bar */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
                <XPProgressBar />
              </div>

              {/* Timer */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Remaining</h3>
                <Timer />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLevelUpPopup && <LevelUpPopup />}
    </div>
  );
};

export default Quiz;
