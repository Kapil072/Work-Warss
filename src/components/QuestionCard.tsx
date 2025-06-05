import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Check, X, Star, Award, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  onAnswerSelected: (answer: string) => void;
}

const QuestionCard = ({ onAnswerSelected }: QuestionCardProps) => {
  const { 
    questions, 
    currentQuestionIndex, 
    userAnswers, 
    streak,
    badges,
    currentLevel,
    progressInLevel,
    questionsForLevel,
    earnedBadges
  } = useQuiz();
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex] || '';

  const totalCorrect = userAnswers.filter(
    (answer, index) => answer === questions[index]?.correctAnswer
  ).length;

  const totalWrong = userAnswers.filter(
    (answer, index) => answer && answer !== questions[index]?.correctAnswer
  ).length;

  const getOptionClass = (option: string) => {
    if (!selectedAnswer) return "";
    
    if (option === selectedAnswer) {
      if (option === currentQuestion?.correctAnswer) {
        return "border-green-500 bg-green-50";
      } else {
        return "border-red-500 bg-red-50";
      }
    } else if (option === currentQuestion?.correctAnswer) {
      // Highlight correct answer when user selected wrong
      return "border-green-500 bg-green-50";
    }
    return "";
  };

  const levelColors = {
    unranked: "text-gray-600",
    bronze: "text-amber-600",
    silver: "text-[#A8A9AD]",
    gold: "text-yellow-600"
  };

  return (
    <div className="space-y-4 p-4">
      {/* Progress and Level Info */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-blue-700">
          <span className={levelColors[currentLevel]}>
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            Progress: {progressInLevel}/{questionsForLevel}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">{streak} streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{badges}</span>
          </div>
        </div>
      </div>

      {/* Badges Display */}
      {earnedBadges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {earnedBadges.map((badge, index) => (
            <Badge key={index} className="bg-amber-500 text-xs flex items-center gap-1">
              <Trophy className="h-3 w-3" /> {badge}
            </Badge>
          ))}
        </div>
      )}

      {/* Progress Circle */}
      <div className="flex justify-center">
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E6E6E6"
              strokeWidth="2"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray={`${(currentQuestionIndex / questions.length) * 100}, 100`}
            />
          </svg>
          <div className="absolute text-blue-500 font-semibold">{currentQuestionIndex + 1}</div>
        </div>
      </div>

      {/* Score Tracking */}
      <div className="flex justify-between text-sm px-6">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-green-600 font-medium">{totalCorrect}</span>
        </div>
        <div className="text-blue-600 font-semibold">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-red-500 font-medium">{totalWrong}</span>
        </div>
      </div>

      {/* Question */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">
            {currentQuestion?.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !selectedAnswer ? onAnswerSelected(option) : null}
                className={cn(
                  "w-full p-4 border rounded-full text-left transition-all flex justify-between items-center",
                  selectedAnswer === option 
                    ? "border-purple-500 bg-purple-50" 
                    : "border-gray-200 hover:border-purple-300",
                  getOptionClass(option)
                )}
                disabled={!!selectedAnswer}
              >
                <span>{option}</span>
                {selectedAnswer === option && (
                  selectedAnswer === currentQuestion.correctAnswer ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
