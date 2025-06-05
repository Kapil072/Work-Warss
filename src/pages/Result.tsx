import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Trophy, Home, Share, Star, X, PartyPopper, Sparkles, Medal, Coins, Crown, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Badge as BadgeType } from '@/contexts/QuizContext';

const Result = () => {
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
    isQuizCompleted,
    saveCurrentLevelProgress,
  } = useQuiz();
  const navigate = useNavigate();
  const [showDetailedReview, setShowDetailedReview] = useState(false);

  // Combine all accumulated and current level questions/answers, de-duplicate by question ID (keep latest)
  const combinedQuestions = [...allUserQuestions, ...questions];
  const combinedAnswers = [...allUserAnswers, ...userAnswers];
  const seen = new Map();

  // Go backwards to keep the latest answer for each question
  for (let i = combinedQuestions.length - 1; i >= 0; i--) {
    const qid = combinedQuestions[i]?.id;
    // Ensure qid is valid before using it
    if (qid !== undefined && !seen.has(qid)) {
      seen.set(qid, { question: combinedQuestions[i], answer: combinedAnswers[i] });
    }
  }

  // Build the final de-duplicated arrays in the order questions were likely attempted
  const deduped = Array.from(seen.values()).reverse();
  const questionsToShow = deduped.map(item => item.question);
  const answersToShow = deduped.map(item => item.answer);

  // Calculate total correct answers and attempted questions (optional - but good for overall stats)
  const attemptedQuestions = answersToShow.filter(answer => answer !== undefined && answer !== '').length;
  const correctAnswers = answersToShow.filter((answer, index) => 
    answer !== undefined && answer !== '' && answer === questionsToShow[index]?.correctAnswer
  ).length;

  // Number of questions required to clear each level
  const QUESTIONS_PER_LEVEL = 10;

  // Calculate level-wise stats
  const getLevelStats = (level: string) => {
    let correct = 0;
    let attempted = 0;
    let levelScore = 0;

    questionsToShow.forEach((q, idx) => {
      // Only count for the specific level
      if (q.difficulty === level) {
        const answer = answersToShow[idx];
        if (answer !== undefined && answer !== '') {
          attempted++;
          if (answer === q.correctAnswer) {
            correct++;
            // Calculate level-specific score (you can adjust the scoring logic)
            levelScore += 10; // Base points for correct answer
            if (level === 'gold') levelScore += 5; // Bonus for gold level
            if (level === 'silver') levelScore += 3; // Bonus for silver level
            if (level === 'bronze') levelScore += 2; // Bonus for bronze level
          }
        }
      }
    });

    return {
      correct,
      attempted,
      score: levelScore,
      accuracy: attempted > 0 ? (correct / attempted) * 100 : 0
    };
  };

  const unrankedStats = getLevelStats('unranked');
  const bronzeStats = getLevelStats('bronze');
  const silverStats = getLevelStats('silver');
  const goldStats = getLevelStats('gold');

  // Calculate total level-wise score
  const totalLevelScore = unrankedStats.score + bronzeStats.score + silverStats.score + goldStats.score;

  const getAIReview = () => {
    if (correctAnswers / attemptedQuestions >= 0.9) {
      return "Outstanding performance! You've demonstrated exceptional mastery of the subject. ";
    } else if (correctAnswers / attemptedQuestions >= 0.75) {
      return "Great job! You've shown strong knowledge and understanding. ";
    } else if (correctAnswers / attemptedQuestions >= 0.6) {
      return "Good effort! You've grasped the basics well.";
    } else {
      return "Keep going! Learning is a journey, and every attempt helps you grow.";
    }
  };

  const getDetailedReview = () => {
    if (correctAnswers / attemptedQuestions >= 0.9) {
      return {
        title: "Exceptional Performance!",
        details: [
          "Your mastery of the subject is truly impressive",
          "You've shown excellent understanding of complex concepts",
          "Your preparation and focus have paid off",
          "You're ready for more advanced challenges"
        ],
        recommendation: "Consider taking on more challenging topics to further enhance your expertise."
      };
    } else if (correctAnswers / attemptedQuestions >= 0.75) {
      return {
        title: "Strong Performance!",
        details: [
          "You've demonstrated solid knowledge of the subject",
          "Your understanding of key concepts is good",
          "You're making steady progress",
          "A few areas could use more practice"
        ],
        recommendation: "Focus on reviewing the questions you missed to strengthen your knowledge."
      };
    } else if (correctAnswers / attemptedQuestions >= 0.6) {
      return {
        title: "Good Progress!",
        details: [
          "You've grasped the fundamental concepts",
          "Your basic understanding is solid",
          "There's room for improvement",
          "Keep practicing to build confidence"
        ],
        recommendation: "Take time to review the basics and practice more to improve your accuracy."
      };
    } else {
      return {
        title: "Learning Journey",
        details: [
          "Every attempt is a step forward",
          "Focus on understanding the basics",
          "Don't be discouraged by mistakes",
          "Practice makes perfect"
        ],
        recommendation: "Start with the basics and gradually build up your knowledge."
      };
    }
  };

  const handlePlayAgain = () => {
    resetQuiz();
    navigate('/topic-selection');
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  const handleShare = async () => {
    // Create the share text
    const shareText = `
🎯 Quiz Results - ${userName}
💰 Coins: ${coins}
✨ Level: ${currentLevel}
🔢 Questions: ${attemptedQuestions}
✓ Correct: ${correctAnswers}
🔥 Streak: ${streak}
🏆 Badges: ${badges.join(', ')}

Level-wise Results:
🎯 Unranked: ${unrankedStats.correct}/${unrankedStats.attempted} correct
🎯 Bronze: ${bronzeStats.correct}/${bronzeStats.attempted} correct
🎯 Silver: ${silverStats.correct}/${silverStats.attempted} correct
🎯 Gold: ${goldStats.correct}/${goldStats.attempted} correct
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

  const detailedReview = getDetailedReview();

  const getRankEmoji = () => {
    switch(currentLevel) {
      case 'unranked':
        return '⭐';
      case 'bronze':
        return '🥉';
      case 'silver':
        return '🥈';
      case 'gold':
        return '👑';
      default:
        return '⭐';
    }
  };

  // Ensure last level's progress is saved for results
  useEffect(() => {
    if (isQuizCompleted) {
      saveCurrentLevelProgress();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-4 sm:p-6 lg:p-8">
      {/* Mobile Layout */}
      <div className="block lg:hidden max-w-md mx-auto">
        <div className="w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Celebration Header */}
          <div className="text-center mb-4 relative">
            <div className="relative">
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                Congratulations!
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Amazing job, {userName}! 🎉</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              {correctAnswers}/{attemptedQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
            <div className="mt-2 text-xs text-gray-500">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-600">Unranked:</span> {unrankedStats.correct}/{unrankedStats.attempted}
                  <div className="text-xs text-gray-500">Score: {unrankedStats.score}</div>
                </div>
                <div>
                  <span className="text-amber-600">Bronze:</span> {bronzeStats.correct}/{bronzeStats.attempted}
                  <div className="text-xs text-amber-600">Score: {bronzeStats.score}</div>
                </div>
                <div>
                  <span className="text-slate-600">Silver:</span> {silverStats.correct}/{silverStats.attempted}
                  <div className="text-xs text-slate-600">Score: {silverStats.score}</div>
                </div>
                <div>
                  <span className="text-yellow-600">Gold:</span> {goldStats.correct}/{goldStats.attempted}
                  <div className="text-xs text-yellow-600">Score: {goldStats.score}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Level and Stats Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {/* Level Badge */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium capitalize flex items-center">
              <span>{currentLevel} Level</span>
            </div>

            {/* Streak Badge */}
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
              <span className="text-xs mr-1">Streak</span>
              <span className="text-base">🔥</span>
              <span className="text-xs ml-1">{streak}</span>
            </div>

            {/* XP Badge */}
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
              <span className="text-xs mr-1">XP</span>
              <span className="text-base">⭐</span>
              <span className="text-xs ml-1">{score}</span>
            </div>
          </div>

          {/* Coins Earned Box */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🪙</span>
              <span className="text-2xl font-bold text-amber-600">{coins}</span>
            </div>
            <div className="text-sm text-amber-600">Coins Earned</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            {/* Badges Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Medal className="h-6 w-6 text-blue-500" />
                <div className="text-lg font-bold text-gray-700">Badges Earned</div>
              </div>

              {/* Badges Grid */}
              <div className="space-y-4">
                {/* Achievement Badges */}
                {badges.some(badge => ['Bronze Badge', 'Silver Badge', 'Gold Badge'].includes(badge as BadgeType)) && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2 px-2">Achievement Badges</h4>
                    <div className="flex justify-center gap-4">
                      {['Gold Badge', 'Silver Badge', 'Bronze Badge'].map((badgeType) => {
                        const hasBadge = badges.includes(badgeType as BadgeType);
                        let badgeEmoji = '🏆';
                        let badgeColor = 'from-gray-200 to-gray-300';
                        let badgeName = 'Locked';
                        
                        switch(badgeType) {
                          case 'Bronze Badge': 
                            badgeEmoji = '🥉';
                            badgeColor = hasBadge ? 'from-amber-600 to-yellow-600' : 'from-gray-200 to-gray-300';
                            badgeName = 'Bronze';
                            break;
                          case 'Silver Badge': 
                            badgeEmoji = '🥈';
                            badgeColor = hasBadge ? 'from-gray-400 to-gray-500' : 'from-gray-200 to-gray-300';
                            badgeName = 'Silver';
                            break;
                          case 'Gold Badge': 
                            badgeEmoji = '🥇';
                            badgeColor = hasBadge ? 'from-yellow-400 to-amber-500' : 'from-gray-200 to-gray-300';
                            badgeName = 'Gold';
                            break;
                        }

                        return (
                          <div key={badgeType} className="flex flex-col items-center">
                            <div className={`bg-gradient-to-br ${badgeColor} p-3 rounded-full text-3xl transform hover:scale-110 transition-transform duration-300 shadow-lg mb-1 ${!hasBadge ? 'opacity-50' : ''}`}>
                              {badgeEmoji}
                            </div>
                            <span className="text-xs font-medium text-gray-600">{badgeName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* AI Review */}
            <div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 border border-blue-100 shadow-lg"
              onClick={() => setShowDetailedReview(true)}
            >
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">AI Review</h3>
                  <p className="text-gray-700 text-sm">{getAIReview()}</p>
                  <p className="text-blue-600 text-xs mt-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Click to see detailed analysis
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-105 transition-all duration-300"
            >
              <Share className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button
              onClick={handleBackToHome}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-105 transition-all duration-300"
            >
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          {/* Celebration Header */}
          <div className="text-center mb-8 relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full shadow-lg">
                <PartyPopper className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
              Congratulations!
            </h1>
            <p className="text-gray-600 text-xl">Amazing job, {userName}! 🎉</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Score and Stats */}
            <div className="col-span-5 space-y-6">
              {/* Score Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    {correctAnswers}/{attemptedQuestions}
                  </div>
                  <div className="text-xl text-gray-600">Correct Answers (This Result)</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mb-1">
                  <div className="font-semibold text-gray-500">Level</div>
                  <div className="font-semibold text-gray-500 text-center">Score</div>
                  <div className="font-semibold text-gray-500 text-center">Accuracy</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center"> <span className="text-gray-600">Unranked</span> </div>
                  <div className="text-center font-bold text-gray-800">{unrankedStats.score}</div>
                  <div className="text-center font-medium text-gray-800">{unrankedStats.accuracy.toFixed(1)}%</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center"> <span className="text-amber-600 font-medium">Bronze</span> </div>
                  <div className="text-center font-bold text-amber-600">{bronzeStats.score}</div>
                  <div className="text-center font-medium text-amber-600">{bronzeStats.accuracy.toFixed(1)}%</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center"> <span className="text-slate-600 font-medium">Silver</span> </div>
                  <div className="text-center font-bold text-slate-600">{silverStats.score}</div>
                  <div className="text-center font-medium text-slate-600">{silverStats.accuracy.toFixed(1)}%</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center"> <span className="text-yellow-600 font-medium">Gold</span> </div>
                  <div className="text-center font-bold text-yellow-600">{goldStats.score}</div>
                  <div className="text-center font-medium text-yellow-600">{goldStats.accuracy.toFixed(1)}%</div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center font-semibold"> <span className="text-blue-600">Total</span> </div>
                    <div className="text-center font-bold text-blue-600">{totalLevelScore}</div>
                    <div className="text-center font-medium text-blue-600">
                      {((correctAnswers / attemptedQuestions) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Coins and Level Section */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-4xl">🪙</span>
                  <span className="text-4xl font-bold text-amber-600">{coins}</span>
                </div>
                <div className="text-xl text-amber-600 font-medium text-center mb-4">Coins Earned</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-base font-medium flex items-center justify-center">
                    <Crown className="h-5 w-5 mr-2" />
                    <span className="capitalize">{currentLevel}</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-xl text-base font-medium flex items-center justify-center">
                    <span className="text-xl mr-2">🔥</span>
                    <span>{streak}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Questions</span>
                    <span className="font-medium text-gray-800">{attemptedQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-medium text-gray-800">
                      {((correctAnswers / attemptedQuestions) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total XP</span>
                    <span className="font-medium text-gray-800 flex items-center gap-2">
                      <span className="text-xl">⭐</span>
                      {score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Badges and Actions */}
            <div className="col-span-7 space-y-6">
              {/* Badges Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-lg">
                    <Medal className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">Badges Earned</div>
                </div>

                {/* Achievement Badges */}
                {badges.some(badge => ['Bronze Badge', 'Silver Badge', 'Gold Badge'].includes(badge as BadgeType)) && (
                  <div className="flex justify-center gap-8">
                    {['Gold Badge', 'Silver Badge', 'Bronze Badge'].map((badgeType) => {
                      const hasBadge = badges.includes(badgeType as BadgeType);
                      let badgeEmoji = '🏆';
                      let badgeColor = 'from-gray-200 to-gray-300';
                      let badgeName = 'Locked';
                      
                      switch(badgeType) {
                        case 'Bronze Badge': 
                          badgeEmoji = '🥉';
                          badgeColor = hasBadge ? 'from-amber-600 to-yellow-600' : 'from-gray-200 to-gray-300';
                          badgeName = 'Bronze';
                          break;
                        case 'Silver Badge': 
                          badgeEmoji = '🥈';
                          badgeColor = hasBadge ? 'from-gray-400 to-gray-500' : 'from-gray-200 to-gray-300';
                          badgeName = 'Silver';
                          break;
                        case 'Gold Badge': 
                          badgeEmoji = '🥇';
                          badgeColor = hasBadge ? 'from-yellow-400 to-amber-500' : 'from-gray-200 to-gray-300';
                          badgeName = 'Gold';
                          break;
                      }

                      return (
                        <div key={badgeType} className="flex flex-col items-center group">
                          <div className={`bg-gradient-to-br ${badgeColor} p-4 rounded-full text-4xl transform hover:scale-110 transition-all duration-300 shadow-lg mb-2 ${!hasBadge ? 'opacity-50' : ''} ${badgeType === 'Gold Badge' ? 'scale-110' : ''}`}>
                            {badgeEmoji}
                            {hasBadge && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                          </div>
                          <span className="text-base font-medium text-gray-700">{badgeName}</span>
                          {hasBadge && (
                            <span className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Certified
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Review */}
              <div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => setShowDetailedReview(true)}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">AI Review</h3>
                    <p className="text-gray-700 text-base">{getAIReview()}</p>
                    <p className="text-blue-600 text-sm mt-2 flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Click to see detailed analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-[1.02] transition-all duration-300 text-base py-5 rounded-xl shadow-lg"
                >
                  <Share className="mr-2 h-5 w-5" />
                  Share Results
                </Button>
                <Button
                  onClick={handleBackToHome}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-[1.02] transition-all duration-300 text-base py-5 rounded-xl shadow-lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Review Modal */}
      {showDetailedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{detailedReview.title}</h2>
                <p className="text-gray-600">{getAIReview()}</p>
              </div>
              <button
                onClick={() => setShowDetailedReview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {detailedReview.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Recommendation</h3>
                <p className="text-blue-600">{detailedReview.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
