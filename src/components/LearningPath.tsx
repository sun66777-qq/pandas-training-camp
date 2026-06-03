import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";

interface Node {
  id: number;
  name: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: 1, name: "数据预处理", x: 0, y: 0 },
  { id: 2, name: "统计分析", x: 1, y: 0 },
  { id: 3, name: "关联规则", x: 2, y: 0 },
  { id: 4, name: "聚类分析", x: 3, y: 0 },
  { id: 5, name: "RFM分层", x: 4, y: 0 },
  { id: 6, name: "线性回归", x: 0, y: 1 },
  { id: 7, name: "随机森林", x: 1, y: 1 },
  { id: 8, name: "时间序列", x: 2, y: 1 },
  { id: 9, name: "异常检测", x: 3, y: 1 },
  { id: 10, name: "综合大项目", x: 4, y: 1 }
];

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 10 },
  { from: 10, to: 9 },
  { from: 9, to: 8 },
  { from: 8, to: 7 },
  { from: 7, to: 6 },
  { from: 1, to: 6 }
];

const difficultyColors = {
  1: "from-green-500 to-green-600",
  2: "from-green-500 to-green-600",
  3: "from-amber-500 to-amber-600",
  4: "from-amber-500 to-amber-600",
  5: "from-amber-500 to-amber-600",
  6: "from-purple-500 to-purple-600",
  7: "from-purple-500 to-purple-600",
  8: "from-purple-500 to-purple-600",
  9: "from-red-500 to-red-600",
  10: "from-red-500 to-red-600"
};

export default function LearningPath() {
  const navigate = useNavigate();
  const { projects } = useProgressStore();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const getNodeState = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project?.completed) return "completed";
    if (id === 1 || projects.some(p => p.id < id && p.completed)) return "current";
    return "pending";
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold gradient-text mb-3">
            学习路线图
          </h2>
          <p className="text-text-secondary text-lg">
            从基础到进阶的完整学习路径
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 overflow-x-auto">
          <div className="min-w-[1200px]">
            <svg viewBox="0 0 1000 300" className="w-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FFD1" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>

              {/* Connections */}
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from)!;
                const toNode = nodes.find(n => n.id === conn.to)!;
                const fromX = 100 + fromNode.x * 200;
                const fromY = 80 + fromNode.y * 140;
                const toX = 100 + toNode.x * 200;
                const toY = 80 + toNode.y * 140;

                return (
                  <g key={idx}>
                    <line
                      x1={fromX} y1={fromY} x2={toX} y2={toY}
                      stroke="url(#lineGradient)" strokeWidth="3"
                      strokeDasharray="8, 4"
                    />
                    <circle
                      cx={fromX + (toX - fromX) * 0.5}
                      cy={fromY + (toY - fromY) * 0.5}
                      r="4" fill="#00FFD1" opacity="0.6"
                      className="animate-pulse"
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const state = getNodeState(node.id);
                const x = 100 + node.x * 200;
                const y = 80 + node.y * 140;

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => state !== "pending" && navigate(`/project/${node.id}`)}
                    style={{ cursor: state === "pending" ? "default" : "pointer" }}
                  >
                    <circle
                      cx={x} cy={y} r={38}
                      fill={state === "pending" ? "#1E1E2E" : state === "completed" ? "#10B981" : "#00FFD1"}
                      stroke={state === "pending" ? "#4B5563" : state === "completed" ? "#10B981" : "#00FFD1"}
                      strokeWidth={state === "current" ? "4" : "2"}
                      opacity={state === "current" ? "1" : "0.9"}
                      className={state === "current" ? "animate-glow-pulse" : ""}
                    />

                    {state === "completed" && (
                      <circle cx={x} cy={y} r={30} fill="#0A0E27" />
                    )}

                    {state === "completed" ? (
                      <Check x={x - 12} y={y - 12} size={24} color="#10B981" />
                    ) : (
                      <text
                        x={x} y={y + 6} textAnchor="middle"
                        fill={state === "pending" ? "#9CA3AF" : "#0A0E27"}
                        fontSize="20" fontWeight="bold"
                      >
                        {node.id}
                      </text>
                    )}

                    <text
                      x={x} y={y + 55} textAnchor="middle"
                      fill={state === "pending" ? "#9CA3AF" : "#E6EDF3"}
                      fontSize="14" fontWeight={state === "pending" ? "400" : "600"}
                    >
                      P{node.id} {node.name}
                    </text>

                    {hoveredNode === node.id && (
                      <g>
                        <rect
                          x={x - 70} y={y - 100} width="140" height="50"
                          rx="10"
                          fill="#161B22" stroke="#00FFD1" strokeWidth="1"
                        />
                        <text
                          x={x} y={y - 75} textAnchor="middle"
                          fill="#E6EDF3" fontSize="12" fontWeight="bold"
                        >
                          {node.name}
                        </text>
                        <text
                          x={x} y={y - 58} textAnchor="middle"
                          fill={
                            node.id <= 2 ? "#6EE7B7" :
                            node.id <= 5 ? "#FBBF24" : "#F87171"
                          }
                          fontSize="10"
                        >
                          {node.id <= 2 ? "入门" : node.id <= 5 ? "进阶" : "高级"}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="flex justify-center gap-8 mt-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span>未开始</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neon-cyan animate-glow-pulse"></div>
                <span>进行中</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>已完成</span>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-text-muted">
              💡 提示：点击已完成或进行中的节点可以跳转到对应项目
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
