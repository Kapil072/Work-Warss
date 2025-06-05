import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Video, FileText, Award, GraduationCap } from 'lucide-react';

const ELearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mb-4">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <div className="relative">
            <GraduationCap className="h-8 w-8 text-purple-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute top-2 -right-2 w-2 h-2 bg-pink-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="pr-20">
          <h3 className="text-white text-2xl font-bold mb-1">E-Learning</h3>
          <p className="text-white/90 text-sm mb-4">Learn at your own pace</p>
          
          <button 
            onClick={() => navigate('/e-learning')}
            className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default ELearning; 