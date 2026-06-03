import { ShoppingCart, Download, ArrowRight } from "lucide-react";

export function FeaturedProject() {
  const handleDownload = () => {
    alert("报告下载功能即将上线，敬请期待！");
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-primary/20 via-dark-card to-secondary/20 rounded-3xl p-8 md:p-12 border border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                明星项目
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                高级
              </span>
            </div>

            <div className="flex items-start gap-6 mb-8">
              <div className="hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  购物车分析 - 在线零售业务数据分析报告
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl">
                  深入分析用户购物行为，发现商品间的隐藏关联规律，通过Apriori算法挖掘关联规则，
                  为商品推荐和库存管理提供数据支撑。
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Download className="w-5 h-5" />
                下载报告
              </button>
              <button
                onClick={() => alert("将在新页面/环境中打开项目练习")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-bg border border-dark-border text-white font-semibold hover:border-primary/50 transition-colors"
              >
                开始练习
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
