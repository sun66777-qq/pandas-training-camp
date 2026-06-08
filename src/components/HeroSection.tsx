import { useEffect, useState } from "react";
import { Sparkles, Code, Users, CheckCircle, Award, BookOpen } from "lucide-react";

export function HeroSection() {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const target = 1659;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setStudentCount(target);
        clearInterval(timer);
      } else {
        setStudentCount(Math.floor(current));
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
          {/* Left Content (55%) */}
          <div className="w-full md:w-[55%] animate-slide-up">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text text-left leading-tight">
                Pandas数据分析
                <br />
                实战训练营
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-6" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg md:text-xl text-text-secondary text-left">
                从零基础到数据分析高手，10个真实商业项目实战
              </p>
            </div>

            {/* Student Introduction */}
            <div className="mb-8" style={{ animationDelay: "0.4s" }}>
              <div className="glass-card rounded-2xl p-5 text-left">
                <p className="text-text-primary text-base leading-relaxed">
                  大家好！我是来自广东科学技术职业学院商务数据分析与应用专业的学生，欢迎和我一起学习Pandas数据分析！
                </p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="mb-8" style={{ animationDelay: "0.6s" }}>
              <div className="flex flex-wrap gap-3">
                {["Python", "Pandas", "SQL", "机器学习"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-dark-card-hover border border-neon-cyan/30 text-text-primary hover:border-neon-cyan/60 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ animationDelay: "0.8s" }}>
              <button
                onClick={() => scrollToSection("features")}
                className="glow-button inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold text-lg rounded-xl hover:scale-105 transition-transform animate-glow-pulse"
              >
                <Code className="w-6 h-6" />
                开始你的数据分析之旅
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Stats Card (40%) */}
          <div className="w-full md:w-[40%] animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="glass-card rounded-2xl p-6 border border-dark-border hover:border-neon-cyan/30 transition-all duration-300">
              {/* Stats Header */}
              <div className="text-center mb-6 pb-4 border-b border-dark-border">
                <h3 className="text-xl font-bold text-text-primary">训练营数据看板</h3>
                <p className="text-sm text-text-secondary mt-1">实时更新中</p>
              </div>

              {/* Stats Grid 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 已报名学员 */}
                <div className="glass-card-hover rounded-xl p-4 text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm text-text-secondary">已报名学员</span>
                  </div>
                  <div className="text-2xl font-bold text-neon-cyan">
                    {studentCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted">人</div>
                </div>

                {/* 项目完成 */}
                <div className="glass-card-hover rounded-xl p-4 text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm text-text-secondary">项目完成</span>
                  </div>
                  <div className="text-2xl font-bold text-neon-cyan">
                    5,000+
                  </div>
                  <div className="text-xs text-text-muted">次</div>
                </div>

                {/* 获得徽章 */}
                <div className="glass-card-hover rounded-xl p-4 text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm text-text-secondary">获得徽章</span>
                  </div>
                  <div className="text-2xl font-bold text-neon-cyan">
                    500+
                  </div>
                  <div className="text-xs text-text-muted">个</div>
                </div>

                {/* 实战项目 */}
                <div className="glass-card-hover rounded-xl p-4 text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm text-text-secondary">实战项目</span>
                  </div>
                  <div className="text-2xl font-bold text-neon-cyan">
                    10
                  </div>
                  <div className="text-xs text-text-muted">个</div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-4 border-t border-dark-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">训练营进度</span>
                  <span className="text-neon-cyan font-semibold">进行中</span>
                </div>
                <div className="mt-2 h-2 bg-dark-card rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
    </section>
  );
}