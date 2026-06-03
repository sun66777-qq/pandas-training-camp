import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";

export function Header() {
  const [showProgress, setShowProgress] = useState(false);
  const { projects } = useProgressStore();

  const completedCount = projects.filter((p) => p.completed).length;
  const progressPercent = (completedCount / 10) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setShowProgress(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-dark-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("top")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
              <div className="w-full h-full rounded-lg bg-dark-card flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-neon-cyan" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl text-text-primary">
                Pandas训练营
              </h1>
              <p className="text-xs text-text-secondary">
                数据采集技术课程
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "features", label: "核心卖点" },
              { id: "path", label: "学习路径" },
              { id: "projects", label: "实战项目" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-text-secondary hover:text-neon-cyan transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Progress Ring */}
          <div className="relative">
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="relative w-14 h-14 focus:outline-none"
            >
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="45"
                  stroke="#30363D"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="45"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFD1" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-text-primary">
                  {completedCount}/10
                </span>
              </div>
            </button>

            {/* Progress Dropdown */}
            {showProgress && (
              <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl shadow-glow-lg border border-dark-border z-50 animate-slide-up overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-dark-border">
                  <h3 className="font-bold text-lg text-text-primary mb-4">
                    我的学习进度
                  </h3>

                  {/* Progress Ring Large */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#30363D"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#progressGradientLarge)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 56}
                          strokeDashoffset={
                            2 * Math.PI * 56 -
                            (progressPercent / 100) * 2 * Math.PI * 56
                          }
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient
                            id="progressGradientLarge"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#00FFD1" />
                            <stop offset="100%" stopColor="#A855F7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-neon-cyan">
                          {Math.round(progressPercent)}%
                        </span>
                        <span className="text-xs text-text-secondary">
                          完成度
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 border-b border-dark-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-text-primary">
                        {completedCount}
                      </div>
                      <div className="text-xs text-text-secondary">
                        完成项目
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">
                        {completedCount * 2}h
                      </div>
                      <div className="text-xs text-text-secondary">学习时长</div>
                    </div>
                  </div>
                </div>

                {/* Projects List */}
                <div className="p-6 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            project.completed
                              ? "bg-neon-cyan text-dark-bg"
                              : "bg-dark-card text-text-secondary"
                          }`}
                        >
                          {project.completed ? "✓" : project.id}
                        </div>
                        <span
                          className={`flex-1 ${
                            project.completed
                              ? "text-text-primary"
                              : "text-text-secondary"
                          }`}
                        >
                          项目 {project.id}
                        </span>
                        {project.score && (
                          <span className="text-xs text-neon-cyan">
                            {project.score}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-dark-border">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="w-full py-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
