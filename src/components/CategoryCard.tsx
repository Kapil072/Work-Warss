import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  selected,
  onClick
}) => {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        selected
          ? 'bg-[#32c48d] text-white shadow-lg'
          : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${selected ? 'bg-white/20' : 'bg-[#32c48d]/10'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className={`text-sm ${selected ? 'text-white/90' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 