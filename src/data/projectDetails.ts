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
  goal: string;
  instructions: string[];
  code: string;
  expectedOutput: string;
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

const project1Details: ProjectDetail = {
  learning: [
    {
      title: "缺失值检测与填充",
      content: "缺失值是数据清洗中最常见的问题。首先用isnull().sum()统计每列缺失数量，然后根据业务场景选择填充策略：数值列用均值/中位数，分类列用众数，时间序列用ffill/bfill。",
      codeExample: "import pandas as pd\nimport numpy as np\n\n# 统计缺失值\nprint(df.isnull().sum())\n\n# 数值列用均值填充\ndf['price'] = df['price'].fillna(df['price'].mean())\n\n# 分类列用众数填充\ndf['category'] = df['category'].fillna(df['category'].mode()[0])",
      quiz: [
        { 
          question: "统计每列缺失值数量的方法是？", 
          options: ["df.isnull()", "df.isnull().sum()", "df.count()", "df.missing()"], 
          answer: "B", 
          explanation: "isnull()返回布尔值DataFrame，sum()后得到每列True的数量，即缺失值个数。" 
        }
      ]
    },
    {
      title: "重复数据删除",
      content: "重复数据会影响分析结果。用duplicated()检查重复行，用drop_duplicates()删除。可以指定subset参数只检查特定列，keep参数控制保留哪一行。",
      codeExample: "# 检查重复行\nprint(df.duplicated().sum())\n\n# 删除重复行，保留第一次出现的\ndf = df.drop_duplicates(keep='first')\n\n# 只检查订单ID列的重复\ndf = df.drop_duplicates(subset=['order_id'], keep='last')",
      quiz: [
        { 
          question: "删除重复行时，保留最后一行的参数是？", 
          options: ["keep='first'", "keep='last'", "keep=False", "keep='all'"], 
          answer: "B", 
          explanation: "keep='last'保留最后一次出现的行，keep='first'保留第一次出现的。" 
        }
      ]
    },
    {
      title: "数据类型转换",
      content: "正确的数据类型对分析至关重要。用astype()转换基本类型，用pd.to_datetime()处理日期，用pd.to_numeric()处理数值（errors='coerce'将无法转换的值设为NaN）。",
      codeExample: "# 字符串转数值\ndf['price'] = pd.to_numeric(df['price'], errors='coerce')\n\n# 字符串转日期\ndf['order_date'] = pd.to_datetime(df['order_date'])\n\n# 整数转浮点数\ndf['quantity'] = df['quantity'].astype(float)",
      quiz: [
        { 
          question: "将字符串转为日期类型用什么方法？", 
          answer: "pd.to_datetime()", 
          explanation: "pd.to_datetime()可以将多种格式的日期字符串转换为datetime类型。" 
        }
      ]
    },
    {
      title: "异常值初步处理",
      content: "用IQR方法检测异常值：Q1是25分位数，Q3是75分位数，IQR=Q3-Q1，异常值定义为<Q1-1.5*IQR或>Q3+1.5*IQR。可以选择删除或用边界值替换。",
      codeExample: "Q1 = df['price'].quantile(0.25)\nQ3 = df['price'].quantile(0.75)\nIQR = Q3 - Q1\n\n# 找出异常值\noutliers = df[(df['price'] < Q1 - 1.5*IQR) | (df['price'] > Q3 + 1.5*IQR)]\n\n# 用边界值替换\nlower_bound = Q1 - 1.5*IQR\nupper_bound = Q3 + 1.5*IQR\ndf['price'] = df['price'].clip(lower=lower_bound, upper=upper_bound)",
      quiz: [
        { 
          question: "IQR方法中，异常值边界是？", 
          options: ["Q1±1.5*IQR", "Q3±1.5*IQR", "Q1-1.5*IQR 和 Q3+1.5*IQR", "平均值±标准差"], 
          answer: "C", 
          explanation: "小于Q1-1.5*IQR或大于Q3+1.5*IQR的值被视为异常值。" 
        }
      ]
    },
    {
      title: "数据标准化格式",
      content: "统一数据格式是分析的基础。字符串列统一大小写、去除空格，分类列合并同义类别，数值列统一单位。",
      codeExample: "# 去除字符串首尾空格\ndf['product_name'] = df['product_name'].str.strip()\n\n# 统一为小写\ndf['category'] = df['category'].str.lower()\n\n# 合并同义类别\ndf['category'] = df['category'].replace({'electronics': '电子产品', 'digital': '电子产品'})",
      quiz: [
        { 
          question: "去除字符串首尾空格用什么方法？", 
          answer: "str.strip()", 
          explanation: "str.strip()去除字符串首尾的空格和换行符。" 
        }
      ]
    }
  ],
  practice: {
    intro: "本项目将带你完成一份零售订单数据的完整清洗流程，从原始数据到分析就绪的数据。",
    goals: [
      "掌握缺失值检测和填充方法",
      "学会删除重复数据",
      "熟练转换数据类型",
      "能够处理异常值",
      "理解数据标准化的重要性"
    ],
    steps: [
      {
        title: "步骤1：加载数据并探索结构",
        goal: "读取CSV文件，了解数据的基本信息和缺失情况",
        description: "首先导入pandas，读取零售订单数据，查看前几行和数据信息，为后续清洗做准备。",
        instructions: [
          "1. 使用pd.read_csv()加载retail_orders.csv",
          "2. 用head()查看前5行数据",
          "3. 用info()查看每列的数据类型和非空数量",
          "4. 用isnull().sum()统计每列缺失值"
        ],
        code: "import pandas as pd\n\n# TODO: 读取retail_orders.csv文件\ndf = \n\n# TODO: 查看前5行\nprint('=== 数据预览 ===')\n\n# TODO: 查看数据基本信息\nprint('\\n=== 数据类型 ===')\n\n# TODO: 统计每列缺失值\nprint('\\n=== 缺失值统计 ===')\n",
        expectedOutput: "显示5行零售订单数据，包含订单ID、产品、价格、数量、日期等列，以及缺失值统计。",
        feedback: "完美！你已经了解了数据结构。接下来处理缺失值。"
      },
      {
        title: "步骤2：处理缺失值",
        goal: "根据每列特点选择合适的填充策略",
        description: "数值列用均值填充，分类列用众数填充，确保数据完整性。",
        instructions: [
          "1. 用均值填充price列的缺失值",
          "2. 用众数填充category列的缺失值",
          "3. 用ffill填充order_date列的缺失值",
          "4. 再次检查缺失值是否已全部处理"
        ],
        code: "# TODO: 用均值填充price列\ndf['price'] = \n\n# TODO: 用众数填充category列\ndf['category'] = \n\n# TODO: 用前一个值填充order_date列\ndf['order_date'] = \n\n# 检查是否还有缺失值\nprint('缺失值处理后：')\nprint(df.isnull().sum())",
        expectedOutput: "所有列的缺失值数量都为0。",
        feedback: "太好了！缺失值已处理完毕。接下来删除重复数据。"
      },
      {
        title: "步骤3：删除重复数据",
        goal: "识别并删除重复的订单记录",
        description: "检查重复行，根据订单ID删除重复记录，保留最新的一条。",
        instructions: [
          "1. 检查有多少重复行",
          "2. 根据order_id列删除重复，保留最后一行",
          "3. 输出删除后的行数"
        ],
        code: "# TODO: 检查重复行数量\nprint('重复行数：', )\n\n# TODO: 根据order_id删除重复，保留最后一行\ndf = \n\nprint('去重后数据行数：', len(df))",
        expectedOutput: "显示重复行数，去重后的数据行数比原来少。",
        feedback: "做得好！重复数据已清除。现在转换数据类型。"
      },
      {
        title: "步骤4：转换数据类型",
        goal: "确保每列使用正确的数据类型",
        description: "将price转为数值，order_date转为日期类型，quantity转为整数。",
        instructions: [
          "1. 用pd.to_numeric转换price列",
          "2. 用pd.to_datetime转换order_date列",
          "3. 用astype转换quantity为整数",
          "4. 查看最终的数据类型"
        ],
        code: "# TODO: 转换price为数值类型（errors='coerce'）\ndf['price'] = \n\n# TODO: 转换order_date为日期类型\ndf['order_date'] = \n\n# TODO: 转换quantity为整数\ndf['quantity'] = \n\nprint('\\n=== 最终数据类型 ===')\nprint(df.info())",
        expectedOutput: "price是float64，order_date是datetime64，quantity是int64。",
        feedback: "完美！数据类型都正确了。接下来处理异常值。"
      },
      {
        title: "步骤5：处理价格异常值",
        goal: "识别并处理价格列的异常值",
        description: "用IQR方法找出价格异常值，用边界值替换，避免极端值影响后续分析。",
        instructions: [
          "1. 计算Q1、Q3和IQR",
          "2. 确定上下边界",
          "3. 用clip方法替换异常值",
          "4. 查看处理后的价格统计"
        ],
        code: "# TODO: 计算Q1、Q3、IQR\nQ1 = \nQ3 = \nIQR = \n\nlower_bound = Q1 - 1.5 * IQR\nupper_bound = Q3 + 1.5 * IQR\n\n# TODO: 用边界值替换异常值\ndf['price'] = \n\nprint('处理后价格统计：')\nprint(df['price'].describe())",
        expectedOutput: "显示price列的统计信息，最小值和最大值在合理范围内。",
        feedback: "太棒了！异常值处理完成。最后进行数据标准化。"
      },
      {
        title: "步骤6：数据标准化与保存",
        goal: "统一字符串格式，保存清洗后的数据",
        description: "统一分类名称格式，去除产品名称空格，最后保存清洗后的数据。",
        instructions: [
          "1. 去除product_name的首尾空格",
          "2. 将category统一为小写",
          "3. 保存清洗后的数据为cleaned_orders.csv",
          "4. 输出最终数据预览"
        ],
        code: "# TODO: 去除产品名称首尾空格\ndf['product_name'] = \n\n# TODO: 将分类统一为小写\ndf['category'] = \n\n# 保存清洗后的数据\ndf.to_csv('cleaned_orders.csv', index=False)\n\nprint('\\n=== 清洗后数据预览 ===')\nprint(df.head())\nprint('\\n数据清洗完成！')",
        expectedOutput: "显示清洗后的5行数据，格式整齐。",
        feedback: "恭喜！你完成了完整的数据清洗流程！"
      }
    ],
    tips: [
      "处理缺失值前先了解业务含义，不要盲目填充",
      "保留原始数据副本，清洗出错可以回退",
      "多次检查每一步的结果",
      "日期格式转换要注意原数据格式"
    ],
    referenceCode: "import pandas as pd\n\n# 步骤1：加载数据\ndf = pd.read_csv('retail_orders.csv')\nprint('=== 数据预览 ===')\nprint(df.head())\nprint('\\n=== 数据类型 ===')\nprint(df.info())\nprint('\\n=== 缺失值统计 ===')\nprint(df.isnull().sum())\n\n# 步骤2：处理缺失值\ndf['price'] = df['price'].fillna(df['price'].mean())\ndf['category'] = df['category'].fillna(df['category'].mode()[0])\ndf['order_date'] = df['order_date'].fillna(method='ffill')\n\n# 步骤3：删除重复\ndf = df.drop_duplicates(subset=['order_id'], keep='last')\n\n# 步骤4：类型转换\ndf['price'] = pd.to_numeric(df['price'], errors='coerce')\ndf['order_date'] = pd.to_datetime(df['order_date'])\ndf['quantity'] = df['quantity'].astype(int)\n\n# 步骤5：异常值处理\nQ1 = df['price'].quantile(0.25)\nQ3 = df['price'].quantile(0.75)\nIQR = Q3 - Q1\ndf['price'] = df['price'].clip(lower=Q1-1.5*IQR, upper=Q3+1.5*IQR)\n\n# 步骤6：标准化并保存\ndf['product_name'] = df['product_name'].str.strip()\ndf['category'] = df['category'].str.lower()\ndf.to_csv('cleaned_orders.csv', index=False)",
    feedback: "项目完成！你已掌握完整的数据预处理流程！"
  },
  test: [
    { id: 1, type: "choice", question: "统计每列缺失值数量的正确方法是？", options: ["df.isnull()", "df.isnull().sum()", "df.count()", "df.missing()"], correctAnswer: "B", explanation: "isnull()返回布尔DataFrame，sum()统计每列True的数量，即缺失值个数。对应学习模块的知识点1。" },
    { id: 2, type: "choice", question: "删除重复行时保留最后一行的参数是？", options: ["keep='first'", "keep='last'", "keep=False", "drop='last'"], correctAnswer: "B", explanation: "keep='last'保留最后一次出现的行。对应学习模块的知识点2。" },
    { id: 3, type: "choice", question: "将字符串转换为日期类型用什么方法？", options: ["astype('date')", "pd.to_datetime()", "pd.date_convert()", "to_date()"], correctAnswer: "B", explanation: "pd.to_datetime()是转换日期的标准方法。对应学习模块的知识点3。" },
    { id: 4, type: "truefalse", question: "IQR方法中，异常值是大于Q3+1.5*IQR或小于Q1-1.5*IQR的值。", correctAnswer: "正确", explanation: "这是IQR异常值检测的标准定义。对应学习模块的知识点4。" },
    { id: 5, type: "fill", question: "去除字符串首尾空格的方法是str.____()。", correctAnswer: "strip", explanation: "str.strip()去除字符串首尾的空格和换行符。对应学习模块的知识点5。" }
  ]
};

