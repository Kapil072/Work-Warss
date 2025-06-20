import React from 'react';
import { useNavigate } from 'react-router-dom';

const SkillAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mb-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 relative overflow-hidden h-48 lg:h-48 flex items-center">
        <div className="absolute lg:top-2 lg:right-2 top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md" style={{ zIndex: 2 }}>
          <img src="/quiz.jpg" alt="Skill Assessment" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="pr-28 flex flex-col justify-center h-full w-full">
          <h3 className="text-white text-xl font-bold mb-2">Skill Assessment</h3>
          <p className="text-white/90 text-xs mb-4">Test your knowledge</p>
          <div className="flex-1" />
          <button 
            onClick={() => navigate('/quiz-setup')}
            className="bg-white text-gray-800 px-8 py-2 rounded-full font-medium text-base hover:bg-gray-50 transition-colors shadow-md mx-auto absolute left-1/2 bottom-4 -translate-x-1/2"
            style={{ zIndex: 2 }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment; 