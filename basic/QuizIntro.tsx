
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import ActionButton from '@/components/ActionButton';
import { ArrowLeft, Award, Clock, HelpCircle } from 'lucide-react';

const QuizIntro = () => {
  const { getSelectedCategory, getSelectedTopic, nextStep, prevStep } = useQuiz();
  const selectedCategory = getSelectedCategory();
  const selectedTopic = getSelectedTopic();

  if (!selectedCategory || !selectedTopic) {
    return <div>Please select a category and topic first.</div>;
  }

  return (
    <div className="animate-fade-in">
      <button 
        className="flex items-center text-gray-600 mb-4 hover:text-gray-800"
        onClick={prevStep}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>
      
      <h2 className="text-xl font-semibold mb-2">Ready for your quiz?</h2>
      <p className="text-gray-600 mb-6">
        You selected <span className="font-medium">{selectedTopic.title}</span> in <span className="font-medium">{selectedCategory.title}</span>
      </p>
      
      <div className="bg-white rounded-xl p-5 shadow-md mb-6">
        <h3 className="font-medium text-lg mb-3">Quiz details:</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-quiz-teal mr-3 mt-0.5" />
            <div>
              <p className="font-medium">10 questions</p>
              <p className="text-sm text-gray-600">Multiple choice format</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-quiz-orange mr-3 mt-0.5" />
            <div>
              <p className="font-medium">15 minutes</p>
              <p className="text-sm text-gray-600">Take your time to answer</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Award className="h-5 w-5 text-quiz-purple mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Earn knowledge points</p>
              <p className="text-sm text-gray-600">Track your progress</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <ActionButton onClick={nextStep}>
          Start Quiz
        </ActionButton>
      </div>
    </div>
  );
};

export default QuizIntro;
