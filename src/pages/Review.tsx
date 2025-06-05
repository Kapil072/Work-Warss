import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Review = () => {
  const { allUserQuestions, allUserAnswers, questions, userAnswers, currentLevel } = useQuiz();
  const navigate = useNavigate();

  // Use allUserQuestions and allUserAnswers if available, else fallback
  const questionsToShow = allUserQuestions.length > 0 ? allUserQuestions : questions;
  const answersToShow = allUserAnswers.length > 0 ? allUserAnswers : userAnswers;

  // Only show attempted questions
  const attempted = questionsToShow
    .map((q, i) => ({ question: q, answer: answersToShow[i], index: i }))
    .filter(item => item.answer);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'unranked': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/')}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className={`flex items-center px-3 py-1.5 rounded-full border-2 ${getLevelColor(currentLevel)} shadow-md`}>
            <span className="text-sm font-bold mr-1.5 capitalize">{currentLevel}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Question Review</h2>
            <div className="space-y-4">
              {attempted.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Question {index + 1}</h3>
                    {item.answer === item.question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{item.question.question}</p>
                  <div className="space-y-2">
                    {item.question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          option === item.question.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : option === item.answer
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Review;
