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

const defaultPractice: PracticeCode = {
  intro: "在这个项目中，你将通过实际练习来巩固Pandas的核心技能。",
  goals: ["掌握数据加载", "学会数据清洗", "掌握基本分析"],
  steps: [
    {
      title: "步骤1：导入库和加载数据",
      description: "首先，我们需要导入pandas库并加载我们的数据集。",
      code: "import pandas as pd\n\n# 加载数据\ndf = pd.read_csv('data.csv')\nprint(df.head())",
      feedback: "很好！数据已成功加载。",
    },
    {
      title: "步骤2：查看数据基本信息",
      description: "让我们了解数据的基本结构。",
      code: "# 查看数据形状\nprint(df.shape)\n\n# 查看数据类型\nprint(df.dtypes)",
      feedback: "完美！你对数据有了初步了解。",
    },
    {
      title: "步骤3：数据清洗和分析",
      description: "现在让我们进行简单的分析。",
      code: "# 统计描述\nprint(df.describe())",
      feedback: "太棒了！你完成了基础数据分析。",
    },
  ],
  tips: ["永远在清洗前备份数据", "使用head()查看前几行", "describe()可以快速了解数据"],
  referenceCode: "import pandas as pd\n\n# 完整示例代码\ndf = pd.read_csv('data.csv')\nprint(df.head())\nprint(df.describe())",
  feedback: "你完成了所有步骤！",
};

const defaultLearning: KnowledgePoint[] = [
  {
    title: "基础操作",
    content: "学习Pandas的基础操作是数据分析的第一步。",
    quiz: [
      { question: "Pandas的主要数据结构是？", options: ["Array", "DataFrame", "List", "Dict"], answer: "B", explanation: "Pandas主要使用DataFrame和Series。" }
    ],
  },
];

const defaultTest: QuizQuestion[] = [
  { id: 1, type: "choice", question: "Pandas中，查看前5行用什么方法？", options: ["first()", "head()", "top()", "show()"], correctAnswer: 1, explanation: "df.head()显示前5行。" },
];

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    learning: [
      {
        title: "缺失值处理",
        content: "在实际数据中，缺失值是常见的问题。Pandas提供了多种检测和处理缺失值的方法。",
        codeExample: "import pandas as pd\nimport numpy as np\n\n# 检测和填充缺失值\nprint(df.isnull().sum())\ndf = df.fillna(df.mean())",
        quiz: [
          { question: "检测缺失值的方法是？", options: ["df.isna()", "df.checknull()", "df.findNaN()", "df.missing()"], answer: "A", explanation: "isna() 和 isnull() 都可以用来检测缺失值。" },
        ],
      },
    ],
    practice: {
      intro: "在这个项目中，你将学习如何清洗零售订单数据。这是数据分析的第一步，也是最关键的一步！",
      goals: ["学会加载数据并探索数据", "掌握处理缺失值的方法", "学会数据类型转换"],
      steps: [
        {
          title: "步骤1：加载数据并查看基本信息",
          description: "首先导入Pandas库并加载数据。",
          code: "import pandas as pd\nimport numpy as np\n\n# 读取数据\ndf = pd.read_csv('retail_orders.csv')\n\nprint(df.head())\nprint(f'数据形状: {df.shape}')",
          feedback: "很好！你成功加载了数据。",
        },
        {
          title: "步骤2：检查并处理缺失值",
          description: "检测数据中的缺失值，然后进行处理。",
          code: "print('缺失值统计:')\nprint(df.isnull().sum())\n\n# 处理缺失值\ndf['销量'] = df['销量'].fillna(0)\ndf = df.dropna()\nprint('处理完成')",
          feedback: "完美！缺失值处理得很好。",
        },
        {
          title: "步骤3：数据类型转换与清洗",
          description: "转换日期列类型，清理重复数据。",
          code: "df['订单日期'] = pd.to_datetime(df['订单日期'])\ndf = df.drop_duplicates().reset_index(drop=True)\nprint(df.head())",
          feedback: "太棒了！数据清洗完成！",
        },
      ],
      tips: ["永远在数据清洗前备份数据", "删除数据前请三思", "日期格式经常需要特殊处理"],
      referenceCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('retail_orders.csv')\ndf['销量'] = df['销量'].fillna(0)\ndf['订单日期'] = pd.to_datetime(df['订单日期'])\ndf = df.drop_duplicates().reset_index(drop=True)\nprint('清洗完成!')",
      feedback: "你完成了数据预处理！",
    },
    test: [
      { id: 1, type: "choice", question: "统计每列缺失值数量的方法是？", options: ["df.count()", "df.isnull().sum()", "df.na().count()", "df.missing()"], correctAnswer: 1, explanation: "isnull().sum()统计每列缺失值数量。" },
    ],
  },
  2: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  3: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  4: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  5: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  6: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  7: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  8: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  9: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
  10: { learning: defaultLearning, practice: defaultPractice, test: defaultTest },
};
