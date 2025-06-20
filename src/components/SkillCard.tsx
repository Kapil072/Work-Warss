import { CheckCircle2, Circle, Star, Code, Palette, Server, Smartphone, Database } from "lucide-react";
import { Progress } from "../components/ui/progress";

interface Skill {
  id: string;
  name: string;
  category: string;
  completedLevels: number;
  color: string;
  icon: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const getIcon = (iconName: string) => {
    const icons = {
      code: Code,
      palette: Palette,
      server: Server,
      smartphone: Smartphone,
      database: Database,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Code;
    return <IconComponent className="w-8 h-8" />;
  };
  const progressPercentage = (skill.completedLevels / 3) * 100;
  const isCompleted = skill.completedLevels === 3;
  const levelLabels = ["Beginner", "Intermediate", "Advanced"];
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${skill.color}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-5xl font-bold opacity-20">
          {skill.name.charAt(0)}
        </div>
      </div>
      <div className="relative p-3 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              {getIcon(skill.icon)}
            </div>
            <div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                {skill.category}
              </span>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center space-x-1">
              <CheckCircle2 className="w-6 h-6" />
              <Star className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Progress</span>
            <span className="text-xs font-bold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-2.5 backdrop-blur-sm">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        {/* Level Indicators */}
        <div className="flex justify-between items-center">
          {[0, 1, 2].map((level) => (
            <div key={level} className="flex items-center space-x-1">
              {skill.completedLevels > level ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <Circle className="w-5 h-5 text-white/50" />
              )}
              <span className={`text-[10px] ${skill.completedLevels > level ? 'text-white font-semibold' : 'text-white/70'}`}>
                {levelLabels[level]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard; 