import { Database, Code, Route, Award } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "真实商业数据集",
    description: "使用来自电商、零售、金融等行业的真实脱敏数据",
  },
  {
    icon: Code,
    title: "实时代码运行",
    description: "浏览器端即刻运行Python代码，无需任何安装配置",
  },
  {
    icon: Route,
    title: "循序渐进路径",
    description: "从基础数据清洗到机器学习，稳扎稳打学习技能",
  },
  {
    icon: Award,
    title: "技能认证证书",
    description: "完成全部项目可获得数据分析能力认证",
  },
];

export function FeatureCards() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
