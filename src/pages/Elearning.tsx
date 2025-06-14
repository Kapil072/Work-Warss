import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Video, PlayCircle, Clock, 
  Users, Award, ChevronDown, ChevronUp,
  Lock, CheckCircle2, BookOpen, Star, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  locked: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lectures: Lecture[];
  totalDuration: string;
  enrolledStudents: number;
  rating: number;
}

const COURSES: Course[] = [
  {
    id: 'math-fundamentals',
    title: 'Mathematics Fundamentals',
    description: 'Master the basics of mathematics with interactive video lectures',
    level: 'Beginner',
    totalDuration: '8 hours',
    enrolledStudents: 1200,
    rating: 4.8,
    lectures: [
      {
        id: 'intro',
        title: 'Introduction to Mathematics',
        duration: '15:00',
        thumbnail: '/thumbnails/intro.jpg',
        completed: false,
        locked: false
      },
      {
        id: 'basic-operations',
        title: 'Basic Mathematical Operations',
        duration: '20:00',
        thumbnail: '/thumbnails/operations.jpg',
        completed: false,
        locked: false
      },
      // Add more lectures...
    ]
  },
  {
    id: 'advanced-math',
    title: 'Advanced Mathematics',
    description: 'Deep dive into advanced mathematical concepts and applications',
    level: 'Intermediate',
    totalDuration: '12 hours',
    enrolledStudents: 850,
    rating: 4.7,
    lectures: [
      {
        id: 'advanced-intro',
        title: 'Advanced Concepts Overview',
        duration: '18:00',
        thumbnail: '/thumbnails/advanced-intro.jpg',
        completed: false,
        locked: true
      },
      // Add more lectures...
    ]
  },
  {
    id: 'master-math',
    title: 'Mathematics Mastery',
    description: 'Become a mathematics expert with comprehensive course material',
    level: 'Advanced',
    totalDuration: '16 hours',
    enrolledStudents: 500,
    rating: 4.9,
    lectures: [
      {
        id: 'master-intro',
        title: 'Mastery Level Introduction',
        duration: '25:00',
        thumbnail: '/thumbnails/master-intro.jpg',
        completed: false,
        locked: true
      },
      // Add more lectures...
    ]
  }
];

const Elearning = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/50 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 ml-4">Video Learning Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
              <Video className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">96+ Lectures</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">2.5k+ Students</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Course Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.totalDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.enrolledStudents} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {course.level}
                  </div>
                </div>

                {/* Course Lectures */}
                <div className="space-y-2">
                  {course.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        lecture.locked 
                          ? 'bg-gray-50 cursor-not-allowed' 
                          : 'hover:bg-blue-50 cursor-pointer'
                      }`}
                      onClick={() => !lecture.locked && setSelectedCourse(course.id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {lecture.locked ? (
                            <Lock className="h-5 w-5 text-gray-400" />
                          ) : lecture.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        {lecture.completed && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{lecture.title}</h3>
                        <p className="text-xs text-gray-500">{lecture.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Course Action Button */}
                <button
                  className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    course.level === 'Beginner' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                >
                  {expandedCourse === course.id ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/50" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Video Player</h3>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Elearning; 