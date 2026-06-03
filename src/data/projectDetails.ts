export interface QuizQuestion {
  id: number;
  type: "choice" | "truefalse" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface PracticeStep {
  title: string;
  description: string;
  code: string;
  feedback: string;
}

export interface PracticeCode {
  intro: string;
  goals: string[];
  steps: PracticeStep[];
  tips: string[];
  referenceCode: string;
  feedback: string;
}

export interface KnowledgePoint {
  title: string;
  content: string;
  codeExample?: string;
  quiz: {
    question: string;
    options?: string[];
    answer: string | number;
    explanation: string;
  }[];
}

export interface ProjectDetail {
  learning: KnowledgePoint[];
  practice: PracticeCode;
  test: QuizQuestion[];
}

const defaultPractice = {
  intro: "在这个项目中，你将通过实际练习来巩固Pandas核心技能。",
  goals: ["掌握数据加载", "学会数据清洗", "能够进行基础分析"],
  steps: [
    {
      title: "步骤1：导入库并加载数据",
      description: "首先导入必要的库，然后加载示例数据集。",
      code: "import pandas as pd\n\n# 加载数据\ndf = pd.read_csv('data.csv')\nprint(df.head())",
      feedback: "很好！数据加载成功。接下来进行数据清洗。"
    },
    {
      title: "步骤2：探索数据结构",
      description: "查看数据的基本信息，包括形状、类型等。",
      code: "# 查看数据基本信息\nprint(df.shape)\nprint(df.info())\nprint(df.describe())",
      feedback: "完美！你已经了解了数据的基本结构。"
    },
    {
      title: "步骤3：进行基础分析",
      description: "尝试一些简单的分析操作，比如筛选、分组等。",
      code: "# 基础分析示例\nprint(df.groupby('category').size())",
      feedback: "太棒了！你已经完成了基础分析！"
    }
  ],
  tips: ["备份数据是个好习惯", "遇到问题查官方文档", "先看示例再动手"],
  referenceCode: "import pandas as pd\n\ndf = pd.read_csv('data.csv')\nprint(df.head())\nprint(df.describe())",
  feedback: "项目完成！你已经掌握了基础技能！"
};

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    learning: [
      {
        title: "缺失值处理",
        content: "在实际数据中，缺失值是常见的问题。Pandas提供了多种检测和处理缺失值的方法。",
        codeExample: "import pandas as pd\nimport numpy as np\n\n# 检测和填充缺失值\nprint(df.isnull().sum())\ndf = df.fillna(df.mean())",
        quiz: [
          { question: "检测缺失值的方法是？", options: ["isnull()", "check()", "missing()", "find()"], answer: "A", explanation: "isnull()方法用于检测缺失值，返回布尔值。" }
        ]
      }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "检查DataFrame中缺失值数量的方法是？", options: ["df.count()", "df.isnull().sum()", "df.checknull()", "df.missing()"], correctAnswer: "B", explanation: "isnull().sum()会对每一列的缺失值进行计数。" },
      { id: 2, type: "choice", question: "用均值填充数值列缺失值的正确方法是？", options: ["df.fillna(df.mean())", "df.fillna(mean)", "df.mean().fillna()", "fillna(df.mean())"], correctAnswer: "A", explanation: "用df.mean()计算均值，作为fillna()的参数。" },
      { id: 3, type: "choice", question: "删除含有缺失值的行，应该使用？", options: ["df.drop()", "df.dropna()", "df.remove()", "df.delete()"], correctAnswer: "B", explanation: "dropna()方法用于删除含有缺失值的行或列。" },
      { id: 4, type: "truefalse", question: "fillna(0)会用0填充所有缺失值。", correctAnswer: "正确", explanation: "fillna()会根据传入的参数填充所有的缺失值。" },
      { id: 5, type: "fill", question: "用前一个非空值填充，使用____方法。", correctAnswer: "ffill", explanation: "ffill（forward fill）使用前一个非空值填充后面的缺失值。" }
    ]
  },
  2: {
    learning: [
      { title: "数据筛选", content: "根据条件筛选数据是数据分析中最常用的操作之一。", quiz: [{ question: "筛选的基本语法？", answer: "df[condition]", explanation: "用方括号加布尔表达式筛选数据。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "筛选年龄大于30的人，正确代码是？", options: ["df['age'] > 30", "df[df['age'] > 30]", "df.age > 30", "df.where(age > 30)"], correctAnswer: "B", explanation: "需要把布尔表达式放在外层方括号内。" },
      { id: 2, type: "choice", question: "多条件筛选时应该用什么逻辑运算符？", options: ["and / or", "& / |", "&& / ||", "+, -"], correctAnswer: "B", explanation: "Pandas筛选使用位运算符 & 或 |。" },
      { id: 3, type: "choice", question: "按列筛选，只保留'name'和'age'列，代码是？", options: ["df['name', 'age']", "df[['name', 'age']]", "df(name, age)", "df.select(['name', 'age'])"], correctAnswer: "B", explanation: "选择多列需要双重方括号。" },
      { id: 4, type: "truefalse", question: "df.head()默认显示前5行数据。", correctAnswer: "正确", explanation: "head()方法默认显示前5行，也可以传入参数指定行数。" },
      { id: 5, type: "fill", question: "按条件赋值时，推荐使用____方法。", correctAnswer: "loc", explanation: "使用 .loc[indexer, column] 进行条件赋值更安全。" }
    ]
  },
  3: {
    learning: [
      { title: "关联规则基础", content: "Apriori算法是最常用的关联规则挖掘算法。", quiz: [{ question: "支持度是什么？", answer: "频率", explanation: "支持度表示项目集出现的频率。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "Apriori算法的核心思想是？", options: ["随机搜索", "逐层迭代+剪枝", "深度优先", "贪心算法"], correctAnswer: "B", explanation: "Apriori逐层查找频繁项集，同时剪枝掉不满足条件的项集。" },
      { id: 2, type: "choice", question: "规则 {牛奶} → {面包} 的置信度是？", options: ["P(牛奶)", "P(面包)", "P(牛奶|面包)", "P(面包|牛奶)"], correctAnswer: "D", explanation: "置信度是条件概率，表示买了牛奶后也买面包的概率。" },
      { id: 3, type: "choice", question: "提升度大于1表示什么？", options: ["负相关", "无相关", "正相关", "完美相关"], correctAnswer: "C", explanation: "提升度>1表示两者是正相关关系，规则有价值。" },
      { id: 4, type: "truefalse", question: "最小支持度设置得越高，找到的频繁项集越多。", correctAnswer: "错误", explanation: "最小支持度越高，要求越严格，找到的频繁项集越少。" },
      { id: 5, type: "fill", question: "关联规则常用的两个指标是____和置信度。", correctAnswer: "支持度", explanation: "支持度和置信度是关联规则最基本的评价指标。" }
    ]
  },
  4: {
    learning: [
      { title: "K-Means聚类", content: "K-Means是无监督学习算法，将数据分成K个簇。", quiz: [{ question: "K表示？", answer: "簇数", explanation: "K表示聚类的簇数量。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "K-Means的第一步是？", options: ["分配点到簇", "更新簇中心", "随机选K个初始中心点", "计算距离"], correctAnswer: "C", explanation: "首先随机选择K个点作为初始簇中心点。" },
      { id: 2, type: "choice", question: "常用的距离度量是？", options: ["余弦距离", "欧氏距离", "曼哈顿距离", "Jaccard距离"], correctAnswer: "B", explanation: "K-Means通常使用欧氏距离。" },
      { id: 3, type: "choice", question: "如何选择合适的K值？", options: ["随机选", "肘方法（Elbow Method）", "交叉验证", "K越大越好"], correctAnswer: "B", explanation: "肘方法通过看K值-误差曲线找到拐点。" },
      { id: 4, type: "truefalse", question: "K-Means的结果不会受初始中心点的影响。", correctAnswer: "错误", explanation: "初始中心点的选择会影响聚类结果，通常需要多次运行。" },
      { id: 5, type: "fill", question: "聚类结果评估的常用指标是____。", correctAnswer: "轮廓系数", explanation: "轮廓系数综合考虑了簇内凝聚力和簇间分离度。" }
    ]
  },
  5: {
    learning: [
      { title: "RFM用户分层", content: "RFM是衡量客户价值的模型。", quiz: [{ question: "R代表什么？", answer: "Recency", explanation: "R表示最近一次消费。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "RFM模型中的F是指？", options: ["Frequency", "Feature", "Final", "First"], correctAnswer: "A", explanation: "F是Frequency，表示消费频率。" },
      { id: 2, type: "choice", question: "RFM通常将用户分成几组？", options: ["5组", "8组", "11组", "3组"], correctAnswer: "B", explanation: "传统RFM将每个维度分成5份，2^3=8组或5^3=125组。" },
      { id: 3, type: "choice", question: "给RFM打分时，R值越小应该？", options: ["分数越低", "分数越高", "分数不变", "不确定"], correctAnswer: "B", explanation: "R值小意味着最近购买过，通常更有价值，分数更高。" },
      { id: 4, type: "truefalse", question: "M（Monetary）表示消费金额。", correctAnswer: "正确", explanation: "M表示消费金额或消费贡献。" },
      { id: 5, type: "fill", question: "RFM中，最重要的客户群体通常叫____。", correctAnswer: "重要价值客户", explanation: "重要价值客户是RFM都高的客户。" }
    ]
  },
  6: {
    learning: [
      { title: "线性回归基础", content: "线性回归是最基础的监督学习算法。", quiz: [{ question: "目标是？", answer: "预测连续值", explanation: "线性回归用于预测连续数值。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "线性回归找的是？", options: ["最大值", "最小平方误差的直线", "中位数", "最多数的点"], correctAnswer: "B", explanation: "线性回归目标是找到使平方误差最小的直线。" },
      { id: 2, type: "choice", question: "回归模型评估指标是？", options: ["Accuracy", "R²", "Precision", "F1"], correctAnswer: "B", explanation: "R²是回归模型最常用的评估指标。" },
      { id: 3, type: "choice", question: "R²的取值范围是？", options: ["[0,1]", "[-1,1]", "[0, +∞)", "[-∞,+∞]"], correctAnswer: "A", explanation: "R²的范围通常是0到1，值越接近1越好。" },
      { id: 4, type: "truefalse", question: "线性回归可以处理非线性关系。", correctAnswer: "错误", explanation: "线性回归假设变量是线性关系，不能直接处理非线性关系。" },
      { id: 5, type: "fill", question: "用sklearn训练线性回归的类是____。", correctAnswer: "LinearRegression", explanation: "from sklearn.linear_model import LinearRegression" }
    ]
  },
  7: {
    learning: [
      { title: "随机森林", content: "随机森林是集成学习方法，准确率高且稳定。", quiz: [{ question: "集成方法基于？", answer: "决策树", explanation: "随机森林由多棵决策树组成。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "随机森林是哪种集成方法？", options: ["Bagging", "Boosting", "Stacking", "Voting"], correctAnswer: "A", explanation: "随机森林是Bagging的一种变体。" },
      { id: 2, type: "choice", question: "随机森林的特点是？", options: ["易过拟合", "对噪声鲁棒", "非常快", "只能用做分类"], correctAnswer: "B", explanation: "随机森林对噪声比较鲁棒，不容易过拟合。" },
      { id: 3, type: "choice", question: "特征重要性是指？", options: ["特征数值大小", "特征对预测的贡献", "特征名称长度", "特征顺序"], correctAnswer: "B", explanation: "特征重要性表示每个特征对预测的贡献程度。" },
      { id: 4, type: "truefalse", question: "随机森林可以处理分类和回归两种任务。", correctAnswer: "正确", explanation: "随机森林有RandomForestClassifier和RandomForestRegressor。" },
      { id: 5, type: "fill", question: "随机森林中增加树的数量，模型性能通常会____。", correctAnswer: "提升", explanation: "在一定范围内，树的数量越多，性能越稳定。" }
    ]
  },
  8: {
    learning: [
      { title: "时间序列分析", content: "时间序列数据按时间顺序排列，有其特殊性。", quiz: [{ question: "主要特点是？", answer: "时间依赖性", explanation: "时间序列存在时间依赖性和趋势。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "时间序列数据应该怎么排序？", options: ["随机排序", "按时间顺序", "按数值大小", "按字母顺序"], correctAnswer: "B", explanation: "时间序列必须按时间先后顺序排列。" },
      { id: 2, type: "choice", question: "时间序列预测的经典方法是？", options: ["K-Means", "ARIMA", "SVM", "Decision Tree"], correctAnswer: "B", explanation: "ARIMA是经典的时间序列预测方法。" },
      { id: 3, type: "choice", question: "平稳性是指？", options: ["数据不变", "均值和方差稳定", "递增趋势", "递减趋势"], correctAnswer: "B", explanation: "平稳性指均值和方差在时间上保持稳定。" },
      { id: 4, type: "truefalse", question: "可以用机器学习模型直接预测时间序列。", correctAnswer: "正确", explanation: "可以构造特征用LSTM、XGBoost等模型预测。" },
      { id: 5, type: "fill", question: "把时间序列分解为趋势、季节和____。", correctAnswer: "残差", explanation: "经典分解法把序列分解为趋势、季节和随机部分。" }
    ]
  },
  9: {
    learning: [
      { title: "异常检测", content: "找出数据中不正常的点，有重要应用价值。", quiz: [{ question: "常用方法？", answer: "IQR方法", explanation: "用四分位距检测异常值。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "用IQR方法，异常值定义为？", options: ["Q1-1.5*IQR 以下", "Q3+1.5*IQR 以上", "A 或 B", "都不是"], correctAnswer: "C", explanation: "IQR方法认为超出Q1-1.5IQR和Q3+1.5IQR的是异常值。" },
      { id: 2, type: "choice", question: "Z-score方法中，通常认为z>____是异常值。", options: ["1", "2", "3", "4"], correctAnswer: "C", explanation: "通常Z-score绝对值大于3被认为是异常值。" },
      { id: 3, type: "choice", question: "Isolation Forest适合？", options: ["低维数据", "高维数据", "仅分类数据", "仅数值数据"], correctAnswer: "B", explanation: "Isolation Forest特别适合高维数据。" },
      { id: 4, type: "truefalse", question: "异常值都应该被删除。", correctAnswer: "错误", explanation: "异常值未必需要删除，需要根据业务决定。" },
      { id: 5, type: "fill", question: "四分位距IQR = Q3 - ____。", correctAnswer: "Q1", explanation: "IQR是上四分位数减下四分位数。" }
    ]
  },
  10: {
    learning: [
      { title: "综合项目流程", content: "完整的数据科学项目流程：理解问题→EDA→建模→评估→上线。", quiz: [{ question: "第一步？", answer: "理解业务", explanation: "理解业务问题是最重要的第一步。" }] }
    ],
    practice: defaultPractice,
    test: [
      { id: 1, type: "choice", question: "完整的数据科学项目第一步是？", options: ["写代码", "理解业务问题", "收集数据", "建模"], correctAnswer: "B", explanation: "理解业务问题是最重要的第一步。" },
      { id: 2, type: "choice", question: "EDA指的是？", options: ["数据清理", "探索性数据分析", "模型训练", "模型评估"], correctAnswer: "B", explanation: "EDA是Exploratory Data Analysis。" },
      { id: 3, type: "choice", question: "模型评估时最重要的是？", options: ["训练集准确率", "测试集指标", "速度", "代码简洁"], correctAnswer: "B", explanation: "泛化性能最重要，要看测试集表现。" },
      { id: 4, type: "truefalse", question: "特征工程是提升模型性能的关键环节。", correctAnswer: "正确", explanation: "特征工程常常比模型选择更能影响性能。" },
      { id: 5, type: "fill", question: "机器学习项目中，通常数据处理耗时占____以上。", correctAnswer: "70%", explanation: "业界经验显示，数据处理通常耗时占整个项目的70%以上。" }
    ]
  }
};
