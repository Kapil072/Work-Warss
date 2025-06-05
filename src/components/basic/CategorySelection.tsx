import React from 'react';
import { useBasicQuiz } from '@/contexts/BasicQuizContext';
import { 
  Monitor, HardHat, Stethoscope, Scale, 
  GraduationCap, Palette, Briefcase, BookOpen 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '@/components/ActionButton';
import { ArrowLeft } from 'lucide-react';

const CategoryCard = ({ 
  title, 
  icon, 
  color, 
  onClick, 
  selected = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`rounded-xl p-4 cursor-pointer transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center
        w-full h-32 shadow-md ${selected ? 'ring-4 ring-offset-2 ring-quiz-pink' : ''}`}
      style={{ backgroundColor: color }}
    >
      <div className="text-white mb-2 text-3xl">
        {icon}
      </div>
      <h3 className="text-white font-medium text-center text-sm sm:text-base">{title}</h3>
    </div>
  );
};

const CategorySelection = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory, nextStep } = useBasicQuiz();

  const categories = [
    {
      id: 'technology',
      title: 'Technology',
      color: '#3B82F6',
    },
    {
      id: 'engineering',
      title: 'Engineering',
      color: '#10B981',
    },
    {
      id: 'medicine',
      title: 'Medicine',
      color: '#14B8A6',
    },
    {
      id: 'law',
      title: 'Law',
      color: '#8B5CF6',
    },
    {
      id: 'education',
      title: 'Education',
      color: '#F59E0B',
    },
    {
      id: 'arts',
      title: 'Arts',
      color: '#EC4899',
    },
    {
      id: 'business',
      title: 'Business',
      color: '#6366F1',
    },
    {
      id: 'general',
      title: 'General',
      color: '#6B7280',
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    nextStep();
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'technology':
        return <Monitor />;
      case 'engineering':
        return <HardHat />;
      case 'medicine':
        return <Stethoscope />;
      case 'law':
        return <Scale />;
      case 'education':
        return <GraduationCap />;
      case 'arts':
        return <Palette />;
      case 'business':
        return <Briefcase />;
      case 'general':
        return <BookOpen />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Stream</h2>
        <p className="text-gray-600">Choose a stream to explore topics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            icon={getCategoryIcon(category.id)}
            color={category.color}
            selected={selectedCategory === category.id}
            onClick={() => handleCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection; 