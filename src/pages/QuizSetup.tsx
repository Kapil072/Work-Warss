import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuiz } from '@/contexts/QuizContext';
import { ArrowLeft } from 'lucide-react';
import type { QuizSetup as QuizSetupType } from '@/contexts/QuizContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IndustryRoleSelector from '../../selection/src/components/IndustryRoleSelector';
import KnowledgeClusterSpinner from '../../selection/src/components/KnowledgeClusterSpinner';
import SkillGrid from '../../selection/src/components/SkillGrid';
import clustersByIndustryRole from '../../selection/src/components/KnowledgeClusterSpinner'; // (Assume we can import the mapping, or redefine it here if not exported)
import CountUp from './CountUp';
import { BoxesLoaderComponent } from './BoxesLoaderComponent';

// Define the data structure for industries, roles, clusters, and skills
const industryData = {
  "Technology": {
    roles: {
      "Software Development": {
        clusters: {
          "Web Development": {
            skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "TypeScript"]
          },
          "Mobile Development": {
            skills: ["Swift", "Kotlin", "React Native", "Flutter", "iOS", "Android"]
          },
          "Backend Development": {
            skills: ["Python", "Java", "Node.js", "SQL", "MongoDB", "Docker"]
          }
        }
      },
      "Data Science": {
        clusters: {
          "Machine Learning": {
            skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Data Analysis"]
          },
          "Data Engineering": {
            skills: ["SQL", "Python", "Apache Spark", "Hadoop", "ETL"]
          }
        }
      }
    }
  },
  "Finance": {
    roles: {
      "Investment Banking": {
        clusters: {
          "Financial Analysis": {
            skills: ["Financial Modeling", "Valuation", "Excel", "PowerPoint"]
          },
          "Trading": {
            skills: ["Market Analysis", "Risk Management", "Trading Strategies"]
          }
        }
      },
      "Financial Technology": {
        clusters: {
          "Blockchain": {
            skills: ["Smart Contracts", "Solidity", "Web3", "Cryptography"]
          },
          "FinTech Development": {
            skills: ["Payment Systems", "Banking APIs", "Security"]
          }
        }
      }
    }
  },
  "Healthcare": {
    roles: {
      "Medical Technology": {
        clusters: {
          "Health Informatics": {
            skills: ["Electronic Health Records", "Medical Coding", "Health Data Analysis"]
          },
          "Medical Software": {
            skills: ["Medical Imaging", "Patient Management Systems", "Healthcare APIs"]
          }
        }
      },
      "Clinical Research": {
        clusters: {
          "Clinical Trials": {
            skills: ["Protocol Development", "Data Collection", "Statistical Analysis"]
          },
          "Medical Research": {
            skills: ["Research Methodology", "Data Analysis", "Medical Writing"]
          }
        }
      }
    }
  }
};

// Add Dummy Industry to user options for testing
const extendedIndustryData = {
  ...industryData,
  "Dummy Industry": {
    roles: {
      "Dummy Role": {
        clusters: {
          "Dummy Cluster": {
            skills: ["Dummy Skill"]
          }
        }
      }
    }
  }
};

// Conversion function to map your data to the spinner's expected format
const getClustersForIndustryRole = (industry, role) => {
  if (!industry || !role) return [];
  const clustersObj = extendedIndustryData[industry]?.roles?.[role]?.clusters || {};
  return Object.entries(clustersObj).map(([clusterName, clusterData], idx) => ({
    id: clusterName.toLowerCase().replace(/\s+/g, '_'),
    name: clusterName,
    color: 'from-blue-500 to-cyan-500', // default color, can be improved
    skills: (clusterData.skills || []).map((skill, i) => ({
      id: skill.toLowerCase().replace(/\s+/g, '_'),
      name: skill,
      color: 'from-blue-500 to-cyan-500', // default color
    })),
  }));
};

// Helper: get the first industry and role from the spinner's mapping
const getFirstIndustryAndRole = () => {
  // Get all keys like 'Technology-Software Engineer'
  const keys = Object.keys(clustersByIndustryRole).filter(k => k !== 'default');
  if (keys.length === 0) return { industry: '', role: '' };
  const [industry, role] = keys[0].split('-');
  return { industry, role };
};

