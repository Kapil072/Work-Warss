import { useState } from "react";
import SkillCard from "./SkillCard";
import { skillsData } from "../data/skillsData";

interface SkillClusterTrackerProps {
  clusterId?: string;
  minimizable?: boolean;
}

const SkillClusterTracker = ({ clusterId = "web-development", minimizable = false }: SkillClusterTrackerProps) => {
  const [minimized, setMinimized] = useState(false);
  const cluster = skillsData.find(c => c.id === clusterId);
  if (!cluster) return null;
  const totalSkills = cluster.skills.length;
  const totalLevels = totalSkills * 3;
  const completedLevels = cluster.skills.reduce((acc, skill) => acc + skill.completedLevels, 0);
  const overallProgress = Math.round((completedLevels / totalLevels) * 100);
  if (minimized) {
    return (
      <button
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow flex flex-col items-center justify-center px-1.5 py-1.5 mb-0 cursor-pointer border border-blue-100 hover:bg-blue-50 transition"
        style={{ minHeight: 0, padding: 0, margin: 0 }}
        onClick={() => setMinimized(false)}
        title="Expand"
      >
        <span className="text-xs font-bold text-blue-700 mb-1 truncate w-full text-center">{cluster.name}</span>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </button>
    );
  }
  return (
    <div className={`min-h-[120px] p-1.5 w-full max-w-md mx-auto bg-white rounded-2xl shadow`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-2 pt-1 ${minimizable ? 'cursor-pointer hover:bg-blue-50 transition' : ''}`}
        onClick={minimizable ? () => setMinimized(true) : undefined}
        title={minimizable ? 'Minimize' : undefined}
      >
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-90 text-blue-600">SKILL TRACKER</span>
          <h1 className="text-base font-bold text-gray-800 leading-tight">{cluster.name}</h1>
        </div>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-700 mb-1">{overallProgress}%</div>
        <div className="text-xs opacity-90 mb-2">Overall Progress</div>
        {/* Skills List */}
        <div className="space-y-2">
          <div className="flex items-center mb-1">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"></div>
            <h2 className="text-xs font-semibold text-gray-800">Skills Progress</h2>
          </div>
          {cluster.skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
        {/* Summary Stats */}
        <div className="mt-3 p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>Completed Skills</span>
            <span className="font-semibold">{cluster.skills.filter(s => s.completedLevels === 3).length}/{totalSkills}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
            <span>Total Levels</span>
            <span className="font-semibold">{completedLevels}/{totalLevels}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillClusterTracker; 