import { ShoppingCart, Download, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedProject() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-3xl p-8 md:p-12 border border-primary-100 shadow-card">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">高级</span>
                <span className="px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  精选推荐
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                购物车分析 · 在线零售业务数据分析报告
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                深入分析用户购物行为，发现商品间的隐藏关联规律。通过Apriori算法挖掘关联规则，为商品推荐和库存管理提供数据支撑。
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/project/7"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 hover:-translate-y-1 transition-all shadow-card"
                >
                  开始练习
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => alert("报告下载功能即将上线，敬请期待！")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-card"
                >
                  <Download className="w-5 h-5" />
                  下载报告
                </button>
              </div>
            </div>

            <div className="flex-shrink-0 hidden md:block">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-cardLifted">
                <ShoppingCart className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
