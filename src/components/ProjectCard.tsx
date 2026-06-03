import { Clock, Database, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { useProgressStore } from "../store/useProgressStore";

const difficultyColors = {
  入门: "bg-emerald-100 text-emerald-700",
  进阶: "bg-amber-100 text-amber-700",
  高级: "bg-red-100 text-red-700",
};

export function ProjectCard({ project }: { project: Project }) {
  const isCompleted = useProgressStore((state) =>
    state.projects.find((p) => p.id === project.id)?.completed
  );

  return (
    <Link
      to={`/project/${project.id}`}
      className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-cardLifted hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 block relative overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-6 h-6 text-success-500" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${isCompleted ? 'bg-success-100 text-success-600' : 'bg-primary-100 text-primary-600'} font-bold text-sm`}>
          {project.id}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">
        {project.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {project.duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <Database className="w-4 h-4" />
          {project.dataset}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-lg bg-gray-50 text-xs text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        开始练习
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
