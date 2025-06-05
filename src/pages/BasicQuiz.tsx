import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelection from '@/components/basic/CategorySelection';
import TopicSelection from '@/components/basic/TopicSelection';
import QuizIntro from '@/components/basic/QuizIntro';
import StepIndicator from '@/components/basic/StepIndicator';
import { BasicQuizProvider, useBasicQuiz } from '@/contexts/BasicQuizContext';
import { useQuiz } from '@/contexts/QuizContext';

const BasicQuizContent = () => {
  const { currentStep } = useBasicQuiz();
  const navigate = useNavigate();
  const { setTopic, startQuiz } = useQuiz();

  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#32c48d]/10 to-[#32c48d]/20">
      {/* Mobile Layout - Keep Original */}
      <div className="block lg:hidden max-w-md mx-auto bg-white min-h-screen p-4">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        {currentStep === 1 && <CategorySelection />}
        {currentStep === 2 && <TopicSelection />}
        {currentStep === 3 && <QuizIntro onStart={handleStartQuiz} />}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-[2000px] mx-auto px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg min-h-[calc(100vh-3rem)]">
          <div className="p-8">
            <StepIndicator currentStep={currentStep} totalSteps={3} />
            <div className="mt-8 animate-fade-in">
              {currentStep === 1 && <CategorySelection />}
              {currentStep === 2 && <TopicSelection />}
              {currentStep === 3 && <QuizIntro onStart={handleStartQuiz} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BasicQuiz = () => {
  return (
    <BasicQuizProvider>
      <BasicQuizContent />
    </BasicQuizProvider>
  );
};

export default BasicQuiz; 