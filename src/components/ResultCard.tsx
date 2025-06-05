import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Share, Home, Trophy, Star, Award, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";

const ResultCard = () => {
  const { 
    questions, 
    userAnswers, 
    score, 
    resetQuiz, 
    streak, 
    maxStreak, 
    badges, 
    currentLevel,
    userName,
    coins,
    allUserQuestions,
    allUserAnswers,
  } = useQuiz();
  const navigate = useNavigate();

  // Use allUserQuestions and allUserAnswers for overall stats
  const questionsToShow = allUserQuestions.length > 0 ? allUserQuestions : questions;
  const answersToShow = allUserAnswers.length > 0 ? allUserAnswers : userAnswers;

  // Calculate results for each level
  const getLevelResults = (level: string) => {
    const levelQuestions = questionsToShow.filter(q => q.difficulty === level);
    const levelAnswers = levelQuestions.map((q) => {
      const questionIndex = questionsToShow.findIndex(question => question.id === q.id);
      return answersToShow[questionIndex];
    });

    const correctAnswers = levelAnswers.filter(
      (answer, index) => answer === levelQuestions[index]?.correctAnswer
    ).length;

    const wrongAnswers = levelAnswers.filter(
      (answer, index) => answer && answer !== levelQuestions[index]?.correctAnswer
    ).length;

    const completionPercentage = levelQuestions.length > 0 
      ? (levelAnswers.filter(answer => answer).length / levelQuestions.length) * 100 
      : 0;

    return {
      total: levelQuestions.length,
      correct: correctAnswers,
      wrong: wrongAnswers,
      completion: completionPercentage
    };
  };

  const beginnerResults = getLevelResults('beginner');
  const intermediateResults = getLevelResults('intermediate');
  const expertResults = getLevelResults('expert');

  // Calculate overall results
  const totalQuestions = questionsToShow.length;
  const correctAnswers = answersToShow.filter(
    (answer, index) => answer === questionsToShow[index]?.correctAnswer
  ).length;
  const wrongAnswers = answersToShow.filter(
    (answer, index) => answer && answer !== questionsToShow[index]?.correctAnswer
  ).length;
  const completionPercentage = totalQuestions > 0 
    ? (answersToShow.filter(answer => answer).length / totalQuestions) * 100 
    : 0;

  const handlePlayAgain = () => {
    resetQuiz();
    navigate('/topics');
  };

  const handleReview = () => {
    navigate('/review');
  };

  const handleShare = async () => {
    // Create the share text
    const shareText = `
🎯 Quiz Results - ${userName}
💰 Coins: ${coins}
✨ Level: ${currentLevel}
🔢 Questions: ${totalQuestions}
✓ Correct: ${correctAnswers}
✗ Wrong: ${wrongAnswers}
🔥 Streak: ${streak}
🏆 Badges: ${badges}

Level-wise Results:
🎯 Beginner: ${beginnerResults.correct}/${beginnerResults.total} correct
🎯 Intermediate: ${intermediateResults.correct}/${intermediateResults.total} correct
🎯 Expert: ${expertResults.correct}/${expertResults.total} correct
    `;

    // Try to use the Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Quiz Results',
          text: shareText,
          url: window.location.href,
        });
        toast({
          title: "Shared successfully!",
          description: "Your results have been shared."
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Your results have been copied. You can paste them anywhere."
      });
    }).catch(err => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Could not copy to clipboard",
        description: "Please try again or share manually.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Overall Results */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Overall Results</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-600">{wrongAnswers}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-blue-600">{completionPercentage.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-purple-600">{totalQuestions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level-wise Results */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Level-wise Results</h2>
          <div className="space-y-4">
            {/* Beginner Level */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-amber-800">Beginner Level</h3>
                <Badge className="bg-amber-600">Level 1</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Correct</p>
                  <p className="text-lg font-bold text-amber-800">{beginnerResults.correct}/{beginnerResults.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-lg font-bold text-amber-800">{beginnerResults.completion.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Intermediate Level */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Intermediate Level</h3>
                <Badge className="bg-gray-400">Level 2</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Correct</p>
                  <p className="text-lg font-bold text-gray-800">{intermediateResults.correct}/{intermediateResults.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-lg font-bold text-gray-800">{intermediateResults.completion.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Expert Level */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-amber-800">Expert Level</h3>
                <Badge className="bg-amber-400">Level 3</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Correct</p>
                  <p className="text-lg font-bold text-amber-800">{expertResults.correct}/{expertResults.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-lg font-bold text-amber-800">{expertResults.completion.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Badges</p>
                <p className="font-semibold">{badges}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Max Streak</p>
                <p className="font-semibold">{maxStreak}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Coins</p>
                <p className="font-semibold">{coins}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="font-semibold capitalize">{currentLevel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button onClick={handleReview} variant="outline" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Review Answers
        </Button>
        <Button onClick={handleShare} variant="outline" className="w-full">
          <Share className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        <Button onClick={handlePlayAgain} variant="outline" className="w-full">
          <Home className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
