import React from 'react';
import { useBasicQuiz } from '../../src/contexts/BasicQuizContext';
import CategoryCard from '../../src/components/CategoryCard';
import ActionButton from '../../src/components/ActionButton';
import { Microscope, Monitor, HardHat, LineChart, Globe } from 'lucide-react';

const categories = [
  { id: 'science', title: 'Science', color: 'bg-blue-500' },
  { id: 'technology', title: 'Technology', color: 'bg-purple-500' },
  { id: 'engineering', title: 'Engineering', color: 'bg-green-500' },
  { id: 'mathematics', title: 'Mathematics', color: 'bg-red-500' },
  { id: 'geography', title: 'Geography', color: 'bg-yellow-500' },
];

const CategorySelection = () => {
  const { selectedCategory, setSelectedCategory, nextStep } = useBasicQuiz();

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'science':
        return <Microscope />;
      case 'technology':
        return <Monitor />;
      case 'engineering':
        return <HardHat />;
      case 'mathematics':
        return <LineChart />;
      case 'geography':
        return <Globe />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">I want to learn...</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            icon={getCategoryIcon(category.id)}
            color={category.color}
            selected={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <ActionButton 
          onClick={nextStep} 
          disabled={!selectedCategory}
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
};

export default CategorySelection;
