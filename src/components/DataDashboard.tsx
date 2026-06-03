import { useEffect, useState } from "react";
import { Users, Play, Trophy, Star } from "lucide-react";

export function DataDashboard() {
  const [counters, setCounters] = useState({
    users: 0,
    runs: 0,
    projects: 0,
    badges: 0,
  });

  useEffect(() => {
    const targets = {
      users: 1234,
      runs: 5678,
      projects: 10,
      badges: 456,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        users: Math.floor(targets.users * easeOut),
        runs: Math.floor(targets.runs * easeOut),
        projects: Math.floor(targets.projects * easeOut),
        badges: Math.floor(targets.badges * easeOut),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      label: "今日活跃学习者",
      value: counters.users.toLocaleString(),
      suffix: "人",
      gradient: "from-neon-cyan to-primary-500",
    },
    {
      icon: Play,
      label: "今日代码运行次数",
      value: counters.runs.toLocaleString(),
      suffix: "次",
      gradient: "from-neon-purple to-neon-orange",
    },
    {
      icon: Trophy,
      label: "社区贡献项目数",
      value: counters.projects.toLocaleString(),
      suffix: "个",
      gradient: "from-neon-yellow to-neon-orange",
    },
    {
      icon: Star,
      label: "获得徽章总数",
      value: counters.badges.toLocaleString(),
      suffix: "",
      gradient: "from-neon-orange to-neon-cyan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="glass-card-hover rounded-xl p-6 relative overflow-hidden group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
          <div className="relative z-10">
            <stat.icon className={`w-8 h-8 mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
            <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
              {stat.value}
              <span className="text-sm ml-1 text-text-secondary">{stat.suffix}</span>
            </div>
            <div className="text-xs text-text-secondary">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
