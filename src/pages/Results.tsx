import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { ArrowLeft, Trophy, Star, XCircle, CheckCircle } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const {
    score,
    userAnswers,
    allUserQuestions,
    currentLevel,
    streak,
    maxStreak,
    coins,
    xp,
    currentRank,
    quizSetup
  } = useQuiz();

  // Calculate percentage
  const totalQuestions = allUserQuestions.length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You've mastered this topic!";
    if (percentage >= 70) return "Great job! You're doing well!";
    if (percentage >= 50) return "Good effort! Keep practicing to improve!";
    return "Keep learning! Practice makes perfect!";
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Results</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Score Card */}
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">Score</h3>
              <p className="text-3xl font-bold text-blue-600">{percentage.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">({score}/{totalQuestions} correct)</p>
            </div>

            {/* Streak Card */}
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Best Streak</h3>
              <p className="text-3xl font-bold text-purple-600">{maxStreak}</p>
              <p className="text-sm text-gray-600">Current: {streak}</p>
            </div>

            {/* Rewards Card */}
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800">Rewards</h3>
              <p className="text-3xl font-bold text-green-600">{coins} 🪙</p>
              <p className="text-sm text-gray-600">+{xp} XP</p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-8">
            <p className="text-xl font-medium text-gray-800">{getPerformanceMessage()}</p>
          </div>

          {/* Quiz Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>Topic: {quizSetup?.skill || 'N/A'}</p>
              <p>Industry: {quizSetup?.industry || 'N/A'}</p>
              <p>Role: {quizSetup?.role || 'N/A'}</p>
              <p>Level: {currentLevel}</p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Question Review</h2>
          <div className="space-y-6">
            {allUserQuestions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-gray-700 mb-3">{question.question}</p>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              option === question.correctAnswer
                                ? 'bg-green-100 text-green-800'
                                : option === userAnswer && !isCorrect
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {option}
                            {option === question.correctAnswer && ' ✓'}
                            {option === userAnswer && !isCorrect && ' ✗'}
                          </div>
                        ))}
                      </div>
                      {!isCorrect && (
                        <div className="mt-3 text-sm text-gray-600">
                          <p className="font-medium">Explanation:</p>
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => navigate('/quiz-setup')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Another Quiz
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results; 