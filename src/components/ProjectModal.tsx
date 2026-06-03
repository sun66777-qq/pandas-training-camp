import { X, Clock, Database, Tag, ArrowRight } from "lucide-react";
import { useStore } from "../store/useStore";

const difficultyColors = {
  入门: "bg-emerald-500/20 text-emerald-400",
  进阶: "bg-amber-500/20 text-amber-400",
  高级: "bg-red-500/20 text-red-400",
};

export function ProjectModal() {
  const { selectedProject, isModalOpen, closeModal } = useStore();

  if (!isModalOpen || !selectedProject) return null;

  const handleStartPractice = () => {
    closeModal();
    setTimeout(() => {
      alert(`即将在新页面/环境中打开「${selectedProject.name}」项目练习`);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative bg-dark-card rounded-3xl p-8 max-w-lg w-full border border-dark-border shadow-2xl animate-slide-up">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-dark-bg transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary font-bold text-lg">
            {selectedProject.id}
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{selectedProject.name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[selectedProject.difficulty]}`}>
              {selectedProject.difficulty}
            </span>
          </div>
        </div>

        <p className="text-slate-400 mb-6">{selectedProject.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-slate-300">
            <Clock className="w-5 h-5 text-secondary" />
            <span>预估时长：{selectedProject.duration}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Database className="w-5 h-5 text-secondary" />
            <span>数据集：{selectedProject.dataset}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-slate-300">
            <Tag className="w-5 h-5 text-accent" />
            <span>涉及的技能</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProject.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-dark-bg text-sm text-slate-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartPractice}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          开始练习
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
