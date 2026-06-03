import { Sparkles, BarChart3, GitBranch, TrendingUp, FileText } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";
import { projects } from "../data/projects";

// 定义每个阶段包含的项目
const stageProjects: Record<number, number[]> = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8],
  4: [9],
  5: [10],
};

const stages = [
  {
    id: 1,
    title: "数据预处理",
    description: "掌握数据清洗与转换",
    icon: Sparkles,
    emoji: "🧹",
  },
  {
    id: 2,
    title: "统计分析",
    description: "描述性统计与可视化",
    icon: BarChart3,
    emoji: "📊",
  },
  {
    id: 3,
    title: "关联与聚类",
    description: "挖掘数据关联规律",
    icon: GitBranch,
    emoji: "🔍",
  },
  {
    id: 4,
    title: "预测建模",
    description: "机器学习入门",
    icon: TrendingUp,
    emoji: "📈",
  },
  {
    id: 5,
    title: "综合实战",
    description: "完整数据分析报告",
    icon: FileText,
    emoji: "🏆",
  },
];

export function StageCards() {
  const { projects: progressProjects } = useProgressStore();

  const calculateStageProgress = (stageId: number) => {
    const projectIds = stageProjects[stageId];
    const total = projectIds.length;
    const completed = projectIds.filter((id) => 
      progressProjects.some((p) => p.id === id && p.completed)
    ).length;
    return { completed, total };
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            系统化学习路径
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            5个阶段循序渐进，从入门到精通
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stages.map((stage, idx) => {
            const { completed, total } = calculateStageProgress(stage.id);
            const progressPercent = Math.round((completed / total) * 100);
            
            return (
              <div
                key={stage.id}
                className="glass-card-hover rounded-2xl p-6 relative group h-full"
              >
                {/* Emoji Icon */}
                <div className="text-5xl mb-4">{stage.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-6">
                  {stage.description}
                </p>

                {/* Progress Bar */}
                <div className="progress-bar mb-2">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                
                {/* Progress Text */}
                <div className="text-xs text-text-secondary mb-2">
                  进度: {progressPercent}%
                </div>

                {/* Completed Projects */}
                <div className="absolute bottom-4 right-4 text-xs text-text-muted">
                  {completed}/{total} 项目完成
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
