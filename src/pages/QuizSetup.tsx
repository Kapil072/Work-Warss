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

const QuizSetup = () => {
  const navigate = useNavigate();
  const { setQuizSetup, startQuiz } = useQuiz();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    industry: "",
    role: "",
    cluster: "",
    skill: "",
  });

  // Get available roles based on selected industry
  const getAvailableRoles = () => {
    if (!formData.industry) return [];
    return Object.keys(industryData[formData.industry as keyof typeof industryData]?.roles || {});
  };

  // Get available clusters based on selected role
  const getAvailableClusters = () => {
    if (!formData.industry || !formData.role) return [];
    return Object.keys(
      industryData[formData.industry as keyof typeof industryData]?.roles[formData.role]?.clusters || {}
    );
  };

  // Get available skills based on selected cluster
  const getAvailableSkills = () => {
    if (!formData.industry || !formData.role || !formData.cluster) return [];
    return industryData[formData.industry as keyof typeof industryData]?.roles[formData.role]?.clusters[formData.cluster]?.skills || [];
  };

  // Reset dependent fields when parent selection changes
  const handleIndustryChange = (value: string) => {
    setFormData({
      industry: value,
      role: "",
      cluster: "",
      skill: "",
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value,
      cluster: "",
      skill: "",
    }));
  };

  const handleClusterChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      cluster: value,
      skill: "",
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!formData.industry || !formData.role || !formData.cluster || !formData.skill) {
        throw new Error("Please fill in all fields");
      }

      // Test server connection first
      console.log('Testing server connection...');
      const testResponse = await fetch('http://localhost:5000/test');
      
      if (testResponse.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      const testData = await testResponse.json();
      console.log('Server test response:', testData);

      if (!testResponse.ok || testData.status === 'error') {
        throw new Error(testData.message || 'Server is not responding');
      }

      // Generate questions
      const response = await fetch('http://localhost:5000/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill: formData.skill,
          industry: formData.industry,
          role: formData.role,
          cluster: formData.cluster,
          level: 'Bronze' // Default level
        }),
      });

      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      const data = await response.json();
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error("Invalid response format");
      }

      // Set up quiz context
      setQuizSetup({
        industry: formData.industry,
        role: formData.role,
        cluster: formData.cluster,
        skill: formData.skill,
      });

      // Start the quiz
      startQuiz();
      navigate("/quiz");
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start quiz",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => navigate('/')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
          </Button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Quiz Setup</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <Select
                value={formData.industry}
                onValueChange={handleIndustryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(industryData).map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.industry && (
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Select
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableRoles().map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.role && (
              <div>
                <label className="block text-sm font-medium mb-2">Knowledge Cluster</label>
                <Select
                  value={formData.cluster}
                  onValueChange={handleClusterChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select knowledge cluster" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableClusters().map((cluster) => (
                      <SelectItem key={cluster} value={cluster}>
                        {cluster}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.cluster && (
              <div>
                <label className="block text-sm font-medium mb-2">Skill to Test</label>
                <Select
                  value={formData.skill}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, skill: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableSkills().map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Setting up quiz...' : 'Start Quiz'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup; 