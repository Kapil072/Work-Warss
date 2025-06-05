import React from 'react';
import { useBasicQuiz } from '@/contexts/BasicQuizContext';
import { 
  Microscope, Dna, Beaker, Atom, Monitor, Code, Globe, 
  Book, GraduationCap, Briefcase, Scale, Stethoscope, 
  Palette, Music, Calculator, Target, Trophy, History, 
  FileText, Wrench, Heart, Pill, Gavel, School, 
  Paintbrush, DollarSign, BookOpen, Map
} from 'lucide-react';
import { QuizTopic } from '@/types/quiz';

const TopicButton = ({ 
  title, 
  icon, 
  onClick, 
  selected = false,
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full rounded-full p-3 mb-3 flex items-center transition-all duration-200
        text-left font-medium
        ${selected ? 'bg-quiz-teal text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}
        border border-gray-200 shadow-sm ${className}`}
    >
      <span className="mr-2 flex items-center justify-center">
        {icon}
      </span>
      {title}
    </button>
  );
};

const TopicSelection = () => {
  const { selectedCategory, setSelectedTopic, nextStep } = useBasicQuiz();

  const handleTopicSelect = (topicId: QuizTopic) => {
    setSelectedTopic(topicId);
    nextStep();
  };

  const getTopicIcon = (topicId: QuizTopic) => {
    switch (topicId) {
      // Technology
      case 'programmer':
      case 'javascript':
      case 'html':
      case 'css':
        return <Code className="h-5 w-5" />;
      
      // Engineering
      case 'engineer':
        return <Wrench className="h-5 w-5" />;
      
      // Medicine
      case 'doctor':
        return <Heart className="h-5 w-5" />;
      case 'anatomy':
      case 'pharmacology':
        return <Pill className="h-5 w-5" />;
      
      // Law
      case 'lawyer':
      case 'criminal':
      case 'civil':
        return <Gavel className="h-5 w-5" />;
      
      // Education
      case 'teacher':
      case 'pedagogy':
        return <School className="h-5 w-5" />;
      
      // Arts
      case 'designer':
      case 'artist':
        return <Paintbrush className="h-5 w-5" />;
      case 'musician':
        return <Music className="h-5 w-5" />;
      
      // Business
      case 'businessman':
      case 'accountant':
        return <Calculator className="h-5 w-5" />;
      case 'marketing':
        return <Target className="h-5 w-5" />;
      
      // General
      case 'general':
        return <BookOpen className="h-5 w-5" />;
      case 'sports':
        return <Trophy className="h-5 w-5" />;
      case 'history':
        return <History className="h-5 w-5" />;
      case 'geography':
        return <Map className="h-5 w-5" />;
      
      default:
        return <Microscope className="h-5 w-5" />;
    }
  };

  const getTopicsForCategory = (categoryId: string): { id: QuizTopic; title: string }[] => {
    switch (categoryId) {
      case 'technology':
        return [
          { id: 'programmer', title: 'Programming' },
          { id: 'javascript', title: 'JavaScript' },
          { id: 'html', title: 'HTML' },
          { id: 'css', title: 'CSS' }
        ];
      case 'engineering':
        return [
          { id: 'engineer', title: 'Engineering' }
        ];
      case 'medicine':
        return [
          { id: 'doctor', title: 'Medicine' },
          { id: 'anatomy', title: 'Anatomy' },
          { id: 'pharmacology', title: 'Pharmacology' }
        ];
      case 'law':
        return [
          { id: 'lawyer', title: 'Law' },
          { id: 'criminal', title: 'Criminal Law' },
          { id: 'civil', title: 'Civil Law' }
        ];
      case 'education':
        return [
          { id: 'teacher', title: 'Teaching' },
          { id: 'pedagogy', title: 'Pedagogy' }
        ];
      case 'arts':
        return [
          { id: 'designer', title: 'Design' },
          { id: 'artist', title: 'Fine Arts' },
          { id: 'musician', title: 'Music' }
        ];
      case 'business':
        return [
          { id: 'businessman', title: 'Business' },
          { id: 'accountant', title: 'Accounting' },
          { id: 'marketing', title: 'Marketing' }
        ];
      case 'general':
        return [
          { id: 'general', title: 'General Knowledge' },
          { id: 'sports', title: 'Sports' },
          { id: 'history', title: 'History' },
          { id: 'geography', title: 'Geography' }
        ];
      default:
        return [];
    }
  };

  if (!selectedCategory) {
    return <div>Please select a category first.</div>;
  }

  const topics = getTopicsForCategory(selectedCategory);

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Select a topic</h2>
      
      <div className="space-y-2 sm:space-y-3">
        {topics.map(topic => (
          <TopicButton
            key={topic.id}
            title={topic.title}
            icon={getTopicIcon(topic.id)}
            onClick={() => handleTopicSelect(topic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicSelection; 