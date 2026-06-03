import { useState } from "react";
import { Database, Code, BookOpen, Award, HelpCircle } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "真实商业数据集",
    description: "使用来自电商、零售、医疗等行业的真实脱敏数据",
    progress: 100,
    color: "from-neon-cyan to-primary-500",
  },
  {
    icon: Code,
    title: "实时代码运行",
    description: "内置Python代码编辑器，即时反馈和错误提示",
    progress: 100,
    color: "from-neon-purple to-neon-orange",
  },
  {
    icon: BookOpen,
    title: "循序渐进路径",
    description: "从基础到进阶，5个阶段系统化学习路径",
    progress: 0,
    color: "from-neon-yellow to-neon-orange",
  },
  {
    icon: Award,
    title: "技能认证证书",
    description: "完成全部项目获得结业证书和能力认证",
    progress: 0,
    color: "from-neon-orange to-neon-cyan",
  },
];

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="glass-card-hover rounded-2xl p-6 relative group h-full"
          onMouseEnter={() => setHoveredCard(idx)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Icon */}
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-1 mb-4 group-hover:scale-110 transition-transform duration-300 ${
              hoveredCard === idx ? "animate-bounce-subtle" : ""
            }`}
          >
            <div className="w-full h-full rounded-xl bg-dark-card flex items-center justify-center">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-4">
            {feature.description}
          </p>

          {/* Progress Bar */}
          <div className="progress-bar mb-2">
            <div
              className="progress-bar-fill"
              style={{ width: `${feature.progress}%` }}
            />
          </div>
          <div className="text-xs text-text-secondary">
            掌握程度: {feature.progress}%
          </div>

          {/* Help Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button className="w-8 h-8 rounded-full bg-dark-card-hover border border-dark-border flex items-center justify-center hover:border-neon-cyan transition-colors">
                <HelpCircle className="w-4 h-4 text-text-secondary" />
              </button>
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 p-3 glass-card rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <p className="text-xs text-text-secondary">
                  {feature.title === "真实商业数据集" &&
                    "所有数据均来自真实业务场景，已进行脱敏处理，保护隐私的同时保留数据分析价值。"}
                  {feature.title === "实时代码运行" &&
                    "无需配置环境，直接在浏览器中编写和运行Python代码，实时查看输出结果。"}
                  {feature.title === "循序渐进路径" &&
                    "从数据清洗基础开始，逐步深入到高级分析技术，确保学习曲线平滑。"}
                  {feature.title === "技能认证证书" &&
                    "完成全部10个项目即可获得由广东科学技术职业学院颁发的认证证书。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
