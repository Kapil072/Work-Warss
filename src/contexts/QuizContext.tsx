import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { quizData } from '../../saved_quizzes/quizData';

// Types for our quiz data
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic?: string;
  difficulty?: QuizLevel;
  explanation: string;  // Add explanation field
}

export type QuizLevel = 'unranked' | 'bronze' | 'silver' | 'gold';

export type QuizTopic = 
  'doctor' | 'lawyer' | 'engineer' | 'teacher' | 'programmer' | 
  'designer' | 'writer' | 'artist' | 'musician' | 'chef' | 
  'businessman' | 'scientist' | 'psychologist' | 'accountant' |
  'general' | 'sports' | 'history' | 'geography' |
  'javascript' | 'html' | 'css' | 'anatomy' | 'pharmacology' |
  'criminal' | 'civil' | 'pedagogy' | 'marketing' |
  'DummySkill';

export type Badge = 'Unranked Badge' | 'Bronze Badge' | 'Silver Badge' | 'Gold Badge';

// XP requirements for each level
const XP_REQUIREMENTS = {
  unranked: 0,    // Start at 0 XP
  bronze: 30,     // Need 30 XP for bronze
  silver: 60,     // Need 60 XP for silver
  gold: 90        // Need 90 XP for gold
};

// XP rewards and penalties
const XP_REWARDS = {
  correct: 5,
  incorrect: -3
};

// Add coin rewards constants at the top with other constants
const COIN_REWARDS = {
  correct: 2,    // 2 coins per correct answer
} as const;

type Rank = 'unranked' | 'bronze' | 'silver' | 'gold';

// Add new types for quiz setup
export type QuizSetup = {
  industry: string;
  role: string;
  cluster: string;
  skill: string;
  questions?: QuizQuestion[];
};

interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  currentQuestion: QuizQuestion | null;
  userAnswers: string[];
  score: number;
  setQuestions: (questions: QuizQuestion[]) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  submitAnswer: (answer: string) => void;
  resetQuiz: () => void;
  isQuizCompleted: boolean;
  calculateScore: () => void;
  streak: number;
  maxStreak: number;
  currentLevel: QuizLevel;
  topic: QuizTopic | null;
  setTopic: (topic: QuizTopic) => void;
  timePerQuestion: number;
  badges: Badge[];
  progressInLevel: number;
  questionsForLevel: number;
  startQuiz: () => void;
  userName: string;
  setUserName: (name: string) => void;
  earnedBadges: Badge[];
  levelComplete: boolean;
  coins: number;
  setCurrentLevel: (level: QuizLevel) => void;
  setProgressInLevel: (progress: number) => void;
  setUserAnswers: (answers: string[]) => void;
  setLevelComplete: (complete: boolean) => void;
  progressToNextLevel: () => void;
  allUserQuestions: QuizQuestion[];
  allUserAnswers: string[];
  xp: number;
  currentRank: Rank;
  xpToNextLevel: number;
  updateXP: (amount: number) => void;
  saveCurrentLevelProgress: () => void;
  showLevelUpPopup: boolean;
  setShowLevelUpPopup: (show: boolean) => void;
  quizSetup: QuizSetup | null;
  setQuizSetup: (setup: QuizSetup) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Add level-specific topics
