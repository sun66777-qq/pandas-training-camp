import { useState } from "react";
import { BarChart3, User, Trophy, Clock, Flame, Award } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";

export function Header() {
  const [showProgress, setShowProgress] = useState(false);
  const { projects, learningHours, streakDays, badges, completedProjects } =
    useProgressStore();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('top')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Pandas训练营</h1>
              <p className="text-xs text-gray-500">数据采集技术课程</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "features", label: "核心卖点" },
              { id: "path", label: "学习路径" },
              { id: "projects", label: "实战项目" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* My Progress */}
          <div className="relative">
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
            >
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">我的进度</span>
            </button>

            {/* Progress Dropdown */}
            {showProgress && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProgress(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-cardLifted border border-gray-100 z-50 animate-slide-up overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">我的进度</h3>
                        <p className="text-sm text-gray-500">继续学习，不断进步</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-primary-600 mb-1">
                          <Trophy className="w-4 h-4" />
                          <span className="text-xs font-medium">完成项目</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          {completedProjects()}/10
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-accent-600 mb-1">
                          <Award className="w-4 h-4" />
                          <span className="text-xs font-medium">获得徽章</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          {badges}个
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-success-500 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-medium">学习时长</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          {learningHours}h
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-warning-500 mb-1">
                          <Flame className="w-4 h-4" />
                          <span className="text-xs font-medium">连续天数</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          {streakDays}d
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">项目完成情况</p>
                      <div className="grid grid-cols-5 gap-2">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold border-2 ${
                              p.completed
                                ? "bg-success-100 border-success-300 text-success-600"
                                : "bg-gray-50 border-gray-200 text-gray-400"
                            }`}
                            title={p.completed ? "已完成" : "未完成"}
                          >
                            {p.id}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowProgress(false)}
                      className="w-full py-2 text-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      收起面板
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
