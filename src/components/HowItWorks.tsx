import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Target, Trophy, Coins, Clock, Sparkles, Brain, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-gray-900 text-xl font-bold mb-4">How it works</h3>
        
        {/* Desktop View */}
        <div className="hidden lg:block space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Learn & Practice</h4>
              <p className="text-sm text-gray-600">Choose from various categories and topics to test your knowledge. Each quiz adapts to your skill level.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Level Up</h4>
              <p className="text-sm text-gray-600">Progress through ranks: Unranked → Bronze → Silver → Gold. Earn XP for correct answers and speed.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Earn Rewards</h4>
              <p className="text-sm text-gray-600">Collect badges and coins as you advance. Unlock special features and compete with others.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Time Management</h4>
              <p className="text-sm text-gray-600">Dynamic timer adjusts with difficulty. Faster answers earn more points!</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">AI-Powered Learning</h4>
              <p className="text-sm text-gray-600">Get personalized feedback and recommendations based on your performance.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-pink-50 p-2 rounded-lg">
              <Users className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Community</h4>
              <p className="text-sm text-gray-600">Compare scores, share achievements, and learn together with friends and colleagues.</p>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {/* Brief Description */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Work Wars helps you learn through interactive quizzes, earn rewards, and compete with others. Progress through levels, collect badges, and improve your skills!
            </p>
            
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setShowFullDetails(!showFullDetails)}
            >
              {showFullDetails ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>View More</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Full Details */}
          {showFullDetails && (
            <div className="mt-4 space-y-4 border-t pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Learn & Practice</h4>
                  <p className="text-xs text-gray-600">Choose from various categories and topics to test your knowledge.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Level Up</h4>
                  <p className="text-xs text-gray-600">Progress through ranks and earn XP for correct answers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-50 p-2 rounded-lg">
                  <Trophy className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Earn Rewards</h4>
                  <p className="text-xs text-gray-600">Collect badges and coins as you advance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Time Management</h4>
                  <p className="text-xs text-gray-600">Dynamic timer adjusts with difficulty level.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">AI-Powered Learning</h4>
                  <p className="text-xs text-gray-600">Get personalized feedback and recommendations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Community</h4>
                  <p className="text-xs text-gray-600">Compare scores and learn with others.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 