const LEVEL_TOPICS = {
  unranked: ['general', 'sports', 'history', 'geography'],
  bronze: ['javascript', 'html', 'css', 'programmer'],
  silver: ['doctor', 'lawyer', 'engineer', 'teacher'],
  gold: ['designer', 'writer', 'artist', 'musician', 'chef', 'businessman', 'scientist', 'psychologist', 'accountant']
} as const;

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<QuizLevel>('unranked');
  const [topic, setTopic] = useState<QuizTopic | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [progressInLevel, setProgressInLevel] = useState(0);
  const [userName, setUserName] = useState('');
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [levelComplete, setLevelComplete] = useState(false);
  const [coins, setCoins] = useState(0);
  const [allUserQuestions, setAllUserQuestions] = useState<QuizQuestion[]>([]);
  const [allUserAnswers, setAllUserAnswers] = useState<string[]>([]);
  const [xp, setXP] = useState(0);
  const [currentRank, setCurrentRank] = useState<Rank>('unranked');
  const [xpToNextLevel, setXPToNextLevel] = useState(XP_REQUIREMENTS.unranked);
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [quizSetup, setQuizSetup] = useState<QuizSetup | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current question
  const currentQuestion = filteredQuestions[currentQuestionIndex] || null;

  // Submit answer function
  const submitAnswer = async (answer: string) => {
    setIsLoading(true);
    try {
      // Handle the answer submission
      if (currentQuestionIndex < filteredQuestions.length) {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);

        // Check if answer is correct and update XP
        const isCorrect = answer === currentQuestion?.correctAnswer;
        updateXP(isCorrect ? XP_REWARDS.correct : XP_REWARDS.incorrect);
        
        // Update streak
        if (isCorrect) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          if (newStreak > maxStreak) {
            setMaxStreak(newStreak);
          }
        } else {
          setStreak(0);
        }

        // Check level progression or completion
        checkLevelProgressionOrCompletion();

        // Move to next question after a short delay
        setTimeout(() => {
          goToNextQuestion();
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update timePerQuestion when rank changes
  useEffect(() => {
    switch (currentRank) {
      case 'unranked':
        setTimePerQuestion(10);
        break;
      case 'bronze':
        setTimePerQuestion(15);
        break;
      case 'silver':
        setTimePerQuestion(20);
        break;
      case 'gold':
        setTimePerQuestion(25);
        break;
    }
  }, [currentRank]);

  // Define questions per level - exactly 10 questions per level
  const QUESTIONS_PER_LEVEL = 10;
  const CORRECT_ANSWERS_TO_PROGRESS = 5;
  
  // Get the number of questions for the current level - fixed at 10
  const questionsForLevel = QUESTIONS_PER_LEVEL;
  
  // Set questions filtered by current level and topic
  const setQuestions = (allQuestions: QuizQuestion[]) => {
    setAllQuestions(allQuestions);
  };

  // Function to generate questions using AI
  const generateQuestionsForLevel = async (level: QuizLevel, topic: QuizTopic) => {
    if (!quizSetup) {
      console.error('Quiz setup not found, redirecting to setup page');
      return [];
    }

    try {
      const apiBaseUrl = 'http://localhost:5000';
      
      // First, test if the server is running
      const testResponse = await fetch(`${apiBaseUrl}/test`);
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running.');
      }

      const requestData = {
        skill: quizSetup.skill,
        industry: quizSetup.industry,
        role: quizSetup.role,
        cluster: quizSetup.cluster,
        level: level.charAt(0).toUpperCase() + level.slice(1)
      };

      console.log('Sending request with data:', requestData);

      const response = await fetch(`${apiBaseUrl}/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (!response.ok || responseData.status === 'error') {
        throw new Error(responseData.message || 'Failed to generate questions');
      }

      if (!responseData.questions || !Array.isArray(responseData.questions)) {
        throw new Error('Invalid response format: missing questions array');
      }

      return responseData.questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      throw error;
    }
  };

  // Update the useEffect that filters questions to use AI generation
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizSetup) {
        console.log('No quiz setup found, redirecting to setup page');
        return;
      }

      if (!topic) {
        // Get available topics for current level
        const levelTopics = LEVEL_TOPICS[currentLevel];
        const randomTopic = levelTopics[Math.floor(Math.random() * levelTopics.length)];
        setTopic(randomTopic as QuizTopic);
        return;
      }

      // If dummy options are selected, use local dummy questions
      if (
        quizSetup.industry === 'Dummy Industry' &&
        quizSetup.role === 'Dummy Role' &&
        quizSetup.cluster === 'Dummy Cluster' &&
        quizSetup.skill === 'Dummy Skill'
      ) {
        if (topic !== 'DummySkill') {
          setTopic('DummySkill');
          return;
        }
        const dummyQuestions = quizData.filter(q => q.topic === 'DummySkill' && q.difficulty === currentLevel);
        setFilteredQuestions(dummyQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setLevelComplete(false);
        setProgressInLevel(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
      // Generate questions for the current level and topic
      const questions = await generateQuestionsForLevel(currentLevel, topic);
      
      if (questions.length > 0) {
        setFilteredQuestions(questions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setLevelComplete(false);
        setProgressInLevel(0);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to generate questions",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, currentLevel, quizSetup]);

  // Function to update XP and handle rank progression/demotion
  const updateXP = (amount: number) => {
    setXP(prev => {
      const newXp = Math.max(0, prev + amount); // Ensure XP doesn't go below 0
      
      // Handle level demotion first
      if (amount < 0) { // Only check for demotion when XP is decreasing
        if (currentRank === 'gold' && newXp < XP_REQUIREMENTS.gold) {
          setCurrentRank('silver');
          setCurrentLevel('silver');
          // Remove gold badge but keep silver
          setBadges(prev => prev.filter(badge => badge !== 'Gold Badge'));
          toast({
            title: "Level Demotion",
            description: "You've been demoted to Silver rank due to decreased performance.",
            variant: "destructive"
          });
        } else if (currentRank === 'silver' && newXp < XP_REQUIREMENTS.silver) {
          setCurrentRank('bronze');
          setCurrentLevel('bronze');
          // Remove silver badge but keep bronze
          setBadges(prev => prev.filter(badge => badge !== 'Silver Badge'));
          toast({
            title: "Level Demotion",
            description: "You've been demoted to Bronze rank due to decreased performance.",
            variant: "destructive"
          });
        } else if (currentRank === 'bronze' && newXp < XP_REQUIREMENTS.bronze) {
          setCurrentRank('unranked');
          setCurrentLevel('unranked');
          // Remove bronze badge
          setBadges(prev => prev.filter(badge => badge !== 'Bronze Badge'));
          toast({
            title: "Level Demotion",
            description: "You've been demoted to Unranked due to decreased performance.",
            variant: "destructive"
          });
        }
      }
      
      // Then handle level progression
      if (newXp >= XP_REQUIREMENTS.bronze && currentRank === 'unranked') {
        setCurrentRank('bronze');
        awardBadge('Bronze Badge');
        toast({
          title: "Level Up!",
          description: "You've reached Bronze rank!",
        });
      } else if (newXp >= XP_REQUIREMENTS.silver && (currentRank === 'unranked' || currentRank === 'bronze')) {
        setCurrentRank('silver');
        awardBadge('Silver Badge');
        toast({
          title: "Level Up!",
          description: "You've reached Silver rank!",
        });
      } else if (newXp >= XP_REQUIREMENTS.gold && (currentRank === 'unranked' || currentRank === 'bronze' || currentRank === 'silver')) {
        setCurrentRank('gold');
        awardBadge('Gold Badge');
        toast({
          title: "Level Up!",
          description: "You've reached Gold rank!",
        });
      }
      
      // End the quiz if XP reaches 140
      if (newXp >= 140) {
        calculateScore();
      }
      
      // Update XP needed for next level
      const nextLevelXP = currentRank === 'unranked' ? XP_REQUIREMENTS.bronze :
                         currentRank === 'bronze' ? XP_REQUIREMENTS.silver :
                         currentRank === 'silver' ? XP_REQUIREMENTS.gold :
                         newXp; // Gold has no next level, so use current XP
      
      setXPToNextLevel(nextLevelXP - newXp);
      
      return newXp;
    });
  };

  // Function to check if user can progress to next level
  const canProgressToNextLevel = () => {
    switch (currentRank) {
      case 'unranked':
        return xp >= XP_REQUIREMENTS.bronze;
      case 'bronze':
        return xp >= XP_REQUIREMENTS.silver;
      case 'silver':
        return xp >= XP_REQUIREMENTS.gold;
      case 'gold':
        return false; // Can't progress beyond gold
      default:
        return false;
    }
  };

  // Start the quiz with the appropriate level
  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
    setStreak(0);
    setMaxStreak(0);
    setProgressInLevel(0);
    setLevelComplete(false);
    setCoins(0);
    setCurrentLevel('unranked');
    setTimePerQuestion(10); // Set initial time for unranked level
    setXP(0);
    setCurrentRank('unranked');
    setXPToNextLevel(XP_REQUIREMENTS.unranked);
  };

  // Function to check level progression
  const checkLevelProgressionOrCompletion = () => {
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correctAnswer
    ).length;

    console.log('Checking level progression:', {
      currentLevel,
      currentRank,
      xp,
      correctAnswers,
      requiredXP: XP_REQUIREMENTS[currentLevel === 'unranked' ? 'bronze' : 
                                currentLevel === 'bronze' ? 'silver' : 
                                currentLevel === 'silver' ? 'gold' : 'gold'],
      hasEnoughCorrect: correctAnswers >= CORRECT_ANSWERS_TO_PROGRESS,
      hasEnoughXP: xp >= XP_REQUIREMENTS[currentLevel === 'unranked' ? 'bronze' : 
                                       currentLevel === 'bronze' ? 'silver' : 
                                       currentLevel === 'silver' ? 'gold' : 'gold'],
      answeredAll: userAnswers.length === QUESTIONS_PER_LEVEL
    });

    // Check if user has enough correct answers to progress to next level
    if (correctAnswers >= CORRECT_ANSWERS_TO_PROGRESS && !levelComplete) {
      // Only progress if we've answered all questions for the current level
      if (userAnswers.length === QUESTIONS_PER_LEVEL) {
        const nextLevelXP = currentLevel === 'unranked' ? XP_REQUIREMENTS.bronze :
                           currentLevel === 'bronze' ? XP_REQUIREMENTS.silver :
                           currentLevel === 'silver' ? XP_REQUIREMENTS.gold :
                           xp; // Gold has no next level

        if (xp >= nextLevelXP) {
          console.log('Progressing to next level');
          progressToNextLevel();
        } else {
          console.log('Not enough XP for next level');
          // Show results if minimum correct answers met but not enough XP
          setIsQuizCompleted(true);
          calculateScore();
          toast({
            title: "Level Not Completed",
            description: `You need more XP to progress to the next level. Keep practicing!`,
            variant: "destructive"
          });
        }
      }
    } else if (userAnswers.length === QUESTIONS_PER_LEVEL && correctAnswers < CORRECT_ANSWERS_TO_PROGRESS) {
      // Show results if minimum correct answers not met
      console.log('Not enough correct answers');
      setIsQuizCompleted(true);
      calculateScore();
      toast({
        title: "Level Not Completed",
        description: `You need at least ${CORRECT_ANSWERS_TO_PROGRESS} correct answers to progress. Try again!`,
        variant: "destructive"
      });
    }

    // Check if user has completed all questions correctly for the current level
    if (correctAnswers === QUESTIONS_PER_LEVEL) {
      setLevelComplete(true);
      // Award all badges up to and including the current level
      const badgeOrder: Badge[] = ['Unranked Badge', 'Bronze Badge', 'Silver Badge', 'Gold Badge'];
      const currentLevelIndex = badgeOrder.findIndex(badge => badge.toLowerCase().includes(currentLevel));
      for (let i = 0; i <= currentLevelIndex; i++) {
        if (!earnedBadges.includes(badgeOrder[i])) {
          awardBadge(badgeOrder[i]);
        }
      }
    }
  };

  const goToNextQuestion = () => {
    // If we're at the last question of gold level, show results
    if (currentLevel === 'gold' && currentQuestionIndex === filteredQuestions.length - 1) {
      setIsQuizCompleted(true);
      calculateScore();
      return;
    }
    
    // Continue to next question if available
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // We've completed all questions for the current level
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === filteredQuestions[index]?.correctAnswer
      ).length;

      // If we have enough correct answers to progress and we're not at gold level
      if (correctAnswers >= CORRECT_ANSWERS_TO_PROGRESS && currentLevel !== 'gold') {
        progressToNextLevel();
        setCurrentQuestionIndex(0);
      } else if (correctAnswers < CORRECT_ANSWERS_TO_PROGRESS) {
        // If we don't have enough correct answers, end the quiz and show results
        setIsQuizCompleted(true);
        calculateScore();
        toast({
          title: "Level Not Completed",
          description: `You need at least ${CORRECT_ANSWERS_TO_PROGRESS} correct answers to progress. Try again!`,
          variant: "destructive"
        });
      } else {
        // If we're at gold level or have enough correct answers, end the quiz
        setIsQuizCompleted(true);
        calculateScore();
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    // Calculate correct answers
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correctAnswer
    ).length;

    // Calculate coins from correct answers
    const coinsFromAnswers = correctAnswers * COIN_REWARDS.correct;

    // Set total coins
    setCoins(coinsFromAnswers);

    // Set score based on correct answers
    setScore(correctAnswers);
  };

  // Function to save current level's progress
  const saveCurrentLevelProgress = () => {
    setAllUserQuestions(prev => [...prev, ...filteredQuestions]);
    setAllUserAnswers(prev => [...prev, ...userAnswers]);
  };

  const resetQuiz = () => {
    // Save current level's progress before resetting
    saveCurrentLevelProgress();
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
    setStreak(0);
    setMaxStreak(0);
    setCurrentLevel('unranked');
    setProgressInLevel(0);
    setLevelComplete(false);
    setCoins(0);
    setTopic(null);
    setAllUserQuestions([]);
    setAllUserAnswers([]);
    setXP(0);
    setCurrentRank('unranked');
    setXPToNextLevel(XP_REQUIREMENTS.unranked);
    setBadges([]);
    setEarnedBadges([]);
    setTimePerQuestion(10); // Reset time to unranked time
  };

  // Function to progress to next level
  const progressToNextLevel = () => {
    console.log('Progressing to next level:', {
      currentLevel,
      currentRank,
      xp,
      canProgress: canProgressToNextLevel()
    });

    if (!canProgressToNextLevel()) {
      console.log('Cannot progress to next level - requirements not met');
      return;
    }

    // Store current questions and answers
    setAllUserQuestions(prev => [...prev, ...filteredQuestions]);
    setAllUserAnswers(prev => [...prev, ...userAnswers]);

    // Reset for new level
    setUserAnswers([]);
    setLevelComplete(false);
    setProgressInLevel(0);
    setCurrentQuestionIndex(0); // Reset question index
    setStreak(0); // Reset streak for new level
    setTopic(null); // Reset topic to trigger new topic selection

    // Update level based on current level
    let newLevel: QuizLevel;
    switch (currentLevel) {
      case 'unranked':
        newLevel = 'bronze';
        console.log('Setting level to bronze');
        setCurrentLevel('bronze');
        setCurrentRank('bronze');
        setTimePerQuestion(15); // Set time for bronze level
        break;
      case 'bronze':
        newLevel = 'silver';
        console.log('Setting level to silver');
        setCurrentLevel('silver');
        setCurrentRank('silver');
        setTimePerQuestion(20); // Set time for silver level
        break;
      case 'silver':
        newLevel = 'gold';
        console.log('Setting level to gold');
        setCurrentLevel('gold');
        setCurrentRank('gold');
        setTimePerQuestion(25); // Set time for gold level
        break;
      case 'gold':
        // Already at highest level
        console.log('Already at highest level');
        return;
      default:
        return;
    }

    // The useEffect above will handle getting new questions for the new level
    // since we set topic to null and currentLevel changed
  };

  // Function to award badges
  const awardBadge = (badge: Badge) => {
    if (!badges.includes(badge)) {
      setBadges(prev => [...prev, badge]);
      setEarnedBadges(prev => [...prev, badge]);
      
      // Award coins for the badge
      const rank = badge.toLowerCase().split(' ')[0] as Rank;
      setCoins(prev => prev + COIN_REWARDS.correct);
    }
  };

  useEffect(() => {
    if (isQuizCompleted && filteredQuestions.length && userAnswers.length) {
      setAllUserQuestions(prev => [...prev, ...filteredQuestions]);
      setAllUserAnswers(prev => [...prev, ...userAnswers]);
    }
    // eslint-disable-next-line
  }, [isQuizCompleted]);

  return (
    <QuizContext.Provider
      value={{
        questions: filteredQuestions,
        currentQuestionIndex,
        currentQuestion,
        userAnswers,
        score,
        setQuestions,
        goToNextQuestion,
        goToPreviousQuestion,
        submitAnswer,
        resetQuiz,
        isQuizCompleted,
        calculateScore,
        streak,
        maxStreak,
        currentLevel,
        topic,
        setTopic,
        timePerQuestion,
        badges,
        progressInLevel,
        questionsForLevel,
        startQuiz,
        userName,
        setUserName,
        earnedBadges,
        levelComplete,
        coins,
        setCurrentLevel,
        setProgressInLevel,
        setUserAnswers,
        setLevelComplete,
        progressToNextLevel,
        allUserQuestions,
        allUserAnswers,
        xp,
        currentRank,
        xpToNextLevel,
        updateXP,
        saveCurrentLevelProgress,
        showLevelUpPopup,
        setShowLevelUpPopup,
        quizSetup,
        setQuizSetup,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
