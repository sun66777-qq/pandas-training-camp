import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeatureCards } from "../components/FeatureCards";
import { LearningPath } from "../components/LearningPath";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectList } from "../components/ProjectList";
import { DataDashboard } from "../components/DataDashboard";
import { HotProjects } from "../components/HotProjects";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <HeroSection />
        <div id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                为什么选择我们
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                从基础到实战，助你成为数据分析达人
              </p>
            </div>
            <FeatureCards />
          </div>
        </div>

        <div id="path" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                系统化学习路径
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                5个阶段循序渐进，从入门到精通
              </p>
            </div>
            <LearningPath />
          </div>
        </div>

        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                明星实战项目
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                真实商业场景，数据驱动决策
              </p>
            </div>
            <FeaturedProject />
          </div>
        </div>

        <div id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                全部实战项目
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                10个精选项目，覆盖数据分析全场景
              </p>
            </div>

            {/* Data Dashboard */}
            <DataDashboard />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Grid */}
              <div className="lg:col-span-2">
                <ProjectList />
              </div>

              {/* Hot Projects Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <HotProjects />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-dark-border relative overflow-hidden">
        {/* Wave Decoration */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="url(#footerGradient)"
            />
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFD1" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Pandas数据分析实战训练营
            </h3>
            <p className="text-text-secondary">
              广东科学技术职业学院 - 数据采集技术课程
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            {["关于课程", "学习指南", "常见问题", "联系我们"].map(
              (item, idx) => (
                <button
                  key={idx}
                  className="text-text-secondary hover:text-neon-cyan transition-colors text-sm"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="pt-6 border-t border-dark-border">
            <p className="text-text-muted text-sm">
              © 2024 Pandas训练营. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
