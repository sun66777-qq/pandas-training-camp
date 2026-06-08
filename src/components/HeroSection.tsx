import { useEffect, useState } from "react";
import { Sparkles, Users, BookOpen, Code, User } from "lucide-react";

export function HeroSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 1859;
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left Content (60%) */}
          <div className="w-full md:w-3/5 animate-slide-up">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text text-left">
                Pandas数据分析
                <br />
                <span className="text-4xl md:text-6xl">实战训练营</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-8" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl md:text-2xl text-text-secondary text-left">
                🚀 从零基础到数据分析高手，10个真实商业项目实战
              </p>
            </div>

            {/* Dynamic Counter */}
            <div className="mb-8" style={{ animationDelay: "0.4s" }}>
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

            {/* Student Introduction */}
            <div className="mb-10" style={{ animationDelay: "0.6s" }}>
              <div className="glass-card rounded-2xl p-6 text-left">
                <p className="text-text-primary text-base md:text-lg leading-relaxed mb-4">
                  大家好！我是来自广东科学技术职业学院商务数据分析与应用专业的学生，欢迎和我一起学习 Pandas 数据分析！👋
                </p>
                <p className="text-text-secondary text-base">
                  这门课程将带你从真实的商业数据集出发，通过10个实战项目，系统掌握Pandas数据分析技能！
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ animationDelay: "0.8s" }}>
              <button
                onClick={() => scrollToSection("features")}
                className="glow-button inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold text-lg rounded-xl hover:scale-105 transition-transform animate-glow-pulse"
              >
                <Code className="w-6 h-6" />
                开始你的数据分析之旅
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Profile Card (35%) */}
          <div className="w-full md:w-[35%] animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="glass-card-hover rounded-2xl p-8 text-center border border-dark-border hover:border-neon-cyan/30 transition-all duration-300">
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-5xl">
                  🐼
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-text-primary mb-2">狸猫</h3>

              {/* Identity */}
              <p className="text-text-secondary mb-6 text-base">
                广东科学技术职业学院 · 商务数据分析与应用专业
              </p>

              {/* Skills Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">技能标签</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Python", "Pandas", "数据可视化", "SQL", "机器学习"].map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-sm bg-dark-card-hover border border-dark-border text-text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Intro */}
              <div className="pt-4 border-t border-dark-border">
                <p className="text-text-secondary text-sm italic">
                  "热爱数据分析，正在成为数据科学家的路上"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid (keep below) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "1s" }}>
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
