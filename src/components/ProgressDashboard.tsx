import { Target, Clock, Flame, Medal } from "lucide-react";
import { useStore } from "../store/useStore";

export function ProgressDashboard() {
  const { completedProjects, learningHours, streakDays, badges } = useStore();

  const stats = [
    { icon: Target, label: "完成项目", value: `${completedProjects} / 10`, color: "text-primary" },
    { icon: Clock, label: "学习时长", value: `${learningHours}小时`, color: "text-secondary" },
    { icon: Flame, label: "连续天数", value: `${streakDays}天`, color: "text-accent" },
    { icon: Medal, label: "获得徽章", value: `${badges}个`, color: "text-emerald-400" },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-dark-card rounded-3xl p-8 border border-dark-border">
          <h2 className="text-2xl font-bold mb-8 text-center">学习进度看板</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-dark-bg/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-dark-bg mb-4 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              开始你的数据分析之旅，无需安装，点击项目卡片即可练习
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
