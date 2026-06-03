import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Database, ArrowRight, Flame, Star, Users } from "lucide-react";
import { projects } from "../data/projects";

const difficultyLevels = ["全部", "入门", "进阶", "高级"];

const difficultyProgress = {
  入门: 30,
  进阶: 60,
  高级: 90,
};

export function ProjectList() {
  const [activeFilter, setActiveFilter] = useState("全部");

  const filteredProjects =
    activeFilter === "全部"
      ? projects
      : projects.filter((p) => p.difficulty === activeFilter);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex gap-2 mb-8 justify-center">
        {difficultyLevels.map((level) => (
          <button
            key={level}
            onClick={() => setActiveFilter(level)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeFilter === level
                ? "bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg"
                : "glass-card text-text-secondary hover:text-text-primary"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="glass-card-hover rounded-2xl overflow-hidden group relative"
          >
            {/* Hot Project Badge */}
            {project.id <= 3 && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-neon-orange to-neon-yellow rounded-full text-xs font-bold text-dark-bg">
                <Flame className="w-3 h-3" />
                热门
              </div>
            )}

            {/* Difficulty Progress Bar */}
            <div className="h-1 progress-bar rounded-none">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${difficultyProgress[project.difficulty]}%`,
                }}
              />
            </div>

            <div className="p-6">
              {/* Project Number & Difficulty */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
                    <div className="w-full h-full rounded-lg bg-dark-card flex items-center justify-center text-white font-bold">
                      {project.id}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.difficulty === "入门"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : project.difficulty === "进阶"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-neon-cyan transition-colors">
                {project.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Mini Chart Preview */}
              <div className="bg-dark-card-hover rounded-xl p-4 mb-4">
                <div className="flex items-end justify-between h-16 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map(
                    (height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-neon-cyan to-neon-purple rounded-t-sm"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Database className="w-4 h-4" />
                  {project.dataset}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Users className="w-4 h-4" />
                  <span>1,234 人已完成</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 text-neon-yellow fill-current" />
                  <span className="text-text-primary font-semibold">98%</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-text-muted">查看详情</span>
                <ArrowRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
