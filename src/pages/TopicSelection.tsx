import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import CategorySelection from '@/components/basic/CategorySelection';
import TopicSelectionComponent from '@/components/basic/TopicSelection';
import QuizIntro from '@/components/basic/QuizIntro';
import StepIndicator from '@/components/basic/StepIndicator';
import { BasicQuizProvider, useBasicQuiz } from '@/contexts/BasicQuizContext';
import { QuizTopic } from '@/types/quiz';
import { Button } from '@/components/ui/button';

const TopicSelectionContent = () => {
  const navigate = useNavigate();
  const { setTopic, startQuiz } = useQuiz();
  const { currentStep, selectedTopic, prevStep } = useBasicQuiz();

  const handleStartQuiz = () => {
    if (selectedTopic) {
      setTopic(selectedTopic as QuizTopic);
      startQuiz();
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#32c48d]/10 to-[#32c48d]/20">
      {/* Mobile Layout - Keep Original */}
      <div className="block lg:hidden max-w-md mx-auto bg-white min-h-screen p-4">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        <div className="animate-fade-in">
          {currentStep === 1 && <CategorySelection />}
          {currentStep === 2 && <TopicSelectionComponent />}
          {currentStep === 3 && <QuizIntro onStart={handleStartQuiz} />}
        </div>

        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="w-24"
            >
              Previous
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-[2000px] mx-auto px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg min-h-[calc(100vh-3rem)]">
          <div className="p-8">
            <StepIndicator currentStep={currentStep} totalSteps={3} />
            <div className="mt-8 animate-fade-in">
              {currentStep === 1 && <CategorySelection />}
              {currentStep === 2 && <TopicSelectionComponent />}
              {currentStep === 3 && <QuizIntro onStart={handleStartQuiz} />}
            </div>

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="w-32 text-base py-2"
                >
                  Previous
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopicSelection = () => {
  return (
    <BasicQuizProvider>
      <TopicSelectionContent />
    </BasicQuizProvider>
  );
};

export default TopicSelection;
