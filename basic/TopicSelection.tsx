
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import TopicButton from '@/components/TopicButton';
import ActionButton from '@/components/ActionButton';
import { ArrowLeft } from 'lucide-react';
import { Microscope, Dna, Beaker, Atom, Monitor, Code, Globe } from 'lucide-react';

const TopicSelection = () => {
  const { getSelectedCategory, quizState, selectTopic, nextStep, prevStep } = useQuiz();
  const selectedCategory = getSelectedCategory();

  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'biology':
        return <Dna className="h-5 w-5" />;
      case 'chemistry':
        return <Beaker className="h-5 w-5" />;
      case 'physics':
        return <Atom className="h-5 w-5" />;
      case 'programming':
        return <Code className="h-5 w-5" />;
      case 'geography':
      case 'physical':
      case 'human':
      case 'cartography':
        return <Globe className="h-5 w-5" />;
      default:
        return <Microscope className="h-5 w-5" />;
    }
  };

  if (!selectedCategory) {
    return <div>Please select a category first.</div>;
  }

  return (
    <div className="animate-fade-in">
      <button 
        className="flex items-center text-gray-600 mb-4 hover:text-gray-800"
        onClick={prevStep}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>
      
      <h2 className="text-xl font-semibold mb-6">Select a topic...</h2>
      
      <div className="space-y-3 mb-8">
        {selectedCategory.topics.map(topic => (
          <TopicButton
            key={topic.id}
            title={topic.title}
            icon={getTopicIcon(topic.id)}
            selected={quizState.selectedTopic === topic.id}
            onClick={() => selectTopic(topic.id)}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <ActionButton 
          onClick={nextStep} 
          disabled={!quizState.selectedTopic}
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default TopicSelection;
