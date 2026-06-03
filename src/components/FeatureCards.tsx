import { Database, Code, Route, Award } from "lucide-react";

export function FeatureCards() {
  const features = [
    {
      icon: Database,
      title: "真实商业数据集",
      description: "使用来自电商、零售、金融等行业的真实脱敏数据",
      color: "from-primary-500 to-indigo-500",
      bg: "bg-primary-50",
      iconBg: "bg-primary-100",
    },
    {
      icon: Code,
      title: "实时代码运行",
      description: "浏览器端即刻运行Python代码，无需任何安装配置",
      color: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100",
    },
    {
      icon: Route,
      title: "循序渐进路径",
      description: "从基础数据清洗到机器学习，稳扎稳打学习技能",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
    },
    {
      icon: Award,
      title: "技能认证证书",
      description: "完成全部项目可获得数据分析能力认证",
      color: "from-accent-500 to-orange-500",
      bg: "bg-accent-50",
      iconBg: "bg-accent-100",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心卖点</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">四大核心优势，助你轻松掌握数据分析</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className="w-7 h-7" style={{ color: feature.color.includes('primary') ? '#6366F1' : feature.color.includes('cyan') ? '#06B6D4' : feature.color.includes('emerald') ? '#10B981' : '#F59E0B' }} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