const project2Details: ProjectDetail = {
  learning: [
    {
      title: "描述性统计基础",
      content: "describe()快速了解数值列的统计量：count非空数、mean均值、std标准差、min最小值、25%/50%/75%分位数、max最大值。value_counts()看分类值分布。",
      codeExample: "# 数值列统计\nprint(df.describe())\n\n# 分类列分布\nprint(df['genre'].value_counts())\nprint(df['genre'].value_counts(normalize=True))  # 百分比",
      quiz: [
        { 
          question: "describe()方法不包含哪个统计量？", 
          options: ["均值", "中位数", "众数", "标准差"], 
          answer: "C", 
          explanation: "describe()包含count/mean/std/min/25%/50%/75%/max，不包含众数。" 
        }
      ]
    },
    {
      title: "分组聚合分析",
      content: "groupby()按列分组后配合聚合函数分析。常用聚合：mean()均值、sum()求和、count()计数、median()中位数、min()/max()最值。可以同时对多列用不同聚合。",
      codeExample: "# 按流派分组，统计平均评分\nprint(df.groupby('genre')['rating'].mean())\n\n# 同时进行多种聚合\nprint(df.groupby('genre').agg({\n    'rating': ['mean', 'count'],\n    'year': ['min', 'max']\n}))",
      quiz: [
        { 
          question: "groupby后获取每组数量用什么方法？", 
          answer: "count()", 
          explanation: "count()统计每组的非空值数量，size()统计每组行数。" 
        }
      ]
    },
    {
      title: "相关性分析",
      content: "corr()计算列之间的皮尔逊相关系数：-1完全负相关，0不相关，1完全正相关。abs()>0.7强相关，0.3-0.7中等相关，<0.3弱相关。",
      codeExample: "# 计算所有数值列的相关矩阵\ncorr_matrix = df.corr()\nprint(corr_matrix)\n\n# 查看两列的相关性\nprint(df['budget'].corr(df['revenue']))",
      quiz: [
        { 
          question: "相关系数绝对值大于多少算强相关？", 
          options: ["0.3", "0.5", "0.7", "0.9"], 
          answer: "C", 
          explanation: "通常|r|>0.7认为是强相关，0.3-0.7中等相关。" 
        }
      ]
    },
    {
      title: "交叉表与透视表",
      content: "crosstab()计算两列的频数交叉表，pivot_table()创建数据透视表，可指定index行、columns列、values值、aggfunc聚合函数。",
      codeExample: "# 交叉表：流派vs年份的电影数量\nprint(pd.crosstab(df['genre'], df['year']))\n\n# 透视表：按流派和年份，统计平均评分\nprint(df.pivot_table(\n    values='rating',\n    index='genre',\n    columns='year',\n    aggfunc='mean'\n))",
      quiz: [
        { 
          question: "创建数据透视表用什么方法？", 
          answer: "pivot_table()", 
          explanation: "pivot_table()是pandas创建透视表的标准方法。" 
        }
      ]
    },
    {
      title: "多维度排序",
      content: "sort_values()按列值排序，by参数指定排序列，可以是单列或多列。ascending控制升序降序，na_position控制缺失值位置。",
      codeExample: "# 按评分降序，年份升序排序\nprint(df.sort_values(by=['rating', 'year'], ascending=[False, True]).head())\n\n# 按票房排名，选出前10\nprint(df.sort_values('revenue', ascending=False).head(10))",
      quiz: [
        { 
          question: "sort_values中ascending=[False, True]表示？", 
          options: ["都降序", "都升序", "第一列降序第二列升序", "第一列升序第二列降序"], 
          answer: "C", 
          explanation: "ascending列表中的每个元素对应by列表中的每列，False表示降序，True表示升序。" 
        }
      ]
    }
  ],
  practice: {
    intro: "本项目通过电影评分数据进行多维度统计分析，发现数据中的有趣规律。",
    goals: [
      "掌握描述性统计方法",
      "熟练进行分组聚合分析",
      "理解并计算相关性",
      "会用交叉表和透视表",
      "能进行多维度排序"
    ],
    steps: [
      {
        title: "步骤1：加载数据并做基础统计",
        goal: "了解数据概况和分布",
        description: "加载电影数据，查看基本信息和统计量，了解数据分布。",
        instructions: [
          "1. 读取movies_ratings.csv",
          "2. 查看基本信息和前10行",
          "3. 对数值列做描述性统计",
          "4. 查看流派的分布情况"
        ],
        code: "import pandas as pd\n\n# TODO: 读取电影数据\ndf = \n\nprint('=== 数据预览 ===')\nprint(df.head(10))\nprint('\\n=== 描述性统计 ===')\nprint(df.describe())\n\n# TODO: 查看流派分布\nprint('\\n=== 流派分布 ===')\n",
        expectedOutput: "显示电影数据的统计量和各流派的电影数量。",
        feedback: "很好！你已经了解了数据基本情况。接下来进行分组分析。"
      },
      {
        title: "步骤2：按流派分组分析",
        goal: "比较不同流派的电影特点",
        description: "按流派分组，统计平均评分、平均票房、电影数量等指标。",
        instructions: [
          "1. 按流派分组，计算平均评分",
          "2. 按流派分组，统计电影数量",
          "3. 按流派分组，计算平均票房",
          "4. 用agg同时计算多个指标"
        ],
        code: "# TODO: 按流派分组，计算平均评分\nprint('=== 各流派平均评分 ===')\n\n# TODO: 按流派分组，统计电影数量\nprint('\\n=== 各流派电影数量 ===')\n\n# TODO: 用agg同时计算多个指标\nprint('\\n=== 多指标聚合 ===')\nprint(df.groupby('genre').agg({\n    'rating': ['mean', 'count'],\n    'revenue': 'mean',\n    'year': 'min'\n}))",
        expectedOutput: "显示各流派的平均评分、电影数量、平均票房等信息。",
        feedback: "太棒了！分组分析完成。接下来计算相关性。"
      },
      {
        title: "步骤3：相关性分析",
        goal: "发现变量之间的关系",
        description: "计算相关矩阵，重点看预算和票房、评分和票房的相关性。",
        instructions: [
          "1. 计算所有数值列的相关矩阵",
          "2. 特别查看budget和revenue的相关性",
          "3. 查看rating和revenue的相关性",
          "4. 分析发现的规律"
        ],
        code: "# TODO: 计算相关矩阵\nprint('=== 相关矩阵 ===')\n\n# TODO: 查看预算和票房的相关性\nprint('\\n预算与票房的相关系数：')\n\n# TODO: 查看评分与票房的相关性\nprint('评分与票房的相关系数：')\n",
        expectedOutput: "显示相关矩阵，预算和票房通常正相关，评分和票房弱相关。",
        feedback: "很好！相关性分析完成。接下来用透视表深入分析。"
      },
      {
        title: "步骤4：创建数据透视表",
        goal: "多维度交叉分析",
        description: "创建透视表，看不同年代不同流派的电影数量和平均评分。",
        instructions: [
          "1. 先创建年代列（每10年一段）",
          "2. 用crosstab看流派vs年代的电影数量",
          "3. 用pivot_table看流派vs年代的平均评分",
          "4. 观察有趣的发现"
        ],
        code: "# 创建年代列\ndf['decade'] = (df['year'] // 10) * 10\n\n# TODO: 交叉表：流派vs年代\nprint('=== 流派vs年代电影数量 ===')\n\n# TODO: 透视表：流派vs年代的平均评分\nprint('\\n=== 流派vs年代平均评分 ===')\n",
        expectedOutput: "显示各年代各流派的电影数量和平均评分。",
        feedback: "完美！透视表创建成功。最后进行排名分析。"
      },
      {
        title: "步骤5：排序与筛选分析",
        goal: "找出Top N和趋势",
        description: "按票房排序找出Top 10电影，按评分找出高分电影，分析近年趋势。",
        instructions: [
          "1. 按票房降序，显示Top 10",
          "2. 按评分降序，显示Top 20",
          "3. 筛选2010年后的高分电影",
          "4. 分析近年评分趋势"
        ],
        code: "# TODO: 票房Top 10\nprint('=== 票房Top 10 ===')\n\n# TODO: 评分Top 20\nprint('\\n=== 评分Top 20 ===')\n\n# TODO: 2010年后评分>8的电影\nprint('\\n=== 2010年后高分电影 ===')\nrecent_high = df[(df['year'] >= 2010) & (df['rating'] > 8)]\nprint(recent_high[['title', 'year', 'rating', 'genre']].head())",
        expectedOutput: "显示票房和评分最高的电影，以及近年高分电影。",
        feedback: "精彩！你完成了全面的统计分析！"
      }
    ],
    tips: [
      "相关性不等于因果关系，只表示关联",
      "分组前先看分组列的分布是否均衡",
      "多维度排序时注意优先级顺序",
      "透视表有助于发现隐藏的模式"
    ],
    referenceCode: "import pandas as pd\n\ndf = pd.read_csv('movies_ratings.csv')\nprint(df.describe())\nprint(df['genre'].value_counts())\n\n# 分组分析\nprint(df.groupby('genre')['rating'].mean())\nprint(df.groupby('genre').agg({\n    'rating': ['mean', 'count'],\n    'revenue': 'mean'\n}))\n\n# 相关性\nprint(df.corr())\nprint(df['budget'].corr(df['revenue']))\n\n# 透视表\ndf['decade'] = (df['year'] // 10) * 10\nprint(pd.crosstab(df['genre'], df['decade']))\nprint(df.pivot_table('rating', 'genre', 'decade', 'mean'))\n\n# 排序\nprint(df.sort_values('revenue', ascending=False).head(10))\nprint(df.sort_values('rating', ascending=False).head(20))",
    feedback: "项目完成！你已掌握多维统计分析！"
  },
  test: [
    { id: 1, type: "choice", question: "describe()方法不包含以下哪个统计量？", options: ["均值", "中位数", "众数", "标准差"], correctAnswer: "C", explanation: "describe()包含count/mean/std/min/25%/50%/75%/max，50%就是中位数，但不计算众数。对应学习模块的知识点1。" },
    { id: 2, type: "choice", question: "groupby后统计每组行数用什么？", options: ["count()", "size()", "sum()", "length()"], correctAnswer: "B", explanation: "size()统计每组的行数，count()统计每组的非空值数量。对应学习模块的知识点2。" },
    { id: 3, type: "choice", question: "皮尔逊相关系数的取值范围是？", options: ["[0, 1]", "[-1, 1]", "[0, ∞)", "[-∞, ∞]"], correctAnswer: "B", explanation: "相关系数r的范围是-1到1，-1完全负相关，1完全正相关，0不相关。对应学习模块的知识点3。" },
    { id: 4, type: "truefalse", question: "pivot_table()方法用于创建数据透视表。", correctAnswer: "正确", explanation: "pivot_table()是pandas创建透视表的标准方法，可指定index、columns、values、aggfunc。对应学习模块的知识点4。" },
    { id: 5, type: "fill", question: "sort_values中控制升序降序的参数是____。", correctAnswer: "ascending", explanation: "ascending=True升序（默认），ascending=False降序。对应学习模块的知识点5。" }
  ]
};

export const projectDetails: Record<number, ProjectDetail> = {
  1: project1Details,
  2: project2Details,
  3: project2Details,
  4: project2Details,
  5: project2Details,
  6: project2Details,
  7: project2Details,
  8: project2Details,
  9: project2Details,
  10: project2Details
};
