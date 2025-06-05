
import React from 'react';
import { cn } from '@/lib/utils';

interface TopicButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

const TopicButton: React.FC<TopicButtonProps> = ({ 
  title, 
  icon, 
  onClick, 
  selected = false,
  className
}) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full rounded-full p-3 mb-3 flex items-center transition-all duration-200",
        "text-left font-medium",
        selected ? "bg-quiz-teal text-white" : "bg-white text-gray-700 hover:bg-gray-100",
        "border border-gray-200 shadow-sm",
        className
      )}
    >
      <span className="mr-2 flex items-center justify-center">
        {icon}
      </span>
      {title}
    </button>
  );
};

export default TopicButton;
