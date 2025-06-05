import React from 'react';

interface TopicButtonProps {
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const TopicButton: React.FC<TopicButtonProps> = ({
  title,
  icon,
  selected,
  onClick
}) => {
  return (
    <button
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 flex flex-col items-center gap-3 ${
        selected
          ? 'bg-[#32c48d] text-white shadow-lg'
          : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg ${selected ? 'bg-white/20' : 'bg-[#32c48d]/10'}`}>
        {icon}
      </div>
      <span className="font-medium text-center">{title}</span>
    </button>
  );
};

export default TopicButton; 