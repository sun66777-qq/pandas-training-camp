import { Clock, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

const difficultyColors = {
  入门: "bg-emerald-500/20 text-emerald-400",
  进阶: "bg-amber-500/20 text-amber-400",
  高级: "bg-red-500/20 text-red-400",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary font-bold text-sm">
          {project.id}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
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
            className="px-2 py-1 rounded-md bg-dark-bg text-xs text-slate-400"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        开始练习
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
