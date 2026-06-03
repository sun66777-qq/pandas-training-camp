import { Link } from "react-router-dom";
import { ShoppingCart, Star, Download, ArrowRight } from "lucide-react";

export function FeaturedProject() {
  return (
    <div className="glass-card-hover rounded-3xl p-8 md:p-12 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Content */}
        <div className="flex-1">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
              高级
            </span>
            <span className="px-3 py-1 rounded-full bg-neon-yellow/20 text-neon-yellow text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3" />
              精选推荐
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            购物车分析 · 在线零售业务数据分析报告
          </h2>

          {/* Description */}
          <p className="text-text-secondary mb-6 leading-relaxed">
            深入分析用户购物行为，发现商品间的隐藏关联规律。通过Apriori算法挖掘关联规则，为商品推荐和库存管理提供数据支撑。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { label: "参与人数", value: "2,345" },
              { label: "好评率", value: "98%" },
              { label: "平均时长", value: "2小时" },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card rounded-lg px-4 py-2">
                <div className="text-xs text-text-secondary">{stat.label}</div>
                <div className="text-lg font-bold text-neon-cyan">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/project/7"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold hover:scale-105 transition-transform shadow-glow"
            >
              开始练习
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card text-text-primary font-bold hover:bg-dark-card-hover transition-colors">
              <Download className="w-5 h-5" />
              下载报告
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="flex-shrink-0 hidden md:block relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />

          {/* Icon Container */}
          <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
            <div className="w-full h-full rounded-xl bg-dark-card flex items-center justify-center">
              <ShoppingCart className="w-24 h-24 text-neon-cyan" />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-dark-card-hover border border-neon-cyan/30 flex items-center justify-center animate-float">
            <span className="text-2xl font-bold text-neon-cyan">98%</span>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-orange opacity-50" />
    </div>
  );
}
