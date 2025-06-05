import React, { createContext, useContext, useState } from 'react';

interface BasicQuizContextType {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  selectedCategory: string | null;
  selectedTopic: string | null;
  setSelectedCategory: (category: string) => void;
  setSelectedTopic: (topic: string) => void;
}

const BasicQuizContext = createContext<BasicQuizContextType | undefined>(undefined);

export const BasicQuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <BasicQuizContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        selectedCategory,
        selectedTopic,
        setSelectedCategory,
        setSelectedTopic,
      }}
    >
      {children}
    </BasicQuizContext.Provider>
  );
};

export const useBasicQuiz = () => {
  const context = useContext(BasicQuizContext);
  if (context === undefined) {
    throw new Error('useBasicQuiz must be used within a BasicQuizProvider');
  }
  return context;
}; 