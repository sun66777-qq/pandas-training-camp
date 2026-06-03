import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeatureCards } from "../components/FeatureCards";
import { LearningPath } from "../components/LearningPath";
import { ProgressDashboard } from "../components/ProgressDashboard";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectList } from "../components/ProjectList";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <FeatureCards />
        </div>
        <div id="path">
          <LearningPath />
        </div>
        <ProgressDashboard />
        <FeaturedProject />
        <div id="projects">
          <ProjectList />
        </div>
      </main>
      <footer className="py-8 px-4 border-t border-dark-border">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>Pandas数据分析实战训练营 - 广东科学技术职业学院</p>
          <p className="mt-1">数据采集技术课程项目</p>
        </div>
      </footer>
    </div>
  );
}