// Define Cluster type locally
interface Cluster {
  id: string;
  name: string;
  color: string;
  skills: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

// Add a type guard for Cluster
function isCluster(obj: any): obj is Cluster {
  return obj && typeof obj === 'object' && Array.isArray(obj.skills);
}

const QuizSetup = () => {
  const navigate = useNavigate();
  const { setQuizSetup, startQuiz } = useQuiz();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set default industry/role to the first available
  const { industry: defaultIndustry, role: defaultRole } = getFirstIndustryAndRole();
  const [selectedIndustry, setSelectedIndustry] = useState(defaultIndustry);
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showSelector, setShowSelector] = useState(true);
  const [showCountUp, setShowCountUp] = useState(false);

  useEffect(() => {
    setSelectedCluster(null);
    setSelectedSkill('');
  }, [selectedIndustry, selectedRole]);

  // Test server connection on component mount
  useEffect(() => {
    const testServer = async () => {
      try {
        const response = await fetch("http://localhost:5000/test");
        if (!response.ok) {
          throw new Error("Server is not responding");
        }
        const data = await response.json();
        if (data.status !== "ok") {
          throw new Error(data.message || "Server test failed");
        }
      } catch (error) {
        toast({
          title: "Server Error",
          description: "Could not connect to the server. Please make sure the server is running.",
          variant: "destructive",
        });
      }
    };
    testServer();
  }, [toast]);

  // Submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (!selectedIndustry || !selectedRole || !selectedCluster || !selectedSkill) {
        throw new Error('Please fill in all fields');
      }
      setShowCountUp(true);
      setTimeout(() => {
        setQuizSetup({
          industry: selectedIndustry,
          role: selectedRole,
          cluster: selectedCluster.name,
          skill: selectedSkill,
        });
        startQuiz();
        navigate('/quiz');
      }, 1000); // Wait for CountUp duration
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start quiz',
        variant: 'destructive',
      });
      setShowCountUp(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Button onClick={() => navigate('/')} className="mb-4 sm:mb-6 bg-white/10 hover:bg-white/20 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center"></h1>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Industry & Role Selector Button - now left-aligned */}
            <div className="flex flex-col items-start">
              <IndustryRoleSelector
                onSelectionComplete={(industry, role) => {
                  setSelectedIndustry(industry);
                  setSelectedRole(role);
                  setShowSelector(false);
                }}
              />
              {selectedIndustry && selectedRole && (
                <div className="mt-2 text-sm text-gray-700 text-left">
                  {/* Optionally show selected industry/role here */}
                </div>
              )}
            </div>
            {/* Cluster Spinner */}
            {selectedIndustry && selectedRole && (
              <div className="mt-12 sm:mt-32 flex justify-center">
                <KnowledgeClusterSpinner
                  industry={selectedIndustry}
                  role={selectedRole}
                  onClusterSelect={cluster => setSelectedCluster(cluster as Cluster)}
                />
              </div>
            )}
            {/* Skill Grid */}
            {selectedCluster &&
              ((selectedIndustry === 'Dummy Industry' && selectedRole === 'Dummy Role' && selectedCluster.name === 'Dummy Cluster') ||
              (selectedIndustry !== 'Dummy Industry' && selectedRole !== 'Dummy Role' && selectedCluster.name !== 'Dummy Cluster')) && (
                <div className="flex justify-center">
                  <SkillGrid
                    skills={(selectedCluster && 'skills' in selectedCluster ? (selectedCluster as Cluster).skills : [])}
                    selectedSkill={selectedSkill}
                    onSkillSelect={setSelectedSkill}
                  />
                </div>
            )}
            <div className="flex justify-end mt-4 sm:mt-6">
              <Button type="submit" disabled={!selectedSkill || isLoading} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                {isLoading ? 'Setting up quiz...' : 'Start Quiz'}
              </Button>
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup; 