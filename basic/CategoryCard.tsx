
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  icon, 
  color, 
  onClick, 
  selected = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "rounded-xl p-4 cursor-pointer transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center",
        "w-32 h-32 shadow-md",
        selected ? "ring-4 ring-offset-2 ring-quiz-pink" : ""
      )}
      style={{ backgroundColor: color }}
    >
      <div className="text-white mb-2 text-4xl">
        {icon}
      </div>
      <h3 className="text-white font-medium text-center">{title}</h3>
    </div>
  );
};

export default CategoryCard;
