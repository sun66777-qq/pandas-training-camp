import { useEffect, useState } from "react";
import { Sparkles, Users, BookOpen, Code } from "lucide-react";

export function HeroSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Math.floor(Math.random() * 500) + 1500;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-neon-cyan opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-neon-purple opacity-20 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-neon-cyan opacity-25 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-neon-purple opacity-15 animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-neon-cyan opacity-30 animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 rounded-full bg-neon-purple opacity-20 animate-float" style={{ animationDelay: "5s" }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Main Title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Pandas数据分析
            <br />
            <span className="text-4xl md:text-6xl">实战训练营</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            🚀 从零基础到数据分析高手，10个真实商业项目实战
          </p>
        </div>

        {/* Dynamic Counter */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-8 py-4">
            <Users className="w-6 h-6 text-neon-cyan" />
            <span className="text-text-primary font-semibold">
              已帮助
              <span className="text-neon-cyan ml-2 text-2xl font-bold">
                {count.toLocaleString()}
              </span>
              名学生完成项目
            </span>
            <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
          </div>
        </div>

        {/* Avatar + Chat Bubble */}
        <div className="mb-12 flex justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-neon-cyan" />
              </div>
            </div>
            <div className="glass-card rounded-2xl rounded-tl-sm p-4 text-left">
              <p className="text-text-primary text-sm md:text-base leading-relaxed">
                大家好！我是来自广东科学技术职业学院商务数据分析与应用专业的学生，欢迎和我一起学习 Pandas 数据分析！👋
              </p>
              <p className="text-text-secondary text-sm mt-2">
                这门课程将带你从真实的商业数据集出发，通过10个实战项目，系统掌握Pandas数据分析技能！
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={() => scrollToSection("features")}
            className="glow-button inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold text-lg rounded-xl hover:scale-105 transition-transform animate-glow-pulse"
          >
            <Code className="w-6 h-6" />
            开始你的数据分析之旅
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "1s" }}>
          {[
            { icon: BookOpen, label: "精品课程", value: "10+" },
            { icon: Users, label: "学习人数", value: "5,000+" },
            { icon: Sparkles, label: "项目实战", value: "100%" },
            { icon: Code, label: "代码案例", value: "500+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card-hover rounded-xl p-6 text-center group"
            >
              <stat.icon className="w-8 h-8 text-neon-cyan mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
    </section>
  );
}
