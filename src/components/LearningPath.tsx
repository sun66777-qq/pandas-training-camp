import { Sparkles, BarChart3, GitBranch, TrendingUp, FileText } from "lucide-react";
import { learningStages } from "../data/projects";

export function LearningPath() {
  const icons = [Sparkles, BarChart3, GitBranch, TrendingUp, FileText];

  return (
    <section id="path" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">系统化学习路径</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">五大阶段，循序渐进掌握数据分析</p>
        </div>

        <div className="relative">
          {/* Timeline line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {learningStages.map((stage, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={stage.id}
                  className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm shadow-md hidden md:flex">
                    {stage.id}
                  </div>

                  <div className="md:pt-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{stage.title}</h3>
                    <p className="text-gray-600 text-sm">{stage.description}</p>
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
