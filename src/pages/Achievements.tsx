import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { 
  ArrowLeft, Trophy, Star, Target, 
  ChevronDown, ChevronUp, Lock, 
  CheckCircle2, Sparkles, BookOpenCheck,
  Info, Award, GraduationCap, PlayCircle,
  BookOpen, Clock, Users, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cluster {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
  requiredTopics: number;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  badge: BadgeType;
  progress: number;
  unlocked?: boolean;
}

type BadgeType = 'Bronze Badge' | 'Silver Badge' | 'Gold Badge';

interface BadgeCount {
  type: BadgeType;
  count: number;
  earnedDates: string[];
}

const CLUSTERS: Cluster[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Master modern web development technologies and frameworks (React.js Completed)',
    requiredTopics: 4,
    topics: [
      { 
        id: 'html-css',
        name: 'HTML & CSS',
        description: 'Learn the fundamentals of web markup and styling',
        completed: false,
        badge: 'Bronze Badge',
        progress: 75,
        unlocked: true
      },
      { 
        id: 'javascript',
        name: 'JavaScript',
        description: 'Master modern JavaScript and ES6+ features',
        completed: false,
        badge: 'Silver Badge',
        progress: 60,
        unlocked: true
      },
      { 
        id: 'react',
        name: 'React.js',
        description: 'Build modern user interfaces with React (Completed)',
        completed: true,
        badge: 'Gold Badge',
        progress: 100,
        unlocked: true
      },
      { 
        id: 'node-express',
        name: 'Node.js & Express',
        description: 'Create robust backend services and APIs',
        completed: false,
        badge: 'Gold Badge',
        progress: 30,
        unlocked: true
      },
      { 
        id: 'database',
        name: 'Database & ORM',
        description: 'Work with databases and ORM frameworks',
        completed: false,
        badge: 'Silver Badge',
        progress: 20,
        unlocked: true
      }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Explore the world of AI and machine learning algorithms',
    requiredTopics: 4,
    topics: [
      { 
        id: 'ml-basics',
        name: 'ML Fundamentals',
        description: 'Understand core machine learning concepts',
        completed: false,
        badge: 'Bronze Badge',
        progress: 80,
        unlocked: true
      },
      { 
        id: 'supervised-learning',
        name: 'Supervised Learning',
        description: 'Master classification and regression algorithms',
        completed: false,
        badge: 'Silver Badge',
        progress: 65,
        unlocked: true
      },
      { 
        id: 'unsupervised-learning',
        name: 'Unsupervised Learning',
        description: 'Learn clustering and dimensionality reduction',
        completed: false,
        badge: 'Silver Badge',
        progress: 50,
        unlocked: true
      },
      { 
        id: 'deep-learning',
        name: 'Deep Learning',
        description: 'Build and train neural networks',
        completed: false,
        badge: 'Gold Badge',
        progress: 35,
        unlocked: true
      },
      { 
        id: 'nlp',
        name: 'Natural Language Processing',
        description: 'Process and analyze text data',
        completed: false,
        badge: 'Gold Badge',
        progress: 25,
        unlocked: true
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Master data analysis, visualization, and statistical methods',
    requiredTopics: 3,
    topics: [
      { 
        id: 'data-analysis',
        name: 'Data Analysis',
        description: 'Learn data cleaning and exploratory analysis',
        completed: false,
        badge: 'Bronze Badge',
        progress: 70,
        unlocked: true
      },
      { 
        id: 'data-visualization',
        name: 'Data Visualization',
        description: 'Create compelling data visualizations',
        completed: false,
        badge: 'Silver Badge',
        progress: 55,
        unlocked: true
      },
      { 
        id: 'statistical-methods',
        name: 'Statistical Methods',
        description: 'Apply statistical techniques to data',
        completed: false,
        badge: 'Gold Badge',
        progress: 40,
        unlocked: true
      },
      { 
        id: 'big-data',
        name: 'Big Data Processing',
        description: 'Handle and process large datasets',
        completed: false,
        badge: 'Gold Badge',
        progress: 30,
        unlocked: true
      }
    ]
  }
];

const COURSES = [
  {
    id: 'math-fundamentals',
    title: 'Mathematics Fundamentals',
    description: 'Master the basics of mathematics with interactive video lectures',
    duration: '8 hours',
    students: '1.2k',
    level: 'Beginner',
    badge: 'Bronze Badge',
    videoCount: 24,
    certification: true
  },
  {
    id: 'advanced-math',
    title: 'Advanced Mathematics',
    description: 'Deep dive into advanced mathematical concepts and applications',
    duration: '12 hours',
    students: '850',
    level: 'Intermediate',
    badge: 'Silver Badge',
    videoCount: 32,
    certification: true
  },
  {
    id: 'master-math',
    title: 'Mathematics Mastery',
    description: 'Become a mathematics expert with comprehensive course material',
    duration: '16 hours',
    students: '500',
    level: 'Advanced',
    badge: 'Gold Badge',
    videoCount: 40,
    certification: true
  }
];

const Achievements = () => {
  const navigate = useNavigate();
  const { badges, currentLevel } = useQuiz();
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);

  // Calculate badge counts (this would come from your backend/context in a real app)
  const badgeCounts: BadgeCount[] = [
    {
      type: 'Gold Badge',
      count: 20,
      earnedDates: ['2024-03-15', '2024-03-10', '2024-03-05', /* ... more dates ... */]
    },
    {
      type: 'Silver Badge',
      count: 10,
      earnedDates: ['2024-03-14', '2024-03-09', '2024-03-04', /* ... more dates ... */]
    },
    {
      type: 'Bronze Badge',
      count: 5,
      earnedDates: ['2024-03-13', '2024-03-08', '2024-03-03', /* ... more dates ... */]
    }
  ];

  const getBadgeEmoji = (badge: BadgeType) => {
    switch (badge) {
      case 'Bronze Badge': return '🥉';
      case 'Silver Badge': return '🥈';
      case 'Gold Badge': return '🥇';
      default: return '🏆';
    }
  };

  const getBadgeColor = (badge: BadgeType) => {
    switch (badge) {
      case 'Bronze Badge': return 'from-[#CE8946] via-[#CE8946]/90 to-[#CE8946]/80 shadow-[#CE8946]/50 animate-pulse-slow';
      case 'Silver Badge': return 'from-[#6D6E71] via-[#6D6E71]/90 to-[#6D6E71]/80 shadow-[#6D6E71]/50 animate-pulse-slow';
      case 'Gold Badge': return 'from-[#EFBF04] via-[#EFBF04]/90 to-[#EFBF04]/80 shadow-[#EFBF04]/50 animate-pulse-slow badge-glow';
      default: return 'from-blue-400 to-blue-500';
    }
  };

  const getClusterProgress = (cluster: Cluster) => {
    const completedTopics = cluster.topics.filter(topic => topic.completed).length;
    return (completedTopics / cluster.requiredTopics) * 100;
  };

  const getBadgeDescription = (badge: BadgeType) => {
    switch (badge) {
      case 'Bronze Badge':
        return 'Master the basics and complete fundamental topics to earn this badge.';
      case 'Silver Badge':
        return 'Demonstrate advanced understanding and complete intermediate topics.';
      case 'Gold Badge':
        return 'Achieve excellence by mastering complex topics and maintaining high performance.';
      default:
        return '';
    }
  };

  const getBadgeRequirements = (badge: BadgeType) => {
    switch (badge) {
      case 'Bronze Badge':
        return ['Complete 3 fundamental topics', 'Score at least 70% in quizzes', 'Maintain a 3-day streak'];
      case 'Silver Badge':
        return ['Complete 5 advanced topics', 'Score at least 85% in quizzes', 'Maintain a 7-day streak'];
      case 'Gold Badge':
        return ['Complete all topics', 'Score 95% or higher in quizzes', 'Maintain a 14-day streak'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/50 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 ml-4">Achievements</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm w-fit">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">{badges.length} Badges</span>
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Your Badges</h2>
            </div>
            <button
              onClick={() => setShowBadgeInfo(!showBadgeInfo)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Info className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Mobile Layout */}
          <div className="flex sm:hidden justify-between items-center gap-2 px-2">
            {[
              { type: 'Bronze Badge', order: 'order-1' },
              { type: 'Gold Badge', order: 'order-2' },
              { type: 'Silver Badge', order: 'order-3' }
            ].map(({ type, order }) => {
              const badgeCount = badgeCounts.find(b => b.type === type);
              const badgeEmoji = getBadgeEmoji(type as BadgeType);
              const badgeColor = getBadgeColor(type as BadgeType);
              const hasBadge = badges.includes(type as BadgeType);
              
              return (
                <motion.div
                  key={type}
                  className={`group cursor-pointer ${order} flex-1 max-w-[100px] ${type === 'Gold Badge' ? 'z-10' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedBadge(type as BadgeType);
                    setShowBadgeDetails(true);
                  }}
                >
                  <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 ${type === 'Gold Badge' ? 'transform scale-110' : ''}`}>
                    <div className="flex flex-col items-center">
                      <div className={`bg-gradient-to-br ${badgeColor} p-2 rounded-full text-2xl transform transition-all duration-300 ${hasBadge ? 'shadow-lg animate-pulse-slow' : 'opacity-50'} ${type === 'Gold Badge' ? 'scale-110' : ''}`}>
                        {badgeEmoji}
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-lg font-bold text-gray-800">{badgeCount?.count || 0}</div>
                        <div className="text-xs text-gray-600">Earned</div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 mt-1">
                        {type.split(' ')[0]}
                      </span>
                      {hasBadge && (
                        <span className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Certified
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:grid grid-cols-3 gap-4">
            {[
              { type: 'Bronze Badge' },
              { type: 'Gold Badge' },
              { type: 'Silver Badge' }
            ].map(({ type }) => {
              const badgeCount = badgeCounts.find(b => b.type === type);
              const badgeEmoji = getBadgeEmoji(type as BadgeType);
              const badgeColor = getBadgeColor(type as BadgeType);
              const hasBadge = badges.includes(type as BadgeType);
              
              return (
                <motion.div
                  key={type}
                  className={`group cursor-pointer ${type === 'Gold Badge' ? 'z-10' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedBadge(type as BadgeType);
                    setShowBadgeDetails(true);
                  }}
                >
                  <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 ${type === 'Gold Badge' ? 'transform scale-105' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`bg-gradient-to-br ${badgeColor} p-3 rounded-full text-3xl transform transition-all duration-300 ${hasBadge ? 'shadow-lg animate-pulse-slow' : 'opacity-50'} ${type === 'Gold Badge' ? 'scale-110' : ''}`}>
                        {badgeEmoji}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{badgeCount?.count || 0}</div>
                        <div className="text-sm text-gray-600">Earned</div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {type}
                      </span>
                      {hasBadge && (
                        <span className="text-sm text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Certified
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Badge Details Modal */}
        <AnimatePresence>
          {showBadgeDetails && selectedBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowBadgeDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-br ${getBadgeColor(selectedBadge)} p-4 rounded-full text-4xl`}>
                      {getBadgeEmoji(selectedBadge)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedBadge}</h3>
                      <p className="text-gray-600">{getBadgeDescription(selectedBadge)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBadgeDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Badge Requirements */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {getBadgeRequirements(selectedBadge).map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Earned Badges List */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Earned Badges</h4>
                    <div className="space-y-3">
                      {badgeCounts.find(b => b.type === selectedBadge)?.earnedDates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className={`bg-gradient-to-br ${getBadgeColor(selectedBadge)} p-2 rounded-lg`}>
                              {getBadgeEmoji(selectedBadge)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">Achievement #{index + 1}</div>
                              <div className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(date).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clusters with enhanced animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {CLUSTERS.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Cluster Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedCluster(expandedCluster === cluster.id ? null : cluster.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{cluster.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{cluster.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {cluster.topics.filter(t => t.completed).length}/{cluster.requiredTopics} topics completed
                      </p>
                    </div>
                  </div>
                  {expandedCluster === cluster.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${getClusterProgress(cluster)}%` }}
                  />
                </div>
              </div>

              {/* Topics List */}
              {expandedCluster === cluster.id && (
                <div className="border-t border-gray-100">
                  {cluster.topics.map(topic => {
                    const hasBadge = badges.includes(topic.badge);
                    const badgeEmoji = getBadgeEmoji(topic.badge);
                    const badgeName = topic.badge;
                    const badgeColor = getBadgeColor(topic.badge);
                    const isCompleted = topic.badge === 'Gold Badge' && hasBadge;
                    
                    return (
                      <div 
                        key={topic.id}
                        className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`bg-gradient-to-br ${badgeColor} p-2 rounded-lg ${!hasBadge ? 'opacity-50' : 'shadow-lg animate-pulse-slow'} ${topic.badge === 'Gold Badge' && topic.completed ? 'badge-glow' : ''}`}>
                              {topic.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              ) : hasBadge ? (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              ) : (
                                <Lock className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800 flex items-center gap-2">
                                {topic.name}
                                {topic.completed && (
                                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Completed</span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-1">{topic.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  {badgeEmoji} {badgeName}
                                </p>
                                <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${topic.completed ? 'from-green-500 to-green-400' : 'from-blue-500 to-indigo-500'}`}
                                    style={{ width: `${topic.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {!topic.completed && (
                            <button
                              onClick={() => navigate(`/topics/${topic.id}`)}
                              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                hasBadge 
                                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {hasBadge ? 'Review' : 'Start'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
              filter: brightness(1.2);
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 2s infinite;
          }

          @keyframes badgeGlow {
            0% {
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
                         0 0 20px rgba(239, 191, 4, 0.4),
                         0 0 30px rgba(239, 191, 4, 0.2);
              filter: brightness(1.1);
            }
            50% {
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                         0 0 30px rgba(239, 191, 4, 0.6),
                         0 0 40px rgba(239, 191, 4, 0.4);
              filter: brightness(1.3);
            }
            100% {
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
                         0 0 20px rgba(239, 191, 4, 0.4),
                         0 0 30px rgba(239, 191, 4, 0.2);
              filter: brightness(1.1);
            }
          }

          .badge-glow {
            animation: badgeGlow 2s infinite;
          }

          .badge-bronze {
            background: linear-gradient(135deg, #CE8946 0%, #CE8946 50%, #CE8946 100%);
            box-shadow: 0 0 20px rgba(206, 137, 70, 0.4);
            filter: brightness(1.1);
          }

          .badge-silver {
            background: linear-gradient(135deg, #6D6E71 0%, #6D6E71 50%, #6D6E71 100%);
            box-shadow: 0 0 20px rgba(109, 110, 113, 0.4);
            filter: brightness(1.1);
          }

          .badge-gold {
            background: linear-gradient(135deg, #EFBF04 0%, #EFBF04 50%, #EFBF04 100%);
            box-shadow: 0 0 25px rgba(239, 191, 4, 0.5);
            filter: brightness(1.2);
          }

          .hover\:shadow-amber-400\/50:hover {
            box-shadow: 0 0 25px rgba(206, 137, 70, 0.5);
            filter: brightness(1.2);
          }

          .hover\:shadow-gray-300\/50:hover {
            box-shadow: 0 0 25px rgba(109, 110, 113, 0.5);
            filter: brightness(1.2);
          }

          .hover\:shadow-yellow-300\/50:hover {
            box-shadow: 0 0 25px rgba(239, 191, 4, 0.5);
            filter: brightness(1.2);
          }
        `}
      </style>
    </div>
  );
};

export default Achievements; 