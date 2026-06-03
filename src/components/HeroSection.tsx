import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="top" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            全新升级 · 浏览器端即刻学习
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="text-gray-900">Pandas数据分析</span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              实战训练营
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            {["10个行业级实战项目", "从数据清洗到机器学习", "零门槛掌握数据分析全栈技能"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-card"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
            大家好！我是来自广东科学技术职业学院商学院商务数据分析与应用的学生，欢迎使用！狸猫
          </p>

          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg hover:from-primary-700 hover:to-primary-800 hover:-translate-y-1 hover:shadow-cardLifted transition-all shadow-card"
            >
              开始你的数据分析之旅
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
