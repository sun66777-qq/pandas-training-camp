import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeatureCards } from "../components/FeatureCards";
import { LearningPath } from "../components/LearningPath";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectList } from "../components/ProjectList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <FeatureCards />
        </div>
        <div id="path">
          <LearningPath />
        </div>
        <FeaturedProject />
        <div id="projects">
          <ProjectList />
        </div>
      </main>
      <footer className="py-8 px-4 border-t border-gray-200 bg-white">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>Pandas 数据分析实战训练营 - 广东科学技术职业学院</p>
          <p className="mt-1">数据采集技术课程项目</p>
        </div>
      </footer>
    </div>
  );
}
