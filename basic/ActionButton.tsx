
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  children, 
  disabled = false,
  className
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full py-3 px-8 text-white font-medium",
        "transition-all duration-200",
        disabled 
          ? "bg-gray-300 cursor-not-allowed" 
          : "bg-quiz-pink hover:bg-pink-600 active:bg-pink-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
