import { TrendingUp, Flame, Trophy } from "lucide-react";

export function HotProjects() {
  const hotProjects = [
    {
      id: 7,
      name: "购物车关联规则挖掘",
      heat: 98,
      trend: "+12%",
    },
    {
      id: 9,
      name: "RFM 用户分层模型",
      heat: 87,
      trend: "+8%",
    },
    {
      id: 10,
      name: "随机森林回归预测",
      heat: 76,
      trend: "+5%",
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-6 h-6 text-neon-orange" />
        <h3 className="text-xl font-bold text-text-primary">本周热门 Top 3</h3>
        <TrendingUp className="w-5 h-5 text-neon-cyan ml-auto" />
      </div>

      <div className="space-y-4">
        {hotProjects.map((project, idx) => (
          <div
            key={project.id}
            className="glass-card-hover rounded-xl p-4 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-neon-orange to-neon-yellow text-dark-bg text-xs font-bold rounded-bl-lg">
              #{idx + 1}
            </div>

            <div className="relative z-10">
              <h4 className="font-semibold text-text-primary mb-2 pr-16">
                {project.name}
              </h4>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${project.heat}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary ml-2">
                  {project.heat}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  <Trophy className="w-3 h-3 inline mr-1" />
                  热门中
                </span>
                <span className="text-xs text-neon-cyan font-semibold">
                  {project.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-dark-border">
        <p className="text-xs text-text-secondary text-center">
          实时更新于 2 分钟前
        </p>
      </div>
    </div>
  );
}
