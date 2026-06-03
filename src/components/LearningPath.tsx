import { Sparkles, BarChart3, GitBranch, TrendingUp, FileText } from "lucide-react";
import { learningStages } from "../data/projects";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  BarChart3,
  GitBranch,
  TrendingUp,
  FileText,
};

export function LearningPath() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">系统化学习路径</h2>
          <p className="text-slate-400">循序渐进，5个阶段掌握数据分析全栈技能</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {learningStages.map((stage, index) => {
              const Icon = iconMap[stage.icon];
              return (
                <div
                  key={stage.id}
                  className="relative bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {stage.id}
                  </div>

                  <div className="pt-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{stage.title}</h3>
                    <p className="text-slate-400 text-sm">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
