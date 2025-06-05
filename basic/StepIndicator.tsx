
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-quiz-yellow rounded-full h-2 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepIndicator;
