import { useState } from "react";
import { Sparkles, BookOpen, FileText, TrendingUp, Award } from "lucide-react";

const stages = [
  {
    icon: BookOpen,
    title: "基础入门",
    skills: ["Pandas基础", "数据加载", "数据查看"],
    color: "from-neon-cyan to-primary-500",
  },
  {
    icon: FileText,
    title: "数据清洗",
    skills: ["缺失值处理", "重复值处理", "类型转换"],
    color: "from-neon-purple to-neon-orange",
  },
  {
    icon: TrendingUp,
    title: "数据分析",
    skills: ["筛选排序", "分组聚合", "透视表"],
    color: "from-neon-yellow to-neon-orange",
  },
  {
    icon: Sparkles,
    title: "高级应用",
    skills: ["特征工程", "数据可视化", "统计建模"],
    color: "from-neon-orange to-neon-cyan",
  },
  {
    icon: Award,
    title: "项目实战",
    skills: ["关联规则", "聚类分析", "预测建模"],
    color: "from-primary-500 to-neon-purple",
  },
];

export function LearningPath() {
  const [activeStage, setActiveStage] = useState(0);

  const currentStage = stages[activeStage];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="relative">
      {/* Timeline Container */}
      <div className="relative overflow-x-auto pb-4">
        <div className="flex items-center justify-between gap-4 min-w-max md:min-w-0 md:justify-center">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative flex-shrink-0">
              {/* Connector Line */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-dark-border z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple animate-flow-right" />
                </div>
              )}

              {/* Stage Card */}
              <div
                className={`relative z-10 w-48 glass-card-hover rounded-2xl p-6 cursor-pointer transition-all ${
                  activeStage === idx
                    ? "ring-2 ring-neon-cyan shadow-glow-lg"
                    : ""
                }`}
                onClick={() => setActiveStage(idx)}
                onMouseEnter={() => setActiveStage(idx)}
              >
                {/* Node Number */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} p-1 mx-auto mb-4 transition-transform ${
                    activeStage === idx ? "scale-110" : ""
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center">
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-center font-bold text-text-primary mb-3">
                  {stage.title}
                </h4>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {stage.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-2 py-1 text-xs bg-dark-card-hover rounded-full text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Active Indicator */}
                {activeStage === idx && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neon-cyan rotate-45" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Stage Info */}
      <div className="mt-12 glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentStage.color} p-1`}
          >
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary">
              第 {activeStage + 1} 阶段：{currentStage.title}
            </h3>
            <p className="text-text-secondary">
              掌握技能：{currentStage.skills.join("、")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {currentStage.skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-4 hover:bg-dark-card-hover transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                <span className="font-semibold text-text-primary">{skill}</span>
              </div>
              <p className="text-xs text-text-secondary">
                {skill === "Pandas基础" && "学习DataFrame和Series的基本操作"}
                {skill === "数据加载" && "从CSV、Excel等文件读取数据"}
                {skill === "数据查看" && "使用head、tail、describe等方法"}
                {skill === "缺失值处理" && "检测和填充缺失值"}
                {skill === "重复值处理" && "识别和删除重复记录"}
                {skill === "类型转换" && "转换数据类型"}
                {skill === "筛选排序" && "条件筛选和数据排序"}
                {skill === "分组聚合" && "groupby和聚合函数"}
                {skill === "透视表" && "创建数据透视表"}
                {skill === "特征工程" && "创建和转换特征"}
                {skill === "数据可视化" && "绑定matplotlib和seaborn"}
                {skill === "统计建模" && "基础统计分析和建模"}
                {skill === "关联规则" && "Apriori算法"}
                {skill === "聚类分析" && "K-Means算法"}
                {skill === "预测建模" && "回归和分类基础"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
