import React from 'react';
import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  option: string;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  onClick: () => void;
  index?: number;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  onClick,
  index
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  const getButtonStyle = () => {
    if (!isAnswered) {
      return isSelected
        ? 'bg-blue-100 border-blue-500 text-blue-700'
        : 'bg-white hover:bg-gray-50 text-gray-700';
    }

    if (isCorrect) {
      return 'bg-green-100 border-green-500 text-green-700';
    }

    return isSelected
      ? 'bg-red-100 border-red-500 text-red-700'
      : 'bg-white text-gray-700';
  };

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={cn(
        'w-full p-4 text-left rounded-xl border-2 transition-all duration-300',
        'flex items-center space-x-4',
        getButtonStyle()
      )}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
          isSelected ? 'border-blue-500' : 'border-gray-300'
        }`}>
          <span className="text-sm">{String.fromCharCode(65 + (index || 0))}</span>
        </div>
        <span className="text-gray-700">{option}</span>
      </div>
    </button>
  );
};

export default AnswerButton; 