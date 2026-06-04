export interface Project {
  id: number;
  name: string;
  description: string;
  difficulty: "入门" | "进阶" | "高级";
  duration: string;
  dataset: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "数据预处理高阶版",
    description: "完整的零售订单数据清洗流程：缺失值填充、去重、类型转换、异常值处理",
    difficulty: "入门",
    duration: "45分钟",
    dataset: "retail_orders.csv",
    skills: ["数据清洗", "缺失值处理", "类型转换", "异常值检测"],
  },
  {
    id: 2,
    name: "多维统计+深度相关性分析",
    description: "电影评分数据的全维度分析：描述性统计、分组聚合、相关性、透视表",
    difficulty: "入门",
    duration: "45分钟",
    dataset: "movies_ratings.csv",
    skills: ["统计分析", "相关性", "分组聚合", "数据透视"],
  },
  {
    id: 3,
    name: "购物车关联规则挖掘",
    description: "用户行为数据关联分析：Apriori算法、支持度置信度提升度",
    difficulty: "进阶",
    duration: "50分钟",
    dataset: "market_basket.csv",
    skills: ["关联规则", "Apriori算法", "数据挖掘"],
  },
  {
    id: 4,
    name: "KMeans聚类分析实战",
    description: "客户特征数据分群：特征标准化、K值选择、结果分析",
    difficulty: "进阶",
    duration: "50分钟",
    dataset: "customer_features.csv",
    skills: ["KMeans聚类", "特征工程", "用户分群"],
  },
  {
    id: 5,
    name: "RFM模型用户分层",
    description: "基于RFM模型的客户价值分层：指标计算、分段评分、结果解读",
    difficulty: "进阶",
    duration: "45分钟",
    dataset: "customer_transactions.csv",
    skills: ["RFM模型", "用户分层", "业务指标"],
  },
  {
    id: 6,
    name: "一元+多元线性回归",
    description: "销量预测建模：特征选择、模型训练、回归指标评估",
    difficulty: "高级",
    duration: "55分钟",
    dataset: "sales_data.csv",
    skills: ["线性回归", "特征工程", "模型评估"],
  },
  {
    id: 7,
    name: "随机森林回归+特征重要性",
    description: "集成学习方法：随机森林建模、特征重要性分析、超参数调整",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "house_prices.csv",
    skills: ["随机森林", "特征重要性", "集成学习"],
  },
  {
    id: 8,
    name: "时间序列完整分析",
    description: "销售趋势预测：趋势分解、平稳性检验、经典预测方法",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "time_series_sales.csv",
    skills: ["时间序列", "趋势分析", "预测建模"],
  },
  {
    id: 9,
    name: "综合异常检测",
    description: "多方法异常检测：IQR、Z-score、Isolation Forest，结果对比",
    difficulty: "高级",
    duration: "55分钟",
    dataset: "server_logs.csv",
    skills: ["异常检测", "统计方法", "机器学习方法"],
  },
  {
    id: 10,
    name: "全流程综合大项目",
    description: "端到端数据分析项目：从问题理解到报告撰写的完整流程",
    difficulty: "高级",
    duration: "90分钟",
    dataset: "e_commerce.csv",
    skills: ["全流程分析", "报告撰写", "综合应用"],
  },
];

export const learningStages = [
  {
    id: 1,
    title: "数据预处理",
    description: "掌握数据清洗与转换",
    icon: "Sparkles",
  },
  {
    id: 2,
    title: "统计分析",
    description: "描述性统计与可视化",
    icon: "BarChart3",
  },
  {
    id: 3,
    title: "关联与聚类",
    description: "挖掘数据关联规律",
    icon: "GitBranch",
  },
  {
    id: 4,
    title: "预测建模",
    description: "机器学习入门",
    icon: "TrendingUp",
  },
  {
    id: 5,
    title: "综合实战",
    description: "完整数据分析报告",
    icon: "FileText",
  },
];
