export function HeroSection() {
  return (
    <section className="pt-16 pb-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          全新升级·浏览器端即刻学习
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Pandas数据分析
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            实战训练营
          </span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
          {["10个行业级实战项目", "从数据清洗到机器学习", "零门槛掌握数据分析全栈技能"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-slate-300 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
          大家好！我是来自广东科学技术职业学院商学院商务数据分析与应用的学生，欢迎使用！狸猫
        </p>
      </div>
    </section>
  );
}
