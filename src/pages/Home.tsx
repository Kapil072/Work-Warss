import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import CurrentStreak from '../components/CurrentStreak';
import ActionCards from '../components/ActionCards';
import SkillAssessment from '../components/SkillAssessment';
import FunGames from '../components/FunGames';
import HowItWorks from '../components/HowItWorks';
import LoadingScreen from '../components/LoadingScreen';
import ELearning from '../components/ELearning';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {/* Main content */}
      <div className={`animate-fade-in ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Mobile Layout - Keep Original */}
        <div className="block lg:hidden max-w-md mx-auto">
          <UserProfile />
          <CurrentStreak />
          <ActionCards />
          <SkillAssessment />
          <ELearning />
          <FunGames />
          <HowItWorks />
        </div>

        {/* Desktop Layout - Website Style */}
        <div className="hidden lg:block h-screen flex flex-col">
          {/* Top Profile Bar */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <UserProfile />
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="flex-1">
                    <CurrentStreak />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-7xl mx-auto px-4 py-3 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* Main Content Area */}
              <div className="col-span-8 flex flex-col gap-3 h-full">
                {/* Action Cards Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1">
                  <div className="p-3 h-full flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h2>
                    <div className="flex-1 overflow-auto">
                      <ActionCards />
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Three Equal Sections */}
                <div className="grid grid-cols-3 gap-3 flex-1">
                  {/* Skill Assessment Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-3 h-full flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Skill Assessment</h2>
                      <div className="flex-1 overflow-auto">
                        <SkillAssessment />
                      </div>
                    </div>
                  </div>

                  {/* E-Learning Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-3 h-full flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">E-Learning</h2>
                      <div className="flex-1 overflow-auto">
                        <ELearning />
                      </div>
                    </div>
                  </div>

                  {/* Fun Games Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-3 h-full flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Fun Games</h2>
                      <div className="flex-1 overflow-auto">
                        <FunGames />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-span-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                  <div className="p-3 h-full flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">How It Works</h2>
                    <div className="flex-1 overflow-auto">
                      <HowItWorks />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
