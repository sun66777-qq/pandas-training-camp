import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";
import { projects as projectList } from "../data/projects";

// 项目在河流图上的位置
const riverPositions = [
  { id: 1, x: 10, y: 90 },
  { id: 2, x: 22, y: 75 },
  { id: 3, x: 34, y: 85 },
  { id: 4, x: 46, y: 70 },
  { id: 5, x: 58, y: 80 },
  { id: 6, x: 70, y: 65 },
  { id: 7, x: 62, y: 50 },
  { id: 8, x: 50, y: 40 },
  { id: 9, x: 38, y: 30 },
  { id: 10, x: 90, y: 55 },
];

export default function LearningPath() {
  const navigate = useNavigate();
  const { projects: progressProjects } = useProgressStore();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const getProjectState = (id: number) => {
    const project = progressProjects.find((p) => p.id === id);
    if (project?.completed) return "completed";
    if (id === 1 || (id > 1 && progressProjects.some((p) => p.id === id - 1 && p.completed))) return "current";
    return "pending";
  };

  const getProjectInfo = (id: number) => {
    return projectList.find((p) => p.id === id);
  };

  // 贝塞尔曲线的路径
  const riverPath = "M 5 95 C 20 80 30 90 45 75 C 60 60 75 80 85 65";

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            进阶路线参考
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            沿着河流探索，完成所有项目的学习之旅
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 overflow-hidden">
          <div className="relative w-full h-[500px]">
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-xl" />
            
            {/* SVG 河流图 */}
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="riverGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="goldGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* 河流主路径 */}
              <path
                d={riverPath}
                fill="none"
                stroke="url(#riverGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />

              {/* 流动光点动画 */}
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  r="0.8"
                  fill="#00FFD1"
                  filter="url(#glow)"
                >
                  <animateMotion
                    dur={`${6 + i * 1.5}s`}
                    repeatCount="indefinite"
                    path={riverPath}
                    begin={`${-i * 1.2}s`}
                  />
                </circle>
              ))}

              {/* 项目节点 */}
              {riverPositions.map((pos) => {
                const state = getProjectState(pos.id);
                const project = getProjectInfo(pos.id);
                const isHovered = hoveredProject === pos.id;
                
                let fillColor = "#374151";
                let strokeColor = "#4B5563";
                let filter = "";
                
                if (state === "completed") {
                  fillColor = "#FCD34D";
                  strokeColor = "#F59E0B";
                  filter = "url(#goldGlow)";
                } else if (state === "current") {
                  fillColor = "#00FFD1";
                  strokeColor = "#06B6D4";
                  filter = "url(#glow)";
                }

                return (
                  <g
                    key={pos.id}
                    onMouseEnter={() => setHoveredProject(pos.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => navigate(`/project/${pos.id}`)}
                    style={{ cursor: "pointer" }}
                    className="transition-transform duration-300"
                  >
                    {/* 光晕效果 */}
                    {(state === "completed" || state === "current") && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="5"
                        fill={state === "completed" ? "#FCD34D" : "#00FFD1"}
                        opacity="0.3"
                        filter={filter}
                      >
                        <animate
                          attributeName="r"
                          values="5;8;5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0.1;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* 节点背景 */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="1.5"
                      filter={filter}
                    />

                    {/* 已完成的对勾 */}
                    {state === "completed" && (
                      <path
                        d={`M ${pos.x - 1.5} ${pos.y} L ${pos.x - 0.3} ${pos.y + 1.2} L ${pos.x + 2} ${pos.y - 1.5}`}
                        fill="none"
                        stroke="#7C2D12"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* 项目编号 */}
                    {state !== "completed" && (
                      <text
                        x={pos.x}
                        y={pos.y + 0.5}
                        textAnchor="middle"
                        fill={state === "pending" ? "#9CA3AF" : "#0A0E27"}
                        fontSize="2.2"
                        fontWeight="bold"
                      >
                        {pos.id}
                      </text>
                    )}

                    {/* 项目简短名称 */}
                    <text
                      x={pos.x}
                      y={pos.y + 7}
                      textAnchor="middle"
                      fill={state === "pending" ? "#9CA3AF" : "#E6EDF3"}
                      fontSize="1.8"
                      fontWeight={state === "pending" ? "400" : "600"}
                    >
                      {project?.name.slice(0, 4)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* 悬浮卡片 */}
            {hoveredProject && (() => {
              const project = getProjectInfo(hoveredProject);
              const state = getProjectState(hoveredProject);
              const pos = riverPositions.find(p => p.id === hoveredProject);
              if (!project || !pos) return null;

              return (
                <div
                  className="absolute glass-card rounded-xl p-4 shadow-lg z-50 pointer-events-none"
                  style={{
                    left: `${Math.min(Math.max(pos.x - 8, 0), 80)}%`,
                    top: `${pos.y - 25}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <div className="space-y-2 w-48">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-text-primary">
                        P{hoveredProject} {project.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          project.difficulty === "入门"
                            ? "bg-green-500/20 text-green-400"
                            : project.difficulty === "进阶"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {project.difficulty}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {project.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium ${
                          state === "completed"
                            ? "text-green-400"
                            : state === "current"
                              ? "text-neon-cyan"
                              : "text-gray-400"
                        }`}
                      >
                        {state === "completed" ? "✅ 已完成" : state === "current" ? "⏳ 进行中" : "⏸️ 未开始"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 图例 */}
          <div className="flex flex-wrap justify-center gap-8 mt-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span>未开始</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-neon-cyan animate-pulse"></div>
              <span>进行中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-400"></div>
              <span>已完成</span>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-text-muted">
            💡 提示：点击任意项目徽章可跳转到对应项目详情页
          </div>
        </div>
      </div>
    </section>
  );
}
