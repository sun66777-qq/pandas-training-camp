import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Pandas训练营</h1>
              <p className="text-xs text-slate-500">数据采集技术课程</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">
              核心卖点
            </a>
            <a href="#path" className="text-slate-400 hover:text-white transition-colors text-sm">
              学习路径
            </a>
            <a href="#projects" className="text-slate-400 hover:text-white transition-colors text-sm">
              实战项目
            </a>
          </nav>

          <button
            onClick={() => alert("学习进度已同步")}
            className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors"
          >
            我的进度
          </button>
        </div>
      </div>
    </header>
  );
}
