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
    name: "零售订单数据清洗",
    description: "学习处理缺失值、删除重复数据、数据类型转换等基础操作",
    difficulty: "入门",
    duration: "30分钟",
    dataset: "retail_orders.csv",
    skills: ["缺失值处理", "去重", "数据类型转换"],
  },
  {
    id: 2,
    name: "电影评分分析",
    description: "掌握数据筛选、排序、分组统计等核心操作",
    difficulty: "入门",
    duration: "30分钟",
    dataset: "movies_ratings.csv",
    skills: ["数据筛选", "排序", "分组聚合"],
  },
  {
    id: 3,
    name: "用户行为日志处理",
    description: "字符串处理、时间日期转换、数据格式化",
    difficulty: "入门",
    duration: "30分钟",
    dataset: "user_behavior.csv",
    skills: ["字符串处理", "时间转换", "数据格式化"],
  },
  {
    id: 4,
    name: "销售数据透视分析",
    description: "使用数据透视表进行多维度销售数据分析",
    difficulty: "进阶",
    duration: "45分钟",
    dataset: "sales_data.csv",
    skills: ["数据透视表", "分组聚合", "可视化"],
  },
  {
    id: 5,
    name: "客户流失预警分析",
    description: "特征工程、相关性分析、流失率计算",
    difficulty: "进阶",
    duration: "45分钟",
    dataset: "churn_data.csv",
    skills: ["特征工程", "相关性分析", "业务指标"],
  },
  {
    id: 6,
    name: "库存周转分析",
    description: "计算库存周转率、呆滞料分析、库存预警",
    difficulty: "进阶",
    duration: "45分钟",
    dataset: "inventory.csv",
    skills: ["指标计算", "数据分析", "可视化"],
  },
  {
    id: 7,
    name: "购物篮分析",
    description: "关联规则挖掘，发现商品间的关联规律",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "market_basket.csv",
    skills: ["关联规则", "Apriori算法", "支持度置信度"],
  },
  {
    id: 8,
    name: "用户聚类分析",
    description: "使用K-Means算法对用户进行分群分析",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "customer_features.csv",
    skills: ["K-Means聚类", "特征标准化", "用户分群"],
  },
  {
    id: 9,
    name: "销售预测建模",
    description: "构建线性回归模型，预测未来销售趋势",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "historical_sales.csv",
    skills: ["线性回归", "特征工程", "模型评估"],
  },
  {
    id: 10,
    name: "综合数据报告",
    description: "整合所有技能，完成完整的数据分析报告",
    difficulty: "高级",
    duration: "60分钟",
    dataset: "multi_source.csv",
    skills: ["数据分析", "可视化", "报告撰写"],
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
